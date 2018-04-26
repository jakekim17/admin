using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.RegiCategoryManage;

namespace Wow.Tv.Admin.Areas.RegCateManage.Controllers
{
    /// <summary>
    /// 연간수입
    /// </summary>
    public class YearIncomeController : Controller
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            YearIncome[] resultData = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().YearIncomeList();

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(List<YearIncome> model)
        {
            foreach (YearIncome item in model)
            {
                item.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            }
            YearIncomeModifyResult[] resultList = new Wow.Tv.Admin.RegCateManageService.RegCateManageServiceClient().YearIncomeSave(model.ToArray());

            return Json(new { Called = true, ResultList = resultList });
        }
    }
}