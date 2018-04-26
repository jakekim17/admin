
$(document).ready(function () {
    $("#btnDelete").click(function () {
        var confirmMsg = "고객 문의 글을 삭제 하시겠습니까? \n삭제 된 데이터는 복구가 불가합니다.";
        if (confirm(confirmMsg)) {
            InquiryEdit.Delete($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    $("#btnReplyDelete").click(function () {
        if (confirm(CommonMsg.ReplyDeleteConfirmMsg)) {
            FeedBackEdit.Delete($("#REPLY_BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    $("#btnList").click(function () {
        FeedBackEdit.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {

        if (isReply !== "False") {
            SmartEditor.SaveDataItem("hidContent");

            if (!window.co.validation("#hidContent", "답변 내용을 입력하세요.")) {
                $("#hidContent").focus();
                return false;
            }

            if (!window.co.validation("#TITLE", "답변 제목을 입력하세요.")) {
                $("#TITLE").focus();
                return false;
            }
        }
        var confirmMsg = CommonMsg.ModifyConfirmMsg;

        if (typeof $("#replyListCount").val() == "undefined" && $("#replyListCount").val === 0) {
            confirmMsg = CommonMsg.SaveConfirmMsg;
        };
        var isConfirm;
        if (isReply !== "False") {
            isConfirm = "답변등록 메시지가 고객의 알림톡으로 발송 됩니다. \n알림톡을 발송하시겠습니까?";
        } else {
            isConfirm = "수정 하시겠습니까?";
        }
       
        if (confirm(isConfirm)) {
            FeedBackEdit.Save($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });


    $("#btnReplyCancle").click(function () {
        $("#TITLE").val("");
        $("#CONTENT").val("");
    });
    //Dropdownlist Selectedchange event  
    $("#cboIngYn").change(function () {
        $("#cboPRG_CD").empty();
        FeedBackEdit.CodeBind();

        return false;
    });

    if (isReply !== "False") {
        SmartEditor.CreateItem("hidContent");
    }
    FeedBackEdit.CodeBind();

});



var FeedBackEdit = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/IntegratedBoard/FeedBack/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    var isSuccessMsg = "수정 되었습니다.";
                    confirm(isSuccessMsg);
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
    CodeBind: function () {
        $.ajax({
            type: "POST",
            url: "/IntegratedBoard/FeedBack/GetProgramCode?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { ingYn: $("#cboIngYn").val() },
            success: function (codes) {
                if (codes.programList.length > 1) {
                    $("#cboPRG_CD").show();
                    $.each(codes.programList,
                        function (i, code) {
                            if (i !== 0) {
                                if (code.PRG_CD === commonCode) {
                                    $("#cboPRG_CD").append('<option selected="selected" value="' +
                                        code.PRG_CD +
                                        '">' +
                                        code.PRG_NM +
                                        "</option>");
                                } else {
                                    $("#cboPRG_CD").append('<option value="' +
                                        code.PRG_CD +
                                        '">' +
                                        code.PRG_NM +
                                        "</option>");
                                }
                            }
                        });
                } else {
                    $("#cboPRG_CD").hide();
                    //$("#cboCOMMON_CODE").prop("disabled", "disabled");
                }
            },
            error: function (ex) {
            }
        });
    },
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/FeedBack/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/IntegratedBoard/FeedBack/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "seq": seq },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
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
    }
}