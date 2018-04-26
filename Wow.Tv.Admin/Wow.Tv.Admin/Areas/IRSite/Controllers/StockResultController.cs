using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wownet.StockResult;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class StockResultController : BaseController
    {
        public ActionResult Index(StockResultCondition condition)
        {
            condition.PageSize = 10;
            var result = new StockResultService.StockResultServiceClient().GetList(condition);
            ViewBag.TotalDataCount = result.TotalDataCount;
            ViewBag.Condition = condition;
            return View(result);
        }

        public ActionResult Edit(StockResultCondition condition, int seq = 0)
        {
            var result = new StockResultService.StockResultServiceClient().GetData(seq);
            ViewBag.Condition = condition;

            if(result.StockData == null)
            {
                result = new StockResultDetail();
                result.StockData = new TAB_STOCK_RESULT();
                result.ConnectList = new List<TAB_STOCK_RESULT_CONNECT>();
            }

            return View(result);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(StockResultDetail data, int[] deleteList)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                var split = data.StockData.SYEAR.Split('-');
                data.StockData.SYEAR = split[0];
                data.StockData.SMONTH = split[1];
                data.StockData.SDAY = split[2];

                if(deleteList != null)
                {
                    for(var i=0; i<deleteList.Length; i++)
                    {
                        data.DeleteList[i] = deleteList[i];
                    }
                }

                int seq = new StockResultService.StockResultServiceClient().Save(data, LoginHandler.CurrentLoginUser);
                isSuccess = true;

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (data.StockData.SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "주주총회 저장", "");
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
                new StockResultService.StockResultServiceClient().Delete(deleteList);
                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "주주현황삭제", "");
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