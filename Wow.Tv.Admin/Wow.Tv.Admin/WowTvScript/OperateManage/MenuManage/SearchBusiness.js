
var MenuManageSearchBusiness = {
    SearchList: function (currentIndex) {
        $("#divSearchBusiness_currentIndex").val(currentIndex);

        $.ajax({
            type: "POST",
            url: "/OperateManage/MenuManage/SearchBusinessList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#divSearchBusiness_frmSearch").serialize(),
            success: function (data) {
                $("#divSearchBusiness_divList").html(data);
            }
        });

        return false;
    }
}


$(document).ready(function () {

    $("#divSearchBusiness_frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#divSearchBusiness_btnSearch").click();

            return false;
        }
    });


    $("#divSearchBusiness_btnSearch").click(function () {
        MenuManageSearchBusiness.SearchList(0);

        return false;
    });

    $("#divSearchBusiness_btnSearch").click();
});

