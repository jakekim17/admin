

var ScheduleManageIndex = {
    //LastIsSunDay: false,
    //LastIsMonday: false,
    //LastIsTuesday: false,
    //LastIsWednesday: false,
    //LastIsThursday: false,
    //LastIsFriday: false,
    //LastIsSaturday: false,
    LastDate: "",
    SearchList: function (date) {
        //ScheduleManageIndex.LastIsSunDay = isSunday;
        //ScheduleManageIndex.LastIsMonday = isMonday;
        //ScheduleManageIndex.LastIsTuesday = isTuesday;
        //ScheduleManageIndex.LastIsWednesday = isWednesday;
        //ScheduleManageIndex.LastIsThursday = isThursday;
        //ScheduleManageIndex.LastIsFriday = isFriday;
        //ScheduleManageIndex.LastIsSaturday = isSaturday;
        ScheduleManageIndex.LastDate = date;

        $.ajax({
            type: "POST",
            url: "/BroadCast/ScheduleManage/SearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: {
                "date": date
            },
            success: function (data) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    LastListReload: function () {
        //ScheduleManageIndex.SearchList(ScheduleManageIndex.LastIsSunDay, ScheduleManageIndex.LastIsMonday
        //    , ScheduleManageIndex.LastIsTuesday, ScheduleManageIndex.LastIsWednesday, ScheduleManageIndex.LastIsThursday
        //    , ScheduleManageIndex.LastIsFriday, ScheduleManageIndex.LastIsSaturday);

        ScheduleManageIndex.SearchList(ScheduleManageIndex.LastDate);
    },
    FileUpload: function () {

        if ($(".fileinput-filename").text() == "") {
            alert("파일을 선택하여 주십시오.");
            return false;
        }

        var form = $('#frmFile')[0];
        var formData = new FormData(form);
        $.ajax({
            url: "/BroadCast/ScheduleManage/ExcelSave?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if (data.IsSuccess == true) {
                    alert("저장되었습니다.");

                    $("#spFileName").text(data.UserFileName);
                    $("#spFileDate").text(data.NowDate);
                    $("#btnFileCancel").click();

                    $("#addFiles").modal("hide");
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
};


$(document).ready(function () {


    $("#btnFileSave").click(function () {
        ScheduleManageIndex.FileUpload();

        return false;
    });

    $(".devWeek").click(function () {
        //ScheduleManageIndex.SearchList(true, false, false, false, false, false, false);
        ScheduleManageIndex.SearchList($(this).find("input").val());
    });

    //ScheduleManageIndex.SearchList(true, false, false, false, false, false, false);
    ScheduleManageIndex.SearchList($("#hidNowDate").val());

});

