using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.Admin.Areas.MyBroadProgram.Controllers
{
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class ProgramIntroController : BaseController
    {
        // GET: MyBroadProgram/ProgramIntro
        public ActionResult Index(string programCode)
        {
            var model = new ProgramIntroService.ProgramIntroServiceClient().GetAt(programCode);

            if (model == null)
            {
                model = new NTB_PROGRAM_INTRO();
                model.PRG_CD = programCode;
            }


            if (model.AttachFile == null)
            {
                model.AttachFile = new NTB_ATTACH_FILE();
            }

            return View(model);
        }


        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Save(NTB_PROGRAM_INTRO model, HttpPostedFileBase mainFile)
        {
            bool isSuccess = false;
            string msg = "";


            #region File Save


            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + "\\TV\\ProgramIntro\\";
            uploadWebPath = uploadWebPath + "/TV/ProgramIntro/";
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

                model.AttachFile = attachFile;
            }


            #endregion

            int programIntroSeq = new ProgramIntroService.ProgramIntroServiceClient().Save(model,LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            if (model.PROGRAM_INTRO_SEQ == 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            }
            ActionLogWrite(programIntroSeq.ToString(), actionCode, "프로그램소개글 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }




    }
}