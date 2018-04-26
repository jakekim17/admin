using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Admin.TradingStarService;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.TradingStar;

namespace Wow.Tv.Admin.Areas.TradingStar.Controllers
{
    /// <summary>
    /// <para> 수익률게시판 출연자/거래현황 관리 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-09-04</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-09-04</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-09-04 생성</para>
    /// </summary>
    /// <remarks>수익률게시판 출연자/거래현황 관리</remarks>
    [WowTvAdminAuthorize(IsRead = true)]
    public class UserController : BaseController
    {
        // GET: TradingStar/User
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Index(TradingStarCondition condition)
        {
            condition.PageSize = 50; // AS-IS 기준
            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            ViewBag.Condition = condition;

            return View();
        }


        public ActionResult UserList(TradingStarCondition condition)
        {
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            var resultData = tradingStarService.UserList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            return View(resultData);
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsDelete = true)]
        public JsonResult RemoveAll(int[] items)
        {
            string msg = string.Empty;

            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            foreach (var item in items)
            {
                tradingStarService.UserDelete(item);
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "수익률게시판>출연자 삭제", "");
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

            tradingStarService.UserDelete(seq);
            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "수익률게시판>출연자 삭제", "");
            return Json(new { IsSuccess = true, Msg = msg });
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int seq,string tradingCode)
        {
            if (!string.IsNullOrEmpty(HttpContext.Request["currentMenuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["currentMenuSeq"]);
            }
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            var resultData =  tradingStarService.GetUser(seq) ?? new tblTradingStarUser {seq = seq, tradingCode = tradingCode };

            return View(resultData);
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult Insert(tblTradingStarUser tradingStarUser)
        {
            string msg = string.Empty;
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();
            //var resultData = tradingStarService.GetCategory(tradingStarUser.tradingCode);

            //if (resultData != null && resultData.tradingCode.Equals(tradingStarUser.tradingCode))
            //{
            //    return Json(new { IsSuccess = false, Msg = "이미 등록된 tradingCode 입니다." });
            //}

            bool isSuccess = true;

            tradingStarService.UserSave(tradingStarUser, LoginHandler.CurrentLoginUser);
            ActionLogWrite(tradingStarUser.tradingCode, ActionLogService.ActionLogBizActionCode.Insert, "수익률게시판>출연자 등록", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult Update(tblTradingStarUser tradingStarUser)
        {
            string msg = string.Empty;
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();
            var resultData = tradingStarService.GetUser(tradingStarUser.seq);

            if (resultData == null) return Json(new { IsSuccess = false, Msg = "출연자가 존재하지 않습니다." });

            bool isSuccess = true;
            tradingStarService.UserSave(tradingStarUser, LoginHandler.CurrentLoginUser);
            ActionLogWrite(resultData.tradingCode, ActionLogService.ActionLogBizActionCode.Update, "수익률게시판>출연자 수정", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
    }
}