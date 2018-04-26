using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Wow.Tv.Middle.Model.Common;

namespace Wow.Tv.Admin
{
    public class LoginHandler
    {
        public static LoginUser CurrentLoginUser
        {
            get
            {
                LoginUser loginUser = null;

                if(HttpContext.Current.Session["LoginInfo"] != null)
                {
                    loginUser = (LoginUser)HttpContext.Current.Session["LoginInfo"];
                }

                return loginUser;
            }
            set
            {
                HttpContext.Current.Session["LoginInfo"] = value;
            }
        }


        public static bool IsAuth(int menuSeq, bool isRead, bool isWrite, bool isDelete)
        {
            bool isSuccess = true;

            LoginUser loginUser = CurrentLoginUser;

            if (isRead == true || isWrite == true || isDelete == true)
            {
                //if (loginUser.MenuList.Where(a => a.Href == HttpContext.Current.Request.Url.PathAndQuery).Count() == 0)
                //{
                //    isSuccess = false;
                //}
#if DEBUG
#else
                if(HttpContext.Current.Request.UrlReferrer == null)
                {
                    isSuccess = false;
                }
#endif


                if (isRead == true)
                {
                    if (loginUser.MenuList.Where(a => a.MenuSeq == menuSeq && a.IsRead == true).Count() == 0)
                    {
                        isSuccess = false;
                    }
                }
                if (isWrite == true)
                {
                    if (loginUser.MenuList.Where(a => a.MenuSeq == menuSeq && a.IsWrite == true).Count() == 0)
                    {
                        isSuccess = false;
                    }
                }
                if (isDelete == true)
                {
                    if (loginUser.MenuList.Where(a => a.MenuSeq == menuSeq && a.IsDelete == true).Count() == 0)
                    {
                        isSuccess = false;
                    }
                }
            }

            return isSuccess;
        }


        public static bool IsProgramAuth(string programCode)
        {
            bool isSuccess = false;

            LoginUser loginUser = CurrentLoginUser;

            List<string> programList = new BroadService.NewsProgramServiceClient().GetAdminProgram(loginUser.AdminSeq).ToList();
            if(programList.Contains(programCode) == true)
            {
                isSuccess = true;
            }

            return isSuccess;
        }

    }
}