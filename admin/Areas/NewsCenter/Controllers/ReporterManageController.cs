using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Wow.Tv.Admin.NewsCenterService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class ReporterManageController : BaseController
    {
        // GET: NewsCenter/ReporterManage
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// 기자 페이지 관리 리스트
        /// </summary>
        /// <param name="condition">검색조건</param>
        /// <returns></returns>
        public ActionResult List(NewsCenterCondition condition)
        {
            // 뉴스 기자 구분
            CommonCodeCondition codeCondition = new CommonCodeCondition();
            //COMP CODE
            codeCondition.UpCommonCode = CommonCodeStatic.NEWS_REPORTER_CODE;
            List<NTB_COMMON_CODE> reporterCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

            ViewBag.reporterCode = reporterCode;

            ListModel<NUP_REPORTER_MANAGE_SELECT_Result> resultData = new NewsCenterServiceClient().GetReporterMageList(condition);

            resultData.TotalDataCount = 0;
            resultData.AddInfoInt1 = 0;

            if (resultData.ListData.Count > 0)
            {
                resultData.TotalDataCount = (int)resultData.ListData.First().ROWCNT;      // 총
                resultData.AddInfoInt1 = (int)resultData.ListData.First().ING_PAGE_COUNT; // 사용중
            }

            var model = resultData;

            return View(model);
        }


        /// <summary>
        /// 기자 페이지 관리 등록,수정
        /// </summary>
        /// <param name="reporterManageInfo">설정 정보</param>
        /// <returns>처리결과</returns>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult ReporterManageInfoSave(NTB_REPORTER_MANAGE reporterManageInfo)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                isSuccess = new NewsCenterServiceClient().SetReporterManage(reporterManageInfo, LoginHandler.CurrentLoginUser);

                if (reporterManageInfo.SEQ <= 0)
                {
                    ActionLogWrite(reporterManageInfo.SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "기사 뷰페이지 관리 등록", null);
                }
                else
                {
                    ActionLogWrite(reporterManageInfo.SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "기사 뷰페이지 관리 수정", null);
                }
            }
            catch (Exception e)
            {
                isSuccess = false;

                msg = e.Message;
            }

            return Json(new { IsSuccess = isSuccess, msg = msg });
        }

        /// <summary>
        /// 기자 페이지 관리 USER ID 등록 체크
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>결과</returns>
        public ActionResult IsReporterManageUserIdDuplicated(string userId)
        {
            string msg = "";
            bool isDuplicated = false;
            try
            {
                isDuplicated = new NewsCenterServiceClient().IsReporterManageUserIdDuplicated(userId);

                ActionLogWrite(userId, ActionLogService.ActionLogBizActionCode.Insert, "기자 페이지 관리 USER ID 등록 체크", null);
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { IsDuplicated = isDuplicated, msg = msg });
        }

        /// <summary>
        /// 회원 아이디 유무 체크
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>결과</returns>
        public ActionResult IsUserIdDuplicated(string userId)
        {
            string msg = "";
            bool isDuplicated = false;
            try
            {
                //isDuplicated = new MemberJoinService .JoinServiceClient().IsUserIdDuplicated(userId);
                isDuplicated = new MemberInfoService.MemberInfoServiceClient().UserIdExists(userId, true);

                ActionLogWrite(userId, ActionLogService.ActionLogBizActionCode.Insert, "회원 아이디 유무 체크", null);
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { IsDuplicated = isDuplicated, msg = msg });
        }
        
    }
}