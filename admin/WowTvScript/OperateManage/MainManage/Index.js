
var MainManageIndex = {
    BindEdit: function (mainManageSeq) {
        $.ajax({
            type: "POST",
            url: "/OperateManage/MainManage/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "mainManageSeq": mainManageSeq },
            success: function (data) {
                $("#divEdit").html(data);
            }
        });

        return false;
    },
    BindSearchList: function () {
        $.ajax({
            type: "POST",
            url: "/OperateManage/MainManage/SearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "MainTypeCode": $("#cboMainTypeCode").val() },
            success: function (data) {
                $("#divList").html(data);
            }
        });

        return false;
    }
};


$(document).ready(function () {

    $("#cboMainTypeCode").change(function () {
        MainManageIndex.BindEdit(0);
        MainManageIndex.BindSearchList();

        return false;
    });

    $("#cboMainTypeCode").change();
});

