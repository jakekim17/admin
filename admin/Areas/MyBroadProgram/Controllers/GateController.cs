using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Menu;

namespace Wow.Tv.Admin.Areas.MyBroadProgram.Controllers
{
    [WowTvAdminAuthorize]
    public class GateController : Controller
    {
        // GET: MyBroadProgram/Gate
        public ActionResult Index(string programCode)
        {

            // 기본 메뉴 확인후 생성
            MenuCondition menuCondition = new MenuCondition();
            menuCondition.SearchProgramCode = programCode;
            menuCondition.UpMenuSeq = -1;

            MenuService.MenuServiceClient menuServiceClient = new MenuService.MenuServiceClient();
            var model = menuServiceClient.SearchList(menuCondition);
            if(model.TotalDataCount == 0)
            {
                #region Admin Menu

                int newMenuSeq = 0;
                NTB_MENU menu = new NTB_MENU();
                menu.CHANNEL_CODE = CommonCodeStatic.MENU_BROAD_ADMIN_CHANNEL_CODE;
                menu.PRG_CD = programCode;

                menu.CONTENT_TYPE_CODE = "Page";
                menu.LINK_TYPE_CODE = "_self";
                menu.ACTIVE_YN = "Y";
                menu.FIX_YN = "Y";

                #region 기본환경설정

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "기본환경설정";
                menu.LINK_URL = "javascript:void(0);";
                newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                menu.UP_MENU_SEQ = newMenuSeq;
                menu.DEPTH = 2;
                menu.MENU_NAME = "프로그램메뉴관리";
                menu.LINK_URL = "/MyBroadProgram/MenuManage/Index";
                menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                menu.UP_MENU_SEQ = newMenuSeq;
                menu.DEPTH = 2;
                menu.MENU_NAME = "광고배너관리";
                menu.LINK_URL = "/MyBroadProgram/ProgramBanner/Index";
                menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                #endregion


                #region 프로그램홈관리

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "프로그램홈관리";
                menu.LINK_URL = "/MyBroadProgram/HomeManage/Index";
                newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                #endregion


                #region 프로그램소개

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "프로그램소개";
                menu.LINK_URL = "javascript:void(0);";
                newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                menu.UP_MENU_SEQ = newMenuSeq;
                menu.DEPTH = 2;
                menu.MENU_NAME = "프로그램 소개글";
                menu.LINK_URL = "/MyBroadProgram/ProgramIntro/Index";
                menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                menu.UP_MENU_SEQ = newMenuSeq;
                menu.DEPTH = 2;
                menu.MENU_NAME = "출연진 관리";
                menu.LINK_URL = "/MyBroadProgram/CastManage/Index";
                menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                #endregion



                #region 방송보기

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "방송보기";
                menu.LINK_URL = "/MyBroadProgram/BroadWatch/Index";
                newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                #endregion


                #endregion



                #region Front Menu

                newMenuSeq = 0;
                menu = new NTB_MENU();
                menu.CHANNEL_CODE = CommonCodeStatic.MENU_BROAD_FRONT_CHANNEL_CODE;
                menu.PRG_CD = programCode;

                menu.CONTENT_TYPE_CODE = "Page";
                menu.LINK_TYPE_CODE = "_self";
                menu.ACTIVE_YN = "Y";
                menu.FIX_YN = "Y";

                #region 프로그램소개

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "프로그램소개";
                menu.LINK_URL = "/Broad/ProgramIntro/Index";
                newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                #endregion


                #region 방송보기

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "방송보기";
                menu.LINK_URL = "/Broad/BroadWatch/Index";
                newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                #endregion


                #region 사용안함

                //#region 시청자참여

                //menu.UP_MENU_SEQ = 0;
                //menu.DEPTH = 1;
                //menu.MENU_NAME = "시청자참여";
                //menu.LINK_URL = "";
                //menu.CONTENT_TYPE_CODE = "Board";
                //menu.CONTENT_SEQ = boardSeq;
                //newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                //#endregion


                //#region 공지사항

                //menu.UP_MENU_SEQ = 0;
                //menu.DEPTH = 1;
                //menu.MENU_NAME = "프로그램공지사항";
                //menu.LINK_URL = "";
                //menu.CONTENT_TYPE_CODE = "Board";
                //menu.CONTENT_SEQ = boardSeq2;
                //newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                //#endregion

                #endregion


                #endregion



                // 어드민과 프런트 같이 사용
                menu.CHANNEL_CODE = CommonCodeStatic.MENU_BROAD_DUAL_CHANNEL_CODE;

                #region 시청자참여

                // 게시판 먼저 생성
                int boardSeq = 0;
                BoardService.BoardServiceClient boardService = new BoardService.BoardServiceClient();
                NTB_BOARD board = new NTB_BOARD();
                board.BOARD_TYPE_CODE = "FeedBack";
                board.BOARD_NAME = "시청자참여 게시판";
                board.TOP_NOTICE_YN = "N";
                board.NOTICE_COUNT = 0;
                board.COMMENT_YN = "Y";
                board.REPLY_YN = "N";
                board.ATTACH_FILE_YN = "N";
                board.EMAIL_YN = "N";
                board.FILE_COUNT = 1;
                board.SCRAP_YN = "N";
                board.ACTIVE_YN = "Y";
                board.BLIND_YN = "N";
                board.KEYWORD_YN = "N";
                board.PASSWORD_YN = "N";
                board.TOP_CONTENT = "";
                board.BOTTOM_CONTENT = "";
                boardSeq = boardService.Save(board, LoginHandler.CurrentLoginUser);

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "시청자참여";
                menu.LINK_URL = "";
                menu.CONTENT_TYPE_CODE = "Board";
                menu.CONTENT_SEQ = boardSeq;
                newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                #endregion


                #region 공지사항

                // 게시판 먼저 생성
                int boardSeq2 = 0;
                board = new NTB_BOARD();
                board.BOARD_TYPE_CODE = "Notice";
                board.BOARD_NAME = "프로그램공지사항 게시판";
                board.TOP_NOTICE_YN = "N";
                board.NOTICE_COUNT = 0;
                board.COMMENT_YN = "Y";
                board.REPLY_YN = "N";
                board.ATTACH_FILE_YN = "N";
                board.EMAIL_YN = "N";
                board.FILE_COUNT = 0;
                board.SCRAP_YN = "N";
                board.ACTIVE_YN = "Y";
                board.BLIND_YN = "N";
                board.KEYWORD_YN = "N";
                board.PASSWORD_YN = "N";
                board.TOP_CONTENT = "";
                board.BOTTOM_CONTENT = "";
                boardSeq2 = boardService.Save(board, LoginHandler.CurrentLoginUser);

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "프로그램공지사항";
                menu.LINK_URL = "";
                menu.CONTENT_TYPE_CODE = "Board";
                menu.CONTENT_SEQ = boardSeq2;
                newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                #endregion
            }

            menuCondition.Depth = 2;
            model = menuServiceClient.SearchList(menuCondition);
            var firstMenu = model.ListData.Where(a => a.LINK_URL == "/MyBroadProgram/MenuManage/Index").FirstOrDefault();

            return Redirect("/MyBroadProgram/MenuManage/Index?menuSeq=" + firstMenu.MENU_SEQ + "&ProgramCode=" + programCode);
        }
    }
}