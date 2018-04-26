

var NewsStandManage = {

    SaveList: function () {

        // 타입틀 INPUT 배열 Loop
        var changeArray = new Array();
        var chkTitle    = true;
        $("input[name='tmpTitle']").each(function (i) {

            // Value 비교
            var thisValue = $(this).val();
            var thisId = $(this).attr("id");
            var originalValue = $("input[name='originalTmpTitle']:eq(" + i + ")").val();

            if ($(this).val().trim().length == 0)
            {
                chkTitle = false;
                alert("제목을 입력하세요.");
                $(this).focus();
                return false;
            }
            else {
                if (thisValue != originalValue) {

                    changeInfo = new Object();
                    changeInfo.artId = thisId;
                    changeInfo.tmpTitle = thisValue;
                    changeArray.push(changeInfo);

                    $("input[name='ARTID']:eq(" + i + ")").val(thisId);
                }
                else {
                    $("input[name='ARTID']:eq(" + i + ")").val('');
                }
            }
        });

        if (chkTitle) {
            if (changeArray.length > 0) {
                if (confirm(CommonMsg.SaveConfirmMsg)) {

                    var changeValue = JSON.stringify(changeArray);

                    $.ajax({
                        type: 'POST'
                        , url: "/NewsCenter/NewsMainManage/NewsStandManageSave?menuSeq=" + $("#hidCurrentMenuSeq").val()
                        , contentType: "application/json; charset=utf-8"
                        , dataType: "json"
                        , data: changeValue
                        , success: function (data, textStatus) {

                            if (data.IsSuccess == true) {

                                alert("가제목이 적용되었습니다.");
                                $("#btnClose").click();
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
            else {

                alert("수정된 제목이 없습니다.");
                return false;
            }
        }
        
        return false;
    }
}

$(document).ready(function () {


    //가제목 적용 버튼
    $("#btnSave").click(function () {

        NewsStandManage.SaveList();
        return false;
    });
});

