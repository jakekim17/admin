var FinanceEdit = {
    check: function check() {
        var returnVal = false;
        var form = document.form;
        if ($("#year option:selected").val() == "") {
            alert("년도를 선택하세요");

        } else if ($("#month option:selected").val() == "") {
            alert("분기를 선택하세요");

        } else if ($("input[name='mecul']").val() == "") {
            alert("영업수익을 입력하세요.");

        } else if ($("input[name='youngupbeyung']").val() == "") {
            alert("영업비용을 입력하세요.");

        } else if ($("input[name='youngupeic']").val() == "") {
            alert("영업이익을 입력하세요.");

        } else if ($("input[name='youngupyesuic']").val() == "") {
            alert("영업외이익을 입력하세요.");

        } else if ($("input[name='youngupyebeyong']").val() == "") {
            alert("영업외비용을 입력하세요.");

        } else if ($("input[name='kyongsngeic']").val() == "") {
            alert("경상이익을 입력하세요.");

        } else {
            returnVal = true;
        }
        return returnVal;
    },
    Insert: function () {
        var length = $("input[type='text']").length;
        for (var idx = 0; idx < length; idx++) {
            $("input[type='text']").eq(idx).val(FinanceEdit.Comma($("input[type='text']").eq(idx).val()));
        } 
        $.ajax({
            type: 'POST',
            url: "/IRSite/Finance/Save?currentMenuSeq="+menuSeq,
            data: $("#financeData").serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    location.href = "/IRSite/Finance/Index?menuSeq=" + menuSeq;
                }
                else {
                    alert(data.msg);
                }
            }
        });

    }, Delete: function (deleteList) {
        $.ajax({
            type: "POST",
            url: "/IRSite/Finance/Delete?currentMenuSeq"+ menuSeq,
            data: { "deleteList": deleteList },
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.DeleteAfterMsg);
                    location.href = "/IRSite/Finance/Index?menuSeq=" + menuSeq;
                } else {
                    alert(data.msg);
                }
            }
        });
    }, Comma: function (data) {
        return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
};

$(document).ready(function () {
   

    //등록(수정)버튼
    $("#submit").on("click", function () {
        if (FinanceEdit.check()) {
            FinanceEdit.Insert();
        }
    });
    $("#list").on("click", function () {
        location.href = "/IRSite/Finance/Index?menuSeq=" + menuSeq;
    });

    $("#delete").on("click", function () {
        var no = $("input[name='no']").val();
        if (no != null) {
            if (confirm(CommonMsg.DeleteConfirmMsg)) {
                var deleteList = [];
                deleteList.push(no);
                FinanceEdit.Delete(deleteList);
            } 
        } else {
            alert("삭제할 항목을 선택해주세요.");
        }
                
    });

});