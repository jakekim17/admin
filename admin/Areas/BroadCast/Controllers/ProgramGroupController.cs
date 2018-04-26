using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Broad;

namespace Wow.Tv.Admin.Areas.BroadCast.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class ProgramGroupController : BaseController
    {
        // GET: BroadCast/ProgramGroup
        public ActionResult Index(BroadGroupCondition condition)
        {
            var model = new BroadService.ProgramGroupServiceClient().SearchListProgramGroup(condition);

            ViewBag.Condition = condition;

            return View(model);
        }

        public ActionResult Edit(int programGroupSeq, BroadGroupCondition condition)
        {
            var model = new BroadService.ProgramGroupServiceClient().GetAtProgramGroup(programGroupSeq);
            if(model == null)
            {
                model = new NTB_PROGRAM_GROUP();
            }

            if(model.MainAttachFile == null)
            {
                model.MainAttachFile = new NTB_ATTACH_FILE();
            }

            ViewBag.Condition = condition;

            return View(model);
        }




        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_PROGRAM_GROUP model, HttpPostedFileBase mainFile)
        {
            bool isSuccess = false;
            string msg = "";

            #region File Save

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + "\\TV\\ProgramGroup\\";
            uploadWebPath = uploadWebPath + "/TV/ProgramGroup/";
            string realFileName = "";

            NTB_ATTACH_FILE attachFile = new NTB_ATTACH_FILE();

            if (mainFile != null && mainFile.ContentLength > 0)
            {
                attachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(mainFile.FileName);
                attachFile.EXTENSION = System.IO.Path.GetExtension(attachFile.USER_UPLOAD_FILE_NAME);
                attachFile.FILE_SIZE = mainFile.ContentLength;
                realFileName = DateTime.Now.ToFileTime().ToString() + attachFile.EXTENSION;
                attachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                attachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //mainFile.SaveAs(attachFile.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, mainFile.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, mainFile.InputStream);

                model.MainAttachFile = attachFile;
            }


            #endregion


            int seq = new BroadService.ProgramGroupServiceClient().SaveProgramGroup(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            if (model.PROGRAM_GROUP_SEQ == 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            }
            ActionLogWrite(seq.ToString(), actionCode, "프로그램 그룹 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }




        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int programGroupSeq)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.ProgramGroupServiceClient().DeleteProgramGroup(programGroupSeq);
            isSuccess = true;

            ActionLogWrite(programGroupSeq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "프로그램 그룹 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult DeleteList(List<int> seqList)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.ProgramGroupServiceClient().DeleteProgramGroupList(seqList.ToArray());
            isSuccess = true;

            foreach (var item in seqList)
            {
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "프로그램 그룹 삭제", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }





        public ActionResult ProgramTemplateList(int programGroupSeq)
        {
            var model = new BroadService.ProgramTemplateServiceClient().GetProgramTemplateGroupListByGroupSeq(programGroupSeq).ToList();
            
            return View(model);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult ProgramTemplateUpDown(int programTemplateSeq, int programGroupSeq, bool isUp)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.ProgramTemplateServiceClient().UpDownProgramTemplateGroupList(programTemplateSeq, programGroupSeq, isUp);
            isSuccess = true;
            

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult ProgramTemplateDelete(int programTemplateSeq, int programGroupSeq)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.ProgramTemplateServiceClient().DeleteProgramTemplateGroup(programTemplateSeq, programGroupSeq);
            isSuccess = true;


            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
    }
}