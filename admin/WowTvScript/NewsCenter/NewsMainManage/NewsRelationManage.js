
var NewsRelationManage = {

    SelAutoManual: function (selBox) {

        var strID = $(selBox).attr("id");
        var strNum = strID.split("_")[1];

        var showCondition = $("#showCondition_" + strNum);  //자동노출 조건
        var deptCode      = $("#deptCode_" + strNum);       //제공사 선택
        var articleTitle  = $("#articleTitle_" + strNum);   //제목

        if ($(selBox).val() == "AUTO") {

            showCondition.removeAttr("disabled");
            deptCode.removeAttr("disabled");
            articleTitle.attr("disabled", "true");
        }
        else if ($(selBox).val() == "MANUAL") {

            showCondition.val("");
            deptCode.val("");

            showCondition.attr("disabled", "true");
            deptCode.attr("disabled", "true");
            articleTitle.removeAttr("disabled");
        }        
    },
    SelShowCondition: function (selBox) {

        var strID = $(selBox).attr("id");
        var strNum = strID.split("_")[1];

        var deptCode = $("#deptCode_" + strNum);       //제공사 선택

        if ($(selBox).val() == "SECTION") {

            deptCode.removeAttr("disabled");
        }
        else{

            deptCode.val("");
            deptCode.attr("disabled", "true");
        }  
    },
    Save: function (selBox) {

        var strID = $(selBox).attr("id");
        var strNum = strID.split("_")[1];

        var showNum       = $("#showNum_" + strNum);        //노출 순서
        var autoManual    = $("#autoManual_" + strNum);     //자동,수동 조건
        var showCondition = $("#showCondition_" + strNum);  //자동노출 조건
        var deptCode      = $("#deptCode_" + strNum);       //제공사 선택
        var articleID     = $("#articleID_" + strNum);      //기사 ID
        var articleTitle  = $("#articleTitle_" + strNum);   //제목

        if ($(autoManual).val() == "AUTO") {

            if (showCondition.val() == "") {
                alert("자동노출 조건을 선택하세요.");
                showCondition.focus();
                return false;
            }
            else if (showCondition.val() == "SECTION" && deptCode.val() == "" ) {
                alert("제공사를 선택 선택하세요.");
                showCondition.focus();
                return false;
            }
        }
        else if ($(autoManual).val() == "MANUAL") {

        }

        if (confirm(CommonMsg.SaveConfirmMsg)) {

            changeInfo = new Object();
            changeInfo.SHOW_NUM = showNum.val();
            changeInfo.AUTO_MANUAL = autoManual.val();
            changeInfo.SHOW_CONDITION = showCondition.val();
            changeInfo.DEPT_CODE = deptCode.val();
            changeInfo.ARTICLE_ID = articleID.val();
            changeInfo.ARTICLE_TITLE = articleTitle.val();

            var changeValue = JSON.stringify(changeInfo);

            $.ajax({
                type: 'POST'
                , url: "/NewsCenter/NewsMainManage/NewsRelationManageSave?menuSeq=" + $("#hidCurrentMenuSeq").val()
                , contentType: "application/json; charset=utf-8"
                , dataType: "json"
                , data: changeValue
                , success: function (data, textStatus) {

                    if (data.IsSuccess == true) {

                        alert("저장 되었습니다.");
                        $("#btnRelationClose").click();
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
                , error: function (jqXHR, exception) {
                    alert(CommonMsg.ErrorMag);
                }
            });
        }
    },
    GetNewsTitle: function (obj) {


        var strID = $(obj).attr("id");
        var strNum = strID.split("_")[1];
        var articleID = $("#articleID_" + strNum); //기사 ID
        var oriTitle  = $("#oriTitle_" + strNum);  //기사 제목

        $.ajax({
            type: 'POST'
            , url: "/NewsCenter/NewsMainManage/NewsTitle?menuSeq=" + $("#hidCurrentMenuSeq").val()
            , data: { "articleId": articleID.val() }
            , success: function (data, textStatus) {

                if (data.NewsTitle.length > 0 ) {

                    oriTitle.html(data.NewsTitle);
                }
                else {
                    alert(CommonMsg.ErrorMag);
                }
            }
            , error: function (jqXHR, exception) {
                alert(CommonMsg.ErrorMag);
            }
        });


    }
}

$(document).ready(function () {

    //노출 순위 자동/수동
    $("select[name='autoManual']").change(function () {

        //alert(1);
        NewsRelationManage.SelAutoManual(this);
    });

    //자동 노출 조건 선택
    $("select[name='showCondition']").change(function () {

        NewsRelationManage.SelShowCondition(this);
    });    

    //저장
    $("button[name='btnSave']").click(function () {

        NewsRelationManage.Save(this);
    });


    //기사 제목
    $("input[name='articleID']").each(function (i) {

        NewsRelationManage.GetNewsTitle(this);
    });

});

