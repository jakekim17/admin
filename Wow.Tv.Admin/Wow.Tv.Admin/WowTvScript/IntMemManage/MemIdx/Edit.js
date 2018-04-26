
var MemIdxEdit = {
    GoList: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/IntMemManage/MemIdx/Index?menuSeq=" + $("#CurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    RestoreDormancyMobileAuth: function () {

        if (confirm("휴대폰번호(" + $("#hidRestoreDormancyMobileNo").val() +") 인증번호를 발송 하시겠습니까?") == true) {
            $.ajax({
                type: 'POST',
                url: "/IntMemManage/MemIdx/RestoreDormancyMobileAuth?currentMenuSeq=" + $("#CurrentMenuSeq").val(),
                data: { "mobileNo": $("#hidRestoreDormancyMobileNo").val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        $("#hidRestoreDormancyMobileAuthNo").val(data.AuthNumber);
                        $("#txtRestoreDormancyMobileAuthNo").css("display", "");
                        $("#btnRestoreDormancyMobileAuthConfirm").css("display", "");
                    }
                    else {
                        alert("오류가 발생하였습니다.\r\n" + data.ReturnMessage);
                    }
                }
            });
        }
        return false;
    },
    RestoreDormancyMobileAuthConfirm: function () {
        var sendedAuthNo = $("#hidRestoreDormancyMobileAuthNo").val();
        var inputAuthNo = $("#txtRestoreDormancyMobileAuthNo").val();
        if (sendedAuthNo == inputAuthNo) {
            alert("인증되었습니다.");
            $("#btnRestoreDormancy").css("display", "");
        }
        else {
            alert("인증번호가 올바르지 않습니다.");
        }
    },
    RestoreDormancy: function () {
        if (confirm("휴면회원을 해지하시겠습니까?") == true) {
            $.ajax({
                type: 'POST',
                url: "/IntMemManage/MemIdx/RestoreDormancy?currentMenuSeq=" + $("#CurrentMenuSeq").val(),
                data: { "userNumber": $("#UserNumber").val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        alert("처리되었습니다.");
                        location.reload();
                    }
                    else {
                        alert("오류가 발생하였습니다.\r\n" + data.ReturnMessage);
                    }
                }
            });
        }
        return false;
    },
    PasswordInitialize: function () {

        var hdMobileNo1 = $("#hdMobileNo1").val();
        var hdMobileNo2 = $("#hdMobileNo2").val();
        var hdMobileNo3 = $("#hdMobileNo3").val();

        if (hdMobileNo1 == "" || hdMobileNo2 == "" || hdMobileNo2 == "0000" || hdMobileNo3 == "" || hdMobileNo3 == "0000")
        {
            alert("휴대폰번호를 확인하세요.");
        }
        else {
            if (confirm("비밀번호를 초기화 하시겠습니까?") == true) {
                $.ajax({
                    type: 'POST',
                    url: "/IntMemManage/MemIdx/PasswordInitialize?currentMenuSeq=" + $("#CurrentMenuSeq").val(),
                    data: { "userNumber": $("#UserNumber").val() },
                    success: function (data, textStatus) {
                        if (data.IsSuccess == true) {
                            alert("초기화 비밀번호가 사용자의 휴대폰으로 전달되었습니다.");
                        }
                        else {
                            alert(data.ReturnMessage);
                        }
                    }
                });
            }
        }
        return false;
    },

    Save: function () {

        var interestList = "";
        $("[name=Interest]").each(function () {
            if ($(this).prop("checked") == true) {
                interestList += $(this).val() + ",";
            }
        });
        $("#InterestList").val(interestList);

        var form = $('#frmEdit')[0];
        var formData = new FormData(form);

        $.ajax({
            type: 'POST',
            url: "/IntMemManage/MemIdx/Save?currentMenuSeq=" + $("#CurrentMenuSeq").val(),
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    MemIdxEdit.GoList();
                }
                else {
                    alert(data.ReturnMessage);
                }
            }
        });
    },
    Secession: function () {
        if (confirm("탈퇴처리 하시겠습니까?") == true) {
            $.ajax({
                type: 'POST',
                url: "/IntMemManage/MemIdx/Secession?currentMenuSeq=" + $("#CurrentMenuSeq").val(),
                data: { "userNumber": $("#UserNumber").val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        MemIdxEdit.GoList();
                    }
                    else {
                        alert(data.ReturnMessage);
                    }
                }
            });
        }

        return false;
    },
    AddressSearch: function () {
        if (AddressSearchOpened == false) {
            $.ajax({
                type: "POST",
                url: "/IntMemManage/MemIdx/AddressSearch?returnmethod=MemIdxEdit.AddressSearchResult",
                data: {},
                success: function (data) {
                    $("#divAddressSearch").html(data);
                    $("#divAddressSearch").modal("show");
                    AddressSearchLayerOpen();
                }
            });
        }
        else {
            $("#divAddressSearch").modal("show");
        }

        return false;
    },

    AddressSearchResult: function (zipCode, address1) {
        $("#ZipCode").val(zipCode);
        $("#Address").val(address1);
        $("#divAddressSearch").modal("hide");
    },

    Approve: function () {
        if (confirm("승인하시겠습니까?") == true) {
            $.ajax({
                type: "POST",
                url: "/IntMemManage/MemIdx/UserApproval",
                data: {
                    userNumber: $("#UserNumber").val(), approved: "1", reason: ""
                },
                success: function (data) {
                    alert("승인 처리 되었습니다.");
                    location.reload();
                }
            });
        }
    },

    Reject: function () {
        $("#divRejectReason").css("display", "block");
    },

    RejectProcess: function () {
        if (confirm("반려하시겠습니까?") == true) {
            $.ajax({
                type: "POST",
                url: "/IntMemManage/MemIdx/UserApproval",
                data: {
                    userid: $("#UserId").val(), userNumber: $("#UserNumber").val(), approved: "0", reason: $("#RejectReason").val()
                },
                success: function (data) {
                    alert("반려 처리 되었습니다.");
                    location.reload();
                }
            });
        }
    }
}

