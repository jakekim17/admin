using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Fx;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Group;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.Admin.Controllers
{
    public class AccountController : BaseController
    {
        private const int LoginFailCountCheck = 5;

        // GET: Account
        public ActionResult Index() 
        {
            bool isCapchaShow = false;
            int loginFailCount = 0;

#if DEBUG
            //ViewBag.adminId = "WOWTV";
            //ViewBag.adminPwd = "WOWTV";
            //ViewBag.mobileAuthNumber = "567890";
#else
            ViewBag.adminId = "";
            ViewBag.adminPwd = "";
            ViewBag.mobileAuthNumber = "";
#endif

            if (Session["LoginFailCount"] != null)
            {
                loginFailCount = (int)Session["LoginFailCount"];
            }

            if(loginFailCount >= LoginFailCountCheck)
            {
                isCapchaShow = true;
            }
            
            return View(isCapchaShow);
        }



        public ActionResult SendSms(string adminId)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new AdminService.AdminServiceClient().SmsSend(adminId);
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




        public ActionResult CaptChaImage()
        {
            Wow.Fx.CaptChaResult captChaResult = new Wow.Fx.CaptCha().MakeImage();
            Session["CaptChaText"] = captChaResult.Text;
            return File(captChaResult.Image.ToArray(), "image/png");
        }



        public ActionResult Regist()
        {
            CommonCodeCondition codeCondition = new CommonCodeCondition();
            codeCondition.UpCommonCode = CommonCodeStatic.JOB_CODE;
            var jobCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition);

            codeCondition = new CommonCodeCondition();
            codeCondition.UpCommonCode = CommonCodeStatic.PART_CODE;
            var partCodeList = new CommonCodeService.CommconCodeServiceClient().SearchList(codeCondition);
            ViewBag.PartCodeList = partCodeList.ListData;

            return View(jobCodeList.ListData);
        }

        public ActionResult ExistCheck(string adminId)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                TAB_CMS_ADMIN existAdmin = new AdminService.AdminServiceClient().GetAtById(adminId);
                if(existAdmin == null)
                {
                    isSuccess = true;
                }
                else
                {
                    msg = "동일한 아이디를 가진 데이터가 존재합니다.";
                }
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

        public ActionResult RegistProc(TAB_CMS_ADMIN model)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new AdminService.AdminServiceClient().Save(model);
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


        [WowTvAdminAuthorize]
        public ActionResult PasswordChange(string currentPassword, string changePassword)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new AdminService.AdminServiceClient().PasswordChange(LoginHandler.CurrentLoginUser.AdminSeq, currentPassword, changePassword);
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

        




        public ActionResult LogOut()
        {
            LoginHandler.CurrentLoginUser = null;

            return Redirect("/Account/Index");
        }


        [HttpPost]
        public ActionResult Login(string adminId, string pwd, string mobileAuthNumber, string capChaText)
        {
            bool isSuccess = false;
            string msg = "";
            bool isContinue = false;
            TAB_CMS_ADMIN admin = null;

            try
            {
                
                if(String.IsNullOrEmpty(capChaText) == false)
                {
                    if(capChaText == Session["CaptChaText"].ToString())
                    {
                        isContinue = true;
                    }
                }
                else
                {
                    isContinue = true;
                }

                if (isContinue == true)
                {
                    admin = new AdminService.AdminServiceClient().LoginCheck(adminId, pwd, mobileAuthNumber, ClientIp);
                    if(admin != null)
                    {
                        if (admin.DEL_YN == "Y")
                        {
                            msg = "삭제된 회원입니다.";
                        }
                        else
                        {
                            if (admin.APPROVAL_YN == "N")
                            {
                                msg = "승인되지 않은 회원입니다.";
                            }
                            else
                            {
                                // IP Check
                                if (admin.CheckIp == "*.*.*.*")
                                {
                                    Session["LoginFailCount"] = 0;
                                    isSuccess = true;
                                }
                                else
                                {
                                    if (admin.CheckIp == ClientIp)
                                    {
                                        Session["LoginFailCount"] = 0;
                                        isSuccess = true;
                                    }
                                    else
                                    {
                                        msg = "승인되지 않은 IP 입니다.\r\n접속시도 IP => " + ClientIp;
                                    }
                                }
                            }
                        }
                    }
                }

				
                if (isSuccess == true)
                {
                    // 로긴처리
                    LoginUser loginUser = new LoginUser();
                    loginUser.AdminSeq = admin.SEQ;
                    loginUser.LoginId = admin.ADMIN_ID;
                    loginUser.UserName = admin.NAME;
                    loginUser.LastLoginDate = admin.LAST_LOGIN_DATE;
                    loginUser.PartCodeName = admin.PartCodeName;
                    loginUser.Ip = ClientIp;
                    loginUser.ConnectableIp = admin.CheckIp;

                    List<AdminMenuItem> menuList = new List<AdminMenuItem>();
                    var adminMenuList = new AdminService.AdminServiceClient().GetAdminGroup(loginUser.AdminSeq);
                    foreach(var item in adminMenuList)
                    {
                        AdminMenuItem menuItem = new AdminMenuItem();
                        menuItem.MenuSeq = item.MENU_SEQ;
                        menuItem.IsRead = (item.READ_YN == "Y" ? true : false);
                        menuItem.IsWrite = (item.WRITE_YN == "Y" ? true : false);
                        menuItem.IsDelete = (item.DEL_YN == "Y" ? true : false);
                        menuItem.Href = item.Href;

                        menuList.Add(menuItem);
                    }
                    loginUser.MenuList = menuList;

                    LoginHandler.CurrentLoginUser = loginUser;

                    msg = "";
                    msg += "마지막 접속 성공일 : " + admin.PREV_LAST_LOGIN_DATE.ToDateTime() + "\r\n";
                    msg += "마지막 접속 IP : " + admin.PREV_LAST_LOGIN_IP;
                }
                else
                {
                    int loginFailCount = 0;

                    if (Session["LoginFailCount"] != null)
                    {
                        loginFailCount = (int)Session["LoginFailCount"];
                    }
                    loginFailCount++;
                    Session["LoginFailCount"] = loginFailCount;

                    msg += "\r\n로그인에 실패하였습니다.";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                if (ex.InnerException != null)
                {
                    msg += "\r\n" + ex.InnerException.Message;
                }
            }




            return Json(new { IsSuccess = isSuccess, Msg = msg, ReturnUrl = Request["returnUrl"] });
        }
    }
}