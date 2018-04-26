/**************************************************************************
 * 페이징 처리 HTML을 가져온다.
 * 
 * @param String totalCnt       : 전체 레코드 수
 * @param String startRowNo     : 시작 레코드 번호
 * @param String pageSize       : 한번에 보여줄 레코드 개수
 * @param String getListFncName : 다른 페이지로 이동할때 호출될 메소드명
 *                                페이지번호 클릭 시 이 메소드에 시작레코드 번호가
 *                                넘어온다.
 * @returns String htmlStr      : 페이징 처리 영역에 들어갈 html
***************************************************************************/
function cfGetPagingHtml(totalCnt, startRowNo, pageSize, getListFncName) {

    var iTotalCnt = parseInt(totalCnt + "");
    var iStartRowNo = parseInt(startRowNo + "");
    var iPageSize = parseInt(pageSize + "");

    var htmlStr = "";       //반환할 페이징 처리 html
    var displyPageCnt = 10; //화면에 보여줄 페이지 번호 개수(<<1 2 3 4 5 6 7 8 9 10 >> 일때 10개)
    var totalPageCnt = 0;   //전체 페이지 수
    var currentPageNo = 0;  //현재 페이지 번호
    var pageGroupStart = 0; //화면에 보이는  페이지 번호 목록 중 첫번째 번호
    var pageGroupEnd = 0;   //화면에 보이는  페이지 번호 목록 중 마지막 번호
    var preStartRowNo = 0;  //이전 10개 눌렀을 경우 첫번째 페이지 번호
    var nextStartRowNo = 0; //다음 10개 눌렀을 경우 첫번째 페이지 번호

    //전체 페이지 수 계산
    totalPageCnt = Math.floor(iTotalCnt / iPageSize);
    if ((iTotalCnt % iPageSize) > 0) {
        totalPageCnt++;
    }

    //현재 페이지 번호 계산
    currentPageNo = Math.floor(iStartRowNo / iPageSize);
    if (currentPageNo == 0) {
        currentPageNo = 1;
    } else {
        currentPageNo++;
    }

    //화면에 보이는  페이지 번호 목록 중 첫번째 번호 계산
    if (currentPageNo % displyPageCnt == 0) {
        pageGroupStart = ((Math.floor(currentPageNo / displyPageCnt)) * displyPageCnt) - displyPageCnt + 1;
    } else {
        pageGroupStart = (Math.floor(currentPageNo / displyPageCnt)) * displyPageCnt + 1;
    }

    //화면에 보이는  페이지 번호 목록 중 마지막 번호 계산
    pageGroupEnd = pageGroupStart + displyPageCnt - 1;
    if (totalPageCnt < pageGroupEnd) {
        pageGroupEnd = totalPageCnt;
    }

    //이전 10개 눌렀을 경우 첫번째 페이지 번호
    preStartRowNo = (Math.floor(iStartRowNo / (iPageSize * displyPageCnt))) * (iPageSize * displyPageCnt) - iPageSize;

    //다음 10개 눌렀을 경우 첫번째 페이지 번호
    nextStartRowNo = (Math.floor(iStartRowNo / (iPageSize * displyPageCnt))) * (iPageSize * displyPageCnt) + (iPageSize * displyPageCnt);

    htmlStr += "<table class=\"table tb-num\">";
    htmlStr += "<tr>";
    htmlStr += "<td class=\"al-c\">";

    htmlStr += "<button onclick=\"return " + getListFncName + "(0);\"><i class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></i></button>";
    //htmlStr += "<a href=\"#\" class=\"page_btn page_first_btn\" onclick=\"return " + getListFncName + "(0);\"><img onmouseover=\"ImageOver(this)\" onmouseout=\"ImageOut(this)\" src=\"/images/common/pagenation_left2.png\" alt=\"맨 앞으로 가기\" /></a>";

    if (preStartRowNo >= 0) {
        //htmlStr += "<a class=\"direction prev\" href=\"javascript:" + getListFncName + "('" + preStartRowNo + "');\"><span></span> 이전</a>";

        htmlStr += "<button onclick=\"return " + getListFncName + "('" + preStartRowNo + "');\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></button>";
        //htmlStr += "<a class=\"page_btn prev_btn\" href=\"#\" onclick=\"return " + getListFncName + "('" + preStartRowNo + "');\"><img onmouseover=\"ImageOver(this)\" onmouseout=\"ImageOut(this)\" src=\"/images/common/pagenation_left1.png\" alt=\"앞으로 가기\" /></a>";

    }

    for (var i = pageGroupStart; i <= pageGroupEnd; i++) {
        if (i == currentPageNo) {
            htmlStr += "<span class=\"cho\">" + i + "</span>";
            //htmlStr += "<a class=\"page_num on\">" + i + "</a>";
        } else {
            //htmlStr += " <a href=\"javascript:" + getListFncName + "('"+(i * iPageSize - iPageSize)+"');\">"+ i + "</a> ";

            htmlStr += "<span onclick=\"return " + getListFncName + "('" + (i * iPageSize - iPageSize) + "');\">" + i + "</span>";
            //htmlStr += " <a class=\"page_num\" href=\"#\" onclick=\"return " + getListFncName + "('" + (i * iPageSize - iPageSize) + "');\">" + i + "</a> ";
        }

    }

    if (totalPageCnt > currentPageNo && totalPageCnt > pageGroupEnd) {
        //htmlStr += "<a class=\"direction next\" href=\"javascript:" + getListFncName + "('" + nextStartRowNo + "');\">다음 <span></span></a>";

        htmlStr += "<button onclick=\"return " + getListFncName + "('" + nextStartRowNo + "');\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></button>";
        //htmlStr += "<a class=\"page_btn next_btn\" href=\"#\" onclick=\"return " + getListFncName + "('" + nextStartRowNo + "');\"><img onmouseover=\"ImageOver(this)\" onmouseout=\"ImageOut(this)\" src=\"/images/common/pagenation_right1.png\" alt=\"다음으로 가기\" /></a>";
    }

    //htmlStr += "<a href=\"#\" class=\"page_btn page_end_btn\" onclick=\"return " + getListFncName + "('" + (totalPageCnt - 1) + "');\"><img onmouseover=\"ImageOver(this)\" onmouseout=\"ImageOut(this)\" src=\"/images/common/pagenation_right2.png\" alt=\"맨 뒤로 가기\" /></a>";
    //var lastPage = 0;
    //for (var i = 0; i < totalPageCnt; i = i + pageSize) {
    //    lastPage = lastPage + pageSize;
    //}
    //if (lastPage > 0) {
    //    lastPage = lastPage - pageSize;
    //}
    //htmlStr += "<a href=\"#\" class=\"page_btn page_end_btn\" onclick=\"return " + getListFncName + "('" + (lastPage) + "');\"><img onmouseover=\"ImageOver(this)\" onmouseout=\"ImageOut(this)\" src=\"/images/common/pagenation_right2.png\" alt=\"맨 뒤로 가기\" /></a>";

    htmlStr += "<button onclick=\"return " + getListFncName + "('" + ((totalPageCnt - 1) * iPageSize) + "');\"><i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></button>";

    htmlStr += "</td>";
    htmlStr += "</tr>";
    htmlStr += "</table>";

    if (totalCnt == 0) {
        htmlStr = "";
    }
    return htmlStr;

}


