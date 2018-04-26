


$(document).ready(function () {

    $("#btnSave").click(function () {
        if ($("#frmSave").find("[name='TITLE']").val() == "") {
            alert("타이틀을 입력하여 주십시오.");
            $("#frmSave").find("[name='TITLE']").focus();
            return false;
        }

        if ($("#frmSave").find("[name='TYPE_CODE']:checked").val() == "Text") {
            if ($("#frmSave").find("[name='TEXT_INFO1']").val() == "") {
                alert("텍스트를 입력하여 주십시오.");
                $("#frmSave").find("[name='TEXT_INFO1']").focus();
                return false;
            }
            if ($("#frmSave").find("[name='TEXT_INFO2']").val() == "") {
                alert("텍스트를 입력하여 주십시오.");
                $("#frmSave").find("[name='TEXT_INFO2']").focus();
                return false;
            }
        }
        else {
            if ($("#frmSave").find(".fileinput-filename").text() == "") {
                alert("파일을 선택하여 주십시오.");
                return false;
            }
        }

        if ($("#frmSave").find("[name='LINK_URL']").val() == "") {
            alert("링크주소를 입력하여 주십시오.");
            $("#frmSave").find("[name='LINK_URL']").focus();
            return false;
        }


        var urlExp = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/
        
        if (urlExp.test($("#frmSave").find("[name='LINK_URL']").val()) == false) {
            alert("URL 형식이 잘못되었습니다.\r\nhttp://www.site.xx.xx");
            $("#frmSave").find("[name='LINK_URL']").focus();
            return false;
        }


        //if ($("#frmSave").find("[name='PUBLISH_START']").val() == "") {
        //    alert("노출기간을 입력하여 주십시오.");
        //    $("#frmSave").find("[name='PUBLISH_START']").focus();
        //    return false;
        //}
        //if ($("#frmSave").find("[name='PUBLISH_END']").val() == "") {
        //    alert("노출기간을 입력하여 주십시오.");
        //    $("#frmSave").find("[name='PUBLISH_END']").focus();
        //    return false;
        //}

        if ($("#frmSave").find("[name='PUBLISH_START']").val() != "" && $("#frmSave").find("[name='PUBLISH_END']").val() != "") {
            var startDate = $("#frmSave").find("[name='PUBLISH_START']").val() + $("#frmSave").find("[name='PublishStartHour']").val() + $("#frmSave").find("[name='PublishStartMinute']").val();
            var endDate = $("#frmSave").find("[name='PUBLISH_END']").val() + $("#frmSave").find("[name='PublishEndHour']").val() + $("#frmSave").find("[name='PublishEndMinute']").val();

            if (startDate >= endDate) {
                alert("노출기간의 범위를 확인하여 주십시오.");
                return false;
            }

        }
        
        var form = $('#frmSave')[0];
        var formData = new FormData(form);

        $.ajax({
            type: 'POST',
            url: "/OperateManage/MainManage/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: formData, //$("#frmSave").serialize(),,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    MainManageIndex.BindEdit(0);
                    MainManageIndex.BindSearchList();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    });


    $("#btnDelete").click(function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/OperateManage/MainManage/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "mainManageSeq": $("#hidMainManageSeq").val() },
                success: function (data) {
                    if (data.IsSuccess == true) {
                        //alert("성공");
                        MainManageIndex.BindSearchList();
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    });



    $("#frmSave").find("[name='TYPE_CODE']").change(function () {
        if ($("#frmSave").find("[name='TYPE_CODE']:checked").val() == "Text") {
            $("#frmSave").find("[name='TEXT_INFO1']").show();
            $("#frmSave").find("[name='TEXT_INFO2']").show();

            $("#frmSave").find(".form-group").hide();
        }
        else {
            $("#frmSave").find("[name='TEXT_INFO1']").hide();
            $("#frmSave").find("[name='TEXT_INFO2']").hide();

            $("#frmSave").find(".form-group").show();
        }

        return false;
    });


    $('.input-group.date').datepicker({
        calendarWeeks: false,
        todayHighlight: true,
        autoclose: true,
        format: "yyyy-mm-dd",
        language: "kr"
    });


    if ($("#cboMainTypeCode").val() == "MainTop") {
    }
    else {
        $("#frmSave").find("#divTypeCode").hide();
        $("#rdoTypeCodeImage").prop("checked", true);

        $("#pInfoText").html("최대 3개까지만 등록가능합니다.");
    }

    $("#frmSave").find("[name='TYPE_CODE']").change();

});



