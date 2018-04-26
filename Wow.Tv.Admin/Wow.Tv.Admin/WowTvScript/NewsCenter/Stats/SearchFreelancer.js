var SearchFreelancer = {
    BindTopList: function (selectorId,userId, bindId) {
        //class="collapse out"
        if ($("#" + selectorId).attr("class") === "collapse out" || $("#" + selectorId).attr("class") === "collapse" ) {
            $.ajax({
                type: "POST",
                url: "/NewsCenter/Stats/SearchFreelancerArticleRank?menuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { StartDate: $("#txtStartDate").val(), EndDate: $("#txtEndDate").val(), SearchText: userId },
                success: function(data) {
                    $("#" + bindId).html(data);
                }
            });
        } 

        return false;
        
    }
}
