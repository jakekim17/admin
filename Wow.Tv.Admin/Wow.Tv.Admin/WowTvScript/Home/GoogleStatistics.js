

//// Replace with your client ID from the developer console. https://console.developers.google.com/apis/credentials
//var CLIENT_ID = '538387482734-g69mbcs293es19in424h6km617ktn3le.apps.googleusercontent.com';

//// Replace with your view ID. from https://ga-dev-tools.appspot.com/account-explorer/
//var VIEW_ID = '86739186';

//var DISCOVERY = 'https://analyticsreporting.googleapis.com/$discovery/rest';
//var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];



//function authorize(obj) {
//    // Handles the authorization flow.
//    // `immediate` should be false when invoked from the button click.
//    var useImmdiate = true;

//    var authData = {
//        client_id: CLIENT_ID,
//        scope: SCOPES,
//        immediate: useImmdiate
//    };
    
//    gapi.auth.authorize(authData, function (response) {
//        if (response.error) {
//            $(obj).text("인증필요");
//        }
//        else {
//            $(obj).text("불러오는 중");
//            queryReports();
//        }
//    });

//    alert("B");
//}



//function queryReports() {

//    // Load the API from the client discovery URL.
//    gapi.client.load(DISCOVERY
//    ).then(function () {
//        // Call the Analytics Reporting API V4 batchGet method.
//        gapi.client.analyticsreporting.reports.batchGet({
//            "reportRequests": [
//                {
//                    "viewId": VIEW_ID,
//                    "dateRanges": [
//                        {
//                            "startDate": "today",
//                            "endDate": "today"
//                        }],
//                    "metrics": [
//                        {
//                            "expression": "ga:entrances"
//                        }]
//                }]

//        }).then(function (response) {
//            var parse = JSON.parse(response.body);
//            var views = "" + parse.reports[0].data.totals[0].values[0];
//            console.log(views);
//            $(obj).text(views);
//        })
//            .then(null, function (err) {
//                // Log any errors.
//                console.log(err);
//            });
//    });
//}


$(document).ready(function () {

    //$("#tdGoogleApi_WowTv").click(function () {
    //    authorize($("#tdGoogleApi_WowTv"));
    //});
    //authorize($("#tdGoogleApi_WowTv"));
    //authorize($("#tdGoogleApi_WowNet"));
    //authorize($("#tdGoogleApi_WowFa"));
    //authorize($("#tdGoogleApi_WowStart"));
    //authorize($("#tdGoogleApi_WowSl"));

});

