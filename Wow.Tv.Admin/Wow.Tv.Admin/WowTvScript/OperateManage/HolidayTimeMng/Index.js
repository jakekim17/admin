var HolidayTimeMngIndex = {
    SearchList: function (currentIndex) {
        if ($('input[name="StartDate"]').val() != "" && $('input[name="EndDate"]').val() == "") {
            alert('조회년도를 입력해주세요');
            return false;
        }

        $("#CurrentIndex").val(currentIndex);
        $.ajax({
            type: "POST",
            url: "/OperateManage/HolidayTimeMng/SearchList?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $('#frmSearch').serialize(),
            success: function (data) {
                $('#divContent').html(data);
            }
        });
    },
    EditTime: function (seq) {
        $('#seq').val(seq);
        $.ajax({
            type: "POST",
            url: "/OperateManage/HolidayTimeMng/EditTime?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $('#frmSearch').serialize(),
            success: function (data) {
                $('#divTimeModal').html(data);
                $('#divTimeModal').show();       
                $(document).find("#datePicker").removeClass('hasDatepicker').datepicker({
                    dateFormat: "yyyy-mm-dd",
                    language: "kr"
                }).on('changeDate', function (ev) {
                    $('#txtDate').val(ev.date.format("yyyy-MM-dd"));
                    $(this).datepicker('hide');
                });
            }
        });
    },
    SaveTime: function () {
        if ($('input[name="MARKET_DT"]').val() === "") {
            alert('년월일을 입력해주세요');
            return false;
        } else if ($('input[name="HOLIDAY_CD"]').val() == "") {
            alert('휴일구분을 선택해주세요');
            return false;
        }

        if ($('input[name="GUBUN"]').val() == "S") {
            if ($('input[name="MARKET_STA_H"]').val() === "" || $('input[name="MARKET_STA_M"]').val() === "") {
                alert('장시작시간을 선택해주세요');
                return false;
            } else if ($('input[name="MARKET_END_H"]').val() == "" || $('input[name="MARKET_END_M"]').val() == "") {
                alert('장마감시간을 선택해주세요');
                return false;
            } else if ($('input[name="MARKET_STA_H"]').val() > $('input[name="MARKET_END_H"]').val()) {
                alert('장시작시간이 장마감시간보다 클 수 없습니다. 장시간을 다시 선택해주세요.');
                return false;
            } else if ($('input[name="MARKET_STA_H"]').val() == $('input[name="MARKET_END_H"]').val() && $('input[name="MARKET_STA_M"]').val() > $('input[name="MARKET_END_M"]').val()) {
                alert('장시작시간이 장마감시간보다 클 수 없습니다. 장시간을 다시 선택해주세요.');
                return false;
            }
        }
        
        $.ajax({
            type: "POST",
            url: "/OperateManage/HolidayTimeMng/SaveTime?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $('#frmSaveTime').serialize(),
            success: function (data) {
                if (data.isDate == true) {
                    alert('이미 등록된 날짜입니다.');
                    return false;
                } else {
                    if (data.isSuccess == true) {
                        alert(CommonMsg.SaveAfterMsg);
                        //window.location.reload();
                        $('.btnCloseModal').click();
                        HolidayTimeMngIndex.SearchList();
                    }
                }

                if (data.isSuccess == false) {
                    alert(data.msg);
                }   
            }
        });
    },
    SaveMaster: function () {
        if ($('input[name="TRAD_STA_H"]').val() === "" || $('input[name="TRAD_STA_M"]').val() === "") {
            alert('장시작시간을 선택해주세요');
            return false;
        } else if ($('input[name="TRAD_END_H"]').val() == "" || $('input[name="TRAD_END_M"]').val() == "") {
            alert('장마감시간을 선택해주세요');
            return false;
        } else if ($('input[name="TRAD_STA_H"]').val() > $('input[name="TRAD_END_H"]').val()) {
            alert('장시작시간이 장마감시간보다 클 수 없습니다. 장시간을 다시 선택해주세요.');
            return false;
        } else if ($('input[name="TRAD_STA_H"]').val() == $('input[name="TRAD_END_H"]').val() && $('input[name="TRAD_STA_M"]').val() > $('input[name="TRAD_END_M"]').val()) {
            alert('장시작시간이 장마감시간보다 클 수 없습니다. 장시간을 다시 선택해주세요.');
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/OperateManage/HolidayTimeMng/SaveMaster?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: $('#frmSaveMaster').serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    $('.btnCloseModal').click();
                    HolidayTimeMngIndex.SearchList();
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
                url: "/OperateManage/HolidayTimeMng/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "seq": seq },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        HolidayTimeMngIndex.SearchList();
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
    $('#btnTv').addClass('active');
    //$("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "HolidayTimeMngIndex.Search"));

    $('#btnTv').click(function () {
        $('.nav-tabs li').removeClass('active');
        $(this).addClass('active');
        $('input[name="Gubun"]').val("T");
        $('#frmSearch .searchVal').val("");
        $('.inform').hide();
        HolidayTimeMngIndex.SearchList();
    });

    $('#btnStock').click(function () {
        $('.nav-tabs li').removeClass('active');
        $(this).addClass('active');
        $('input[name="Gubun"]').val("S");
        $('#frmSearch .searchVal').val("");
        $('.inform').show();
        HolidayTimeMngIndex.SearchList();
    });

    $('#btnSearch').click(function () {
        if ($('#btnTv').hasClass('active')) {
            $('input[name="Gubun"]').val("T");
        } else {
            $('input[name="Gubun"]').val("S");
        }
        HolidayTimeMngIndex.SearchList();
    });

    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();
            return false;
        }
    });

    $('#btnEditTime').click(function () {
        var seq = 0;
        HolidayTimeMngIndex.EditTime(seq);
    });

    $(document).on('click','#btnSaveTime', function () {
        HolidayTimeMngIndex.SaveTime();
    });

    $('#btnSaveMaster').click(function () {
        HolidayTimeMngIndex.SaveMaster();
    });

    $(document).on('click','.btnDelete',function () {
        var seq = $(this).attr('id');
        HolidayTimeMngIndex.Delete(seq);
    });

    $('#btnSearch').click();

    //날짜처리
    var maxDate;
    $('#dtStartDate, input[name="StartDate"]').datepicker({
        startDate: new Date(),
        format: "yyyy-mm-dd",
        language: "kr",
        autoclose: true,
    }).on('changeDate', function (ev) {
        maxDate = ev.date;
        $('#dtEndDate, input[name="EndDate"]').datepicker('setStartDate', maxDate).focus(); //dynamically set new start date for #
        $('input[name="StartDate"]').val(ev.date.format("yyyy-MM-dd"));
        $('input[name="EndDate"]').val("");
        $('#dtStartDate').datepicker('hide');
    });


    $('#dtEndDate, input[name="EndDate"]').datepicker({
        startDate: maxDate,
        format: "yyyy-mm-dd",
        language: "kr",
        autoclose: true,
    }).on('changeDate', function (ev) {
        maxDate = ev.date;
        $('input[name="EndDate"]').val(ev.date.format("yyyy-MM-dd"));
        $('#dtEndDate').datepicker('hide');
    });

});