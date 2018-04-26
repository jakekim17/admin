var AdminLogIndex = {
    SearchList: function (currentIndex) {

        if ($("#txtStartDate").val() != "" && $("#txtEndDate").val() != "") {
            if ($("#txtStartDate").val() > $("#txtEndDate").val() != "") {
                alert("시작일이 종료일 보다 클수 없습니다.");
                return false;
            }
        }

        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/OperateManage/AdminLog/SearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    ExcelExport: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/OperateManage/AdminLog/Excel?currentMenuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    }
};


$(document).ready(function () {

    $("#btnSearch").click(function () {
        AdminLogIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });



    $("#btnExcel").click(function () {
        AdminLogIndex.ExcelExport();

        return false;
    });

    //$('#dtStartDate').datepicker({
    //    format: "yyyy-mm-dd",
    //    language: "kr"
    //}).on('changeDate', function (ev) {
    //    $('#txtStartDate').val($('#dtStartDate').data('date'));
    //    $('#dtStartDate').datepicker('hide');
    //});

    //$('#dtEndDate').datepicker({
    //    format: "yyyy-mm-dd",
    //    language: "kr"
    //}).on('changeDate', function (ev) {
    //    $('#txtEndDate').val($('#dtEndDate').data('date'));
    //    $('#dtEndDate').datepicker('hide');
    //    });


    $("#btnSearch").click();


})