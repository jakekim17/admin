var ProgramBannerIndex = {
    SearchList: function (currentIndex) {

        if ($("#txtStartDate").val() != "" && $("#txtEndDate").val() != "") {
            if ($("#txtStartDate").val() > $("#txtEndDate").val() != "") {
                alert("시작일이 종료일 보다 클수 없습니다.");
                return false;
            }
        }

        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/ProgramBanner/SearchList?ProgramCode=" + $("#hidProgramCode").val(),
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    OpenEdit: function (programBannerSeq) {
        $.ajax({
            type: 'POST',
            url: "/MyBroadProgram/ProgramBanner/Edit?ProgramCode=" + $("#hidProgramCode").val(),
            data: { "programBannerSeq": programBannerSeq },
            success: function (data, textStatus) {
                $("#divEdit").html(data);
                $("#divEdit").modal("show");
            }
        });

        return false;
    }

};


$(document).ready(function () {

    $("#btnSearch").click(function () {
        ProgramBannerIndex.SearchList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnCreate").click(function () {
        ProgramBannerIndex.OpenEdit(0);

        return false;
    });



    $("#btnSearch").click();


})