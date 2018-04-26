
$(document).ready(function () {

    $("#FAQDetail").click(function () {
        NoticeDetail.GoEdit();

        return false;
    });

    $("#btnList").click(function () {
        FAQDetail.GoIndex();

        return false;
    });

    $("#btnDelete").click(function () {
        if (confirm(CommonMsg.DeleteCobtnModifynfirmMsg)) {
            FAQDetail.Delete($("#seq").val());
        }

        return false;
    });

    $("#btnModify").click(function () {
        FAQDetail.GoEdit();

        return false;
    });

});



var FAQDetail = {
    GoEdit: function () {
        $("#frmSearch").attr("method", "GET");
        $("#frmSearch").attr("action", "/ServiceCenter/FAQ/Edit");
        $("#frmSearch").submit();

        return false;
    },
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/FAQ/Index");
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/ServiceCenter/FAQ/Delete",
            data: { "seq": seq },
            success: function (data) {
                if (data.IsSuccess) {
                    FAQDetail.GoIndex();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}