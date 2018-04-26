using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.Admin.Areas.BroadCast.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class ScheduleManageController : BaseController
    {
        // GET: BroadCast/ScheduleManage
        public ActionResult Index()
        {
            NTB_ATTACH_FILE model = new BroadService.NewsProgramServiceClient().GetExcelFile();
            
            if(model == null)
            {
                model = new NTB_ATTACH_FILE();
            }

            return View(model);
        }


        public ActionResult SearchList(string date)
        {
            //condition.PageSize = -1;
            //var resultData = new BroadService.NewsProgramServiceClient().SearchList(condition);
            var resultData = new BroadService.NewsProgramServiceClient().SearchListRunDown(date).ToList();

            return View(resultData);
        }


        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(T_NEWS_PRG model)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.NewsProgramServiceClient().SaveSchedule(model);
            isSuccess = true;

            // Action Log
            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            //if (String.IsNullOrEmpty(model.PRG_CD) == true)
            //{
            //    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            //}
            ActionLogWrite(model.PRG_CD, actionCode, "방송편성표 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult ExcelSave(HttpPostedFileBase file)
        {
            bool isSuccess = false;
            string msg = "";

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + "\\TV\\Schedule\\";
            uploadWebPath = uploadWebPath + "/TV/Schedule/";
            string realFileName = "";

            NTB_ATTACH_FILE model = new NTB_ATTACH_FILE();
            model.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(file.FileName);
            model.EXTENSION = System.IO.Path.GetExtension(model.USER_UPLOAD_FILE_NAME);
            model.FILE_SIZE = file.ContentLength;
            realFileName = DateTime.Now.ToFileTime().ToString() + model.EXTENSION;
            model.REAL_FILE_PATH = uploadFilePath + realFileName;
            model.REAL_WEB_PATH = uploadWebPath + realFileName;

            //if (System.IO.Directory.Exists(uploadFilePath) == false)
            //{
            //    System.IO.Directory.CreateDirectory(uploadFilePath);
            //}
            //file.SaveAs(model.REAL_FILE_PATH);
            //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, file.InputStream);
            new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, file.InputStream);

            //var file = Request.Files[0];

            new BroadService.NewsProgramServiceClient().ExcelFileSave(model);
            isSuccess = true;

            ActionLogWrite("OnlyOne", ActionLogService.ActionLogBizActionCode.Update, "방송편성표 파일 업로드", "");


            return Json(new { IsSuccess = isSuccess, Msg = msg, UserFileName = model.USER_UPLOAD_FILE_NAME, NowDate = DateTime.Now.ToDate() });
        }

    }
}