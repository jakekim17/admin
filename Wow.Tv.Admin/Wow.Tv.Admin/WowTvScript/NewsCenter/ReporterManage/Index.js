

var ReporterManage = {

    //리스트
    ReporterManageList: function (currentIndex) {

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
            url: "/NewsCenter/ReporterManage/List?menuSeq=" + currentMenuSeq,
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#tbodyList").html(data);

                ReporterManage.ListPagingHtml(currentIndex);
            }
        });
        //return false;
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
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "ReporterManage.ReporterManageList"));
        }
    }
}

$(document).ready(function () {

    //검색 조건
    $("#SearchGubun").change(function () {
        
        if ($(this).val() == "") {

            $("#SearchText").val("");
        }
    });

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
    $("#SearchText").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#btnSearch").click();
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
        
        //조건
        if ($("#SearchGubun").val() != "") {

            var selValue = $("#SearchGubun").val()

            if (selValue == "REPORTER_NAME" || selValue == "DEPT_NAME") {

                if ($("#SearchText").val().length <= 0) {
                    alert("검색어를 입력하세요.");
                    $("#SearchText").focus();
                    return false;
                }
            }
            else if (selValue == "ARTICLE_COUNT" || selValue == "RECOMMEND_COUNT" || selValue == "RECOMMEND_COUNT")  {

                if ($("#SearchText").val().length <= 0) {
                    alert("검색수를 입력하세요.");
                    $("#SearchText").focus();
                    return false;
                }

                if (!co.validation("#SearchText", "숫자를 확인하세요.", { number: true })) {
                    $("#SearchText").focus();
                    return false;
                }
            }
        }

        //리스트
        ReporterManage.ReporterManageList();

        return false;
    });

    //Ajax 리스트
    ReporterManage.ReporterManageList();

});
