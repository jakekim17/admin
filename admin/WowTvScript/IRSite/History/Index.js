var HistoryIndex = {
    GoEdit: function (seq) {
        $("#seq").val(seq);
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/History/Edit?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Search: function (currentIndex) {
        $('#currentIndex').val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/History/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Delete: function (checkedList) {

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/IRSite/History/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "checkedList": checkedList },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        window.location.reload();
                    }else {
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
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "HistoryIndex.Search"));
    }

    $("select[name='DispYN']").val(dispYn).attr("selected", true);
    if (searchType == "") {
        $("select[name='SearchType']").val("all").attr("selected", true);
    }else {
        $("select[name='SearchType']").val(searchType).attr("selected", true);
    }

    $('#btnAdd').click(function () {
        HistoryIndex.GoEdit();
    });
    $('#btnSearch').click(function () {
        HistoryIndex.Search();
    });

    $('#btnDelete').click(function () {
        var checkedList = [];
        $('input[name="checkbox-1"]:checked').each(function () {
            checkedList.push(this.value);
        });
        if (checkedList.length <= 0) {
            alert('삭제할 연혁을 클릭해주세요');
        }
        else {
            HistoryIndex.Delete(checkedList);
        }
    });

    $("#allCheck").click(function () {
        if ($("#allCheck").prop("checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();
            return false;
        }
    });
});