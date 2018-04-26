using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.Admin.CommonCodeService;
using Wow.Tv.Admin.IntegratedBoardService;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db90.DNRS;

namespace Wow.Tv.Admin.Areas.IntegratedBoard.Controllers
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
    [WowTvAdminAuthorize]
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
            if (string.IsNullOrEmpty(condition.IngYn))
            {
                condition.IngYn = "";
            }

            NTB_BOARD boardInfo = integratedBoard.GetBoardInfo(condition.CurrentMenuSeq);

            var resultData = integratedBoard.GetFeedBackList(condition);


            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.BOARD_SEQ = boardInfo.BOARD_SEQ;
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

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int seq)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            integratedBoard.BoardDelete(seq, LoginHandler.CurrentLoginUser);
            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>시청자 의견 게시물 삭제", "");

            return Json(new { IsSuccess = true, Msg = msg });
        }

        //[HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int seq, IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();


            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            var resultData = integratedBoard.GetBoardDetail(seq);


            if (resultData.IsReply && resultData.UP_BOARD_CONTENT_SEQ == 0 && resultData.DEPTH == 0) // 답글이 없으면.. 작성자는 로그인 사용자로
            {
                //resultData.USER_NAME = LoginHandler.CurrentLoginUser.UserName;
                resultData.REG_DATE = DateTime.Now;
            }

            condition.VIEW_YN = "Y";
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.BoardInfo = GetBoardInfo(condition.CurrentMenuSeq);
            ViewBag.Seq = seq;
            var programList = integratedBoard.GetCreateBoardProgramList(""); // GetProgramCodeList("");
            var programInfo = programList.FirstOrDefault(x => x.PGM_ID.Equals(resultData.COMMON_CODE));

            if (programInfo != null)
            {
                var ingYn = programInfo.ING_YN;
                resultData.CommonName = programInfo.PGM_NAME;
                ViewBag.IngYn = ingYn;
            }
            else
            {
                ViewBag.IngYn = "N";
            }

            return View(resultData);
        }

        private NTB_BOARD GetBoardInfo(int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            return integratedBoard.GetBoardInfo(currentMenuSeq);
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
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>시청자 의견 게시물 삭제", "");
            }


            return Json(new { IsSuccess = true, Msg = msg });
        }
        
        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_BOARD_CONTENT board)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            int boardContentSeq = integratedBoard.BoardSave(board, LoginHandler.CurrentLoginUser);

            bool isEmailSend = false;

            bool isSuccess = true;
            if (isEmailSend)
                CDOSend.MailSend();

            if (boardContentSeq > 0 && board.BOARD_CONTENT_SEQ > 0)
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>시청자 의견 게시물 수정", "");
            }
            else
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "통합게시판>시청자 의견 게시물 등록", "");
            }
            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
    }
}