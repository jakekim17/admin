var BalanceEdit = {
    check: function check() {
        //var returnVal = false;
        var form = document.form;
        //if ($("#year option:selected").val() == "") {
        //    alert("년도를 선택하세요");

        //} else if ($("input[name='CURNT_ASSET']").val() == "") {
        //    alert("유동자산을 입력하세요.");

        //} else if ($("input[name='NON_CURNT_ASSET']").val() == "") {
        //    alert("비유동자산 입력하세요.");

        //} else if ($("input[name='TOTAL_ASSET']").val() == "") {
        //    alert("자산총계를 입력하세요.");

        //} else if ($("input[name='CURNT_LIABILITES']").val() == "") {
        //    alert("유동부채를 입력하세요.");

        //} else if ($("input[name='NON_CURNT_LIABILITES']").val() == "") {
        //    alert("비유동부채를 입력하세요.");

        //} else if ($("input[name='TOTAL_LIABILITES']").val() == "") {
        //    alert("부채총계를 입력하세요.");

        //} else if ($("input[name='CAPITAL_STOCK']").val() == "") {
        //    alert("자본금을 입력하세요.");

        //} else if ($("input[name='TOTAL_CAPITAL']").val() == "") {
        //    alert("자본총계를 입력하세요.");

        //} else if ($("input[name='OPERATING_PROFIT']").val() == "") {
        //    alert("영업이익을 입력하세요.");

        //} else if ($("input[name='NET_INCOME']").val() == "") {
        //    alert("당기순이익을 입력하세요.");

        //} else if ($("input[name='REVENUE']").val() == "") {
        //    alert("매출액을 입력하세요.");

        //}else {
        //    returnVal = true;
        //}
        returnVal = true;
        return returnVal;
    },
    Insert: function () {
        
        $.ajax({
            type: 'POST',
            url: "/IRSite/Balance/Save?currentMenuSeq="+menuSeq,
            data: $("#balanceData").serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    location.href = "/IRSite/Balance/Index?menuSeq=" + menuSeq;
                }
                else {
                    alert(data.msg);
                }
            }
        });

    }, Delete: function (deleteList) {
        $.ajax({
            type: "POST",
            url: "/IRSite/Balance/Delete?currentMenuSeq="+menuSeq,
            data: { "deleteList": deleteList },
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.DeleteAfterMsg);
                    location.href = "/IRSite/Balance/Index?menuSeq=" + menuSeq;
                } else {
                    alert(data.msg);
                }
            }
        });
    }
    
};

$(document).ready(function () {


    //등록(수정)버튼
    $("#submit").on("click", function () {
        if (BalanceEdit.check()) {
            BalanceEdit.Insert();
        }
    });

    $("#list").on("click", function () {
        location.href = "/IRSite/Balance/Index?MenuSeq=" + menuSeq;
    });

    $("#delete").on("click", function () {
        var no = $("input[name='no']").val();
        if (no != null) {
            if (confirm(CommonMsg.DeleteConfirmMsg)) {
                var deleteList = [];
                deleteList.push(no);
                BalanceEdit.Delete(deleteList);
            }
        } else {
            alert("삭제할 항목을 선택해주세요.");
        }

    });


    $("input").keyup(function (e) {

        if (!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) && e.keyCode != 9 && e.keyCode != 8 && e.keyCode != 17 ) {
            alert("숫자만 입력하세요.");
            $(this).val("");
        }
    });
});

