var CTGRManageIndex = {
    Save: function (frm) {
        console.log("ECTGR_RN: " + $('#ECTGR_RN').attr("value"));
        if (frm == "frmAdd") {
            if ($('#CTGR_YR').val() == "") {
                alert("년도를 입력해주세요.");
                return false;
            } else if ($('#CTGR_RN').val()!= "" && isNaN($('#CTGR_RN').val())){
                alert("순위는 숫자만 입력가능합니다.");
                return false
            }
        } else {
            if ($('#ECTGR_YR').val() == "") {
                alert("년도를 입력해주세요.");
                return false;
            } else if ($('#ECTGR_RN').attr('value') != "" && isNaN($('#ECTGR_RN').val())) {
                alert("순위는 숫자만 입력가능합니다.");
                return false;
            }
        }
        
        $.ajax({
            type: 'POST',
            url: "/IRSite/CategoryManage/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $("#" + frm).serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    window.location.reload();
                }
                else {
                    alert(data.msg);
                }
            }
        });
        return false;
    },
    Delete: function (SEQ) {
        $.ajax({
            type: 'POST',
            url: "/IRSite/CategoryManage/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: {"seq" : SEQ},
            success: function (data) {
                if (data.isSuccess == true) {
                    alert('숨김변경 성공');
                    window.location.reload();
                }
                else {
                    alert(data.msg);
                }
            }
        });
        return false;
    }
};


$(document).ready(function () {
    $('#btnAdd').click(function () {
        CTGRManageIndex.Save("frmAdd");
    });

    $('.btnEdit').click(function () {
        $(this).parent().siblings('.CTGR_YR').html('<div class="input-group col-xs-12"><input type="text" class="form-control" name="CTGR_YR" id="ECTGR_YR" value="' + $(this).parent().siblings('.CTGR_YR').text() + '"></div>');
        $(this).parent().siblings('.CTGR_RN').html('<div class="input-group col-xs-12"><input type="text" class="form-control" name="CTGR_RN" id="ECTGR_RN" value="' + $(this).parent().siblings('.CTGR_RN').text() + '"></div>');
        $(this).parent().siblings('.CTGR_SEQ').html('<div class="input-group col-xs-12"><input type="text" class="form-control" name="CTGR_SEQ" value="' + $(this).parent().siblings('.CTGR_SEQ').text() + '" readonly></div>');
        $(this).parent().html('<button type="button" class="btnSave btn btn-success">확인</button><button type="button" class="btnCancle btn btn-default">취소</button>');
    }); 

    $('.btnDispChange').click(function () {
        var seq = $(this).parent().siblings('.CTGR_SEQ').text();
        CTGRManageIndex.Delete(seq);
    });

    $('body').on('click', '.btnSave', function () {
        CTGRManageIndex.Save("frmEdit");
    });

    $('body').on('click', '.btnCancle', function () {
        window.location.reload();
    });

});
