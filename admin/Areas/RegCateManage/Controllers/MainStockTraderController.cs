using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.RegiCategoryManage;

namespace Wow.Tv.Admin.Areas.RegCateManage.Controllers
{
    /// <summary>
    /// 주요증권거래사
    /// </summary>
    public class MainStockTraderController : Controller
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            MainStockTrader[] resultData = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().MainStockTraderList();

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(List<MainStockTrader> model)
        {
            foreach (MainStockTrader item in model)
            {
                item.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            }
            MainStockTraderModifyResult[] resultList = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().MainStockTraderSave(model.ToArray());

            return Json(new { Called = true, ResultList = resultList });
        }
    }
}