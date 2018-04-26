
$(document).ready(function () {

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "FeedBackEdit.BindReplyList"));
});

var ReplyList = {
    UpdateReplyBlind: function (seq, blindValue) {
        $.ajax({
            type: "POST",
            url: "/ProgramBoard/FeedBack/UpdateReplyBlind?menuSeq=" + $('#hidCurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: { "COMMENT_SEQ": seq, "blind_yn": blindValue },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    FeedBackEdit.BindReplyList();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}
