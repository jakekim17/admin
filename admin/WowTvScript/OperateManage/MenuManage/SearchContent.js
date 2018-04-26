
var MenuManageSearchContent = {
    BindBoard: function () {
        $.ajax({
            type: "POST",
            url: "/OperateManage/MenuManage/SearchBoard?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: {},
            success: function (data) {
                $("#divContent").html(data);
            }
        });

        return false;
    },
    BindBusiness: function () {
        $.ajax({
            type: "POST",
            url: "/OperateManage/MenuManage/SearchBusiness?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: {},
            success: function (data) {
                $("#divContent").html(data);
            }
        });

        return false;
    }
}

$(document).ready(function () {

    $("#tabOpinion1").click(function () {
        MenuManageSearchContent.BindBoard();
    });

    $("#tabOpinion2").click(function () {
        MenuManageSearchContent.BindBusiness();
    });

    if (isHtmlContent.toUpperCase() == "TRUE") {
        $("#tabOpinion2").click();
    }
    else {
        $("#tabOpinion1").click();
    }

});