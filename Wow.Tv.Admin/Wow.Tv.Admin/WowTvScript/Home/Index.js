
var HomeIndex = {
    QnABind: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/QnA?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "PageSize": 5 },
            success: function (data, textStatus) {
                $("#divQna").html(data);
            }
        });
    },
    ReportBind: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/Report?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "PageSize": 5 },
            success: function (data, textStatus) {
                $("#divReport").html(data);
            }
        });
    },
    BroadBoardBind: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/BroadBoard?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "PageSize": 5 },
            success: function (data, textStatus) {
                $("#divBroadBoard").html(data);
            }
        });
    },
    LectureBind: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/Lecture?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "PageSize": 5 },
            success: function (data, textStatus) {
                $("#divLecture").html(data);
            }
        });
    },
    IrQnABind: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/IrQnA?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "PageSize": 5 },
            success: function (data, textStatus) {
                $("#divIrQnA").html(data);
            }
        });
    },
    GoogleStatisticsBind: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/GoogleStatistics?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "PageSize": 5 },
            success: function (data, textStatus) {
                $("#divGoogleStatistics").html(data);

                setTimeout(function () {
                    authorize($("#tdGoogleApi_WowTv"), "86739186");
                    authorize($("#tdGoogleApi_WowNet"), "86752526");
                    authorize($("#tdGoogleApi_WowFa"), "86753042");
                    authorize($("#tdGoogleApi_WowStart"), "107411039");
                    authorize($("#tdGoogleApi_WowSl"), "86755924");

                    //authorize($("#tdGoogleApi_WowStartArticlePc"), "160205810"); 와우스타 PC
                    //authorize($("#tdGoogleApi_WowStartArticleMobile"), "160185158"); 와우스타 모바일
                }, 1000);
                
            }
        });
    }

    
};


// Replace with your client ID from the developer console. https://console.developers.google.com/apis/credentials
//var CLIENT_ID = '538387482734-g69mbcs293es19in424h6km617ktn3le.apps.googleusercontent.com';
var CLIENT_ID = '592087973259-ien66vgvi4m0h1u7h8k1tksqu8n6v2vk.apps.googleusercontent.com'; 

// Replace with your view ID. from https://ga-dev-tools.appspot.com/account-explorer/
//var VIEW_ID = '86739186';

var DISCOVERY = 'https://analyticsreporting.googleapis.com/$discovery/rest';
var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

function authorize(obj, viewId) {
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
            $(obj).text("인증필요");
        }
        else {
            $(obj).text("불러오는 중");
            queryReports(obj, viewId);
        }
    });

}



function queryReports(obj, viewId) {

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
                            "startDate": "today",
                            "endDate": "today"
                        }],
                    "metrics": [
                        {
                            "expression": "ga:entrances"
                        }]
                }]

        }).then(function (response) {
            var parse = JSON.parse(response.body);
            var views = "" + parse.reports[0].data.totals[0].values[0];
            console.log(views);
            $(obj).text(comma(views));
        })
            .then(null, function (err) {
                // Log any errors.
                console.log(err);
            });
    });
}



$(document).ready(function () {

    HomeIndex.QnABind();
    HomeIndex.ReportBind();
    HomeIndex.BroadBoardBind();
    HomeIndex.LectureBind();

    HomeIndex.IrQnABind();
    HomeIndex.GoogleStatisticsBind();
});

