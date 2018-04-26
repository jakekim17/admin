using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.History;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class HistoryController : BaseController
    {
        public ActionResult Index(HistoryCondition condition)
        {
            condition.PageSize = 10;

            var list = new HistoryService.HistoryServiceClient().GetList(condition);

            ViewBag.TotalDataCount = list.TotalDataCount;
            ViewBag.Condition = condition;
            ViewBag.currentIndex = condition.CurrentIndex;

            return View(list);
        }

        public ActionResult Edit(HistoryCondition condition, int seq = 0)
        {
            var list = new HistoryService.HistoryServiceClient().GetDetail(seq);
            ViewBag.Condition = condition;
            if(list.HISData == null)
            {
                list.HISData = new HIS_CTGR();
            }
            return View(list);
        }

        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_HIS_MNG model)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                int seq = new HistoryService.HistoryServiceClient().Save(model, LoginHandler.CurrentLoginUser);
                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.HIS_SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "연혁 저장", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int[] checkedList)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new HistoryService.HistoryServiceClient().Delete(checkedList);
                isSuccess = true;
                foreach (var item in checkedList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "주주현황삭제", "");
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }
    }
}