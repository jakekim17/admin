using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Web.Routing;
using Wow.Fx;

namespace Wow.Tv.Admin
{
    /// <summary>
    /// <para> WOW NET 오류 처리를 위한 액션필터 클래스</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-08-07</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-08-07</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-08-07 생성</para>
    /// </summary>
    /// <remarks>처리 되지 않은 오류는 오류페이지로 리다이렉션 됩니다.</remarks>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class WOWHandleExceptionAttribute : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            //todo 필요 시 이곳에서 로깅해야함.
            HttpRequestBase request = filterContext.RequestContext.HttpContext.Request;
            String contentType = request.ContentType ?? string.Empty;
            Exception ex = filterContext.Exception.GetBaseException();

            if (!(ex is ValidationException))
            {
                WowLog.Write(ex.ToString());
            }

            //if (request.IsAjaxRequest() && contentType.Contains("application/json")) //Ajax이면서 Json 요청의 경우.
            if (request.IsAjaxRequest())
            {
                filterContext.HttpContext.Response.StatusCode = 500;

                if (ex is ValidationException)
                {
                    filterContext.Result = new JsonResult { Data = new { isValidationError = true, Msg = ex.Message, IsSuccess = false }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
                else
                {
                    string msg = ex.Message;
                    if(ex.InnerException != null)
                    {
                        msg += "\r\n" + ex.InnerException.Message;
                    }
                    filterContext.Result = new JsonResult { Data = new { isError = true, Msg = msg, IsSuccess = false }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }

            }
            else
            {
                RouteValueDictionary lRoutes = new RouteValueDictionary(new
                {
                    action = "/Index",
                    controller = "Error"
                });
                filterContext.Controller.TempData["__EXCEPTION__"] = ex;
                filterContext.Result = new RedirectToRouteResult("Default", lRoutes);
            }
            filterContext.ExceptionHandled = true;
        }
    }
}