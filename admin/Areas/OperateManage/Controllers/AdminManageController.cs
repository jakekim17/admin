using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Group;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.wowtv.Admin;
using Wow.Tv.Admin.AdminService;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class AdminManageController : BaseController
    {
        // GET: OperateManage/AdminManage
        public ActionResult Index()
        {
            GroupCondition groupCondition = new GroupCondition();
            groupCondition.PageSize = -1;
            var groupList = new GroupService.GroupServiceClient().SearchList(groupCondition);

            CommonCodeCondition codeCondition = new CommonCodeCondition();
            codeCondition.UpCommonCode = CommonCodeStatic.PART_CODE;
            var partCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition);

            ViewBag.GroupList = groupList.ListData;
            ViewBag.PartCodeList = partCodeList.ListData;

            return View();
        }

        
        public ActionResult SearchList(AdminCondition condition)
        {
            var resultData = new AdminService.AdminServiceClient().SearchList(condition);
            
            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult DeleteList(List<int> seqList)
        {
            bool isSuccess = false;
            string msg = "";

            new AdminService.AdminServiceClient().DeleteList(seqList.ToArray(), LoginHandler.CurrentLoginUser);
            isSuccess = true;

            foreach (var item in seqList)
            {
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "운영자 삭제", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int seq)
        {
            TAB_CMS_ADMIN model = new TAB_CMS_ADMIN();

            if (seq > 0)
            {
                model = new AdminService.AdminServiceClient().GetAt(seq);
//#if DEBUG
//#else
//                model.PWD = Wow.Fx.XdbCrypto.Decrypt(model.PWD);
//#endif
            }


            GroupCondition groupCondition = new GroupCondition();
            groupCondition.PageSize = -1;
            var groupList = new GroupService.GroupServiceClient().SearchList(groupCondition);
            ViewBag.GroupList = groupList.ListData;


            CommonCodeCondition codeCondition = new CommonCodeCondition();
            codeCondition.UpCommonCode = CommonCodeStatic.PART_CODE;
            var partCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition);
            ViewBag.PartCodeList = partCodeList.ListData;

            codeCondition = new CommonCodeCondition();
            codeCondition.UpCommonCode = CommonCodeStatic.JOB_CODE;
            var jobCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition);
            ViewBag.JobCodeList = jobCodeList.ListData;


            return View(model);
        }



        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(TAB_CMS_ADMIN model)
        {
            bool isSuccess = false;
            string msg = "";

            int seq = new AdminService.AdminServiceClient().Save(model);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            if (model.SEQ > 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Update;
            }
            ActionLogWrite(seq.ToString(), actionCode, "운영자 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int seq)
        {
            bool isSuccess = false;
            string msg = "";

            new AdminService.AdminServiceClient().Delete(seq, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "운영자 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        [HttpPost]
        public ActionResult Excel(AdminCondition condition)
        {
            var returnStream = new AdminService.AdminServiceClient().ExcelExport(condition);
            returnStream.Position = 0;

            ActionLogWrite(0.ToString(), ActionLogService.ActionLogBizActionCode.Excel, "운영자 엑셀 다운로드", "");

            return File(returnStream, "application/ms-excel", "운영자 목록.xlsx");
        }


		//어드민 ID 비밀번호 초기화 : 고정값
		public ActionResult usp_AdminCmsPwdInitialize(string adminid)
		{
			bool isSuccess = false;
			string msg = "";

			if (!string.IsNullOrEmpty(adminid))
			{
				new AdminService.AdminServiceClient().usp_AdminCmsPwdInitialize(adminid);
				isSuccess = true;
				msg = "SP가 정상적으로 수행됐습니다.";
			}
			else
			{
				isSuccess = false;
				msg = "adminid가 빈값이거나 NULL입니다.";
			}
			
			return Json(new { IsSuccess = isSuccess, Msg = msg }, JsonRequestBehavior.AllowGet);
		}


		//어드민 ID 비밀번호 초기화 : 난수값
		public ActionResult AdminCmsPwdInitializeRanNum(string adminId)
		{
				// 비밀번호 초기화 : 난수값
				SetPasswordResult retval = new AdminService.AdminServiceClient().AdminCmsPwdInitializeRanNum(adminId);

				// 초기화된 비밀번호 SMS 전송
				new MemberUtilService.MemberUtilServiceClient().SmsTempPassword(retval.MobileNo, retval.TempPassword);

				return Json(new { IsSuccess = retval.Success, ReturnMessage = retval.ReturnMessage });
		}


	}
}