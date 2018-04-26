var LectureEdit = {
    GoIndex: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/ProductManage/Lecture/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frm").submit();
    },
    Save: function (SchDelList, LecDelList) {
        SmartEditor.SaveData();
        if ($('input[name="LectureData.VIEW_SITE"]').val() == "") {
            alert('사이트 구분을 선택해주세요');
            return false;
        } else if ($('input[name="LectureData.TITLE"]').val() == "") {
            alert('제목을 입력해주세요');
            return false;
        } else if ($('input[name="LectureData.MAIN_CTGR"]').val() == "") {
            alert('대분류를 선택해주세요');
            return false;
        } else if ($('select[name="LectureData.TYPE_FLAG"]').val() == "") {
            alert('구분을 선택해주세요');
            return false;
        } else if ($('input[name="expenseRadio"]').val() == "C" && $('input[name="LectureData.EXPENSE"]').val() == "") {
            alert('참가비를 입력해주세요.');
            return false;
        } else if ($('input[name="LectureData.MANAGER"]').val() == "") {
            alert('담당자를 입력해주세요.');
            return false;
        } else if ($('input[name="LectureData.PHONE"]').val() == "") {
            alert('안내전화를 입력해주세요.');
            return false;
        } else if ($('input[name = "ScheduleList[0].LECTURES_DATE"]').val() == "" || $('input[name = "ScheduleList[0].LECTURES_TIME"]').val() == "") {
            alert('일정을 입력해주세요.');
            return false;
        }

        var txtareaLen = $('.txtarea').length
        for (var i = 0; i < txtareaLen; i++) {
            $('.txtarea').eq(i).val($('.txtarea').eq(i).val().replace(/(?:\r\n|\r|\n)/g, '<br/>'));
        }

        if ($('#txtFileWownet').text() != "" && $('#fileWownet').val() != ""){
            var extension = $("#fileWownet").val().split('.').pop().toUpperCase();
            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('png, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }

        if ($('#txtFileThumnail').text() != "" && $('#fileThumnail').val() != "") {
            var extension = $("#fileThumnail").val().split('.').pop().toUpperCase();
            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('png, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }

        var form = $('#frmAdd')[0];
        var formData = new FormData(form);


        for (var i = 0; i < LecDelList.length; i++) {
            formData.append('LecDelList', LecDelList[i]);
        }
        for (var i = 0; i < SchDelList.length; i++) {
            formData.append('SchDelList', SchDelList[i]);
        }

        $.ajax({
            type: "POST",
            url: "/ProductManage/Lecture/Save?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
            data: formData,
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    LectureEdit.GoIndex();
                }
            }
        });
    },
    Delete: function (deleteList) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/ProductManage/Lecture/Delete?currentMenuSeq=" + $('#CurrentMenuSeq').val(),
                data: { "deleteList": deleteList },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        LectureEdit.GoIndex();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
    },
    GetAddSchedule: function (startNum, cntNum) {
        $.ajax({
            type: "POST",
            url: "/ProductManage/Lecture/GetAddSchedule?menuSeq=" + $('#CurrentMenuSeq').val(),
            data: { startNum: startNum, cntNum: cntNum },
            async: false,
            success: function (data) {
                $('.tableSch').last().after(data);
            }
        });
    }
};

