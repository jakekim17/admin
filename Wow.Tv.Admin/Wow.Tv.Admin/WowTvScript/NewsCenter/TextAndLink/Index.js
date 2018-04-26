var TxtNLinkIndex = {

    Save: function (frm, codename) {
        if (frm == "frmAdd") {

            var selCodeValue = $("#code").val();

            if ($("#code").val() == "") {
                alert("CODE를 선택해주세요.");
                $('#code').focus();
                return false;
            } else if ($('#keyword').val() == "") {
                alert("키워드 설정을 입력하세요");
                $('#keyword').focus();
                return false;
            }

            if (selCodeValue != "KEYWORD" && selCodeValue != "RANKING" && selCodeValue != "MARKETandISSUE") {

                if ($('#link').val() == "") {
                    alert("바로가기 링크를 입력하세요");
                    $('#link').focus();
                    return false;
                }
                //else if ($('#articleId').val() == "") {
                //    alert("Article ID를 입력하세요");
                //    $('#articleId').focus();
                //    return false;
                //}
            }


            if (selCodeValue == "KEYWORD" && KeyWordCnt == 4){
                alert("추천 키워드 뉴스(뉴스 메인 및 뉴스스탠드)는 최대 4개까지 등록할 수 있습니다.");
                return false;
            }


        }
        else {

            if ($('#editKeyword').val() == "") {
                alert("키워드 설정을 입력하세요");
                return false;
            }

            if (codename != "KEYWORD" && codename != "RANKING" && codename != "MARKETandISSUE") {

                if ($('#editLink').val() == "") {
                    alert("바로가기 링크를 입력하세요");
                    return false;
                }
                //else if ($('#editArticleId').val() == "") {
                //    alert("Article ID를 입력하세요");
                //    return false;
                //}
            }
        }

        if (confirm(CommonMsg.SaveConfirmMsg)) {

            $.ajax({
                type: "POST",
                url: "/NewsCenter/TextAndLink/Save?currentMenuSeq=" + CurrentMenuSeq,
                data: $("#" + frm).serialize(),
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert(CommonMsg.SaveAfterMsg);
                        window.location.reload();
                    }
                },
                error: function (error) {
                    alert(error);
                    return false;
                }
            });
        }
    },
    Delete: function (deleteList) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/NewsCenter/TextAndLink/Delete?currentMenuSeq=" + CurrentMenuSeq,
                data: { "deleteList": deleteList },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert("삭제되었습니다.");
                        window.location.reload();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
    }
};

$(document).ready(function () {

    $('#btnAdd').click(function () {
        TxtNLinkIndex.Save('frmAdd');
    });

    $('#btnDelete').click(function () {
        var deleteList = [];
        $('input[name="checkbox"]:checked').each(function () {
            deleteList.push(this.value);
        });
        if (deleteList.length <= 0) {
            alert('삭제할 항목을 선택해주세요');
        }
        else {
            TxtNLinkIndex.Delete(deleteList);
        }
    });

    $('#allcheck').click(function () {
        if ($("#allcheck").prop("checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    $('.btnEdit').click(function () {
        $('#editSeq').val($(this).parent().parent().attr('id'));
        $('#editKeyword').val($(this).parent().siblings('.Keyword').children().val());
        $('#editLink').val($(this).parent().siblings('.Link').children().val());
        $('#editArticleId').val($(this).parent().siblings('.ArticleId').children().val());

        TxtNLinkIndex.Save('frmEdit', $(this).parent().siblings('.Keyword').attr('id'));
    });

    $("#code").change(function () {

        $("#keyword").val("");
        $("#link").val("");
        $("#articleId").val("");

        //추천 키워드 뉴스(뉴스메인 및 뉴스스탠드), 랭킹뉴스(연예.스포츠)
        if ($(this).val() == "KEYWORD" || $(this).val() == "RANKING" || $(this).val() == "MARKETandISSUE") {

            $("#link").attr("disabled", "true");
            $("#articleId").attr("disabled", "true");
        }
        else
        {
            $("#link").removeAttr("disabled");
            $("#articleId").removeAttr("disabled");
            
        }
    });
});

