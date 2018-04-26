var AccountRegist = {
    ExistCheck: function () {
        $.ajax({
            type: 'POST',
            url: "/Account/ExistCheck",
            data: { "adminId": $("#txtAdminId").val()},
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    alert("사용가능한 아이디 입니다.");
                    $("#hidExistCheck").val("1");
                }
                else {
                    $("#hidExistCheck").val("");
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    RegistProc: function () {
        if ($("#cboJobCode").val() == null || $("#cboJobCode").val() == "") {
            alert("담당업무를 선택하여 주십시오.");
            $("#cboJobCode").focus();
            return false;
        }
        if ($("#txtAdminId").val() == "") {
            alert("아이디를 입력하여 주십시오.");
            $("#txtAdminId").focus();
            return false;
        }
        if ($("#hidExistCheck").val() == "") {
            alert("아이디 중복을 체크하여 주십시오.");
            $("#hidExistCheck").focus();
            return false;
        }
        if ($("#pwdPwd").val() == "") {
            alert("비밀번호를 입력하여 주십시오.");
            $("#pwdPwd").focus();
            return false;
        }
        if ($("#pwdPwdConfirm").val() == "") {
            alert("비밀번호 확인을 입력하여 주십시오.");
            $("#pwdPwdConfirm").focus();
            return false;
        }
        if ($("#txtName").val() == "") {
            alert("이름을 입력하여 주십시오.");
            $("#txtName").focus();
            return false;
        }
        if ($("#txtMobile1").val() == "") {
            alert("휴대폰 번호를 입력하여 주십시오.");
            $("#txtMobile1").focus();
            return false;
        }
        if ($("#txtMobile2").val() == "") {
            alert("휴대폰 번호를 입력하여 주십시오.");
            $("#txtMobile2").focus();
            return false;
        }
        if ($("#txtMobile3").val() == "") {
            alert("휴대폰 번호를 입력하여 주십시오.");
            $("#txtMobile3").focus();
            return false;
        }
        if ($("#cboPartName").val() == "") {
            alert("부서를 선택하여 주십시오.");
            $("#cboPartName").focus();
            return false;
        }
        if ($("#txtPhone1").val() == "") {
            alert("연락처를 입력하여 주십시오.");
            $("#txtPhone1").focus();
            return false;
        }
        if ($("#txtPhone2").val() == "") {
            alert("연락처를 번호를 입력하여 주십시오.");
            $("#txtPhone2").focus();
            return false;
        }
        if ($("#txtPhone3").val() == "") {
            alert("연락처를 번호를 입력하여 주십시오.");
            $("#txtPhone3").focus();
            return false;
        }


        if ($("#pwdPwd").val() != $("#pwdPwdConfirm").val()) {
            alert("비밀번호와 비밀번호 확인은 동일해야 합니다.");
            return false;
        }

        var a = /[a-z]/i
        var s = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/i;
        var n = /[0-9]/i;

        if (s.test($("#pwdPwd").val()) == true) {
            if ($("#pwdPwd").val().length < 8) {
                alert("비밀번호에 특수문자가 포한된 경우 8 자리 이상을 입력하여 주셔야 합니다.");
                return false;
            }
        }
        else if (a.test($("#pwdPwd").val()) == true) {
            if ($("#pwdPwd").val().length < 10) {
                alert("비밀번호에 특수문자가 포함되지 않은 경우 10 자리 이상을 입력하여 주셔야 합니다.");
                return false;
            }
        }
        else {
            alert("비밀번호에는 숫자만 입력하실수 없습니다.");
            return false;
        }

        $.ajax({
            type: 'POST',
            url: "/Account/RegistProc",
            data: $("#frmRegist").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    alert("등록 되었습니다.\r\n관리자 승인후 로그인 가능합니다.")
                    document.location.href = "/Account/Index";
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }

}


$(document).ready(function () {
    $(".devNumber").keyup(function (event) {
        if (isNaN($(this).val()) == true) {
            alert("숫자만 가능합니다.");
            $(this).val("");
            return false;
        }
    });


    $("#btnRegistProc").click(function () {
        AccountRegist.RegistProc();

        return false;
    });

    $("#btnCancel").click(function () {
        document.location.href = "/Account/Index";

        return false;
    });

    $("#btnExistCheck").click(function () {
        AccountRegist.ExistCheck();

        return false;
    })
});
