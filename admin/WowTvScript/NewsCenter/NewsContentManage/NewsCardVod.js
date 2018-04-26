

var NewsCardVod = {

    //수동,자동 설정 저장
    Save: function () {

        if (confirm(CommonMsg.SaveConfirmMsg)) {
            $.ajax({
                type: "POST",
                url: "SetNewsShowConfig?menuSeq=" + currentMenuSeq,
                data: $("#frmSearch").serialize(),
                success: function (data, textStatus) {

                    if (data.IsSuccess == true) {

                        alert(CommonMsg.SaveAfterMsg);
                    }
                    else {
                        if (data.Msg == "") {
                            alert(CommonMsg.ErrorMag);
                        }
                        else {
                            alert(data.Msg);
                        }
                    }
                }
            });
        }
    },
    //뉴스 노출 설정 리스트
    ConfigList: function (currentIndex) {

        if ($("#SearchGubun").val() == "") {

            alert("필요한 값이 없습니다.[gubun code]");
            return false;
        }
        else {

            $.ajax({
                type: "POST",
                url: "NewsCardVodConfigList?menuSeq=" + currentMenuSeq,
                data: $("#frmSearch").serialize(),
                success: function (data, textStatus) {

                    $("#tbodyNewsConfigList").html(data);
                }
            });
        }
    },
    //뉴스 리스트
    List: function (currentIndex) {

        if ($("#SearchGubun").val() == "") {

            alert("필요한 값이 없습니다.[gubun code]");
            return false;
        }
        else {
            if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();
            else { $("#currentIndex").val(currentIndex); }

            currentIndex = parseInt(currentIndex)
            var pageSize = parseInt($("#PageSize").val());
            var currentPageNo = Math.floor(currentIndex / pageSize);

            if (currentPageNo == 0) {
                currentPageNo = 1;
            } else {
                currentPageNo++;
            }

            $("#Page").val(currentPageNo);

            $.ajax({
                type: "POST",
                url: "NewsCardVodList?menuSeq=" + currentMenuSeq,
                data: $("#frmSearch").serialize(),
                success: function (data, textStatus) {

                    $("#tbodyNewsList").html(data);
                    NewsCardVod.ListPagingHtml(currentIndex);
                }
            });
        }
    },
    //페이징
    ListPagingHtml: function (currentIndex) {

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();

        var pageSize = parseInt($("#PageSize").val());
        var totalDataCount = parseInt($("#totalDataCount").val());

        if (totalDataCount == 0) {
            $("#divPaging").html("");
        }
        else {
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "NewsCardVod.List"));
        }
    }
}


$(document).ready(function () {

    //검색 1주일
    $("#OneWeekTerm").click(function () {

        //검색 종료일
        $("#SearchEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#SearchStartDate").val(SetAddDay($("#SearchEndDate").val(), -7));

        return false;
    });

    //검색 2주일
    $("#TwoWeekTerm").click(function () {

        //검색 종료일
        $("#SearchEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#SearchStartDate").val(SetAddDay($("#SearchEndDate").val(), -14));

        return false;
    });

    //검색 1달
    $("#OneMonthTerm").click(function () {

        //검색 종료일
        $("#SearchEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#SearchStartDate").val(SetAddMonth($("#SearchEndDate").val(), -1));

        return false;
    });

    //검색 종료일
    $("#SearchEndDate").val(new Date().format("yyyy-MM-dd"));

    //검색 시작일
    $("#SearchStartDate").val(SetAddMonth($("#SearchEndDate").val(), -6));

    //검색 시작일 일자 체크
    $("#SearchStartDate").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    //검색 종료일 일자 체크
    $("#SearchEndDate").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    //검색어
    $('#SearchText').keypress(function (event) {
        if (event.which == 13) {
            $('#btnSearch').click();
            return false;
        }
    });

    //검색 버튼
    $("#btnSearch").click(function () {

        if ($("#SearchStartDate").val().length == 0 || $("#SearchEndDate").val().length == 0) {
            alert("검색일을 입력하세요.");
            return false;
        }

        var startDate = $("#SearchStartDate").val();
        var endDate = $("#SearchEndDate").val();

        var startDateArr = startDate.split('-');
        var endDateArr = endDate.split('-');

        var startDateCompare = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);
        var endDateCompare = new Date(endDateArr[0], endDateArr[1], endDateArr[2]);

        if (startDateCompare.getTime() > endDateCompare.getTime()) {

            alert("시작날짜와 종료날짜를 확인하세요.");
            return false;
        }

        //뉴스 Ajax 리스트
        NewsCardVod.List();

        return false;
    });

    //노출 설정 저장 버튼
    $("#btnSave").click(function () {

        NewsCardVod.Save();
    });

    //노출설정된 리스트
    NewsCardVod.ConfigList();

    //뉴스 Ajax 리스트
    NewsCardVod.List();

});