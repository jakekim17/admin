var BusinessIndex = {
    GoEdit: function(seq){
        $("#seq").val(seq);
        $('#currentIndex').val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/BusinessManage/Edit?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Search: function (currentIndex) {
        $('#currentIndex').val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/BusinessManage/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Delete: function(checkedList){
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/IRSite/BusinessManage/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "checkedList": checkedList },
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
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "BusinessIndex.Search"));
    }
    

    $("select[name='displayYn']").val(displayYn).attr("selected", true);
    if (searchType == "") {
        $("select[name='searchType']").val("all").attr("selected", true);
    } else {
        $("select[name='searchType']").val(searchType).attr("selected", true);
    }

    $('#btnAdd').click(function () {
        BusinessIndex.GoEdit();
    });
    $('#btnSearch').click(function () {
        BusinessIndex.Search();
    });

    $('#btnDelete').click(function () {
        var checkedList = [];
        $('input[name="checkbox"]:checked').each(function () {
            checkedList.push(this.value);
        });
        if (checkedList.length <= 0) {
            alert('삭제할 컨텐츠를 클릭해주세요');
        }
        else {
            BusinessIndex.Delete(checkedList);
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