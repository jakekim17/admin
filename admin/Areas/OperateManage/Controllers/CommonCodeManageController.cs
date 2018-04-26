using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class CommonCodeManageController : BaseController
    {
        // GET: OperateManage/CommonCodeManage
        public ActionResult Index()
        {
            return View();
        }

        
        public ActionResult SearchList(CommonCodeCondition condition)
        {
            condition.PageSize = -1;
            var resultData = new CommonCodeService.CommconCodeServiceClient().SearchList(condition);

            ViewBag.UpCommonCode = condition.UpCommonCode;

            return View(resultData.ListData);
        }


        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(string commonCode, string upCommonCode)
        {
            NTB_COMMON_CODE model = new NTB_COMMON_CODE();

            if(String.IsNullOrEmpty(commonCode) == true)
            {
                model.UP_COMMON_CODE = upCommonCode;
            }
            else
            {
                model = new CommonCodeService.CommconCodeServiceClient().GetAt(commonCode);
            }

            return View(model);
        }



        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_COMMON_CODE model)
        {
            bool isSuccess = false;
            string msg = "";

            string commonCode = new CommonCodeService.CommconCodeServiceClient().Save(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            // Action Log
            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            if (String.IsNullOrEmpty(model.COMMON_CODE) == true)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            }
            ActionLogWrite(commonCode, actionCode, "공통코드 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(string commonCode)
        {
            bool isSuccess = false;
            string msg = "";
            string upCommonCode = "";

            CommonCodeService.CommconCodeServiceClient commonCodeServiceClient = new CommonCodeService.CommconCodeServiceClient();

            upCommonCode = commonCodeServiceClient.GetAt(commonCode).UP_COMMON_CODE;
            commonCodeServiceClient.Delete(commonCode, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            // Action Log
            ActionLogWrite(commonCode, ActionLogService.ActionLogBizActionCode.Delete, "공통코드 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg, UpCommonCode = upCommonCode });
        }



    }
}