using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db49.wownet;
using System.IO;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.Admin.Areas.ServiceCenter.Controllers
{
    public class EventController : BaseController
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index(EventCondition condition)
        {
            
            condition.PageSize = 10;
            var list = new EventService.EventServiceClient().GetList(condition);

            DateTime current = DateTime.Now;

            ViewBag.TotalDataCount = list.TotalDataCount;
            ViewBag.Condition = condition;
            ViewBag.current = current.ToString("yyyyMMdd"); 

            return View(list);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(EventCondition condition, int seq = 0)
        {
            var data = new EventService.EventServiceClient().GetData(seq);
            var broadData = new EventService.EventServiceClient().GetBroadList();
            var LoginId = LoginHandler.CurrentLoginUser.LoginId;

            char[] splitChar= {'\\'};

            Debug.WriteLine(seq);
            if (seq != 0 && data.EventData.bannerImage != null)
            {
                String[] ImageName = data.EventData.bannerImage.Split(splitChar);
                ViewBag.ImageName = ImageName[ImageName.Length -1];
            }

            if(data.EventData == null)
            {
                data.EventData = new tblEvent();
            }


            ViewBag.broadData = broadData;

            return View(data);
        }

        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(tblEvent model, HttpPostedFileBase bannerImage)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {

                var file = Request.Files;
                if (file != null && file.Count > 0 && file[0].FileName != "")
                {
                    var upload = file[0];
                    string UploadPath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
                    string UploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
                    string fileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(upload.FileName);

                    UploadPath = UploadPath + "/Help/Event";
                    UploadWebPath = UploadWebPath + "\\Help\\Event\\";

                    //if (System.IO.Directory.Exists(uploadPath) == false)
                    //{
                    //    System.IO.Directory.CreateDirectory(uploadPath);
                    //}

                    //upload.SaveAs(uploadPath + "\\" + fileName);

                    new Wow.Fx.CdnUploadHandler().FtpUpLoad(UploadPath, fileName, upload.InputStream);

                    model.bannerImage = UploadPath + fileName;
                }

                int no = new EventService.EventServiceClient().Save(model, LoginHandler.CurrentLoginUser);
                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.seq == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(no.ToString(), actionCode, "이벤트 저장", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        //삭제
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int[] deleteList)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new EventService.EventServiceClient().Delete(deleteList);

                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "이벤트 삭제", "");
                }

                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });

        }


        public ActionResult BroadList(NewsProgramCondition condition)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                var resultData = new BroadService.NewsProgramServiceClient().SearchList(condition);
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }
    }
}