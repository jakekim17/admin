using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.wowtv.Admin;
using Wow.Tv.Middle.Model.Db49.wowtv.ActionLog;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class AdminLogController : BaseController
    {
        // GET: OperateManage/AdminLog
        public ActionResult Index()
        {
            CommonCodeCondition codeCondition = new CommonCodeCondition();
            codeCondition.UpCommonCode = CommonCodeStatic.ACTION_CODE;
            var actionCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition);

            return View(actionCodeList.ListData);
        }

        
        public ActionResult SearchList(ActionLogCondition condition)
        {
            var resultData = new ActionLogService.ActionLogServiceClient().SearchList(condition);

            return View(resultData);
        }

        [HttpPost]
        public ActionResult Excel(ActionLogCondition condition)
        {
            var returnStream = new ActionLogService.ActionLogServiceClient().ExcelExport(condition);
            returnStream.Position = 0;

            return File(returnStream, "application/ms-excel", "운영자 로그 목록.xlsx");
        }
    }
}