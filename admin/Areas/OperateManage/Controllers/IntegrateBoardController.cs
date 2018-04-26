using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class IntegrateBoardController : BaseController
    {
        // GET: OperateManage/IntegrateBoard
        public ActionResult Index()
        {
            CommonCodeCondition commonCodeCondition = new CommonCodeCondition();
            commonCodeCondition.UpCommonCode = CommonCodeStatic.BOARD_TYPE_CODE;
            var boardTypeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);

            return View(boardTypeList.ListData);
        }


        public ActionResult SearchList(BoardCondition condition)
        {
            var resultData = new BoardService.BoardServiceClient().SearchList(condition);

            return View(resultData);
        }


        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int boardSeq)
        {
            NTB_BOARD model = new NTB_BOARD();

            if(boardSeq > 0)
            {
                model = new BoardService.BoardServiceClient().GetAt(boardSeq);
            }

            CommonCodeCondition commonCodeCondition = new CommonCodeCondition();
            commonCodeCondition.UpCommonCode = CommonCodeStatic.BOARD_TYPE_CODE;
            var boardTypeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);
            ViewBag.BoardTypeCodeList = boardTypeList;

            return View(model);
        }



        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_BOARD model)
        {
            bool isSuccess = false;
            string msg = "";

            int boardSeq = new BoardService.BoardServiceClient().Save(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            // Action Log
            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Update;
            if (model.BOARD_SEQ == 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            }
            ActionLogWrite(boardSeq.ToString(), actionCode, "통합게시판 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int boardSeq)
        {
            bool isSuccess = false;
            string msg = "";

            new BoardService.BoardServiceClient().Delete(boardSeq, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            // Action Log
            ActionLogWrite(boardSeq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판 삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult DeleteList(List<int> seqList)
        {
            bool isSuccess = false;
            string msg = "";

            new BoardService.BoardServiceClient().DeleteList(seqList.ToArray(), LoginHandler.CurrentLoginUser);
            isSuccess = true;

            foreach (var item in seqList)
            {
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판 삭제", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }




        [HttpPost]
        public ActionResult Excel(BoardCondition condition)
        {
            var returnStream = new BoardService.BoardServiceClient().ExcelExport(condition);
            returnStream.Position = 0;

            ActionLogWrite(0.ToString(), ActionLogService.ActionLogBizActionCode.Excel, "통합게시판 엑셀 다운로드", "");

            return File(returnStream, "application/ms-excel", "통합게시판 목록.xlsx");
        }



    }
}