$(document).ready(function () {

    $("#btnSearch").click(function () {

        var startDate = $("#txtStartDate").val();
        var endDate = $("#txtEndDate").val();

        if (startDate.length == 0) {
            alert("시작날짜를 입력하세요.");
            return false;
        }

        var startDateArr = startDate.split('-');
        var startDateCompare = parseInt(startDateArr[0] + startDateArr[1] + startDateArr[2]);

        //if (startDateCompare < parseInt("20180201")) {
        //    alert("시작날짜를 확인하세요. 2018-02-01이후 일자를 입력하세요.");
        //    return false;
        //}

        if (endDate.length == 0) {
            alert("종료날짜를 입력하세요.");
            return false;
        }

        if (Traffic.DateDiff(startDate, endDate) < 0) {
            alert("시작날짜와 종료날짜를 확인하세요.");
            return false;
        }

        if (Traffic.DateDiff(startDate, endDate) > 365) {
            alert("1년 이상 검색을 할 수 없습니다.");
            return false;
        }
        Provide.BindProvid("divProvideList");
    });
});

var Provide = {
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
