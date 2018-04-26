var HistoryEdit = {
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/History/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    Save: function () {
        SmartEditor.SaveData();

        if ($('select[name="CTGR_SEQ"]').val() == "") {
            alert('년도를 선택해주세요');
            return false;
        } else if ($('input[name="HIS_DATE"]').val() == "") {
            alert('날짜를 입력해주세요');
            return false;
        } else if (isNaN($('input[name="HIS_DATE"]').val().replaceAll('.', '').replaceAll('~',''))) {
            alert("날짜는 숫자, ' . ', ' ~ ' 만 입력가능합니다. ");
            return false;
        } else if ($('textarea[name="HIS_CONT"]').val() == "") {
            alert('연혁내용을 입력해주세요');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: "/IRSite/History/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert('등록(수정) 되었습니다.');
                    HistoryEdit.GoIndex();
                }
                else {
                    alert(data.msg);
                }
            }
        });
        return false;
    },
    Delete: function (checkedList) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/IRSite/History/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "checkedList": checkedList },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        HistoryEdit.GoIndex();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
        return false;
    }
};


$(document).ready(function () {

    SmartEditor.Create();

    $('#btnSave').click(function () {
        HistoryEdit.Save();
    });

    $('#btnGoIndex').click(function () {
        HistoryEdit.GoIndex();
    });

    $('#btnDelete').click(function () {
        var checkedList = [];
        checkedList.push($('input[name="HIS_SEQ"]').val());
        HistoryEdit.Delete(checkedList);
    });
});