$(document).ready(function () {
    var SchDelList = new Array();
    var LecDelList = new Array();

    // ========================================================================
    // 설정
    if (viewSite == "") {
        $('input:radio[name="LectureData.VIEW_SITE"]:input[value="T"]').attr('checked', true);
    } else {
        $('input:radio[name="LectureData.VIEW_SITE"]:input[value="' + viewSite + '"]').attr('checked', true);
    }

    if (method == "") {
        $('input:radio[name="LectureData.METHOD"]:input[value="C"]').attr('checked', true);
    } else {
        $('input:radio[name="LectureData.METHOD"]:input[value="' + method + '"]').attr('checked', true);
    }

    if (expense > 0) {
        $('input:radio[name=expenseRadio]:input[value="C"]').attr('checked', true);
    } else {
        $('input:radio[name=expenseRadio]:input[value="F"]').attr('checked', true);
        $('input[name="LectureData.EXPENSE"]').hide();
    }

    $('select[name="LectureData.TYPE_FLAG"]').val(typeFlag).attr("selected", true);

    if (existImg != "") {
        $('.btnFilenew').hide();
        $('.btnFileRe').show();
    }

    SmartEditor.Create();
    // =========================================================================

    $('input[name="expenseRadio"]').change(function () {
        if ($(this).val() == "C") {
            $('input[name="LectureData.EXPENSE"]').show();
        } else {
            $('input[name="LectureData.EXPENSE"]').hide();
        }
    });

    $('#btnGoIndex').click(function () {
        LectureEdit.GoIndex();
    });

    $('#btnAdd').click(function () {
        LectureEdit.Save(SchDelList, LecDelList);
    });

    $('#btnDelete').click(function () {
        var deleteList = [];
        deleteList.push($('input[name="LectureData.SEQ"]').val());
        LectureEdit.Delete(deleteList);
    });

    $(document).on('click', '.dtDate', function () {
        $('.dtDate').datepicker({
            format: "yyyy-mm-dd",
            language: "kr"
        }).on('changeDate', function (ev) {
            $(this).siblings('.txtDate').val(ev.date.format("yyyy-MM-dd"));
            $(this).datepicker('hide');
        });
    });

    $(document).on('click', '.btnModal', function () {
        var place = $(this).parent().siblings('.divPlace').children().val();
        if (place == "") {
            alert('주소를 입력해주세요');
        } else {
            $('#txtAddress').text('주소: ' + place);
            $('#naverMap').on('shown.bs.modal', function () {
                GetGeoCode(place);
            }).modal('show');
        }
    });

    $('#btnScheduleCfm').click(function () {
        var txtScheduleCnt = $('#txtSchduleCnt').val();

        if (txtScheduleCnt <= 0) {
            alert('일정은 최소 1개 이상입니다.');
            return false;
        }
        var tableCnt = $('.tableSch').length;

        if (tableCnt < txtScheduleCnt) {
            var startNum = Number($('.tableSch').last().attr('id').split('_')[1]) + 1;
            var cntNum = txtScheduleCnt - tableCnt;

            LectureEdit.GetAddSchedule(startNum, cntNum);
            
        } else if (tableCnt > txtScheduleCnt) {
            var minusCnt = tableCnt - txtScheduleCnt;

            for (var i = 0; i < minusCnt; i++) {
                var divId = $('.tableSch').last().find('.schSeq').val();
                if (typeof divId != "undefined") {
                    SchDelList.push(divId);
                }
                $('.tableSch').last().remove();
            }
        }
    });

    $('#btnEquSchedule').click(function () {
        if ($('#checkPlace').is(':checked')) {
            $('.txtPlace').val($('.txtPlace').eq(0).val());
        }

        if ($('#checkLec').is(':checked')) {
            var tdHmtl = $('#tdLec_0').html();
            var standLecCnt = $('#tdLec_0').find('.lecSeq').length;

            var tdIdx = $('.tdLec').length;
            var lecCnt = $('#tdLec_0').find('.divLec').length;

            for (var i = 1; i < tdIdx; i++) {
                var array = new Array();
                var tdchiCnt = $('#tdLec_' + i).find('.lecSeq').length;

                for (var j = 0; j < tdchiCnt; j++) {
                    array.push($('#tdLec_' + i).find('.lecSeq').eq(j).val());
                }

                if (standLecCnt > tdchiCnt) {
                    var minus = standLecCnt - tdchiCnt;
                    for (var k = 0; k < minus; k++) {
                        array.push(0);
                    }
                }
                else if (standLecCnt < tdchiCnt) {
                    var minus = tdchiCnt - standLecCnt;
                    for (var k = 0; k < minus; k++) {
                        LecDelList.push(array.pop());
                    }
                }

                $('#tdLec_' + i).html(tdHmtl);
                AddLecName(i, lecCnt);
                AddLecValue(i, lecCnt, array);
            }
        }

    });

    $(document).on('change', '.selLectype', function () {
        var sIdx = $('.tableSch').index($(this).parents('.tableSch'));
        var lIdx = $('#tdLec_' + sIdx + ' .selLectype').index($(this));
        var txt = '';

        if ($(this).val() == "G") {
            txt += '<div class="input-group form-inline fl-l col-md-4 mr-10">';
            txt += '<input type="text" class="form-control txtLec" name="ScheduleList[' + sIdx + '].LecturerList[' + lIdx + '].LECTURER_TYPE"></div>';
        } else if ($(this).val() == "P") {
            txt += '<div class="input-group fl-l col-md-3">';
            txt += '<select class="form-control selPartner" name="ScheduleList[' + sIdx + '].LecturerList[' + lIdx + '].PARTNER_NO"><option value="">파트너 선택</option>';
            for (var i = 1; i < partnerList.length; i++) {
                txt += '<option value="' + partnerList[i].Pay_no + '">' + partnerList[i].NickName + '</option>';
            }
            txt += '</select></div>';
        }

        $(this).parent().siblings('.divLec').html(txt);
    });

    $(document).on('click', '.btnLectypeAdd', function () {
        var sIdx = $('.tableSch').index($(this).parents('.tableSch'));
        var lIdx = $('#tdLec_' + sIdx).find('.selLectype').length + 1;

        if (lIdx < 10) {
            var txt = '<div class="col-md-12" style="margin-bottom:5px;"><input type="hidden" class="lecSeq"/><div class="input-group fl-l col-md-3 mr-10">';
            txt += '<select class="form-control selLectype">';
            txt += '<option value="G">일반강사</option><option value="P">파트너</option><option value="N">강사없음</option></select></div >';
            txt += '<div class="divLec"><div class="input-group form-inline fl-l col-md-4 mr-10">';
            txt += '<input type="text" class="form-control txtLec"></div></div>';
            txt += '<div class="input-group form-inline fl-l col-md-2 btnWrap">';

            if (lIdx > 1) {
                txt += '<button type="button" class="btn btn-default mr-10 btnLectypeDel">삭제</button>';
            }

            txt += '<button type="button" class="btn btn-success btnLectypeAdd">추가</button></div>';

            $(this).parent().parent().after(txt);
            $(this).remove();

            AddLecName(sIdx, lIdx);
        } else {
            alert('강사는 최대 10개까지만 입력가능합니다.');
            return false;
        }
    });

    $(document).on('click', '.btnLectypeDel', function () {
        var sIdx = $('.tableSch').index($(this).parents('.tableSch'));
        var lIdx = $('#tdLec_' + sIdx).find('.selLectype').length - 1;
        var currentIdx = $('#tdLec_' + sIdx).find('.divLec').index($(this).parent().siblings('.divLec'));
        console.log(currentIdx);
        console.log(lIdx);

        if (currentIdx == lIdx) {
            $(this).parent().parent().prev().find('.btnWrap').append('<button type="button" class="btn btn-success mr-10 btnLectypeAdd">추가</button>');
        }

        var divId = $(this).parent().siblings('.lecSeq').val();
        if (typeof divId != "undefined") {
            LecDelList.push(divId);
        }

        $(this).parent().parent().remove();

        AddLecName(sIdx, lIdx);
    });
});

