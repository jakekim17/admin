
$(document).ready(function () {

    $("#btnList").click(function () {
        OfficialAdd.GoIndex();

        return false;
    });

    $("#btnSave").click(function () {


        if ($(":input:radio[name='VIEW_YN']:checked").val().length == 0) {
            $("#VIEW_YN").focus();
            alert("게시 여부를 선택해주십시오.");
            return false;
        }


        //if ($(":input:radio[name='TOP_YN']:checked").val().length == 0) {
        //    $("#VIEW_YN").focus();
        //    alert("상단 고지 여부를 선택해주십시오.");
        //    return false;
        //}


        if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
            $("#TITLE").focus();
            return false;
        }

        //if ($(".fileinput-filename").text() == "") {
        //    alert("파일을 선택하여 주십시오.");
        //    return false;
        //}


        if (confirm(CommonMsg.SaveConfirmMsg)) {
            SmartEditor.SaveDataItem("hidContent");
            OfficialAdd.Save();
        }

        return false;
    });

    SmartEditor.CreateItem("hidContent");

});



var OfficialAdd = {
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ProgramBoard/Official/Index?menuSeq=" + $('#CurrentMenuSeq').val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    Save: function () {
        var form = $('#frmSave')[0];
        var formData = new FormData(form);
        $.ajax({
            url: "/ProgramBoard/Official/FileSave?currentMenuSeq=" + $("#CurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val(),
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if (data.IsSuccess === true) {
                    confirm(CommonMsg.SaveAfterMsg);
                    OfficialAdd.GoIndex();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}