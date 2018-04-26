
/*********************************************************************************************************************
 * Share(공유하기)
 * 네이버           :https://developers.naver.com/docs/share/navershare/
 * 카카오 스토리    : https://developers.kakao.com/docs/js/kakaostory-share
 * 카카오스토리(웹) : https://developers.kakao.com/docs/js/demos/story-create-share-button
 * 트위터          : https://dev.twitter.com/web/tweet-button
 * 페이스북        : https://developers.facebook.com/docs/plugins/share-button
 *********************************************************************************************************************/
//var baseUrl = "http://www.wowtv.co.kr/";
//var baseUrl = wowTvWebUrl ;
var baseUrl = "";
var Share = {

    Naver: function (sUrl, sTitle) {

        sUrl = baseUrl + sUrl
        sUrl = encodeURI(encodeURIComponent(sUrl));
        sTitle = encodeURI(sTitle);
        var shareURL = "http://share.naver.com/web/shareView.nhn?url=" + sUrl + "&title=" + sTitle;
        var openWin = window.open(shareURL, 'NaverShareWin', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=700,left=0,top=0');
        openWin.focus();
    },
    kakaostory: function (sUrl, sTitle) {
        
        sUrl = baseUrl + sUrl
        sTitle = sTitle;

        window.kakaoAsyncInit = function () {
            Kakao.init('ea562ec06e466bdd5c8be1bf5f7754af');
        };
        Kakao.Story.share({
            url: sUrl,
            text: sTitle
        });
    },
    Twitter: function (sUrl, sTitle) {

        sUrl = baseUrl + sUrl
        sUrl = encodeURIComponent(sUrl);
        sTitle = encodeURIComponent(sTitle);

        var shareURL = "https://twitter.com/intent/tweet?text=" + sTitle +"&url=" + sUrl;
        var openWin = window.open(shareURL, 'TwitterShareWin', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=470,width=500,left=0,top=0');
        openWin.focus();
    },
    Facebook: function (sUrl) {

        sUrl = baseUrl + sUrl
        sUrl = encodeURIComponent(sUrl);
        var shareURL = "https://www.facebook.com/sharer/sharer.php?u=" + sUrl;
        var openWin = window.open(shareURL, 'FacebookShareWin', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=500,left=0,top=0');
        openWin.focus();
    },
    Twitter_old: function (sUrl, sTitle) {

        /**
         * AS-IS ASP Source
         */
        //var twtitter_url = "http://twitter.com/intent/tweet?original_referer=&text=" + toUTF8('<%=Link_URL%>') + "&url=http%3A%2F%2Fwww.wowtv.co.kr%2Fnewscenter%2Fnews%2Fview.asp%3Fartid=<%=viewBox.getData("artid")%>";
        //var twtitter_open = window.open(twtitter_url, 'twitter', 'width=655, height=350');
    },
    Facebook_old: function (sUrl, sTitle, sImage, sSummary) {

        /**
         * AS-IS ASP Source
         */
        /*즉시미반영(페이스북 자체 내부 캐시문제)
        //	var facebook_url = "http://www.facebook.com/share.php?u=<%=Link_URL_facebook1%>&t=" + toUTF8('<%=Link_URL_facebook2%>') + "&src=sp";
        //	var facebook_open = window.open(facebook_url, 'facebook',"width=655, height=520");
        */

        /*
        //즉시반영
        var image = "";
        var title = "";
        var summary = "";
        url = "<%=Link_URL_facebook1%>";

        //<%'FB로 보내는 이미지를 DB내용중에 contentsimg컬럼의 값을 넣어주는 부분%>
        //	image  = '<%'=replace(REPLACE(viewBox.getData("content") , "\upload_view/", "http://image.wowtv.co.kr/wowtv_upload/"),"\","/")%>';

        image = '<%=replace(REPLACE(viewBox.getData("content") , "\upload_view/", "http://image.wowtv.co.kr/wowtv_upload/"),"\","/")%>';

        title = "<%=Link_URL_facebook2%>";

        summary = '<%=viewBox.getData("title")%>';

        var url = "http://www.facebook.com/sharer.php?s=100&p[url]=" + url + "&p[images][0]=" + image + "&p[title]=" + title + "&p[summary]=" + summary;

        //var url:String = "http://www.facebook.com/sharer.php?s=100&p[url]=" + url + "&p[images][0]=" + image + "&p[title]=" + title + "&p[summary]=" + summary;
        url = url.split("#").join("%23");

        url = encodeURI(url);
        window.open(url, 'facebook', "width=655, height=520");
        //	location.href=url;
        */
    }

}


