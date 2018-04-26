using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wownet.Lecture;

namespace Wow.Tv.Admin.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Test()
        {
            return View();
        }

        
        public ActionResult Index()
        {
            if (LoginHandler.CurrentLoginUser == null)
            {
                return new RedirectResult("/Account/Index");
            }
            else
            {
                return View();
            }
        }


        public ActionResult QnA()
        {
            int menuSeq = 0;
            var menu = new MenuService.MenuServiceClient().GetAtByName("WowTvAdmin", "Q&A(1:1메일상담)");
            if (menu != null)
            {
                menuSeq = menu.MENU_SEQ;
            }
            ViewBag.MenuSeq = menuSeq;

            var model = new IntegratedBoardService.IntegratedBoardServiceClient().GetQnaStats().ToList();

            return View(model);
        }


        public ActionResult Report()
        {
            int menuSeq = 0;
            var menu = new MenuService.MenuServiceClient().GetAtByName("WowTvAdmin", "일반기사/방송제보");
            if (menu != null)
            {
                menuSeq = menu.MENU_SEQ;
            }
            ViewBag.MenuSeq = menuSeq;

            var model = new IntegratedBoardService.IntegratedBoardServiceClient().GetReportStats().ToList();

            return View(model);
        }

        public ActionResult BroadBoard(BoardContentCondition condition)
        {
            var list = new IntegratedBoardService.IntegratedBoardServiceClient().GetBroadBoard(condition);

            return View(list);
        }


        public ActionResult Lecture(LectureCondition condition)
        {
            int menuSeq = 0;
            var menu = new MenuService.MenuServiceClient().GetAtByUrl("/ProductManage/Lecture/Index");
            if (menu != null)
            {
                menuSeq = menu.MENU_SEQ;
            }
            ViewBag.MenuSeq = menuSeq;

            var list = new LectureService.LectureServiceClient().GetList(condition);

            return View(list);
        }



        public ActionResult IrQnA()
        {
            int menuSeq = 0;
            var menu = new MenuService.MenuServiceClient().GetAtByName("WowTvAdmin", "고객문의");
            if (menu != null)
            {
                menuSeq = menu.MENU_SEQ;
            }
            ViewBag.MenuSeq = menuSeq;

            var model = new IntegratedBoardService.IntegratedBoardServiceClient().GetIRStats().ToList();

            return View(model);
        }

        public ActionResult GoogleStatistics()
        {
            return View();
        }



        public ActionResult Save(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                file.SaveAs(@"C:\Admin\qwe.jpg");
            }
            return View();
        }



    }
}