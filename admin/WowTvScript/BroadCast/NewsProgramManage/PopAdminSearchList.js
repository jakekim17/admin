
var SelectedAdmin = {
    AdminSeq: 0,
    AdminName: ""
};


var PopAdminSearchList = {
    Apply: function () {
        if ($("#divSearchAdmin_tblList").find("[name='seqList']:checked").length == 0) {
            alert("관리자를 선택하여 주십시오.");
            return false;
        }

        var selectedAdminList = new Array();
        $.each($("#divSearchAdmin_tblList").find("[name='seqList']:checked"), function (index, item) {
            var selectedAdmin = {};
            selectedAdmin.AdminSeq = $(item).val();
            selectedAdmin.AdminName = $(item).next().val();
            
            selectedAdminList.push(selectedAdmin);
        });


        if (typeof AdminSelectApply == "function") {
            AdminSelectApply(selectedAdminList);
        }
        else {
            alert("AdminSelectApply 함수가 선언되지 않았습니다.");
        }


        return false;
    }
};


$(document).ready(function () {

    $("#divSearchAdmin_divPaging").html(cfGetPagingHtml(divSearchAdmin_totalDataCount, $("#divSearchAdmin_currentIndex").val(), $("#divSearchAdmin_pageSize").val(), "PopAdminSearch.SearchList"));


    $("#divSearchAdmin_chAll").change(function () {
        $("#divSearchAdmin_tblList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

        return false;
    });


    $("#divSearchAdmin_btnApply").click(function () {
        PopAdminSearchList.Apply();

        return false;
    });

});

