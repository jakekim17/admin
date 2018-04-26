using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Admin.NewsAdService;
using Wow.Tv.Middle.Model.Common;
using System.IO;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class NewsAdManageController : BaseController
    {

        #region 하드 코딩 광고        
        /// <summary>
        /// 하드 코딩 광고 리스트
        /// </summary>
        public ActionResult HardCodingAd()
        {
            var resultData = new NewsAdServiceClient().GetHardCodingAdList();
            var model = resultData;

            return View(model);
        }

        /// <summary>
        /// 하드 코딩 광고 등록,수정 정보
        /// </summary>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult HardCodingAdEdit()
        {
            NTB_HARD_CODING_AD model = null;

            if (!string.IsNullOrEmpty(HttpContext.Request["SEQ"]))
            {
                string SEQ = HttpContext.Request["SEQ"];

                model = new NewsAdServiceClient().GetHardCodingAdInfo(int.Parse(SEQ));
            }

            if (model == null)
            {
                model = new NTB_HARD_CODING_AD();
            }

            return View(model);
        }

        /// <summary>
        /// 하드 코딩 광고 저장
        /// </summary>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult HardCodingAdSave(NTB_HARD_CODING_AD saveInfo)
        {

            bool isSuccess = new NewsAdServiceClient().SetHardCodingAd(saveInfo, LoginHandler.CurrentLoginUser);

            string msg = "";

            //로그 저장
            if (isSuccess)
            {
                var SEQ = saveInfo.SEQ;
                if (SEQ <= 0)
                {
                    ActionLogWrite(null, ActionLogService.ActionLogBizActionCode.Insert, "하드 코딩 광고 등록", saveInfo.AD_TITLE);
                }
                else
                {
                    ActionLogWrite(SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "하드 코딩 광고 수정", saveInfo.AD_TITLE);
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        #endregion

        #region 허브사업영역      
        /// <summary>
        /// 허브사업영역 조회
        /// </summary>
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult HubBusiness()
        {
            var list = new HubBusinessService.HubBusinessServiceClient().GetList();

            int viewCodeCount = list.ListData.Where(p => p.CODE.Equals("VIEW")).Count();

            if (list.ListData == null)
            {
                list.ListData = new List<NTB_HUB_BUSINESS>();
            }

            ViewBag.viewCodeCount = viewCodeCount;

            return View(list);
        }

        /// <summary>
        /// 허브사업영역 저장
        /// </summary>
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult HubBusinessSave(NTB_HUB_BUSINESS model, HttpPostedFileBase Image)
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
                    string fileName = "HubBusiness_" + DateTime.Now.ToFileTime().ToString()+ Path.GetExtension(upload.FileName);

                    UploadPath = UploadPath + "/HubBusiness/";
                    UploadWebPath = UploadWebPath + "\\HubBusiness\\";

                    //if (System.IO.Directory.Exists(uploadPath) == false)
                    //{
                    //    System.IO.Directory.CreateDirectory(uploadPath);
                    //}

                    //upload.SaveAs(uploadPath + "\\" + fileName);
                    //model.HUB_IMAGE = UploadWebPath + "\\" + fileName;
                    new Wow.Fx.CdnUploadHandler().FtpUpLoad(UploadPath, fileName, upload.InputStream);

                    model.HUB_IMAGE = UploadPath + fileName;
                }


                int seq = new HubBusinessService.HubBusinessServiceClient().Save(model, LoginHandler.CurrentLoginUser);
                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "허브사업영역 저장", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        /// <summary>
        /// 허브사업영역 삭제
        /// </summary>
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult HubBusinessDelete(int[] deleteList)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new HubBusinessService.HubBusinessServiceClient().Delete(deleteList);
                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "허브사업영역 삭제", "");
                }
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });

        }

        #endregion


    }
}