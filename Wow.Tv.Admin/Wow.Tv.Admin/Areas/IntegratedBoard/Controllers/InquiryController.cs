using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.Admin.CommonCodeService;
using Wow.Tv.Admin.IntegratedBoardService;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db89.wowbill.Member;

namespace Wow.Tv.Admin.Areas.IntegratedBoard.Controllers
{
    /// <summary>
    /// <para> 통합게시판-문의하기 템플릿 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-08-25</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-08-25</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-08-25 생성</para>
    /// </summary>
    /// <remarks>통합게시판-문의하기 템플릿 CRUD</remarks>
    [WowTvAdminAuthorize(IsRead = true)]
    public sealed class InquiryController : BaseController
    {
        // GET: IntegratedBoard/Inquiry
        [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
        public ActionResult Index(IntegratedBoardCondition condition)
        {

            //CDOSend.MailSend();

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            var resultData = integratedBoard.IntegratedSearchList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.BOARD_SEQ = resultData.BoardInfo.BOARD_SEQ;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            var menuCodeList = new List<NTB_COMMON_CODE>();
            ViewBag.ReportYn = "N";
            

            if (condition.CurrentMenuSeq != 131)
            {
                #region 이전코드
                menuCodeList = GetUpCommonCode(CommonCodeStatic.INTEGRATED_BOARD_INQUIRY_MENU_CODE, condition.CurrentMenuSeq.ToString());
                ViewBag.ReportYn = "N";
                if (menuCodeList.Count == 0)
                {
                    menuCodeList = GetUpCommonCode();
                }
                else
                {
                    var menuCommonCode = GetUpCommonCode(menuCodeList.ElementAt(0).COMMON_CODE).ElementAt(0);

                    if (menuCommonCode.CODE_NAME.StartsWith("시민제보"))
                    {
                        ViewBag.ReportYn = "Y";
                    }

                    menuCodeList = GetUpCommonCode(menuCommonCode.CODE_VALUE1);
                }

                menuCodeList.Insert(0, new NTB_COMMON_CODE { COMMON_CODE = "ALL", CODE_NAME = "전체" });
                #endregion
            }
            else
            {
                #region 신규코드
                menuCodeList = new List<NTB_COMMON_CODE>
                {
                    new NTB_COMMON_CODE { COMMON_CODE = CommonCodeStatic.CUSTOMER_INQUIRY_RECUITE_CODE, CODE_NAME = "채용문의" },
                    new NTB_COMMON_CODE { COMMON_CODE = CommonCodeStatic.CUSTOMER_INQUIRY_AD_CODE, CODE_NAME = "광고문의" }
                };

                CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
                CommonCodeCondition commonCodeCondition = new CommonCodeCondition
                {
                    UpCommonCode = CommonCodeStatic.CUSTOMER_INQUIRY_BUSINESS_CODE,
                    PageSize = -1
                };
                var businessList = commonCode.SearchList(commonCodeCondition);
                foreach (var item in businessList.ListData)
                {
                    menuCodeList.Add(item);
                }

                menuCodeList.Insert(0, new NTB_COMMON_CODE { COMMON_CODE = "ALL", CODE_NAME = "전체" });

                #endregion
            }



            resultData.CommonCodes = menuCodeList;
            return View(resultData);
        }

        [HttpPost]
        public JsonResult GetCommonCode(string upCommonCode)
        {

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var codeList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = upCommonCode
            }).ListData;

            codeList.Insert(0, new NTB_COMMON_CODE { COMMON_CODE = "ALL", CODE_NAME = "전체" });

            return Json(new { IsSuccess = true, codeList });
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int seq)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            integratedBoard.BoardDelete(seq, LoginHandler.CurrentLoginUser);
            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>문의게시판 게시물 삭제", "");

