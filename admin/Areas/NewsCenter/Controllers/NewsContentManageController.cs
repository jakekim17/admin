using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.Admin.NewsCenterService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{

    [WowTvAdminAuthorize(IsRead = true)]
    public class NewsContentManageController : BaseController
    {
        #region 카드,영상 뉴스
        /// <summary>
        /// 카드뉴스 영상뉴스
        /// </summary>
        /// <returns></returns>
        public ActionResult NewsCardVod()
        {
            string gubunCode = string.Empty;

            NTB_ARTICLE_SHOW_CONFIG resultData = null;

            if (!string.IsNullOrEmpty(HttpContext.Request["gubunCode"]))
            {
                gubunCode = HttpContext.Request["gubunCode"];

                resultData = new NewsCenterServiceClient().GetNewsShowConfig(gubunCode);
            }

            CommonCodeCondition codeCondition = new CommonCodeCondition();
            //COMP CODE
            codeCondition.UpCommonCode = CommonCodeStatic.NEWS_COMP_CODE;
            List<NTB_COMMON_CODE> compCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

            ViewBag.gubunCode = gubunCode;
            ViewBag.compCode = compCode;

            return View(resultData);
        }

        /// <summary>
        /// 카드뉴스 & 영상뉴스 리스트
        /// </summary>
        /// <param name="condition">검색조건</param>
        /// <returns></returns>
        public ActionResult NewsCardVodList(NewsCenterCondition condition)
        {
            //NEWS_MANUAL_COUNT
            int newsManualCount = 0;

            if (condition.SearchGubun.ToUpper().Equals("CARD"))
            {
                newsManualCount = CommonCodeStatic.NEWS_CARD_MANUAL_COUNT;
            }
            else if (condition.SearchGubun.ToUpper().Equals("VOD"))
            {
                newsManualCount = CommonCodeStatic.NEWS_VOD_MANUAL_COUNT;
            }

            ViewBag.newsManualCount = newsManualCount;

            ListModel<NUP_NEWS_CARD_VOD_SELECT_Result> resultData = null;

            if (!string.IsNullOrEmpty(condition.SearchGubun))
            {
                resultData = new NewsCenterServiceClient().GetNewsCardVodList(condition);
            }

            resultData.TotalDataCount = 0;

            if (resultData.ListData.Count > 0)
            {
                resultData.TotalDataCount = (int)resultData.ListData.First().ROWCNT;
            }

            var model = resultData;

            return View(model);
        }

        /// <summary>
        /// 카드뉴스 & 영상뉴스 설정된 리스트
        /// </summary>
        /// <returns></returns>
        public ActionResult NewsCardVodConfigList(NewsCenterCondition condition)
        {
            if (condition.SearchGubun.ToUpper().Equals("CARD"))
            {
                condition.SearchGubun = "CARD_CONFIG";
            }
            else if (condition.SearchGubun.ToUpper().Equals("VOD"))
            {
                condition.SearchGubun = "VOD_CONFIG";
            }

            ListModel<NUP_NEWS_CARD_VOD_SELECT_Result> resultData = null;

            if (!string.IsNullOrEmpty(condition.SearchGubun))
            {
                resultData = new NewsCenterServiceClient().GetNewsCardVodList(condition);
            }

            resultData.ListData = resultData.ListData.OrderBy(o => o.SHOW_NUM).ToList();

            var model = resultData;

            return View(model);
        }
        #endregion

        #region 부동산 & 연예.스포츠
        /// <summary>
        /// 부동산 & 연예.스포츠
        /// </summary>
        /// <returns></returns>
        public ActionResult NewsLandEntspo()
        {
            string gubunCode = string.Empty;

            NTB_ARTICLE_SHOW_CONFIG resultData = null;

            if (!string.IsNullOrEmpty(HttpContext.Request["gubunCode"]))
            {
                gubunCode = HttpContext.Request["gubunCode"];

                CommonCodeCondition codeCondition = new CommonCodeCondition();
                if (gubunCode.Equals("LAND"))
                {
                    //검색 색션 SECTIONWOWCODE sectionWowCode
                    codeCondition.UpCommonCode = CommonCodeStatic.NEWS_LAND_CODE;
                    List<NTB_COMMON_CODE> sectionWowCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

                    NTB_COMMON_CODE commonCode = new NTB_COMMON_CODE();
                    commonCode.CODE_NAME = "부동산 영상";
                    commonCode.CODE_VALUE1 = "LANDVOD";
                    sectionWowCode.Add(commonCode);

                    ViewBag.sectionWowCode = sectionWowCode;
                }
                else if (gubunCode.Equals("ENTSPO"))
                {
                    //검색 색션
                    //연예
                    codeCondition.UpCommonCode = CommonCodeStatic.NEWS_ENTERTAIN_CODE;
                    List<NTB_COMMON_CODE> sectionWowCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

                    //스포츠 추가
                    codeCondition.UpCommonCode = CommonCodeStatic.NEWS_SPORT_CODE;
                    List<NTB_COMMON_CODE> sportWowCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

                    foreach (NTB_COMMON_CODE item in sportWowCode)
                    {
                        NTB_COMMON_CODE commonCode = new NTB_COMMON_CODE();

                        commonCode.CODE_NAME = item.CODE_NAME;
                        commonCode.CODE_VALUE1 = item.CODE_VALUE1;
                        sectionWowCode.Add(commonCode);
                    }

                    ViewBag.sectionWowCode = sectionWowCode;
                }

                //COMP CODE
                codeCondition.UpCommonCode = CommonCodeStatic.NEWS_COMP_CODE;
                List<NTB_COMMON_CODE> compCode = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition).ListData;

                ViewBag.gubunCode = gubunCode;
                ViewBag.compCode = compCode;

                resultData = new NewsCenterServiceClient().GetNewsShowConfig(gubunCode);
            }

            return View(resultData);
        }

        /// <summary>
        /// 부동산 & 연예.스포츠 리스트
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult NewsLandEntspoList(NewsCenterCondition condition)
        {
            //NEWS_MANUAL_COUNT
            int newsManualCount = 0;

            if (condition.SearchGubun.ToUpper().Equals("LAND"))
            {
                newsManualCount = CommonCodeStatic.NEWS_LAND_MANUAL_COUNT;
            }
            else if (condition.SearchGubun.ToUpper().Equals("ENTSPO"))
            {
                newsManualCount = CommonCodeStatic.NEWS_ENTERTAIN_MANUAL_COUNT;
            }

            ViewBag.newsManualCount = newsManualCount;

            ListModel<NUP_NEWS_LAND_ENTSPO_SELECT_Result> resultData = null;

            if (!string.IsNullOrEmpty(condition.SearchGubun))
            {
                resultData = new NewsCenterServiceClient().GetNewsLandEntSpoList(condition);
            }

            resultData.TotalDataCount = 0;

            if (resultData.ListData.Count > 0)
            {
                resultData.TotalDataCount = (int)resultData.ListData.First().ROWCNT;
            }

            var model = resultData;

            return View(model);
        }

        /// <summary>
        /// 부동산 & 연예.스포츠 설정된 리스트
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult NewsLandEntspoConfigList(NewsCenterCondition condition)
        {

            if (condition.SearchGubun.ToUpper().Equals("LAND"))
            {
                condition.SearchGubun = "LAND_CONFIG";
            }
            else if (condition.SearchGubun.ToUpper().Equals("ENTSPO"))
            {
                condition.SearchGubun = "ENTSPO_CONFIG";
            }

            ListModel<NUP_NEWS_LAND_ENTSPO_SELECT_Result> resultData = null;

            if (!string.IsNullOrEmpty(condition.SearchGubun))
            {
                resultData = new NewsCenterServiceClient().GetNewsLandEntSpoList(condition);
            }

            resultData.ListData = resultData.ListData.OrderBy(o => o.SHOW_NUM).ToList();

            var model = resultData;

            return View(model);
        }
        #endregion

        #region 노출설정
        /// <summary>
        /// 뉴스 노출설정 UPDATE
        /// </summary>
        /// <returns>결과값</returns>
        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult SetNewsShowConfig(NTB_ARTICLE_SHOW_CONFIG updateInfo)
        {
            bool isSuccess = false;

            if (!string.IsNullOrEmpty(HttpContext.Request["SearchGubun"]))
            {
                updateInfo.SHOW_CODE = HttpContext.Request["SearchGubun"];

                isSuccess = new NewsCenterServiceClient().SetNewsShowConfig(updateInfo, LoginHandler.CurrentLoginUser);
            }

            string msg = "";

            //로그 저장
            if (isSuccess)
            {
                ActionLogWrite(updateInfo.SHOW_CODE, ActionLogService.ActionLogBizActionCode.Update, "뉴스 노출설정 UPDATE", updateInfo.AUTO_MANUAL);
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        /// <summary>
        /// 뉴스 노출설정 UPDATE
        /// </summary>
        /// <returns>결과값</returns>
        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult SetNewsShowActiveConfig(NTB_ARTICLE_SHOW_CONFIG updateInfo)
        {
            bool isSuccess = isSuccess = new NewsCenterServiceClient().SetNewsShowActiveConfig(updateInfo, LoginHandler.CurrentLoginUser);

            string msg = "";

            //로그 저장
            if (isSuccess)
            {
                ActionLogWrite(updateInfo.SHOW_CODE, ActionLogService.ActionLogBizActionCode.Update, "뉴스 노출설정 UPDATE", updateInfo.ACTIVE_YN);
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        /// <summary>
        /// 뉴스(기사) 노출순서 설정
        /// </summary>
        /// <returns>결과값</returns>
        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult SetNewsShowNumSave(List<NTB_ARTICLE_SHOW_NUM> ntbArticleShowNum)
        {
            ListModel<NTB_ARTICLE_SHOW_NUM> ntbArticleShowNumList = new ListModel<NTB_ARTICLE_SHOW_NUM>();

            ntbArticleShowNumList.ListData = ntbArticleShowNum;

            bool isSuccess = new NewsCenterServiceClient().SetNewsShowNumSave(ntbArticleShowNumList, LoginHandler.CurrentLoginUser);

            string msg = "";

            //로그 저장
            if (isSuccess)
            {
                foreach (NTB_ARTICLE_SHOW_NUM item in ntbArticleShowNum)
                {
                    string strKey = string.Format("{0}|{1}", item.SHOW_CODE, item.SHOW_NUM);

                    ActionLogWrite(strKey, ActionLogService.ActionLogBizActionCode.Update, "뉴스 노출순서 설정", item.SHOW_NUM.ToString());
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
        #endregion

        #region 오피니언
        /// <summary>
        /// 오피니언
        /// </summary>
        /// <returns></returns>
        public ActionResult NewsOpinion(NewsCenterCondition condition)
        {
            string gubunCode = string.Empty;

            if (!string.IsNullOrEmpty(HttpContext.Request["gubunCode"]))
            {
                gubunCode = HttpContext.Request["gubunCode"];

                NTB_COMMON_CODE compCode = new CommonCodeService.CommconCodeServiceClient().GetAtFromValue(CommonCodeStatic.NEWS_OPINION_CODE, gubunCode);
                ViewBag.opinionTitle = compCode.CODE_NAME;
            }

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            ViewBag.condition = condition;
            ViewBag.gubunCode = gubunCode;

            return View();
        }

        /// <summary>
        /// 오피니언 리스트
        /// </summary>
        /// <returns></returns>
        public ActionResult NewsOpinionList(NewsCenterCondition condition)
        {
            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            ListModel<tblPlanArticle> resultData = null;

            if (!string.IsNullOrEmpty(condition.SearchGubun))
            {
                resultData = new NewsCenterServiceClient().GetOpinionList(condition);
            }

            var model = resultData;

            ViewBag.condition = condition;
            ViewBag.ingCount = resultData.AddInfoInt1;

            return View(model);
        }

        /// <summary>
        /// 오피니언 정보
        /// </summary>
        /// <returns></returns>
        public ActionResult NewsOpinionEdit(NewsCenterCondition condition)
        {
            tblPlanArticle model = null;

            if (!string.IsNullOrEmpty(HttpContext.Request["SEQ"]))
            {
                string SEQ = HttpContext.Request["SEQ"];

                model = new NewsCenterServiceClient().GetOpinionInfo(int.Parse(SEQ));
            }

            if (!string.IsNullOrEmpty(condition.SearchGubun))
            {
                NTB_COMMON_CODE compCode = new CommonCodeService.CommconCodeServiceClient().GetAtFromValue(CommonCodeStatic.NEWS_OPINION_CODE, condition.SearchGubun);

                ViewBag.opinionTitle = compCode.CODE_NAME;
            }

            ViewBag.condition = condition;

            if ( model == null)
            {
                model = new tblPlanArticle();
            }           

            return View(model);
        }

        /// <summary>
        /// 오피니언 등록,수정
        /// </summary>
        /// <param name="tblPlanArticleInfo"></param>
        /// <returns>처리결과</returns>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsOpinionEditSave(tblPlanArticle tblPlanArticleInfo)
        {
            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            uploadFilePath = uploadFilePath + @"\News\PlanArticle\";

            int OpinionSeq = tblPlanArticleInfo.SEQ;

            foreach (string file in Request.Files)
            {
                var fileContent = Request.Files[file];

                if (fileContent != null && fileContent.ContentLength > 0)
                {
                    //목로(허브)
                    if (file.Equals("img_main"))
                    {
                        string uploadFile = fileContent.FileName;
                        string fileExtension = Path.GetExtension(uploadFile);
                        string fileName = string.Format("{0}_{1}{2}", OpinionSeq, file, fileExtension);

                        tblPlanArticleInfo.IMG_MAIN = fileName;
                        new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, fileName, fileContent.InputStream);
                    }
                    //공통 상단 타이틀
                    else if (file.Equals("img_bann"))
                    {
                        string uploadFile = fileContent.FileName;
                        string fileExtension = Path.GetExtension(uploadFile);
                        string fileName = string.Format("{0}_{1}{2}", OpinionSeq, file, fileExtension);

                        tblPlanArticleInfo.IMG_BANN = fileName;
                        new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, fileName, fileContent.InputStream);
                    }
                    //TV 메인 핫이슈(프로필 이미지)
                    else if (file.Equals("img_hotissue"))
                    {
                        string uploadFile = fileContent.FileName;
                        string fileExtension = Path.GetExtension(uploadFile);
                        string fileName = string.Format("{0}_{1}{2}", OpinionSeq, "profile", fileExtension);

                        tblPlanArticleInfo.IMG_HOTISSUE = fileName;
                        new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, fileName, fileContent.InputStream);
                    }
                    //TV 메인 포커스
                    else if (file.Equals("img_list"))
                    {
                        string uploadFile = fileContent.FileName;
                        string fileExtension = Path.GetExtension(uploadFile);
                        string fileName = string.Format("{0}_{1}{2}", OpinionSeq, file, fileExtension);

                        tblPlanArticleInfo.IMG_LIST = fileName;
                        new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, fileName, fileContent.InputStream);
                    }
                }
            }

            bool isSuccess = new NewsCenterServiceClient().SetOpinionInfo(tblPlanArticleInfo, LoginHandler.CurrentLoginUser);

            string msg = "";

            //로그 저장
            if (isSuccess)
            {
                var SEQ = tblPlanArticleInfo.SEQ;
                if (SEQ <= 0)
                {
                    ActionLogWrite(null, ActionLogService.ActionLogBizActionCode.Insert, "오피니언 등록", tblPlanArticleInfo.TITLE);
                }
                else
                {
                    ActionLogWrite(SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "오피니언 수정", tblPlanArticleInfo.TITLE);
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        /// <summary>
        /// 오피니언 삭제
        /// </summary>
        /// <param name="deleteList"></param>
        /// <returns>삭제 결과</returns>
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult NewsOpinionDelete(int[] deleteList)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                isSuccess = new NewsCenterServiceClient().SetOpinionDelete(deleteList, LoginHandler.CurrentLoginUser);

                foreach (var item in deleteList)
                {
                    ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "오피니언 삭제", "");
                }

            }
            catch (Exception e)
            {
                isSuccess = false;

                msg = e.Message;
            }

            return Json(new { IsSuccess = isSuccess, msg = msg });
        }
        #endregion

        #region 기사 뷰페이지 관리
        /// <summary>
        /// 기사 뷰페이지 관리 리스트
        /// </summary>
        /// <returns>List<NTB_ARTICLE_VIEWPAGE_MANAGE></returns>
        public ActionResult NewsViewPageManage()
        {

            var model = new NewsCenterServiceClient().GetNewsViewPageManageList().ListData;

            return View(model);
        }

        /// <summary>
        /// 기사 뷰페이지 관리 등록,수정
        /// </summary>
        /// <param name="viewPageManageInfo">설정 정보</param>
        /// <returns></returns>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsViewPageInfoSave(NTB_ARTICLE_VIEWPAGE_MANAGE viewPageManageInfo)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                isSuccess = new NewsCenterServiceClient().SetNewsViewPageManage(viewPageManageInfo, LoginHandler.CurrentLoginUser);

                if (viewPageManageInfo.MENU_SEQ <= 0)
                {
                    ActionLogWrite(viewPageManageInfo.MENU_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "기사 뷰페이지 관리 등록", null);
                }
                else
                {
                    ActionLogWrite(viewPageManageInfo.MENU_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "기사 뷰페이지 관리 수정", null);
                }
            }
            catch (Exception e)
            {
                isSuccess = false;

                msg = e.Message;
            }

            return Json(new { IsSuccess = isSuccess, msg = msg });
        }
        #endregion

    }
}