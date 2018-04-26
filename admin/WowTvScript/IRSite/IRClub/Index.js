var IRClubIndex = {
    GoEdit: function (seq) {
        $("#seq").val(seq);
        $("#CurrentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/IRClub/Edit?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Search: function (currentIndex) {
        $("#CurrentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/IRClub/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Delete: function (deleteList) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/IRSite/IRClub/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
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
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "IRClubIndex.Search"));
    }

    $("select[name='industryVolume']").val(industryVolume).attr("selected", true);
    $("select[name='regType']").val(regType).attr("selected", true);
    if (searchType != "") {
        $("select[name='searchType']").val(searchType).attr("selected", true);
    } else {
        $("select[name='searchType']").val("all").attr("selected", true);
    }
    

    $('#btnAdd').click(function () {
        IRClubIndex.GoEdit();
    });
    $('#btnSearch').click(function () {
        IRClubIndex.Search();
    });

    $('#btnDelete').click(function () {
        var deleteList = [];
        $('input[name="checkbox"]:checked').each(function () {
            deleteList.push(this.value);
        });
        if (deleteList.length <= 0) {
            alert('삭제할 회원사를 클릭해주세요');
        }
        else {
            console.log(deleteList);
            IRClubIndex.Delete(deleteList);
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