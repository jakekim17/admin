using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Group;
using Wow.Tv.Middle.Model.Db49.wowtv.Menu;

namespace Wow.Tv.Admin.Areas.OperateManage.Controllers
{
    [WowTvAdminAuthorize(IsRead = true)]
    public class AdminGroupManageController : BaseController
    {
        // GET: OperateManage/AdminGroupManage
        public ActionResult Index()
        {
            return View();
        }

        
        public ActionResult GroupList()
        {
            GroupCondition groupCondition = new GroupCondition();
            groupCondition.PageSize = -1;
            var groupList = new GroupService.GroupServiceClient().SearchList(groupCondition);

            return View(groupList.ListData);
        }


        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Create(int groupSeq)
        {
            NTB_GROUP model = new NTB_GROUP();
            if (groupSeq > 0)
            {
                model = new GroupService.GroupServiceClient().GetAt(groupSeq);
            }

            return View(model);
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(NTB_GROUP model)
        {
            bool isSuccess = false;
            string msg = "";

            int groupSeq = new GroupService.GroupServiceClient().Save(model, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            if (model.GROUP_SEQ <= 0)
            {
                ActionLogWrite(groupSeq.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "그룹생성", "");
            }
            else
            {
                ActionLogWrite(groupSeq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "그룹수정", "");
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsDelete = true)]
        public ActionResult Delete(int groupSeq)
        {
            bool isSuccess = false;
            string msg = "";

            new GroupService.GroupServiceClient().Delete(groupSeq, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogWrite(groupSeq.ToString(), ActionLogService.ActionLogBizActionCode.Delete, "그룹삭제", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Copy(int groupSeq)
        {
            bool isSuccess = false;
            string msg = "";

            new GroupService.GroupServiceClient().Copy(groupSeq, LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogWrite(groupSeq.ToString(), ActionLogService.ActionLogBizActionCode.Insert, "그룹복사", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        
        public ActionResult MenuList(int groupSeq, MenuCondition menuCondition)
        {
            menuCondition.ChannelCode = "WowTvAdmin";
            //var menuList = new MenuService.MenuServiceClient().SearchList(menuCondition);
            var menuList = new MenuService.MenuServiceClient().SearchListMenuGroup(groupSeq, menuCondition);

            ViewBag.Depth = menuCondition.Depth;
            ViewBag.UpMenuSeq = menuCondition.UpMenuSeq;
            
            return View(menuList.ListData);
        }


        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult AdminGroupSave(int groupSeq, List<MenuItem> list)
        {
            bool isSuccess = false;
            string msg = "";

            new MenuService.MenuServiceClient().AuthListSave(groupSeq, list.ToArray(), LoginHandler.CurrentLoginUser);
            isSuccess = true;

            ActionLogWrite(groupSeq.ToString(), ActionLogService.ActionLogBizActionCode.Update, "그룹권한수정", "");

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }
    }
}