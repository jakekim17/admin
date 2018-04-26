var RecuitManageIndex = {
    GoDetail: function(seq) {
        $('#Seq').val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/RecruitManage/Detail?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
    },
    Search: function (currentIndex) {
        $("#CurrentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/RecruitManage/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    }
};

$(document).ready(function () {
    if (totalDataCount != 0) {
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#CurrentIndex").val(), $("#PageSize").val(), "RecuitManageIndex.Search"));
    }

    $('#btnSearch').click(function () {
        RecuitManageIndex.Search();
    });

    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();
            return false;
        }
    });
});