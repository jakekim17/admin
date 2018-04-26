using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Admin.AdminServiceCenter;
using Wow.Tv.Admin.KvinaService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.Kvina;
using Wow.Tv.Middle.Model.Db49.wowtv.ServiceCenter;

namespace Wow.Tv.Admin.Areas.Kvina.Controllers
{
	public class KvinaController : BaseController
	{



		public ActionResult KvinaNoticeList(IntegratedBoardCondition condition)
		{
			//리스트
			ListModel<KvinaNoticeList> resultData = new KvinaServiceClient().KvinaNoticeList(condition);

			resultData.TotalDataCount = 0;

			if (resultData.ListData.Count > 0)
			{
				resultData.TotalDataCount = (int)resultData.ListData.First().ROWCNT;
			}

			ViewBag.TotalDataCount = resultData.TotalDataCount;




			var model = resultData;

			return View(model);


		}


		public ActionResult KvinaNoticeListLinq(IntegratedBoardCondition condition)
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
			ListModel<TAB_NOTICE> resultData = new KvinaServiceClient().KvinaNoticeListLinq(condition);
			
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

		//public ActionResult KvinaNoticeView(int seq)
		//{
		//	ServiceCenterClient serviceCenter = new ServiceCenterClient();

		//	var resultData = serviceCenter.GetNoticeSingle(seq) ?? new TAB_NOTICE();



		//	return View(resultData);
		//}

		public ActionResult KvinaNoticeView(int seq)
		{
			//뷰
			KvinaServiceClient KvinaBoard = new KvinaServiceClient();
			
			var resultData = KvinaBoard.KvinaNoticeView(seq);

			return View(resultData);
			
		}

		public ActionResult KvinaNoticeViewLinq(int seq)
		{
			//뷰
			KvinaServiceClient KvinaBoard = new KvinaServiceClient();

			var resultData = KvinaBoard.KvinaNoticeViewLinq(seq);

			return View(resultData);

		}

		public ActionResult KvinaNoticeWrite()
		{
			return View();
		}

		public ActionResult KvinaNoticeWriteLinq()
		{
			return View();
		}

		[ValidateInput(false)]
		public ActionResult KvinaNoticeWriteProc(string title, string content, string user_name)
		{
			bool isSuccess = false;
			string msg = "";

			if (!string.IsNullOrEmpty(title))
			{
				isSuccess = true;
				new KvinaService.KvinaServiceClient().KvinaNoticeWriteProc(title, content, user_name);

			}
			else
			{
				isSuccess = false;
				msg = "title 값이 빈값이거나 NULL입니다.";
			}

			return Json(new { IsSuccess = isSuccess, Msg = msg }, JsonRequestBehavior.AllowGet);

		}

		[ValidateInput(false)]
		public ActionResult KvinaNoticeWriteProcLinq(TAB_NOTICE model)
		{
			bool isSuccess = false;
			string msg = "";

			if (!string.IsNullOrEmpty(model.TITLE))
			{
				isSuccess = true;
				new KvinaService.KvinaServiceClient().KvinaNoticeWriteProcLinq(model);

			}
			else
			{
				isSuccess = false;
				msg = "title 값이 빈값이거나 NULL입니다.";
			}

			return Json(new { IsSuccess = isSuccess, Msg = msg }, JsonRequestBehavior.AllowGet);

		}


		[ValidateInput(false)]
		public ActionResult KvinaNoticeWriteEdit(int seq, string title, string content, string user_name)
		{
			bool isSuccess = false;
			string msg = "";

			if (!string.IsNullOrEmpty(title))
			{
				isSuccess = true;
				new KvinaService.KvinaServiceClient().KvinaNoticeWriteEdit(seq, title, content, user_name);

			}
			else
			{
				isSuccess = false;
				msg = "title 값이 빈값이거나 NULL입니다.";
			}

			return Json(new { IsSuccess = isSuccess, Msg = msg }, JsonRequestBehavior.AllowGet);
			
			
		}




		public ActionResult KvinaNoticeDelete(int seq)
		{
			bool isSuccess = false;
			string msg = "";

			if (!seq.Equals("") && !seq.Equals(null))
			{
				isSuccess = true;
				new KvinaService.KvinaServiceClient().KvinaNoticeDelete(seq);

			}
			else
			{
				isSuccess = false;
				msg = "seq 값이 빈값이거나 NULL입니다.";
			}

			return Json(new { IsSuccess = isSuccess, Msg = msg }, JsonRequestBehavior.AllowGet);


		}

		//삭제 linq
		public ActionResult KvinaNoticeDeleteLinq(int seq)
		{
			bool isSuccess = false;
			string msg = "";

			if (!seq.Equals("") && !seq.Equals(null))
			{
				isSuccess = true;
				new KvinaService.KvinaServiceClient().KvinaNoticeDeleteLinq(seq);

			}
			else
			{
				isSuccess = false;
				msg = "seq 값이 빈값이거나 NULL입니다.";
			}

			return Json(new { IsSuccess = isSuccess, Msg = msg }, JsonRequestBehavior.AllowGet);


		}

		//public ActionResult KvinaPaymentAPI()
		//{
		//	KvinaServiceClient KvinaBoard = new KvinaServiceClient();

		//	var resultData = KvinaBoard.KvinaPaymentAPI();
			
		//	return View(resultData);

		//}

		//배열로 int형 값 받아오기
		public ActionResult KvinaPaymentAPI()
		{
			int[] resultData = new KvinaService.KvinaServiceClient().KvinaPaymentAPI();
			int[] array = resultData.ToArray();
			ViewBag.DblTotalPurAmt = array[0];  //기간별 누적 총 결제 금액
			ViewBag.DblTotalCnlAmt = array[1];  //기간별 누적 총 취소 금액
			ViewBag.DblTotalPurCnt = array[2];  //기간별 누적 총 결제 개수
			ViewBag.DblTotalCnlCnt = array[3];  //기간별 누적 총 취소 개수
			ViewBag.intRecordCnt = array[4];    //총 조회 열 개수
			ViewBag.intRatval = array[5];   //프로시저 반환 코드 0:성공
			

			//int[] resultData = new int[] KvinaService.KvinaServiceClient().KvinaPaymentAPI();

			//int[] resultData2 = new int[] { DblTotalPurAmt, DblTotalCnlAmt, DblTotalPurCnt, DblTotalCnlCnt, intRecordCnt, intRatval };


			return View(resultData);

		}

	}


}