
var CaseManageEdit = {
    GoList: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/MyBroadProgram/CastManage/Index?" + "menuSeq=" + $("#hidCurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    Save: function () {
        SmartEditor.SaveDataItem("hidRemark");

        var form = $('#frmSave')[0];
        var formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/CastManage/Save?ProgramCode=" + $("#hidProgramCode").val(),
            data: formData, //$("#frmSave").serialize(),
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    CaseManageEdit.GoList();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/MyBroadProgram/CastManage/Delete?ProgramCode=" + $("#hidProgramCode").val(),
                data: { "programCastSeq": $("#hidProgramCastSeq").val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        CaseManageEdit.GoList();
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    OpenExpert: function () {
        $.ajax({
            type: 'POST',
            url: "/BroadCast/Expert/Search",
            data: { },
            success: function (data, textStatus) {
                $("#divExpert").html(data);
                $("#divExpert").modal("show");
            }
        });

        return false;
    },
    ModeChange: function () {
        if ($("[name='CAST_TYPE']:checked").val() == "Make") {
            $(".devTrCast").hide();
            $(".devTrMake").show();
        }
        else {
            $(".devTrCast").show();
            $(".devTrMake").hide();
        }
    }

}



$(document).ready(function () {

    $("#btnList").click(function () {
        CaseManageEdit.GoList();

        return false;
    });


    $("#btnSave").click(function () {
        CaseManageEdit.Save();

        return false;
    });

    $("#btnDelete").click(function () {
        CaseManageEdit.Delete();

        return false;
    });



    $("#btnExpertSearch").click(function () {
        CaseManageEdit.OpenExpert();

        return false;
    });
    

    $("[name='CAST_TYPE']").change(function () {
        CaseManageEdit.ModeChange();

        return false;
    });

    $("[name='CAST_TYPE']").change();

    SmartEditor.CreateItem("hidRemark");

});



function ExpertSelectApply(expertItem) {
    $("#hidPayNo").val(expertItem.PayNo);
    $("#txtExpertName").val(expertItem.ExpertName);
    $("#txtCafeInfo").val(expertItem.Cafe);
    $("#txtBroadInfo").val(expertItem.Broad);
    //$("#hidRemark").val(expertItem.Profile);
    $("#imgCast").attr("src", "http://image.wownet.co.kr/" + expertItem.Image);

    SmartEditor.AddDataItem("hidRemark", expertItem.Profile);

    $("#divExpert").html("");
    $("#divExpert").modal("hide");
}
