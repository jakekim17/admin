using System;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv.MemberManage;

namespace Wow.Tv.Admin.Areas.Monitoring.Controllers
{
    public class AccAuthController : BaseController
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index(AccAuthCondition condition)
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
            ListModel<AccAuthResult> resultData = new Wow.Tv.Admin.MemberMonitoringService.MemberMonitoringServiceClient().AccAuth(condition);

            int seq = 0;
            foreach (AccAuthResult item in resultData.ListData)
            {
                seq++;
                item.ActionSeq = condition.CurrentIndex + seq;
            }

            ViewBag.Condition = condition;
            ViewBag.ShowRegistDateFrom = showRegistDateFrom;
            ViewBag.ShowRegistDateTo = showRegistDateTo;

            return View(resultData);
        }
    }
}