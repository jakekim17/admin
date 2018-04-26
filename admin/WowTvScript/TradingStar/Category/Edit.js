
$(document).ready(function () {
    
    $("#btnSave").click(function () {
        var confirmMsg = CommonMsg.ModifyConfirmMsg;

        if (typeof $("#hidTradingCode").val() == "undefined" || $("#hidTradingCode").val() === "") {
            confirmMsg = CommonMsg.SaveConfirmMsg;
        };

        if (confirm(confirmMsg)) {


            if (!window.co.validation("#txtTradingCode", "TradingCode을 확인해주세요.")) {
                $("#txtTradingCode").focus();
                return false;
            }

            if (!window.co.validation("#txtCodeName", "CodeName을 확인해주세요.")) {
                $("#txtCodeName").focus();
                return false;
            }
            if (confirmMsg === CommonMsg.SaveConfirmMsg) {
                CategoryEdit.Insert();
            } else {
                CategoryEdit.Update();
            }
        }
        return false;
    });
});



var CategoryEdit = {
    Insert: function () {
        $.ajax({
            type: 'POST',
            url: "/TradingStar/Category/Insert?currentMenuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    CategoryIndex.Search("divList");
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
            url: "/TradingStar/Category/Update?currentMenuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    CategoryIndex.Search("divList");
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}