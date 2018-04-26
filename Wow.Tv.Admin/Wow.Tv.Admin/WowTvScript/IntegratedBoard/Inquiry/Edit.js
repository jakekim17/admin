
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
            InquiryEdit.Delete($("#REPLY_BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    $("#btnList").click(function () {
        InquiryEdit.GoIndex();

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
        //var confirmMsg = CommonMsg.ModifyConfirmMsg;

        //if (typeof $("#replyListCount").val() == "undefined" && $("#replyListCount").val === 0) {
        //    confirmMsg = CommonMsg.SaveConfirmMsg;
        //};

        var isConfirm = "답변 등록을 하시겠습니까?";
        if (confirm(isConfirm)) {
            InquiryEdit.Save($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });


    $("#btnReplyCancle").click(function () {
        $("#TITLE").val("");
        $("#CONTENT").val("");
    });
    //Dropdownlist Selectedchange event  
    //$("#cboUP_COMMON_CODE").change(function () {
    //    $("#cboCOMMON_CODE").empty();
    //    InquiryEdit.CodeBind();

    //    return false;
    //});

    $("#cboCommonCode1").change(function () {
        InquiryEdit.CodeBind($(this).val(), 2, function () {
            if ($("#cboCommonCode1").val() == "ALL") {
                $("#cboUpCommonCode").val("");
            }
            else {
                $("#cboUpCommonCode").val($("#cboCommonCode1").val());
            }
        });

        return false;
    });
    $("#cboCommonCode2").change(function () {
        InquiryEdit.CodeBind($(this).val(), 3, function () {
            if ($("#cboCommonCode2").val() == "ALL") {
                $("#cboCommonCode").val("");
            }
            else {
                $("#cboCommonCode").val($("#cboCommonCode2").val());
            }
        });

        return false;
    });

    if (isReply !== "False") {
        SmartEditor.CreateItem("hidContent");
    }
    InquiryEdit.CodeBind($("#cboCommonCode1").val(), 2);




});



var InquiryEdit = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/IntegratedBoard/Inquiry/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    var isSuccessMsg = "답변을 등록하였습니다.";
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
    CodeBind: function (upCommonCode, depth, callBack) {
        $("#cboCommonCode" + depth).hide();
        $("#cboCommonCode" + depth).find("option").remove();
        if (upCommonCode != "ALL") {
            $.ajax({
                type: "POST",
                url: "/IntegratedBoard/Inquiry/GetCommonCode?currentMenuSeq=" + $('#hidCurrentMenuSeq').val(),
                data: { upCommonCode: upCommonCode },
                success: function (data) {
                    //$("#cboCommonCode" + depth).append('<option value="ALL">전체</option>');
                    $("#cboCommonCode" + depth).show();
                    $.each(data.codeList, function (i, code) {
                        if (code.COMMON_CODE === $("#hidCommonCode" + depth).val()) {
                            $("#cboCommonCode" + depth).append('<option selected="selected" value="' + code.COMMON_CODE + '">' + code.CODE_NAME + "</option>");
                        } else {
                            $("#cboCommonCode" + depth).append('<option value="' + code.COMMON_CODE + '">' + code.CODE_NAME + "</option>");
                        }
                    });

                    if (callBack != null) {
                        callBack();
                    }
                },
                error: function (ex) {
                }
            });
        }
    },
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/Inquiry/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/IntegratedBoard/Inquiry/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
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