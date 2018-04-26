using System.Web.Mvc;
using Wow.Tv.Admin.AdminServiceCenter;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.ServiceCenter;

namespace Wow.Tv.Admin.Areas.ServiceCenter.Controllers
{
    /// <summary>
    /// <para> 관리자 고객센터-공지사항 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-08-11</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-08-11</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-08-11 생성</para>
    /// </summary>
    /// <remarks>관리자 고객센터-공지사항 CRUD</remarks>
    public class NoticeController : BaseController
    {
        
        public ActionResult Index(NoticeCondition condition)
        {
            ServiceCenterClient serviceCenter = new ServiceCenterClient();
            condition.Bcode = "T07010000";

            var resultData = serviceCenter.NolticeSearchList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;


            return View(resultData.ListData);
        }
        
        [HttpPost]
        public ActionResult Delete(int seq, NoticeCondition condition)
        {
            string msg = string.Empty;

            ServiceCenterClient serviceCenter = new ServiceCenterClient();

            if (LoginHandler.CurrentLoginUser == null)
            {
                return Json(new { IsSuccess = false, Msg = "로그인 정보가 없습니다.", Redirect = "/Account/Index" });
            }

            serviceCenter.NoticeDelete(seq, LoginHandler.CurrentLoginUser);
            
            return Json(new { IsSuccess = true, Msg = msg });
        }

        public ActionResult Detail(int seq, NoticeCondition condition)
        {
            ServiceCenterClient serviceCenter = new ServiceCenterClient();
            var resultData = serviceCenter.GetNoticeSingle(seq);

            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            return View(resultData);
        }

        public ActionResult Edit(int seq, NoticeCondition condition)
        {
            ServiceCenterClient serviceCenter = new ServiceCenterClient();
            
            var resultData = serviceCenter.GetNoticeSingle(seq) ?? new TAB_NOTICE();

            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            return View(resultData);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Save(TAB_NOTICE notice)
        {
            string msg = string.Empty;
            if (LoginHandler.CurrentLoginUser == null)
            {
                return Json(new { IsSuccess = false, Msg = "로그인 정보가 없습니다.",Redirect = "/Account/Index" });
            }
            ServiceCenterClient serviceCenter = new ServiceCenterClient();
            serviceCenter.NoticeSave(notice,LoginHandler.CurrentLoginUser);

            return Json(new { IsSuccess = true, Msg = msg });
        }
    }
}