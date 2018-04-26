var BalanceIndex = {
    Delete: function (deleteList) {
        $.ajax({
            type: "POST",
            url: "/IRSite/Balance/Delete?currentMenuSeq=" + menuSeq,
            data: { "deleteList": deleteList },
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.DeleteAfterMsg);
                    window.location.reload();
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    Search: function (currentIndex) {
        var year = $("#year option:selected").val();
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/Balance/Index?menuSeq=" + menuSeq);
        $("#frmSearch").submit();

        return false;
    },
    GoEdit: function (no) {
        $("#no").val(no);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/Balance/Edit?menuSeq=" + menuSeq);
        $("#frmSearch").submit();
    }
};




$(document).ready(function () {
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "BalanceIndex.Search"));

    //selectbox 선택
    $("#year").on("change", function () {
        BalanceIndex.Search();
    });

    //list삭제버튼
    $("#delete").on("click", function () {
        
        var deleteList = [];
        var chkLength = $("input[name='BalanceNo']:checked").length;

        for (var idx = 0; idx < chkLength; idx++) {
            deleteList.push($("input[name='BalanceNo']:checked").eq(idx).val());
        }

        if (chkLength > 0) {
            if (confirm(CommonMsg.DeleteConfirmMsg)) {
                BalanceIndex.Delete(deleteList);
            }
        } else {
            alert("삭제할 항목을 선택해주세요.");
        }
      
        
    });

    //list등록버튼
    $("#insert").on("click", function () {
        location.href = "/IRSite/Balance/Edit?menuSeq=" + menuSeq;
    });

    //전체선택
    $("#total").on("click", function () {

        if ($("#total").is(":checked")) {
            $("input[name='BalanceNo']").prop("checked", true);
        } else {
            $("input[name='BalanceNo']").prop("checked", false);
        }

    });
});
