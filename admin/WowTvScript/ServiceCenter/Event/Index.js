var EventIndex = {
    Delete: function (deleteList) {
        $.ajax({
            type: "POST",
            url: "/ServiceCenter/Event/Delete?menuSeq=" + menuSeq,
            data: { "deleteList": deleteList },
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.DeleteAfterMsg);
                    //window.location.reload();
                    EventIndex.Search(currentIndex);
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    Search: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Event/Index?menuSeq=" + menuSeq);
        $("#frmSearch").submit();

        return false;
    },
    GoEdit: function (seq) {
        $("#seq").val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Event/Edit?menuSeq=" + menuSeq);
        $("#frmSearch").submit();
    }
};




$(document).ready(function () {
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "EventIndex.Search"));

    //검색타입 선택
    if (searchType != "") {
        if ($("#searchType option").eq(0).val() == searchType) {
            $("#searchType option").eq(0).prop("selected", true);
        } else {
            $("#searchType option").eq(1).prop("selected", true);
        }
    }
    //이벤트타입 선택
    var flaglength = $("select[name='EventType'] option").size();
    for (var i = 0; i < flaglength; i++) {
        if ($("select[name='EventType'] option").eq(i).val() == eventType) {
            $("select[name='EventType'] option").eq(i).prop("selected", true);
        }
    }
    

    //list삭제버튼
    $("#delete").on("click", function () {
        var deleteList = [];
        var chkLength = $("input[name='eventNo']:checked").length;

        for (var idx = 0; idx < chkLength; idx++) {
            deleteList.push($("input[name='eventNo']:checked").eq(idx).val());
        }

        if (chkLength > 0) {
            if (confirm(CommonMsg.DeleteConfirmMsg)) {
                EventIndex.Delete(deleteList);
            }
        } else {
            alert("삭제할 항목을 선택해주세요.");
        }
       
    });

    //list등록버튼
    $("#insert").on("click", function () {
        location.href = "/ServiceCenter/Event/Edit?menuSeq=" + menuSeq;
    });

    //전체선택
    $("#total").on("click", function () {

        if ($("#total").is(":checked")) {
            $("input[name='eventNo']").prop("checked", true);
        } else {
            $("input[name='eventNo']").prop("checked", false);
        }

    });

    //검색
    $("#search").on("click", function () {
        EventIndex.Search();
    });

    //검색(엔터)
    $("#searchText").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#search").click();
        }
    });

});