$(document).ready(function () {

    $("#btnSearch").click(function () {
        NoticeIndex.GetList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnCreate").click(function () {
        NoticeIndex.GoEdit(0);

        return false;
    });


    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "NoticeIndex.GetList"));

});



var NoticeIndex = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Notice/index");
        $("#frmSearch").submit();

        return false;
    }, 
    GoEdit: function (seq) {
        $("#seq").val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Notice/Edit");
        $("#frmSearch").submit();

        return false;
    },
    GoDetail: function (seq) {
        $("#seq").val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Notice/Detail");
        $("#frmSearch").submit();

        return false;
    }
}