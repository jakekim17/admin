using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv.MemberManage;
using Wow.Tv.Middle.Model.Db89.wowbill.MemberAdminManage;
using System.Linq;

namespace Wow.Tv.Admin.Areas.Monitoring.Controllers
{
    public class WorkOutLogHistController : BaseController
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index(WorkOutLogHistCondition condition)
        {
            condition.PageSize = 10;

            DateTime now = DateTime.Now;
            now = new DateTime(now.Year, now.Month, now.Day, 0, 0, 0);

            if (condition.RegistDateFrom.HasValue == false)
            {
                condition.RegistDateFrom = now;
            }
            if (condition.RegistDateTo.HasValue == false)
            {
                condition.RegistDateTo = now;
            }

            DateTime? showRegistDateFrom = condition.RegistDateFrom;
            DateTime? showRegistDateTo = condition.RegistDateTo;

            if (condition.RegistDateTo.HasValue == true)
            {
                condition.RegistDateTo = condition.RegistDateTo.Value.AddDays(1);
            }

            ListModel<WorkOutLogHistResult> resultData = new Wow.Tv.Admin.MemberMonitoringService.MemberMonitoringServiceClient().WorkOutLogHist(condition);
            List<int> userNumberList = new List<int>();
            //List<MemberInfoSimple> userNumberList = new List<MemberInfoSimple>();
            int actionSeq = 0;
            foreach (WorkOutLogHistResult item in resultData.ListData)
            {
                actionSeq++;
                item.ActionSeq = condition.CurrentIndex + actionSeq;

                string actionType = GetActionType(item.ActionCode);
                item.ActionDescription = item.AdminId + "가 " + item.MenuName + "에서 " + actionType;

                if (item.MenuSeq == 401) // 회원정보
                {
                    userNumberList.Add(int.Parse(item.TableKey));
                    //userNumberList.Add(new MemberInfoSimple() { UserNumber = int.Parse(item.TableKey) });
                }
            }

            List<MemberInfoSimple> memberList = null;
            if (userNumberList.Count > 0)
            {
                memberList = new List<MemberInfoSimple>(new MemberManageService.MemberManageServiceClient().SimpleMemberList(userNumberList.ToArray()));
            }

            if (memberList != null)
            {
                foreach (WorkOutLogHistResult item in resultData.ListData)
                {
                    string actionType = GetActionType(item.ActionCode);
                    if (item.MenuSeq == 401) // 회원정보
                    {
                        string userId = (from a in memberList where a.UserNumber == int.Parse(item.TableKey) select a.UserId).SingleOrDefault();
                        if (userId == null) { userId = ""; }

                        string what = item.AdminId + "가 " + "그룹명을 " + actionType;
                        if (item.ActionType == "그룹권한수정")
                        {
                            what = "그룹권한";
                        }
                        item.ActionDescription = item.AdminId + "가 " + userId + "를 " + actionType;
                    }
                }
            }

            ViewBag.Condition = condition;
            ViewBag.ShowRegistDateFrom = showRegistDateFrom;
            ViewBag.ShowRegistDateTo = showRegistDateTo;

            return View(resultData);
        }

        private string GetActionType(string actionCode)
        {
            actionCode = actionCode?.ToUpper();
            string actionType = "";
            switch (actionCode)
            {
                case "INSERT": actionType = "등록"; break;
                case "UPDATE": actionType = "수정"; break;
                case "DELETE": actionType = "삭제"; break;
                case "EXCEL": actionType = "엑셀출력"; break;
                case "SELECT": actionType = "조회"; break;
            }
            return actionType;
        }
    }
}