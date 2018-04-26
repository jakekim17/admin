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

namespace Wow.Tv.Admin.Areas.IntegratedBoard.Controllers
{
    /// <summary>
    /// <para> 통합게시판-공지사항 템플릿 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-08-25</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-08-25</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-08-25 생성</para>
    /// </summary>
    /// <remarks>통합게시판-공지사항 템플릿 CRUD</remarks>
    [WowTvAdminAuthorize(IsRead = true)]
    public sealed class NoticeController : BaseController
    {
        // GET: IntegratedBoard/Notice
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

            ViewBag.BoardInfo = GetBoardInfo(condition.CurrentMenuSeq);

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var codeList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_NOTICE_CODE
            }).ListData;

            codeList.Insert(0, new NTB_COMMON_CODE { COMMON_CODE = "ALL", CODE_NAME = "전체" });

            resultData.CommonCodes = codeList;
            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int seq)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            integratedBoard.BoardDelete(seq, LoginHandler.CurrentLoginUser);
            ActionLogWrite(seq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>공지사항게시판 게시물 삭제", "");

            return Json(new { IsSuccess = true, Msg = msg });
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int seq, IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            var resultData = integratedBoard.GetAdminSiteBoardDetail(seq);

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

            return View(GetBoardInfo(condition.CurrentMenuSeq));
        }

        private NTB_BOARD GetBoardInfo(int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            return integratedBoard.GetBoardInfo(currentMenuSeq);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public JsonResult RemoveAll(int[] items)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            foreach (var item in items)
            {
                integratedBoard.BoardDelete(item, LoginHandler.CurrentLoginUser);
                ActionLogWrite(item.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "통합게시판>공지사항게시판 게시물 삭제", "");
            }


            return Json(new { IsSuccess = true, Msg = msg });
        }

        private List<NTB_COMMON_CODE> GetCommonCode()
        {
            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            return commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_NOTICE_CODE
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

            if (boardContentSeq > 0 && board.BOARD_CONTENT_SEQ > 0)
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공지사항게시판 게시물 수정", "");
            }
            else
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "통합게시판>공지사항게시판 게시물 등록", "");
            }
            return Json(new { IsSuccess = true, Msg = msg });
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult FileSave(NTB_BOARD_CONTENT board, IEnumerable<HttpPostedFileBase> files)
        {
            string msg = "";

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPathRoot"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPathRoot"];
            uploadFilePath = uploadFilePath + "/IntegratedBoard/Notice/";
            uploadWebPath = uploadWebPath + "/IntegratedBoard/Notice/";


            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            int boardContentSeq = integratedBoard.BoardSave(board, LoginHandler.CurrentLoginUser);
            bool isDeleteFileAll = true;
            HttpPostedFileBase[] httpPostedFileBases = { };
            if (files != null)
            {
                httpPostedFileBases = files as HttpPostedFileBase[] ?? files.ToArray();
            }

            foreach (var file in httpPostedFileBases)
            {
                if (file == null) continue;

                NTB_ATTACH_FILE model = new NTB_ATTACH_FILE { USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(file.FileName) };
                model.EXTENSION = System.IO.Path.GetExtension(model.USER_UPLOAD_FILE_NAME);
                model.FILE_SIZE = file.ContentLength;
                string realFileName = DateTime.Now.ToFileTime() + model.EXTENSION;
                model.REAL_FILE_PATH = uploadFilePath + realFileName;
                model.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //file.SaveAs(model.REAL_FILE_PATH);

                new Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, file.InputStream);

                integratedBoard.FileSave(model, boardContentSeq, isDeleteFileAll);
                isDeleteFileAll = false;
            }

            if (boardContentSeq > 0 && board.BOARD_CONTENT_SEQ > 0)
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공지사항게시판 게시물 수정", "");
            }
            else
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "통합게시판>공지사항게시판 게시물 등록", "");
            }

            //if (httpPostedFileBases.Length >0)
            //    ActionLogWrite(boardContentSeq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공고게시판 파일 업로드", "");


            return Json(new { IsSuccess = true, Msg = msg, NowDate = DateTime.Now.ToDate() });
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public JsonResult FileUpdate(NTB_BOARD_CONTENT board, List<int> deleteFiles, IEnumerable<HttpPostedFileBase> files)
        {
            string msg = "";

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPathRoot"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPathRoot"];
            uploadFilePath = uploadFilePath + "/IntegratedBoard/Notice/";
            uploadWebPath = uploadWebPath + "/IntegratedBoard/Notice/";


            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            int boardContentSeq = integratedBoard.BoardSave(board, LoginHandler.CurrentLoginUser);
            HttpPostedFileBase[] httpPostedFileBases = { };
            if (files != null)
            {
                httpPostedFileBases = files as HttpPostedFileBase[] ?? files.ToArray();
            }

            if (deleteFiles != null && deleteFiles.Count > 0)
            {
                foreach (var seq in deleteFiles)
                {
                    if(seq==0) continue;
                    integratedBoard.DeleteFile(seq);
                }
            }
            
                foreach (var file in httpPostedFileBases)
                {
                    if (file == null) continue;

                    NTB_ATTACH_FILE model = new NTB_ATTACH_FILE
                    {
                        USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(file.FileName)
                    };
                    model.EXTENSION = System.IO.Path.GetExtension(model.USER_UPLOAD_FILE_NAME);
                    model.FILE_SIZE = file.ContentLength;
                    string realFileName = DateTime.Now.ToFileTime() + model.EXTENSION;
                    model.REAL_FILE_PATH = uploadFilePath + realFileName;
                    model.REAL_WEB_PATH = uploadWebPath + realFileName;

                    //if (System.IO.Directory.Exists(uploadFilePath) == false)
                    //{
                    //    System.IO.Directory.CreateDirectory(uploadFilePath);
                    //}
                    //file.SaveAs(model.REAL_FILE_PATH);


                    new Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, file.InputStream);

                integratedBoard.FileSave(model, boardContentSeq, false);
                }
            

            if (boardContentSeq > 0 && board.BOARD_CONTENT_SEQ > 0)
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공지사항게시판 게시물 수정", "");
            }
            else
            {
                ActionLogWrite(board.BOARD_CONTENT_SEQ.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "통합게시판>공지사항게시판 게시물 등록", "");
            }

            //if (httpPostedFileBases.Length >0)
            //    ActionLogWrite(boardContentSeq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "통합게시판>공고게시판 파일 업로드", "");


            return Json(new { IsSuccess = true, Msg = msg, NowDate = DateTime.Now.ToDate() });
        }
    }
}
