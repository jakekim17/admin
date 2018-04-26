
var MenuManageEdit = {
    Save: function () {
        if ($("#txtMenuName").val() == "") {
            alert("메뉴명을 입력하여 주십시오.");
            $("#txtMenuName").focus();
            return false;
        }
        if ($("input[name='CONTENT_TYPE_CODE']:checked").val() == "Html"
            || $("input[name='CONTENT_TYPE_CODE']:checked").val() == "Board") {

            if ($("#txtContentSeq").val() == "") {
                alert("코드를 선택하여 주십시오.");
                return false;
            }
        }
        else {
            if ($("#txtLinkUrl").val() == "") {
                alert("링크주소를 입력하여 주십시오.");
                $("#txtLinkUrl").focus();
                return false;
            }
        }

        $.ajax({
            type: 'POST',
            url: "/OperateManage/MenuManage/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    MenuManageIndex.SearchMenu($("#hidUpMenuSeq").val(), $("#hidDepth").val(), "divMenu_" + $("#hidDepth").val());
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    ShowHideCheck: function () {
        $("#divCode").hide();
        $("#divLink").hide();

        if ($("input[name='CONTENT_TYPE_CODE']:checked").val() == "Html"
            || $("input[name='CONTENT_TYPE_CODE']:checked").val() == "Board") {

            $("#divCode").show();
        }
        else {
            $("#divLink").show();
        }

        return false;
    },
    Preview: function () {
        alert("TODO");

        return false;
    },


    SelectBoard: function (boardSeq, boardName) {
        $("#txtContentSeq").val(boardSeq);
        $("#txtContentName").val(boardName);

        $("#rdoContentTypeCode_Board").prop("checked", true);

        return false;
    },
    SelectBusiness: function (boardSeq, boardName) {
        $("#txtContentSeq").val(boardSeq);
        $("#txtContentName").val(boardName);

        $("#rdoContentTypeCode_Html").prop("checked", true);

        return false;
    }
};


$(document).ready(function () {

    $("#btnSave").click(function () {
        MenuManageEdit.Save();

        return false;
    });

    $("#btnDelete").click(function () {
        MenuManageIndex.Delete($("#hidMenuSeq").val(), $("#hidDepth").val()
            , function () {
                $("#divEdit").modal("hide");
                $("#divEdit").html("");
            }
        );

        return false;
    });

    $("#btnPreview").click(function () {
        MenuManageEdit.Preview();

        return false;
    });
    
    

    $("input[name='CONTENT_TYPE_CODE']").change(function () {
        MenuManageEdit.ShowHideCheck();

        return false;
    });


    $("#btnCodeSearch").click(function () {
        MenuManageIndex.OpenSearchContent($("#rdoContentTypeCode_Html").prop("checked"));

        return false;
    });

    $("input[name='CONTENT_TYPE_CODE']").change();
});

