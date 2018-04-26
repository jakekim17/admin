using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db49.broadcast.MyProgram;

namespace Wow.Tv.Admin.Areas.BroadCast.Controllers
{
    [WowTvAdminAuthorize]
    public class ExpertController : BaseController
    {
        // GET: BroadCast/Expert
        public ActionResult Search()
        {
            return View();
        }

        public ActionResult SearchList(ExpertCondition condition)
        {
            var model = new ExpertService.ExpertServiceClient().SearchList(condition);

            return View(model);
        }
    }
}