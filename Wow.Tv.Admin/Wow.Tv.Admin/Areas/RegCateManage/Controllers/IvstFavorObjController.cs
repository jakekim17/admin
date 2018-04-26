using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.RegiCategoryManage;

namespace Wow.Tv.Admin.Areas.RegCateManage.Controllers
{
    /// <summary>
    /// 투자선호대상
    /// </summary>
    public class IvstFavorObjController : Controller
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            IvstFavorObj[] resultData = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().IvstFavorObjList();

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(List<IvstFavorObj> model)
        {
            foreach (IvstFavorObj item in model)
            {
                item.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            }
            IvstFavorObjModifyResult[] resultList = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().IvstFavorObjSave(model.ToArray());

            return Json(new { Called = true, ResultList = resultList });
        }
    }
}