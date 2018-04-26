
var AdminGroupManageCreate = {
    Save: function () {
        if ($("#txtGroupName").val() == "") {
            alert("그룹명은 필수사항 입니다.");
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/OperateManage/AdminGroupManage/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(),
            success: function (data) {
                if (data.IsSuccess == true) {
                    AdminGroupIndex.BindGroupList();

                    $("#divCreate").modal("hide");
                    $("#divCreate").html("");
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
    $("#btnClose").click(function () {
        $("#divCreate").modal("hide");

        return false;
    });


    $("#btnSave").click(function () {
        AdminGroupManageCreate.Save();

        return false;
    });


    //$("#divCreate").find("#btnDelete").click(function () {
    //    AdminGroupIndex.Delete();

    //    return false;
    //});

});

