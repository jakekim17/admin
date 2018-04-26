
//Common단 스크립트 세팅
if (!window.co) window.co = {};

// =========================================
// String prototype 
String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}

/**************************************************************************
 * 공백제거(중간 공백도 제거한다) prototype
 * @returns trim 된 문자열
 * @사용법 : 문자열.trim()
***************************************************************************/
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '').replace(/\s/g, '');
};

/**************************************************************************
 * 이메일 유효성 검사 prototype
 * @returns bool :  true = 정상 false = 실패
 * @사용법 : 문자열.isEmail()
***************************************************************************/
String.prototype.isEmail = function () {
    var re = /^[0-9a-zA-Z-_\.]*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/i;
    if (re.test(this)) {
        return true;
    } else {
        return false;
    }
};

/**************************************************************************
 * 핸드폰 유효성 검사 prototype
 * @returns bool :  true = 정상 false = 실패
 * @사용법 : 문자열.isPhone()
***************************************************************************/
String.prototype.isPhone = function () {

    var re = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g;
    if (re.test(this)) {
        return true;
    } else {
        return false;
    }
};

/**************************************************************************
 * String.format prototype
 * @사용법 : String.format("<a href=\"{0}/{1}/{2}\" title=\"{3}\">{3}</a>", URL, Year, TitleEncoded, Title);
 *
***************************************************************************/
String.format = function () {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}

// String prototype 
// =========================================





// =========================================
// 공통 메세지

var CommonMsg = {
    DeleteConfirmMsg: "삭제 하시겠습니까? \n 삭제된 데이터는 복구가 불가합니다."
    , PwdInitConfirmMsg: "비밀번호를 초기화하시겠습니까? \n 초기화된 데이터는 복구가 불가합니다."
    , SaveAfterMsg: "저장 되었습니다."
    , ModifyAfterMsg: "수정 되었습니다."
    , DeleteAfterMsg: "삭제 되었습니다."
    , SaveConfirmMsg: "저장 하시겠습니까?"
    , ModifyConfirmMsg: "수정 하시겠습니까?"
    , ErrorMag: "처리중 에러가 발생했습니다."
    , PreparingMsg: "준비 중입니다."
    , ReplyDeleteConfirmMsg: "답변글을 삭제 하시겠습니까? \n 삭제된 데이터는 복구가 불가합니다."
}

var AlertMsg = {
    PreparingMsg: "준비 중입니다."
    , ErrorMag: "처리중 에러가 발생했습니다."
    , KeyWordisNotMsg: "키워드를 입력해 주세요."
    , TitleisNotMsg: "제목을 입력하세요."
    , ContentisNotMsg: "내용을 입력하세요."
}

// 공통 메세지
// =========================================



// =================================================

$.ajaxSetup({
    cache: false,
    beforeSend: function (xmlHttpRequest) {
        cfShowBlock(true);
    },
    error: function (xhr, textStatus, errorThrown) {
        //에러 메시지 처리
        if (errorThrown == "Forbidden") {
            alert("권한이 없습니다.");
        }
        else if (errorThrown == "Unauthorized") {
            alert("로그인이 필요합니다.");
            location.href ="/Account"
        }
        else {
            alert('요청 중 서버에서 에러가 발생하였습니다.');
        }
    },
    complete: function (xhr, textStatus) {
        //처리중 UI 제거
        cfHideBlock();
    }
});



// =================================================


// =====================================================
var obj = [];
var SmartEditor = {
    Create: function () {
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: obj,
            elPlaceHolder: "editor",
            sSkinURI: "/WowTvScript/SE2/SmartEditor2Skin.html",
            htParams: {
                // 툴바 사용 여부
                bUseToolbar: true,
                // 입력창 크기 조절바 사용 여부
                bUseVerticalResizer: true,
                // 모드 탭(Editor | HTML | TEXT) 사용 여부
                bUseModeChanger: true
            },
            fCreator: "createSEditor2"
        });
    },
    SaveData: function () {
        obj.getById["editor"].exec("UPDATE_CONTENTS_FIELD", []);
    },
    CreateItem: function (id) {
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: obj,
            elPlaceHolder: id,
            sSkinURI: "/WowTvScript/SE2/SmartEditor2Skin.html",
            htParams: {
                // 툴바 사용 여부
                bUseToolbar: true,
                // 입력창 크기 조절바 사용 여부
                bUseVerticalResizer: true,
                // 모드 탭(Editor | HTML | TEXT) 사용 여부
                bUseModeChanger: true
            },
            fCreator: "createSEditor2"
        });
    },
    SaveDataItem: function (id) {
        obj.getById[id].exec("UPDATE_CONTENTS_FIELD", []);
    },
    AddDataItem: function (id, text) {
        var org = new Array();
        org.push(text);
        obj.getById[id].exec("PASTE_HTML", org);
    }
};


