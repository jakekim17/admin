
var MenuManageSearchBoard = {
    SearchList: function (currentIndex) {
        $("#divSearchBoard_currentIndex").val(currentIndex);
        
        $.ajax({
            type: "POST",
            url: "/OperateManage/MenuManage/SearchBoardList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#divSearchBoard_frmSearch").serialize(),
            success: function (data) {
                $("#divSearchBoard_divList").html(data);
            }
        });

        return false;
    }
}


$(document).ready(function () {

    $("#divSearchBoard_frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#divSearchBoard_btnSearch").click();

            return false;
        }
    });


    $("#divSearchBoard_btnSearch").click(function () {
        MenuManageSearchBoard.SearchList(0);

        return false;
    });

    $("#divSearchBoard_btnSearch").click();
});

