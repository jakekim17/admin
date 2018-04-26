
var NewsProgramManageIndex = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/NewsProgramManage/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function () {
        if ($("#divList").find("[type='checkbox']:checked").length == 0) {
            alert("삭제할 프로그램을 선택하여 주십시오.");
            return false;
        }
        else if ($("#divList").find("[type='checkbox']:checked").length > 1) {
            alert("삭제할 프로그램은 1개만 선택가능 합니다.");
            return false;
        }

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/BroadCast/NewsProgramManage/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "programCode": $("#divList").find("[type='checkbox']:checked").val() },
                success: function (data, textStatus) {
                    NewsProgramManageIndex.SearchList($("#currentIndex").val());
                }
            });
        }

        return false;
    },
    GoEdit: function (programCode) {
        $("#hidProgramCode").val(programCode);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/NewsProgramManage/Edit?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    Merge: function () {
        var isFirst = true;
        var prevId = "";
        var prevCell;
        var rowSpan = 1;
        $.each($("#divList > table > tbody > tr"), function (index, item) {
            if (isFirst == true) {
                prevId = $(item).children("td").eq(0).attr("mergeId");
                isFirst = false;
                prevCell = $(item).children("td").eq(0);
            }
            else {
                if (prevId == $(item).children("td").eq(0).attr("mergeId")) {
                    rowSpan++;
                    prevId = $(item).children("td").eq(0).attr("mergeId");
                    $(item).children("td").eq(0).remove();
                }
                else {
                    $(prevCell).attr("rowspan", rowSpan);
                    rowSpan = 1;
                    prevCell = $(item).children("td").eq(0);
                    prevId = $(item).children("td").eq(0).attr("mergeId");
                }
            }
        });
        $(prevCell).attr("rowspan", rowSpan);

        $("#divList").hide().show(0);
    }
}



$(document).ready(function () {


    $("#btnSearch").click(function () {
        NewsProgramManageIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnDelete").click(function () {
        NewsProgramManageIndex.Delete();

        return false;
    });


    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "NewsProgramManageIndex.SearchList"));

    NewsProgramManageIndex.Merge();
});
