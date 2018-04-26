
var ExpertItem = {
    PayNo: 0,
    ExpertName: "",
    Cafe: "",
    Broad: "",
    Profile: "",
    Image: ""
};

var ExpertSearch = {
    SearchList: function (currentIndex) {
        $("#divExpertSearch_currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/BroadCast/Expert/SearchList",
            data: $("#divExpertSearch_frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divExpertSearch_divList").html(data);
            }
        });

        return false;
    },
    Apply: function () {
        var expertItem = ExpertSearchList.GetSelectedItem();

        if (expertItem == null) {
            alert("전문가를 선택하여 주십시오.");
            return false;
        }
        
        if (typeof ExpertSelectApply == "function") {
            ExpertSelectApply(expertItem);
        }
        else {
            alert("ExpertSelectApply 함수가 선언되지 않았습니다.");
        }
        
        return false;
    }

};


$(document).ready(function () {

    $("#divExpertSearch_btnSearch").click(function () {
        ExpertSearch.SearchList(0);

        return false;
    });


    $("#divExpertSearch_frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#divExpertSearch_btnSearch").click();

            return false;
        }
    });


    $("#divExpertSearch_btnApply").click(function () {
        ExpertSearch.Apply();

        return false;
    });



    $("#divExpertSearch_btnSearch").click();

});

