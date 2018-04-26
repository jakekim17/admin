$(document).ready(function() {

    $("#btnAdd").click(function() {
        TradeIndex.OpenEdit("0");

        return false;
    });

    $("#btnList").click(function () {
        TradeIndex.TradeManage($("#hidTradingCode").val());
        return false;
    });

    $("#btnTradeDelete").click(function () {

        var checkItems = new Array();

        for (var i = 1; i < $("table tr").size(); i++) {
            var chk = $("table tr").eq(i).children().find("input[type=\"checkbox\"]").is(":checked");
            if (chk === true) {
                checkItems.push($("table tr").eq(i).children().find("input[type=\"hidden\"]").eq(0).val());
            }
        }

        if (checkItems.length === 0) {
            confirm("선택 항목이 없습니다.");
            return false;
        }


        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            TradeIndex.RemoveAll(checkItems);
        }
        return false;
    });

    TradeIndex.Search("divList");
});



var TradeIndex = {
    OpenEdit: function (seq) {
        $.ajax({
            type: "POST",
            url: "/TradingStar/Trade/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "regSeq": $("#hidRegseq").val() , "seq": seq },
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
            url: "/TradingStar/Trade/TradeList?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { regseq: $("#hidRegseq").val() },
            success: function (data) {
                $("#" + targetDiv).html(data);
                if (callbackMethod != null) {
                    callbackMethod();
                }
            }
        });

        return false;
    },
    UpdateStarMark: function (seq, starMark) {
        $.ajax({
            type: "POST",
            url: "/TradingStar/Trade/UpdateStarMark?menuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: { "seq": seq, "starMark": starMark },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    TradeIndex.Search("divList");
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    RemoveAll: function (items) {
        $.ajax({
            type: "POST",
            url: "/TradingStar/Trade/RemoveAll?menuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: { "items": items },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    TradeIndex.Search("divList");
                }
                else {
                    alert(data.Msg);
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



