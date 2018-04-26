
var BroadWatchEdit = {
    GoList: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/MyBroadProgram/BroadWatch/Index?" + "menuSeq=" + $("#hidCurrentMenuSeq").val() + "&ProgramCode=" + $("#hidProgramCode").val());
        $("#frmSearch").submit();

        return false;
    },
    Save: function () {
        if ($("#txtTitle").val() == "") {
            alert("제목을 입력하여 주십시오.");
            $("#txtTitle").focus();
            return false;
        }

        //if ($("#txtBroadDate").val() == "") {
        //    alert("방송일을 입력하여 주십시오.");
        //    $("#txtBroadDate").focus();
        //    return false;
        //}


        $("#txtBroad_date").val($("#txtBroadDate").val().replaceAll("-", "").replaceAll("/", "") + $("#cboBroadHour").val() + $("#cboBroadMinute").val());

        SmartEditor.SaveDataItem("hidContents");

        //var form = $('#frmSave')[0];
        //var formData = new FormData(form);
        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/BroadWatch/Save?ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSave").serialize(), //formData
            //processData: false,
            //contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    BroadWatchEdit.GoList();
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

    $("#btnCancel").click(function () {
        BroadWatchEdit.GoList();

        return false;
    });


    $("#btnSave").click(function () {
        BroadWatchEdit.Save();

        return false;
    });



    $("#btnFacebook").click(function () {
        //Share.Facebook(wowVodWebUrl);
        console.log('aaaa');
        FacebookShare($('#hidProgramCode').val(), $('input[name="Num"]').val());
        return false;
    });
    $("#btnTwitter").click(function () {
        //Share.Twitter(wowVodWebUrl);
        TwitterShare($('#hidProgramCode').val(), $('input[name="Num"]').val(), $('#txtTitle').val());
        return false;
    });
    $("#btnNaver").click(function () {
        Share.Naver(wowVodWebUrl);
        NaverShare($('#hidProgramCode').val(), $('input[name="Num"]').val(), $('#txtTitle').val());
        return false;
    });


    SmartEditor.CreateItem("hidContents");

});


