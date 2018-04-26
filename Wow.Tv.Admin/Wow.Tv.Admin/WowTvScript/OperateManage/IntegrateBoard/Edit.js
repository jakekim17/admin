
var IntegrateBoardEdit = {
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/OperateManage/IntegrateBoard/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "boardSeq": $("#hidBoardSeq").val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        $("#divEdit").modal("hide");
                        $("#divEdit").html("");
                        IntegrateBoardIndex.SearchList(0);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    Save: function () {
        SmartEditor.SaveDataItem("hidTopContent");
        SmartEditor.SaveDataItem("hidBottomContent");

        if ($("#txtBoardName").val() == "") {
            alert("게시판명을 입력하여 주십시오.");
            $("#txtBoardName").focus();
            return false;
        }


        if ($("#hidTopContent").val() == "") {
            alert("게시판 상단을 입력하여 주십시오.");
            $("#hidTopContent").focus();
            return false;
        }

        if ($("#hidBottomContent").val() == "") {
            alert("게시판 하단을 입력하여 주십시오.");
            $("#hidBottomContent").focus();
            return false;
        }



        $.ajax({
            type: 'POST',
            url: "/OperateManage/IntegrateBoard/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    IntegrateBoardIndex.SearchList($("#currentIndex").val());
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


    $("#divEdit_btnDelete").click(function () {
        IntegrateBoardEdit.Delete();

        return false;
    });

    $("#divEdit_btnSave").click(function () {
        IntegrateBoardEdit.Save();

        return false;
    });



    $(".devNumber").keyup(function (event) {
        if (isNaN($(this).val()) == true) {
            alert("숫자만 가능합니다.");
            $(this).val("");
            return false;
        }

        if ($(this).val() != "") {
            if (parseInt($(this).val()) > 5) {
                alert("최대 5까지만 입력가능합니다.");
                $(this).val("0");
                return false;
            }
        }
    });


    SmartEditor.CreateItem("hidTopContent");
    SmartEditor.CreateItem("hidBottomContent");

});

