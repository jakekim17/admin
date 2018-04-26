
var MenuManageSearchBoardList = {
    SelectBoard: function (boardSeq, boardName) {
        MenuManageEdit.SelectBoard(boardSeq, boardName);

        $("#divSearchContent").html("");
        $("#divSearchContent").modal("hide");

        return false;
    }
}


$(document).ready(function () {
    $("#divSearchBoard_divPaging").html(cfGetPagingHtml(divSearchBoard_totalDataCount, $("#divSearchBoard_currentIndex").val(), $("#divSearchBoard_pageSize").val(), "MenuManageSearchBoard.SearchList"));
    
});

