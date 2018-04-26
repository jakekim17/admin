
var MenuManageSearchBusinessList = {
    SelectBusiness: function (boardSeq, boardName) {
        MenuManageEdit.SelectBusiness(boardSeq, boardName);

        $("#divSearchContent").html("");
        $("#divSearchContent").modal("hide");

        return false;
    }
}


$(document).ready(function () {
    $("#divSearchBusiness_divPaging").html(cfGetPagingHtml(divSearchBusiness_totalDataCount, $("#divSearchBusiness_currentIndex").val(), $("#divSearchBusiness_pageSize").val(), "MenuManageSearchBusiness.SearchList"));

});

