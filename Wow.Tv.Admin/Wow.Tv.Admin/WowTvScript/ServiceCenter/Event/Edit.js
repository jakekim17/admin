var EventEdit = {
    check: function check() {
        var returnVal = false;
        var form = document.form;

        SmartEditor.SaveDataItem("hidTopContent");
        SmartEditor.SaveDataItem("hidBottomContent");

        if (!$("input:radio[name='VIEW_SITE']").is(":checked")) {
            alert("사이트 구분을 선택하세요");

        } else if ($("input[name='title']").val() == "") {
            alert("제목을 입력하세요.");

        } else if (!$("input[name='EventGubun']").is(":checked")) {
            alert("이벤트 구분을 선택하세요.");

        } else if (!$("input[name='viewFlag']").is(":checked")) {
            alert("게시여부를 입력하세요.");

        } else if ($("input:radio[name='EventGubun']").val() != "Integrate" && $("select[name='proId'] option:selected").val() == "") {
            alert("강사를 선택하세요.");

        } else if ($("input[name='startDate']").val() == "") {
            alert("시작일을 선택하세요.");

        } else if ($("input[name='endDate']").val() == "") {
            alert("종료일을 선택하세요.");

        } else if ($("select[name='EVENT_FLAG'] option:selected").val() == ""){
            alert("이벤트 진행상태를 선택하세요.");

        } else if (!$("input:radio[name='winner']").is(":checked")){
            alert("당첨자발표를 선택하세요.");

        } else if (!$("input:radio[name='viewFlag']").is(":checked")){
            alert("게시여부를 선택하세요.");

        } else if ($("input:radio[name='winner']").is(":checked")) {
            if ($("input:radio[name='winner']:checked").val() == "Y") {
                if (!$("input:radio[name='WIN_VIEW_FLAG']").is(":checked")) {
                    alert("게시여부를 선택하세요.");
                } else if ($("#hidBottomContent").val() == "<p>&nbsp;</p>") {
                    alert("당첨자 발표내용을 입력하세요.");
                } else if ($("#hidTopContent").val() == "<p>&nbsp;</p>") {
                    alert("이벤트 내용을 입력하세요.");
                } else {
                    if ($("#hidTopContent").val().length > 35000) {
                        alert("내용이 너무 많습니다. 다시 입력 해주세요.");
                    } else if ($("#hidBottomContent").val().length > 35000) {
                        alert("당첨자 발표 내용이 너무 많습니다. 다시 입력 해주세요.");
                    } else {
                        returnVal = true;
                    }
                }

            } else {
                if ($("input[name='linkUrl']").val() == "") {
                    if ($("#hidTopContent").val() == "") {
                        alert("이벤트 내용을 입력하세요.");
                    } else {
                        if ($("#hidTopContent").val().length > 35000) {
                            alert("내용이 너무 많습니다. 다시 입력 해주세요.");
                        } else if ($("#hidBottomContent").val().length > 35000) {
                            alert("당첨자 발표 내용이 너무 많습니다. 다시 입력 해주세요.");
                        } else {
                            returnVal = true;
                        }
                    }
                } else {
                    returnVal = true;
                }
            }

        } else {
            returnVal = true;
        }

        return returnVal;

    }, Insert: function () {
        if ($("input:radio[name='winner']:checked").val() == "N") {
            $("input[name='WINNER_DATE']").val("");
            $("input[name='WIN_VIEW_FLAG']").val("");
            $("input[name='WIN_VIEW_FLAG']").val("");
            $("textarea[name='WIN_CONTENT']").val("");
        };


        var form = $("#eventData")[0];
        var formData = new FormData(form);

        if ($(".fileinput-filename").text() != "" && $("input[name='bannerImage']").val() != "") {
            var files = $("#file").get(0).files;
            if (files.length > 0) {
                formData.append("Images", files[0]);
            }
            var extension = $("input[name='bannerImage']").val().split(".").pop().toUpperCase();
            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('png, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }

        
        $.ajax({
            type: 'POST',
            url: "/ServiceCenter/Event/Save?currentMenuSeq=" + menuSeq,
            data: formData, //$("#eventData").serialize(),
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    location.href = "/ServiceCenter/Event/Index?menuSeq=" + menuSeq;
                }
                else {
                    alert(data.msg);
                }
            }
        });

    }, Delete: function (deleteList) {
        $.ajax({
            type: "POST",
            url: "/ServiceCenter/Event/Delete?currentMenuSeq=" + menuSeq,
            data: { "deleteList": deleteList },
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.DeleteAfterMsg);
                    location.href = "/ServiceCenter/Event/Index?menuSeq=" + menuSeq;
                } else {
                    alert(data.msg);
                }
            }
        });
    }, checkDomain: function (text) {
        var returnVal = false;
        var check = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;

        if (!check.test(text)) {
            alert("http(s):// 형식으로 입력하세요.");
        } else {
            returnVal = true;
        }
        return returnVal;
    }, AddBroad: function (broadName, broadSeq) {
        $("input[name='BROAD_NAME']").val(broadName);
        $("input[name='PRG_CD']").val(broadSeq);

        $("#add").click();
    }, eventCheck: function() {
        var proId = "0000";
        if ($("input:radio[name='EventGubun']").is(":checked")) {
            if ($("input:radio[name='EventGubun']:checked").val() == "Integrate") {
                $("#partners").hide();
                $("#integrate").show();
                var proId = $("#integrate option:selected").val();
                $("input[name='proId']").val(proId);
            } else {
                $("#partners").show();
                $("#integrate").hide();
                var proId = $("#partners option:selected").val();
                $("input[name='proId']").val(proId);
            }
        }
    }, eventFlag: function () {
        var format = "-";
        if (winViewFlag == "Y") {
            $("#eventFlag").html("<span>당첨자발표</span>");
            $("#winnerHead").show();
            $("#winnerBody").show();
        } else {
            var startDate = $("input[name='startDate']").val();
            var endDate = $("input[name='endDate']").val();
            var format = "-";

            if (startDate != null && endDate != null) {
                var today = new Date();
                var val1 = startDate.split(format);
                var startDateObj = new Date(val1[0], Number(val1[1]) - 1, val1[2]);
                var val2 = endDate.split(format);
                var endDateObj = new Date(val2[0], Number(val2[1]) - 1, val2[2]);

                if ((startDateObj - today) <= 0 && (endDateObj - today) >= 0) {
                    $("#eventFlag").html("<span>진행중</span>");
                } else if (startDateObj - today > 0) {
                    $("#eventFlag").html("<span>진행전</span>");
                } else if (endDateObj - today < 0) {
                    $("#eventFlag").html("<span>마감</span>");
                }

            }
        }
    }
    
};




