using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.editVOD;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.wowtv.Group;
using Wow.Tv.Middle.Model.Db49.wowtv.Admin;
using Wow.Tv.Middle.Model.Db49.wowtv.Menu;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.Admin.Areas.BroadCast.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class NewsProgramManageController : BaseController
    {
        // GET: BroadCast/NewsProgramManage
        public ActionResult Index(NewsProgramCondition condition)
        {
            var resultData = new BroadService.NewsProgramServiceClient().SearchList(condition);

            ViewBag.Condition = condition;


            CommonCodeCondition commonCodeCondition = new CommonCodeCondition();
            commonCodeCondition.UpCommonCode = CommonCodeStatic.BROAD_TYPE_CODE;
            var broadTypeCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);
            ViewBag.BroadTypeCodeList = broadTypeCodeList.ListData;
            
            commonCodeCondition.UpCommonCode = CommonCodeStatic.BROAD_CATEGORY_CODE;
            var broadCategoryCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);
            ViewBag.BroadCategoryCodeList = broadCategoryCodeList.ListData;

            return View(resultData);
        }



        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(string programCode)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.NewsProgramServiceClient().DeleteImgSchedule(programCode);
            isSuccess = true;

            ActionLogWrite(programCode, ActionLogService.ActionLogBizActionCode.Delete, "프로그램 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        public ActionResult GetCategoryList(int pseq, int categoryCode)
        {
            bool isSuccess = true;

            var model = new BroadService.NewsProgramServiceClient().GetCategoryList(pseq);

            List<Wow.Tv.Middle.Model.Common.StringInt> jsonModel = new List<Middle.Model.Common.StringInt>();
            foreach(var item in model.ListData)
            {
                Wow.Tv.Middle.Model.Common.StringInt stringIntItem = new Middle.Model.Common.StringInt();
                stringIntItem.IntValue = item.MSEQ;
                stringIntItem.StringValue = item.CODE_VAL;
                //stringIntItem.AddValue1 = (item.MSEQ == categoryCode ? "selected" : "");

                jsonModel.Add(stringIntItem);
            }

            return Json(new { IsSuccess = isSuccess, List = jsonModel });
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(string programCode, NewsProgramCondition condition)
        {
            ViewBag.Condition = condition;

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


            CommonCodeCondition commonCodeCondition = new CommonCodeCondition();
            commonCodeCondition.UpCommonCode = CommonCodeStatic.BROAD_TYPE_CODE;
            var broadTypeCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);
            ViewBag.BroadTypeCodeList = broadTypeCodeList.ListData;

            commonCodeCondition.UpCommonCode = CommonCodeStatic.BROAD_SECTION_CODE;
            var broadSectionCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);
            ViewBag.BroadSectionCodeList = broadSectionCodeList.ListData;

            //commonCodeCondition = new CommonCodeCondition();
            //commonCodeCondition.UpCommonCode = CommonCodeStatic.BROAD_CATEGORY_CODE;
            //var broadCategoryCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);
            //ViewBag.BroadCategoryCodeList = broadCategoryCodeList.ListData;

            return View(model);
        }




        public ActionResult PartnerSearchList(string programCode)
        {
            var model = new BroadService.NewsProgramServiceClient().GetProgramPartnerList(programCode).ToList();

            return View(model);
        }



        #region Admin


        public ActionResult PopAdminSearch()
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

        public ActionResult PopAdminSearchList(AdminCondition condition)
        {
            var resultData = new AdminService.AdminServiceClient().SearchList(condition);

            return View(resultData);
        }



        public ActionResult AdminSearchList(string programCode)
        {
            var model = new BroadService.NewsProgramServiceClient().GetProgramAdminList(programCode).ToList();

            return View(model);
        }


        #endregion


        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(T_NEWS_PRG model, HttpPostedFileBase mainFile
            , List<int> payNo, List<int> adminSeq
            , HttpPostedFileBase subFile, HttpPostedFileBase rectangleFile, HttpPostedFileBase thumbnailFile)
        {
            bool isSuccess = false;
            string msg = "";


            //// VOD 폴더 자동 생성
            //try
            //{
            //    if (String.IsNullOrEmpty(model.ImgSchedule.folder_name) == false)
            //    {
            //        if(model.ImgSchedule.folder_name.Substring(0, 1) == "/" || model.ImgSchedule.folder_name.Substring(0, 1) == "\\")
            //        {
            //        }
            //        else
            //        {
            //            model.ImgSchedule.folder_name = "/" + model.ImgSchedule.folder_name;
            //        }
            //        string vodUploadFilePath = System.Configuration.ConfigurationManager.AppSettings["VodUploadPath"];
            //        string vodUploadWebPath = System.Configuration.ConfigurationManager.AppSettings["VodUploadWebPath"];
            //        if (System.IO.Directory.Exists(vodUploadFilePath + model.ImgSchedule.folder_name) == false)
            //        {
            //            System.IO.Directory.CreateDirectory(vodUploadFilePath + model.ImgSchedule.folder_name);
            //        }
            //    }
            //}
            //catch (Exception ex) { }

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

            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            newsProgramServiceClient.Save(model, mainAttachFile, subAttachFile, rectangleAttachFile, thumbnailAttachFile);



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



            #region Admin

            newsProgramServiceClient.DeleteProgramAdminList(model.PRG_CD);
            if (adminSeq != null)
            {
                foreach (int item in adminSeq)
                {
                    newsProgramServiceClient.AddProgramAdmin(model.PRG_CD, item, LoginHandler.CurrentLoginUser);
                }
            }
            #endregion

            isSuccess = true;

            ActionLogWrite(model.PRG_CD, ActionLogService.ActionLogBizActionCode.Update, "프로그램 수정", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        #region 마이그레이션

        #region 뉴스 마이그레이션

        public ActionResult NewsMigration()
        {
            new BroadService.NewsProgramServiceClient().Migration();

            return View();
        }

        #endregion

        #region 49.EditVod.TAB_PGM_CMS_AUTH 데이터 마이그레이션

        public ActionResult MainImageMigration()
        {
            new BroadService.ProgramCmsAuthServiceClient().CmsMainFileMigration();

            return View();
        }

        #endregion



        #endregion
    }
}