

var NewsMainList = {
    ConfigSave: function () {

        var changeArray = new Array();
        var isRank = false;
        var isShowNum = false;

        $("tr[name='trNewsMainList']").each(function (i) {

            var rowSelector         = $(this);
            var ARTICLE_ID          = $("input[name='ARTICLE_ID']:eq(" + i + ")").val().trim();            // 기사 ID
            var ORIGINAL_RANK       = $("input[name='ORIGINAL_RANK']:eq(" + i + ")").val().trim();         // 메인노출순서 
            var ORIGINAL_SHOW_NUM   = $("input[name='ORIGINAL_SHOW_NUM']:eq(" + i + ")").val().trim();     // 관련기사노출순서 
            var ORIGINAL_LIST_YN    = $("input[name='ORIGINAL_LIST_YN']:eq(" + i + ")").val().trim();      // LIST
            var ORIGINAL_GUBUN_CODE = $("input[name='ORIGINAL_GUBUN_CODE']:eq(" + i + ")").val().trim();   // 구분(종목,시황,단독)
            var ORIGINAL_BOLD_YN    = $("input[name='ORIGINAL_BOLD_YN']:eq(" + i + ")").val().trim();      // BOLD

            if (ORIGINAL_LIST_YN == "N") ORIGINAL_LIST_YN  = "";
            if (ORIGINAL_BOLD_YN == "N") ORIGINAL_BOLD_YN  = "";
            if (ORIGINAL_RANK == 0)      ORIGINAL_RANK     = "";
            if (ORIGINAL_SHOW_NUM == 0)  ORIGINAL_SHOW_NUM = "";

            //메인 노출순서
            var RANK = $("select[name='RANK']:eq(" + i + ")").val();

            if ((ORIGINAL_RANK == 0 || ORIGINAL_RANK == "") && RANK != "") {
                
                $("tr[name='trNewsMainList']").each(function (j) {
                    if (i != j) { 
                        var chkRank = $("select[name='RANK']:eq(" + j + ")").val();
                        var chkOriRank = $("input[name='ORIGINAL_RANK']:eq(" + j + ")").val();
                    
                        if (RANK == chkRank && (chkOriRank == 0 || chkOriRank == ""))
                        {
                            isRank = true;
                            return false;
                        }
                    }
                })
            }

            if (isRank) return false;

            //관련기사 노출순서
            var SHOW_NUM = $("select[name='SHOW_NUM']:eq(" + i + ")").val();

            if ((ORIGINAL_SHOW_NUM == 0 || ORIGINAL_SHOW_NUM == "") && SHOW_NUM != "") {

                $("tr[name='trNewsMainList']").each(function (j) {
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
            
            //LIST
            var OBJ_LIST_YN = rowSelector.find("input[type='checkbox'][name='LIST_YN']");
            var LIST_YN = "";
            if (OBJ_LIST_YN.is(":checked")) {

                LIST_YN = OBJ_LIST_YN.val();
            }

            //구분(종목,시황,단독)
            var GUBUN_CODE = "";
            var GUBUN_CODE_NAME = "GUBUN_CODE_" + ARTICLE_ID;
            var OBJ_GUBUN_CODE = rowSelector.find("input[type='radio'][name='" + GUBUN_CODE_NAME + "']");
            $(OBJ_GUBUN_CODE).each(function () {
                if ($(this).is(":checked"))
                {
                    GUBUN_CODE = $(this).val();
                }
            });
            
            var OBJ_BOLD_YN = rowSelector.find("input[type='checkbox'][name='BOLD_YN']");
            var BOLD_YN = "";
            if (OBJ_BOLD_YN.is(":checked")) {

                BOLD_YN = OBJ_BOLD_YN.val();
            }

            /*
            console.log("=====================================================");
            console.log("i  : " + i);
            console.log("ARTICLE_ID : " + ARTICLE_ID);

            console.log("ORIGINAL_RANK : " + ORIGINAL_RANK);
            console.log("ORIGINAL_SHOW_NUM : " + ORIGINAL_SHOW_NUM);
            console.log("ORIGINAL_LIST_YN : " + ORIGINAL_LIST_YN);
            console.log("ORIGINAL_GUBUN_CODE : " + ORIGINAL_GUBUN_CODE);
            console.log("ORIGINAL_BOLD_YN : " + ORIGINAL_BOLD_YN);

            console.log("RANK : " + RANK);
            console.log("SHOW_NUM : " + SHOW_NUM);
            console.log("LIST_YN : " + LIST_YN);
            console.log("GUBUN_CODE : " + GUBUN_CODE);
            console.log("BOLD_YN : " + BOLD_YN);
            */

            if (ORIGINAL_RANK != RANK || ORIGINAL_SHOW_NUM != SHOW_NUM || ORIGINAL_LIST_YN != LIST_YN || ORIGINAL_GUBUN_CODE != GUBUN_CODE || ORIGINAL_BOLD_YN != BOLD_YN)
            {
                //console.log("CHANGE : Y ");
                //if (ORIGINAL_RANK != RANK) { console.log(" RANK CHANGE : Y ") };
                //if (ORIGINAL_SHOW_NUM != SHOW_NUM) { console.log(" SHOW_NUM CHANGE : Y ") };
                //if (ORIGINAL_LIST_YN != LIST_YN) {console.log(" LIST_YN CHANGE : Y ") };
                //if (ORIGINAL_GUBUN_CODE != GUBUN_CODE) { console.log(" GUBUN_CODE CHANGE : Y ") };
                //if (ORIGINAL_BOLD_YN != BOLD_YN) { console.log(" BOLD_YN CHANGE : Y ") };

                changeInfo = new Object();
                changeInfo.ARTID = ARTICLE_ID;

                if (ORIGINAL_RANK != RANK)
                {
                    changeInfo.RANK = RANK;
                }

                if (ORIGINAL_SHOW_NUM != SHOW_NUM) {
                    changeInfo.SHOW_NUM = SHOW_NUM;
                }

                changeInfo.LIST_YN = LIST_YN;
                changeInfo.GUBUN_CODE = GUBUN_CODE;
                changeInfo.BOLD_YN = BOLD_YN;
                changeArray.push(changeInfo);
            }
        });

        if (changeArray.length > 0) {
            if (confirm(CommonMsg.SaveConfirmMsg)) {
                
                var changeValue = JSON.stringify(changeArray);

                $.ajax({
                    type: 'POST'
                    , url: "/NewsCenter/NewsMainManage/NewsMainListSave?menuSeq=" + $("#hidCurrentMenuSeq").val()
                    , contentType: "application/json; charset=utf-8"
                    , dataType: "json"
                    , data: changeValue
                    , success: function (data, textStatus) {

                        if (data.IsSuccess == true) {

                            alert("저장 되었습니다.");
                            
                            //뉴스 스탠드 Ajax 리스트
                            NewsMainManageIndex.NewsStandManageList();

                            //뉴스 메인 Ajax 리스트
                            NewsMainManageIndex.NewsManageList();
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
        else if (isRank)
        {
            alert("변경하려는 메인노출 순서를 확인하세요.(동일 노출 순서)");
            return false;
        }
        else if (isShowNum) {
            alert("변경하려는 관련기사노출 순서를 확인하세요.(동일 노출 순서)");
            return false;
        }
        else {

            alert("수정된 내용이 없습니다.");
            return false;
        }

    }
}

$(document).ready(function () {


    //라디오 버튼 더블클릭 
    $("input[type=radio]").dblclick(function () {
   
        if ($(this).is(':checked')) {
            $(this).removeAttr('checked');
        }
    });

});



