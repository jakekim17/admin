
var GoogleTraffic = {
    GoogleApi_WowTvBind: function () {
        gapi.auth.authorize(GoogleTraffic.AuthData, function (response) {
            if (response.error) {
                $("#tdGoogleApi_WowTv").text("인증필요");
            }
            else {
                $("#tdGoogleApi_WowTv").text("불러오는 중");

                var reportRequests = {
                    "viewId": "86739186",
                    "dateRanges": [
                        {
                            "startDate": $("#txtStartDate").val(),
                            "endDate": $("#txtEndDate").val()
                        }
                    ],
                    "metrics": [
                        {
                            "expression": "ga:entrances"
                        }
                    ]
                };

                GoogleTraffic.QueryReportsCallback(reportRequests, function (result) {

                    var views = "" + result.reports[0].data.totals[0].values[0];
                    $("#tdGoogleApi_WowTv").text(comma(views));
                });
            }
        });
    },
    GoogleApi_WowTvMobileBind: function () {
        gapi.auth.authorize(GoogleTraffic.AuthData, function (response) {
            if (response.error) {
                $("#tdGoogleApi_WowTv_Mobile").text("인증필요");
            }
            else {
                $("#tdGoogleApi_WowTv_Mobile").text("불러오는 중");

                var reportRequests = {
                    "viewId": "86751131",
                    "dateRanges": [
                        {
                            "startDate": $("#txtStartDate").val(),
                            "endDate": $("#txtEndDate").val()
                        }
                    ],
                    "metrics": [
                        {
                            "expression": "ga:entrances"
                        }
                    ]
                };

                GoogleTraffic.QueryReportsCallback(reportRequests, function (result) {

                    var views = "" + result.reports[0].data.totals[0].values[0];
                    $("#tdGoogleApi_WowTv_Mobile").text(comma(views));
                });
            }
        });
    },
    DateDiff: function (_date1, _date2) { // 두개의 날짜를 비교하여 차이를 알려준다.
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
    },
    PagePrint: function () {

        $("#divGooglePrint").print({
            globalStyles: true,
            mediaPrint: false,
            stylesheet: true,
            noPrintSelector: ".no-print",
            iframe: false,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred(),
            timeout: 750,
            title: "주간 트래픽 보고",
            doctype: '<!doctype html>'
        });
        return true;
    },
    PresentMemberBind: function () {

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/SearchPresentMember?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { startDateTime: $("#txtStartDate").val(), endDateTime: $("#txtEndDate").val() },
            success: function (data) {
                $("#divPresentMember").html("");
                $("#divPresentMember").html(data);
            }
        });
        return false;
    },
    ReportCountBind: function () {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/GetReportCount?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { startDateTime: $("#txtStartDate").val(), endDateTime: $("#txtEndDate").val() },
            success: function (data) {
                if (data.IsSuccess) {
                    $("#spanReportCount").html(data.reportCount);
                } else {
                    $("#spanReportCount").html("0");
                }
            }
        });
        return false;
    },
    SaveRank: function () {

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/SaveTrafficRank?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { rank: $("#txtRank").val() },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                }
                else {
                    alert(data.Msg);
                }
            }
        });
        return false;
    },
    ArticleTop10Bind: function () {
        gapi.auth.authorize(GoogleTraffic.AuthData, function (response) {
            $("#tbody-top10").empty();
            var tdArtTotal = document.getElementById("tdArtTotal");
            if (response.error) {
                tdArtTotal.textContent = "인증 필요";
                //$(obj).text("인증필요");
            }
            else {
                tdArtTotal.textContent = "불러오는 중";
                var reportRequests = {
                    "viewId": "86739186",
                    "dateRanges": [
                        {
                            "startDate": $("#txtStartDate").val(),
                            "endDate": $("#txtEndDate").val()
                        }
                    ],
                    "metrics": [
                        {
                            "expression": "ga:pageviews"
                        }
                    ],
                    "dimensions": [
                        { "name": "ga:pagePath" },
                        { "name": "ga:pageTitle" }
                    ],
                    "orderBys": [
                        {
                            "fieldName": "ga:pageviews",
                            "sortOrder": "DESCENDING"
                        }
                    ],
                    "filtersExpression": "ga:pagePath=~articleId",
                    "pageSize": 10,
                    "pageToken": "0"
                }

                GoogleTraffic.QueryReportsCallback(reportRequests, function (result) {
                    var totalPageViews = 0;

                    result.reports[0].data.rows.forEach(function (value, index) {
                        var title = value.dimensions[1];
                        var link = value.dimensions[0];
                        var pageViews = value.metrics[0].values.toString();
                        var topTbody = document.getElementById("tbody-top10");
                        var row = topTbody.insertRow(topTbody.rows.length); // 하단에 추가
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);

                        cell1.innerHTML = index + 1;
                        //TODO:나중에 도메인명 변경!
                        var innerHtml = "<a target='_blank' href ='http://www.wowtv.co.kr" + link + "';'><span>" + title + "</span></a> ";
                        cell2.innerHTML = innerHtml;
                        cell2.className = "text-left";

                        cell3.innerHTML = "불러오는 중";

                        /*
                        var artid = "";
                        
                        var re1 = ".*?";
                        var re2 = "(?:[a-z][a-z]*[0-9]+[a-z0-9]*)";
                        var re3 = ".*?";
                        var re4 = "((?:[a-z][a-z]*[0-9]+[a-z0-9]*))";

                        var p = new RegExp(re1 + re2 + re3 + re4, ["i"]);
                        var m = p.exec(link);
                        if (m != null) {
                            var alphanum1 = m[1];
                            artid = alphanum1.replace(/</, "&lt;");
                        }
                        
                        console.log("artid :" + artid);
                        */
                        var articleId = $.urlParam(link, 'articleId');
                        //console.log("articleId :" + articleId);

                        $.ajax({
                            type: "POST",
                            url: "/NewsCenter/Stats/GetArtIdbyWriter?menuSeq=" + $("#hidCurrentMenuSeq").val(),
                            data: { "artId": articleId },
                            success: function (data) {
                                if (data.IsSuccess) {
                                    cell3.innerHTML = ((data.writer === null) ? "-" : data.writer);
                                } else {
                                    cell3.innerHTML = "-";
                                }
                            }
                        });
                        cell4.innerHTML = comma(pageViews);

                        totalPageViews = +totalPageViews + +pageViews;
                    });

                    //span.textContent = totalPageViews.toString();
                    tdArtTotal.innerHTML = comma(totalPageViews.toString());
                });
            }
        });
    },
    ArticleTop10MobileBind: function () {
        gapi.auth.authorize(GoogleTraffic.AuthData, function (response) {
            $("#tbody-Mobile-top10").empty();
            var tdArtMobileTotal = document.getElementById("tdArtMobileTotal");
            if (response.error) {
                tdArtMobileTotal.textContent = "인증 필요";
                //$(obj).text("인증필요");
            }
            else {
                tdArtMobileTotal.textContent = "불러오는 중";
                var reportRequests = {
                    "viewId": "86751131",
                    "dateRanges": [
                        {
                            "startDate": $("#txtStartDate").val(),
                            "endDate": $("#txtEndDate").val()
                        }
                    ],
                    "metrics": [
                        {
                            "expression": "ga:pageviews"
                        }
                    ],
                    "dimensions": [
                        { "name": "ga:pagePath" },
                        { "name": "ga:pageTitle" }
                    ],
                    "orderBys": [
                        {
                            "fieldName": "ga:pageviews",
                            "sortOrder": "DESCENDING"
                        }
                    ],
                    "filtersExpression": "ga:pagePath=~articleId",
                    "pageSize": 10,
                    "pageToken": "0"
                }

                GoogleTraffic.QueryReportsCallback(reportRequests, function (result) {
                    var totalPageViews = 0;

                    result.reports[0].data.rows.forEach(function (value, index) {
                        var title = value.dimensions[1];
                        var link = value.dimensions[0];
                        var pageViews = value.metrics[0].values.toString();
                        var topTbody = document.getElementById("tbody-Mobile-top10");
                        var row = topTbody.insertRow(topTbody.rows.length); // 하단에 추가
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);

                        cell1.innerHTML = index + 1;
                        //TODO:나중에 도메인명 변경!
                        var innerHtml = "<a target='_blank' href ='http://m.wowtv.co.kr" + link + "';'><span>" + title + "</span></a> ";
                        cell2.innerHTML = innerHtml;
                        cell2.className = "text-left";

                        cell3.innerHTML = "불러오는 중";
                        /*
                        var artid = "";
                        var re1 = ".*?";
                        var re2 = "(?:[a-z][a-z]*[0-9]+[a-z0-9]*)";
                        var re3 = ".*?";
                        var re4 = "((?:[a-z][a-z]*[0-9]+[a-z0-9]*))";

                        var p = new RegExp(re1 + re2 + re3 + re4, ["i"]);
                        var m = p.exec(link);
                        if (m != null) {
                            var alphanum1 = m[1];
                            artid = alphanum1.replace(/</, "&lt;");
                        }
                        console.log("artid :" + artid);
                        */
                        var articleId = $.urlParam(link, 'articleId');
                        //console.log("articleId :" + articleId);

                        $.ajax({
                            type: "POST",
                            url: "/NewsCenter/Stats/GetArtIdbyWriter?menuSeq=" + $("#hidCurrentMenuSeq").val(),
                            data: { "artId": articleId },
                            success: function (data) {
                                if (data.IsSuccess) {
                                    cell3.innerHTML = ((data.writer === null) ? "-" : data.writer);
                                } else {
                                    cell3.innerHTML = "-";
                                }
                            }
                        });
                        cell4.innerHTML = comma(pageViews);

                        totalPageViews = +totalPageViews + +pageViews;
                    });

                    //span.textContent = totalPageViews.toString();
                    tdArtMobileTotal.innerHTML = comma(totalPageViews.toString());
                });
            }
        });
    },
    MenuTrafficBind: function () {

        $("#tbody-menu").empty();
        var tdMenuTotalPc = document.getElementById("tdMenuTotalPc");
        var tdMenuTotalMobile = document.getElementById("tdMenuTotalMobile");
        var menuTbody = document.getElementById("tbody-menu");
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/GetMenuJsonResult?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            //data: { artId: artid },
            success: function (result) {
                if (result.IsSuccess) {

                    var totalPcPageViews = 0;
                    var totalMobilePageViews = 0;
                    var callbackPcCount = 0;
                    var callbackMobileCount = 0;

                    result.menuList.forEach(function (value, index, array) {
                        var row = menuTbody.insertRow(menuTbody.rows.length);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        cell1.innerHTML = value.CODE_NAME;
                        cell2.innerHTML = "불러오는 중";
                        cell3.innerHTML = "불러오는 중";
                        tdMenuTotalPc.innerHTML = "불러오는 중";
                        tdMenuTotalMobile.innerHTML = "불러오는 중";
                        var reportPcRequests = {
                            "viewId": value.CODE_VALUE2, //86739186
                            "dateRanges": [
                                {
                                    "startDate": $("#txtStartDate").val(),
                                    "endDate": $("#txtEndDate").val()
                                }
                            ],
                            "metrics": [
                                {
                                    "expression": "ga:pageviews"
                                }
                            ],
                            "filtersExpression": "ga:pagePath=" + value.CODE_VALUE1  
                        }
                        GoogleTraffic.QueryReportsCallback(reportPcRequests, function (result) {
                            callbackPcCount++;

                            if (typeof result.errorName === "undefined") {
                                var totalValue = result.reports[0].data.totals[0].values;
                                cell2.innerHTML = comma(totalValue);
                                totalPcPageViews = +totalPcPageViews + +totalValue;
                            } else {
                                cell2.innerHTML = "-";
                            }

                            if (callbackPcCount === array.length) {
                                tdMenuTotalPc.innerHTML = comma(totalPcPageViews.toString());
                            }
                        });

                        var reportMobileRequests = {
                            "viewId": value.CODE_VALUE3,
                            "dateRanges": [
                                {
                                    "startDate": $("#txtStartDate").val(),
                                    "endDate": $("#txtEndDate").val()
                                }
                            ],
                            "metrics": [
                                {
                                    "expression": "ga:pageviews"
                                }
                            ],
                            "filtersExpression": "ga:pagePath=" + value.CODE_VALUE1 
                        }
                        GoogleTraffic.QueryReportsCallback(reportMobileRequests, function (result) {
                            callbackMobileCount++;

                            if (typeof result.errorName === "undefined") {
                                var totalValue = result.reports[0].data.totals[0].values;
                                cell3.innerHTML = comma(totalValue);
                                totalMobilePageViews = +totalMobilePageViews + +totalValue;
                            } else {
                                cell3.innerHTML = "-";
                            }

                            if (callbackMobileCount === array.length) {
                                tdMenuTotalMobile.innerHTML = comma(totalMobilePageViews.toString());
                            }
                        });

                    });

                } else {
                    alert(result.Msg);
                }
            }
        });
    },
    ArticleTrafficBind: function () {
        $("#tbody-art").empty();
        var tdArtTotalPc = document.getElementById("tdArtTotalPc");
        var tdArtTotalMobile = document.getElementById("tdArtTotalMobile");
        var artTbody = document.getElementById("tbody-art");
        tdArtTotalPc.innerHTML = "불러오는 중";
        tdArtTotalMobile.innerHTML = "불러오는 중";
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/GetArtJsonResult?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            //data: { artId: artid },
            success: function (result) {
                if (result.IsSuccess) {

                    var totalPcPageViews = 0;
                    var totalMobilePageViews = 0;
                    var callbackPcCount = 0;
                    var callbackMobileCount = 0;
                    var callbackFreelancerPcCount = 0;
                    var callbackFreelancerMobileCount = 0;

                    result.menuList.forEach(function (value, index, array) {
                        var row = artTbody.insertRow(artTbody.rows.length);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        cell1.innerHTML = value.CODE_NAME;
                        cell2.innerHTML = "불러오는 중";
                        cell3.innerHTML = "불러오는 중";

                        if (value.CODE_VALUE1 === "045000000") {//프리랜서 트래픽 조회
                            var freelancerTotalViews = 0;
                            var freelancerMobileTotalViews = 0;
                            callbackFreelancerPcCount = 0;
                            result.freelancerList.forEach(function (value, index, array) {

                                var reportPcRequests = {
                                    "viewId": value.CODE_VALUE2,
                                    "dateRanges": [
                                        {
                                            "startDate": $("#txtStartDate").val(),
                                            "endDate": $("#txtEndDate").val()
                                        }
                                    ],
                                    "metrics": [
                                        {
                                            "expression": "ga:pageviews"
                                        }
                                    ]
                                }

                                GoogleTraffic.QueryReportsCallback(reportPcRequests, function (result) {
                                    callbackFreelancerPcCount++;
                                    if (typeof result.errorName === "undefined") {
                                        var totalValue = result.reports[0].data.totals[0].values;
                                        freelancerTotalViews = +freelancerTotalViews + +totalValue;//comma(totalValue);
                                        //totalPcPageViews = +totalPcPageViews + +totalValue;
                                    } else {
                                        cell2.innerHTML = "-";
                                    }

                                    if (callbackFreelancerPcCount === array.length) {
                                        cell2.innerHTML = comma(freelancerTotalViews.toString());
                                        //totalPcPageViews = totalPcPageViews + freelancerTotalViews;
                                        //var artTotalPc = tdArtTotalPc.innerHTML.replace(",", "");

                                        tdArtTotalPc.innerHTML = comma((freelancerTotalViews + totalPcPageViews).toString());
                                    }
                                });


                                var reportMobileRequests = {
                                    "viewId": value.CODE_VALUE3,
                                    "dateRanges": [
                                        {
                                            "startDate": $("#txtStartDate").val(),
                                            "endDate": $("#txtEndDate").val()
                                        }
                                    ],
                                    "metrics": [
                                        {
                                            "expression": "ga:pageviews"
                                        }
                                    ]
                                }
                                GoogleTraffic.QueryReportsCallback(reportMobileRequests, function (result) {
                                    callbackFreelancerMobileCount++;

                                    if (typeof result.errorName === "undefined") {
                                        var totalValue = result.reports[0].data.totals[0].values;
                                        cell3.innerHTML = comma(totalValue);
                                        freelancerMobileTotalViews = +freelancerMobileTotalViews + +totalValue;
                                    } else {
                                        cell3.innerHTML = "-";
                                    }

                                    if (callbackFreelancerMobileCount === array.length) {
                                        //freelancerMobileTotalViews = 100;
                                        cell3.innerHTML = comma(freelancerMobileTotalViews.toString());
                                        
                                        //totalMobilePageViews = totalMobilePageViews + freelancerMobileTotalViews;
                                        tdArtTotalMobile.innerHTML = comma((freelancerMobileTotalViews + totalMobilePageViews).toString());
                                    }
                                });





                            });
                        } else {
                            var reportPcRequests = {
                                "viewId": value.CODE_VALUE2,
                                "dateRanges": [
                                    {
                                        "startDate": $("#txtStartDate").val(),
                                        "endDate": $("#txtEndDate").val()
                                    }
                                ],
                                "metrics": [
                                    {
                                        "expression": "ga:pageviews"
                                    }
                                ]
                            }

                            GoogleTraffic.QueryReportsCallback(reportPcRequests, function (result) {
                                callbackPcCount++;
                                if (typeof result.errorName === "undefined") {
                                    var totalValue = result.reports[0].data.totals[0].values;
                                    cell2.innerHTML = comma(totalValue);
                                    totalPcPageViews = +totalPcPageViews + +totalValue;
                                } else {
                                    cell2.innerHTML = "-";
                                }

                                if (callbackPcCount === array.length) {
                                    tdArtTotalPc.innerHTML = comma(totalPcPageViews.toString());
                                }
                            });
                            var reportMobileRequests = {
                                "viewId": value.CODE_VALUE3,
                                "dateRanges": [
                                    {
                                        "startDate": $("#txtStartDate").val(),
                                        "endDate": $("#txtEndDate").val()
                                    }
                                ],
                                "metrics": [
                                    {
                                        "expression": "ga:pageviews"
                                    }
                                ]
                            }
                            GoogleTraffic.QueryReportsCallback(reportMobileRequests, function (result) {
                                callbackMobileCount++;

                                if (typeof result.errorName === "undefined") {
                                    var totalValue = result.reports[0].data.totals[0].values;
                                    cell3.innerHTML = comma(totalValue);
                                    totalMobilePageViews = +totalMobilePageViews + +totalValue;
                                } else {
                                    cell3.innerHTML = "-";
                                }

                                if (callbackMobileCount === array.length) {
                                    tdArtTotalMobile.innerHTML = comma(totalMobilePageViews.toString());
                                }
                            });

                        }
                    });

                } else {
                    alert(result.Msg);
                }
            }
        });
    },
    ExcelExport: function () {
        tablesToExcel(["tblSiteCount", "tblMember", "tblMenu", "tblArt", "tblTopPc", "tblTopMobile"],
            ["한국경제TV 조회수", "회원현황", "메뉴별 트래픽", "기사제공사별 트래픽", "상위 Top10 기사(PC)", "상위 Top10 기사(MOBILE)"],
            "구글트래픽" + ".xls", "Excel");
        //tablesToExcel(["tblTopMobile"],
        //    ["상위 Top10 기사(MOBILE)"],
        //    "구글트래픽" + ".xls", "Excel");
    }
};
var tablesToExcel = (function () {
    var uri = "data:application/vnd.ms-excel;base64,"
        , tmplWorkbookXml = "<?xml version=\"1.0\"?><?mso-application progid=\"Excel.Sheet\"?><Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\" xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\">"
            + "<DocumentProperties xmlns=\"urn:schemas-microsoft-com:office:office\"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>"
            + "<Styles>"
            + "<Style ss:ID=\"Currency\"><NumberFormat ss:Format=\"Currency\"></NumberFormat></Style>"
            + "<Style ss:ID=\"Date\"><NumberFormat ss:Format=\"Medium Date\"></NumberFormat></Style>"
            + "</Styles>"
            + "{worksheets}</Workbook>"
        , tmplWorksheetXml = "<Worksheet ss:Name=\"{nameWS}\"><Table>{rows}</Table></Worksheet>"
        , tmplCellXml = "<Cell{attributeStyleID}{attributeFormula}><Data ss:Type=\"{nameType}\">{data}</Data></Cell>"
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (tables, wsnames, wbname, appname) {
        var ctx = "";
        var workbookXml = "";
        var worksheetsXml = "";
        var rowsXml = "";

        for (var i = 0; i < tables.length; i++) {
            if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);
            for (var j = 0; j < tables[i].rows.length; j++) {
                rowsXml += "<Row>";
                for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
                    var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
                    var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
                    var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
                    dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
                    var startIndex = dataValue.indexOf("<span>");
                    var endIndex = dataValue.indexOf("</span>");
                    //a tag때문에 오류...
                    if (startIndex > 0 && endIndex > 0) {
                        dataValue = dataValue.substring(startIndex + 6, endIndex);
                    }

                    var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
                    dataFormula = (dataFormula) ? dataFormula : (appname === "Calc" && dataType === "DateTime") ? dataValue : null;
                    ctx = {
                        attributeStyleID: (dataStyle === "Currency" || dataStyle === "Date") ? ' ss:StyleID="' + dataStyle + '"' : ""
                        , nameType: (dataType === "Number" || dataType === 'DateTime' || dataType === 'Boolean' || dataType === 'Error') ? dataType : "String"
                        , data: (dataFormula) ? '' : dataValue
                        , attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ""
                    };
                    rowsXml += format(tmplCellXml, ctx);
                }
                rowsXml += '</Row>';
            }
            ctx = { rows: rowsXml, nameWS: wsnames[i] || 'Sheet' + i };
            worksheetsXml += format(tmplWorksheetXml, ctx);
            rowsXml = "";
        }

        ctx = { created: (new Date()).getTime(), worksheets: worksheetsXml };
        workbookXml = format(tmplWorkbookXml, ctx);



        var link = document.createElement("A");
        link.href = uri + base64(workbookXml);
        link.download = wbname || 'Workbook.xls';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})();

