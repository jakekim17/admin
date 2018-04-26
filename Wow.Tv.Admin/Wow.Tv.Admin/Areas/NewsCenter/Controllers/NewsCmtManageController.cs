using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Admin.NewsCenterService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{
    public class NewsCmtManageController : BaseController
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index(NewsCmtCondition condition)
        {
            string activeYN = "N";

            NTB_ARTICLE_SHOW_CONFIG resultData = new NewsCenterServiceClient().GetNewsShowConfig("COMMENT");

            if (resultData != null)
            {
                activeYN = resultData.ACTIVE_YN;
            }

            var list = new NewsCmtManageService.NewsCmtManageServiceClient().GetList(condition);

            ViewBag.TotalDataCount = list.TotalDataCount;
            ViewBag.Condition = condition;
            ViewBag.activeYN = activeYN;

            return View(list);
        }

        //삭제
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int[] deleteList)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new NewsCmtManageService.NewsCmtManageServiceClient().Delete(deleteList);

                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "댓글 삭제", "");
                }

                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        //공개 비공개 변경
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Update(int seq)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new NewsCmtManageService.NewsCmtManageServiceClient().Update(seq.ToString());

                ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "공개 비공개 전환", "");
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