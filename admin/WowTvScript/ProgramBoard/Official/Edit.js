
$(document).ready(function () {
    $("#btnDelete").click(function () {
        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            OfficialEdit.Delete($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    $("#btnList").click(function () {
        OfficialEdit.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {

        SmartEditor.SaveDataItem("hidContent");

        if (confirm(CommonMsg.ModifyConfirmMsg)) {


            if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
                $("#TITLE").focus();
                return false;
            }

            //if (!CommonValidation.validation("#CONTENT", "내용을 확인해주세요.")) {
            //    $("#CONTENT").focus();
            //    return false;
            //}


            OfficialEdit.Save($("#BOARD_CONTENT_SEQ").val());
        }

        return false;
    });

    SmartEditor.CreateItem("hidContent");

});



var OfficialEdit = {
    Save: function () {
        var form = $('#frmSave')[0];
        var formData = new FormData(form);
        $.ajax({
            url: "/ProgramBoard/Official/FileSave?currentMenuSeq=" + $("#CurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if (data.IsSuccess == true) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    OfficialEdit.GoIndex();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ProgramBoard/Official/Index?menuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/ProgramBoard/Official/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: { "seq": seq },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    OfficialEdit.GoIndex();
                }
                else {
                    alert(data.Msg);
                    if (data.Redirect.length !== 0) {
                        window.location = data.Redirect;
                    }
                }
            }
        });

        return false;
    }
}