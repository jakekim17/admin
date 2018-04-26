var BusinessEdit = {
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/BusinessManage/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    Save: function () {

        SmartEditor.SaveData();

        if ($('input[nmae="TITLE"]').val() == "") {
            alert('컨텐츠명을 입력해주세요');
            return false;
        } else if ($('#editor').val() == "") {
            alert('컨텐츠 내용을 입력해주세요');
            return false;
        } else if ($('input[name="EMAIL_YN"]').val == "Y") {
            if ($('input[nmae="EMAIL"]').val() == "") {
                alert('이메일을 입력해주세요');
                return false;
            }
        }

        $('input[name="CONTENT_ID"]').val($('#contentId').text());

        $.ajax({
            type: 'POST',
            url: "/IRSite/BusinessManage/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $("#frmSave").serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert('등록(수정) 되었습니다.');
                    BusinessEdit.GoIndex();
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
                url: "/IRSite/BusinessManage/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "checkedList": checkedList },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        BusinessEdit.GoIndex();
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
    if (email == "Y") {
        $('#emailtr').show();
    } else {
        $('#emailtr').hide();
    }

    SmartEditor.Create();

    $('#btnSave').click(function () {
        BusinessEdit.Save();
    });

    $('#btnGoIndex').click(function () {
        BusinessEdit.GoIndex();
    });

    $('input[name="EMAIL_YN"]').change(function () {
        if ($(this).val() == "Y") {
            $('#emailtr').show();
        } else {
            $('#emailtr').hide();
        }
    });

    $('#btnDelete').click(function () {
        var checkedList = [];
        checkedList.push($('input[name="BOARD_CONTENT_SEQ"]').val());
        BusinessEdit.Delete(checkedList);
    });

    $('#btnModal').click(function () {
        SmartEditor.SaveData();
        $('.preview-contain').html($('#editor').val());
        $('#contentView').modal('show');
    });
});
