using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;

namespace Wow.Tv.Admin
{
    
    public class WowTvAdminAuthorizeAttribute : AuthorizeAttribute
    {
        public bool IsRead { get; set; } = false;
        public bool IsWrite { get; set; } = false;
        public bool IsDelete { get; set; } = false;
        public bool IsCheckProgram { get; set; } = false;

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool isSuccess = false;
            
            if (LoginHandler.CurrentLoginUser != null)
            {
                try
                {
                    int menuSeq = 0;
                    if (String.IsNullOrEmpty(httpContext.Request["currentMenuSeq"]) == false)
                    {
                        menuSeq = int.Parse(httpContext.Request["currentMenuSeq"]);
                    }

                    if (menuSeq == 0)
                    {
                        if (String.IsNullOrEmpty(httpContext.Request["menuSeq"]) == false)
                        {
                            menuSeq = int.Parse(httpContext.Request["menuSeq"]);
                        }
                    }

                    string userId = LoginHandler.CurrentLoginUser.LoginId;
                    string url = httpContext.Request.Url.PathAndQuery;
                    string ipAddress = httpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                    if (string.IsNullOrEmpty(ipAddress))
                    {
                        ipAddress = httpContext.Request.ServerVariables["REMOTE_ADDR"];
                    }
                    bool connectableIp = false;
                    if (LoginHandler.CurrentLoginUser.ConnectableIp == "*.*.*.*" || LoginHandler.CurrentLoginUser.ConnectableIp == ipAddress)
                    {
                        connectableIp = true;
                    }

                    if (connectableIp == true)
                    {
                        // 메뉴별 권한 체크
                        bool isMenuAccess = LoginHandler.IsAuth(menuSeq, IsRead, IsWrite, IsDelete);

                        // 프로그램권한체크
                        bool isProgramAccess = true;
                        if (IsCheckProgram == true)
                        {
                            isProgramAccess = LoginHandler.IsProgramAuth(httpContext.Request["ProgramCode"]);
                        }

                        if (isMenuAccess == true && isProgramAccess == true)
                        {
                            isSuccess = true;
                        }

                        // 권한이 없는 메뉴에 접근하는 경우에 대한 로그 기록
                        if (isMenuAccess == false)
                        {
                            new AccessLogService.AccessLogServiceClient().Regist(ipAddress, menuSeq, "NO_AUTH_MENU", userId, url);
                        }
                    }
                    else
                    {
                        new AccessLogService.AccessLogServiceClient().Regist(ipAddress, menuSeq, "NO_AUTH_IP", userId, url);
                    }
                }
                catch (Exception ex) { }
            }

            return isSuccess;
            //return base.AuthorizeCore(httpContext);
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            UrlHelper urlHelper = new UrlHelper(filterContext.RequestContext);
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                JsonResult result = new JsonResult();
                result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

                string msg = "";
                if (LoginHandler.CurrentLoginUser == null)
                {
                    msg = "로그인이 필요합니다.";
                    filterContext.HttpContext.Response.StatusCode = 401;
                }
                else
                {
                    msg = "권한이 없습니다.";
                    filterContext.HttpContext.Response.StatusCode = 403;
                }

                JsonResult jRe = new JsonResult { Data = new { Msg = msg, IsSuccess = false }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                filterContext.Result = jRe;
            }
            else
            {
                if (LoginHandler.CurrentLoginUser == null)
                {
                    filterContext.Result = new RedirectResult("/Account/Index?returnUrl=" + filterContext.HttpContext.Server.UrlEncode(filterContext.HttpContext.Request.Url.PathAndQuery));
                }
                else
                {
                    //filterContext.Result = new RedirectResult("/Home/Index");
                    var re = new ContentResult();
                    re.Content = "<script>alert('권한이 없습니다.');location.href='/Home/Index';</script>";
                    filterContext.Result = re;
                }
            }
        }
    }
}