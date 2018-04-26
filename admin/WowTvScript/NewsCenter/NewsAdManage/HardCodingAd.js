
var HardCodingAd = {
    Edit: function (SEQ) {

        var strUrl = String.format("HardCodingAdEdit?menuSeq={0}&SEQ={1}", currentMenuSeq, SEQ);

        location.href = strUrl;
    }
}

$(document).ready(function () {

    //등록
    $("#btnReg").click(function () {

        var strUrl = "HardCodingAdEdit?menuSeq=" + $("#hidCurrentMenuSeq").val();

        location.href = strUrl;
    });

});