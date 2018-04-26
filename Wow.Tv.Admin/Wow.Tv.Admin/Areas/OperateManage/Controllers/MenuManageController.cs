using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.wowtv.Menu;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.BusinessManage;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class MenuManageController : BaseController
    {
        // GET: OperateManage/MenuManage
        
        public ActionResult Index()
        {
            CommonCodeCondition commonCodeCondition = new CommonCodeCondition();
            commonCodeCondition.UpCommonCode = CommonCodeStatic.CHANNEL_CODE;
            var menuChannelCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);

            return View(menuChannelCodeList.ListData);
        }

        
        public ActionResult SearchMenu(MenuCondition menuCondition)
        {
            var menuList = new MenuService.MenuServiceClient().SearchList(menuCondition);
            
            ViewBag.Depth = menuCondition.Depth;
            ViewBag.UpMenuSeq = menuCondition.UpMenuSeq;
            ViewBag.CurrentMenuSeq = menuCondition.CurrentMenuSeq;

            return View(menuList.ListData);
        }


        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(int menuSeq, int upMenuSeq, string channelCode)
        {
            NTB_MENU menuInfo = new NTB_MENU();
            NTB_MENU upMenuInfo = new NTB_MENU();
            NTB_MENU menuInfo_1 = new NTB_MENU();
            NTB_MENU menuInfo_2 = new NTB_MENU();
            NTB_MENU menuInfo_3 = new NTB_MENU();

            menuInfo.CHANNEL_CODE = channelCode;
            menuInfo.UP_MENU_SEQ = upMenuSeq;
            menuInfo.DEPTH = 1;
            if (menuSeq > 0)
            {
                menuInfo = new MenuService.MenuServiceClient().GetAt(menuSeq);
            }

            if (upMenuSeq > 0)
            {
                upMenuInfo = new MenuService.MenuServiceClient().GetAt(upMenuSeq);
            }
            switch (upMenuInfo.DEPTH)
            {
                case 1:
                    menuInfo_1 = upMenuInfo;
                    menuInfo_2 = menuInfo;
                    menuInfo.DEPTH = 2;
                    break;
                case 2:
                    menuInfo_1 = new MenuService.MenuServiceClient().GetAt(upMenuInfo.UP_MENU_SEQ);
                    menuInfo_2 = upMenuInfo;
                    menuInfo_3 = menuInfo;
                    menuInfo.DEPTH = 3;
                    break;
            }
            ViewBag.UpMenuInfo = upMenuInfo;
            ViewBag.MenuInfo_1 = menuInfo_1;
            ViewBag.MenuInfo_2 = menuInfo_2;
            ViewBag.MenuInfo_3 = menuInfo_3;

            return View(menuInfo);
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_MENU model)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                int menuSeq = new MenuService.MenuServiceClient().Save(model, LoginHandler.CurrentLoginUser);
                isSuccess = true;

                // Action Log
                ActionLogService.ActionLogBizActionCode actionCode = ActionLogService.ActionLogBizActionCode.Insert;
                if (model.MENU_SEQ > 0)
                {
                    actionCode = ActionLogService.ActionLogBizActionCode.Update;
                }
                ActionLogWrite(menuSeq.ToString(), actionCode, "메뉴저장", "");
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                if (ex.InnerException != null)
                {
                    msg += "\r\n" + ex.InnerException.Message;
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult UpDown(int menuSeq, bool isUp)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new MenuService.MenuServiceClient().UpDown(menuSeq, isUp, LoginHandler.CurrentLoginUser);
                isSuccess = true;
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                if (ex.InnerException != null)
                {
                    msg += "\r\n" + ex.InnerException.Message;
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }



        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int menuSeq)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new MenuService.MenuServiceClient().Delete(menuSeq, LoginHandler.CurrentLoginUser);
                isSuccess = true;


                // Action Log
                ActionLogWrite(menuSeq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "메뉴삭제", "");
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                if (ex.InnerException != null)
                {
                    msg += "\r\n" + ex.InnerException.Message;
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }




        public ActionResult SearchContent(bool isHtmlContent)
        {
            return View(isHtmlContent);
        }


        public ActionResult SearchBoard()
        {
            CommonCodeCondition commonCodeCondition = new CommonCodeCondition();
            commonCodeCondition.UpCommonCode = CommonCodeStatic.BOARD_TYPE_CODE;
            var boardTypeList = new CommonCodeService.CommconCodeServiceClient().SearchList(commonCodeCondition);

            return View(boardTypeList.ListData);
        }

        public ActionResult SearchBoardList(BoardCondition condition)
        {
            var resultData = new BoardService.BoardServiceClient().SearchList(condition);

            return View(resultData);
        }


        public ActionResult SearchBusiness()
        {
            return View();
        }

        public ActionResult SearchBusinessList(BusinessCondition condition)
        {
            var resultData = new BusinessManageService.BusinessManageServiceClient().SearchList(condition);

            return View(resultData);
        }
    }
}