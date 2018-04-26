
var PopAdminSearch = {
    SearchList: function (currentIndex) {
        $("#divSearchAdmin_currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/BroadCast/NewsProgramManage/PopAdminSearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#divSearchAdmin_frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divSearchAdmin_divList").html(data);
            }
        });

        return false;
    }
}


$(document).ready(function () {

    $("#divSearchAdmin_btnSearch").click(function () {
        PopAdminSearch.SearchList(0);

        return false;
    });


    $("#divSearchAdmin_frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#divSearchAdmin_btnSearch").click();

            return false;
        }
    });



    $("#divSearchAdmin_btnSearch").click();
});

