using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db22.stock.Admin;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class HolidayTimeMngController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SearchList(HolidayMngCondition condition)
        {
            var list = new HolidayTimeMngService.HolidayTimeMngServiceClient().GetList(condition);

            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.TotalDataCount = list.TotalDataCount;
            return View(list);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult EditTime(HolidayMngCondition condition, int seq)
        {
            var list = new HolidayTimeMngService.HolidayTimeMngServiceClient().GetTimeData(seq);
            if (list == null)
            {
                list = new NTB_SISE_TIME();
            }
            ViewBag.Gubun = condition.Gubun;
            ViewBag.MasterData = new HolidayTimeMngService.HolidayTimeMngServiceClient().GetMasterData();
            return View(list);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult EditMaster()
        {
            return View();
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult SaveTime(NTB_SISE_TIME model)
        {
            bool isSuccess = false;
            bool isDate = true;
            string msg = "";
            var seq = 0;
            try
            {
                isDate = new HolidayTimeMngService.HolidayTimeMngServiceClient().DateConfirm(model);
                if (!isDate)
                {
                    seq = new HolidayTimeMngService.HolidayTimeMngServiceClient().SaveTime(model, LoginHandler.CurrentLoginUser);
                }

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.MARKET_SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "휴일시간 저장", "");

                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg, isDate = isDate });
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult SaveMaster(NTB_SISE_MASTER model)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                var seq = new HolidayTimeMngService.HolidayTimeMngServiceClient().SaveMaster(model, LoginHandler.CurrentLoginUser);

                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
                if (model.SISE_SEQ == 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                }
                ActionLogWrite(seq.ToString(), actionCode, "증시거래 시간 저장", "");

                isSuccess = true;
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
            bool isSuccess = false;
            string msg = "";
            try
            {
                new HolidayTimeMngService.HolidayTimeMngServiceClient().Delete(seq);

                ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "휴일시간 삭제", "");

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