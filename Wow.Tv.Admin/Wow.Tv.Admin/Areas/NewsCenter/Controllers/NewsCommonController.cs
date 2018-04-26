using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.Admin.NewsCenterService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{
    public class NewsCommonController : BaseController
    {

        /// <summary>
        /// 기사 내용
        /// </summary>
        /// <returns></returns>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsView(string articleId)
        {
            tblArticleList model = null;

            if (!string.IsNullOrEmpty(articleId))
            {
                //뉴스 상세 내용
                model = new NewsCenterServiceClient().GetArtcleInfo(articleId);

                //뉴스 내용 Replace
                string Content = model.Contents_img;

                if (string.IsNullOrEmpty(Content))
                {
                    Content = model.Contents;
                }

                model.Contents = WowExtensionMethod.NewsContentReplace(Content, model.CompCode);

                #region 출처

                string sourceName = null;

                sourceName = model.CompCode.Substring(0, 1).ToLower();

                //출처 와우뉴스일때 연예뉴스 선택가능
                if (model.CompCode.Equals("WO"))
                {
                    tblArticleCreation ArticleCreation = new NewsCenterServiceClient().GetArtcleCreationInfo(articleId);

                    if (ArticleCreation != null)
                    {

                        string DeptCd = ArticleCreation.DeptCD;

                        CommonCodeCondition codeCondition = new CommonCodeCondition();
                        //COMMON CODE
                        codeCondition.UpCommonCode = CommonCodeStatic.NEWS_DEPT_CODE;
                        NTB_COMMON_CODE compCode = new CommonCodeService.CommconCodeServiceClient().GetAtFromValue(CommonCodeStatic.NEWS_DEPT_CODE, DeptCd);

                        if (compCode == null)
                        {
                            sourceName = string.Format("({0}) {1}", sourceName, DeptCd);
                        }
                        else
                        {
                            sourceName = string.Format("({0}) {1}", sourceName, compCode.CODE_NAME);
                        }
                    }
                }

                #endregion

                ViewBag.sourceName = string.Format("{0}", sourceName);

                //뉴스 관련 이미지
                string relationImageUrl = string.Empty;
                tblRelationImage tblRelationImageInfo = new NewsCenterServiceClient().GetRelationImageInfo(articleId);

                if(tblRelationImageInfo != null)
                {
                    relationImageUrl = tblRelationImageInfo.sImage;
                    if (relationImageUrl != null)
                    {
                        //이미지 URL Replace
                        string configUploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];

                        relationImageUrl = relationImageUrl.Replace(@"/Admin/News/", configUploadWebPath + "/News/");
                        relationImageUrl = relationImageUrl.Replace(@"\upload_view/", configUploadWebPath + "/News/upload_view/");
                        relationImageUrl = relationImageUrl.Replace(@"\", @"/");
                    }

                }
                ViewBag.relationImageUrl = relationImageUrl;

            }

            return View(model);
        }

        /// <summary>
        /// 뉴스 관련 이미지 저장
        /// </summary>
        /// <returns></returns>
        public ActionResult RelationImageSave(HttpPostedFileBase imgFile)
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                string yyyyMMdd = DateTime.Now.ToString("yyyyMMdd");
                if (!string.IsNullOrEmpty(HttpContext.Request["ArtDate"]))
                {
                    yyyyMMdd = HttpContext.Request["ArtDate"].Replace("-", "").Substring(0, 8);
                }

                string configUploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
                string uploadFilePath = string.Format(@"{0}\\News\\upload_view\\{1}\\newsrelation\\", configUploadFilePath, yyyyMMdd);
                string uploadWebPath = string.Format(@"{0}/News/upload_view/{1}/newsrelation/", configUploadFilePath, yyyyMMdd);
                
                tblRelationImage tblRelationImageInfo = new tblRelationImage();
                tblRelationImageInfo.sParentID = HttpContext.Request["artID"];

                if (imgFile != null && imgFile.ContentLength > 0)
                {
                    string uploadFile = imgFile.FileName;
                    string fileExtension = Path.GetExtension(uploadFile);
                    string fileName = string.Format("{0}_{1}{2}", tblRelationImageInfo.sParentID, DateTime.Now.ToFileTime().ToString(), fileExtension);
                    
                    //Wow.Fx.WowLog.Write("fileName : " + fileName);
                    //Wow.Fx.WowLog.Write("   uploadFilePath : " + uploadFilePath);
                    //Wow.Fx.WowLog.Write("imgFile.InputStream : " + imgFile.InputStream.ToString());
                    //Wow.Fx.WowLog.Write("imgFile.ContentLength : " + imgFile.ContentLength);

                    //new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, fileName, imgFile.InputStream);
                    new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, fileName, imgFile.InputStream);
                    tblRelationImageInfo.sImage = string.Format("{0}{1}", uploadWebPath, fileName);
                }

                isSuccess = new NewsCenterServiceClient().SetRelationImageSave(tblRelationImageInfo);

                //로그 저장
                if (isSuccess)
                {
                    ActionLogWrite(null, ActionLogService.ActionLogBizActionCode.Insert, "뉴스 관련 이미지 등록", tblRelationImageInfo.sParentID);
                }
            }
            catch (Exception e)
            {
                Wow.Fx.WowLog.Write(e.Message);

                isSuccess = false;
                msg = e.Message;
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        /// <summary>
        /// 뉴스 관련 이미지 삭제
        /// </summary>
        /// <returns></returns>
        public ActionResult RelationImageDelete()
        {
            string msg = "";
            bool isSuccess = false;
            try
            {
                tblRelationImage tblRelationImageInfo = new tblRelationImage();
                tblRelationImageInfo.sParentID = HttpContext.Request["artID"];

                isSuccess = new NewsCenterServiceClient().SetRelationImageDelete(tblRelationImageInfo);

                //로그 저장
                if (isSuccess)
                {
                    ActionLogWrite(null, ActionLogService.ActionLogBizActionCode.Insert, "뉴스 관련 이미지 삭제", tblRelationImageInfo.sParentID);
                }
            }
            catch (Exception e)
            {
                isSuccess = false;
                msg = e.Message;
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        /// <summary>
        /// HTML 재변환
        /// </summary>
        /// <param name="articleId">기사 ID</param>
        /// <param name="compCode">Comp Code</param>
        /// <returns>isSuccess</returns>
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult NewsHtmlConvertUpdate(string articleId, string compCode)
        {
            bool isSuccess = new NewsCenterServiceClient().SetArticleHtmlConvert(articleId, compCode);

            string msg = "";

            //로그 저장
            string logInfo = string.Format("{0} / {1}", articleId, compCode);
            ActionLogWrite(articleId, ActionLogService.ActionLogBizActionCode.Update, "뉴스 HTML 재변환", logInfo);

            return Json(new { IsSuccess = isSuccess, Msg = msg });

        }

        /// <summary>
        /// HTML 파일 유무 체크
        /// </summary>
        /// <param name="articleId">기사 ID</param>
        /// <param name="compCode">Comp Code</param>
        /// <returns>isFileCheck</returns>   
        public ActionResult CastFileCheck(string articleId, string compCode)
        {
            bool isFileCheck = false;
            string msg = string.Empty;

            try
            {
                using (var webClient = new WebClient())
                {
                    var folder = "";

                    if (compCode == "WO" || compCode == "HK")
                    {
                        folder = articleId.Substring(1, 8);
                    }
                    else if (compCode == "YH")
                    {
                        folder = articleId.Substring(2, 8);
                    }

                    var castUrl = String.Format("http://cast.wowtv.co.kr/castFileCheck.asp?folder={0}&filename={1}&compcode={2}", folder, articleId, compCode);
                    
                    webClient.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
                    //var response = webClient.DownloadString(castUrl);

                    using (var stream = webClient.OpenRead(castUrl))
                    using (var reader = new StreamReader(stream))
                    {
                        string line;

                        int i = 0;
                        while ((line = reader.ReadLine()) != null)
                        {
                            if (i <= 0)
                            {
                                if (line.ToLower().Equals("true"))
                                {
                                    isFileCheck = true;                                    
                                }
                                break;
                            }
                            i++;
                        }
                    }
                }
            }
            catch(Exception e)
            {
                msg = e.Message;
            }

            return Json(new { IsFileCheck = isFileCheck, Msg = msg });
        }

    }
}