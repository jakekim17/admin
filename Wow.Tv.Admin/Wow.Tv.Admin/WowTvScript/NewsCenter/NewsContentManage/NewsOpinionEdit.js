
var NewsOpinionEdit = {

    Save: function () {

        if ($("#TITLE").val().length <= 0) {
            alert("제목을 입력하세요.");
            $("#TITLE").focus()
            return false;
        }
        else if ($("#EXTRACTION_TEXT").val().length <= 0) {
            alert("추출 텍스트를 입력하세요.");
            $("#EXTRACTION_TEXT").focus()
            return false;
        }
        else if ($("#COLUMNLIST_NAME").val().length <= 0) {
            alert("칼럼 리스트명을 입력하세요.");
            $("#COLUMNLIST_NAME").focus()
            return false;
        }
        else if ($("#sapnMainFile").text().length <= 0) {
            alert("목록 이미지를 선택하세요.");
            return false;
        }
        else if ($("#sapnBannFile").text().length <= 0) {
            alert("타이틀 이미지를 선택하세요.");
            return false;
        }
        else if ($("#VW_FROM").val().length <= 0) {
            alert("거재기간 시작일을 입력하세요.");
            $("#VW_FROM").focus()
            return false;
        }

        if ($("#VW_FROM").val().length > 0 && $("#VW_TO").val().length > 0) {

            var startDate = $("#VW_FROM").val();
            var endDate = $("#VW_TO").val();

            var startDateArr = startDate.split('-');
            var endDateArr = endDate.split('-');

            var startDateCompare = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);
            var endDateCompare = new Date(endDateArr[0], endDateArr[1], endDateArr[2]);

            if (startDateCompare.getTime() > endDateCompare.getTime()) {

                alert("거재기간 시작일과 종료일을 확인하세요.");
                return false;
            }
        }

        if ($("#sapnMainFile").text() != "") {

            var extension = $("#sapnMainFile").text().split(".").pop().toUpperCase();

            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('목록(허브) 이미지를 확인 하세요.\r\npng, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }

        if ($("#img_hotissue").text() != "") {

            var extension = $("#sapnHotissueFile").text().split(".").pop().toUpperCase();

            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('프로필 이미지를 확인 하세요.\r\npng, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }

        if ($("#img_list").text() != "") {

            var extension = $("#sapnListFile").text().split(".").pop().toUpperCase();

            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('TV 메인 포커스 이미지를 확인 하세요.\r\npng, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }

        if ($("#img_bann").text() != "") {

            var extension = $("#sapnBannFile").text().split(".").pop().toUpperCase();

            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('공통 상단 타이틀 이미지를 확인 하세요.\r\npng, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }

        //코너설명 Byte 체크
        if ($("#REMRK").val().length > 0) {

            var remarkLen = NewsOpinionEdit.ByteCheck($("#REMRK").val());

            if (remarkLen > 350) {

                alert("코너설명은 350Byte 이하로 해주세요. 현재 " + remarkLen +"Byte");
                return false;
            }
        }

        //저장 확인 Confirm
        if (confirm(CommonMsg.SaveConfirmMsg)) {

            var form = $("#frmAdd")[0];
            var formData = new FormData(form);

            $.ajax({
                type: 'POST',
                url: "NewsOpinionEditSave?currentMenuSeq=" + currentMenuSeq,
                data: formData,
                enctype: "multipart/form-data",
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data.IsSuccess == true) {
                        alert(CommonMsg.SaveAfterMsg);

                        var gubunCode = $("#SearchGubun").val();
                        var strUrl = String.format("NewsOpinion?gubunCode={0}&menuSeq={1}", gubunCode, currentMenuSeq);
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
    },
    ByteCheck : function (text) {
        var byte = 0;
        for (var i = 0, len = text.length; i < len; i++) {
            if (escape(text.charAt(i)).length > 4) {
                byte += 2;
            } else {
                byte++;
            }
        }
        return byte;
    }
}

$(document).ready(function () {

    //시작일 일자 체크
    $("#VW_FROM").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });

    //종료일 일자 체크
    $("#VW_TO").focusout(function () {

        if ($(this).val().length > 0) {

            if (!IsDate($(this).val())) {
                alert("일자를 확인하세요.");
            }
        }
    });
    
    //목록
    $("#btnList").click(function () {

        var gubunCode = $("#SearchGubun").val();
        var strUrl = String.format("NewsOpinion?gubunCode={0}&menuSeq={1}", gubunCode, currentMenuSeq);
        //location.href = strUrl;
        $("#frmSearch").attr("action", strUrl);
        $("#frmSearch").submit();
    });
    
    //등록, 수정
    $("#btnSave").click(function () {

        NewsOpinionEdit.Save();
    });

});