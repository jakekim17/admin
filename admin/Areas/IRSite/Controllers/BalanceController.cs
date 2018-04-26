using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db51.contents;
using Wow.Tv.Middle.Model.Db51.contents.Balance;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class BalanceController : BaseController
    {
        public ActionResult Index(BalanceCondition condition)
        {
            condition.PageSize = 10;
            var list = new BalanceService.BalanceServiceClient().GetList(condition);

            ViewBag.TotalDataCount = list.TotalDataCount;
            ViewBag.Condition = condition;
            ViewBag.year = condition.Year;
            //ViewBag.login = LoginHandler.CurrentLoginUser;

            return View(list);
        }

        //삭제
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int[] deleteList)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new BalanceService.BalanceServiceClient().Delete(deleteList);
                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "요약대차대조표삭제", "");
                }
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });

        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(BalanceCondition condition, int no = 0)
        {

            DateTime date = DateTime.Now; //현재날짜

            int startYear = 1999;
            var list = new BalanceService.BalanceServiceClient().GetList(condition); //분기리스트 
            var data = new BalanceService.BalanceServiceClient().GetData(no); 

            if(data == null)
            {
                data = new NTB_FINANCE_STATUS();
            }


            ViewBag.startYear = startYear;
            ViewBag.date = date;
            ViewBag.currDate = String.Format("{0:yyyy-MM-dd}", Convert.ToDateTime(date.ToString()));
            ViewBag.list = list;


            return View(data);
        }

        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_FINANCE_STATUS model)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                int no = new BalanceService.BalanceServiceClient().Save(model, LoginHandler.CurrentLoginUser);
                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.NO == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(no.ToString(), actionCode, "요약대차대조표 저장", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }
    }
}