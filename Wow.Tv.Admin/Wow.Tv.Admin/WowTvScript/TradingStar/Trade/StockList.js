$(document).ready(function () {
    $("#btnSearch").click(function () {

        if (!window.co.validation("#txtSearch", AlertMsg.KeyWordisNotMsg)) {
            $("#txtSearch").focus();
            return false;
        }
        StockList.SearchList(0);
        return false;
    });


    $("#frmStockSearch").keydown(function () {
        if (event.keyCode === 13) {
            $("#btnSearch").click();
            return false;
        }
        return true;
    });

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "StockList.SearchList"));

});
var StockList = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: "POST",
            url: "/TradingStar/Trade/StockList?menuSeq=" + $("#CurrentMenuSeq").val(),
            data: $("#frmStockSearch").serialize(),
            success: function (data) {
                $("#divStockPopup").html(data);
            }
        });

        return false;
    }
}