$(document).ready(function () {
    //========================================================
    // 참고 : http://m4nc.tistory.com/entry/Validation-%EC%B2%B4%ED%81%AC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EA%B8%B0

    /**************************************/
    /* validation Check
    /*
    /*  param:
    /*      ob              : 해당 객체 셀렉조건
    /*      msg             : 커스텀콜백 사용안할시 얼럿 메시지
    /*      customOptions   : max(최대), min(최소), password(비번스타일), consecutively(연속문자체크), consecutivelyNum(연속문자수), number(숫자형)
    /*      customCallback  : 첫번째 파라미터로 에러처리
    /*          0               : 길이 체크 에러
    /*          1               : 특수문자 체크 에러 (password시)
    /*          2               : 숫자 체크 에러 (password시)
    /*          3               : 연속된 문자 체크에러 (consecutivelyNum시)
    /*          4               : 숫자형일때 체크에러 (number 시)
    /*
    /**************************************/
    co.validation = function (ob, msg, customOptions, customCallback) {
        var returnFlag = false;
        var options = {
            max: 99999999, // 최대 글자수
            min: 1, // 최소 글자수
            password: false, // 비밀번호 패턴 특수문자, 숫자 포함하기
            consecutively: false, // 연속된 문자 방지하기
            consecutivelyNum: 3, // 연속된 문자 제한수
            number: false // 숫자형 체크
        };
        $.extend(options, customOptions);


        var callback = function (i, e) {
            validationLog(e);
            validationLog(typeof customCallback);

            if (typeof customCallback == "function") {
                customCallback.prototype = { id: ob };
                new customCallback(i);
            } else {
                alert(msg);
                $(ob).focus();
            }
        };

        var validationLog = function (s) {
            console.log("validationLog: " + s);
        }


        var value = $(ob).val();

        //최소, 최대값 체크하기. (빈값체크)
        if (value.length < options.min || value.length > options.max) {
            callback(0, "Error 최소 최대값 체크" + options.min + " < " + value.length + " < " + options.max);
            return false;
        }

        //패스워드 스타일 체크 특수문자, 숫자 필수
        if (options.password) {
            var special_pattern = /[`~!@+_#$%^&*|\\\'\";:\/?]/gi;
            if (special_pattern.test(value) == false) {
                callback(1, "Error 특수문자가 없을 때 " + value);
                return false;
            }

            special_pattern = /[0-9]/gi;
            if (special_pattern.test(value) == false) {
                callback(2, "Error 숫자가 없을 때 " + value);
                return false;
            }
        }

        //연속된 문자 체크
        if (options.consecutively) {
            var t = "";
            var c = 0;
            for (var i = 0; i < value.length; i++) {
                var v = value.charAt(i);
                if (t == v) {
                    c++;
                    validationLog(t + "_" + v);
                } else {
                    c = 0;
                }
                t = v;

                if (c >= options.consecutivelyNum - 1) {
                    callback(3, "Error 연속된 문자 이상 " + value);
                    return false;
                }
            }
        }

        //숫자형체크
        if (options.number) {
            var myregexp = /^[0-9]+$/;

            if (!myregexp.test(value)) {
                callback(4, "Error 숫자형타입 아님 " + value);
                return false;
            }
        }


        validationLog(value);
        return true;
    },
        /**************************************/
        /* numberStyle
        /*
        /*  param:
        /*      ob              : 해당 객체 셀렉조건
        /**************************************/
        co.numberStyle = function (ob) {
            var checkNumber = function (evt) {
                var keyCode;
                var isNetscape = (navigator.appName == "Netscape") ? 1 : 0;
                if (isNetscape) {
                    keyCode = evt.which;
                    if ((keyCode > 13 && keyCode < 48) || keyCode > 57) {
                        evt.preventDefault();
                    }
                } else {
                    keyCode = event.keyCode;
                    if ((keyCode > 13 && keyCode < 48) || keyCode > 57) {
                        event.returnValue = false;
                    }
                }
            };

            $(ob).keydown(checkNumber);
        }

    /**************************************************************************
     * 숫자만 입력
     * @사용법 : text tag에  numberOnly 추가
    ***************************************************************************/
    $("input[type='text'][numberOnly]").bind("keyup", function () {
        $(this).val($(this).val().replace(/[^0-9]/gi, ""));
    }).bind("keydown", function () {
        $(this).val($(this).val().replace(/[^0-9]/gi, ""));
    }).bind("keyPress", function () {
        $(this).val($(this).val().replace(/[^0-9]/gi, ""));
    });
    /**************************************************************************
     * 영문만 입력
     * @사용법 : text tag에  engOnly 추가
    ***************************************************************************/
    $("input[type='text'][engOnly]").bind("keyup", function () {
        $(this).val($(this).val().replace(/[0-9]|[^\!-z\s]/gi, "")); 
    }).bind("keydown", function () {
        $(this).val($(this).val().replace(/[0-9]|[^\!-z\s]/gi, ""));
    }).bind("keyPress", function () {
        $(this).val($(this).val().replace(/[0-9]|[^\!-z\s]/gi, ""));
    });

    /**************************************************************************
     * 영문과숫자만 입력
     * @사용법 : text tag에  engOnly 추가
    ***************************************************************************/
    $("input[type='text'][engAndnumberOnly]").bind("keyup", function () {
        $(this).val($(this).val().replace(/[^\!-z\s]/gi, ""));
    }).bind("keydown", function () {
        $(this).val($(this).val().replace(/[^\!-z\s]/gi, ""));
    }).bind("keyPress", function () {
        $(this).val($(this).val().replace(/[^\!-z\s]/gi, ""));
    });

});//ready end
/*************************************************************************************************************/
/* Date format 
/* ex
/* new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초");  //2011년 09월 11일 오후 03시 45분 42초
/*
/* new Date().format("yyyy-MM-dd");                          //2011-09-11
/*
/*  new Date().format("'yy MM.dd");                          //'11 09.11
/*
/*  new Date().format("yyyy-MM-dd E");                       //2011-09-11 일요일
/*
/*  "현재년도 : " + new Date().format("yyyy");               //현재년도 : 2011
/*************************************************************************************************************/
Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

// IsDate('2017-09-22')
// IsDate('2017-09-22','/')
function IsDate(strDate, separator) {

    var aoDate,           // needed for creating array and object
        ms,               // date in milliseconds
        month, day, year; // (integer) month, day and year
    // if separator is not defined then set '/'
    if (separator === undefined) {
        separator = '-';
    }
    // split input date to month, day and year
    aoDate = strDate.split(separator);
    // array length should be exactly 3 (no more no less)
    if (aoDate.length !== 3) {
        return false;
    }
    // define month, day and year from array (expected format is m/d/yyyy)
    // subtraction will cast variables to integer implicitly
    year = aoDate[0] - 0; // because months in JS start from 0
    month = aoDate[1] - 1;
    day = aoDate[2] - 0;
    // test year range
    if (year < 1000 || year > 3000) {
        return false;
    }
    // convert input date to milliseconds
    ms = (new Date(year, month, day)).getTime();
    // initialize Date() object from milliseconds (reuse aoDate variable)
    aoDate = new Date();
    aoDate.setTime(ms);
    // compare input date and parts from Date() object
    // if difference exists then input date is not valid
    if (aoDate.getFullYear() !== year ||
        aoDate.getMonth() !== month ||
        aoDate.getDate() !== day) {
        return false;
    }
    // date is OK, return true
    return true;
}

// SetAddDay
function SetAddDay(strDate, intNum) {

    sdate = new Date(strDate);
    sdate.setDate(sdate.getDate() + parseInt(intNum));

    return sdate.format("yyyy-MM-dd");
    //return sdate.getFullYear() + "-" + sdate.getMonth() + 1 + "-" + sdate.getDate();
}

// SetAddMonth
function SetAddMonth(strDate, intNum) {

    sdate = new Date(strDate);
    sdate.setMonth(sdate.getMonth() + parseInt(intNum));

    return sdate.format("yyyy-MM-dd");
}

// SetAddYear
function SetAddYear(strDate, intNum) {
    sdate = new Date(strDate);
    sdate.setFullYear(sdate.getFullYear() + parseInt(intNum));

    return sdate.format("yyyy-MM-dd");
    //return sdate.getFullYear() + "-" + sdate.getMonth() + 1 + "-" + sdate.getDate();
}

// ==============================================
// 네이버 지도
var map, marker;
function initMap() {
    map = new naver.maps.Map("map");
    marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3595704, 127.105399),
        map: map
    });
}

function GetGeoCode(address) {
    naver.maps.Service.geocode({
        address: address
    }, function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert('해당 위치를 찾을 수 없습니다.');
        }
        var result = response.result,
            item = result.items[0];
        var oPoint = new naver.maps.LatLng(item.point.y, item.point.x);

        initMap();

        map.setCenter(oPoint);
        marker.setPosition(oPoint);
    });
}
//===============================================



function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function GetSearchDate(addDays) {
    date = new Date();
    if (addDays != null && addDays != 0) {
        date.setDate(date.getDate() + addDays);
    }
    var year = date.getFullYear();
    var month = date.getMonth() > 9 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1));
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    return year + '-' + month + '-' + day;
}

$.urlParam = function (sUrl, sParam) {
    var results = new RegExp('[\?&]' + sParam + '=([^&#]*)').exec(sUrl);
    if (results == null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
}