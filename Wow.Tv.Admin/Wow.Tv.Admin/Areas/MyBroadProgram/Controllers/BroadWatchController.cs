using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.Admin.Areas.MyBroadProgram.Controllers
{
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class BroadWatchController : BaseController
    {
        // GET: MyBroadProgram/BroadWatch
        public ActionResult Index(BroadWatchCondition condition)
        {
            ViewBag.Condition = condition;

            var resultData = new BroadWatchService.BroadWatchServiceClient().SearchList(condition);
            
            return View(resultData);
        }


        public ActionResult Edit(int num, BroadWatchCondition condition)
        {
            ViewBag.Condition = condition;

            var model = new BroadWatchService.BroadWatchServiceClient().GetAt(num);
            if(model == null)
            {
                model = new tv_program();
            }

            return View(model);
        }



        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Save(tv_program model/*, HttpPostedFileBase attachFileBase*/)
        {
            bool isSuccess = false;
            string msg = "";


            //#region File Save

            //string vodUploadFilePath = System.Configuration.ConfigurationManager.AppSettings["VodUploadPath"];
            //string vodUploadWebPath = System.Configuration.ConfigurationManager.AppSettings["VodUploadWebPath"];
            //vodUploadFilePath = vodUploadFilePath + "\\MyBroadProgram\\BroadWatch\\";
            //vodUploadWebPath = vodUploadWebPath + "/MyBroadProgram/BroadWatch/";
            //string realFileName = "";

            NTB_ATTACH_FILE attachFile = null;

            //if (attachFileBase != null && attachFileBase.ContentLength > 0)
            //{
            //    attachFile = new NTB_ATTACH_FILE();
            //    attachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(attachFileBase.FileName);
            //    attachFile.EXTENSION = System.IO.Path.GetExtension(attachFile.USER_UPLOAD_FILE_NAME);
            //    attachFile.FILE_SIZE = attachFileBase.ContentLength;
            //    realFileName = DateTime.Now.ToFileTime().ToString() + attachFile.EXTENSION;
            //    attachFile.REAL_FILE_PATH = vodUploadFilePath + realFileName;
            //    attachFile.REAL_WEB_PATH = vodUploadWebPath + realFileName;

            //    if (System.IO.Directory.Exists(vodUploadFilePath) == false)
            //    {
            //        System.IO.Directory.CreateDirectory(vodUploadFilePath);
            //    }
            //    attachFileBase.SaveAs(attachFile.REAL_FILE_PATH);
            //}


            //#endregion


            model.Dep = Request["ProgramCode"];
            int seq = new BroadWatchService.BroadWatchServiceClient().Save(model, attachFile, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            if (model.Num > 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Update;
            }
            ActionLogWrite(seq.ToString(), actionCode, "방송보기 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }




        [HttpPost]
        public ActionResult ExecuteInsertSp(string today, string programCode)
        {
            bool isSuccess = false;
            string msg = "";
            
            new BroadWatchService.BroadWatchServiceClient().ExecuteInsertSp(today, programCode);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            ActionLogWrite(today, actionCode, "방송보기 생성", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

    }
}