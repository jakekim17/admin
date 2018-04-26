using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Admin.TradingStarService;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.Admin.Areas.TradingStar.Controllers
{
    /// <summary>
    /// <para> 수익률게시판 카테고리 관리 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-09-04</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-09-04</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-09-04 생성</para>
    /// </summary>
    /// <remarks>수익률게시판 카테고리 관리</remarks>
    [WowTvAdminAuthorize(IsRead = true)]
    public class CategoryController : BaseController
    {
        // GET: TradingStar/Catragory
        public ActionResult Index()
        {

            //TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            //var resultData = tradingStarService.CategoryList();

            return View();
        }

        public ActionResult CategoryList()
        {
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            var resultData = tradingStarService.CategoryList();

            return View(resultData);
        }


        [HttpPost]
        public ActionResult Edit(string tradingCode)
        {
            if (!string.IsNullOrEmpty(HttpContext.Request["currentMenuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["currentMenuSeq"]);
            }
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();

            var resultData = tradingStarService.GetCategory(tradingCode) ?? new tblTradingStarCategory() {tradingCode = ""};

            return View(resultData);
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult Insert(tblTradingStarCategory tradingstarCategory)
        {
            string msg = string.Empty;
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();
            var resultData = tradingStarService.GetCategory(tradingstarCategory.tradingCode);

            if (resultData!= null && resultData.tradingCode.Equals(tradingstarCategory.tradingCode))
            {
                return Json(new { IsSuccess = false, Msg = "이미 등록된 tradingCode 입니다." });
            }

            bool isSuccess = true;

            tradingStarService.CategorySave(tradingstarCategory, LoginHandler.CurrentLoginUser);
            ActionLogWrite(tradingstarCategory.tradingCode, ActionLogService.ActionLogBizActionCode.Insert, "수익률게시판>카테고리 관리 게시물 등록", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult Update(tblTradingStarCategory tradingstarCategory)
        {
            string msg = string.Empty;
            TradingStarServiceClient tradingStarService = new TradingStarServiceClient();
            var resultData = tradingStarService.GetCategory(tradingstarCategory.tradingCode);

            if (resultData == null) return Json(new {IsSuccess = false, Msg = "tradingCode가 존재하지 않습니다."});

            bool isSuccess = true;
            tradingStarService.CategorySave(tradingstarCategory, LoginHandler.CurrentLoginUser);
            ActionLogWrite(resultData.tradingCode, ActionLogService.ActionLogBizActionCode.Update, "수익률게시판>카테고리 관리 게시물 수정", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
    }
}