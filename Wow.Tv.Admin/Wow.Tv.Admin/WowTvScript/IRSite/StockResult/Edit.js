var StockResulEdit = {
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IRSite/StockResult/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmSearch").submit();

        return false;
    },
    Save: function (deleteList) {
        if ($('input[name="StockData.DIVERGE"]').val() == "") {
            alert('회차를 입력해주세요');
            return false;
        } else if ($('input[name="StockData.SYEAR"]').val() == "" && $('input[name="StockData.STIME1"]').val() && $('input[name="StockData.STIME2"]').val()) {
            alert('개최일시를 입력해주세요');
            return false;
        } else if (isNaN($('input[name="StockData.STIME1"]').val()) && isNaN($('input[name="StockData.STIME2"]').val())) {
            alert('일시는 숫자만 입력 가능합니다');
            return false;
        } else if ($('input[name="StockData.PLACE"]').val == "") {
            alert('개최장소를 입력해주세요');
            return false;
        } else if ($('input[name="ConnectList[0].CONTENT"]').val == "") {
            alert('안건을 입력해주세요');
            return false;
        } 

        $.ajax({
            type: 'POST',
            url: "/IRSite/StockResult/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $("#frmSave").serialize() + '&' + $.param({ 'deleteList': deleteList }),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert('등록(수정) 되었습니다.');
                    StockResulEdit.GoIndex();
                }
                else {
                    alert(data.msg);
                }
            }
        });
        return false;
    },
    Delete: function (deleteList) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/IRSite/StockResult/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "deleteList": deleteList },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        StockResulEdit.GoIndex();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
        return false;
    },
    AddContent: function (index) {
        var txt = '<div><input type= "text" class="form-control" name= "ConnectList['+ index +'].CONTENT"/>';
        txt += '<input type="hidden" name="ConnectList[' + index +'].SEQ"/>';
        txt += '<label class="radio radio-inline"><input type="radio" name="ConnectList[' + index +'].STOCK" value="승인">승인</label>';
        txt += '<label class="radio radio-inline"><input type="radio" name="ConnectList[' + index + '].STOCK" value="" checked>승인거부</label>';
        txt += '<button type="button" class="btnContDelete">안건 삭제</button></div>';
        $('#btnContAdd').before(txt);

        return false;
    }
};


$(document).ready(function () {
    var conCount = conListCount - 1;
    var deleteList = new Array();
    if (conCount <= 0) conCount = 0;

    $('#btnSave').click(function () {
        StockResulEdit.Save(deleteList);
    });

    $('#btnGoIndex').click(function () {
        StockResulEdit.GoIndex();
    });

    $('#btnDelete').click(function () {
        var deleteList = [];
        deleteList.push($('input[name="STOCK_RESULT_SEQ"]').val());
        StockResulEdit.Delete(deleteList);
    });

    $('#dtStartDate').datepicker({
        format: "yyyy-mm-dd",
        language: "kr"
    }).on('changeDate', function (ev) {
        $('#txtDate').val(ev.date.format("yyyy-MM-dd"));
        $(this).datepicker('hide');
    });

    if (conListCount > 1) {
        $('#ConTable').show();
    }

    $('#btnConTabAdd').click(function () {
        $('#ConTable').show();
        conCount++;
        StockResulEdit.AddContent(conCount);
    });

    $('#btnContAdd').click(function () {
        conCount++;
        StockResulEdit.AddContent(conCount);
    });

    $(document).on('click', '.btnContDelete', function () {
        if (typeof $(this).siblings('.SEQ').val() != "undefined" && $(this).siblings('.SEQ').val() > 0) {
            deleteList.push($(this).siblings('.SEQ').val());
        }
        $(this).parent().remove();
    });
});