
var MemIdxIndex = {
    SetRegistDateSearch: function (days) {
        var registDateFrom = GetSearchDate(days);
        var registDateTo = GetSearchDate(0);

        $("#RegistDateFrom").val(registDateFrom);
        $("#RegistDateTo").val(registDateTo);
    },

    SetLatestConnectDateSearch: function (days) {
        var lastestConnectDateFrom = GetSearchDate(days); 
        var lastestConnectDateTo = GetSearchDate(0);

        $("#LatestConnectDateFrom").val(lastestConnectDateFrom);
        $("#LatestConnectDateTo").val(lastestConnectDateTo);
    },

    SearchList: function (currentIndex) {

        var registDateFrom = $("#RegistDateFrom").val().trim();
        var registDateTo = $("#RegistDateTo").val().trim();
        var searchType = $("#SearchType").val().trim();
        var searchText = $("#SearchText").val().trim();

        var latestConnectDateFrom = $("#LatestConnectDateFrom").val().trim();
        var latestConnectDateTo = $("#LatestConnectDateTo").val().trim();

        if (latestConnectDateFrom == "" && latestConnectDateTo == "" && registDateFrom == "" && registDateTo == "" && searchType != "INACTIVE" && (searchType == "" || searchText == "")) {
            alert("검색조건을 입력하세요.");
            return;
        }

        $("#CurrentIndex").val(currentIndex);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntMemManage/MemIdx/Index?menuSeq=" + $("#CurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    GoEdit: function (userNumber) {
        $("#UserNumber").val(userNumber);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntMemManage/MemIdx/Edit?menuSeq=" + $("#CurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    GoSms: function (sendNo, receiveNo) {
        $("#liSendNo").html("회신 번호 : " + sendNo);
        $("#liReceiveNo").html("수신 번호 : " + receiveNo);
        $("#smsContents").val("");
        $("#hidSendNo").val(sendNo);
        $("#hidReceiveNo").val(receiveNo);
        MemIdxIndex.TextCheck();
    },
    BindingTemplate: function (templateNo) {
        var templateString = "";
        switch (templateNo) {
            case 1:
                templateString = "신한:362-01-074480 예금주:주)한국경제tv 입금 후 연락주시기 바랍니다";
                break;
            case 2:
                templateString = "서울시 영등포구 버드나루로 84 제일빌딩 (주)한국경제tv 6층 와우넷팀입니다.";
                break;
            case 3:
                templateString = "서울시 영등포구 영등포동7가 94-46 제일빌딩 (주)한국경제tv 6층 와우넷팀입니다.";
                break;
            case 4:
                templateString = "[와우넷]팩스번호:02)6676-0130  *아이디/핸드폰번호 기입 후 보내시고 연락주세요";
                break;
            case 5:
                templateString = "[와우넷 카드취소 완료] 카드사 내 처리 3~4일 소요. 문의는 카드사로 부탁드립니다.";
                break;
            case 6:
                templateString = "서울 영등포구 버드나루로 84 제일빌딩 6층 와우넷팀 누구? 입니다 핸드폰번호기재(필수)";
                break;
            case 7:
                templateString = "www.wownet.co.kr 또는 네이버에서「와우넷」검색, 회원가입 후 연락주시기 바랍니다";
                break;
            case 8:
                templateString = "http://www.wowtv.co.kr/mobile/member/register_1.asp <-클릭 와우넷 회원가입하세요";
                break;
            case 9:
                templateString = "[와우밴드] 아래 Url 클릭, 인터넷 연결 후 설치하세요 http://goo.gl/ATnkgy";
                break;
            case 10:
                templateString = "주식창/친절한홀짝씨/고수/미래주가/최승욱플러스문의는 02-6676-0403으로 연락주세요";
                break;
            case 11:
                templateString = "샤프슈터가 아들에게 보내는 편지 구매 사이트입니다 -> http://www.letterson.co.kr/";
                break;
        }

        $("#smsContents").val(templateString);
        MemIdxIndex.TextCheck();
    },
    TextCheck: function () {
        var inputByte = MemIdxIndex.GetTextByte();
        var limitByte = 88;
        if (inputByte > 88) {
            limitByte = 2000;
        }
        $("#byteStatus").html("<span>" + inputByte + "</span> / <span>" + limitByte + "</span> byte");
    },
    GetTextByte: function () {
        var inputText = $("#smsContents").val();
        var inputByte = 0;
        for (i = 0; i < inputText.length; i++) {
            inputByte += (inputText.charCodeAt(i) > 127) ? 2 : 1;
        }
        return inputByte;
    },
    SendSms: function () {
        var sendNo = $("#hidSendNo").val();
        var receiveNo = $("#hidReceiveNo").val();

        $.ajax({
            type: 'POST',
            url: "/IntMemManage/MemIdx/SendSms?currentMenuSeq=" + $("#CurrentMenuSeq").val(),
            data: { sendNo: $("#hidSendNo").val(), receiveNo: $("#hidReceiveNo").val(), message: $("#smsContents").val() },
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    alert("전송되었습니다.");
                }
                else {
                    alert("문제가 발생하였습니다. 관리자에게 문의 바랍니다.");
                }
                $("#smsClose").click();
            }
        });
    }
}

