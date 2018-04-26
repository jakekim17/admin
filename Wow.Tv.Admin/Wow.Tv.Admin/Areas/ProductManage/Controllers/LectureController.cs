using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wownet.Lecture;

namespace Wow.Tv.Admin.Areas.ProductManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class LectureController : BaseController
    {
        public ActionResult Index(LectureCondition condition)
        {
            condition.PageSize = 10;
            var list = new LectureService.LectureServiceClient().GetList(condition);
            ViewBag.Condition = condition;

            return View(list);
        }

        public ActionResult Edit(LectureCondition condition, int seq = 0)
        {
            var list = new LectureService.LectureServiceClient().GetDetail(seq);
            int count = 1;
            if (list.LectureData == null)
            {
                list = new LectureScheduleDtl
                {
                    LectureData = new TAB_LECTURES(),
                    ScheduleList = new List<DtlSchedule>()
                };
            }
            else
            {
                count = list.ScheduleList.Count;
            }

            if (list.LectureData.SEQ != 0)
            {
                if(list.LectureData.WG_IMAGE_FILE != null)
                {
                    var split = list.LectureData.WG_IMAGE_FILE.Split('/');
                    list.LectureData.WG_IMAGE_FILE = split[split.Length - 1];

                    var splitBack = list.LectureData.WG_IMAGE_FILE.Split('\\');
                    list.LectureData.WG_IMAGE_FILE = splitBack[splitBack.Length - 1];
                }

                if (list.LectureData.THUMNAIL_FILE != null)
                {
                    var split = list.LectureData.THUMNAIL_FILE.Split('/');
                    list.LectureData.THUMNAIL_FILE = split[split.Length - 1];

                    var splitBack = list.LectureData.THUMNAIL_FILE.Split('\\');
                    list.LectureData.THUMNAIL_FILE = splitBack[splitBack.Length - 1];
                }
            }

            ViewBag.Condition = condition;
            ViewBag.ScheTotalCount = count;
            ViewBag.PartnerList = new EventService.EventServiceClient().GetBroadList().ListData;

            return View(list);
        }

        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(LectureScheduleDtl model)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                var file = Request.Files;
                if (file != null && file.Count > 0)
                {
                    string uploadPath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
                    string uploadWebPath = uploadPath + "/Help/Lectures/";
                    uploadPath = uploadPath + "\\Help\\Lectures\\";

                    for (var i = 0; i < file.Count; i++)
                    {
                        var upload = file[i];

                        if (file[i].FileName != "")
                        {
                            string fileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(upload.FileName);
                            new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadPath, fileName, upload.InputStream);


                            if(file.AllKeys[i] == "fileWownet")
                            {
                                model.LectureData.WG_IMAGE_FILE = uploadWebPath + fileName;
                            }
                            else
                            {
                                model.LectureData.THUMNAIL_FILE = uploadWebPath + fileName;
                            }
                            
                        }
                    }
                }


                int seq = new LectureService.LectureServiceClient().Save(model, LoginHandler.CurrentLoginUser);

                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;

                if (model.LectureData.SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "강연회 저장", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int[] deleteList)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                new LectureService.LectureServiceClient().Delete(deleteList);
                isSuccess = true;

                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "강연회 삭제", "");
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        public ActionResult GetAddSchedule(int startNum, int cntNum)
        {
            ViewBag.StartNum = startNum;
            ViewBag.CntNum = cntNum; 
            return View();
        }
    }
}