using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Admin.ArticleStatsService;
using Wow.Tv.Admin.CommonCodeService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.Stats;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{

    /// <summary>
    /// <para> 기사 통계 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-09-12</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-09-12</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-09-12 생성</para>
    /// </summary>
    /// <remarks>기사 통계</remarks>
    [WowTvAdminAuthorize(IsRead = true)]
    public class StatsController : BaseController
    {
        // GET: NewsCenter/Stats
        [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
        public ActionResult Index(StatsCondition condition)
        {

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            ViewBag.TotalDataCount = 0;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var codeList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = "018000000"
            }).ListData.OrderBy(x => x.SORT_ORDER).ToList();

            codeList.Add(new NTB_COMMON_CODE
            {
                CODE_NAME = "디지털뉴스팀 계약직",
                COMMON_CODE = "Free",
                CODE_VALUE1 = ""
            });


            ViewBag.CommonCodes = codeList;


            return View("Article");
        }

        public ActionResult Article(StatsCondition condition)
        {
            ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();
            if (string.IsNullOrWhiteSpace(condition.DeptCD))
                condition.DeptCD = "";

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            var resultData = articleStats.GetArticleSearchList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var codeList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = "018000000"
            }).ListData.OrderBy(x => x.SORT_ORDER).ToList();

            codeList.Add(new NTB_COMMON_CODE
            {
                CODE_NAME = "디지털뉴스팀 계약직",
                COMMON_CODE = "Free",
                CODE_VALUE1 = ""
            });
            
            ViewBag.CommonCodes = codeList;

            return View(resultData);
        }


        public ActionResult ArticleWo(StatsCondition condition)
        {
            var resultData = new ListModel<NUP_ARTICLE_SELECT_Result>();
            int totalDataCount = 0;
            
            if (!string.IsNullOrWhiteSpace(condition.DeptCD))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);

                ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();
                resultData = articleStats.GetArticleSearchList(condition);
                totalDataCount = resultData.TotalDataCount;
            }

            ViewBag.TotalDataCount = totalDataCount;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            return View(resultData);
        }


        public ActionResult Traffic()
        {

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            return View();
        }

        public ActionResult Freelancer(StatsCondition condition)
        {
            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            ViewBag.Condition = condition;

            return View();
        }

        public ActionResult SearchFreelancer(StatsCondition condition)
        {
            ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            ViewBag.Condition = condition;
            var resultData = articleStats.GetFreelancerTrafficList(condition);

            return View(resultData);
        }

        public ActionResult Provide(StatsCondition condition)
        {

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            ViewBag.Condition = condition;
            return View();
        }

        public ActionResult SearchProvide(StatsCondition condition)
        {
            ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            ViewBag.Condition = condition;
            var resultData = articleStats.GetProvideSearchList(condition);

            return View(resultData);
        }

        public ActionResult SearchFreelancerArticleRank(StatsCondition condition)
        {
            ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            var resultData = articleStats.GetFreelancerArticleRankList(condition);

            return View(resultData);
        }

        public ActionResult GoogleTraffic()
        {

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            var resultData = new CommonCodeService.CommconCodeServiceClient().GetAt("025002000");
            return View(resultData);
        }

        public ActionResult SearchPresentMember(DateTime startDateTime, DateTime endDateTime)
        {
            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            ViewData["startDateTime"] = startDateTime;
            ViewData["endDateTime"] = endDateTime;
            ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();
            var presentMember = articleStats.GetPresentMember(startDateTime, endDateTime);

            return View(presentMember);
        }

        public JsonResult GetReportCount(DateTime startDateTime, DateTime endDateTime)
        {

            var reportMenuSeq = new MenuService.MenuServiceClient().GetAtByName("Help", "시민제보");
            int reportCount = 0;
            ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();
            if (reportMenuSeq != null)
            {
                reportCount = articleStats.ReportCount(startDateTime, endDateTime, reportMenuSeq.CONTENT_SEQ.ToString());
            }

            return Json(new { IsSuccess = true, reportCount });
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult SaveTrafficRank(int rank)
        {
            string msg = string.Empty;

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();
            articleStats.SaveTrafficRank(rank, LoginHandler.CurrentLoginUser);

            bool isSuccess = true;

            ActionLogWrite(rank.ToString(),ActionLogService.ActionLogBizActionCode.Insert, "통계>구글트래픽 트래픽 순위 수정", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });

        }

        [ValidateInput(false)]
        public JsonResult GetArtIdbyWriter(string artId)
        {
            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            ArticleStatsServiceClient articleStats = new ArticleStatsServiceClient();
            string writer = articleStats.GetArtIdbyWriter("WO", artId);

            return Json(new { IsSuccess = true, writer });
        }

        [ValidateInput(false)]
        public JsonResult GetMenuJsonResult()
        {
            string msg = string.Empty;

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var menuList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.GOOGLE_TRAFFIC_MENU_CODE
            }).ListData;

            return Json(new { IsSuccess = true, menuList, Msg = msg });
        }
        
        [ValidateInput(false)]
        [HttpPost]
        public JsonResult GetArtJsonResult()
        {
            string msg = string.Empty;

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var menuList = commonCode.SearchList(new CommonCodeCondition
            {
                //수정일: 2017-11-14
                //수정 내역 : CommonCodeStatic.GOOGLE_TRAFFIC_ART_CODE -> CommonCodeStatic.GOOGLE_TRAFFIC_ART_CODE 변경(코드 통일)
                UpCommonCode = CommonCodeStatic.NEWS_DEPT_CODE
            }).ListData;

            menuList.Add(new NTB_COMMON_CODE
            {
                CODE_NAME = "디지털뉴스팀 계약직",
                COMMON_CODE = "Free",
                CODE_VALUE1 = CommonCodeStatic.FREELANCER_CODE
            });


            
            var freelancerList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.FREELANCER_CODE
            }).ListData;


            return Json(new { IsSuccess = true, menuList, Msg = msg, freelancerList });
        }
        
        public ActionResult PopupGoogleTrafficPrint()
        {

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                ViewBag.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }


            return View();
        }

        [HttpPost]
        public JsonResult GetCommonCode()
        {

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var codeList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.FREELANCER_CODE
            }).ListData;


            return Json(new { IsSuccess = true, codeList });
        }

    }
}