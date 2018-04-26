
var AdminManageEdit = {
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/OperateManage/AdminManage/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "seq": $("#hidSeq").val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        $("#divEdit").modal("hide");
                        $("#divEdit").html("");
                        AdminManageIndex.SearchList(0);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },

    PwdInit: function () {
        if (confirm(CommonMsg.PwdInitConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/OperateManage/AdminManage/usp_AdminCmsPwdInitialize?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "adminid": $("#hidADMIN_ID").val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        alert("비밀번호가 정상적으로 초기화처리되었습니다.");
                        $("#divEdit").modal("hide");
                        $("#divEdit").html("");
                        AdminManageIndex.SearchList(0);
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },

    PwdInitRanNum: function () {

        var hdMobileNo1 = $("#hdMobileNo1").val();
        var hdMobileNo2 = $("#hdMobileNo2").val();
        var hdMobileNo3 = $("#hdMobileNo3").val();

        if (hdMobileNo1 == "" || hdMobileNo2 == "" || hdMobileNo2 == "0000" || hdMobileNo3 == "" || hdMobileNo3 == "0000")
        {
            alert("휴대폰번호를 확인하세요.");
        }
        else {
            if (confirm(CommonMsg.PwdInitConfirmMsg) == true) {
                $.ajax({
                    type: 'POST',
                    url: "/OperateManage/AdminManage/AdminCmsPwdInitializeRanNum?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                    data: { "adminid": $("#hidADMIN_ID").val() },
                    success: function (data, textStatus) {
                        if (data.IsSuccess == true) {
                            alert("비밀번호가 정상적으로 초기화처리되었습니다.");
                            $("#divEdit").modal("hide");
                            $("#divEdit").html("");
                            AdminManageIndex.SearchList(0);
                        }
                        else {
                            alert(data.Msg);
                        }
                    }
                });
            }
        }

        return false;
    },

    Save: function () {
        if ($("#cboGroupSeq").val() == "" || $("#cboGroupSeq").val() == "0") {
            alert("권한을 선택하여 주십시오.");
            $("#cboGroupSeq").focus();
            return false;
        }

        if ($("#txtAdminId").val() == "") {
            alert("아이디를 입력하여 주십시오.");
            $("#txtAdminId").focus();
            return false;
        }

        if ($("#hidSeq").val() == "" || $("#hidSeq").val() == "0") {
            if ($("#pwdPwd").val() == "") {
                alert("비밀번호를 입력하여 주십시오.");
                $("#pwdPwd").focus();
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

        if ($("[name='IP_TYPE']:checked").val() == "IPv4") {
            if ($("#txtIp").val() == "") {
                alert("IPv4를 입력하여 주십시오.");
                $("#txtIp").focus();
                return false;
            }

            if ($("#txtIp").val() != "*.*.*.*") {
                var ip = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
                if (ip.test($("#txtIp").val()) == false) {
                    alert("IP 형식을 확인하여 주십시오.");
                    return false;
                }
            }
        }
        else {
            if ($("#txtIp6").val() == "") {
                alert("IPv6를 입력하여 주십시오.");
                $("#txtIp6").focus();
                return false;
            }
        }

        if ($("#cboPartName").val() == "") {
            alert("부서를 선택하여 주십시오.");
            $("#cboPartName").focus();
            return false;
        }
        if ($("#cboJobCode").val() == null || $("#cboJobCode").val() == "") {
            alert("담당업무를 선택하여 주십시오.");
            $("#cboJobCode").focus();
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



        $.ajax({
            type: 'POST',
            url: "/OperateManage/AdminManage/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    alert("저장 되었습니다.");

                    $("#divEdit").modal("hide");
                    $("#divEdit").html("");
                    AdminManageIndex.SearchList($("#currentIndex").val());
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

    $(".devNumber").keyup(function (event) {
        if (isNaN($(this).val()) == true) {
            alert("숫자만 가능합니다.");
            $(this).val("");
            return false;
        }
    });


    $("#divEdit_btnDelete").click(function () {
        AdminManageEdit.Delete();

        return false;
    });

    $("#divEdit_btnPwdInit").click(function () {
        AdminManageEdit.PwdInit();

        return false;
    });

    $("#divEdit_btnPwdInitRanNum").click(function () {
        AdminManageEdit.PwdInitRanNum();

        return false;
    });

    $("#divEdit_btnSave").click(function () {
        AdminManageEdit.Save();

        return false;
    });

});

