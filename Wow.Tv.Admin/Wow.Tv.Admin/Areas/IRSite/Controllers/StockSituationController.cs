using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wownet.StockSituation;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class StockSituationController : BaseController
    {
        public ActionResult Index()
        {
            var list = new StockSituationService.StockSituationServiceClient().GetList();
            return View(list);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(TAB_STOCK_SITUATION model)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                int seq = new StockSituationService.StockSituationServiceClient().Save(model);
                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "주주현황 저장", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int seq)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new StockSituationService.StockSituationServiceClient().Delete(seq);
                isSuccess = true;
                ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "주주현황삭제", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult UpdateOrder(int seq, bool isUp)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                new StockSituationService.StockSituationServiceClient().UpdateOrder(seq, isUp);
                isSuccess = true;
                ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "주주현황수정", "");
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }
    }
}