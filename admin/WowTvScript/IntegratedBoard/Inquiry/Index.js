$(document).ready(function() {

    $("#btnSearch").click(function () {

        if (!($("select[name=SearchType]").val() === "ALL")) {
            if (!window.co.validation("#txtSearch", AlertMsg.KeyWordisNotMsg)) {
                $("#txtSearch").focus();
                return false;
            }
        }

        InquiryIndex.GetList(0);

        return false;
    });


    $("#frmSearch").keydown(function() {
        if (event.keyCode === 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnCreate").click(function() {
        InquiryIndex.GoEdit(0);

        return false;
    });


    $("#btnAdd").click(function() {
        InquiryIndex.GoAdd($("#currentIndex").val());

        return false;
    });

    $("#btnDelete").click(function() {

        var checkItems = new Array();

        for (var i = 1; i < $("table tr").size(); i++) {
            var chk = $("table tr").eq(i).children().find("input[type=\"checkbox\"]").is(":checked");
            if (chk == true) {
                checkItems.push($('table tr').eq(i).find("td").eq(1).text());
            }
        }

        if (checkItems.length == 0) {
            confirm("선택 항목이 없습니다.");
            return false;
        }


        if (confirm(CommonMsg.DeleteConfirmMsg)) {
            InquiryIndex.RemoveAll(checkItems);
        }
        return false;
    });

        //전체선택 체크박스 클릭 
    $("#allCheck").click(function() {
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

    //Dropdownlist Selectedchange event  
    //$("#cboUP_COMMON_CODE").change(function() {
    //    $("#cboCOMMON_CODE").empty();
    //    InquiryIndex.CodeBind();
       
    //    return false;
    //});
    $("#cboCommonCode1").change(function () {
        InquiryIndex.CodeBind($(this).val(), 2);

        return false;
    });
    //$("#cboCommonCode2").change(function () {
    //    InquiryIndex.CodeBind($(this).val(), 3);

    //    return false;
    //});

    InquiryIndex.CodeBind($("#cboCommonCode1").val(), 2);

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "InquiryIndex.GetList"));

});



var InquiryIndex = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/Inquiry/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();
        return false;
    },
    GoEdit: function (seq) {
        $("#seq").val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/Inquiry/Edit?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    GoAdd: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntegratedBoard/Inquiry/Add?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    CodeBind: function (upCommonCode, depth) {
        $("#cboCommonCode" + depth).hide();
        $("#cboCommonCode" + depth).find("option").remove();
        if (upCommonCode != "ALL") {
            $.ajax({
                type: "POST",
                url: "/IntegratedBoard/Inquiry/GetCommonCode?currentMenuSeq=" + $('#hidCurrentMenuSeq').val(),
                data: { upCommonCode: upCommonCode },
                success: function (data) {
                    //$("#cboCommonCode" + depth).append('<option value="ALL">전체</option>');
                    $("#cboCommonCode" + depth).show();
                    $.each(data.codeList, function (i, code) {
                        if (code.COMMON_CODE === $("#hidCommonCode" + depth).val()) {
                            $("#cboCommonCode" + depth).append('<option selected="selected" value="' + code.COMMON_CODE + '">' + code.CODE_NAME + "</option>");
                        } else {
                            $("#cboCommonCode" + depth).append('<option value="' + code.COMMON_CODE + '">' + code.CODE_NAME + "</option>");
                        }
                    });
                },
                error: function (ex) {
                }
            });
        }
    },
    RemoveAll: function (items) {
        $.ajax({
            type: "POST",
            url: "/IntegratedBoard/Inquiry/RemoveAll?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "items": items },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    InquiryIndex.GetList($("#currentIndex").val());
                }
                else {
                    alert(data.Msg);
                    if (data.Redirect.length !== 0) {
                        window.location = data.Redirect;
                    }
                }
            }
        });

        return false;
    }
    
}



