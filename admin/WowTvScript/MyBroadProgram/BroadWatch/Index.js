
var BroadWatchIndex = {
    SearchList: function (currentIndex) {

        $("#currentIndex").val(currentIndex);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/MyBroadProgram/BroadWatch/Index?" + "menuSeq=" + $("#hidCurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();
    },
    GoEdit: function (num) {
        $("#hidNum").val(num);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/MyBroadProgram/BroadWatch/Edit?" + "menuSeq=" + $("#hidCurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    ExecuteInsertSp: function () {

        if ($("#txtToDay").val() == "") {
            alert("날자를 입력하여 주십시오.");
            return false;
        }

        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/BroadWatch/ExecuteInsertSp?ProgramCode=" + $("#hidProgramCode").val(),
            data: { "today": $("#txtToDay").val(), "programCode": $("#hidProgramCode").val()},
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    BroadWatchIndex.SearchList(0);
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

    $("#btnSearch").click(function () {
        BroadWatchIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });

    $("#btnCreate").click(function () {
        BroadWatchIndex.ExecuteInsertSp();

        return false;
    });

    

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "BroadWatchIndex.SearchList"));
    
});
