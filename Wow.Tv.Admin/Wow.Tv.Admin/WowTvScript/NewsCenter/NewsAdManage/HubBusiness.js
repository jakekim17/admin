var AdsIndex = {
    Update: function (seq) {//변경사항 저장

        var form = $("#frmInsert")[0];
        var formData = new FormData(form);

        if (seq == 0) {
            if ($("#hubImage").val() != "") {
                var files = $("#hubImage").get(0).files;
                if (files.length > 0) {
                    formData.append("Images", files[0]);
                }
                var extension = $("#hubImage").val().split(".").pop().toUpperCase();
                if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                    alert('png, jpg, gif, jpeg 만 가능합니다');
                    return false;
                }
            }
        } else {
            if ($("#editImage_" + seq +"").val() != "") {
                var files = $("#editImage_"+seq+"").get(0).files;
                if (files.length > 0) {
                    formData.append("Images", files[0]);
                }
                var extension = $("#editImage_" + seq + "").val().split(".").pop().toUpperCase();
                if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                    alert('png, jpg, gif, jpeg 만 가능합니다');
                    return false;
                }
            }
        }
        

        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsAdManage/HubBusinessSave?menuSeq=" + menuSeq,
            data: formData, 
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            success: function (data, textStatus) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    location.reload();
                } else {
                    if (data.Msg == "") {
                        alert(CommonMsg.ErrorMag);
                    }
                    else {
                        alert(data.msg);
                    }
                }
            }
        });
    }, Delete: function (deleteList) { //삭제
        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsAdManage/HubBusinessDelete?menuSeq=" + menuSeq,
            data: { "deleteList": deleteList },
            success: function (data, textStatus) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.DeleteAfterMsg);
                    location.reload();
                } else {
                    if (data.Msg == "") {
                        alert(CommonMsg.ErrorMag);
                    }
                    else {
                        alert(data.msg);
                    }
                }
            }
        });
    }, Check: function (seq) {
        var returnVal = false;

        if ($("input[name='HUB_TITLE']").val() == "") {
            alert("타이틀을 입력하세요.");
        }
        else if ($("input[name='HUB_URL']").val() == "") {
            alert("URL을 입력하세요.");
        } else {
            if (seq == 0) {//저장일때 
                if ($("#hubImage").val() == "") {
                    alert("이미지를 첨부하세요.");
                }
            } else {//수정일때
                if ($("#editImage_" + seq + "").parent().parent().find(".fileinput-filename").text() == "") {
                    alert("이미지를 첨부하세요.");
                }
            }

            if (AdsIndex.checkDomain($("input[name='HUB_URL']").val())) {
                returnVal = true;
            }
            
        }

        return returnVal;
    }, checkDomain: function (text) {
        var returnVal = false;
        var check = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;

        if (!check.test(text)) {
            alert("http(s):// 형식으로 입력하세요.");
        } else {
            returnVal = true;
        }
        return returnVal;
    }
};


$(document).ready(function () {
    var length = $(".bbs-list1 > table > tbody > tr").size();

    for (var i = 0; i < length; i++) {
        if ("#editImage_"+ i != "") {
            $(".text-left").find(".fileinput").removeClass("fileinput-new");
            $(".text-left").find(".fileinput").addClass("fileinput-exists");
        } 
    }

    //저장
    $("#save").on("click", function () {
        //var clkbtn = "save";

        $("input[name='CODE']").val($("#code option:selected").val());
        $("input[name='HUB_IMAGE']").val($("#hubImage").val());
        $("input[name='HUB_URL']").val($("#hubUrl").val());
        $("input[name='HUB_TITLE']").val($("#hubTitle").val());

        if (AdsIndex.Check(0)) {
            if (confirm(CommonMsg.SaveConfirmMsg)) {
                AdsIndex.Update(0);
            }
        }
        
    });

    //수정
    $(".editHub").on("click", function () {
        //var clkbtn = "edit";

        var seq = $(this).parent().siblings("#seq").children("input[name='hubSeq']").val();
        var Image = $(this).parent().siblings(".text-left").children().find(".editImage").val();
        var url = $(this).parent().siblings(".text-left").children().find(".editUrl").val();
        var title = $(this).parent().siblings(".text-left").children().find(".editTitle").val();
        var open = $("input[name='editOpen_" + seq + "']:checked").val();
        

        $("input[name='SEQ']").val(seq);
        $("input[name='HUB_IMAGE']").val(Image);
        $("input[name='HUB_TITLE']").val(title);
        $("input[name='HUB_URL']").val(url);
        $("input[name='OPEN_YN']").val(open);

        if (AdsIndex.Check(seq)) {
            if (confirm(CommonMsg.ModifyConfirmMsg)) {
                AdsIndex.Update(seq);
            }
        }

    });

    //삭제
    $("#delete").on("click", function () {
        var deleteList = [];
        var chkLength = $("input[name='hubSeq']:checked").length;

        for (var idx = 0; idx < chkLength; idx++) {
            deleteList.push($("input[name='hubSeq']:checked").eq(idx).val());
        }

        if (chkLength > 0) {
            if (confirm(CommonMsg.DeleteConfirmMsg)) {
                AdsIndex.Delete(deleteList);
            }
        } else {
            alert("삭제할 항목을 선택해주세요.");
        }
    });

    //전체선택
    $("#total").on("click", function () {

        if ($("#total").is(":checked")) {
            $("input[name='hubSeq']").prop("checked", true);
        } else {
            $("input[name='hubSeq']").prop("checked", false);
        }

    });

});