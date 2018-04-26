
var NewsViewPageManage = {

    Save: function (selObj) {

        var menuSeq  = selObj.find("input[name='MENU_SEQ']").val();
        var likeYN   = selObj.find("select[name='LIKE_YN']").val();
        var recomYN  = selObj.find("select[name='RECOM_YN']").val();
        var seeYN    = selObj.find("select[name='SEE_YN']").val();
        var snsPrYN  = selObj.find("select[name='SNS_PR_YN']").val();

        /*
        console.log("=====================================================");
        console.log("MENU_SEQ : " + menuSeq);
        console.log("LIKE_YN : " + likeYN);
        console.log("RECOM_YN : " + recomYN);
        console.log("SEE_YN : " + seeYN);
        console.log("SNS_PR_YN : " + snsPrYN);
        */
        if ( menuSeq.length > 0 && likeYN.length > 0 && recomYN.length > 0 && seeYN.length > 0 && snsPrYN.length > 0)
        {
            viewPageManageInfo = new Object();
            viewPageManageInfo.MENU_SEQ  = menuSeq;
            viewPageManageInfo.LIKE_YN   = likeYN;
            viewPageManageInfo.RECOM_YN  = recomYN;
            viewPageManageInfo.SEE_YN    = seeYN;
            viewPageManageInfo.SNS_PR_YN = snsPrYN;

            if (confirm(CommonMsg.SaveConfirmMsg)) {

                var saveValue = JSON.stringify(viewPageManageInfo);

                $.ajax({
                    type: 'POST'
                    , url: "NewsViewPageInfoSave?menuSeq=" + currentMenuSeq
                    , contentType: "application/json; charset=utf-8"
                    , dataType: "json"
                    , data: saveValue
                    , success: function (data, textStatus) {

                        if (data.IsSuccess == true) {

                            alert("저장 되었습니다.");
                            window.location.reload();
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
        else {

            alert("저장할 정보를 확인 하세요.");
            return false;
        }
    }
}

$(document).ready(function () {

    $("button[name='btnSave']").click(function () {

        var selObj = $(this).parent().parent();

        NewsViewPageManage.Save(selObj);
    });    

});