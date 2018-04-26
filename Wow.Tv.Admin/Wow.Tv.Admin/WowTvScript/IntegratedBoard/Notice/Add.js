
$(document).ready(function () {

    $("#btnList").click(function () {
        NoticeAdd.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {


        if ($(":input:radio[name='VIEW_YN']:checked").val().length == 0) {
            $("#VIEW_YN").focus();
            alert("게시 여부를 선택해주십시오.");
            return false;
        }


        if ($(":input:radio[name='NOTICE_YN']:checked").val().length == 0) {
            $("#VIEW_YN").focus();
            alert("상단 고지 여부를 선택해주십시오.");
            return false;
        }

        if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
            $("#TITLE").focus();
            return false;
        }

        if (confirm(CommonMsg.SaveConfirmMsg)) {
            SmartEditor.SaveDataItem("hidContent");
            NoticeAdd.Save();
        }

        return false;
    });


    SmartEditor.CreateItem("hidContent");

});



var NoticeAdd = {
    Save: function () {
        var form = $('#frmSave')[0];
        var formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: "/IntegratedBoard/Notice/FileSave?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    NoticeAdd.GoIndex();
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
    }
}