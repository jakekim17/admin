var StockholderBoardEdit = {
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/StockholderBoard/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();
        return false;
    },
    Save: function () {
        if ($('input[nmae="TITLE"]').val() == "") {
            alert('제목을 입력해주세요');
            return false;
        } else if ($('input[nmae="CONTENTS"]').val() == "") {
            alert('내용을 입력해주세요');
            return false;
        } 

        SmartEditor.SaveData();
        $.ajax({
            type: 'POST',
            url: "/IRSite/StockholderBoard/ReplySave?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $("#frmReply").serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert('등록(수정) 되었습니다.');
                    StockholderBoardEdit.GoIndex();
                }
                else {
                    alert(data.msg);
                }
            }
        });
        return false;
    },
    UpdateBlind: function () {
        $.ajax({
            type: "POST",
            url: "/IRSite/StockholderBoard/UpdateBlind?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $('#frmBoard').serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert('등록(수정) 되었습니다.');
                    StockholderBoardEdit.GoIndex();
                } else {
                    alert(data.msg);
                }
            }
        });
        return false;
    }
};


$(document).ready(function () {
    SmartEditor.Create();

    $('#btnBoardAdd').click(function () {
        console.log('aaaa');
        StockholderBoardEdit.UpdateBlind();
    });

    $('#btnReplyAdd').click(function () {
        StockholderBoardEdit.Save();
    });

    $('#btnGoIndex').click(function () {
        StockholderBoardEdit.GoIndex();
    });

});
