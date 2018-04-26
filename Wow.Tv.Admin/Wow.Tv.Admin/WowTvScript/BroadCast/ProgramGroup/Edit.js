
var ProgramGroupEdit = {
    GoList: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/ProgramGroup/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/BroadCast/ProgramGroup/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "programGroupSeq": $("#hidProgramGroupSeq").val() },
                success: function (data, textStatus) {
                    ProgramGroupEdit.GoList();
                }
            });
        }

        return false;
    },
    Save: function () {

        if ($("#txtMasterProgramCode").val() == "") {
            alert("그룹의 대표 프로그램 코드를 입력하여 주십시오.");
            $("#txtMasterProgramCode").focus();
            return false;
        }

        if ($("#txtGroupName").val() == "") {
            alert("그룹명을 입력하여 주십시오.");
            $("#txtGroupName").focus();
            return false;
        }

        if ($("#hidProgramGroupSeq").val() == "0") {
            if ($("[name='TYPE_CODE']:checked").val() == "Fix") {
                if ($(".fileinput-filename").text() == "") {
                    alert("파일을 선택하여 주십시오.");
                    return false;
                }
            }
        }

        //SmartEditor.SaveDataItem("hidRemark");

        //var form = $('#frmSave')[0];
        //var formData = new FormData(form);

        $.ajax({
            type: 'POST',
            url: "/BroadCast/ProgramGroup/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(), //formData,
            //processData: false,
            //contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    ProgramGroupEdit.GoList();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    ModeChange: function () {
        //if ($("[name='TYPE_CODE']:checked").val() == "Fix") {
        //    $("#trImage").show();
        //    $("#trRemark").hide();
        //}
        //else {
        //    $("#trImage").hide();
        //    $("#trRemark").show();
        //}

        return false;
    },



    BindProgramTemplateList: function () {
        $.ajax({
            type: 'POST',
            url: "/BroadCast/ProgramGroup/ProgramTemplateList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "programGroupSeq": $("#hidProgramGroupSeq").val() },
            success: function (data, textStatus) {
                $("#divProgramTemplateList").html(data);
            }
        });

        return false;
    }

};


$(document).ready(function () {

    $("#btnList").click(function () {
        ProgramGroupEdit.GoList();

        return false;
    });


    $("#btnSave").click(function () {
        ProgramGroupEdit.Save();

        return false;
    });

    $("#btnDelete").click(function () {
        ProgramGroupEdit.Delete();

        return false;
    });


    $("[name='TYPE_CODE']").change(function () {
        ProgramGroupEdit.ModeChange();

        return false;
    });

    ProgramGroupEdit.BindProgramTemplateList();

    //SmartEditor.CreateItem("hidRemark");

    ProgramGroupEdit.ModeChange();
});

