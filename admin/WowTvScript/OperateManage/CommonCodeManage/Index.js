

var CommonCodeManageIndex = {
    CurrentTargetDiv: "divCode_1",
    SearchList: function (upCommonCode, targetDiv, callBackFun) {
        $.ajax({
            type: "POST",
            url: "/OperateManage/CommonCodeManage/SearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "UpCommonCode": upCommonCode } ,
            success: function (data) {
                $("#" + targetDiv).html(data);
                $("#" + targetDiv).find(".devItem:first").click();

                switch (targetDiv) {
                    case "divCode_1":
                        $("#" + targetDiv).find("#h3Title").text("대분류");
                        break;
                    case "divCode_2":
                        $("#" + targetDiv).find("#h3Title").text("중분류");
                        break;
                    case "divCode_3":
                        $("#" + targetDiv).find("#h3Title").text("소분류");
                        break;
                }


                if (callBackFun != null) {
                    callBackFun();
                }
            }
        });

        return false;
    },
    ItemClick: function (obj, upCode) {
        $(obj).parent().prev().click();
        var depth = $(obj).closest(".devCode").attr("title");
        depth = parseInt(depth);
        depth++;
        CommonCodeManageIndex.SearchList(upCode, "divCode_" + depth);

        return false;
    },
    OpenEdit: function (obj, commonCode) {
        var upCommonCode = "";
        var depth = $(obj).closest(".devCode").attr("title");
        CommonCodeManageIndex.CurrentTargetDiv = "divCode_" + depth;
        upCommonCode = $(obj).closest(".devCode").find("#hidUpCode").val();

        $.ajax({
            type: "POST",
            url: "/OperateManage/CommonCodeManage/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "commonCode": commonCode, "upCommonCode": upCommonCode },
            success: function (data) {
                $("#divEdit").html(data);
                $("#divEdit").modal("show");
            }
        });

        return false;
    },
    OpenModify: function (obj) {
        var commonCode = $(obj).closest(".devCode").find("[type='radio']:checked").val();
        CommonCodeManageIndex.OpenEdit(obj, commonCode);

        return false;
    },
    Delete: function (obj) {
        var commonCode = $(obj).closest(".devCode").find("[type='radio']:checked").val();
        var targetDiv = $(obj).closest(".devCode").attr("id");

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/OperateManage/CommonCodeManage/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "commonCode": commonCode },
                success: function (data) {
                    if (data.IsSuccess == true) {
                        var upCommonCode = data.UpCommonCode;
                        CommonCodeManageIndex.SearchList(upCommonCode, targetDiv);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    }

};


$(document).ready(function () {

    CommonCodeManageIndex.SearchList("", "divCode_1");

});

