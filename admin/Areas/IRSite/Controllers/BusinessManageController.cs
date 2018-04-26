using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.BusinessManage;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class BusinessManageController : BaseController
    {
        public ActionResult Index(BusinessCondition condition)
        {
            condition.PageSize = 10;
            var list = new BusinessManageService.BusinessManageServiceClient().SearchList(condition);

            ViewBag.TotalDataCount = list.TotalDataCount;
            
            ViewBag.Condition = condition;
            ViewBag.CurrentIndex = condition.CurrentIndex;

            Debug.Write(DateTime.Now.ToString("yyyy-MM-dd HH: mm:ss"));

            return View(list);
        }

        public ActionResult Edit(BusinessCondition condition, int seq = 0)
        {
            var resultData = new BusinessManageService.BusinessManageServiceClient().GetDetail(seq);
            if(resultData == null)
            {
                resultData = new BOARD_CONT_MENU();
            }

            ViewBag.Condition = condition;
            
            return View(resultData);
        }

        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_BOARD_CONTENT model)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                int seq = new BusinessManageService.BusinessManageServiceClient().Save(model, LoginHandler.CurrentLoginUser);
                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.BOARD_CONTENT_SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "사업관리저장", "");
            }
            catch(Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int[] checkedList)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                new BusinessManageService.BusinessManageServiceClient().Delete(checkedList);
                isSuccess = true;

                //Action Log
                foreach (var item in checkedList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "IR클럽회원사 삭제", "");
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }
    }
}