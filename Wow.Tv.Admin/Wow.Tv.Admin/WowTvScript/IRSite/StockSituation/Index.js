var StockSituationIndex = {
    Save: function () {
        if ($('input[name="NAME"]').val() == "") {
            alert('성명을 입력해주세요');
            return false;
        } else if ($('input[name="STOCK_FLAG"]').val() == "") {
            alert('관계를 입력해주세요');
            return false;
        } else if ($('input[name="STOCK"]').val == "") {
            alert('주식종류를 입력해주세요');
            return false;
        } else if ($('input[name="STOCK_CNT"]').val == "") {
            alert('주식수를 입력해주세요');
            return false;
        } else if (isNaN($('input[name="STOCK_CNT"]').val())) {
            alert('주식수는 숫자만 입력가능합니다.');
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/IRSite/StockSituation/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $("#frmAdd").serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    window.location.reload();
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    Delete: function (seq) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/IRSite/StockSituation/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "seq": seq },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        window.location.reload();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
        return false;
    },
    UpdateOrder: function (seq, isUp) {
        $.ajax({
            type: "POST",
            url: "/IRSite/StockSituation/UpdateOrder?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: { "seq": seq , "isUp": isUp},
            success: function (data) {
                if (data.isSuccess == true) {
                    alert("순서가 변경되었습니다.");
                    window.location.reload();
                } else {
                    alert(data.msg);
                }
            }
        });
        return false;
    },
};

function AddTable(seq, name, flag, stock, cnt) {
    if (seq === undefined) {
        name ="", flag = "", stock = "", cnt = "";
    }
    cnt = cnt.split("/")[0]
    cnt = cnt.replace(/[^0-9]/g, "");
    var str = '<tr><td><input type="hidden" name="SEQ" value='+ seq +'></td>';
    str += '<td><input type="text" class="form-control" name="NAME" value='+ name +'></td>';
    str += '<td><input type="text" class="form-control" name="STOCK_FLAG" value='+ flag +'></td>';    
    str += '<td><input type="text" class="form-control" name="STOCK" value='+ stock +'></td>';
    str += '<td><input type="text" class="form-control" name="STOCK_CNT" value='+ cnt +'></td>';
    str += '<td><button class="btn btn-success" type="button" id="btnComplete">완료</button></td></tr>';

    $('#mytable > tbody:last').append(str);
};

$(document).ready(function () {
    $('#btnAdd').click(function () {
        AddTable();
    });
    $('.btnEdit').click(function () {
        var seq = $(this).parent().parent().attr('id');
        var name = $(this).parent().siblings('.name').text();
        var flag = $(this).parent().siblings('.flag').text();
        var stock = $(this).parent().siblings('.stock').text();
        var cnt = $(this).parent().siblings('.cnt').text();
        AddTable(seq, name, flag, stock, cnt);
    });
    $('tbody').on('click', '#btnComplete', function () {
        StockSituationIndex.Save();
    });

    $('.btnDelete').click(function () {
        var seq = $(this).parent().parent().attr('id');
        StockSituationIndex.Delete(seq);
    });

    $('.orderUp').click(function () {
        var seq = $(this).parent().parent().attr('id');
        StockSituationIndex.UpdateOrder(seq, true);
    });
    $('.orderDown').click(function () {
        var seq = $(this).parent().parent().attr('id');
        StockSituationIndex.UpdateOrder(seq, false);
    });
});