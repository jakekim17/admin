
$(document).ready(function () {
    $("#btnList").click(function () {
        FeedBackEdit.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {

        var confirmMsg = CommonMsg.ModifyConfirmMsg;

        if (confirm(confirmMsg)) {
            FeedBackEdit.Save($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    FeedBackEdit.BindReplyList();

    //
});



var FeedBackEdit = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/ProgramBoard/FeedBack/UpdateBlind?menuSeq=" + $('#hidCurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    FeedBackEdit.GoIndex();
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
        $("#frmSearch").attr("action", "/ProgramBoard/FeedBack/Index?menuSeq=" + $("#hidCurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    BindReplyList: function () {

        $.ajax({
            type: "POST",
            url: "/ProgramBoard/FeedBack/ReplyList?menuSeq=" + $("#hidCurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSearch").serialize(),//{ BOARD_CONTENT_SEQ: $("#BOARD_CONTENT_SEQ").val() },
            success: function (data) {
                $("#divReplyList").html(data);
            }
        });

        return false;
    }
}