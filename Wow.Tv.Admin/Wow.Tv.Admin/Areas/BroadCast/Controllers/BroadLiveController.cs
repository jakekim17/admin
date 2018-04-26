using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Broad;

namespace Wow.Tv.Admin.Areas.BroadCast.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class BroadLiveController : BaseController
    {
        // GET: BroadCast/BroadLive
        public ActionResult Index(BroadLiveCondition condition)
        {
            ViewBag.Condition = condition;

            var resultData = new BroadService.BroadLiveServiceClient().SearchListLive(condition);

            return View(resultData);
        }


        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int broadLiveID, BroadLiveCondition condition)
        {
            ViewBag.Condition = condition;

            var model = new BroadService.BroadLiveServiceClient().GetAtLive(broadLiveID);
            if(model == null)
            {
                model = new NTB_BROAD_LIVE();
            }

            return View(model);
        }



        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int broadLiveID)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.BroadLiveServiceClient().DeleteLive(broadLiveID);
            isSuccess = true;

            ActionLogWrite(broadLiveID.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "현장중계방송 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult DeleteList(List<int> seqList)
        {
            bool isSuccess = false;
            string msg = "";

            new BroadService.BroadLiveServiceClient().DeleteLiveList(seqList.ToArray());
            isSuccess = true;

            foreach (var item in seqList)
            {
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "현장중계방송 삭제", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }





        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_BROAD_LIVE model)
        {
            bool isSuccess = false;
            string msg = "";
            
            int broadLiveID = new BroadService.BroadLiveServiceClient().SaveLive(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            if(model.BROAD_LIVE_ID == 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            }
            ActionLogWrite(broadLiveID.ToString(), actionCode, "현장중계방송 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }




    }
}