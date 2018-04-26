var LectureIndex = {
    GoEdit: function (seq) {
        $('#seq').val(seq);
        $("#CurrentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ProductManage/Lecture/Edit?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Search: function (currentIndex) {
        $("#CurrentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ProductManage/Lecture/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Delete: function (deleteList) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/ProductManage/Lecture/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
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
    if (totalDataCount !=0){
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "LectureIndex.Search"));
    }
    $('select[name="ViewSite"]').val(ViewSite).attr("selected", true);
    $('select[name="MainCtgr"]').val(MainCtgr).attr("selected", true);
    $('select[name="TypeFlag"]').val(TypeFlag).attr("selected", true);
    $('select[name="SearchType"]').val(SearchType).attr("selected", true);

    if (SearchType == "") {
        $('select[name="SearchType"]').val("ALL").attr("selected", true);
    } else {
        $('select[name="SearchType"]').val(SearchType).attr("selected", true);
    }

    $('#btnAdd').click(function () {
        LectureIndex.GoEdit();
    });

    $('#btnSearch').click(function () {
        LectureIndex.Search();
    });

    $('#btnDelete').click(function () {
        var deleteList = [];
        $('input[name="check"]:checked').each(function () {
            deleteList.push(this.value);
        });
        if (deleteList.length <= 0) {
            alert('삭제할 강연회를 선택해주세요');
        }
        else {
            LectureIndex.Delete(deleteList);
        }
    });

    $("#allcheck").click(function () {
        if ($("#allcheck").prop("checked")) {
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