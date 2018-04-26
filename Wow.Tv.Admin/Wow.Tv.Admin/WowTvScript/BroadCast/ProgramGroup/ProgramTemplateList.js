
var ProgramGroupProgramTemplateList = {
    UpDown: function (programTemplateSeq, programGroupSeq, isUp) {
        $.ajax({
            type: 'POST',
            url: "/BroadCast/ProgramGroup/ProgramTemplateUpDown?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "programTemplateSeq": programTemplateSeq, "programGroupSeq": programGroupSeq, "isUp": isUp },
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    ProgramGroupEdit.BindProgramTemplateList();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    Delete: function (programTemplateSeq, programGroupSeq) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/BroadCast/ProgramGroup/ProgramTemplateDelete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "programTemplateSeq": programTemplateSeq, "programGroupSeq": programGroupSeq },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        ProgramGroupEdit.BindProgramTemplateList();
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    }
};


$(document).ready(function () {
});