$(document).ready(function () {

    // 가입일 검색
    $("#RegistDateSearch1").click(function () {
        MemIdxIndex.SetRegistDateSearch(0);
        return false;
    });
    $("#RegistDateSearch2").click(function () {
        MemIdxIndex.SetRegistDateSearch(-1);
        return false;
    });
    $("#RegistDateSearch3").click(function () {
        MemIdxIndex.SetRegistDateSearch(-3);
        return false;
    });
    $("#RegistDateSearch4").click(function () {
        MemIdxIndex.SetRegistDateSearch(-7);
        return false;
    });
    $("#RegistDateSearch5").click(function () {
        MemIdxIndex.SetRegistDateSearch(-10);
        return false;
    });
    $("#RegistDateSearch6").click(function () {
        MemIdxIndex.SetRegistDateSearch(-30);
        return false;
    });

    // 최근접속일 검색
    $("#LatestConnectDateSearch1").click(function () {
        MemIdxIndex.SetLatestConnectDateSearch(0);
        return false;
    });
    $("#LatestConnectDateSearch2").click(function () {
        MemIdxIndex.SetLatestConnectDateSearch(-1);
        return false;
    });
    $("#LatestConnectDateSearch3").click(function () {
        MemIdxIndex.SetLatestConnectDateSearch(-3);
        return false;
    });
    $("#LatestConnectDateSearch4").click(function () {
        MemIdxIndex.SetLatestConnectDateSearch(-7);
        return false;
    });
    $("#LatestConnectDateSearch5").click(function () {
        MemIdxIndex.SetLatestConnectDateSearch(-10);
        return false;
    });
    $("#LatestConnectDateSearch6").click(function () {
        MemIdxIndex.SetLatestConnectDateSearch(-30);
        return false;
    });

    // 검색
    $("#btnSearch").click(function () {
        var searchType = $("#SearchType").val();
        var searchText = $("#SearchText").val();
        if (searchType == "" && searchText != "") {
            alert("검색조건을 선택하세요.");
            return false;
        }
        MemIdxIndex.SearchList(0);
        return false;
    });
    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();
            return false;
        }
        else {
            return true;  
        }
    });
    $("#smsContents").keyup(function () {
        MemIdxIndex.TextCheck();
        //if (byte($(this).val()) > 250) {
        //    alert("250자 이상 입력할수 없습니다.");
        //    $(this).val("");
        //    $(this).val(byteTxt);
        //}
        //else {
        //    $(tid).html(byte($(this).val()));
        //}
    });
    $("#sendSms").click(function () {
        MemIdxIndex.SendSms();
    });

    // 페이징
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#CurrentIndex").val(), $("#PageSize").val(), "MemIdxIndex.SearchList"));

    $(window.document).on("contextmenu", function (event) { return false; }); // 우클릭방지
    $(window.document).on("selectstart", function (event) { return false; });// 더블클릭을 통한 선택방지
    $(window.document).on("dragstart", function (event) { return false; });	// 드래그
});