var AddressSearchOpened = false;

$(document).ready(function () {
    $("#btnGoList").click(function () {
        MemIdxEdit.GoList();
        return false;
    });

    $("#btnRestoreDormancyMobileAuth").click(function () {
        MemIdxEdit.RestoreDormancyMobileAuth();
        return false;
    });

    $("#btnRestoreDormancyMobileAuthConfirm").click(function () {
        MemIdxEdit.RestoreDormancyMobileAuthConfirm();
        return false;
    });

    $("#btnRestoreDormancy").click(function () {
        MemIdxEdit.RestoreDormancy();
        return false;
    });

    $("#btnPasswordInitialize").click(function () {
        MemIdxEdit.PasswordInitialize();
        return false;
    });

    $("#btnSave").click(function () {
        MemIdxEdit.Save();
        return false;
    });

    $("#btnDelete").click(function () {
        MemIdxEdit.Secession();
        return false;
    });

    $("#btnAddressSearch").click(function () {
        MemIdxEdit.AddressSearch();
        return false;
    });

    $("#btnApprove").click(function () {
        MemIdxEdit.Approve();
        return false;
    });

    //$("#btnReject").click(function () {
    //    MemIdxEdit.Reject();
    //    return false;
    //});

    $("#btnRejectProcess").click(function () {
        MemIdxEdit.RejectProcess();
        return false;
    });

    $(window.document).on("contextmenu", function (event) { return false; }); // 우클릭방지
    $(window.document).on("selectstart", function (event) { return false; });// 더블클릭을 통한 선택방지
    $(window.document).on("dragstart", function (event) { return false; });	// 드래그
});
















