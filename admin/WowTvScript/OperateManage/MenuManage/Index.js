


var MenuManageIndex = {
    OpenEdit: function (menuSeq, upMenuSeq) {
        $.ajax({
            type: "POST",
            url: "/OperateManage/MenuManage/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "menuSeq": menuSeq, "upMenuSeq": upMenuSeq, "channelCode": $("#cboChannelCode").val() },
            success: function (data) {
                $("#divEdit").html(data);
                $("#divEdit").modal("show");
            }
        });

        return false;
    },
    SearchMenu: function (upMenuSeq, depth, targetDiv, callBackFun) {
        if (depth <= 3) {
            $("#txtUpMenuSeq").val(upMenuSeq);
            $("#txtDepth").val(depth);

            $.ajax({
                type: "POST",
                url: "/OperateManage/MenuManage/SearchMenu?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: $("#frmSearch").serialize(),
                success: function (data) {
                    $("#" + targetDiv).html(data);
                    $("#" + targetDiv).find(".devMenuItem:first").click();

                    if (callBackFun != null) {
                        callBackFun();
                    }
                }
            });
        }

        return false;
    },
    Delete: function (menuSeq, depth, upMenuSeq, callBackFun) {

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/OperateManage/MenuManage/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "menuSeq": menuSeq },
                success: function (data) {
                    if (data.IsSuccess == true) {
                        //alert("성공");
                        MenuManageIndex.SearchMenu(upMenuSeq, depth, "divMenu_" + depth);
                        
                        if (callBackFun != null) {
                            callBackFun();
                        }
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    UpDown: function (menuSeq, isUp, upMenuSeq, depth) {
        $.ajax({
            type: "POST",
            url: "/OperateManage/MenuManage/UpDown?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "menuSeq": menuSeq, "isUp": isUp },
            success: function (data) {
                if (data.IsSuccess == true) {
                    MenuManageIndex.SearchMenu(upMenuSeq, depth, "divMenu_" + depth);
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    MenuItemClick: function (obj, upMenuSeq, depth, targetDiv) {
        $(obj).parent().prev().click();
        MenuManageIndex.SearchMenu(upMenuSeq, depth, targetDiv);

        return false;
    },
    MenuItemModifyClick: function (obj, depth, upMenuSeq) {
        var menuSeq = 0;
        menuSeq = $("input[name='menu_" + depth + "']:checked").val();
        if (menuSeq == null) {
            alert("수정할 메뉴를 선택하여 주십시오.");
        }
        else {
            MenuManageIndex.OpenEdit(menuSeq, upMenuSeq);
        }
        

        return false;
    },
    MenuItemDeleteClick: function (obj, depth, upMenuSeq) {
        var menuSeq = 0;
        menuSeq = $("input[name='menu_" + depth + "']:checked").val();

        MenuManageIndex.Delete(menuSeq, depth, upMenuSeq);

        return false;
    },


    OpenSearchContent: function (isHtmlContent) {
        $.ajax({
            type: "POST",
            url: "/OperateManage/MenuManage/SearchContent?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "isHtmlContent": isHtmlContent },
            success: function (data) {
                $("#divSearchContent").html(data);
                $("#divSearchContent").modal("show");
            }
        });

        return false;
    }
};




$(document).ready(function () {


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });
    

    $("#btnSearch").click(function () {
        $("#divMenu_1").html("");
        $("#divMenu_2").html("");
        $("#divMenu_3").html("");

        MenuManageIndex.SearchMenu(0, 1, "divMenu_1");

        return false;
    });
    
    $("#btnSearch").click();
});


