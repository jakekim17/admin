using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.RegiCategoryManage;

namespace Wow.Tv.Admin.Areas.RegCateManage.Controllers
{
    /// <summary>
    /// 투자기간
    /// </summary>
    public class IvstProdController : Controller
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            IvstProd[] resultData = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().IvstProdList();

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(List<IvstProd> model)
        {
            foreach (IvstProd item in model)
            {
                item.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            }
            IvstProdModifyResult[] resultList = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().IvstProdSave(model.ToArray());

            return Json(new { Called = true, ResultList = resultList });
        }
    }
}