
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

    $("[id='file']").change(function () {
        var seq = $(this).attr("seq");
        if (typeof seq !== "undefined") {
            $("#" + seq).val(seq);
        }
    });

    SmartEditor.CreateItem("hidContent");

    

});



var NoticeEdit = {
    Save: function () {
        var form = $('#frmSave')[0];
        var formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: "/IntegratedBoard/Notice/FileUpdate?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: formData,
            processData: false,
            contentType: false,
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
        $("#frmSearch").attr("action", "/IntegratedBoard/Notice/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/IntegratedBoard/Notice/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
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