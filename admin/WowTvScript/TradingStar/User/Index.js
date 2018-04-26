$(document).ready(function() {

    $("#btnAdd").click(function() {
        UserIndex.OpenEdit("0", $("#hidTradingCode").val());

        return false;
    });

    $("#btnDelete").click(function () {

        var checkItems = new Array();

        for (var i = 1; i < $("table tr").size(); i++) {
            var chk = $("table tr").eq(i).children().find("input[type=\"checkbox\"]").is(":checked");
            if (chk === true) {
                checkItems.push($("table tr").eq(i).find("td").eq(3).text());
            }
        }

        if (checkItems.length === 0) {
            confirm("선택 항목이 없습니다.");
            return false;
        }


        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            UserIndex.RemoveAll(checkItems);
        }
        return false;
    });

    UserIndex.Search("divList");
});



var UserIndex = {
    OpenEdit: function (seq, tradingCode) {
        $.ajax({
            type: "POST",
            url: "/TradingStar/User/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "seq": seq, "tradingCode": tradingCode },
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
            url: "/TradingStar/User/UserList?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { TradingCode: $("#hidTradingCode").val() },
            success: function (data) {
                $("#" + targetDiv).html(data);
                if (callbackMethod != null) {
                    callbackMethod();
                }
            }
        });

        return false;
    },
    GetList: function (currentIndex) {
        UserIndex.Search("divList");
        return false;
    },
    Paging: function () {
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "UserIndex.GetList"));
        return false;
    },
    RemoveAll: function (items) {
        $.ajax({
            type: "POST",
            url: "/TradingStar/User/RemoveAll?menuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: { "items": items },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    UserIndex.GetList($("#currentIndex").val());
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    TradeList: function (seq) {
        $("#hidRegseq").val(seq);
        $("#frmMove").attr("method", "POST");
        $("#frmMove").attr("action", "/TradingStar/Trade/Index?menuSeq=" + $('#hidCurrentMenuSeq').val());
        $("#frmMove").submit();
        return false;
    }
    
    
}



