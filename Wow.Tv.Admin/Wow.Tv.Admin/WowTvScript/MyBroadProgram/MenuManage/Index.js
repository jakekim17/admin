
var MyProgramMenuManageIndex = {
    CurrentSelectMenuSeq: 0,
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/MenuManage/SearchList?ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);

                //MyProgramMenuManageSearchList.SelectItem($("#divList").find(".devMenuSeq").first().val());
                MyProgramMenuManageSearchList.SelectItem(0);
            }
        });

        return false;
    },
    Init: function () {
        MyProgramMenuManageIndex.SearchList(0);
        $(".devDelete").hide();

        return false;
    },
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/MyBroadProgram/MenuManage/Delete?ProgramCode=" + $("#hidProgramCode").val(),
                data: { "menuSeq": MyProgramMenuManageIndex.CurrentSelectMenuSeq },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        MyProgramMenuManageIndex.Init();
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }
    }
};



$(document).ready(function () {

    $(".devInit").click(function () {
        MyProgramMenuManageIndex.Init();

        return false;
    });


    $("#btnCreate").click(function () {
        MyProgramMenuManageSearchList.SelectItem(0);

        return false;
    });

    $(".devDelete").click(function () {
        MyProgramMenuManageIndex.Delete();

        return false;
    });

    $(".devSave").click(function () {
        MyProgramMenuManageEdit.Save();

        return false;
    });
    
    MyProgramMenuManageIndex.SearchList(0);
    
});

