using System.Collections.Generic;
using System.Web.Mvc;
using Wow.Tv.Admin.AdminServiceCenter;
using Wow.Tv.Admin.CommonCodeService;
using Wow.Tv.Admin.IntegratedBoardService;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.Admin.Areas.ProgramBoard.Controllers
{
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class FAQController : BaseController
    {
        // GET: IntegratedBoard/FAQ
        [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
        public ActionResult Index(IntegratedBoardCondition condition)
        {

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

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var codeList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_FAQ_CODE
            }).ListData;

            codeList.Insert(0, new NTB_COMMON_CODE { COMMON_CODE = "ALL", CODE_NAME = "전체" });

            resultData.CommonCodes = codeList;

            return View(resultData);
        }

        [HttpPost]
        public ActionResult Delete(int seq)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            integratedBoard.BoardDelete(seq, LoginHandler.CurrentLoginUser);
            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>FAQ게시판 게시물 삭제", "");

            return Json(new { IsSuccess = true, Msg = msg });
        }

        [HttpPost]
        public ActionResult Edit(int seq, IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            var resultData = integratedBoard.GetBoardDetail(seq);

            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.CommonCodes = GetCommonCode();

            return View(resultData);
        }

        public ActionResult Add(IntegratedBoardCondition condition)
        {
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.CommonCodes = GetCommonCode();

            return View();
        }

        [HttpPost]
        public ActionResult RemoveAll(int[] items)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            foreach (var item in items)
            {
                integratedBoard.BoardDelete(item, LoginHandler.CurrentLoginUser);
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>FAQ게시판 게시물 삭제", "");
            }


            return Json(new { IsSuccess = true, Msg = msg });
        }

        private List<NTB_COMMON_CODE> GetCommonCode()
        {
            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            return commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_FAQ_CODE
            }).ListData;
        }


        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Save(NTB_BOARD_CONTENT board)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            bool isSuccess = true;
            int boardContentSeq = integratedBoard.BoardSave(board, LoginHandler.CurrentLoginUser);

            if (boardContentSeq > 0 && board.BOARD_CONTENT_SEQ > 0)
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>FAQ게시판 게시물 수정", "");
            }
            else
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "통합게시판>FAQ게시판 게시물 등록", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
    }
}