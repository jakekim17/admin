using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class CategoryManageController : BaseController
    {
        public ActionResult Index()
        {
            var list = new CTGRManageService.CTGRManageServiceClient().GetList();
            return View(list);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_CTGR model)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                int seq = new CTGRManageService.CTGRManageServiceClient().Save(model, LoginHandler.CurrentLoginUser);
                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.CTGR_SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "카테고리 저장", "");
            }
            catch(Exception e)
            {
                msg = e.Message;
            }
            
            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Delete (int seq)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new CTGRManageService.CTGRManageServiceClient().Delete(seq);
                isSuccess = true;
                ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "카테고리 활성수정", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }
    }
}