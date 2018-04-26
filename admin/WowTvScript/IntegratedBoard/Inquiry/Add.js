
$(document).ready(function () {

    $("#btnList").click(function () {
        InquiryAdd.GoIndex();

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

        if (!window.co.validation("#CONTENT", "답변 내용을 입력하세요.")) {
            $("#CONTENT").focus();
            return false;
        }

        var confirmMsg = "작성하신 내용은 고객의메일로 발송됩니다.\n 답변을 발송하시겠습니까?";

        if (confirm(confirmMsg)) {
            SmartEditor.SaveDataItem("hidContent");
            InquiryAdd.Save();
        }

        return false;
    });

    SmartEditor.CreateItem("hidContent");

});



var InquiryAdd = {
    Save: function () {
        $.ajax({
            type: 'POST',
            url: "/IntegratedBoard/Inquiry/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    InquiryAdd.GoIndex();
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
        $("#frmSearch").attr("action", "/IntegratedBoard/Inquiry/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    FileUpload: function () {

        if ($(".fileinput-filename").text() == "") {
            alert("파일을 선택하여 주십시오.");
            return false;
        }

        var form = $('#frmFile')[0];
        var formData = new FormData(form);
        $.ajax({
            url: "/IntegratedBoard/Inquiry/FileSave?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if (data.IsSuccess === true) {
                    $("#spFileName").text(data.UserFileName);
                    $("#spFileDate").text(data.NowDate);
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}