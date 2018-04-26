using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class TextAndLinkController : BaseController
    {
        public ActionResult Index()
        {
            var resultData = new TextAndLinkService.TextAndLinkServiceClient().GetList();

            var CodeName = "";
            foreach(var item in resultData.CodeList)
            {
                if(item.COMMON_CODE == "021001000")
                {
                    CodeName = item.CODE_NAME;
                }
            }
            ViewBag.CodeName = CodeName;
            return View(resultData);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_TEXT_LINK model)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                int seq = new TextAndLinkService.TextAndLinkServiceClient().Save(model, LoginHandler.CurrentLoginUser);
               
                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "Text & Link 저장", "");

                isSuccess = true;

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
                new TextAndLinkService.TextAndLinkServiceClient().Delete(deleteList);

                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "Text & Link 삭제", "");
                }

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