

var HardCodingAdEdit = {
    Save: function () {

        var SEQ        = $("#seq");
        var AD_TITLE   = $("#adTitle");
        var AD_GUBUN   = $("#adGubun");
        var AD_CONTENT = $("#adContent");

        if (AD_TITLE.val().length <= 0) {
            alert("제목을 입력하세요.");
            AD_TITLE.focus()
            return false;
        }
        else if (AD_GUBUN.val().length <= 0) {
            alert("구분을 선택하세요");
            AD_GUBUN.focus()
            return false;
        }
        else if (AD_CONTENT.val().length <= 0) {
            alert("내용을 입력하세요.");
            AD_CONTENT.focus()
            return false;
        }

        //저장 확인 Confirm
        if (confirm(CommonMsg.SaveConfirmMsg)) {

            saveValue = new Object();
            saveValue.SEQ = SEQ.val();
            saveValue.AD_GUBUN = AD_GUBUN.val();
            saveValue.AD_TITLE = AD_TITLE.val();
            saveValue.AD_CONTENT = AD_CONTENT.val();

            var saveInfo = JSON.stringify(saveValue);

            $.ajax({
                  type: 'POST'
                , url: "HardCodingAdSave?menuSeq=" + currentMenuSeq
                , contentType: "application/json; charset=utf-8"
                , dataType: "json"
                , data: saveInfo
                , success: function (data) {

                    if (data.IsSuccess == true) {
                        alert(CommonMsg.SaveAfterMsg);

                        var strUrl = String.format("HardCodingAd?menuSeq={0}", currentMenuSeq);
                        location.href = strUrl;
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

$(document).ready(function () {

    
    //저장
    $("#btnSave").click(function () {

        HardCodingAdEdit.Save()
    });

    //목록
    $("#btnList").click(function () {

        var sUrl = "HardCodingAd?menuSeq=" + $("#hidCurrentMenuSeq").val();

        location.href = sUrl;
    });

    // PC/MOBILE 구분
    if ($("#seq").val() > 0) {
        $("#adGubun").attr("disabled", "true");
    }


});