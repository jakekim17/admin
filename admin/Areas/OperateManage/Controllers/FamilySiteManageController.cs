using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.wowtv.Family;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class FamilySiteManageController : BaseController
    {
        // GET: OperateManage/FamilySiteManage
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult SearchList(FamilyCondition condition)
        {
            var resultData = new FamilyService.FamilyServiceClient().SearchList(condition);

            return View(resultData);
        }



        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int familySeq)
        {
            NTB_FAMILY model = new NTB_FAMILY();

            if (familySeq > 0)
            {
                model = new FamilyService.FamilyServiceClient().GetAt(familySeq);
            }


            CommonCodeCondition codeCondition = new CommonCodeCondition();
            codeCondition.UpCommonCode = CommonCodeStatic.FAMILY_SITE_CODE;
            var familyGroupCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition);

            ViewBag.FamilyGroupCodeList = familyGroupCodeList.ListData;


            return View(model);
        }



        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_FAMILY model)
        {
            bool isSuccess = false;
            string msg = "";

            int familySeq = new FamilyService.FamilyServiceClient().Save(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            // Action Log
            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            if (model.FAMILY_SEQ == 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            }
            ActionLogWrite(familySeq.ToString(), actionCode, "패밀리사이트 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int familySeq)
        {
            bool isSuccess = false;
            string msg = "";

            new FamilyService.FamilyServiceClient().Delete(familySeq, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            // Action Log
            ActionLogWrite(familySeq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "패밀리사이트 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult DeleteList(List<int> seqList)
        {
            bool isSuccess = false;
            string msg = "";

            new FamilyService.FamilyServiceClient().DeleteList(seqList.ToArray(), LoginHandler.CurrentLoginUser);
            isSuccess = true;

            foreach (var item in seqList)
            {
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "패밀리사이트 삭제", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }




        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult UpDown(int familySeq, bool isUp)
        {
            bool isSuccess = false;
            string msg = "";

            new FamilyService.FamilyServiceClient().UpDown(familySeq, isUp, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            // Action Log
            ActionLogWrite(familySeq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "패밀리사이트 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        [HttpPost]
        public ActionResult Excel(FamilyCondition condition)
        {
            var returnStream = new FamilyService.FamilyServiceClient().ExcelExport(condition);
            returnStream.Position = 0;

            ActionLogWrite(0.ToString(), ActionLogService.ActionLogBizActionCode.Excel, "패밀리사이트 엑셀 다운로드", "");

            return File(returnStream, "application/ms-excel", "패밀리사이트 목록.xlsx");
        }



    }
}