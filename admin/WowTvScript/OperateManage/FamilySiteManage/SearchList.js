
var FaliySiteManageSearchList = {
    GetCheckCount: function () {
        return $("#divList").find("[name='seqList']:checked").length;
    },
    UpDown: function (familySeq, isUp) {
        $.ajax({
            type: 'POST',
            url: "/OperateManage/FamilySiteManage/UpDown?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "familySeq": familySeq, "isUp": isUp },
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    FaliySiteManageIndex.SearchList($("#currentIndex").val());
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
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "FaliySiteManageIndex.SearchList"));

    $("#chAll").change(function () {
        $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

        return false;
    });

});

