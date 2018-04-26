

$(document).ready(function () {
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "AdminLogIndex.SearchList"));


});
