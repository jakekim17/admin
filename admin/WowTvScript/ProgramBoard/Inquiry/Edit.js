
$(document).ready(function () {
    $("#btnDelete").click(function () {
        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            InquiryEdit.Delete($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    $("#btnList").click(function () {
        InquiryEdit.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {

        SmartEditor.SaveDataItem("hidContent");
        var confirmMsg = CommonMsg.ModifyConfirmMsg;

        if (typeof $("#replyListCount").val() == "undefined" && $("#replyListCount").val === 0) {
            confirmMsg = CommonMsg.SaveConfirmMsg;
        };

        if (confirm(confirmMsg)) {

            if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
                $("#TITLE").focus();
                return false;
            }

            //if (!window.co.validation("#CONTENT", "내용을 확인해주세요.")) {
            //    $("#CONTENT").focus();
            //    return false;
            //}


            InquiryEdit.Save($("#BOARD_CONTENT_SEQ").val());
        }

        return false;
    });

    
    $("#btnReplyCancle").click(function() {
        $("#TITLE").val("");
        $("#CONTENT").val("");
    });

    SmartEditor.CreateItem("hidContent");


    
});



var InquiryEdit = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/ProgramBoard/Inquiry/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    var isSuccessMsg = "답변 메일을 발송하였습니다.";
                    confirm(isSuccessMsg);
                    InquiryEdit.GoIndex();
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
        $("#frmSearch").attr("action", "/ProgramBoard/Inquiry/Index?menuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/ProgramBoard/Inquiry/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: { "seq": seq },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    InquiryEdit.GoIndex();
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