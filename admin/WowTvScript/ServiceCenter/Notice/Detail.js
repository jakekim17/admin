
$(document).ready(function () {
    $("#btnModify").click(function () {
        NoticeDetail.GoEdit();

        return false;
    });

    $("#btnList").click(function () {
        NoticeDetail.GoIndex();

        return false;
    });

    $("#btnDelete").click(function () {
        if (confirm("삭제 하시겠습니까?")) {
            NoticeDetail.Delete($("#seq").val());
        }

        return false;
    });


});



var NoticeDetail = {
    GoEdit: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Notice/Edit");
        $("#frmSearch").submit();

        return false;
    },
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Notice/Index");
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/ServiceCenter/Notice/Delete",
            data: { "seq": seq },
            success: function (data) {
                if (data.IsSuccess) {
                    NoticeDetail.GoIndex();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}