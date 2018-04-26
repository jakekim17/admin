var broadWebUrl = "http://wowtv.co.kr/Broad/ProgramMain/Index?menuSeq=989";

function FacebookShare(programCode, number) {
    var shareUrl = String.format("{0}&programCode={1}&broadWatchNumber={2}", broadWebUrl, programCode, number);
    Share.Facebook(shareUrl);
}

function NaverShare(programCode, number, sTitle) {
    var shareUrl = String.format("{0}&programCode={1}&broadWatchNumber={2}", broadWebUrl, programCode, number);
    Share.Naver(shareUrl, sTitle);
}

function TwitterShare(programCode, number, sTitle) {
    var shareUrl = String.format("{0}&programCode={1}&broadWatchNumber={2}", broadWebUrl, programCode, number);
    Share.Twitter(shareUrl, sTitle);
}