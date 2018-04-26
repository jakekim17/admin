
var ProgramBannerEdit = {
    Save: function () {
        if ($("#txtBannerName").val() == "") {
            alert("배너명을 입력하여 주십시오.");
            $("#txtBannerName").focus();
            return false;
        }
        if ($("#txtStartDate").val() == "") {
            alert("시작일을 입력하여 주십시오.");
            $("#txtStartDate").focus();
            return false;
        }
        if ($("#txtEndDate").val() == "") {
            alert("종료일을 입력하여 주십시오.");
            $("#txtEndDate").focus();
            return false;
        }
        if ($("#txtStartDate").val() != "" && $("#txtEndDate").val() != "") {
            if ($("#txtStartDate").val() > $("#txtEndDate").val() != "") {
                alert("시작일이 종료일 보다 클수 없습니다.");
                return false;
            }
        }
        if ($("#hidProgramBannerSeq").val() == "" || $("#hidProgramBannerSeq").val() == "0") {
            if ($(".fileinput-filename").text() == "") {
                alert("파일을 선택하여 주십시오.");
                return false;
            }
        }
        if ($("#txtUrl").val() == "") {
            alert("URL을 입력하여 주십시오.");
            $("#txtUrl").focus();
            return false;
        }

        var urlExp = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/


        if (urlExp.test($("#txtUrl").val()) == false) {
            alert("URL 형식이 잘못되었습니다.\r\nhttp://www.site.xx.xx");
            $("#txtUrl").focus();
            return false;
        }

        //SmartEditor.SaveDataItem("hidRemark");

        var form = $('#frmSave')[0];
        var formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/ProgramBanner/Save?ProgramCode=" + $("#hidProgramCode").val(),
            data: formData, //$("#frmSave").serialize(),
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    //ProgramTemplateIndex.BindEdit();
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
        ProgramBannerEdit.Save();

        return false;
    });

    $('.input-group.date').datepicker({
        calendarWeeks: false,
        todayHighlight: true,
        autoclose: true,
        format: "yyyy-mm-dd",
        language: "kr"
    });

    //SmartEditor.CreateItem("hidRemark");


});

