
$(document).ready(function () {
    
    $("#btnSave").click(function () {
        var confirmMsg = CommonMsg.ModifyConfirmMsg;

        if (typeof $("#hidSeq").val() == "undefined" || $("#hidSeq").val() === "0") {
            confirmMsg = CommonMsg.SaveConfirmMsg;
        };

        if (confirm(confirmMsg)) {


            if (!window.co.validation("#txtName", "출연자명을 확인해주세요.")) {
                $("#txtName").focus();
                return false;
            }

            if (!window.co.validation("#txtPro_id", "Pro ID을 확인해주세요.")) {
                $("#txtPro_id").focus();
                return false;
            }

            if (!window.co.validation("#txtStockchar", "투자 성향을 확인해주세요.")) {
                $("#txtStockchar").focus();
                return false;
            }
            
            if (!window.co.validation("#txtReplyid", "댓글ID를 확인해주세요.")) {
                $("#txtReplyid").focus();
                return false;
            }

            if (!window.co.validation("#txtThumbnail", "출연자 사진경로를 확인해주세요.")) {
                $("#txtThumbnail").focus();
                return false;
            }
            if (confirmMsg === CommonMsg.SaveConfirmMsg) {
                UserEdit.Insert();
            } else {
                UserEdit.Update();
            }
        }
        return false;
    });
});



var UserEdit = {
    Insert: function () {
        $.ajax({
            type: 'POST',
            url: "/TradingStar/User/Insert?currentMenuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    UserIndex.Search("divList");
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
            url: "/TradingStar/User/Update?currentMenuSeq=" + $('#hidCurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    UserIndex.Search("divList");
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}