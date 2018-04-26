using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.RegiCategoryManage;

namespace Wow.Tv.Admin.Areas.RegCateManage.Controllers
{
    /// <summary>
    /// 관심분야
    /// </summary>
    public class FavorFieldController : Controller
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            FavorField[] resultData = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().FavorFieldList();

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(List<FavorField> model)
        {
            foreach (FavorField item in model)
            {
                item.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            }
            FavorFieldModifyResult[] resultList = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().FavorFieldSave(model.ToArray());

            return Json(new { Called = true, ResultList = resultList });
        }
    }
}