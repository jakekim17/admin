using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv.MemberManage;
using Wow.Tv.Middle.Model.Db89.wowbill.MemberAdminManage;
using System.Linq;

namespace Wow.Tv.Admin.Areas.Monitoring.Controllers
{
    public class MemInfoOpenChkController : BaseController
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index(MemInfoOpenChkCondition condition)
        {
            condition.PageSize = 10;

            DateTime now = DateTime.Now;
            now = new DateTime(now.Year, now.Month, now.Day, 0, 0, 0);

            if (condition.RegistDateFrom.HasValue == false)
            {
                condition.RegistDateFrom = now;
            }
            if (condition.RegistDateTo.HasValue == false)
            {
                condition.RegistDateTo = now;
            }

            DateTime? showRegistDateFrom = condition.RegistDateFrom;
            DateTime? showRegistDateTo = condition.RegistDateTo;

            if (condition.RegistDateTo.HasValue == true)
            {
                condition.RegistDateTo = condition.RegistDateTo.Value.AddDays(1);
            }

            ListModel<MemInfoOpenChkResult> resultData = new Wow.Tv.Admin.MemberMonitoringService.MemberMonitoringServiceClient().MemInfoOpenChk(condition);
            int actionSeq = 0;
            foreach (MemInfoOpenChkResult item in resultData.ListData)
            {
                actionSeq++;
                item.Seq = condition.CurrentIndex + actionSeq;
            }

            ViewBag.Condition = condition;
            ViewBag.ShowRegistDateFrom = showRegistDateFrom;
            ViewBag.ShowRegistDateTo = showRegistDateTo;

            return View(resultData);
        }

        private string GetActionType(string actionCode)
        {
            actionCode = actionCode?.ToUpper();
            string actionType = "";
            switch (actionCode)
            {
                case "INSERT": actionType = "등록"; break;
                case "UPDATE": actionType = "수정"; break;
                case "DELETE": actionType = "삭제"; break;
                case "EXCEL": actionType = "엑셀출력"; break;
                case "SELECT": actionType = "조회"; break;
            }
            return actionType;
        }
    }
}