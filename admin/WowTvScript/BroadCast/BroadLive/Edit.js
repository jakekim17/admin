
var BroadLiveEdit = {
    GoList: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/BroadLive/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/BroadCast/BroadLive/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "broadLiveID": $("#hidBroadLiveID").val() },
                success: function (data, textStatus) {
                    BroadLiveEdit.GoList();
                }
            });
        }

        return false;
    },
    Save: function () {
        if ($("#txtProgramName").val() == "") {
            alert("프로그램명을 입력하여 주십시오.");
            $("#txtProgramName").focus();
            return false;
        }
        if ($("#txtBroadDate").val() == "") {
            alert("방영시간을 입력하여 주십시오.");
            $("#txtBroadDate").focus();
            return false;
        }
        if ($("#cboStartHour").val() == "0") {
            alert("시작시간을 입력하여 주십시오.");
            $("#cboStartHour").focus();
            return false;
        }
        if ($("#cboStartMinut").val() == "0") {
            alert("시작시간을 입력하여 주십시오.");
            $("#cboStartMinut").focus();
            return false;
        }
        if ($("#cboEndHour").val() == "0") {
            alert("종료시간을 입력하여 주십시오.");
            $("#cboEndHour").focus();
            return false;
        }
        if ($("#cboEndMinut").val() == "0") {
            alert("종료시간을 입력하여 주십시오.");
            $("#cboEndMinut").focus();
            return false;
        }

        var urlExp = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/

        var urlCount = 0;
        var isContinue = true;
        $.each($(".devUrl"), function (index, item) {
            if ($(item).val() != "") {
                urlCount++;

                if (urlExp.test($(item).val()) == false) {
                    alert("URL 형식이 잘못되었습니다.\r\nhttp://www.site.xx.xx");
                    $(item).focus();
                    isContinue = false;
                    return false;
                }
            }
        });
        if (urlCount == 0) {
            alert("최소 하나이상의 방송을 입력하셔야 합니다.");
            return false;
        }


        $.each($(".devUrl2"), function (index, item) {
            if ($(item).val() != "") {
                if (urlExp.test($(item).val()) == false) {
                    alert("URL 형식이 잘못되었습니다.\r\nhttp://www.site.xx.xx");
                    $(item).focus();
                    isContinue = false;
                    return false;
                }
            }
        });

        if (isContinue == true) {
            //SmartEditor.SaveDataItem("hidRemark");

            $.ajax({
                type: 'POST',
                url: "/BroadCast/BroadLive/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: $("#frmSave").serialize(),
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        BroadLiveEdit.GoList();
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    }
};


$(document).ready(function () {


    $(".devNumber").keyup(function (event) {
        if (isNaN($(this).val()) == true) {
            alert("숫자만 가능합니다.");
            $(this).val("");
            return false;
        }
    });


    $("#btnList").click(function () {
        BroadLiveEdit.GoList();

        return false;
    });


    $("#btnDelete").click(function () {
        BroadLiveEdit.Delete();

        return false;
    });


    $("#btnSave").click(function () {
        BroadLiveEdit.Save();

        return false;
    });


    //SmartEditor.CreateItem("hidRemark");

});
