
$(document).ready(function () {

    $("#btnList").click(function () {
        FAQAdd.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {


        if ($(":input:radio[name='VIEW_YN']:checked").val().length == 0) {
            $("#VIEW_YN").focus();
            alert("게시 여부를 선택해주십시오.");
            return false;
        }

        if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
            $("#TITLE").focus();
            return false;
        }

        if (!window.co.validation("#CONTENT", "내용을 확인해주세요.")) {
            $("#CONTENT").focus();
            return false;
        }

        if (confirm(CommonMsg.SaveConfirmMsg)) {
            FAQAdd.Save();
        }

        return false;
    });


});



var FAQAdd = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/ServiceCenter/FAQ/Save",
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    FAQAdd.GoIndex();
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
        $("#frmSearch").attr("action", "/ServiceCenter/FAQ/Index");
        $("#frmSearch").submit();

        return false;
    }
}