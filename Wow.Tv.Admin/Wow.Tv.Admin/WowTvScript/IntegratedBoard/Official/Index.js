$(document).ready(function() {

    $("#btnSearch").click(function () {


        if (!($("select[name=SearchType]").val() == "ALL")) {
            if (!window.co.validation("#txtSearch", AlertMsg.KeyWordisNotMsg)) {
                $("#txtSearch").focus();
                return false;
            }
        }
        if ($("#txtStartDate").val().length === 0 || $("#txtEndDate").val().length === 0) {
            alert("검색일을 입력하세요.");
            return false;
        }

        var startDate = $("#txtStartDate").val();
        var endDate = $("#txtEndDate").val();

        if (dateDiff(startDate, endDate) < 0) {
            alert("시작날짜와 종료날짜를 확인하세요.");
            return false;
        }

        if (dateDiff(startDate, endDate) > 365) {
            alert("1년 이상 검색을 할 수 없습니다.");
            return false;
        }



        OfficialIndex.GetList(0);

        return false;
    });


    $("#frmSearch").keydown(function() {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnCreate").click(function() {
        OfficialIndex.GoEdit(0);

        return false;
    });


    $("#btnAdd").click(function() {
        OfficialIndex.GoAdd($("#currentIndex").val());

        return false;
    });

    $("#btnDelete").click(function() {

        var checkItems = new Array();

        for (var i = 1; i < $("table tr").size(); i++) {
            var chk = $("table tr").eq(i).children().find("input[type=\"checkbox\"]").is(":checked");
            if (chk == true) {
                checkItems.push($('table tr').eq(i).find("td").eq(1).text());
            }
        }

        if (checkItems.length == 0) {
            confirm("선택 항목이 없습니다.");
            return;
        }


        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            OfficialIndex.RemoveAll(checkItems);
        }
        return false;
    });

        //전체선택 체크박스 클릭 
    $("#allCheck").click(function() {
        //만약 전체 선택 체크박스가 체크된상태일경우
        if ($("#allCheck").prop("checked")) {
            //해당화면에 전체 checkbox들을 체크해준다 
            $("input[type=checkbox]").prop("checked", true);
            // 전체선택 체크박스가 해제된 경우 
        } else {
            //해당화면에 모든 checkbox들의 체크를해제시킨다. 
            $("input[type=checkbox]").prop("checked", false);
        }
    });


    // 두개의 날짜를 비교하여 차이를 알려준다.
    function dateDiff(_date1, _date2) {
        var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

        diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
        diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());

        var diff = diffDate_2.getTime() - diffDate_1.getTime();
        if (diff > 0) {
            diff = Math.floor(diff / (1000 * 3600 * 24));
        }
        else {
            diff = Math.ceil(diff / (1000 * 3600 * 24));
        }
        return diff;
    }

    $("#frmSearch").keydown(function () {
        if (event.keyCode === 13) {
            $("#btnSearch").click();

            return false;
        }
        return false;
    });


    //검색 1년
    $("#OneYearTerm").click(function () {

        //검색 종료일
        $("#txtEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#txtStartDate").val(SetAddYear($("#txtEndDate").val(), -1));

        return false;
    });

    //검색 6개월
    $("#SixMonthTerm").click(function () {

        //검색 종료일
        $("#txtEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#txtStartDate").val(SetAddMonth($("#txtEndDate").val(), -6));

        return false;
    });

    //검색 3개월
    $("#ThreeMonthTerm").click(function () {

        //검색 종료일
        $("#txtEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#txtStartDate").val(SetAddMonth($("#txtEndDate").val(), -3));

        return false;
    });

    //검색 시작일 일자 체크
    $("#txtStartDate").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    //검색 종료일 일자 체크
    $("#txtEndDate").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "OfficialIndex.GetList"));

});



var OfficialIndex = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/Official/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    GoEdit: function (seq) {
        $("#seq").val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/Official/Edit?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    GoAdd: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/Official/Add?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    RemoveAll: function (items) {
        $.ajax({
            type: "POST",
            url: "/IntegratedBoard/Official/RemoveAll?menuSeq=" + $('#CurrentMenuSeq').val(),
            data: { "items": items },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    OfficialIndex.GetList($("#currentIndex").val());
                }
                else {
                    alert(data.Msg);
                    if (data.Redirect.length !== 0) {
                        window.location = data.Redirect;
                    }
                }
            }
        });

        return false;
    }
    
}



