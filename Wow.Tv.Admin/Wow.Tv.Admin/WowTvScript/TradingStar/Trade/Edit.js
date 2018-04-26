
$(document).ready(function () {
    
    $("#btnSave").click(function () {
        var confirmMsg = CommonMsg.ModifyConfirmMsg;

        if (typeof $("#hidSeq").val() == "undefined" || $("#hidSeq").val() === "0") {
            confirmMsg = CommonMsg.SaveConfirmMsg;
        };

        if (confirm(confirmMsg)) {


            if (!window.co.validation("#txtName", "종목명을 확인해주세요.")) {
                $("#txtName").focus();
                return false;
            }

            if (!window.co.validation("#txtCode", "종목코드를 확인해주세요.")) {
                $("#txtCode").focus();
                return false;
            }

            if (confirmMsg === CommonMsg.SaveConfirmMsg) {
                TradeEdit.Insert();
            } else {
                TradeEdit.Update();
            }
        }
        return false;
    });
});

var TradeEdit = {
    Insert: function () {
        $.ajax({
            type: 'POST',
            url: "/TradingStar/Trade/Insert?currentMenuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    TradeIndex.Search("divList");
                }
                else {
                    alert(data.Msg);
                }
            }
        });
        return false;
    },
    Update: function () {
        $.ajax({
            type: 'POST',
            url: "/TradingStar/Trade/Update?currentMenuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    TradeIndex.Search("divList");
                }
                else {
                    alert(data.Msg);
                }
            }
        });
        return false;
    },
    OpenStockList: function () {
        $.ajax({
            type: "POST",
            url: "/TradingStar/Trade/StockList?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "SearchText": $("#txtName").val() },
            success: function (data) {
                $("#divStockPopup").html(data);
                $("#divStockPopup").modal("show");
            }
        });

        return false;
    },
    SelectCode: function (code, cname) {
        $("#txtName").val(cname);
        $("#txtCode").val(code);
        $("#divStockPopup").modal("hide");
        $("#divStockPopup").html("");
        return false;
    }
}