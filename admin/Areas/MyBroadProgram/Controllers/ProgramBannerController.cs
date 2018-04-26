using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.MyProgram;

namespace Wow.Tv.Admin.Areas.MyBroadProgram.Controllers
{
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class ProgramBannerController : BaseController
    {
        // GET: MyBroadProgram/ProgramBanner
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult SearchList(BannerCondition condition)
        {
            var resultData = new BannerService.BannerServiceClient().SearchList(condition);

            return View(resultData);
        }


        public ActionResult Edit(int programBannerSeq)
        {
            var model = new BannerService.BannerServiceClient().GetAt(programBannerSeq);
            if(model == null)
            {
                model = new NTB_PROGRAM_BANNER();
                model.AttachFile = new NTB_ATTACH_FILE();
            }

            return View(model);
        }



        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Save(NTB_PROGRAM_BANNER model, HttpPostedFileBase bannerFile)
        {
            bool isSuccess = false;
            string msg = "";

            #region File Save

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + "\\TV\\ProgramBanner\\";
            uploadWebPath = uploadWebPath + "/TV/ProgramBanner/";
            //uploadFilePath = uploadFilePath + "\\qqq\\";
            //uploadWebPath = uploadWebPath + "/qqq/";
            string realFileName = "";

            NTB_ATTACH_FILE attachFile = new NTB_ATTACH_FILE();
            
            if (bannerFile != null && bannerFile.ContentLength > 0)
            {
                attachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(bannerFile.FileName);
                attachFile.EXTENSION = System.IO.Path.GetExtension(attachFile.USER_UPLOAD_FILE_NAME);
                attachFile.FILE_SIZE = bannerFile.ContentLength;
                realFileName = DateTime.Now.ToFileTime().ToString() + attachFile.EXTENSION;
                attachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                attachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //bannerFile.SaveAs(attachFile.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, bannerFile.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, bannerFile.InputStream);
                
                model.AttachFile = attachFile;
            }


            #endregion

            model.PRG_CD = Request["ProgramCode"];
            int seq = new BannerService.BannerServiceClient().Save(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            if (model.PROGRAM_BANNER_SEQ > 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Update;
            }
            ActionLogWrite(seq.ToString(), actionCode, "프로그램배너 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        [HttpPost]
        public ActionResult Delete(int seq)
        {
            bool isSuccess = false;
            string msg = "";

            new BannerService.BannerServiceClient().Delete(seq);
            isSuccess = true;

            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "프로그램배너 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        public ActionResult DeleteList(List<int> seqList)
        {
            bool isSuccess = false;
            string msg = "";

            new BannerService.BannerServiceClient().DeleteList(seqList.ToArray());
            isSuccess = true;

            foreach (var item in seqList)
            {
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "프로그램배너 삭제", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


    }
}