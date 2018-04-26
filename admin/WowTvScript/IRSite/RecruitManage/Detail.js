var RecruitManageDetail = {
    GoIndex: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/IRSite/RecruitManage/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frm").submit();
    }
};

$(document).click(function () {
    $('#btnGoIndex').click(function () {
        RecruitManageDetail.GoIndex();
    });
});