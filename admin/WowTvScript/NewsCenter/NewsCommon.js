
var currentMenuSeq = $("#hidCurrentMenuSeq").val();
var newsFrontUrl = "http://news.wowtv.co.kr/NewsCenter/News/Read?articleId=";

var NewsCommon = {

    RelationImageDelete: function (artID) {

        if (confirm(CommonMsg.DeleteConfirmMsg)) {

            $.ajax({
                type: 'POST',
                url: "/NewsCenter/NewsCommon/RelationImageDelete?currentMenuSeq=" + currentMenuSeq,
                data: { "artID": artID},
                success: function (data) {

                    if (data.IsSuccess == true) {
                        alert(CommonMsg.DeleteAfterMsg);
                        $("#btnNewsViewClose").click();
                    }
                    else {
                        if (data.Msg == "") {
                            alert(CommonMsg.ErrorMag);
                        }
                        else {
                            alert(data.Msg);
                        }
                    }
                }
            });
        }
    },
    RelationImageSave: function () {

        if ($("#sapnImgFile").text().length <= 0) {
            alert("이미지를 선택하세요.");
            return false;
        }
        else if ($("#sapnImgFile").text() != "") {

            var extension = $("#sapnImgFile").text().split(".").pop().toUpperCase();

            if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                alert('목록(허브) 이미지를 확인 하세요.\r\npng, jpg, gif, jpeg 만 가능합니다');
                return false;
            }
        }

        //저장 확인 Confirm
        if (confirm(CommonMsg.SaveConfirmMsg)) {

            var form = $("#frmImgAdd")[0];
            var formData = new FormData(form);

            $.ajax({
                type: 'POST',
                url: "/NewsCenter/NewsCommon/RelationImageSave?currentMenuSeq=" + currentMenuSeq,
                data: formData,
                //enctype: "multipart/form-data",
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data.IsSuccess == true) {
                        alert(CommonMsg.SaveAfterMsg);
                        $("#btnNewsViewClose").click();
                    }
                    else {
                        if (data.Msg == "") {
                            alert(CommonMsg.ErrorMag);
                        }
                        else {
                            alert(data.Msg);
                        }
                    }
                }
            });
        }

        return false;
    },
    linkwwwUrl: function (articleId) {

        //alert('FRONT URL 정의 필요.');
        //var sUrl = wowTvWebUrl + newsFrontUrl + articleId
        var sUrl = newsFrontUrl + articleId;
        //var openNewWindow = window.open("about:blank");
        //openNewWindow.location.href = sUrl;

        window.open(sUrl, "about:blank");
    },
    linkHtmlUrl: function (articleId, compCode) {

        var sUrl = CastUrl(articleId, compCode);
        if (sUrl.length > 0) {
            var openNewWindow = window.open("about:blank");

            openNewWindow.location.href = sUrl;
        }
        //else
        //{
        //    alert("Html 파일이 없습니다.");
        //}
    },
    htmlReConvert: function (articleId, compCode) {

        if (confirm("선택한 기사를 HTML 재변환 하시겠습니까?")) {

            $.ajax({
                type: 'POST'
                , url: "/NewsCenter/NewsCommon/NewsHtmlConvertUpdate?menuSeq=" + $("#hidCurrentMenuSeq").val()
                , data: { "articleId": articleId, "compCode": compCode }
                , success: function (data, textStatus) {

                    if (data.IsSuccess) {

                        alert("HTML 변환요청이 완료 되었습니다.");
                    }
                }
            });
        }        
    },

    KaKaoStoryScrap: function (articleId, sTitle) {
        var frontUrl = newsFrontUrl + articleId
        Share.kakaostory(frontUrl, sTitle);
    },
    TwitterScrap: function (articleId, sTitle) {
        var frontUrl = newsFrontUrl + articleId
        Share.Twitter(frontUrl, sTitle);
    },
    FacebookScrap: function (articleId) {
        var frontUrl = newsFrontUrl + articleId
        Share.Facebook(frontUrl);
    },
    NewsView: function (articleId) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/NewsCommon/NewsView",
            data: { "menuSeq": currentMenuSeq, "articleId": articleId },
            success: function (data, textStatus) {
                $("#divModalView").html(data);
                $("#divModalView").modal("show");
            }
        });

        //return false;
    }
}

// HTML URL ()
function CastUrl(articleId, compCode) {

    //articleId = "A201709070004";
    //compCode = "WO";

    //http://cast.wowtv.co.kr/폴더명/기사ID.html 생성규칙 : 기사ID 양식이 서로 상이한 경우 이를 구분시킴.
    var filename = String.format("{0}.{1}", articleId, "html");
    var folder = "";
    var castUrl = "";
    var chkFile = false;

    if (compCode == "WO" || compCode == "HK") {
        folder = articleId.substr(1, 8);
    }
    else if (compCode == "YH") {
        folder = articleId.substr(2, 8);
    }
    
    $.ajax({
        type: 'post'
        , async: false     //동기,비동기
        , url: "/NewsCenter/NewsCommon/CastFileCheck"   
        , data: { "articleId": articleId, "compCode": compCode }
        , success: function (data, textStatus) {
            //alert("data " + data.IsFileCheck);
            if (data.IsFileCheck) {
                chkFile = true;
            }
            else
            {
                if (data.Msg == "") {
                    alert("변환된 HTML 파일이 없습니다.");
                    return false;
                }
                else {
                    alert(data.Msg);
                    return false;
                }
            }
        }
    });
  
    if (chkFile) { 
        castUrl = String.format("{0}{1}/{2}", WowTvCastUrl, folder, filename);
    }
    
    return castUrl
}


// http://cast.wowtv.co.kr/castFileCheck.asp 에서 호출하는 함수
// http://cast.wowtv.co.kr/castFileCheck.asp?folder=20170907&filename=A2017090790079&seq=13369&compcode=WO
function castFileCheckOff(seq) {

    $("#linkHtml_" + seq).html("업로드중");

    //alert("call is OffOff! "+seq);
    //$("#text" + seq).html("업로드중");	//Off 상태면, 업로드중
    //$("#text"+seq).html("파일없음");	//Off 상태면, 파일없음
}


//본문내 이미지가 있을경우 이미지사이즈 조절하는 부분(가로만 520이하로 고정. 오른쪽에 10px빠져서 510이 고정값으로 변경됨 ※SNS에서 left 10px떨어져있음)
//AS-IS 소스(2017.8.30)
function imgcheck(imgObj, bool) {

    var imgWidth = 650;     //설정 이미지 넓이 값
    //var imgHeight = 390;  //설정 이미지 높이값

    //이미지가 로딩이 다 된경우
    if (bool) 
    {
        var O_Width = imgObj.width;    //이미지의 실제넓이
        var O_Height = imgObj.height;  //이미지의 실제높이
        var ReWidth = O_Width;         //변화된 넓이 저장 변수
        var ReHeight = O_Height;       //변화된 높이 저장 변수

        if (ReWidth > imgWidth) {
            ReWidth = imgWidth;
            ReHeight = (O_Height * ReWidth) / O_Width;
        }

        //처리
        imgObj.width = ReWidth;
        imgObj.style.width = ReWidth; //IMG태그에 width로 주지않고, style="WIDTH:514px" 이런식으로 준 경우 처리부분
        imgObj.alt = ReWidth + ',' + ReHeight;
    }
    //이미지 로딩오류
    else 
    {
        //안보이게 스타일시트처리
        imgObj.style.display = 'none';
    }
}