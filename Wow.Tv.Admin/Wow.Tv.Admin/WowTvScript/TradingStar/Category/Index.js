$(document).ready(function() {

    $("#btnAdd").click(function() {
        CategoryIndex.OpenEdit("");

        return false;
    });

    CategoryIndex.Search("divList");
});



var CategoryIndex = {
    OpenEdit: function (tradingCode) {
        $.ajax({
            type: "POST",
            url: "/TradingStar/Category/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "tradingCode": tradingCode },
            success: function (data) {
                $("#divEdit").html(data);
                $("#divEdit").modal("show");
            }
        });

        return false;
    },
    Search: function (targetDiv,callbackMethod) {
        $.ajax({
            type: "POST",
            url: "/TradingStar/Category/CategoryList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: "",
            success: function (data) {
                $("#" + targetDiv).html(data);
                if (callbackMethod != null) {
                    callbackMethod();
                }
            }
        });

        return false;
    },
    TradeManage: function (tradingCode) {
        $("#hidTradingCode").val(tradingCode);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/TradingStar/User/Index?menuSeq=" + $('#hidCurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    }
    
}



