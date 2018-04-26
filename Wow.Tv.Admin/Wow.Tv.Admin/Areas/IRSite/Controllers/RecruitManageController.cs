using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.Recruit;

namespace Wow.Tv.Admin.Areas.IRSite.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class RecruitManageController : BaseController
    {
        public ActionResult Index(RecruitCondition condition)
        {
            condition.PageSize = 10;
            var resultData = new RecruitService.RecruitServiceClient().SearchList(condition);
            ViewBag.Condition = condition;

            return View(resultData);
        }

        public ActionResult Detail(RecruitCondition condition)
        {
            var searchCondition = new RecruitCondition()
            {
                SearchSeq = condition.SearchSeq,
            };

            new RecruitService.RecruitServiceClient().IncreaseViewCnt(condition.SearchSeq);
            var resultData = new RecruitService.RecruitServiceClient().GetApplicantInfo(searchCondition);
            if(resultData != null)
            {
                if(resultData.SSNO != null && resultData.SSNO != "")
                {
                    resultData.SSNO = resultData.SSNO.Substring(0, 6);
                }
            }
            ViewBag.Condition = condition;
            return View(resultData);
        }
    }
}