
var MainManageSearchList = {
    UpDown: function (mainManageSeq, isUp) {
        $.ajax({
            type: "POST",
            url: "/OperateManage/MainManage/UpDown?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "mainManageSeq": mainManageSeq, "isUp": isUp },
            success: function (data) {
                if (data.IsSuccess == true) {
                    //alert("성공");
                    MainManageIndex.BindSearchList();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}

