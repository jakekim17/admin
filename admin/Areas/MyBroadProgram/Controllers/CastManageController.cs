using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db49.broadcast.MyProgram;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.Admin.Areas.MyBroadProgram.Controllers
{
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class CastManageController : BaseController
    {
        // GET: MyBroadProgram/CastManage
        public ActionResult Index(CastCondition condition)
        {
            ViewBag.Condition = condition;

            var resultData = new CastService.CastServiceClient().SearchList(condition);

            return View(resultData);
        }


        public ActionResult Edit(int programCastSeq, CastCondition condition)
        {
            Pro_wowList expertInfo = new Pro_wowList();

            ViewBag.Condition = condition;

            var model = new CastService.CastServiceClient().GetAt(programCastSeq);
            if(model == null)
            {
                model = new CastService.ProgramCastModel();
            }
            else
            {
                if (model.ProgramCast != null && model.ProgramCast.pay_no != null)
                {
                    expertInfo = new ExpertService.ExpertServiceClient().GetAt(model.ProgramCast.pay_no.Value);
                }
            }
            if(expertInfo == null)
            {
                expertInfo = new Pro_wowList();
            }
            ViewBag.ExpertInfo = expertInfo;


            if (model.ProgramCast == null)
            {
                model.ProgramCast = new NTB_PROGRAM_CAST();
            }
            if(model.AttachFile == null)
            {
                model.AttachFile = new NTB_ATTACH_FILE();
            }

            return View(model);
        }



        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Save(NTB_PROGRAM_CAST model, HttpPostedFileBase attachFileBase)
        {
            bool isSuccess = false;
            string msg = "";


            #region File Save

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + "\\TV\\CastManage\\";
            uploadWebPath = uploadWebPath + "/TV/CastManage/";
            string realFileName = "";

            NTB_ATTACH_FILE attachFile = null;

            if (attachFileBase != null && attachFileBase.ContentLength > 0)
            {
                attachFile = new NTB_ATTACH_FILE();
                attachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(attachFileBase.FileName);
                attachFile.EXTENSION = System.IO.Path.GetExtension(attachFile.USER_UPLOAD_FILE_NAME);
                attachFile.FILE_SIZE = attachFileBase.ContentLength;
                realFileName = DateTime.Now.ToFileTime().ToString() + attachFile.EXTENSION;
                attachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                attachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //attachFileBase.SaveAs(attachFile.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, attachFileBase.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, attachFileBase.InputStream);

            }


            #endregion

            model.PRG_CD = Request["ProgramCode"];
            int seq = new CastService.CastServiceClient().Save(model, attachFile, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            if (model.PROGRAM_CAST_SEQ > 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Update;
            }
            ActionLogWrite(seq.ToString(), actionCode, "출연진 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        [HttpPost]
        public ActionResult Delete(int programCastSeq)
        {
            bool isSuccess = false;
            string msg = "";
            
            new CastService.CastServiceClient().Delete(programCastSeq);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Delete;
            ActionLogWrite(programCastSeq.ToString(), actionCode, "출연진 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        [HttpPost]
        public ActionResult DeleteList(List<int> seqList)
        {
            bool isSuccess = false;
            string msg = "";

            new CastService.CastServiceClient().DeleteList(seqList.ToArray());
            isSuccess = true;

            foreach (var item in seqList)
            {
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "출연진 삭제", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


    }
}