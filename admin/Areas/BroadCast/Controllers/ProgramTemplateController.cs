using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Broad;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.Admin.Areas.BroadCast.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class ProgramTemplateController : BaseController
    {
        // GET: BroadCast/ProgramTemplate
        public ActionResult Index(NewsProgramCondition condition)
        {
            if(String.IsNullOrEmpty(condition.IngYn) == true)
            {
                condition.IngYn = "Y";
            }
            ViewBag.Condition = condition;

            var resultData = new BroadService.NewsProgramServiceClient().SearchList(condition);

            return View(resultData);
        }

        public ActionResult Edit(string programCode)
        {
            var model = new BroadService.ProgramTemplateServiceClient().GetAtProgramTemplate(programCode);
            if (model == null)
            {
                model = new NTB_PROGRAM_TEMPLATE();
                model.PRG_CD = programCode;
            }

            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            var newsProgram = newsProgramServiceClient.GetAt(model.PRG_CD);
            ViewBag.NewsProgram = newsProgram;


            var mainFile = newsProgramServiceClient.GetMainAttachFile(programCode);
            if (mainFile == null)
            {
                mainFile = new NTB_ATTACH_FILE();
            }
            ViewBag.MainFile = mainFile;

            var subFile = newsProgramServiceClient.GetSubAttachFile(programCode);
            if (subFile == null)
            {
                subFile = new NTB_ATTACH_FILE();
            }
            ViewBag.SubFile = subFile;

            var rectangleFile = newsProgramServiceClient.GetRectangleAttachFile(programCode);
            if (rectangleFile == null)
            {
                rectangleFile = new NTB_ATTACH_FILE();
            }
            ViewBag.RectangleFile = rectangleFile;

            var thumbnailFile = newsProgramServiceClient.GetThumbnailAttachFile(programCode);
            if (thumbnailFile == null)
            {
                thumbnailFile = new NTB_ATTACH_FILE();
            }
            ViewBag.ThumbnailFile = thumbnailFile;


            return View(model);
        }


        public ActionResult PartnerSearchList(string programCode)
        {
            //var model = new BroadService.ProgramTemplateServiceClient().GetProgramTemplatePartnerList(programTemplateSeq).ToList();
            var model = new BroadService.NewsProgramServiceClient().GetProgramPartnerList(programCode).ToList();


            return View(model);
        }


        public ActionResult ProgramTemplateGroupList(int programTemplateSeq)
        {
            var model = new BroadService.ProgramTemplateServiceClient().GetProgramTemplateGroupList(programTemplateSeq).ToList();

            return View(model);
        }



        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(string programCode)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.ProgramTemplateServiceClient().DeleteProgramTemplate(programCode);
            isSuccess = true;

            ActionLogWrite(programCode, ActionLogService.ActionLogBizActionCode.Delete, "프로그램템플릿 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_PROGRAM_TEMPLATE model, List<int> payNo, List<int> programGroupSeqList
            , T_NEWS_PRG newProgram
            , HttpPostedFileBase mainFile, HttpPostedFileBase subFile, HttpPostedFileBase rectangleFile, HttpPostedFileBase thumbnailFile)
        {
            bool isSuccess = false;
            string msg = "";


            #region File Save

            // ====================================
            // File Save

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + "\\TV\\Auth\\";
            uploadWebPath = uploadWebPath + "/TV/Auth/";
            string realFileName = "";

            NTB_ATTACH_FILE mainAttachFile = null;

            #region Main File

            // ----------------------------------
            // Main File

            if (mainFile != null && mainFile.ContentLength > 0)
            {
                mainAttachFile = new NTB_ATTACH_FILE();
                mainAttachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(mainFile.FileName);
                mainAttachFile.EXTENSION = System.IO.Path.GetExtension(mainAttachFile.USER_UPLOAD_FILE_NAME);
                mainAttachFile.FILE_SIZE = mainFile.ContentLength;
                realFileName = DateTime.Now.ToFileTime().ToString() + mainAttachFile.EXTENSION;
                mainAttachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                mainAttachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //mainFile.SaveAs(mainAttachFile.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, mainFile.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, mainFile.InputStream);

                model.MainAttachFile = mainAttachFile;
                //auth.MAIN_BG_IMG = attachFile.REAL_WEB_PATH;
            }

            // Main File
            // ----------------------------------

            #endregion


            NTB_ATTACH_FILE subAttachFile = null;

            #region Sub File

            // ----------------------------------
            // Sub File

            if (subFile != null && subFile.ContentLength > 0)
            {
                subAttachFile = new NTB_ATTACH_FILE();
                subAttachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(subFile.FileName);
                subAttachFile.EXTENSION = System.IO.Path.GetExtension(subAttachFile.USER_UPLOAD_FILE_NAME);
                subAttachFile.FILE_SIZE = subFile.ContentLength;
                realFileName = DateTime.Now.ToFileTime().ToString() + subAttachFile.EXTENSION;
                subAttachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                subAttachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //subFile.SaveAs(subAttachFile.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, subFile.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, subFile.InputStream);

                model.SubAttachFile = subAttachFile;
                //auth.SUB_BG_IMG = attachFile.REAL_WEB_PATH;
            }

            // Sub File
            // ----------------------------------

            #endregion


            NTB_ATTACH_FILE rectangleAttachFile = null;

            #region Rectangle File

            // ----------------------------------
            // Rectangle File

            if (rectangleFile != null && rectangleFile.ContentLength > 0)
            {
                rectangleAttachFile = new NTB_ATTACH_FILE();
                rectangleAttachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(rectangleFile.FileName);
                rectangleAttachFile.EXTENSION = System.IO.Path.GetExtension(rectangleAttachFile.USER_UPLOAD_FILE_NAME);
                rectangleAttachFile.FILE_SIZE = rectangleFile.ContentLength;
                realFileName = DateTime.Now.ToFileTime().ToString() + rectangleAttachFile.EXTENSION;
                rectangleAttachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                rectangleAttachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //rectangleFile.SaveAs(rectangleAttachFile.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, rectangleFile.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, rectangleFile.InputStream);


                model.RectangleAttachFile = rectangleAttachFile;
            }

            // Rectangle File
            // ----------------------------------

            #endregion



            NTB_ATTACH_FILE thumbnailAttachFile = null;

            #region Thumbnail File

            // ----------------------------------
            // Rectangle File

            if (thumbnailFile != null && thumbnailFile.ContentLength > 0)
            {
                thumbnailAttachFile = new NTB_ATTACH_FILE();
                thumbnailAttachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(thumbnailFile.FileName);
                thumbnailAttachFile.EXTENSION = System.IO.Path.GetExtension(thumbnailAttachFile.USER_UPLOAD_FILE_NAME);
                thumbnailAttachFile.FILE_SIZE = thumbnailFile.ContentLength;
                realFileName = DateTime.Now.ToFileTime().ToString() + thumbnailAttachFile.EXTENSION;
                thumbnailAttachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                thumbnailAttachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //thumbnailFile.SaveAs(thumbnailAttachFile.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, thumbnailFile.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, thumbnailFile.InputStream);


                model.ThumbnailAttachFile = thumbnailAttachFile;
            }

            // Rectangle File
            // ----------------------------------

            #endregion



            // File Save
            // ====================================

            #endregion


            #region Old File Save  주석처리함 

            //string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            //string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            //uploadFilePath = uploadFilePath + "\\Broad\\Template\\";
            //uploadWebPath = uploadWebPath + "/Broad/Template/";
            //string realFileName = "";

            //NTB_ATTACH_FILE attachFile = new NTB_ATTACH_FILE();

            //if (mainFile != null && mainFile.ContentLength > 0)
            //{
            //    attachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(mainFile.FileName);
            //    attachFile.EXTENSION = System.IO.Path.GetExtension(attachFile.USER_UPLOAD_FILE_NAME);
            //    attachFile.FILE_SIZE = mainFile.ContentLength;
            //    realFileName = DateTime.Now.ToFileTime().ToString() + attachFile.EXTENSION;
            //    attachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
            //    attachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

            //    if (System.IO.Directory.Exists(uploadFilePath) == false)
            //    {
            //        System.IO.Directory.CreateDirectory(uploadFilePath);
            //    }
            //    mainFile.SaveAs(attachFile.REAL_FILE_PATH);

            //    model.MainAttachFile = attachFile;
            //}


            #endregion

            BroadService.ProgramTemplateServiceClient programTemplateServiceClient = new BroadService.ProgramTemplateServiceClient();
            int programTemplateSeq = programTemplateServiceClient.SaveProgramTemplate(model, newProgram, LoginHandler.CurrentLoginUser);

            #region Partner

            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            newsProgramServiceClient.DeleteProgramPartnerList(model.PRG_CD);
            if (payNo != null)
            {
                foreach (int item in payNo)
                {
                    newsProgramServiceClient.AddProgramPartner(model.PRG_CD, item, LoginHandler.CurrentLoginUser);
                }
            }

            //programTemplateServiceClient.DeleteProgramTemplatePartnerList(programTemplateSeq);
            //if (payNo != null)
            //{
            //    foreach (int item in payNo)
            //    {
            //        programTemplateServiceClient.AddProgramTemplatePartner(programTemplateSeq, item, LoginHandler.CurrentLoginUser);
            //    }
            //}
            #endregion


            #region Group
            programTemplateServiceClient.DeleteProgramTemplateGroupList(programTemplateSeq);
            if (programGroupSeqList != null)
            {
                foreach (int item in programGroupSeqList)
                {
                    programTemplateServiceClient.AddProgramTemplateGroup(programTemplateSeq, item, LoginHandler.CurrentLoginUser);
                }
            }
            #endregion
            isSuccess = true;


            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            if(model.PROGRAM_TEMPLATE_SEQ == 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            }
            ActionLogWrite(programTemplateSeq.ToString(), actionCode, "프로그램템플릿 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        public ActionResult ProgramGroupSearch()
        {
            return View();
        }

        public ActionResult ProgramGroupSearchList(BroadGroupCondition condition)
        {
            var resultData = new BroadService.ProgramGroupServiceClient().SearchListProgramGroup(condition);

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult ProgramGroupSave(NTB_PROGRAM_GROUP model)
        {
            bool isSuccess = false;
            string msg = "";

            int programGroupSeq = new BroadService.ProgramGroupServiceClient().SaveProgramGroup(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            if (model.PROGRAM_GROUP_SEQ == 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            }
            ActionLogWrite(programGroupSeq.ToString(), actionCode, "프로그램그룹 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult ProgramGroupDelete(int programGroupSeq)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.ProgramGroupServiceClient().DeleteProgramGroup(programGroupSeq);
            isSuccess = true;
            
            ActionLogWrite(programGroupSeq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "프로그램그룹 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

    }
}