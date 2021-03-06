﻿$(document).ready(function () {

    $("#btnSearch").click(function () {

        if (!($("select[name=SearchType]").val() === "ALL")) {
            if (!window.co.validation("#txtSearch", AlertMsg.KeyWordisNotMsg)) {
                $("#txtSearch").focus();
                return false;
            }
        }

        if ($("#txtStartDate").val().length === 0 || $("#txtEndDate").val().length === 0) {
            alert("검색일을 입력하세요.");
            return false;
        }

        var startDate = $("#txtStartDate").val();
        var endDate = $("#txtEndDate").val();

        if (dateDiff(startDate, endDate) < 0) {
            alert("시작날짜와 종료날짜를 확인하세요.");
            return false;
        }

        if (dateDiff(startDate, endDate) > 365) {
            alert("1년 이상 검색을 할 수 없습니다.");
            return false;   
        }

        Article.GetList(0);

        return false;
    });

    // 두개의 날짜를 비교하여 차이를 알려준다.
    function dateDiff(_date1, _date2) {
        var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

        diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
        diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());

        var diff = diffDate_2.getTime() - diffDate_1.getTime();
        if (diff > 0) {
            diff = Math.floor(diff / (1000 * 3600 * 24));
        }
        else {
            diff = Math.ceil(diff / (1000 * 3600 * 24));
        }
        return diff;
    }

    $("#frmSearch").keydown(function () {
        if (event.keyCode === 13) {
            $("#btnSearch").click();
            return false;
        }
    });


    //검색 1주일
    $("#OneWeekTerm").click(function () {

        //검색 종료일
        $("#txtEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#txtStartDate").val(SetAddDay($("#txtEndDate").val(), -7));

        return false;
    });

    //검색 2주일
    $("#TwoWeekTerm").click(function () {

        //검색 종료일
        $("#txtEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#txtStartDate").val(SetAddDay($("#txtEndDate").val(), -14));

        return false;
    });

    //검색 1달
    $("#OneMonthTerm").click(function () {

        //검색 종료일
        $("#txtEndDate").val(new Date().format("yyyy-MM-dd"));

        //검색 시작일
        $("#txtStartDate").val(SetAddMonth($("#txtEndDate").val(), -1));

        return false;
    });

    
    ////검색 종료일
    //$("#txtEndDate").val(new Date().format("yyyy-MM-dd"));

    ////검색 시작일
    //$("#txtStartDate").val(SetAddMonth($("#txtEndDate").val(), -3));

    //검색 시작일 일자 체크
    $("#txtStartDate").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    //검색 종료일 일자 체크
    $("#txtEndDate").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    //$("#btnTest").click(function () {
    //    Article.GoogleStatisticsBind("#btnSearch", "86739186");

    //    return false;
    //});

    //검색어
    $("#txtSearch").keypress(function (event) {
        if (event.which === 13) {
            $('#btnSearch').click();
        }
    });

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "Article.GetList"));


    //Dropdownlist Selectedchange event  
    $("#DeptCD").change(function () {
        $("#cboFreelancerID").empty();

        if ($("#DeptCD").val() === $("#DeptCD option:last").val()) {
            Article.CodeBind();
        } else {
            $("#cboFreelancerID").hide();
        }
        return false;
    });

    var pcViewId = $("#DeptCD option:selected").attr("pc-viewId");
    if (freelancerID.length > 0) {
        Article.CodeBind(function () {
            var freelancerPcViewId = $("#cboFreelancerID option:selected").attr("pc-viewId");
            Article.GoogleStatisticsBind(freelancerPcViewId, 4);
            var freelancerMobileViewId = $("#cboFreelancerID option:selected").attr("mobile-viewId");
            Article.GoogleStatisticsBind(freelancerMobileViewId, 5);
        });

    } else {
        Article.GoogleStatisticsBind(pcViewId, 4);
        var mobileViewId = $("#DeptCD option:selected").attr("mobile-viewId");
        Article.GoogleStatisticsBind(mobileViewId, 5);
    }
});



