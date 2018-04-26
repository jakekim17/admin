
var NewsOpinion = {

    SetSearchControl: function () {

        $("#SearchViewYN option:first").prop("selected", true);
        $("#SearchOnOff option:first").prop("selected", true);
        $("#SearchStartDate").val("");
        $("#SearchEndDate").val("");
        $("#SearchText").val("");

        $("#Page").val("1");
        $("#currentIndex").val(0);
        $("#totalDataCount").val("");
        $("#SEQ").val("");
    },
    Edit: function (SEQ) {

        if (typeof SEQ != "undefined") $("#SEQ").val(SEQ);

        var gubunCode = $("#SearchGubun").val();
        var strUrl = String.format("NewsOpinionEdit?gubunCode={0}&menuSeq={1}", gubunCode, currentMenuSeq);

        $("#frmSearch").attr("action", strUrl);
        $("#frmSearch").submit();
    },
    Delete: function (deleteList) {
        $.ajax({
            type: "POST",
            url: "NewsOpinionDelete?menuSeq=" + currentMenuSeq,
            data: { "deleteList": deleteList },
            success: function (data) {

                if (data.IsSuccess) {
                    alert(CommonMsg.DeleteAfterMsg);
                    
                    $("#Page").val("1");
                    $("#currentIndex").val(0);

                    NewsOpinion.List();
                } else {
                    if (data.Msg == "") {
                        alert(CommonMsg.ErrorMag);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            }
        });
    },
    //리스트
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
                url: "NewsOpinionList?menuSeq=" + currentMenuSeq,
                data: $("#frmSearch").serialize(),
                success: function (data, textStatus) {

                    $("#tbodyList").html(data);
                    NewsOpinion.ListPagingHtml(currentIndex);
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
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "NewsOpinion.List"));
        }
    }
}

$(document).ready(function () {

    //연재칼럼
    $("#btnS").click(function () {

        //alert($(this).attr("id"));
        
        //검색컨트롤
        NewsOpinion.SetSearchControl();

        var tabTitle = $(this).html();
        $("#spanIngTitle").html(tabTitle);

        $("#SearchGubun").val("S");
        NewsOpinion.List();
    });

    //기획취재
    $("#btnP").click(function () {

        //검색컨트롤
        NewsOpinion.SetSearchControl();

        var tabTitle = $(this).html();
        $("#spanIngTitle").html(tabTitle);

        $("#SearchGubun").val("P");
        NewsOpinion.List();

    });

    //외부기고
    $("#btnF").click(function () {

        //검색컨트롤
        NewsOpinion.SetSearchControl();

        var tabTitle = $(this).html();
        $("#spanIngTitle").html(tabTitle);

        $("#SearchGubun").val("F");
        NewsOpinion.List();
    });

    //전체선택
    $("#allCheck").click(function () {

        //alert($(this).is(":checked"));

        //체크박스가 체크
        if ($(this).prop("checked")) {

            $("input[name='SEQ']").prop("checked", true);

            //체크박스 해제
        } else {

            $("input[name='SEQ']").prop("checked", false);
        }
    });

    // 신규등록
    $("#btnReg").click(function () {

        NewsOpinion.Edit(0);
        //alert(9);
        //var gubunCode = $("#SearchGubun").val();
        //var strUrl = String.format("NewsOpinionEdit?gubunCode={0}&menuSeq={1}", gubunCode, currentMenuSeq);
        //location.href = strUrl;
    });


    // 삭제
    $("#btnDelete").click(function () {

        var checked = false;
        var deleteList = [];

        $("input:checkbox[name='SEQ']:checked").each(function () {

            deleteList.push(this.value);
        });
        if (deleteList.length <= 0) {

            alert("선택한 항목이 없습니다.");
        }
        else {
            if (confirm(CommonMsg.DeleteConfirmMsg)) {

                NewsOpinion.Delete(deleteList);
            }
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

        if ($("#SearchStartDate").val().length != 0 && $("#SearchEndDate").val().length != 0) {

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
        }

        //뉴스 Ajax 리스트
        NewsOpinion.List();

        return false;
    });

    //뉴스 Ajax 리스트
    NewsOpinion.List();
});