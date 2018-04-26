
var HomeManageIndex = {
    Save: function () {

        var form = $('#frmSave')[0];
        var formData = new FormData(form);

        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/HomeManage/Save?ProgramCode=" + $("#hidProgramCode").val(),
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
    },



    SearchPartnerList: function () {
        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/HomeManage/PartnerSearchList?ProgramCode=" + $("#hidProgramCode").val(),
            data: { "programCode": $("#programCode").val() },
            success: function (data, textStatus) {
                $("#ulPartnerList").html(data);
            }
        });

        return false;
    },
    OpenPartnerSearch: function () {
        $.ajax({
            type: "POST",
            url: "/BroadCast/Expert/Search",
            data: {},
            success: function (data) {
                $("#divPartnerSearch").html(data);
                $("#divPartnerSearch").modal("show");
            }
        });

        return false;
    },
    AddPartner: function (payNo, partnerName) {
        if ($("#ulPartnerList").find("[name='payNo'][value='" + payNo + "']").length > 0) {
            alert("이미 동일한 대상이 존재 합니다.");
            return false;
        }

        var tag = "";
        tag += "<li>";
        tag += "    " + partnerName + "<button class=\"btn btn-default btn- xs\" onclick=\"return HomeManageIndex.DeletePartner(this);\">×</button>";
        tag += "    <input type=\"hidden\" name=\"payNo\" value=\"" + payNo + "\" />";
        tag += "</li>";

        $("#ulPartnerList").append(tag);

        return false;
    },
    DeletePartner: function (obj) {
        $(obj).closest("li").remove();

        return false;
    }
};


$(document).ready(function () {


    $("#btnPartnerSearch").click(function () {
        HomeManageIndex.OpenPartnerSearch();

        return false;
    });


    $("#btnSave").click(function () {
        HomeManageIndex.Save();

        return false;
    });


    $("#btnCancel").click(function () {
        document.location.reload();

        return false;
    });


    HomeManageIndex.SearchPartnerList();
});






function ExpertSelectApply(expertItem) {
    HomeManageIndex.AddPartner(expertItem.PayNo, expertItem.ExpertName);

    $("#divPartnerSearch").html("");
    $("#divPartnerSearch").modal("hide");
}


