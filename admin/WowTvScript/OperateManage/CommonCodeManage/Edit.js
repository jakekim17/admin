
var CommonCodeManageEdit = {
    Save: function () {
        if ($("#txtCodeName").val() == "") {
            alert("코드명을 입력하여 주십시오.");
            $("#txtCodeName").focus();
            return false;
        }
        if ($("#txtCodeValue1").val() == "") {
            alert("코드값을 입력하여 주십시오.");
            $("#txtCodeValue1").focus();
            return false;
        }

        $.ajax({
            type: 'POST',
            url: "/OperateManage/CommonCodeManage/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    CommonCodeManageIndex.SearchList($("#frmSave").find("#hidUpCode").val(), CommonCodeManageIndex.CurrentTargetDiv);
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
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

    $("#btnSave").click(function () {
        CommonCodeManageEdit.Save();

        return false;
    });

});

