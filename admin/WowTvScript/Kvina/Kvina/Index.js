﻿$(document).ready(function () {

    $("#btnSearch").click(function () {

        if (!($("select[name=SearchType]").val() == "ALL")) {
            if (!window.co.validation("#txtSearch", AlertMsg.KeyWordisNotMsg)) {
                $("#txtSearch").focus();
                return false;
            }
        }

        NoticeIndex.GetList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnCreate").click(function () {
        NoticeIndex.GoEdit(0);

        return false;
    });


    $("#btnAdd").click(function () {
        NoticeIndex.GoAdd($("#currentIndex").val());

        return false;
    });

    $("#btnDelete").click(function () {

        var checkItems = new Array();

        for (var i = 1; i < $("table tr").size(); i++) {
            var chk = $("table tr").eq(i).children().find("input[type=\"checkbox\"]").is(":checked");
            if (chk == true) {
                checkItems.push($('table tr').eq(i).find("td").eq(1).text());
            }
        }

        if (checkItems.length == 0) {
            confirm("선택 항목이 없습니다.");
            return;
        }


        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            NoticeIndex.RemoveAll(checkItems);
        }
        return false;
    });

    //전체선택 체크박스 클릭 
    $("#allCheck").click(function () {
        //만약 전체 선택 체크박스가 체크된상태일경우
        if ($("#allCheck").prop("checked")) {
            //해당화면에 전체 checkbox들을 체크해준다 
            $("input[type=checkbox]").prop("checked", true);
            // 전체선택 체크박스가 해제된 경우 
        } else {
            //해당화면에 모든 checkbox들의 체크를해제시킨다. 
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "NoticeIndex.GetList"));

});



var NoticeIndex = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Kvina/Kvina/KvinaNoticeListLinq?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    }
    //,
    //GoEdit: function (seq) {
    //    $("#seq").val(seq);
    //    $("#frmSearch").attr("method", "POST");
    //    $("#frmSearch").attr("action", "/Kvina/Kvina/Edit?menuSeq=" + $('#CurrentMenuSeq').val());
    //    $("#frmSearch").submit();

    //    return false;
    //},
    //GoAdd: function (currentIndex) {
    //    $("#currentIndex").val(currentIndex);
    //    $("#frmSearch").attr("method", "POST");
    //    $("#frmSearch").attr("action", "/Kvina/Kvina/Add?menuSeq=" + $('#CurrentMenuSeq').val());
    //    $("#frmSearch").submit();

    //    return false;
    //},
    //RemoveAll: function (items) {
    //    $.ajax({
    //        type: "POST",
    //        url: "/Kvina/Kvina/RemoveAll?menuSeq=" + $('#CurrentMenuSeq').val(),
    //        data: { "items": items },
    //        success: function (data) {
    //            if (data.IsSuccess) {
    //                confirm(CommonMsg.DeleteAfterMsg);
    //                NoticeIndex.GetList($("#currentIndex").val());
    //            }
    //            else {
    //                alert(data.Msg);
    //                if (data.Redirect.length !== 0) {
    //                    window.location = data.Redirect;
    //                }
    //            }
    //        }
    //    });

    //    return false;
    //}

}



