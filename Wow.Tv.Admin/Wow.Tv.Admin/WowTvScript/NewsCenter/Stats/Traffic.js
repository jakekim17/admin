$(document).ready(function () {

    $("#tabOpinion1").click(function () {
        Traffic.BindFreelancer("divTabContent");
    });

    $("#tabOpinion2").click(function () {
        Traffic.BindProvid("divTabContent");
    });

    Traffic.BindFreelancer("divTabContent");
});

var Traffic = {
    BindFreelancer: function (targetDiv, callbackMethod) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/Freelancer?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            //data: ",
            success: function (data) {
                $("#" + targetDiv).html(data);
                if (callbackMethod != null) {
                    callbackMethod();
                }
            }
        });

        return false;
    },
    BindProvid: function (targetDiv, callbackMethod) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/Provide?menuSeq=" + $("#hidCurrentMenuSeq").val(),
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
    },
    DateDiff: function (_date1, _date2) { // 두개의 날짜를 비교하여 차이를 알려준다.
        var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

        diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
        diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());

        var diff = diffDate_2.getTime() - diffDate_1.getTime();
        if (diff > 0) {
            diff = Math.floor(diff / (1000 * 3600 * 24));
        }
        else {
            diff = Math.ceil(diff / (1000 * 3600 * 24));
        }
        return diff;
    }
}
