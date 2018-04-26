using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;
using Wow.Fx;
using Wow.Tv.Admin.NewsCenterService;
using Wow.Tv.Admin.NewsStandService;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.Admin.Areas.NewsCenter.Controllers
{
    public class NewsHeadLineController : BaseController
    {
        
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index()
        {
            string NewsStandHeadLineXmlUrl = "http://news.wowtv.co.kr/NewsCenter/NewsHeadLine/NewsStandHeadLineXml";
            //string NewsStandHeadLineXmlUrl = string.Format("http://{0}:{1}/{2}", Request.Url.Host, Request.Url.Port, "NewsCenter/NewsHeadLine/NewsStandHeadLineXml");

            ViewBag.NewsStandHeadLineXmlUrl = NewsStandHeadLineXmlUrl;

            string newsStandHeadLineXml = string.Empty;
            try
            {
                using (var webClient = new WebClient())
                {
                    webClient.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
                    newsStandHeadLineXml = webClient.DownloadString(NewsStandHeadLineXmlUrl);

                }
            }
            catch (Exception e)
            {
                WowLog.Write(e.Message);
            }

            ViewBag.newsStandHeadLineXml = newsStandHeadLineXml;

            return View();
        }

        public ActionResult NewsStandHeadLineXml()
        {
            //네이버 뉴스스탠드 기사 송출 시각
            tblNewsStandArticleManage NewsStandUpdateTime = new NewsCenterServiceClient().GetNewsStandUpdateTime();

            //뉴스 스탠드 리스트
            List<usp_newsStandMetaXMLTopImg_Result> NewsStandHeadLine = new NewsStandServiceClient().GetNewsStandHeadLine().ListData;

            string StatusText    = "off";
            string CauseText     = "파일없음";
            string SourceText    = "http://www.wowtv.co.kr/newsstand.html";
            string ModifiedText  = WowExtensionMethod.ToDateTime(NewsStandUpdateTime.uptdate);
            string[] DomainArray = {"www.wowtv.co.kr", "image.wowtv.co.kr", "image.wownet.co.kr", "cast.wowtv.co.kr", "vod.wowtv.co.kr", "vod1.wowtv.co.kr", "vodimg.wowtv.co.kr" };

            //WebClient Html URL Check(http://www.wowtv.co.kr/newsstand.html)
            try
            {
                using (var webClient = new WebClient())
                {
                    webClient.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
                    string source = webClient.DownloadString(SourceText);

                    if(source.Length > 0)
                    {
                        StatusText = "on";
                        CauseText = string.Empty;
                    }
                }
            }
            catch (Exception e)
            {
                WowLog.Write(e.Message);
            }

            XDocument xDoc = new XDocument();
            XElement xRoot = new XElement("newsstand");

            //status, cause, source, modified
            xRoot.Add
            (
                  new XElement("status",   new XCData(StatusText))
                , new XElement("cause",    new XCData(CauseText))
                , new XElement("source",   new XCData(SourceText))
                , new XElement("modified", new XCData(ModifiedText))
            );

            //domains
            XElement domains = new XElement("domains");
            foreach (string domainText in DomainArray)
            {
                domains.Add(new XElement("domain", new XCData(domainText)));
            }
            xRoot.Add(domains);

            //headlineArticles
            XElement headlineArticles = new XElement("headline_articles");

            int i = 1;
            foreach (var headLine in NewsStandHeadLine)
            {
                string urlText    = headLine.url; ;
                string titleText  = headLine.tmptitle.Replace("<", "&lt;").Replace(">", "&gt;");
                string imgText    = string.Empty;

                string sTop1_ArtDate     = WowExtensionMethod.ToDateTime(headLine.articledate);
                string sTop1_editfolder  = headLine.editfolder.Trim();
                string sTop1_image_s     = headLine.image_s.Trim();
                //string headlineNewsImage = string.Empty;

                #region News Stand XML Headline Top Img                 

                //썸네일 이미지 (2017.03 네이버 뉴스스탠드 개편 - TOP 기사만 썸네일 이미지 노출)
                if (String.IsNullOrEmpty(headLine.sImage))
                {
                    //썸네일이미지컬럼 체크(메인Top1기사는 thumbnail_type1 이미지, 그외는 thumbnailType2 이미지)
                    //기존이미지,썸네일이미지 모두 없는경우,디폴트 노출
                    if (String.IsNullOrEmpty(headLine.Thumbnail_type1) || String.IsNullOrEmpty(headLine.IMGDir) )
                    {
                        //2017-04-12 : TOP 1 기사가 동영상기사일때, 노출이미지가 동영상썸네일이미지가 나오게 조건절을 추가함. 
                        //- 기존이미지,썸네일이미지 모두 없는경우 , VOD기사의 경우 썸네일이미지경로는 VOD썸네일 경로를 사용.
                        //TEXT기사의 경우
                        if (String.IsNullOrEmpty(sTop1_editfolder))
                        {
                            string wowcode = headLine.WOWCode;

                            //증권
                            if (wowcode.Equals("W001"))
                            {
                                imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_stock01.gif";

                                //2개 연속 노출되지 않게 하기 위해 예비로..
                                //If i = 1 Then
                                //imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_stock02.gif";
                                //End If
                            }
                            //경제
                            else if (wowcode.Equals("W005"))
                            {
                                imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_eco01.gif";
                            }
                            //산업
                            else if (wowcode.Equals("W004"))
                            {
                                imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_feature01.gif";
                            }
                            //부동산
                            else if (wowcode.Equals("W010"))
                            {
                                imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_land01.gif";
                            }
                            //국제
                            else if (wowcode.Equals("W008"))
                            {
                                imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_work01.gif";
                            }
                            //의료
                            else if (wowcode.Equals("W009"))
                            {
                                imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_health01.gif";

                                //2개 연속 노출되지 않게 하기 위해 예비로..
                                //If i = 1 Then
                                //imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_health02.gif";
                                //End If
                            }
                            //사회
                            else if (wowcode.Equals("W019"))
                            {
                                imgText = "http://www.wowtv.co.kr/static/images/main_new/headline_business01.gif";
                            }
                            else {
                                imgText = "http://image.wowtv.co.kr/wowtv_static/images/main_new/headline_feature01.gif";

                                //2개 연속 노출되지 않게 하기 위해 예비로..
                                //If i = 1 Then
                                //imgText = "http://image.wowtv.co.kr/wowtv_static/images/main_new/headline_license01.gif";
                                //End If
                            }
                        }
                        else
                        {
                            //VOD기사의 경우
                            DateTime insdate = DateTime.Parse(sTop1_ArtDate);

                            //'Response.write "insdate="& insdate
                            //신규 동영상 이미지 URL - VOD HD 전환이후부터 이미지 URL 변경됨.
                            //'신규 동영상이미지 경로 - http://vodimg.wowtv.co.kr/{editfolder}/{imageB} or {imageS}
                            if(insdate > DateTime.Parse("2016-10-11 00:00:00.000"))
                            {
                                imgText = "http://vodimg.wowtv.co.kr/"+ sTop1_editfolder +"/"+ sTop1_image_s;
                            }
                            //구 동영상이미지 경로 // sTop1_image_s=> A201706220260_20170623100754704.jpg | E20170623 | http://vod.wowtv.co.kr:8080/img/E20170623/A201706220260/A201706220260_20170623100754704.jpg
                            else
                            {
                                if(headLine.articleid.Equals("A999999999999"))
                                {
                                    imgText = "http://vod.wowtv.co.kr:8080/img/"+ sTop1_editfolder +"/"+ sTop1_image_s.Substring(0, 13) +"/"+ sTop1_image_s;
                                }
                                else
                                {
                                    imgText = "http://vod.wowtv.co.kr:8080/img/"+ sTop1_editfolder +"/"+ sTop1_image_s.Substring(0, 13) +"/"+ sTop1_image_s;
                                }
                            }
                        }
                    }
                    else
                    {
                        // 기존 이미지(simage) 없는경우, 썸네일이미지컬럼(IMGFile, Thumbnail_type1, Thumbnail_type2)이 차선한다.
                        imgText = "http://image.wownet.co.kr/static/news/" + headLine.IMGDir.Trim() + "/" + headLine.Thumbnail_type1.Trim();
                    }
                }
                else
                {
                    //2018년 이미지 CDN(http://www.kinxcdn.com/)
                    if (headLine.sImage.IndexOf("/Admin/News/upload_view") > -1)
                    {
                        imgText = String.Format("{0}{1}", "http://img.wowtv.co.kr", headLine.sImage);
                    }
                    else
                    {
                        // 기존 등록된 이미지(simage)가 있는경우, 기존 이미지가 우선한다.
                        // wowtv_upload -> wowtv_main 변경 -2016.8.24
                        imgText = headLine.sImage.Replace(@"\upload_view/", "http://image.wowtv.co.kr/wowtv_main/");
                    }

                    imgText = imgText.Replace(@"\", " / ");                 

                }
                #endregion

                //첫번째만 IMAGE 정보 있음..
                if (i == 1)
                {
                    headlineArticles.Add(new XElement("headline_article"
                                            , new XElement("url",   new XCData(urlText))
                                            , new XElement("title", new XCData(titleText))
                                            , new XElement("img",   new XCData(imgText))
                                        ));
                }
                else
                {
                    headlineArticles.Add(new XElement("headline_article"
                                            , new XElement("url",   new XCData(urlText))
                                            , new XElement("title", new XCData(titleText))
                                        ));
                }
                if (i == 7) break;
                i++;
            }
            xRoot.Add(headlineArticles);

            xDoc.Add(xRoot);

            return new XmlActionResult(xDoc);
        }
    }


    public sealed class XmlActionResult : ActionResult
    {
        private readonly XDocument _document;

        public Formatting Formatting { get; set; }
        public string MimeType { get; set; }

        public XmlActionResult(XDocument document)
        {
            if (document == null)
                throw new ArgumentNullException("document");

            _document = document;

            // Default values
            MimeType = "text/xml";
            Formatting = Formatting.None;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            context.HttpContext.Response.Clear();
            context.HttpContext.Response.ContentType = MimeType;

            using (var writer = new XmlTextWriter(context.HttpContext.Response.OutputStream, Encoding.UTF8) { Formatting = Formatting })
                _document.WriteTo(writer);
        }
    }

}
 