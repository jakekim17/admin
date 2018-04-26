$(document).ready(function () {
    
    $("#btnSearch").click(function () {
        SearchProvide.BindProvid();
    });

    //검색 종료일
    $("#txtEndDate").val(SetAddDay(new Date().format("yyyy-MM-dd")) , - 1);

    //검색 시작일
    $("#txtStartDate").val(SetAddDay(new Date().format("yyyy-MM-dd")) ,- 1);
});

var SearchProvide = {
    BindProvid: function (targetDiv, callbackMethod) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Stats/SearchProvide?menuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { StartDate: $("#txtStartDate").val(), EndDate: $("#txtEndDate").val() },
            success: function (data) {
                $("#" + targetDiv).html(data);
                if (callbackMethod != null) {
                    callbackMethod();
                }
            }
        });

        return false;
    }
}
