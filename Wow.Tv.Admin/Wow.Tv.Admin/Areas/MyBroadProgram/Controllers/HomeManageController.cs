using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.editVOD;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.Admin.Areas.MyBroadProgram.Controllers
{
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class HomeManageController : BaseController
    {
        // GET: MyBroadProgram/HomeManage
        public ActionResult Index(string programCode)
        {
            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            var model = newsProgramServiceClient.GetAt(programCode);

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

            return View(model);
        }


        public ActionResult PartnerSearchList(string programCode)
        {
            var model = new BroadService.NewsProgramServiceClient().GetProgramPartnerList(programCode).ToList();

            return View(model);
        }



        [HttpPost]
        public ActionResult Save(T_NEWS_PRG model, NewsProgramAddModel newsProgramAddModel, List<int> payNo
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

            }

            // Rectangle File
            // ----------------------------------

            #endregion




            // File Save
            // ====================================

            #endregion


            model.PGMDAY = newsProgramAddModel.Monday + newsProgramAddModel.Tuesday + newsProgramAddModel.Wednesday + newsProgramAddModel.Thursday +
                newsProgramAddModel.Friday + newsProgramAddModel.Saturday + newsProgramAddModel.Sunday;

            model.BRO_START = newsProgramAddModel.StartHour + ":" + newsProgramAddModel.StartMinute;
            model.BRO_END = newsProgramAddModel.EndHour + ":" + newsProgramAddModel.EndMinute;

            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            newsProgramServiceClient.SaveFromMyProgram(model, mainAttachFile, subAttachFile, rectangleAttachFile, thumbnailAttachFile);
            

            #region Partner
            newsProgramServiceClient.DeleteProgramPartnerList(model.PRG_CD);
            if (payNo != null)
            {
                foreach (int item in payNo)
                {
                    newsProgramServiceClient.AddProgramPartner(model.PRG_CD, item, LoginHandler.CurrentLoginUser);
                }
            }
            #endregion

            isSuccess = true;

            ActionLogWrite(model.PRG_CD, ActionLogService.ActionLogBizActionCode.Update, "프로그램 수정", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



    }
}