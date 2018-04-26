

var NewsCardVodList = {

    //노출 순서 설정 저장
    ConfigSave: function () {

        var changeArray = new Array();
        var isShowNum = false;

        $("tr[name='trNewsList']").each(function (i) {

            var rowSelector = $(this);
            var SHOW_CODE = $("#SearchGubun").val();  
            var ARTICLE_ID = $("input[name='ARTICLE_ID']:eq(" + i + ")").val().trim();                  // 기사 ID
            var ORIGINAL_SHOW_NUM = $("input[name='ORIGINAL_SHOW_NUM']:eq(" + i + ")").val().trim();    // 노출순서 
           
            if (ORIGINAL_SHOW_NUM == 0) ORIGINAL_SHOW_NUM = "";

            //노출순서
            var SHOW_NUM = $("select[name='SHOW_NUM']:eq(" + i + ")").val();

            if ((ORIGINAL_SHOW_NUM == 0 || ORIGINAL_SHOW_NUM == "") && SHOW_NUM != "") {

                $("tr[name='trNewsList']").each(function (j) {

                    if (i != j) {
                        var chkShowNum = $("select[name='SHOW_NUM']:eq(" + j + ")").val();
                        var chkOriShowNum = $("input[name='ORIGINAL_SHOW_NUM']:eq(" + j + ")").val();

                        if (SHOW_NUM == chkShowNum && (chkOriShowNum == 0 || chkOriShowNum == "")) {
                            isShowNum = true;
                            return false;
                        }
                    }
                })
            }

            if (isShowNum) return false;

            /*
            console.log("=====================================================");
            console.log("i  : " + i);
            console.log("ARTICLE_ID : " + ARTICLE_ID);
            console.log("ORIGINAL_SHOW_NUM : " + ORIGINAL_SHOW_NUM);
            console.log("SHOW_NUM : " + SHOW_NUM);
            */
            if (ORIGINAL_SHOW_NUM != SHOW_NUM) {
                
                changeInfo = new Object();
                changeInfo.ARTICLE_ID = ARTICLE_ID;
                changeInfo.SHOW_CODE = SHOW_CODE;
                changeInfo.SHOW_NUM = SHOW_NUM;

                changeArray.push(changeInfo);
            }
        });

        if (changeArray.length > 0) {
            if (confirm(CommonMsg.SaveConfirmMsg)) {

                var changeValue = JSON.stringify(changeArray);

                $.ajax({
                    type: 'POST'
                    , url: "SetNewsShowNumSave?menuSeq=" + currentMenuSeq
                    , contentType: "application/json; charset=utf-8"
                    , dataType: "json"
                    , data: changeValue
                    , success: function (data, textStatus) {

                        if (data.IsSuccess == true) {

                            alert("저장 되었습니다.");

                            //뉴스 설정된 리스트
                            NewsCardVod.ConfigList();

                            //뉴스 리스트
                            NewsCardVod.List();
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
        }
        else if (isShowNum) {
            alert("변경하려는 노출 순서를 확인하세요.(동일 노출 순서)");
            return false;
        }
        else {

            alert("수정된 내용이 없습니다.");
            return false;
        }
    }
}

$(document).ready(function () {


});