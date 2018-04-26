

var ReporterManageList = {

    Save: function (selObj) {

        var reporterName  = selObj.find("td[name='reporterName']").html();
        //SEQ
        var SEQ           = selObj.find("input[name='SEQ']").val();
        var reporterID    = selObj.find("input[name='reporterID']").val();
        var userID        = selObj.find("input[name='userID']").val();
        var reporterGubun = selObj.find("select[name='reporterGubun']").val();
        var wordYn        = selObj.find("select[name='wordYn']").val();
        var pageYn        = selObj.find("select[name='pageYn']").val();

        var bylineDept     = selObj.find("input[name='bylineDept']").val();
        var bylineName     = selObj.find("input[name='bylineName']").val();
        var bylinePosition = selObj.find("input[name='bylinePosition']").val();
        var bylineGroupId  = selObj.find("input[name='bylineGroupId']").val();

        /*
        console.log("=====================================================");
        console.log("[SEQ] : " + SEQ);
        console.log("[reporterName] : " + reporterName);
        console.log("[REPORTER_ID] : " + reporterID);
        console.log("[USER_ID] : " + userID);
        console.log("[REPORTER_GUBUN] : " + reporterGubun);
        console.log("[WORD_YN] : " + wordYn);
        console.log("[PAGE_YN] : " + pageYn);
        */
        //if (userID.length <= 0){
        //    alert(reporterName + "기자의 회원 ID를 입력하세요.");
        //    return false;
        //}
        //else if (reporterGubun.length <= 0) {
        if (reporterGubun.length <= 0) {
            alert(reporterName + "기자의 소속을 선택하세요.");
            return false;
        }
        else {

            // 입력한 회원아이디 유무 체크
            if (userID.length > 0 && !ReporterManageList.IsUserIdDuplicated(userID) ) {
                alert("입력한 회원(ID)으로 미가입 회원입니다.");
                return false;
            }
            // 입력한 회원아이디 기자 관리에 등록되어 있는지 체크
            else if (SEQ.length == 0 && ReporterManageList.IsReporterManageUserIdDuplicated(userID)) {
                alert("기자의 회원(ID)으로 등록되어 있습니다.");
                return false;
            }
            else {

                if (confirm(CommonMsg.SaveConfirmMsg)) {

                    if (SEQ.length <= 0) SEQ = 0;

                    reporterManageInfo = new Object();
                    reporterManageInfo.SEQ = SEQ;
                    reporterManageInfo.REPORTER_ID = reporterID;
                    reporterManageInfo.USER_ID = userID;
                    reporterManageInfo.REPORTER_GUBUN = reporterGubun;
                    reporterManageInfo.WORD_YN = wordYn;
                    reporterManageInfo.PAGE_YN = pageYn;
                    reporterManageInfo.BYLINE_DEPT = bylineDept;
                    reporterManageInfo.BYLINE_NAME = bylineName;
                    reporterManageInfo.BYLINE_POSITION = bylinePosition;
                    reporterManageInfo.BYLINE_GROUP_ID = bylineGroupId;
                    
                    var saveValue = JSON.stringify(reporterManageInfo);

                    $.ajax({
                        type: 'POST'
                        , url: "/NewsCenter/ReporterManage/ReporterManageInfoSave?menuSeq=" + currentMenuSeq
                        , contentType: "application/json; charset=utf-8"
                        , dataType: "json"
                        , data: saveValue
                        , success: function (data, textStatus) {

                            if (data.IsSuccess == true) {

                                alert("저장 되었습니다.");
                                //window.location.reload();
                                ReporterManage.ReporterManageList();
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
        }
    },
    IsReporterManageUserIdDuplicated: function (userId) {

        var isCheckde = false;

        $.ajax({
              async: false
            , type: 'POST'
            , url: "/NewsCenter/ReporterManage/IsReporterManageUserIdDuplicated?menuSeq=" + currentMenuSeq
            , data: { "userId": userId }
            , success: function (data, textStatus) {
                
                isCheckde = data.IsDuplicated;
            }
        });
        return isCheckde;
    },
    IsUserIdDuplicated: function (userId) {

        var isCheckde = false;
        
        $.ajax({
            async: false
            , type: 'POST'
            , url: "/NewsCenter/ReporterManage/IsUserIdDuplicated?menuSeq=" + currentMenuSeq
            , data: { "userId": userId }
            , success: function (data, textStatus) {

                isCheckde = data.IsDuplicated;
            }
        });

        return isCheckde;
    }
}

$(document).ready(function () {

    $("button[name='btnSave']").click(function () {

        var selObj = $(this).parent().parent();

        ReporterManageList.Save(selObj);
    });    
});
