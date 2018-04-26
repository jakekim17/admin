var StockholderBoardIndex = {
    Search: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/StockholderBoard/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    GoEdit: function (seq) {
        $("#CurrentIndex").val(currentIndex);
        $('#seq').val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/StockholderBoard/Edit?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    }
};

$(document).ready(function () {
    if (totalDataCount != 0) {
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "StockholderBoardIndex.Search"));
    }

    $("select[name='BlindYn']").val(blindYn).attr("selected", true);

    if (searchType != "") {
        $("select[name='SearchType']").val(searchType).attr("selected", true);
    } else {
        $("select[name='SearchType']").val("ALL").attr("selected", true);
    }

    $('#btnSearch').click(function () {
        StockholderBoardIndex.Search();
    });

    $('#btnAdd').click(function () {
        StockholderBoardIndex.Edit();
    });

    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();
            return false;
        }
    });
});