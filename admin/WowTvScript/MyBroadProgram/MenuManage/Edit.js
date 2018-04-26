
var MyProgramMenuManageEdit = {
    ModeChange: function () {
        if ($("[name='DEPTH']:checked").val() == "1") {
            $("#cboUpMenu").attr("disabled", true);
        }
        else {
            $("#cboUpMenu").attr("disabled", false);
        }

        $("#cboContentSeq").attr("disabled", true);
        $("#cboContentSeq2").attr("disabled", true);
        $("#cboContentSeq3").attr("disabled", true);
        if ($("[name='CONTENT_TYPE_CODE']:checked").val() == "Corner") {
            $("#cboContentSeq3").attr("disabled", false);
        }
        else if ($("[name='CONTENT_TYPE_CODE']:checked").val() == "Board") {
            $("#cboContentSeq").attr("disabled", false);
        }
        else if ($("[name='CONTENT_TYPE_CODE']:checked").val() == "Trade") {
            $("#cboContentSeq2").attr("disabled", false);
        }
        
        if ($("#hidFixYn").val() == "Y") {

            if ($("#hidBoardTypeCode").val() == "FeedBack") {
                $("[name='ACTIVE_YN']").attr("disabled", false);
            }
            else {
                $("[name='ACTIVE_YN']").attr("disabled", true);
            }

            $("#cboContentSeq").attr("disabled", true);
            $("#cboContentSeq2").attr("disabled", true);
        }

        return false;
    },
    Save: function () {
        if ($("[name='DEPTH']:checked").val() == "2") {
            if ($("#cboUpMenu").val() == "") {
                alert("상위메뉴를 선택하여 주십시오.");
                return false;
            }

            if ($("#cboUpMenu").val() == $("#hidMenuSeq").val()) {
                alert("상위메뉴가 자신과 동일합니다.");
                return false;
            }
        }

        if ($("#hidFixYn").val() != "Y") {
            if ($("[name='CONTENT_TYPE_CODE']:checked").length == 0) {
                alert("게시판 유형을 선택하여 주십시오.");
                return false;
            }
        }

        if ($("[name='CONTENT_TYPE_CODE']:checked").val() == "Board") {
            if ($("#cboContentSeq").val() == "") {
                alert("통합게시판을 선택하여 주십시오.");
                return false;
            }
        }

        if ($("#txtMenuName").val() == "") {
            alert("메뉴명을 입력하여 주십시오.");
            return false;
        }

        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/MenuManage/Save?ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    MyProgramMenuManageIndex.Init();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
};



$(document).ready(function () {
    
    $("[name='DEPTH']").change(function () {
        MyProgramMenuManageEdit.ModeChange();
        $("[name='CONTENT_TYPE_CODE'][value='Corner']").prop("checked", true);
        $("[name='CONTENT_TYPE_CODE']").attr("disabled", true);
        $("[name='CONTENT_SEQ']").attr("disabled", true);

        return false;
    });

    $("[name='CONTENT_TYPE_CODE']").change(function () {
        MyProgramMenuManageEdit.ModeChange();

        return false;
    });
    
    MyProgramMenuManageEdit.ModeChange();

    if ($("#hidMenuSeq").val() > 0) {
        $("[name='DEPTH']").attr("disabled", true);
        $("[name='UP_MENU_SEQ']").attr("disabled", true);
        $("[name='CONTENT_TYPE_CODE']").attr("disabled", true);
        $("[name='CONTENT_SEQ']").attr("disabled", true);
    }
});

