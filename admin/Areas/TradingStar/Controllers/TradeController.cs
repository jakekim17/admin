using System;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using Wow.Tv.Admin.CommonCodeService;
using Wow.Tv.Admin.TradingStarService;
using Wow.Tv.Middle.Model.Db22.Admin;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.Admin.Areas.TradingStar.Controllers
{
    /// <summary>
    /// <para> 수익률게시판 거래현황 관리 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-09-06</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-09-06</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-09-06 생성</para>
    /// </summary>
    /// <remarks>수익률게시판 거래현황 관리</remarks>
    [WowTvAdminAuthorize(IsRead = true)]
    public sealed class TradeController : BaseController
    {
        // GET: TradingStar/Trade
        public ActionResult Index(int regseq, string tradingCode)
        {
            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            ViewBag.Regseq = regseq;
            ViewBag.TradingCode = tradingCode;

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            TempData["TRADINGSTAR_SELL_TEX_CODE"] = commonCode.GetAt(CommonCodeStatic.TRADINGSTAR_SELL_TEX_CODE).CODE_VALUE1;
            TempData["TRADINGSTAR_SELL_COMMISSION_CODE"] = commonCode.GetAt(CommonCodeStatic.TRADINGSTAR_SELL_COMMISSION_CODE).CODE_VALUE1;
            TempData["TRADINGSTAR_BUY_COMMISSION_CODE"] = commonCode.GetAt(CommonCodeStatic.TRADINGSTAR_BUY_COMMISSION_CODE).CODE_VALUE1;
            return View();
        }

        public ActionResult TradeList(int regseq)
        {
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            var resultData = tradingStarService.TradeList(regseq);

            double earningRateSum = 0;

            foreach (var item in resultData)
            {
                item.CurrentPrice = tradingStarService.CurrentStockPriceList(item.code)[0].TradePrice;

                if ((item.selldt == null || item.selldt.Value.Year == 1900) && item.buystate == "정상") //매도전
                {
                    if (item.buycost == null || item.CurrentPrice == null) continue;

                    item.HoldProfitPrice = Math.Round(HoldProfitCalculate(item.buycost.Value, item.CurrentPrice.Value),2);

                    earningRateSum = earningRateSum + item.HoldProfitPrice;
                }
                else if (item.selldt != null && item.selldt.Value.Year > 1900 && item.buystate == "정상") //매도후
                {
                    if (item.buycost == null || item.sellcost == null) continue;

                    item.SellProfitPrice = Math.Round(SellProfitCalculate(item.buycost.Value, item.sellcost.Value),2);

                    earningRateSum = earningRateSum + item.SellProfitPrice;
                }
                else
                {
                    item.HoldProfitPrice = 0;
                    item.SellProfitPrice = 0;
                }

            }

            tradingStarService.UpdateEarningRate(regseq, earningRateSum);


            var totalList = resultData.Where(x => x.buystate == "정상" || x.buystate == "편입실패").ToList();

            int totalHaveCnt = totalList.Count;


            if (totalHaveCnt == 0)
            {
                tradingStarService.UpdateTotalHavaRateText(regseq, 0);
            }
            else
            {
                double sumHoldProfitPrice = totalList.Sum(x => x.HoldProfitPrice);
                double sumSellProfitPrice = totalList.Sum(x => x.SellProfitPrice);

                var totalHavaRateText = (sumHoldProfitPrice + sumSellProfitPrice) / totalHaveCnt;
                tradingStarService.UpdateTotalHavaRateText(regseq, totalHavaRateText);
            }

            ViewBag.TradeUserInfo = tradingStarService.GetUser(regseq);
            return View(resultData);
        }

        #region  수익률 계산
        /// <summary>
        /// 보유 중 수익률 계산 
        /// 공식은 AS-IS 그대로...
        /// </summary>
        /// <param name="buycost">매수가</param>
        /// <param name="currentPrice">현재가</param>
        /// <returns>int</returns>
        private double HoldProfitCalculate(int buycost,int currentPrice)
        {
            //'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            //            '1. 보유중 수익률의 계산

            //            'A:매수가(DBbuyDt), B:현재가(curr_price), C:매수수수료(A*0.015%)

            //            ' {((B-A)-C)/A} * 100 = 수익률 (소수점 셋째자리에서 반올림)	- 공식새로옴 2013.6.5 (이보현pd)

            //            If listBox.getMultiString("selldt", i) = "" And listBox.getMultiString("buystate", i) = "정상" Then '팔지않은경우 ( 보유하고 있는 경우)
            //'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            //'SB 전달받은 공식==============================================================================
            float buyCommissionPersent = 0F;
            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            TempData["TRADINGSTAR_BUY_COMMISSION_CODE"] = commonCode.GetAt(CommonCodeStatic.TRADINGSTAR_BUY_COMMISSION_CODE).CODE_VALUE1;
            if (!float.TryParse(TempData["TRADINGSTAR_BUY_COMMISSION_CODE"].ToString(), out buyCommissionPersent))
            {
                buyCommissionPersent = 0.00015F;
            }
            double buyCommission = buycost * buyCommissionPersent;  // C = A * 0.00015  (매수수수료 SB기재분 : A * 0.015 % )	 //매수수수료
            double temp = currentPrice - buycost - buyCommission; // D = B - A - C
            double result = 0;

            if (buycost != 0) //'매수가가 0인 경우는 패스
            {
                result = (temp / buycost) * 100;
            }
            return result;
        }

        /// <summary>
        /// 매도시 수익률 계산 
        /// 공식은 AS-IS 그대로...
        /// </summary>
        /// <param name="buycost">매수가</param>
        /// <param name="sellcost">판매가</param>
        /// <returns>int</returns>
        private double SellProfitCalculate(int buycost, int sellcost)
        {
            //'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            //            '1. 보유중 수익률의 계산

            //            'A:매수가(DBbuyDt), B:현재가(curr_price), C:매수수수료(A*0.015%)

            //            ' {((B-A)-C)/A} * 100 = 수익률 (소수점 셋째자리에서 반올림)	- 공식새로옴 2013.6.5 (이보현pd)

            //            If listBox.getMultiString("selldt", i) = "" And listBox.getMultiString("buystate", i) = "정상" Then '팔지않은경우 ( 보유하고 있는 경우)
            //'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            TempData["TRADINGSTAR_SELL_TEX_CODE"] = commonCode.GetAt(CommonCodeStatic.TRADINGSTAR_SELL_TEX_CODE).CODE_VALUE1;
            TempData["TRADINGSTAR_SELL_COMMISSION_CODE"] = commonCode.GetAt(CommonCodeStatic.TRADINGSTAR_SELL_COMMISSION_CODE).CODE_VALUE1;
            TempData["TRADINGSTAR_BUY_COMMISSION_CODE"] = commonCode.GetAt(CommonCodeStatic.TRADINGSTAR_BUY_COMMISSION_CODE).CODE_VALUE1;

            float buyCommissionPersent = 0F;
            if (!float.TryParse(TempData["TRADINGSTAR_BUY_COMMISSION_CODE"].ToString(), out buyCommissionPersent))
            {
                buyCommissionPersent = 0.00015F;
            }
            float sellCommissionPersent = 0F;
            if (!float.TryParse(TempData["TRADINGSTAR_SELL_COMMISSION_CODE"].ToString(), out sellCommissionPersent))
            {
                sellCommissionPersent = 0.00015F;
            }
            float sellTexPersent = 0F;
            if (!float.TryParse(TempData["TRADINGSTAR_SELL_COMMISSION_CODE"].ToString(), out sellTexPersent))
            {
                sellTexPersent = 0.003F;
            }
            double buyCommission = buycost * buyCommissionPersent;  // C = A * 0.00015  (매수수수료 SB기재분 : A * 0.015 % )	 //매수수수료
            double sellCommission = sellcost * sellCommissionPersent; //매도수수료
            double sellTax = sellcost * sellTexPersent; //매도거래세
            double temp = (sellcost - buyCommission) - (buyCommission + sellCommission + sellTax);
            double result = (temp / buycost) * 100;
            return result;
        }
        #endregion

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsDelete = true)]
        public JsonResult RemoveAll(int[] items)
        {
            string msg = string.Empty;

            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            foreach (var item in items)
            {
                tradingStarService.TradeDelete(item);
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "수익률게시판>거래현황 삭제", "");
            }

            return Json(new { IsSuccess = true, Msg = msg });
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsDelete = true)]
        public JsonResult Delete(int seq)
        {
            string msg = string.Empty;

            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            tradingStarService.TradeDelete(seq);
            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "수익률게시판>거래현황 삭제", "");
            return Json(new { IsSuccess = true, Msg = msg });
        }



        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int regSeq, int seq)
        {
            if (!string.IsNullOrEmpty(HttpContext.Request["currentMenuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["currentMenuSeq"]);
            }
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();
            ViewBag.regSeq = regSeq;
            var resultData = tradingStarService.GetTrade(seq) ?? new tblTradingStarTrade { seq = seq };

            return View(resultData);
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult Insert(tblTradingStarTrade tradingStarTrade)
        {
            string msg = string.Empty;
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();
            //var resultData = tradingStarService.GetCategory(tradingStarUser.tradingCode);

            //if (resultData != null && resultData.tradingCode.Equals(tradingStarUser.tradingCode))
            //{
            //    return Json(new { IsSuccess = false, Msg = "이미 등록된 tradingCode 입니다." });
            //}

            bool isSuccess = true;

            tradingStarService.TradeSave(tradingStarTrade, LoginHandler.CurrentLoginUser);
            ActionLogWrite(tradingStarTrade.seq.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "수익률게시판>거래현황 등록", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult Update(tblTradingStarTrade tblTradingStarTrade)
        {
            string msg = string.Empty;
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();
            var resultData = tradingStarService.GetTrade(tblTradingStarTrade.seq);

            if (resultData == null) return Json(new { IsSuccess = false, Msg = "거래현황이 존재하지 않습니다." });

            bool isSuccess = true;
            tradingStarService.TradeSave(tblTradingStarTrade, LoginHandler.CurrentLoginUser);
            ActionLogWrite(resultData.seq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "수익률게시판>거래현황 수정", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult StockList(StockBatchCondition condition)
        {
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            var resultData = tradingStarService.GetStockList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;


            return View(resultData);
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult UpdateStarMark(int seq,float starMark)
        {
            string msg = string.Empty;
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();
            bool isSuccess = true;
            tradingStarService.UpdateStarMark(seq, starMark);
            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "수익률게시판>종목 마크 수정", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

    }
}