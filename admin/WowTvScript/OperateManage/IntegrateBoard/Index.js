
var IntegrateBoardIndex = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/OperateManage/IntegrateBoard/SearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    DeleteList: function () {
        if (IntegrateBoardSearchList.GetCheckCount() == 0) {
            alert("삭제할 게시판을 선택하여 주십시오.");
            return false;
        }

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/OperateManage/IntegrateBoard/DeleteList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: $("#frmList").serialize(),
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        IntegrateBoardIndex.SearchList(0);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    OpenEdit: function (boardSeq) {
        $.ajax({
            type: 'POST',
            url: "/OperateManage/IntegrateBoard/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "boardSeq": boardSeq },
            success: function (data, textStatus) {
                $("#divEdit").html(data);
                $("#divEdit").modal("show");
            }
        });

        return false;
    },
    ExcelExport: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/OperateManage/IntegrateBoard/Excel?currentMenuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    }
}



$(document).ready(function () {

    $("#btnSearch").click(function () {
        IntegrateBoardIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnDelete").click(function () {
        IntegrateBoardIndex.DeleteList();

        return false;
    });

    $("#btnCreate").click(function () {
        IntegrateBoardIndex.OpenEdit(0);

        return false;
    });

    $("#btnExcel").click(function () {
        IntegrateBoardIndex.ExcelExport();

        return false;
    });

    $("#btnSearch").click();
});

