
var NewRegCfmIndex = {

    SetRegistDateSearch: function (days) {
        var registDateFrom = GetSearchDate(days);
        var registDateTo = GetSearchDate(0);

        $("#RegistDateFrom").val(registDateFrom);
        $("#RegistDateTo").val(registDateTo);
    },

    SearchList: function (currentIndex) {
        $("#CurrentIndex").val(currentIndex);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Monitoring/NewRegCfm/Index?menuSeq=" + $("#CurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
}

$(document).ready(function () {

    $("#RegistDateSearch1").click(function () {
        NewRegCfmIndex.SetRegistDateSearch(0);
        return false;
    });
    $("#RegistDateSearch2").click(function () {
        NewRegCfmIndex.SetRegistDateSearch(-1);
        return false;
    });
    $("#RegistDateSearch3").click(function () {
        NewRegCfmIndex.SetRegistDateSearch(-3);
        return false;
    });
    $("#RegistDateSearch4").click(function () {
        NewRegCfmIndex.SetRegistDateSearch(-7);
        return false;
    });
    $("#RegistDateSearch5").click(function () {
        NewRegCfmIndex.SetRegistDateSearch(-10);
        return false;
    });
    $("#RegistDateSearch6").click(function () {
        NewRegCfmIndex.SetRegistDateSearch(-30);
        return false;
    });

    $("#btnSearch").click(function () {
        var searchType = $("#SearchType").val();
        var searchText = $("#SearchText").val();
        if (searchType == "" && searchText != "") {
            alert("검색조건을 선택하세요.");
            return false;
        }
        NewRegCfmIndex.SearchList(0);
        return false;
    });
    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();
            return false;
        }
        else {
            return true;
        }
    });

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#CurrentIndex").val(), $("#PageSize").val(), "NewRegCfmIndex.SearchList"));
});
