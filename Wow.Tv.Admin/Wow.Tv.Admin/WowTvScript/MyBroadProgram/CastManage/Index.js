
var CastManageIndex = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/MyBroadProgram/CastManage/Index?" + "menuSeq=" + $("#hidCurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();
    },
    GoEdit: function (programCastSeq) {
        $("#hidProgramCastSeq").val(programCastSeq);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/MyBroadProgram/CastManage/Edit?" + "menuSeq=" + $("#hidCurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    DeleteList: function () {
        if ($("#divList").find("[name='seqList']:checked").length == 0) {
            alert("삭제할 출연진을 선택하여 주십시오.");
            return false;
        }

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/MyBroadProgram/CastManage/DeleteList?ProgramCode=" + $("#hidProgramCode").val(),
                data: $("#frmList").serialize(),
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        CastManageIndex.SearchList(0);
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

    $("#btnSearch").click(function () {
        CastManageIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $(".devCreate").click(function () {
        CastManageIndex.GoEdit(0);

        return false;
    });


    $("#btnDelete").click(function () {
        CastManageIndex.DeleteList();

        return false;
    });


    $("#chAll").change(function () {
        $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

        return false;
    });


    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "SearchList"));

});
