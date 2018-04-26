using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.Admin.NewsCenterService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{

    [WowTvAdminAuthorize(IsRead = true)]
    public class NewsMainManageController : BaseController
    {

        /// <summary>
        /// 뉴스 메인 관리(NewsCenter/NewsMainManage)
        /// </summary>
        /// <returns>View</returns>
        public ActionResult Index()
        {
            //ToDay
            //DateTime dtToday = DateTime.Now.AddDays(-79);
            DateTime dtToday = DateTime.Now;

            System.Globalization.CultureInfo ciCurrent = System.Threading.Thread.CurrentThread.CurrentCulture;
            DayOfWeek dwFirst = ciCurrent.DateTimeFormat.FirstDayOfWeek;
            DayOfWeek dwToday = ciCurrent.Calendar.GetDayOfWeek(dtToday);

            int iDiff = dwToday - dwFirst;
            DateTime nowWeekStartDay = dtToday.AddDays(-iDiff);
            DateTime nowWeekEndDay = nowWeekStartDay.AddDays(6);
            DateTime preWeekStartDay = nowWeekStartDay.AddDays(-7);
            DateTime preWeekEndDay = preWeekStartDay.AddDays(6);

            //기사 생산량
            string yesterDayNewsCount = GetNewsCount(WowExtensionMethod.ToDate(dtToday.AddDays(-1))).ToString("#,##0");
            string toDayNewsCount = GetNewsCount(WowExtensionMethod.ToDate(dtToday)).ToString("#,##0");
            string preWeekDayNewsCount = GetNewsCount(WowExtensionMethod.ToDate(preWeekStartDay), WowExtensionMethod.ToDate(preWeekEndDay)).ToString("#,##0");
            string nowWeekDayNewsCount = GetNewsCount(WowExtensionMethod.ToDate(nowWeekStartDay), WowExtensionMethod.ToDate(nowWeekEndDay)).ToString("#,##0");

            CommonCodeCondition codeCondition = new CommonCodeCondition();
            //COMP CODE
            codeCondition.UpCommonCode = CommonCodeStatic.NEWS_COMP_CODE;
            List<NTB_COMMON_CODE> compCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

            //GUBUN CODE
            codeCondition.UpCommonCode = CommonCodeStatic.NEWS_GUBUN_CODE;
            List<NTB_COMMON_CODE> gubunCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

            //DEPT CODE
            codeCondition.UpCommonCode = CommonCodeStatic.NEWS_DEPT_CODE;
            List<NTB_COMMON_CODE> deptCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

            //네이버 뉴스스탠드 기사 송출 시각
            tblNewsStandArticleManage newsStandUpdateTime = new NewsCenterServiceClient().GetNewsStandUpdateTime();
            string lastNewsStandUpdateTime = WowExtensionMethod.ToDateTime(newsStandUpdateTime.uptdate);

#if DEBUG
            //WowLog.Write(string.Format("yesterDayNews : {0}", WowExtensionMethod.ToDate(dtToday.AddDays(-1))));
            //WowLog.Write(string.Format("toDayNews : {0}", WowExtensionMethod.ToDate(dtToday)));
            //WowLog.Write(string.Format("nowWeekStartDay : {0}", nowWeekStartDay.ToString()));
            //WowLog.Write(string.Format("nowWeekEndDay : {0}", nowWeekEndDay.ToString()));
            //WowLog.Write(string.Format("preWeekStartDay : {0}", preWeekStartDay.ToString()));
            //WowLog.Write(string.Format("preWeekEndDay : {0}", preWeekEndDay.ToString()));
#endif
            ViewBag.yesterDayNewsCount = yesterDayNewsCount;
            ViewBag.toDayNewsCount = toDayNewsCount;
            ViewBag.preWeekDayNewsCount = preWeekDayNewsCount;
            ViewBag.nowWeekDayNewsCount = nowWeekDayNewsCount;

            ViewBag.compCode = compCode;
            ViewBag.gubunCode = gubunCode;
            ViewBag.deptCode = deptCode;

            ViewBag.lastNewsStandUpdateTime = lastNewsStandUpdateTime;

            return View();
        }

        #region 뉴스 메인 관리 리스트


        /// <summary>
        /// 기사 리스트
        /// </summary>
        /// <param name="condition">검색조건</param>
        /// <returns></returns>
        public ActionResult NewsMainList(NewsCenterCondition condition)
        {
            //NEWS_STAND_MANUAL_COUNT
            int newsStandManualCount = CommonCodeStatic.NEWS_STAND_MANUAL_COUNT;
            ViewBag.newsStandManualCount = newsStandManualCount;

            //NEWS_RELATION_MANUAL_COUNT
            int newsRelationManualCount = CommonCodeStatic.NEWS_RELATION_MANUAL_COUNT;
            ViewBag.newsRelationManualCount = newsRelationManualCount;

            if (!string.IsNullOrEmpty(condition.EndDate))
            {
                condition.EndDate = DateTime.Parse(condition.EndDate).AddDays(1).ToString("yyyy-MM-dd");
                //Wow.Fx.WowLog.Write(condition.EndDate);
            }

            ListModel<NUP_NEWS_MAIN_MAGE_SELECT_Result> resultData = new NewsCenterServiceClient().GetNewsMainMageList(condition);

            resultData.TotalDataCount = 0;

            if(resultData.ListData.Count > 0)
            {
                resultData.TotalDataCount = (int)resultData.ListData.First().ROWCNT;
            }

            var model = resultData;

            return View(model);
        }


        /// <summary>
        /// 뉴스 메인 리스트 설정
        /// </summary>
        /// <returns>결과값</returns>
        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsMainListSave(List<NUP_NEWS_MAIN_MAGE_SELECT_Result> updateInfo)
        {
            ListModel<NUP_NEWS_MAIN_MAGE_SELECT_Result> updateInfoList = new ListModel<NUP_NEWS_MAIN_MAGE_SELECT_Result>();

            updateInfoList.ListData = updateInfo;

            bool isSuccess = new NewsCenterServiceClient().SetNewsMainListUpdate(updateInfoList, LoginHandler.CurrentLoginUser);

            string msg = "";

            //로그 저장
            if (isSuccess)
            {
                foreach (NUP_NEWS_MAIN_MAGE_SELECT_Result item in updateInfo)
                {
                    //NTB_ARTICLE_CONFIG
                    string LIST_YN = String.IsNullOrEmpty(item.LIST_YN) ? "N" : item.LIST_YN;
                    string GUBUN_CODE = item.GUBUN_CODE;
                    string BOLD_YN = String.IsNullOrEmpty(item.BOLD_YN) ? "N" : item.BOLD_YN;
                    string listConfig = String.Format("LIST_YN : {0}, GUBUN_CODE : {1}, BOLD_YN : {2}", LIST_YN, GUBUN_CODE, BOLD_YN);

                    ActionLogWrite(item.ARTID, ActionLogService.ActionLogBizActionCode.Update, "뉴스 메인 리스트 설정", listConfig);

                    //tblNewsStand
                    if ( item.RANK > 0)
                    {
                        ActionLogWrite(item.ARTID, ActionLogService.ActionLogBizActionCode.Update, "뉴스 메인 노출순서 설정", item.RANK.ToString());
                    }
                }
            }
            
            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        #endregion

        #region 뉴스 스탠드

        /// <summary>
        /// 뉴스 스탠드 기사 리스트
        /// </summary>
        /// <returns></returns>
        public ActionResult NewsStandList()
        {
            //뉴스 스탠드 리스트
            List<NUP_NEWSSTAND_SELECT_Result> model = new NewsCenterServiceClient().GetNewsStandList().ListData;

            return View(model);
        }

        /// <summary>
        /// 뉴스 스탠드 가제목 관리
        /// </summary>
        /// <returns>View</returns>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsStandManage()
        {
            //가제목 수정시간
            tblNewsStand tblNewsStandInfo = new NewsCenterServiceClient().GetNewsStandLastUpdateInfo();
            string newsStandLastUpdateTime = tblNewsStandInfo.udtDt.ToString();

            //뉴스 스탠드 리스트
            List<NUP_NEWSSTAND_SELECT_Result> model = new NewsCenterServiceClient().GetNewsStandList().ListData;

            ViewBag.newsStandLastUpdateTime = newsStandLastUpdateTime;

            return View(model);
        }

        /// <summary>
        /// 뉴스 스탠드 가제목 수정
        /// </summary>
        /// <returns>결과값</returns>
        [HttpPost] 
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsStandManageSave(List<tblNewsStand> updateInfo) {

            ListModel<tblNewsStand> updateInfoList = new ListModel<tblNewsStand>();

            updateInfoList.ListData = updateInfo;

            bool isSuccess = new NewsCenterServiceClient().SetNewsStandTmpTitleUpdate(updateInfoList, LoginHandler.CurrentLoginUser);

            string msg = "";

            //로그 저장
            if (isSuccess)
            {
                foreach (tblNewsStand item in updateInfo)
                {
                    ActionLogWrite(item.rank.ToString(), ActionLogService.ActionLogBizActionCode.Update, "뉴스스탠드 가제목 수정", item.tmpTitle);
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
        
        
        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsStandManageUpdateTime()
        {
            bool isSuccess = new NewsCenterServiceClient().SetNewsStandUpdateTime();

            string msg = "";

            if (isSuccess)
            {
                //네이버 뉴스스탠드 기사 송출 시각
                tblNewsStandArticleManage newsStandUpdateTime = new NewsCenterServiceClient().GetNewsStandUpdateTime();
                msg = WowExtensionMethod.ToDateTime(newsStandUpdateTime.uptdate);
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        #endregion

        #region 관련 기사
        /// <summary>
        /// 관련 뉴스 관리
        /// </summary>
        /// <returns>View</returns>
        public ActionResult NewsRelationManage()
        {
            //관련기사 노출 리스트
            List<NTB_ARTICLE_RELATION_CONFIG> model = new NewsCenterServiceClient().GetNewsRelationConfigList().ListData;

            string lastUpdateTime = string.Empty;
            if(model.Count > 0)
            {
                lastUpdateTime = model.OrderByDescending(p => p.MOD_DATE).FirstOrDefault().MOD_DATE.ToString("yyyy-MM-dd HH:mm:ss");
            }

            //DEPT CODE
            CommonCodeCondition codeCondition = new CommonCodeCondition();
            codeCondition.UpCommonCode = CommonCodeStatic.NEWS_DEPT_CODE;
            List<NTB_COMMON_CODE> deptCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

            ViewBag.deptCode = deptCode; 
            ViewBag.lastUpdateTime = lastUpdateTime;

            return View(model);
        }

        /// <summary>
        /// 관련 뉴스 관리
        /// </summary>
        /// <returns>View</returns>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsRelationManageSave(NTB_ARTICLE_RELATION_CONFIG updateInfo)
        {
            bool isSuccess = new NewsCenterServiceClient().SetNewsRelationConfigSave(updateInfo, LoginHandler.CurrentLoginUser);

            string msg = "";

            //로그 저장
            if (isSuccess)
            {
                ActionLogWrite(updateInfo.SHOW_NUM.ToString(), ActionLogService.ActionLogBizActionCode.Update, "관련기사 노출 수정", null);
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        /// <summary>
        /// 뉴스 제목
        /// </summary>
        /// <returns>View</returns>
        public ActionResult NewsTitle(string articleId)
        {
            string newsTitle = string.Empty;

            if (!string.IsNullOrEmpty(articleId))
            {
                //뉴스 상세 내용
                tblArticleList model = new NewsCenterServiceClient().GetArtcleInfo(articleId);
                
                newsTitle = model.Title;
            }

            return Json(new { NewsTitle = newsTitle });
        }

        #endregion

        #region 뉴스 생성 카운터
        /// <summary>
        /// 뉴스 생성 카운터
        /// </summary>
        /// <param name="startDate">시작일</param>
        /// <param name="endDate">종료일</param>
        /// <returns>뉴스 카운터</returns>
        private int GetNewsCount(string startDate, string endDate)
        {
            if (String.IsNullOrEmpty(startDate))
            {
                startDate = WowExtensionMethod.ToDate(DateTime.Today);
            }

            if (String.IsNullOrEmpty(endDate))
            {
                endDate = WowExtensionMethod.ToDate(Convert.ToDateTime(startDate).AddDays(1));
            }

            int newsCount = new NewsCenterService.NewsCenterServiceClient().GetArticleCountDate(startDate, endDate);

            return newsCount;
        }

        private int GetNewsCount(string startDate)
        {
            return GetNewsCount(startDate, null);
        }
        #endregion
    }
}