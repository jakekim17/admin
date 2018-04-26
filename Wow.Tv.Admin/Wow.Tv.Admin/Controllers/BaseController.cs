using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;

namespace Wow.Tv.Admin
{
    //[WOWHandleException]
    public class BaseController : Controller
    {
        protected string ClientIp
        {
            get
            {
                string ip = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (string.IsNullOrEmpty(ip))
                {
                    ip = Request.ServerVariables["REMOTE_ADDR"];
                }

                return ip;
            }
        }

        [NonAction]
        protected void ActionLogWrite(string key, ActionLogService.ActionLogBizActionCode actionCode, string addInfo1, string addInfo2)
        {
            // Action Log
            try
            {
                new ActionLogService.ActionLogServiceClient().Create(
                    Request["currentMenuSeq"], key, actionCode, addInfo1, addInfo2, LoginHandler.CurrentLoginUser);
            }
            catch (Exception ex) { }
        }
    }
}