using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Menu;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.BusinessManage;

namespace Wow.Tv.Admin.Areas.MyBroadProgram.Controllers
{
    [WowTvAdminAuthorize(IsCheckProgram = true)]
    public class MenuManageController : BaseController
    {
        // GET: MyBroadProgram/MenuManage
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SearchList(MenuCondition condition)
        {
            condition.ChannelCode = CommonCodeStatic.MENU_BROAD_FRONT_OR_DUAL_CHANNEL_CODE;
            var model = new MenuService.MenuServiceClient().SearchList(condition);
            return View(model);
        }


        public ActionResult Edit(int menuSeq, string programCode)
        {
            MenuService.MenuServiceClient menuServiceClient = new MenuService.MenuServiceClient();
            MenuCondition condition = new MenuCondition();
            BoardCondition boardCondition = new BoardCondition();

            var model = menuServiceClient.GetAt(menuSeq);
            if(model == null)
            {
                model = new NTB_MENU();
                model.CHANNEL_CODE = CommonCodeStatic.MENU_BROAD_DUAL_CHANNEL_CODE;
            }

            condition.PageSize = -1;
            condition.ChannelCode = CommonCodeStatic.MENU_BROAD_FRONT_CHANNEL_CODE;
            condition.SearchProgramCode = programCode;
            condition.ContentTypeCode = "Corner";
            var menuList1 = menuServiceClient.SearchList(condition);
            ViewBag.MenuList1 = menuList1.ListData.Where(a => a.FIX_YN != "Y").ToList();

            boardCondition.PageSize = -1;
            var boardList = new BoardService.BoardServiceClient().SearchList(boardCondition);
            ViewBag.BoardList = boardList.ListData;

            BusinessCondition businessCondition = new BusinessCondition();
            businessCondition.PageSize = -1;
            ViewBag.boardContMenu = new BusinessManageService.BusinessManageServiceClient().SearchList(businessCondition);

            return View(model);
        }


        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Save(NTB_MENU model)
        {
            bool isSuccess = false;
            string msg = "";

            model.PRG_CD = Request["ProgramCode"];

            if (model.DEPTH == 1)
            {
                model.UP_MENU_SEQ = 0;
            }

            MenuService.MenuServiceClient menuServiceClient = new MenuService.MenuServiceClient();
            
            if (model.MENU_SEQ > 0)
            {
                var prev = menuServiceClient.GetAt(model.MENU_SEQ);

                model.DEPTH = prev.DEPTH;
                model.UP_MENU_SEQ = prev.UP_MENU_SEQ;
                model.CONTENT_TYPE_CODE = prev.CONTENT_TYPE_CODE;
                model.CONTENT_SEQ = prev.CONTENT_SEQ;

                if (model.FIX_YN == "Y" && model.BoardTypeCode != "FeedBack")
                {
                    model.ACTIVE_YN = "Y";
                }
            }

            if(model.DEPTH > 1)
            {
                model.CONTENT_TYPE_CODE = "Corner";
            }

            if(model.CONTENT_TYPE_CODE == "Trade" || model.CONTENT_TYPE_CODE == "Corner")
            {
                model.CHANNEL_CODE = CommonCodeStatic.MENU_BROAD_FRONT_CHANNEL_CODE;
            }

            
            int seq = menuServiceClient.Save(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Insert;
            if (model.MENU_SEQ > 0)
            {
                actionCode = ActionLogService.ActionLogBizActionCode.Update;
            }
            ActionLogWrite(seq.ToString(), actionCode, "프로그램메뉴 저장", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        public ActionResult UpDown(int menuSeq, bool isUp)
        {
            bool isSuccess = false;
            string msg = "";
            
            new MenuService.MenuServiceClient().UpDown(menuSeq, isUp, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        public ActionResult Delete(int menuSeq)
        {
            bool isSuccess = false;
            string msg = "";

            MenuService.MenuServiceClient menuServiceClient = new MenuService.MenuServiceClient();
            var model = menuServiceClient.GetAt(menuSeq);
            if(model.FIX_YN == "Y")
            {
                msg = "고정메뉴는 삭제하실 수 없습니다.";
            }
            else
            {
                menuServiceClient.Delete(menuSeq, LoginHandler.CurrentLoginUser);
                isSuccess = true;


                // Action Log
                ActionLogWrite(menuSeq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "프로그램메뉴 삭제", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


    }
}