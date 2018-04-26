
$(document).ready(function () {
    $("#btnDelete").click(function () {
        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            FAQEdit.Delete($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    $("#btnList").click(function () {
        FAQEdit.GoIndex();

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


            FAQEdit.Save($("#BOARD_CONTENT_SEQ").val());
        }

        return false;
    });

    SmartEditor.CreateItem("hidContent");

});



var FAQEdit = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/IntegratedBoard/FAQ/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    FAQEdit.GoIndex();
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
        $("#frmSearch").attr("action", "/IntegratedBoard/FAQ/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/IntegratedBoard/FAQ/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: { "seq": seq },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    FAQEdit.GoIndex();
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