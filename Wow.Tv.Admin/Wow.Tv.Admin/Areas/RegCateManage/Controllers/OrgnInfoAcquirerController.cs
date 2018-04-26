using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.RegiCategoryManage;

namespace Wow.Tv.Admin.Areas.RegCateManage.Controllers
{
    /// <summary>
    /// 기존정보습득처
    /// </summary>
    public class OrgnInfoAcquirerController : Controller
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            OrgnInfoAcquirer[] resultData = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().OrgnInfoAcquirerList();

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(List<OrgnInfoAcquirer> model)
        {
            foreach (OrgnInfoAcquirer item in model)
            {
                item.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            }
            OrgnInfoAcquirerModifyResult[] resultList = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().OrgnInfoAcquirerSave(model.ToArray());

            return Json(new { Called = true, ResultList = resultList });
        }
    }
}