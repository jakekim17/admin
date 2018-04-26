
var FileCommon = {
    Download: function (url, name) {

        //var formdata = new FormData();
        $("#path").val(url);
        $("#downloadFilename").val(name);
        $("#fileDownload").attr("method", "POST");
        $("#fileDownload").attr("action", "/IntegratedBoard/File/Download");
        $("#fileDownload").submit();

    }
}