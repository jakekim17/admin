
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
        $.ajax({
            type: 'POST',
            url: "/ProgramBoard/Notice/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSave").serialize(),
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
        $("#frmSearch").attr("action", "/ProgramBoard/Notice/Index?menuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    }
}