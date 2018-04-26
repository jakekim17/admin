
$(document).ready(function () {

    $("#btnList").click(function () {
        OfficialAdd.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {

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



        if ($(":input:radio[name='VIEW_YN']:checked").val().length == 0) {
            $("#VIEW_YN").focus();
            alert("게시 여부를 선택해주십시오.");
            return false;
        }



        if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
            $("#TITLE").focus();
            return false;
        }

        //if ($(".fileinput-filename").text() == "") {
        //    alert("파일을 선택하여 주십시오.");
        //    return false;
        //}


        if (confirm(CommonMsg.SaveConfirmMsg)) {
            SmartEditor.SaveDataItem("hidContent");
            OfficialAdd.Save();
        }

        return false;
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

    SmartEditor.CreateItem("hidContent");

});



var OfficialAdd = {
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/Official/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    Save: function () {
        var form = $('#frmSave')[0];
        var formData = new FormData(form);
        $.ajax({
            url: "/IntegratedBoard/Official/FileSave?currentMenuSeq=" + $("#CurrentMenuSeq").val(),
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if (data.IsSuccess === true) {
                    confirm(CommonMsg.SaveAfterMsg);
                    OfficialAdd.GoIndex();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}