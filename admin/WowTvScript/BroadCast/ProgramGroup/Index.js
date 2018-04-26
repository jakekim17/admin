
var ProgramGroupIndex = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/ProgramGroup/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    DeleteList: function () {
        if ($("#divList").find("[name='seqList']:checked").length == 0) {
            alert("삭제할 프로그램그룹을 선택하여 주십시오.");
            return false;
        }

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/BroadCast/ProgramGroup/DeleteList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: $("#frmList").serialize(),
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        ProgramGroupIndex.SearchList(0);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }
    },
    GoEdit: function (programGroupSeq) {
        $("#hidProgramGroupSeq").val(programGroupSeq);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/ProgramGroup/Edit?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    }

};




$(document).ready(function () {

    $("#btnSearch").click(function () {
        ProgramGroupIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnCreate").click(function () {
        ProgramGroupIndex.GoEdit(0);

        return false;
    });

    $("#btnDeleteList").click(function () {
        ProgramGroupIndex.DeleteList();

        return false;
    });

    $("#chAll").change(function () {
        $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

        return false;
    });


    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "ProgramGroupIndex.SearchList"));


});



