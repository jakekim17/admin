using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Admin.CommonCodeService;
using Wow.Tv.Admin.IntegratedBoardService;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.Admin.Areas.ProgramBoard.Controllers
{
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class OfficialController : BaseController
    {
        // GET: IntegratedBoard/Official
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
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_OFFICIAL_CODE
            }).ListData;

            codeList.Insert(0, new NTB_COMMON_CODE { COMMON_CODE = "ALL", CODE_NAME = "전체" });

            resultData.CommonCodes = codeList;

            return View(resultData);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Delete(int seq)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            integratedBoard.BoardDelete(seq, LoginHandler.CurrentLoginUser);
            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>공고게시판 게시물 삭제", "");
            return Json(new { IsSuccess = true, Msg = msg, Key = seq });
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(int seq, IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            var resultData = integratedBoard.GetBoardDetail(seq);

            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.CommonCodes = GetCommonCode();
            ViewBag.BoradInfo = GetBoardInfo(condition.CurrentMenuSeq);

            return View(resultData);
        }

        public ActionResult Add(IntegratedBoardCondition condition)
        {
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.CommonCodes = GetCommonCode();
            //ViewBag.BoardInfo = GetBoardInfo(condition.CurrentMenuSeq);
            return View(GetBoardInfo(condition.CurrentMenuSeq));
        }

        private NTB_BOARD GetBoardInfo(int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            return integratedBoard.GetBoardInfo(currentMenuSeq);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult RemoveAll(int[] items)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            foreach (var item in items)
            {
                integratedBoard.BoardDelete(item, LoginHandler.CurrentLoginUser);
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>공고게시판 게시물 삭제", "");
            }

            return Json(new { IsSuccess = true, Msg = msg });
        }

        private List<NTB_COMMON_CODE> GetCommonCode()
        {
            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            return commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_OFFICIAL_CODE
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
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공고게시판 게시물 수정", "");
            }
            else
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "통합게시판>공고게시판 게시물 등록", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg, BoardContentSeq = boardContentSeq });
        }


        [HttpPost]
        [ValidateInput(false)]
        public ActionResult FileSave(NTB_BOARD_CONTENT board, IEnumerable<HttpPostedFileBase> files)
        {
            string msg = "";
            bool isSuccess = true;

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + @"\\Official\\";
            uploadWebPath = uploadWebPath + "/Official/";


            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            int boardContentSeq = integratedBoard.BoardSave(board, LoginHandler.CurrentLoginUser);
            bool isDeleteFileAll = true;
            var httpPostedFileBases = files as HttpPostedFileBase[] ?? files.ToArray();
            foreach (var file in httpPostedFileBases)
            {
                if (file == null) continue;

                NTB_ATTACH_FILE model = new NTB_ATTACH_FILE { USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(file.FileName) };
                model.EXTENSION = System.IO.Path.GetExtension(model.USER_UPLOAD_FILE_NAME);
                model.FILE_SIZE = file.ContentLength;
                string realFileName = DateTime.Now.ToFileTime() + model.EXTENSION;
                model.REAL_FILE_PATH = uploadFilePath + realFileName;
                model.REAL_WEB_PATH = uploadWebPath + realFileName;

                if (System.IO.Directory.Exists(uploadFilePath) == false)
                {
                    System.IO.Directory.CreateDirectory(uploadFilePath);
                }
                file.SaveAs(model.REAL_FILE_PATH);


                integratedBoard.FileSave(model, boardContentSeq, isDeleteFileAll);
                isDeleteFileAll = false;
            }

            if (boardContentSeq > 0 && board.BOARD_CONTENT_SEQ > 0)
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공고게시판 게시물 수정", "");
            }
            else
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "통합게시판>공고게시판 게시물 등록", "");
            }

            //if (httpPostedFileBases.Length >0)
            //    ActionLogWrite(boardContentSeq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공고게시판 파일 업로드", "");


            return Json(new { IsSuccess = isSuccess, Msg = msg, NowDate = DateTime.Now.ToDate() });
        }
    }

}