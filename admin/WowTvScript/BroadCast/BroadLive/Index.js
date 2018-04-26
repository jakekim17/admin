
var BroadLiveIndex = {
    SearchList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/BroadLive/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    DeleteList: function () {
        if ($("#divList").find("[name='seqList']:checked").length == 0) {
            alert("삭제할 중계방송을 선택하여 주십시오.");
            return false;
        }

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/BroadCast/BroadLive/DeleteList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: $("#frmList").serialize(),
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        BroadLiveIndex.SearchList(0);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    GoEdit: function (broadLiveID) {
        $("#hidBroadLiveID").val(broadLiveID);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/BroadLive/Edit?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    }
};



$(document).ready(function () {

    $("#btnSearch").click(function () {
        BroadLiveIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $(".devCreate").click(function () {
        BroadLiveIndex.GoEdit(0);

        return false;
    });


    $("#btnDelete").click(function () {
        BroadLiveIndex.DeleteList();

        return false;
    });
    


    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "BroadLiveIndex.SearchList"));

    $("#chAll").change(function () {
        $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));
        
        return false;
    });

});



