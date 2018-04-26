

$(document).ready(function () {

    $(".devModify").click(function () {
        $(this).closest("tr").find("span").hide();
        $(this).closest("tr").find("input").show();

        $(this).closest("tr").find(".devModify").hide();
        $(this).closest("tr").find(".devSave").show();

        return false;
    });

    $(".devSave").click(function () {
        var programCd = $(this).closest("tr").find("[name='PRG_CD']").val();
        var serviceName = $(this).closest("tr").find("[name='SERVICE_NAME']").val();
        var anc1Name = $(this).closest("tr").find("[name='ANC1_NM']").val();
        var anc2Name = $(this).closest("tr").find("[name='ANC2_NM']").val();

        $.ajax({
            type: "POST",
            url: "/BroadCast/ScheduleManage/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "PRG_CD": programCd, "SERVICE_NAME": serviceName, "ANC1_NM": anc1Name, "ANC2_NM": anc2Name},
            success: function (data) {
                if (data.IsSuccess == true) {
                    ScheduleManageIndex.LastListReload();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    });
});
