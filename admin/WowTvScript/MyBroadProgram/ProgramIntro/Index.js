
var ProgramIntroIndex = {
    Save: function () {

        if ($("#txtTitle").val() == "") {
            alert("제목을 입력하여 주십시오.");
            $("#txtTitle").focus();
            return false;
        }

        if ($("#hidProgramIntroSeq").val() == "" || $("#hidProgramIntroSeq").val() == "0") {
            if ($(".fileinput-filename").text() == "") {
                alert("파일을 선택하여 주십시오.");
                return false;
            }
        }

        SmartEditor.SaveDataItem("hidRemark");


        var form = $('#frmSave')[0];
        var formData = new FormData(form);

        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/ProgramIntro/Save?ProgramCode=" + $("#hidProgramCode").val(),
            data: formData, //$("#frmSave").serialize(),,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    document.location.reload();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
};


$(document).ready(function () {


    $("#btnSave").click(function () {
        ProgramIntroIndex.Save();

        return false;
    });


    $("#btnCancel").click(function () {
        document.location.reload();

        return false;
    });


    SmartEditor.CreateItem("hidRemark");


});
