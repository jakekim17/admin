using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.RegiCategoryManage;

namespace Wow.Tv.Admin.Areas.RegCateManage.Controllers
{
    /// <summary>
    /// 투자규모
    /// </summary>
    public class IvstScaleController : Controller
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            IvstScale[] resultData = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().IvstScaleList();

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(List<IvstScale> model)
        {
            foreach (IvstScale item in model)
            {
                item.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            }
            IvstScaleModifyResult[] resultList = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().IvstScaleSave(model.ToArray());

            return Json(new { Called = true, ResultList = resultList });
        }
    }
}