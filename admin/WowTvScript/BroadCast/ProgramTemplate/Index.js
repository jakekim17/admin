
var ProgramTemplateIndex = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/ProgramTemplate/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    BindEdit: function () {
        $.ajax({
            type: 'POST',
            url: "/BroadCast/ProgramTemplate/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "programCode": $("[name='PRG_CD']:checked").val() },
            success: function (data, textStatus) {
                $("#divProgramTemplate").html(data);
            }
        });

        return false;
    }
};





$(document).ready(function () {


    $("#btnSearch").click(function () {
        ProgramTemplateIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });



    $("#btnSave").click(function () {
        ProgramTemplateEdit.Save();

        return false;
    });


    $("#btnDelete").click(function () {
        ProgramTemplateEdit.Delete();

        return false;
    });

    $("[name='PRG_CD']").change(function () {
        ProgramTemplateIndex.BindEdit();

        return false;
    });

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "ProgramTemplateIndex.SearchList"));


    $("[name='PRG_CD']:first").prop("checked", true).change();
});


