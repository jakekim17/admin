var IRClubEdit = {
    GoIndex: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/IRSite/IRClub/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frm").submit();
    },
    Save: function () {
        console.log("SEQ: " + $('input[name="SEQ"]').val());
        if ($('input[name="COMPANY_NAME"]').val() == "") {
            alert('회사명을 입력하세요.');
            return false;
        } else if ($('input[name="SCODE"]').val() == "") {
            alert('종목코드를 입력하세요.');
            return false;
        } else if (typeof $('input[name="SEQ"]').val() == "undefined" && $('#fileText').val() == "") {
            alert('회사로고를 첨부하세요.');
            return false;
        } else if (typeof $('input[name="SEQ"]').val() != "undefined" && $('#fileText').val() == "" && $('p > span').text() == "") {
            alert('회사로고를 첨부하세요.');
            return false;
        } else if ($('input[name="HOMEPAGE"]').val() == "") {
            alert('홈페이지 URL을 입력하세요.');
            return false;
        } else if ($('input[name="COMPANY_PHONE"]').val() == "") {
            alert('대표전화번호를 입력하세요.');
            return false;
        } else if ($('input[name="START_DATE"]').val() == "") {
            alert(' 가입일을 입력하세요.');
            return false;
        } else if ($('input[name="END_DATE"]').val() == "") {
            alert('만료일을 입력하세요.');
            return false;
        } else if ($('select[name="REG_TYPE"]').val() == "") {
            alert('가입구분을 선택하세요.');
            return false;
        } else if ($('input[name="START_DATE"]').val() > $('input[name="END_DATE"]').val()) {
            alert(' 가입일이 만료일보다 클 수 없습니다. 다시 입력하세요.');
            return false;
        }

        var form = $('#frmAdd')[0];
        var formData = new FormData(form);

        if ($('#fileText').val() != "") {
            var files = $("#file").get(0).files;
            if (files.length > 0) {
                formData.append("Images", files[0]);
            }
            var extension = $("#file").val().split('.').pop().toUpperCase();
            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('png, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }
        
        $.ajax({
            type: "POST",
            url: "/IRSite/IRClub/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: formData,
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    IRClubEdit.GoIndex();
                }   
            },
            error: function (error) {
                alert(error);
                return false;
            }
        });
    },
    Delete: function (deleteList) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/IRSite/IRClub/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "deleteList": deleteList },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        IRClubEdit.GoIndex();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
    },
    ChageStockCode: function (code) {
        console.log(code);
        $('input[name="SCODE"]').val(code);
    },
    SearchCode: function (searchText) {
        $.ajax({
            type: "POST",
            url: "/IRSite/IRClub/StockCode?menuSeq=" + $('#CurrentMenuSeq').val(),
            data: { "searchText": searchText },
            success: fnStockCode,
            error: function (error) {
                alert(error);
                return false;
            }
        });
    }
};

function fnStockCode(data) {
    var txt = "";
    data.forEach(function (item, i) {
        txt += '<li class="liStockCode"><button><span class="text-color1">' + item.SCode + '</span>' + item.SName + '</button></li>';
    });

    $('.stockticker').html(txt);
}

$(document).ready(function () {
    $('#btnSearch').click(function () {
        IRClubEdit.SearchCode();
        $('#searchCode').modal('show');
    });

    $(document).on('click', '#searchDiv >button', function () {
        var txt = $(this).text();
        $('#searchText').val(txt);
        IRClubEdit.SearchCode(txt);
    });

    $(document).on('click', '.stockticker > .liStockCode', function () {
        var txt = $(this).text();
        IRClubEdit.ChageStockCode(txt);
    });

    $('#btnCodeSearch').click(function () {
        var txt = $('#searchText').val();
        IRClubEdit.SearchCode(txt);
    });

    $('#btnFile').click(function () {
        $('#file').click();
    });

    $('#file').change(function () {
        var txt = $(this).val();
        var splitData = txt.split('\\');
        $('#fileText').val(splitData[(splitData.length) - 1]);
        $('#checkbox').attr('checked', false);
    });

    $('#btnGoIndex').click(function () {
        IRClubEdit.GoIndex();
    })

    $('#btnAdd').click(function () {
        IRClubEdit.Save();
    });

    $('#checkbox').click(function () {
        $('p > span').text("");
    });

    $('#btnDelete').click(function () {
        var deleteList = [];
        deleteList.push($('input[name="SEQ"]').val());
        IRClubEdit.Delete(deleteList);
    });

    $('input[name="SCODE"]').focus(function () {
        $('#btnSearch').click();
    });

    $('#dtStartDate').datepicker({
        format: "yyyy-mm",
        language: "kr"
    }).on('changeDate', function (ev) {
        $('#txtStartDate').val(ev.date.format("yyyy-MM"));
        $(this).datepicker('hide');
    });

    $('#dtEndDate').datepicker({
        format: "yyyy-mm",
        language: "kr"
    }).on('changeDate', function (ev) {
        $('#txtEndDate').val(ev.date.format("yyyy-MM"));
        $(this).datepicker('hide');
        });

    $(document).on('show', $('#dtEndDate').datepicker(), function () {
        $('.datepicker').removeClass('datepicker-orient-top');
    });
});

