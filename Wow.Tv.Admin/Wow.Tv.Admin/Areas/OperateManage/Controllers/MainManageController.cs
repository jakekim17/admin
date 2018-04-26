using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.MainManage;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class MainManageController : BaseController
    {
        // GET: OperateManage/MainManage
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Edit(int mainManageSeq)
        {
            var model = new MainManageService.MainManageServiceClient().GetAt(mainManageSeq);
            if(model == null)
            {
                model = new NTB_MAIN_MANAGE();
                model.AttachFile = new NTB_ATTACH_FILE();
            }

            return View(model);
        }

        public ActionResult SearchList(MainManageCondition condition)
        {
            condition.PageSize = -1;
            var model = new MainManageService.MainManageServiceClient().SearchList(condition);

            return View(model);
        }



        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_MAIN_MANAGE model, HttpPostedFileBase file)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                #region 첨부파일

                NTB_ATTACH_FILE attachFile = null;

                string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPathRoot"];
                string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPathRoot"];
                uploadFilePath = uploadFilePath + "\\MainManage\\";
                uploadWebPath = uploadWebPath + "/MainManage/";
                string realFileName = "";

                if (file != null && file.ContentLength > 0)
                {
                    attachFile = new NTB_ATTACH_FILE();
                    attachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(file.FileName);
                    attachFile.EXTENSION = System.IO.Path.GetExtension(attachFile.USER_UPLOAD_FILE_NAME);
                    attachFile.FILE_SIZE = file.ContentLength;
                    realFileName = DateTime.Now.ToFileTime().ToString() + attachFile.EXTENSION;
                    attachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                    attachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                    //if (System.IO.Directory.Exists(uploadFilePath) == false)
                    //{
                    //    System.IO.Directory.CreateDirectory(uploadFilePath);
                    //}
                    //file.SaveAs(attachFile.REAL_FILE_PATH);
                    //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, file.InputStream);
                    new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, file.InputStream);

                }

                #endregion

                model.AttachFile = attachFile;
                new MainManageService.MainManageServiceClient().Save(model, LoginHandler.CurrentLoginUser);

                isSuccess = true;
            }
            catch(Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int mainManageSeq)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new MainManageService.MainManageServiceClient().Delete(mainManageSeq);

                isSuccess = true;
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult UpDown(int mainManageSeq, bool isUp)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new MainManageService.MainManageServiceClient().UpDown(mainManageSeq, isUp, LoginHandler.CurrentLoginUser);


                isSuccess = true;
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


    }
}