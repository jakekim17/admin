
$(document).ready(function () {
    $("#btnDelete").click(function () {
        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            NoticeEdit.Delete();
        }
        return false;
    });

    $("#btnList").click(function () {
        NoticeEdit.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {


        if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
            $("#TITLE").focus();
            return false;
        }

        if (!window.co.validation("#CONTENT", "내용을 확인해주세요.")) {
            $("#CONTENT").focus();
            return false;
        }
        if (confirm(CommonMsg.ModifyConfirmMsg)) {

            NoticeEdit.Save($("#seq").val());
        }

        return false;
    });


});



var NoticeEdit = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/ServiceCenter/Notice/Save",
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
        $("#frmSearch").attr("action", "/ServiceCenter/Notice/Index");
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/ServiceCenter/Notice/Delete",
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