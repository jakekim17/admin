
var NewsMainManageIndex = {

    //뉴스 스탠드 송출시간 업데이트
    NewsStandManageUpdateTime: function () {

        var newsStandManualCount = parseInt($("#newsStandManualCount").val());      //설정할 개수
        var newsStandConfgiCount = parseInt($("#tbodyNewsStandList > tr").length);  //설정된 개수
        
        if (newsStandManualCount != newsStandConfgiCount) {

            alert("설정된 메인 노출순위 개수를 확인하세요.");
        }
        else {
            if (confirm("뉴스 스탠드 송출시간을 업데이트 하시겠습니까?")) {
                $.ajax({
                    type: "POST",
                    url: "/NewsCenter/NewsMainManage/NewsStandManageUpdateTime",
                    data: { "menuSeq": currentMenuSeq },
                    success: function (data, textStatus) {

                        if (data.IsSuccess == true) {

                            alert("송출시간을 업데이트 했습니다. 송출시간(" + data.Msg + ")");

                            $("#lblNewsStandTime").html(data.Msg);
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
        }
    },
    //뉴스 메인 리스트
    NewsManageList: function (currentIndex) {       

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();
        else { $("#currentIndex").val(currentIndex); }

        currentIndex = parseInt(currentIndex)
        var pageSize = parseInt($("#PageSize").val());
        var currentPageNo = Math.floor(currentIndex / pageSize);

        if (currentPageNo == 0) {
            currentPageNo = 1;
        } else {
            currentPageNo++;
        }

        $("#Page").val(currentPageNo);

        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsMainManage/NewsMainList?menuSeq=" + currentMenuSeq,
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#tbodyNewsList").html(data);

                NewsMainManageIndex.NewsManageListPagingHtml(currentIndex);
            }
        });
        //return false;
    },
    //페이징
    NewsManageListPagingHtml: function (currentIndex) {
     
        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();

        var pageSize = parseInt($("#PageSize").val());
        var totalDataCount = parseInt($("#totalDataCount").val());

        if (totalDataCount == 0) {
            $("#divPaging").html("");
        }
        else {
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "NewsMainManageIndex.NewsManageList"));
        }
    },
    //뉴스 스탠드 리스트
    NewsStandManageList: function () {

        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsMainManage/NewsStandList?menuSeq=" + currentMenuSeq,
            data: {},
            success: function (data, textStatus) {
                
                $("#tbodyNewsStandList").html(data);
            }
        });
        //return false;
    },
    //뉴스 스탠드 가제목 관리
    NewsStandManageView: function () {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsMainManage/NewsStandManage?menuSeq=" + currentMenuSeq,
            data: { },
            success: function (data, textStatus) {
                
                $("#divModalView").html(data);
                $("#divModalView").modal("show");
            }
        });
        //return false;
    },
    //관련기사 노출 관리
    NewsRelationManageView: function () {
        
        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsMainManage/NewsRelationManage?menuSeq=" + currentMenuSeq,
            data: {},
            success: function (data, textStatus) {

                $("#divModalRelationView").html(data);
                $("#divModalRelationView").modal("show");
            }
        });
        //return false;
    }
}


$(document).ready(function () {

    //출처 변경
    $("#SearchComp").change(function () {

        //alert($(this).val());
        $("#SearchDept option:eq(0)").attr("selected", "selected");

        //출처 와우뉴스일때 연예뉴스 선택가능
        if ($(this).val() == "WO") {

            $("#SearchDept").removeAttr("disabled"); 
        }
        else {

            $("#SearchDept").attr("disabled", "true");
        }
    });

    //검색 1주일
    $("#OneWeekTerm").click(function() {
        
        //검색 종료일
        $("#SearchEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#SearchStartDate").val(SetAddDay($("#SearchEndDate").val(), -7));

        return false;
    });

    //검색 2주일
    $("#TwoWeekTerm").click(function () {

        //검색 종료일
        $("#SearchEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#SearchStartDate").val(SetAddDay($("#SearchEndDate").val(), -14));

        return false;
    });

    //검색 1달
    $("#OneMonthTerm").click(function () {

        //검색 종료일
        $("#SearchEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#SearchStartDate").val(SetAddMonth($("#SearchEndDate").val(), -1));

        return false;
    });


    //검색 시작일 종료일 Datepicker
    /*
    $("#dtStartDate").datepicker({
        format: "yyyy-mm-dd",
        language: "kr"
    }).on("changeDate", function (ev) {
        $("#SearchStartDate").val($("#dtStartDate").data("date"));
        $("#dtStartDate").datepicker("hide");
    });

    $("#dtEndDate").datepicker({
        format: "yyyy-mm-dd",
        language: "kr"
    }).on("changeDate", function (ev) {
        $("#SearchEndDate").val($("#dtEndDate").data("date"));
        $("#dtEndDate").datepicker("hide");
    });
    */

    //검색 종료일
    $("#SearchEndDate").val(new Date().format("yyyy-MM-dd"));

    //검색 시작일
    $("#SearchStartDate").val(SetAddDay($("#SearchEndDate").val(), -1));

    //검색 시작일 일자 체크
    $("#SearchStartDate").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    //검색 종료일 일자 체크
    $("#SearchEndDate").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    //뉴스 스탠드 가제목 관리
    $("#btnNewsStandManageView").click(function () {

        NewsMainManageIndex.NewsStandManageView();
        return false;
    });

    //검색어
    $('#SearchText').keypress(function (event) {
        if (event.which == 13) {
            $('#btnSearch').click();
            return false;
        }
    });

    //검색 버튼
    $("#btnSearch").click(function () {

        if ($("#SearchStartDate").val().length == 0 || $("#SearchEndDate").val().length == 0)
        {
            alert("검색일을 입력하세요.");
            return false;
        }

        var startDate = $("#SearchStartDate").val();
        var endDate = $("#SearchEndDate").val();

        var startDateArr = startDate.split('-');
        var endDateArr = endDate.split('-');

        //var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1]), startDateArr[2]);
        //var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1]), endDateArr[2]);
        var startDateCompare = parseInt(startDateArr[0] + parseInt(startDateArr[1]) + startDateArr[2]);
        var endDateCompare = parseInt(endDateArr[0] + parseInt(endDateArr[1]) + endDateArr[2]);
      
        //if (startDateCompare.getTime() > endDateCompare.getTime()) {
        if (startDateCompare > endDateCompare) {
            alert("시작날짜와 종료날짜를 확인하세요.");
            return false;
        }

        //Page Reset
        $("#currentIndex").val(1);

        //뉴스 메인 리스트
        NewsMainManageIndex.NewsManageList();

        return false;
    });

    //뉴스 스탠드 송출시간 업데이트
    $("#btnNewsStandTime").click(function () {

        NewsMainManageIndex.NewsStandManageUpdateTime();
        return false;
    });

    //관련뉴스 노출 설정
    $("#btnRelationManage").click(function () {
        
        NewsMainManageIndex.NewsRelationManageView();
        return false;
    });

    //뉴스 스탠드 Ajax 리스트
    NewsMainManageIndex.NewsStandManageList();

    //뉴스 메인 Ajax 리스트
    NewsMainManageIndex.NewsManageList();
});