var Article = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/NewsCenter/Stats/Article?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    CodeBind: function (callback) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/GetCommonCode?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            success: function (codes) {
                if (codes.codeList.length > 1) {
                    $("#cboFreelancerID").show();
                    $.each(codes.codeList,
                        function (i, code) {
                            if (code.CODE_VALUE1 === freelancerID) {
                                $("#cboFreelancerID").append('<option selected="selected" pc-viewId="' + code.CODE_VALUE2 + '" mobile-viewId="' + code.CODE_VALUE3+'"  value="' + code.CODE_VALUE1 + '">' + code.CODE_NAME + "</option>");
                            } else {
                                $("#cboFreelancerID").append('<option  pc-viewId="' + code.CODE_VALUE2 + '" mobile-viewId="' + code.CODE_VALUE3 + '"  value="' + code.CODE_VALUE1 + '">' + code.CODE_NAME + "</option>");
                            }

                        });
                    if (typeof callback !== "undefined") {
                        callback();
                    }
                } else {
                    $("#cboFreelancerID").hide();
                }
            },
            error: function (ex) {
            }
        });
    },
    //Naver Analytics
    GoNaverAnalytics : function (deptcd) {
        //		alert(deptcd);
        if (deptcd === "D0129")	//블루뉴스
        {
            window.open("http://analytics.naver.com/visit/uv.html?siteId=eb96285020864", "NaverAnalytics", "");
        }
        else if (deptcd === "D0130")	//와우스타
        {
            window.open("http://analytics.naver.com/visit/uv.html?siteId=4b1ecb76a84ee4", "NaverAnalytics", "");
        }
        else if (deptcd === "D0131")	//와우스포츠
        {
            window.open("http://analytics.naver.com/visit/uv.html?siteId=13926f09730b7fc", "NaverAnalytics", "");
        }
        else if (deptcd === "D0135")	//맥심 OLD
        {
            window.open("http://analytics.naver.com/visit/uv.html?siteId=c05c1eb645abcc", "NaverAnalytics", "");
        }
        else if (deptcd === "D0136")	//스타일보
        {
            window.open("http://analytics.naver.com/summary/dashboard.html?siteId=75c208a9573c28", "NaverAnalytics", "");
        }
        else if (deptcd === "D0138")	//휴먼타임즈
        {
            window.open("http://analytics.naver.com/summary/dashboard.html?siteId=ce93fba11a79d0", "NaverAnalytics", "");
        }
        else if (deptcd === "D0137")	//와이미디어-맥심코리아
        {
            window.open("http://analytics.naver.com/summary/dashboard.html?siteId=12af2d85d12ae68", "NaverAnalytics", "");
        }
        else if (deptcd === "D0139")	//반려동물
        {
            alert("반려동물 네이버 애널리틱스 링크 전달받은게 없습니다.");
        }
        else if (deptcd === "D0140")	//크리에이티브뉴스
        {
            alert("크리에이티브뉴스 네이버 애널리틱스 링크 전달받은게 없습니다.");
        }
        else if (deptcd === "D0141")	//디지털머니
        {
            alert('디지털머니 네이버 애널리틱스 링크 전달받은게 없습니다.');
        }
        else {
            window.open("http://analytics.naver.com/visit/uv.html?siteId=3ce8d0e2bfce0c", "NaverAnalytics", "");
        }
    },
    GoView : function (articleid) {
        window.open('http://www.wowtv.co.kr/NewsCenter/News/Read?articleId=' + articleid);    		
    },
    GoogleStatisticsBind: function (viewId,cellIndex) {
       // var viewId = $("#DeptCD option:selected").attr("pc-viewId");

        setTimeout(function () {
            $("#articleList > tbody  > tr").each(function () {
                var artId = $(this).find("td").eq(10).html();
                //console.log(artId);
                authorize($(this).find("td").eq(cellIndex), viewId, $("#txtStartDate").val(), $("#txtEndDate").val(), artId);
            });
        }, 1000); 
    }
}

function authorize(obj, viewId, startDate, endDate, artId) {
    // Handles the authorization flow.
    // `immediate` should be false when invoked from the button click.
    var useImmdiate = true;

    var authData = {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: useImmdiate
    };

    gapi.auth.authorize(authData, function (response) {
        if (response.error) {
            if (typeof (viewId) === "undefined" || viewId === null) {
                obj.html("viewId 필요");  
            } else {
                obj.html("인증필요");  
            }
        }
        else {
            obj.html("불러오는 중");
            queryReports(obj, viewId, startDate, endDate, artId);
        }
    });

}



function queryReports(obj, viewId, startDate, endDate, artId) {

    // Load the API from the client discovery URL.
    gapi.client.load(DISCOVERY
    ).then(function () {
        // Call the Analytics Reporting API V4 batchGet method.
        gapi.client.analyticsreporting.reports.batchGet({
                "reportRequests": [
                    {
                        "viewId": viewId,
                        "dateRanges": [
                            {
                                "startDate": startDate,
                                "endDate": endDate
                            }],
                        "metrics": [
                            {
                                "expression": "ga:Pageviews"
                            }],
                        "filtersExpression": "ga:pagePath=~" + artId

                    }]

        }).then(function (response) {
                var parse = JSON.parse(response.body);
                var views = "" + parse.reports[0].data.totals[0].values[0];
                console.log(views);
                $(obj).html(comma(views));
                //$(obj).text(comma(views));
            })
            .then(null, function (err) {
                // Log any errors.
                console.log(err);
            });
    });
}



