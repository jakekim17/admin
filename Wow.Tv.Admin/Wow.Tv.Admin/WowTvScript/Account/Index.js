
var AccountIndex = {
    MakeCapcha: function () {
        d = new Date();
        $("#imgCaptCha").attr("src", "/Account/CaptChaImage?" + d.getTime());

        return false;
    },
    MobileAuthNumberSend: function () {
        if ($("#txtUserId").val() == "") {
            alert("사용자 아이디를 입력하여 주십시오.");
            $("#txtUserId").focus();
            return false;
        }

        $.ajax({
            type: 'POST',
            url: "/Account/SendSms",
            data: { "adminId": $("#txtUserId").val()},
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    alert("인증번호가 발송되었습니다.");
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    Login: function () {
        if ($("#txtUserId").val() == "") {
            alert("사용자 아이디를 입력하여 주십시오.");
            $("#txtUserId").focus();
            return false;
        }

        if ($("#pwdPassword").val() == "") {
            alert("비밀번호를 입력하여 주십시오.");
            $("#pwdPassword").focus();
            return false;
        }

        if ($("#txtMobileAuthNumber").val() == "") {
            alert("휴대폰 인증번호를 입력하여 주십시오.");
            $("#txtMobileAuthNumber").focus();
            return false;
        }

        if ($("#txtCapcha").length > 0 && $("#txtCapcha").val() == "") {
            alert("보안문자를 입력하여 주십시오.");
            $("#txtCapcha").focus();
            return false;
        }
        

        $.ajax({
            type: 'POST',
            url: "/Account/Login",
            data: $("#frmLogin").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    alert(data.Msg);

                    if (data.ReturnUrl == null || data.ReturnUrl == "") {
                        document.location.href = "/Home/Index";
                    }
                    else {
                        document.location.href = data.ReturnUrl;
                    }
                }
                else {
                    alert(data.Msg);
                    document.location.href = "/Account/Index";
                }
            }
        });


        return false;
    },
    GoRegist: function () {
        document.location.href = "/Account/Regist";

        return false;
    }


}


$(document).ready(function () {

    $("#btnCapchaReload").click(function () {
        AccountIndex.MakeCapcha();

        return false;
    });

    $("#btnMobileAuthNumber").click(function () {
        AccountIndex.MobileAuthNumberSend();

        return false;
    });

    $("#btnLogin").click(function () {
        AccountIndex.Login();

        return false;
    });

    $("#btnRegist").click(function () {
        AccountIndex.GoRegist();

        return false;
    })


    $("#frmLogin").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnLogin").click();

            return false;
        }
    });


});

