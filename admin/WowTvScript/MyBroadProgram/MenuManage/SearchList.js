
var MyProgramMenuManageSearchList = {
    SelectItem: function (menuSeq) {

        MyProgramMenuManageIndex.CurrentSelectMenuSeq = menuSeq;
        
        if (MyProgramMenuManageIndex.CurrentSelectMenuSeq == 0) {
            $(".devDelete").hide();
        }
        else {
            $(".devDelete").show();
        }
        
        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/MenuManage/Edit?ProgramCode=" + $("#hidProgramCode").val(),
            data: { "menuSeq": menuSeq },
            success: function (data, textStatus) {
                $("#divEdit").html(data);
            }
        });

        return false;
    },
    UpDown: function (menuSeq, isUp) {
        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/MenuManage/UpDown?ProgramCode=" + $("#hidProgramCode").val(),
            data: { "menuSeq": menuSeq, "isUp": isUp },
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    MyProgramMenuManageIndex.Init();
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

});

