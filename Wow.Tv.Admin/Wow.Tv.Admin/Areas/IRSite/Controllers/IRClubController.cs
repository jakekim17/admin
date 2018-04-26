using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wownet.IRClub;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class IRClubController : BaseController
    {
        public ActionResult Index(IRClubCondition condition)
        {
            condition.PageSize = 10;
            var list = new IRClubService.IRClubServiceClient().GetList(condition);
            ViewBag.Condition = condition;
            ViewBag.TotalDataCount = list.TotalDataCount;
            return View(list);
        }

        public ActionResult Edit(IRClubCondition condition, int seq = 0)
        {
            ViewBag.Condition = condition;
            var list = new IRClubService.IRClubServiceClient().GetData(seq);

            if(list == null)
            {
                list = new TAB_IR_CLUB_2010();
            }

            return View(list);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(TAB_IR_CLUB_2010 model)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                var file = Request.Files;
                if (file != null && file.Count > 0 && file[0].FileName != "")
                {
                    var upload = file[0];
                    string uploadPath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
                    string uploadWebPath = uploadPath + "/IR/IRClub/";
                    uploadPath = uploadPath + "\\IR\\IRClub\\";

                    string fileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(upload.FileName);

                    new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadPath, fileName, upload.InputStream);
                    model.COMPANY_LOGO = uploadWebPath + fileName;
                }
                int seq = new IRClubService.IRClubServiceClient().Save(model);

                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "IR 클럽회원사 저장", "");

            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        public ActionResult StockCode(string searchText)
        {
            if (String.IsNullOrEmpty(searchText))
            {
                searchText = "가";
            }
            var list = new IRClubService.IRClubServiceClient().GetStockCode(searchText);
            return Json(list);
        }

        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int[] deleteList)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                new IRClubService.IRClubServiceClient().Delete(deleteList);
                isSuccess = true;

                //Action Log
                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "IR클럽회원사 삭제", "");
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }
   }
}