            return Json(new { IsSuccess = true, Msg = msg });
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int seq, IntegratedBoardCondition condition)
        {
            new IntegratedBoardServiceClient().ReadCountIncrease(seq);

            var resultData = new IntegratedBoardServiceClient().GetBoardDetail(seq);
            
            if (resultData.IsReply && resultData.UP_BOARD_CONTENT_SEQ == 0 && resultData.DEPTH ==0) // 답글이 없으면.. 작성자는 로그인 사용자로
            {
                //resultData.USER_NAME = LoginHandler.CurrentLoginUser.UserName;
                resultData.REG_DATE = DateTime.Now;
            }

            NTB_BOARD boardInfo = new IntegratedBoardServiceClient().GetBoardInfo(condition.CurrentMenuSeq);
            List<NTB_COMMON_CODE> menuCodeList = new List<NTB_COMMON_CODE>();
            condition.IRInquiryYN = "N";


            if (condition.CurrentMenuSeq != 131)
            {
                #region 기존코드

                var boardCommonCode = GetUpCommonCode(CommonCodeStatic.INTEGRATED_BOARD_INQUIRY_MENU_CODE, condition.CurrentMenuSeq.ToString());
                if (boardCommonCode.Count == 0)
                {
                    menuCodeList = GetUpCommonCode();
                }
                else
                {
                    var menuCommonCode = GetUpCommonCode(boardCommonCode.ElementAt(0).COMMON_CODE).ElementAt(0);
                    menuCodeList = GetUpCommonCode(menuCommonCode.CODE_VALUE1);

                    if (menuCommonCode.CODE_NAME.StartsWith("시민제보"))
                    {
                        ViewBag.ReportYn = "Y";
                    }
                }
                #endregion
            }
            else
            {
                #region 신규코드

                menuCodeList = new List<NTB_COMMON_CODE>();
                menuCodeList.Add(new NTB_COMMON_CODE { COMMON_CODE = CommonCodeStatic.CUSTOMER_INQUIRY_RECUITE_CODE, CODE_NAME = "채용문의" });
                menuCodeList.Add(new NTB_COMMON_CODE { COMMON_CODE = CommonCodeStatic.CUSTOMER_INQUIRY_AD_CODE, CODE_NAME = "광고문의" });

                CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
                CommonCodeCondition commonCodeCondition = new CommonCodeCondition
                {
                    UpCommonCode = CommonCodeStatic.CUSTOMER_INQUIRY_BUSINESS_CODE,
                    PageSize = -1
                };
                var businessList = commonCode.SearchList(commonCodeCondition);
                foreach (var item in businessList.ListData)
                {
                    menuCodeList.Add(item);
                }

                menuCodeList.Insert(0, new NTB_COMMON_CODE { COMMON_CODE = "ALL", CODE_NAME = "전체" });
                condition.IRInquiryYN = "Y";
                #endregion
            }

            ViewBag.Condition = condition;
            ViewBag.BoardInfo = boardInfo; // 게시판 정보
            ViewBag.ReportYn = "N";
            ViewBag.Browser = Request.Browser.Browser;

            ViewBag.CommonCodes = menuCodeList;

			ViewBag.Board_name = boardInfo.BOARD_NAME;//게시판명
			ViewBag.Board_type_code = boardInfo.BOARD_TYPE_CODE;//게시판 타입코드


			return View(resultData);
        }
        
        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult RemoveAll(int[] items)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            foreach (var item in items)
            {
                integratedBoard.BoardDelete(item, LoginHandler.CurrentLoginUser);
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>문의게시판 게시물 삭제", "");
            }


            return Json(new { IsSuccess = true, Msg = msg });
        }

        private List<NTB_COMMON_CODE> GetUpCommonCode()
        {
            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            return commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_INQUIRY_CODE
            }).ListData;
        }

        private List<NTB_COMMON_CODE> GetUpCommonCode(string upCommonCode,  string codeValue1 = "")
        {
            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();

            if (!string.IsNullOrWhiteSpace(codeValue1))
            {
                return commonCode.SearchList(new CommonCodeCondition
                {
                    UpCommonCode = upCommonCode
                }).ListData.Where(x => x.CODE_VALUE1.Equals(codeValue1)).ToList();
            }

            return commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = upCommonCode
            }).ListData;
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_BOARD_CONTENT board)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            int boardContentSeq = integratedBoard.BoardSave(board, LoginHandler.CurrentLoginUser);

            bool isEmailSend =false;

            bool isSuccess = true;
            if (isEmailSend)
                CDOSend.MailSend();

            if (boardContentSeq > 0 && board.BOARD_CONTENT_SEQ > 0)
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공지사항게시판 게시물 수정", "");
            }
            else
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "통합게시판>공지사항게시판 게시물 등록", "");
            }
            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
    }
}