function AddLecName(sIdx, cnt) {
    for (var i = 0; i < cnt; i++) {
        $('#tdLec_' + sIdx).find('.lecSeq').eq(i).attr('name', 'ScheduleList[' + sIdx + '].LecturerList[' + i + '].SEQ');
        $('#tdLec_' + sIdx).find('.selLectype').eq(i).attr('name', 'ScheduleList[' + sIdx + '].LecturerList[' + i + '].LECTURER_TYPE');
        if ($('#tdLec_' + sIdx).find('.selLectype').eq(i).val() == "G") {
            $('#tdLec_' + sIdx).find('.divLec').eq(i).find('.txtLec').attr('name', 'ScheduleList[' + sIdx + '].LecturerList[' + i + '].LECTURER');
        } else if ($('#tdLec_' + sIdx).find('.selLectype').eq(i).val() == "P") {
            $('#tdLec_' + sIdx).find('.divLec').eq(i).find('.selPartner').attr('name', 'ScheduleList[' + sIdx + '].LecturerList[' + i + '].PARTNER_NO');
        }
    }
}

function AddLecValue(sIdx, cnt, array) {
    for (var i = 0; i < cnt; i++) {
        $('#tdLec_' + sIdx).find('.lecSeq').eq(i).val(array[i]);
        $('#tdLec_' + sIdx).find('.selLectype').eq(i).val($('#tdLec_0').find('.selLectype').eq(i).val());
        if ($('#tdLec_' + sIdx).find('.selLectype').eq(i).val() == "G") {
            $('#tdLec_' + sIdx).find('.divLec').eq(i).find('.txtLec').val($('#tdLec_0').find('.divLec').eq(i).find('.txtLec').val());
        } else if ($('#tdLec_' + sIdx).find('.selLectype').eq(i).val() == "P") {
            $('#tdLec_' + sIdx).find('.divLec').eq(i).find('.selPartner').val($('#tdLec_0').find('.divLec').eq(i).find('.selPartner').val()).prop("selected", true);
        }
    }
}
