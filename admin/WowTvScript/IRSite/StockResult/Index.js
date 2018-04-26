var StockResultIndex = {
    GoEdit: function (seq) {
        $("#seq").val(seq);
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/StockResult/Edit?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Search: function (currentIndex) {
        $('#currentIndex').val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/StockResult/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Delete: function (deleteList) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/IRSite/StockResult/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "deleteList": deleteList },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        window.location.reload();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
        return false;
    }
};

$(document).ready(function () {
    if (totalDataCount != 0) {
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "StockResultIndex.Search"));
    }

    $("select[name='Year']").val(year).attr("selected", true);
    $("select[name='Rounds']").val(rounds).attr("selected", true);


    $('#btnAdd').click(function () {
        StockResultIndex.GoEdit();
    });
    $('#btnSearch').click(function () {
        StockResultIndex.Search();
    });

    $('#btnDelete').click(function () {
        var deleteList = [];
        $('input[name="checkbox"]:checked').each(function () {
            deleteList.push(this.value);
        });
        if (deleteList.length <= 0) {
            alert('삭제할 항목을 클릭해주세요');
        }
        else {
            StockResultIndex.Delete(deleteList);
        }
    });

    $('.selectSearch').change(function () {
        StockResultIndex.Search();
    });

    $("#allCheck").click(function () {
        if ($("#allCheck").prop("checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });
});