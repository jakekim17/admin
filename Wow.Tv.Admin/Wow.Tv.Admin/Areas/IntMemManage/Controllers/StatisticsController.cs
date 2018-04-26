using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.MemberAdminManage;

namespace Wow.Tv.Admin.Areas.IntMemManage.Controllers
{
    public class StatisticsController : Controller
    {
        public ActionResult Index()
        {
            MemberInfoStatisticsResult retval = new Wow.Tv.Admin.MemberManageService.MemberManageServiceClient().MemberInfoStatistics();
            return View(retval);
        }
    }
}