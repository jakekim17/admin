
$(document).ready(function () {
    $("#btnDelete").click(function () {
        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            NoticeEdit.Delete($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    $("#btnList").click(function () {
        NoticeEdit.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {

        SmartEditor.SaveDataItem("hidContent");

        if (confirm(CommonMsg.ModifyConfirmMsg)) {
            

            if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
                $("#TITLE").focus();
                return false;
            }

            //if (!window.co.validation("#CONTENT", "내용을 확인해주세요.")) {
            //    $("#CONTENT").focus();
            //    return false;
            //}
            

            NoticeEdit.Save($("#BOARD_CONTENT_SEQ").val());
        }

        return false;
    });

    SmartEditor.CreateItem("hidContent");

});



var NoticeEdit = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/ProgramBoard/Notice/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    NoticeEdit.GoIndex();
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
    },
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ProgramBoard/Notice/Index?menuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/ProgramBoard/Notice/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: { "seq": seq },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    NoticeEdit.GoIndex();
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