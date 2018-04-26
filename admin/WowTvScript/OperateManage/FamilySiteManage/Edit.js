
var FaliySiteManageEdit = {
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/OperateManage/FamilySiteManage/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "familySeq": $("#hidFamilySeq").val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        $("#divEdit").modal("hide");
                        $("#divEdit").html("");
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
    Save: function () {
        if ($("#txtSiteName").val() == "") {
            alert("사이트명을 입력하여 주십시오.");
            $("#txtSiteName").focus();
            return false;
        }
        if ($("#txtUrl").val() == "") {
            alert("URL을 입력하여 주십시오.");
            $("#txtUrl").focus();
            return false;
        }
        

        var urlExp = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/

        if (urlExp.test($("#txtUrl").val()) == false) {
            alert("URL 형식이 잘못되었습니다.\r\nhttp://www.site.xx.xx");
            return false;
        }


        $.ajax({
            type: 'POST',
            url: "/OperateManage/FamilySiteManage/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    FaliySiteManageIndex.SearchList($("#currentIndex").val());
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
};


$(document).ready(function () {


    $("#divEdit_btnDelete").click(function () {
        FaliySiteManageEdit.Delete();

        return false;
    });

    $("#divEdit_btnSave").click(function () {
        FaliySiteManageEdit.Save();

        return false;
    });

});

