

var ProgramGroupSearch = {
    SearchList: function (currentIndex) {
        $("#divProgramSearch_currentIndex").val(currentIndex);

        $.ajax({
            type: "POST",
            url: "/BroadCast/ProgramTemplate/ProgramGroupSearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmProgramGroupSearch").serialize(),
            success: function (data) {
                $("#divProgramGroupSearchList").html(data);
            }
        });

        return false;
    },
    LastListReload: function () {
        ProgramGroupSearch.SearchList($("#divProgramSearch_currentIndex").val());

        return false;
    }
}


$(document).ready(function () {

    $("#frmProgramGroupSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#divProgramGroupSearch_btnSearch").click();

            return false;
        }
    });


    $("#divProgramGroupSearch_btnSearch").click(function () {
        ProgramGroupSearch.SearchList(0);

        return false;
    });

    $("#divProgramGroupSearch_btnSearch").click();
});

