var NewCmtIndex = {

    //댓글사용여부 설정 저장
    ActiveSave: function () {

        if (confirm(CommonMsg.SaveConfirmMsg)) {
            $.ajax({
                type: "POST",
                url: "/NewsCenter/NewsContentManage/SetNewsShowActiveConfig?menuSeq=" + menuSeq,
                data: $("#frmSearch").serialize(),
                success: function (data, textStatus) {

                    if (data.IsSuccess == true) {

                        alert(CommonMsg.SaveAfterMsg);
                    }
                    else {
                        if (data.Msg == "") {
                            alert(CommonMsg.ErrorMag);
                        }
                        else {
                            alert(data.Msg);
                        }
                    }
                }
            });
        }
    },
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/NewsCenter/NewsCmtManage/Index?menuSeq=" + menuSeq);
        $("#frmSearch").submit();
    },
    Delete: function (deleteList) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsCmtManage/Delete?menuSeq=" + menuSeq,
            data: { "deleteList": deleteList },
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.DeleteAfterMsg);
                    window.location.reload();
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    Update: function (seq) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsCmtManage/Update?menuSeq=" + menuSeq,
            data: { "seq": seq },
            success: function (data) {
                if (data.isSuccess == true) {
                    alert("댓글이 공개(비공개)처리 되었습니다.");
                    window.location.reload();
                } else {
                    alert(data.msg);
                }
            }
        });
    }
};

$(document).ready(function () {
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "NewCmtIndex.GetList"));

    if (searchType != "") {
        for (var i = 0; i < $("#searchType option").length; i++) {
            if ($("#searchType option").eq(i).val() == searchType){
                $("#searchType option").eq(i).prop("selected", true);
            }
        }
    }

    if (pageSize != "") {
        for (var i = 0; i < $("select[name='pageCount'] option").length; i++) {
            if ($("select[name='pageCount'] option").eq(i).val() == pageSize) {
                $("select[name='pageCount'] option").eq(i).prop("selected", true);
            }
        }
    }
    
    $("select[name='pageCount']").on("change", function () {
        $("#pageSize").val($(this).val());
        NewCmtIndex.GetList(0);
    });

    $("select[name='NewsGubun']").on("change", function () {
        //NewCmtIndex.GetList(0);
    });

    //댓글사용여부 
    $("#btnSave").click(function () {

        NewCmtIndex.ActiveSave();
    });

    //전체선택
    $("#total").on("click", function () {

        if ($("#total").is(":checked")) {
            $("input[name='cmtTotal']").prop("checked", true);
        } else {
            $("input[name='cmtTotal']").prop("checked", false);
        }

    });

    //삭제버튼 클릭시 
    $("#delete").on("click", function () {

        var deleteList = [];
        var chkLength = $("input[name='cmtTotal']:checked").length;

        for (var idx = 0; idx < chkLength; idx++) {
            deleteList.push($("input[name='cmtTotal']:checked").eq(idx).val());
        }

        if (chkLength > 0) {
            if (confirm(CommonMsg.DeleteConfirmMsg)) {
                NewCmtIndex.Delete(deleteList);
            }
        } else {
            alert("삭제할 항목을 선택하세요.");
        }

    });

    //리스트 삭제버튼 클릭시
    $("button[name='delete']").on("click", function () {
        var deleteList = [];
        var seq = $(this).attr("id");
        deleteList.push(seq);
        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            NewCmtIndex.Delete(deleteList);
        }
    });


    //리스트 공개/비공개 클릭시 
    $("button[name='OPEN_YN']").on("click", function () {
        var seq = $(this).attr("id");
        NewCmtIndex.Update(seq);
    });
    

    //메뉴 공개 클릭시 소팅
    $("#openY").on("click", function () {
        var openYN = "D";
        $("input[name='Sort']").val(openYN);
        NewCmtIndex.GetList(0);
    });

    //메뉴 비공개 클릭시 소팅
    $("#openN").on("click", function () {
        var openYN = "A";
        $("input[name='Sort']").val(openYN);
        NewCmtIndex.GetList(0);
    });

    //검색
    $("#search").on("click", function () {
        NewCmtIndex.GetList(0);
    });


    $("#searchText").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#search").click();
        }
    });


});