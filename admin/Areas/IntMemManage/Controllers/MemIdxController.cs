using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db89.wowbill.MemberAdminManage;
using Wow.Tv.Admin;
using Wow.Tv.Middle.Model.Db89.wowbill;
using Wow.Tv.Admin.Areas.IntMemManage.Models;
using System.Net;
using System.IO;
using Wow.Tv.Admin.MemberManageService;
using Wow.Fx;
using Wow.Tv.Middle.Model.Db89.wowbill.Member;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;

namespace Wow.Tv.Admin.Areas.IntMemManage.Controllers
{
    public class MemIdxController : BaseController
    {
        [WowTvAdminAuthorize(IsRead = true)]
        public ActionResult Index(MemberManageCondition condition)
        {
            condition.PageSize = 20;
            bool isPostBack = !string.IsNullOrEmpty(Request["PostBack"]);
            ListModel<MemberManageListResult> resultData = null;

            if (isPostBack == true)
            {
                //DateTime now = DateTime.Now;
                //now = new DateTime(now.Year, now.Month, now.Day, 0, 0, 0);

                if (condition.RegistDateTo.HasValue == true)
                {
                    condition.RegistDateTo = condition.RegistDateTo.Value.AddDays(1);
                }
                if (condition.LatestConnectDateTo.HasValue == true)
                {
                    condition.LatestConnectDateTo = condition.LatestConnectDateTo.Value.AddDays(1);
                }

                resultData = new Wow.Tv.Admin.MemberManageService.MemberManageServiceClient().MemberSearchList(condition);

                foreach (MemberManageListResult item in resultData.ListData)
                {
                    if (item.USERNAME == "휴면회원")
                    {
                        if (item.MOBILE_NO?.Split('-').Length == 2)
                        {
                            item.MOBILE_NO = "***-****-" + item.MOBILE_NO.Split('-')[2];
                        }
                    }
                }

                if (condition.RegistDateTo.HasValue == true)
                {
                    condition.RegistDateTo = condition.RegistDateTo.Value.AddDays(-1);
                }
                if (condition.LatestConnectDateTo.HasValue == true)
                {
                    condition.LatestConnectDateTo = condition.LatestConnectDateTo.Value.AddDays(-1);
                }
            }
            else
            {
                if (condition.RegistDateFrom.HasValue == false)
                {
                    condition.RegistDateFrom = null;
                }
                if (condition.RegistDateTo.HasValue == false)
                {
                    condition.RegistDateTo = null;
                }

                ////DateTime now = DateTime.Now;
                ////now = new DateTime(now.Year, now.Month, now.Day, 0, 0, 0);

                //if (condition.RegistDateFrom.HasValue == false)
                //{
                //    condition.RegistDateFrom = now;
                //}
                //if (condition.RegistDateTo.HasValue == false)
                //{
                //    condition.RegistDateTo = now;
                //}

                resultData = new ListModel<MemberManageListResult>();
                resultData.ListData = new List<MemberManageListResult>();
                condition.SearchType = "USER_ID";
            }

            DateTime? showRegistDateFrom = condition.RegistDateFrom;
            DateTime? showRegistDateTo = condition.RegistDateTo;
            DateTime? showLatestConnectDateFrom = condition.LatestConnectDateFrom;
            DateTime? showLatestConnectDateTo = condition.LatestConnectDateTo;

            ViewBag.Condition = condition;
            ViewBag.ShowRegistDateFrom = showRegistDateFrom;
            ViewBag.ShowRegistDateTo = showRegistDateTo;
            ViewBag.ShowLatestConnectDateFrom = showLatestConnectDateFrom;
            ViewBag.ShowLatestConnectDateTo = showLatestConnectDateTo;

            return View(resultData);
        }

        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Edit(MemberManageCondition condition)
        {
            MemberManageInfoResult resultData = null;
            if (condition.UserNumber <= 0)
            {
                ViewBag.Condition = condition;
                ViewBag.HistoryDescription = null;
                return View(resultData);
            }

            resultData = new Wow.Tv.Admin.MemberManageService.MemberManageServiceClient().MemberInfo(condition.UserNumber);

            if (resultData != null && resultData.MemberInfo != null)
            {
                if (resultData.MemberInfo.USERNAME == "휴면회원")
                {
                    string maskingString = "**********";
                    resultData.MemberInfo.PASSWORD_CONFIRM = maskingString;
                    resultData.MemberInfo.PASSWORD_ANSWER = maskingString;
                    resultData.MemberInfo.USERNAME = maskingString;
                    resultData.MemberInfo.BIRTHDATE = maskingString;
                    resultData.USER_CLASS = null;
                    if (resultData.MemberInfo.TEL_NO?.Split('-').Length == 3)
                    {
                        resultData.MemberInfo.TEL_NO = "***-****-" + resultData.MemberInfo.TEL_NO.Split('-')[2];
                    }
                    if (resultData.MemberInfo.MOBILE_NO?.Split('-').Length == 3)
                    {
                        resultData.MemberInfo.MOBILE_NO = "***-****-" + resultData.MemberInfo.MOBILE_NO.Split('-')[2];
                    }
                    resultData.MemberInfo.ADDRESS = maskingString;
                    resultData.MemberInfo.REGIST_DATE = new DateTime();
                    resultData.MemberInfo.BUSINESS_NO = maskingString;
                    resultData.MemberInfo.CEO_NAME = maskingString;
                }
            }


            List<NUP_ADMIN_MEMBER_INFO_HISTORY_SELECT_Result> history = resultData.MemberHistory.ListData;
            List<MemberManageHistory> historyDescription = new List<MemberManageHistory>();
            if (history.Count > 1)
            {
                int preUserHistoryIndex = -1;
                int preUserDetailHistoryIndex = -1;
                int preCompanyDetailHistoryIndex = -1;

                for (int i = 0; i < history.Count; i++)
                {
                    string rowChanged = "";
                    if (history[i].DATA_TYPE == "USER_HISTORY" && preUserHistoryIndex > -1)
                    {
                        if (history[i].PASSWORD != history[preUserHistoryIndex].PASSWORD)
                            rowChanged += ", 비밀번호";
                        if (history[i].USERNAME != history[preUserHistoryIndex].USERNAME)
                            rowChanged += ", 성명";
                        if (history[i].TEL_NO != history[preUserHistoryIndex].TEL_NO)
                            rowChanged += ", 전화번호";
                        if (history[i].PASSWORD_CONFIRM_ID != history[preUserHistoryIndex].PASSWORD_CONFIRM_ID)
                            rowChanged += ", 비밀번호질문";
                        if (history[i].PASSWORD_CONFIRM_ANSWER != history[preUserHistoryIndex].PASSWORD_CONFIRM_ANSWER)
                            rowChanged += ", 비밀번호답변";
                        if (history[i].EMAIL != history[preUserHistoryIndex].EMAIL)
                            rowChanged += ", 이메일";
                        if (history[i].IS_SEND_EMAIL != history[preUserHistoryIndex].IS_SEND_EMAIL)
                            rowChanged += ", 이메일수신여부";
                        if (history[i].IS_SEND_SMS != history[preUserHistoryIndex].IS_SEND_SMS)
                            rowChanged += ", SMS수신여부";
                        if (history[i].NICKNAME != history[preUserHistoryIndex].NICKNAME)
                            rowChanged += ", 필명";
                        if (history[i].MOBILE_NO != history[preUserHistoryIndex].MOBILE_NO)
                            rowChanged += ", 휴대전화";
                    }
                    else if (history[i].DATA_TYPE == "USER_DETAIL_HISTORY" && preUserDetailHistoryIndex > -1)
                    {
                        if (history[i].ZIPCODE != history[preUserDetailHistoryIndex].ZIPCODE)
                            rowChanged += ", 우편번호";
                        if (history[i].ADDRESS != history[preUserDetailHistoryIndex].ADDRESS)
                            rowChanged += ", 주소";
                        if (history[i].JOB_ID != history[preUserDetailHistoryIndex].JOB_ID)
                            rowChanged += ", 직업";
                        if (history[i].HOMEPAGE_URL != history[preUserDetailHistoryIndex].HOMEPAGE_URL)
                            rowChanged += ", 홈페이지URL";
                        if (history[i].REGIST_ROUTE_ID != history[preUserDetailHistoryIndex].REGIST_ROUTE_ID)
                            rowChanged += ", 가입경로";
                        if (history[i].SALARY_ID != history[preUserDetailHistoryIndex].SALARY_ID)
                            rowChanged += ", 연간수입";
                        if (history[i].INVESTMENT_PERIOD_ID != history[preUserDetailHistoryIndex].INVESTMENT_PERIOD_ID)
                            rowChanged += ", 투자기간";
                        if (history[i].INVESTMENT_SCALE_ID != history[preUserDetailHistoryIndex].INVESTMENT_SCALE_ID)
                            rowChanged += ", 투자규모";
                        if (history[i].INVESTMENT_PROPENSITY_ID != history[preUserDetailHistoryIndex].INVESTMENT_PROPENSITY_ID)
                            rowChanged += ", 투자성향";
                        if (history[i].INVESTMENT_PREFERENCE_OBJECT_ID != history[preUserDetailHistoryIndex].INVESTMENT_PREFERENCE_OBJECT_ID)
                            rowChanged += ", 투자선호대상";
                        if (history[i].STOCK_COMPANY_ID != history[preUserDetailHistoryIndex].STOCK_COMPANY_ID)
                            rowChanged += ", 주거래증권사";
                        if (history[i].INFO_ACCQUIREMENT_ID != history[preUserDetailHistoryIndex].INFO_ACCQUIREMENT_ID)
                            rowChanged += ", 기존정보습득처";
                        if (history[i].INTEREST_ITEM_ID_1 != history[preUserDetailHistoryIndex].INTEREST_ITEM_ID_1)
                            rowChanged += ", 관심종목1";
                        if (history[i].INTEREST_ITEM_ID_2 != history[preUserDetailHistoryIndex].INTEREST_ITEM_ID_2)
                            rowChanged += ", 관심종목2";
                        if (history[i].INTEREST_ITEM_ID_3 != history[preUserDetailHistoryIndex].INTEREST_ITEM_ID_3)
                            rowChanged += ", 관심종목3";
                        if (history[i].HOBBY_ID != history[preUserDetailHistoryIndex].HOBBY_ID)
                            rowChanged += ", 취미";
                        if (history[i].WEDDING_ANNIVERSARY != history[preUserDetailHistoryIndex].WEDDING_ANNIVERSARY)
                            rowChanged += ", 결혼기념일";
                        if (history[i].RESIDING_STATUS_ID != history[preUserDetailHistoryIndex].RESIDING_STATUS_ID)
                            rowChanged += ", 주거상태";
                    }
                    else if (history[i].DATA_TYPE == "COMPANY_DETAIL_HISTORY" && preCompanyDetailHistoryIndex > -1)
                    {
                        if (history[i].BUSINESS_NUMBER != history[preCompanyDetailHistoryIndex].BUSINESS_NUMBER)
                            rowChanged += ", 사업자번호";
                        if (history[i].CEO_NAME != history[preCompanyDetailHistoryIndex].CEO_NAME)
                            rowChanged += ", 대표자";
                        if (history[i].BUSINESS_ITEM != history[preCompanyDetailHistoryIndex].BUSINESS_ITEM)
                            rowChanged += ", 사업종목";
                        if (history[i].BUSINESS_CONDITION != history[preCompanyDetailHistoryIndex].BUSINESS_CONDITION)
                            rowChanged += ", 사업상태";
                        if (history[i].BUSINESS_CATEGORY != history[preCompanyDetailHistoryIndex].BUSINESS_CATEGORY)
                            rowChanged += ", 사업분류";
                        if (history[i].ESTABLISHMENT_ANNIVERSARY != history[preCompanyDetailHistoryIndex].ESTABLISHMENT_ANNIVERSARY)
                            rowChanged += ", 창립기념일";
                    }

                    if (rowChanged.Length > 0)
                    {
                        rowChanged = rowChanged.Substring(2);
						
                        historyDescription.Add(new MemberManageHistory() { AdminId = history[i].ADMIN_ID, ChangedDate = history[i].REGIST_DATE, Descript = rowChanged , OperationType = history[i].OPERATIONTYPE});
                    }


                    if (history[i].DATA_TYPE == "USER_HISTORY")
                    {
                        preUserHistoryIndex = i;
                    }
                    else if (history[i].DATA_TYPE == "USER_DETAIL_HISTORY")
                    {
                        preUserDetailHistoryIndex = i;
                    }
                    else if (history[i].DATA_TYPE == "COMPANY_DETAIL_HISTORY")
                    {
                        preCompanyDetailHistoryIndex = i;
                    }
                }
            }

            ViewBag.Condition = condition;
            ViewBag.HistoryDescription = historyDescription;

            ActionLogWrite(condition.UserNumber.ToString(), ActionLogService.ActionLogBizActionCode.Select, "회원상세정보", "");

            return View(resultData);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult PasswordInitialize(int userNumber)
        {
            // 비밀번호 초기화
            SetPasswordResult retval = new Wow.Tv.Admin.MemberManageService.MemberManageServiceClient().PasswordInitialize(userNumber, LoginHandler.CurrentLoginUser.LoginId);

            // 초기화된 비밀번호 SMS 전송
            new MemberUtilService.MemberUtilServiceClient().SmsTempPassword(retval.MobileNo, retval.TempPassword);

            return Json(new { IsSuccess = retval.Success, ReturnMessage = retval.ReturnMessage });
        }

        /// <summary>
        /// 휴면회원 해지 SMS 인증
        /// </summary>
        /// <returns></returns>
        public ActionResult RestoreDormancyMobileAuth()
        {
            string mobile = Request["mobileNo"];
            string authNumber = new MemberUtilService.MemberUtilServiceClient().SmsDormancyAuth(mobile);
            return Json(new { IsSuccess = true, AuthNumber = authNumber }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult RestoreDormancy(int userNumber)
        {
            string retval = new Wow.Tv.Admin.MemberManageService.MemberManageServiceClient().RestoreDormancy(userNumber);
            return Json(new { IsSuccess = retval == "", ReturnMessage = retval });
        }

        [HttpPost]
        [ValidateInput(false)]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Save(UserInfoSaveRequest request)
        {
            request.AdminId = LoginHandler.CurrentLoginUser.LoginId;
            UserInfoModifyResult retval = new Wow.Tv.Admin.MemberManageService.MemberManageServiceClient().MemberInfoSave(request);
            return Json(new { IsSuccess = retval.IsSuccess, ReturnMessage = retval.ReturnMessage });
        }

        [HttpPost]
        [WowTvAdminAuthorize(IsWrite = true)]
        public ActionResult Secession(int userNumber)
        {
            MemberSecessionResult retval = new Wow.Tv.Admin.MemberManageService.MemberManageServiceClient().MemberSecession(userNumber, "9", "관리자탈퇴처리");
            return Json(new { IsSuccess = retval.IsSuccess, ReturnMessage = retval.ReturnMessage });
        }

        [WowTvAdminAuthorize(IsDelete = false, IsRead = false, IsWrite = false)]
        public ActionResult AddressSearch()
        {
            return View();
        }

        public ActionResult AddressSearchByRoad()
        {
            string searchKeyword = Request["searchkeyword"];
            int pageIndex;
            if (int.TryParse(Request["pageno"], out pageIndex) == false)
            {
                pageIndex = 0;
            }
            int pageSize = 6;
            int totalCount = 0;

            System.Xml.XmlNodeList addressList = null;
            string dataReceived = "N";
            string returnMessage = "";
            string successYN = "";
            string returnCode = "";
            string errMsg = "";
            List<AddressSearchResult> addressListResult = new List<AddressSearchResult>();

            if (string.IsNullOrEmpty(searchKeyword) == false)
            {
                string serviceKey = "LKaP9WD4jVbGU%2F9P6prKd7nckx%2F50CgqZdaz9FB%2FDvRyvXNg6I8iplBJqk72McrPrVRfahcs%2BN6y%2F0I0YsmXwA%3D%3D";
                string url = "http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd";
                string data = "?searchSe=road&srchwrd=" + searchKeyword + "&serviceKey=" + serviceKey;
                string contents = "";

                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url + data);
                req.Method = "GET";
                req.Headers.Add("Accept-Language", "UTF-8");

                HttpStatusCode statusCode = HttpStatusCode.NotImplemented;
                string statusDescription = "";
                using (HttpWebResponse res = (HttpWebResponse)req.GetResponse())
                {
                    statusCode = ((HttpWebResponse)res).StatusCode;
                    statusDescription = ((HttpWebResponse)res).StatusDescription;
                    if (statusCode == HttpStatusCode.OK)
                    {
                        Stream dataStream = res.GetResponseStream();
                        StreamReader reader = new StreamReader(dataStream, System.Text.Encoding.GetEncoding("UTF-8"), true);
                        contents = reader.ReadToEnd();

                        dataReceived = "Y";
                    }
                    else
                    {
                        returnMessage = statusDescription;
                    }
                }

                if (dataReceived == "Y")
                {
                    System.Xml.XmlDocument xmldoc = new System.Xml.XmlDocument();
                    xmldoc.LoadXml(contents);
                    successYN = xmldoc.DocumentElement.SelectSingleNode("//successYN").InnerText;
                    returnCode = xmldoc.DocumentElement.SelectSingleNode("//returnCode").InnerText;
                    errMsg = xmldoc.DocumentElement.SelectSingleNode("//errMsg").InnerText;

                    if (successYN == "Y")
                    {
                        addressList = xmldoc.DocumentElement.SelectNodes("//newAddressListAreaCd");
                        totalCount = addressList.Count;
                    }

                    foreach (System.Xml.XmlNode item in addressList)
                    {
                        AddressSearchResult resultItem = new AddressSearchResult();
                        resultItem.ZipCode = item["zipNo"].InnerText;
                        resultItem.Address1 = item["lnmAdres"].InnerText; // 지번주소 노드명: rnAdres
                        addressListResult.Add(resultItem);
                    }

                    addressListResult = addressListResult.Skip(pageIndex).Take(pageSize).ToList();
                }
            }

            return Json(new
            {
                DataReceived = dataReceived,
                ReturnMessage = returnMessage,
                SuccessYN = successYN,
                ReturnCode = returnCode,
                ErrorMsg = errMsg,
                TotalCount = totalCount,
                PageSize = pageSize,
                AddressList = addressListResult
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddressSearchByReviseDomain()
        {
            string searchKeyword = Request["searchkeyword"];
            int pageIndex;
            if (int.TryParse(Request["pageindex"], out pageIndex) == false)
            {
                pageIndex = 0;
            }
            int pageSize = 6;
            int totalCount = 0;

            List<AddressSearchResult> addressListResult = new List<AddressSearchResult>();
            string dataReceived = "N";

            if (string.IsNullOrEmpty(searchKeyword) == false)
            {
                tblPost[] addressList = new Wow.Tv.Admin.MemberManageService.MemberManageServiceClient().GetAddress(searchKeyword);
                totalCount = addressList.Length;
                dataReceived = "Y";

                foreach (tblPost item in addressList)
                {
                    AddressSearchResult resultItem = new AddressSearchResult();
                    resultItem.ZipCode = item.zipcode;
                    string sido = string.IsNullOrEmpty(item.sido) == true ? "" : item.sido;
                    string gugun = string.IsNullOrEmpty(item.gugun) == true ? "" : item.gugun;
                    string dong = string.IsNullOrEmpty(item.dong) == true ? "" : item.dong;
                    string bungi = string.IsNullOrEmpty(item.bungi) == true ? "" : item.bungi;
                    resultItem.Address1 = sido + " " + gugun + " " + dong + " " + bungi;
                    addressListResult.Add(resultItem);
                }

                addressListResult = addressListResult.Skip(pageIndex).Take(pageSize).ToList();
            }

            return Json(new { DataReceived = dataReceived, TotalCount = totalCount, PageSize = pageSize, AddressList = addressListResult }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SendSms()
        {
            string sendNo = Request["sendNo"];
            string receiveNo = Request["receiveNo"];
            string message = Request["message"];
            bool isSuccess = false;
            try
            {
                new MemberManageService.MemberManageServiceClient().SendSms(receiveNo, sendNo, message);
                isSuccess = true;
            }
            catch (Exception ex)
            {
                WowLog.Write("[회원관리>SMS전송>SMS전송오류] " + ex.Message);
            }
            return Json(new { IsSuccess = isSuccess }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UserApproval()
        {
            int userNumber = int.Parse(Request["usernumber"]);
            string userId = Request["userid"];
            bool approved = Request["approved"] == "1";
            string reason = Request["reason"];
            bool isSuccess = false;
            try
            {
                new MemberManageService.MemberManageServiceClient().UserApproval(userNumber, approved, reason);
                if (approved == false)
                {
                    // 승인거부 메일 발송
                    tblUser memberInfo = new MemberInfoService.MemberInfoServiceClient().GetMemberInfo(userId);
                    new MemberUtilService.MemberUtilServiceClient().EmailCompanyRegistRejectAlarm(memberInfo.NickName, memberInfo.email, userId);
                }
                isSuccess = true;
            }
            catch (Exception ex)
            {
                WowLog.Write("[회원관리>승인처리>승인처리오류] " + ex.Message);
            }
            return Json(new { IsSuccess = isSuccess }, JsonRequestBehavior.AllowGet);
        }

		//DI 재가입불가 리스트
		public ActionResult MemberDIDenialList(IntegratedBoardCondition condition)
		{



			/*---- condition 추가 ----*/
			if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
			{
				condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
			}

			//초기 pagesize 세팅
			condition.PageSize = 10;
			/*---- condition 추가 ----*/


			//리스트
			ListModel<TblMemberDIDenialList> resultData = new MemberManageServiceClient().MemberDIDenialList(condition);

			ViewBag.TotalDataCount = resultData.TotalDataCount;
			/*---- condition 추가 ----*/
			ViewBag.CurrentIndex = condition.CurrentIndex;
			ViewBag.Condition = condition;

			ViewBag.Idx = 0;
			if (!string.IsNullOrEmpty(condition.CurrentIndex.ToString()))
			{
				ViewBag.Idx = resultData.TotalDataCount - Convert.ToInt32(condition.CurrentIndex);
			}
			/*---- condition 추가 ----*/

			var model = resultData;

			return View(model);


		}

		//DI 재가입불가 글쓰기
		public ActionResult MemberDIDenialWrite()
		{
			return View();
		}

		//DI 재가입불가 신규등록/수정
		[ValidateInput(false)]
		public ActionResult MemberDIDenialWriteProc(TblMemberDIDenialList model)
		{
			bool isSuccess = false;
			string msg = "";

			if (!string.IsNullOrEmpty(model.DupInfo))
			{
				isSuccess = true;
				new MemberManageService.MemberManageServiceClient().MemberDIDenialWriteProc(model);

			}
			else
			{
				isSuccess = false;
				msg = "title 값이 빈값이거나 NULL입니다.";
			}

			return Json(new { IsSuccess = isSuccess, Msg = msg }, JsonRequestBehavior.AllowGet);

		}

		//DI 재가입불가 뷰 
		public ActionResult MemberDIDenialView(int seq)
		{
			//뷰
			MemberManageServiceClient Board = new MemberManageServiceClient();

			var resultData = Board.MemberDIDenialView(seq);

			return View(resultData);

		}

		//삭제
		public ActionResult MemberDIDenialDelete(int seq)
		{
			bool isSuccess = false;
			string msg = "";

			if (!seq.Equals("") && !seq.Equals(null))
			{
				isSuccess = true;
				new MemberManageService.MemberManageServiceClient().MemberDIDenialDelete(seq);

			}
			else
			{
				isSuccess = false;
				msg = "seq 값이 빈값이거나 NULL입니다.";
			}

			return Json(new { IsSuccess = isSuccess, Msg = msg }, JsonRequestBehavior.AllowGet);


		}

	}
}