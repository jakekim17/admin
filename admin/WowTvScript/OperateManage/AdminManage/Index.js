
var AdminManageIndex = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/OperateManage/AdminManage/SearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    DeleteList: function () {
        if (AdminManageSearchList.GetCheckCount() == 0) {
            alert("삭제할 운영자를 선택하여 주십시오.");
            return false;
        }

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/OperateManage/AdminManage/DeleteList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: $("#frmList").serialize(),
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        AdminManageIndex.SearchList(0);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    OpenEdit: function (seq) {
        $.ajax({
            type: 'POST',
            url: "/OperateManage/AdminManage/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "seq": seq },
            success: function (data, textStatus) {
                $("#divEdit").html(data);
                $("#divEdit").modal("show");
            }
        });

        return false;
    },
    ExcelExport: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/OperateManage/AdminManage/Excel?currentMenuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    }
}


$(document).ready(function () {

    $("#btnSearch").click(function () {
        AdminManageIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnDelete").click(function () {
        AdminManageIndex.DeleteList();

        return false;
    });

    $("#btnCreate").click(function () {
        AdminManageIndex.OpenEdit(0);

        return false;
    });

    $("#btnExcel").click(function () {
        AdminManageIndex.ExcelExport();

        return false;
    });

    $("#btnSearch").click();
});

