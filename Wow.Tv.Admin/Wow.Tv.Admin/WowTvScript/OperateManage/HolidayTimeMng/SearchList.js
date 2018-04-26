$(document).ready(function () {
    if (totalDataCount > 0) {
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "HolidayTimeMngIndex.SearchList"));
    }
});