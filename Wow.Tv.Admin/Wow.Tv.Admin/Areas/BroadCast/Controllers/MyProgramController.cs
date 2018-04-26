using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Broad;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.Admin.Areas.BroadCast.Controllers
{
    [WowTvAdminAuthorize]
    public class MyProgramController : BaseController
    {
        // GET: BroadCast/MyProgram
        public ActionResult Index(NewsProgramCondition condition)
        {
            // 내 프로그램만
            condition.AdminSeq = LoginHandler.CurrentLoginUser.AdminSeq;
            var resultData = new BroadService.NewsProgramServiceClient().SearchList(condition);

            ViewBag.Condition = condition;

            return View(resultData);
        }
    }
}