$(document).ready(function () {
    var agent = navigator.userAgent.toLowerCase();
    //에디터생성
    SmartEditor.CreateItem("hidTopContent");
    SmartEditor.CreateItem("hidBottomContent");

    //이벤트 구분체크
    EventEdit.eventCheck();
    //진행상태
    EventEdit.eventFlag();

    //날짜체크
    var maxDate;
    $('#dtStartDate, input[name="startDate"]').datepicker({   
        startDate: new Date(),
        format: "yyyy-mm-dd",
        language: "kr",
        autoclose: true,
    }).on('changeDate', function (ev) {
        maxDate = new Date(ev.date);
        maxDate = new Date(maxDate).setDate(maxDate.getDate() + 1);
        maxDate = new Date(maxDate);
        $('#dtEndDate, input[name="endDate"]').datepicker('setStartDate', maxDate).focus(); //dynamically set new start date for #
        $('input[name="startDate"]').val(ev.date.format("yyyy-MM-dd"));
        $('input[name="endDate"]').val("");
        $('input[name="WINNER_DATE"]').val("");
        $('#dtStartDate').datepicker('hide');
    });


    $('#dtEndDate, input[name="endDate"]').datepicker({
        startDate: maxDate,
        format: "yyyy-mm-dd",
        language: "kr",
        autoclose: true,
    }).on('changeDate', function (ev) {
        maxDate = new Date(ev.date);
        maxDate = new Date(maxDate).setDate(maxDate.getDate() + 1);
        maxDate = new Date(maxDate);
        $('#dtWinnerDate, input[name="WINNER_DATE"]').datepicker('setStartDate', maxDate).focus();
        $('input[name="endDate"]').val(ev.date.format("yyyy-MM-dd"));
        $('input[name="WINNER_DATE"]').val("");
        $('#dtEndDate').datepicker('hide');
    });


    $('#dtWinnerDate, input[name="WINNER_DATE"]').datepicker({
        startDate: maxDate,
        format: "yyyy-mm-dd",
        language: "kr",
        autoclose: true,
    }).on('changeDate', function (ev) {
        $('input[name="WINNER_DATE"]').val(ev.date.format("yyyy-MM-dd"));
        $('#dtWinnerDate').datepicker('hide');
    });

    if (imageName != "") {
        $(".fileinput").removeClass("fileinput-new");
        $(".fileinput").addClass("fileinput-exists");
    } 
    

    //이벤트 구분 클릭시
    $("input:radio[name='EventGubun']").on("click", function () {
        EventEdit.eventCheck();
    });

    //파트너 변경시
    $("#partners").on("change", function () {
        $("#partners option:selected").val();
        $("input[name='proId']").val($("#partners option:selected").val());
        $(".fileinput").removeClass("fileinput-new");
        $(".fileinput").addClass("fileinput-exists");
        $("#somenailArea").find("img").remove();
    });
    

    //등록(수정)버튼
    $("#submit").on("click", function () {
        if (EventEdit.check()) {
            EventEdit.Insert();
        }
    });

    //목록클릭
    $("#list").on("click", function () {
        location.href = "/ServiceCenter/Event/Index?menuSeq=" + menuSeq;
    });

    //삭제클릭
    $("#delete").on("click", function () {
        var seq = $("input[name='seq']").val();
        if (seq != null) {
            if (confirm(CommonMsg.DeleteConfirmMsg)) {
                var deleteList = [];
                deleteList.push(seq);
                EventEdit.Delete(deleteList);
            } 
        } else {
            alert("삭제할 항목을 선택해주세요.");
        }
                
    });

    //당첨자발표여부 
    $("input:radio[name='winner']").on("click", function () {
        if ($("input:radio[name='winner']").is(":checked")) {
            if ($("input:radio[name='winner']:checked").val() == "Y") {
                $("#winnerHead").show();
                $("#winnerBody").show();
                if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
                    SmartEditor.CreateItem("hidBottomContent");
                }
            } else {
                $("#winnerHead").hide();
                $("#winnerBody").hide();
            }
        }
    });


    if ($("input:radio[name='winner']").is(":checked")) {
        if ($("input:radio[name='winner']:checked").val() == "Y") {
            $("#winnerHead").show();
            $("#winnerBody").show();
        } else {
            $("#winnerHead").hide();
            $("#winnerBody").hide();
        }
    }


    $("#removeImg").on("click", function () {
        $("#somenailArea").find("img").remove();
    });

});



