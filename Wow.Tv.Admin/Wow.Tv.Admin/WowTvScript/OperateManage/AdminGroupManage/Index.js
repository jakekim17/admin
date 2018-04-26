

var AdminGroupIndex = {
    IsChangeExist: false,
    BindGroupList: function () {

        $.ajax({
            type: 'POST',
            url: "/OperateManage/AdminGroupManage/GroupList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { },
            success: function (data, textStatus) {
                $("#tdGroupList").html(data);

                $("#tdGroupList").find("input[type='radio']").change(function () {
                    AdminGroupIndex.SearchMenu(0, 1, "divMenu_1");

                    return false;
                });
                $("#tdGroupList").find("input[type='radio']:first").prop("checked", true);
                AdminGroupIndex.SearchMenu(0, 1, "divMenu_1");
            }
        });

        return false;
    },
    OpenCreate: function (groupSeq) {
        $.ajax({
            type: "POST",
            url: "/OperateManage/AdminGroupManage/Create?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "groupSeq": groupSeq },
            success: function (data) {
                $("#divCreate").html(data);
                $("#divCreate").modal("show");
            }
        });

        return false;
    },
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/OperateManage/AdminGroupManage/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "groupSeq": $("#tdGroupList").find("input[type='radio']:checked").val() },
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
        }

        return false;
    },
    Copy: function () {
        $.ajax({
            type: "POST",
            url: "/OperateManage/AdminGroupManage/Copy?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "groupSeq": $("#tdGroupList").find("input[type='radio']:checked").val() },
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
    },
    SearchMenu: function (upMenuSeq, depth, targetDiv, callBackFun) {
        if (depth <= 3) {
            var isContinue = false;
            if (AdminGroupIndex.IsChangeExist == true) {
                if (confirm("변경중인 정보가 존재 합니다.\r\n변경중인 정보를 취소하시겠습니까?") == true) {
                    isContinue = true;
                }
            }
            else {
                isContinue = true;
            }

            if (isContinue == true) {
                AdminGroupIndex.IsChangeExist = false;
                $.ajax({
                    type: "POST",
                    url: "/OperateManage/AdminGroupManage/MenuList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                    data: { "groupSeq": $("#tdGroupList").find("input[type='radio']:checked").val(),  "upMenuSeq": upMenuSeq, "depth": depth },
                    success: function (data) {
                        $("#" + targetDiv).html(data);
                        $("#" + targetDiv).find(".devMenuItem:first").click();
                        $("#" + targetDiv).find("[type='checkbox']").change(function () {
                            AdminGroupIndex.IsChangeExist = true;
                        })

                        if (callBackFun != null) {
                            callBackFun();
                        }
                    }
                });
            }
        }

        return false;
    },
    MenuItemClick: function (obj, upMenuSeq, depth, targetDiv) {
        AdminGroupIndex.SearchMenu(upMenuSeq, depth, targetDiv
            , function () {
                $(obj).parent().prev().click();
            }
        );

        return false;
    },
    AllCheck: function (obj, targetDiv) {
        $("#" + targetDiv).find("[type='checkbox']").prop("checked", true);
        AdminGroupIndex.IsChangeExist = true;

        return false;
    },
    Init: function () {
        location.reload();

        return false;
    },
    Apply: function () {
        var currentIndex = 0;

        $.each($(".devAdminGroupList"), function (index, item) {
            $(item).find(".devAdminGroupList_MenuSeq").attr("name", "list[" + currentIndex + "].MenuSeq");
            $(item).find(".devAdminGroupList_ReadYn").attr("name", "list[" + currentIndex + "].ReadYn");
            $(item).find(".devAdminGroupList_WriteYn").attr("name", "list[" + currentIndex + "].WriteYn");
            $(item).find(".devAdminGroupList_DeleteYn").attr("name", "list[" + currentIndex + "].DeleteYn");

            currentIndex++;
        });

        $.ajax({
            type: "POST",
            url: "/OperateManage/AdminGroupManage/AdminGroupSave?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmAdminGroup").serialize(),
            success: function (data) {
                if (data.IsSuccess == true) {
                    alert("저장 되었습니다.");
                    AdminGroupIndex.IsChangeExist = false;
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

    $("#btnGroupCreate").click(function () {
        AdminGroupIndex.OpenCreate(0);

        return false;
    });

    $("#btnGroupEdit").click(function () {
        AdminGroupIndex.OpenCreate($("#tdGroupList").find("input[type='radio']:checked").val());

        return false;
    });
    

    $("#divIndex").find("#btnDelete").click(function () {
        AdminGroupIndex.Delete();

        return false;
    });

    $("#btnCopy").click(function () {
        AdminGroupIndex.Copy();

        return false;
    });

    $("#btnInit").click(function () {
        AdminGroupIndex.Init();

        return false;
    });

    $("#btnApply").click(function () {
        AdminGroupIndex.Apply();

        return false;
    });
    


    AdminGroupIndex.BindGroupList();

});


