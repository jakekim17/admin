using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.RegiCategoryManage;

namespace Wow.Tv.Admin.Areas.RegCateManage.Controllers
{
    /// <summary>
    /// 투자성향
    /// </summary>
    public class InvstTendencyController : Controller
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            InvstTendency[] resultData = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().InvstTendencyList();

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(List<InvstTendency> model)
        {
            foreach (InvstTendency item in model)
            {
                item.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            }
            InvstTendencyModifyResult[] resultList = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().InvstTendencySave(model.ToArray());

            return Json(new { Called = true, ResultList = resultList });
        }
    }
}