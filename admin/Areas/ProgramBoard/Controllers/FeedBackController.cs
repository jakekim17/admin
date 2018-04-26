using System;
using System.Collections;
using System.Collections.Generic;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.Admin.CommonCodeService;
using Wow.Tv.Admin.IntegratedBoardService;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db90.DNRS;

namespace Wow.Tv.Admin.Areas.ProgramBoard.Controllers
{
    /// <summary>
    /// <para> 통합게시판-시청자 의견 템플릿 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-10-25</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-10-25</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-10-25 생성</para>
    /// </summary>
    /// <remarks>통합게시판-시청자 의견 템플릿 CRUD</remarks>
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class FeedBackController : BaseController
    {
        // GET: IntegratedBoard/Inquiry
        [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
        
        public ActionResult Index(IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            //if (!string.IsNullOrEmpty(HttpContext.Request["ProgramCode"]))
            //{
            //    condition.COMMON_CODE = HttpContext.Request["ProgramCode"];
            //}
            var resultData = integratedBoard.IntegratedSearchList(condition);
            
            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.BOARD_SEQ = resultData.BoardInfo.BOARD_SEQ;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.IngYn = condition.IngYn;
            IList<T_NEWS_PRG> programList = new List<T_NEWS_PRG>();
            ViewBag.ProgramList = condition.IngYn.Equals("ALL") ? programList : GetProgramCodeList(condition.IngYn);
            
            return View(resultData);
        }
        
        public IList<T_NEWS_PRG> GetProgramCodeList(string ingYn)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            IList<T_NEWS_PRG> programList = integratedBoard.GetProgramList(ingYn);
            return programList;
        }

        public JsonResult GetProgramCode(string ingYn)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            IList<T_NEWS_PRG> programList = new List<T_NEWS_PRG>();
            if (string.IsNullOrWhiteSpace(ingYn) || ingYn.Equals("ALL"))
            {
                
            }
            else
            {
                programList = integratedBoard.GetProgramList(ingYn);
            }

            return Json(new { IsSuccess = true, programList });
        }
        

        //[HttpPost]
        public ActionResult Edit(int seq, IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            var resultData = integratedBoard.GetBoardDetail(seq);

            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            ViewBag.BoradInfo = GetBoardInfo(condition.CurrentMenuSeq);
            return View(resultData);
        }


        private NTB_BOARD GetBoardInfo(int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            return integratedBoard.GetBoardInfo(currentMenuSeq);
        }

        private List<NTB_COMMON_CODE> GetUpCommonCode()
        {
            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            return commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_INQUIRY_CODE
            }).ListData;
        }
        
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult UpdateBlind(NTB_BOARD_CONTENT board)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            integratedBoard.UpdateContentBlind(board.BOARD_CONTENT_SEQ,board.BLIND_YN, LoginHandler.CurrentLoginUser);

            ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>시청자 의견 블라인드 수정", "");

            return Json(new { IsSuccess = true, Msg = msg });
        }


        [HttpPost]
        [ValidateInput(false)]
        public ActionResult UpdateReplyBlind(NTB_BOARD_COMMENT board)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            integratedBoard.UpdateReplyBlind(board.COMMENT_SEQ, board.BLIND_YN, LoginHandler.CurrentLoginUser);

            ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>시청자 의견 댓글 블라인드 수정", "");

            return Json(new { IsSuccess = true, Msg = msg });
        }


        public ActionResult ReplyList(IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            var resultData = integratedBoard.GetCommentPaging(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            return View(resultData);
        }


        [HttpPost]
        //[WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult RemoveAll(int[] items)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            foreach (var item in items)
            {
                integratedBoard.BoardDelete(item, LoginHandler.CurrentLoginUser);
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>시청자 의견 게시물 삭제", "");
            }


            return Json(new { IsSuccess = true, Msg = msg });
        }


    }
}