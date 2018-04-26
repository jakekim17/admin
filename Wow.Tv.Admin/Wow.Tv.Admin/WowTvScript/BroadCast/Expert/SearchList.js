
var ExpertSearchList = {
    GetSelectedItem: function () {
        var expertItem = null;
        var selectedRadio = $("#divExpertSearchList_tblList").find("[name='payNo']:checked");

        if ($("#divExpertSearchList_tblList").find("[name='payNo']:checked").length > 0) {
            expertItem = {};
            expertItem.PayNo = selectedRadio.val();
            expertItem.ExpertName = selectedRadio.next().val();
            expertItem.Cafe = selectedRadio.next().next().val();
            expertItem.Broad = selectedRadio.next().next().next().val();
            expertItem.Profile = selectedRadio.next().next().next().next().val();
            expertItem.Image = selectedRadio.next().next().next().next().next().val();
        }

        return expertItem;
    }

};

$(document).ready(function () {

    $("#divExpertSearchList_divPaging").html(cfGetPagingHtml(totalDataCount, $("#divExpertSearch_currentIndex").val(), $("#divExpertSearch_pageSize").val(), "ExpertSearch.SearchList"));

})