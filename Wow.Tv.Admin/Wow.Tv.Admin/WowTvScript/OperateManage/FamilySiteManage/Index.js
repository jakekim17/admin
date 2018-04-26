
var FaliySiteManageIndex = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/OperateManage/FamilySiteManage/SearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    DeleteList: function () {
        if (FaliySiteManageSearchList.GetCheckCount() == 0) {
            alert("삭제할 패밀리사이트를 선택하여 주십시오.");
            return false;
        }

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/OperateManage/FamilySiteManage/DeleteList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: $("#frmList").serialize(),
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        FaliySiteManageIndex.SearchList(0);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    OpenEdit: function (familySeq) {
        $.ajax({
            type: 'POST',
            url: "/OperateManage/FamilySiteManage/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "familySeq": familySeq },
            success: function (data, textStatus) {
                $("#divEdit").html(data);
                $("#divEdit").modal("show");
            }
        });

        return false;
    },
    ExcelExport: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/OperateManage/FamilySiteManage/Excel?currentMenuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    }
}


$(document).ready(function () {

    $("#btnSearch").click(function () {
        FaliySiteManageIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnDelete").click(function () {
        FaliySiteManageIndex.DeleteList();

        return false;
    });

    $("#btnCreate").click(function () {
        FaliySiteManageIndex.OpenEdit(0);

        return false;
    });

    $("#btnExcel").click(function () {
        FaliySiteManageIndex.ExcelExport();

        return false;
    });

    $("#btnSearch").click();
});

