
var ProgramBannerSearchList = {
    Delete: function () {
        if ($("#divList").find("[name='seqList']:checked").length == 0) {
            alert("삭제할 배너를 선택하여 주십시오.");
            return false;
        }

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/MyBroadProgram/ProgramBanner/DeleteList?ProgramCode=" + $("#hidProgramCode").val(),
                data: $("#frmList").serialize(),
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        ProgramBannerIndex.SearchList(0);
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

    $("#btnDelete").click(function () {
        ProgramBannerSearchList.Delete();

        return false;
    });

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "AdminManageIndex.SearchList"));

    $("#chAll").change(function () {
        $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

        return false;
    });

});