$(document).ready(function () {

    $("#btnSearch").click(function () {

        if ($("#txtStartDate").val().length === 0 || $("#txtEndDate").val().length === 0) {
            alert("검색일을 입력하세요.");
            return false;
        }

        var startDate = $("#txtStartDate").val();
        var endDate = $("#txtEndDate").val();

        if (GoogleTraffic.DateDiff(startDate, '2018-01-15') > 0) {
            alert("시작 날짜는 '2018-01-15'이후 날짜를 선택하세요.");
            return false;
        }

        if (GoogleTraffic.DateDiff(startDate, endDate) < 0) {
            alert("시작날짜와 종료날짜를 확인하세요.");
            return false;
        }

        if (GoogleTraffic.DateDiff(startDate, endDate) > 365) {
            alert("1년 이상 검색을 할 수 없습니다.");
            return false;
        }

        GoogleTraffic.GoogleApi_WowTvBind();
        GoogleTraffic.GoogleApi_WowTvMobileBind();
        GoogleTraffic.PresentMemberBind();
        GoogleTraffic.ArticleTop10Bind();
        GoogleTraffic.ArticleTop10MobileBind();
        GoogleTraffic.MenuTrafficBind();
        GoogleTraffic.ArticleTrafficBind();
        GoogleTraffic.ReportCountBind();
        return false;
    });

    $("#btnPrint").click(function () {

        if ($("#txtStartDate").val().length === 0 || $("#txtEndDate").val().length === 0) {
            alert("검색일을 입력하세요.");
            return false;
        }

        if ($("#txtRank").val().length === 0 || $("#txtRank").val().length === 0) {
            alert("주간 트래픽 순위를 입력하세요.");
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/PopupGoogleTrafficPrint?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            success: function (data) {
                $("#divPopupGoogleTrafficPrint").html(data);
                //상단
                $("#divPopupGoogleTrafficPrint #tdGoogleApi_WowTv").text($("#tdGoogleApi_WowTv").text());
                $("#divPopupGoogleTrafficPrint #tdGoogleApi_WowTv_Mobile").text($("#tdGoogleApi_WowTv_Mobile").text());
                $("#divPopupGoogleTrafficPrint #spanRank").html($("#txtRank").val());


                //회원 현황
                $("#divPopupGoogleTrafficPrint #tblMember").html($("#tblMember").html());
                $("#divPopupGoogleTrafficPrint #tblMenu").html($("#tblMenu").html());
                $("#divPopupGoogleTrafficPrint #tblArt").html($("#tblArt").html());
                $("#divPopupGoogleTrafficPrint #tblTopPc").html($("#tblTopPc").html());
                $("#divPopupGoogleTrafficPrint #tblTopMobile").html($("#tblTopMobile").html());
                $("#divPopupGoogleTrafficPrint #spanReportCount").html($("#spanReportCount").html());

                $("#divPopupGoogleTrafficPrint").modal("show");
            }
        });

        // GoogleTraffic.PagePrint();

        return false;
    });


    $("#btnSaveRank").click(function () {

        if ($("#txtStartDate").val().length === 0 || $("#txtEndDate").val().length === 0) {
            alert("검색일을 입력하세요.");
            return false;
        }

        if ($("#txtRank").val().length === 0) {
            alert("순위를 입력하세요.");
            return false;
        }

        GoogleTraffic.SaveRank();

        return false;
    });


    $("#btnExcelExport").click(function () {

        if ($("#txtStartDate").val().length === 0 || $("#txtEndDate").val().length === 0) {
            alert("검색일을 입력하세요.");
            return false;
        }

        GoogleTraffic.ExcelExport();

        return false;
    });



    GoogleTraffic.UseImmdiate = true;
    GoogleTraffic.AuthData = {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: GoogleTraffic.UseImmdiate
    };


    GoogleTraffic.QueryReportsCallback = function (reportRequests, callback) {
        // Load the API from the client discovery URL.
        gapi.client.load(DISCOVERY).then(function () {
            // Call the Analytics Reporting API V4 batchGet method.
            gapi.client.analyticsreporting.reports.batchGet({
                reportRequests: reportRequests
            }).then(function (response) {
                var parse = JSON.parse(response.body);
                callback(parse);
            }).then(null, function (err) {
                var parse = {
                    "errorName": err
                };
                callback(parse);
            });
        });
    };
});