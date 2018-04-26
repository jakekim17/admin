using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.StockholderBoard;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class StockholderBoardController : BaseController
    {
        public ActionResult Index(StockholderBoardCondition condition)
        {
            condition.PageSize = 10;
            var resultData = new StockholderBoardService.StockholderBoardServiceClient().GetList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.Condition = condition;

            return View(resultData);
        }

        public ActionResult Edit(StockholderBoardCondition condition, int seq = 0)
        {
            var resultData = new StockholderBoardService.StockholderBoardServiceClient().GetDetail(seq);
            if (resultData.TITLE == null)
            {
                resultData = new StockholderBoard();
                resultData.ReplyData = new NTB_STOCKHOLDER_BOARD();
            }
            if(resultData.ReplyData == null)
            {
                resultData.ReplyData = new NTB_STOCKHOLDER_BOARD();
            }

            return View(resultData);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult UpdateBlind(int seq, string blindYn)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                new StockholderBoardService.StockholderBoardServiceClient().UpdateBlind(seq, blindYn, LoginHandler.CurrentLoginUser);

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                ActionLogWrite(seq.ToString(), actionCode, "주주 게시판 저장", "");

                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult ReplySave(NTB_STOCKHOLDER_BOARD model)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                int seq = new StockholderBoardService.StockholderBoardServiceClient().ReplySave(model, LoginHandler.CurrentLoginUser);

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.STOCKHOLDER_SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "주주 게시판 저장", "");

                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { isSuccess = isSuccess, msg = msg });
        }
    }
}