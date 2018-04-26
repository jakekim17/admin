
var NewsProgramManageEdit = {
    GoList: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/BroadCast/NewsProgramManage/Index?menuSeq=" + $("#hidCurrentMenuSeq").val());
        $("#frmSearch").submit();

        return false;
    },
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/BroadCast/NewsProgramManage/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "programCode": $("#programCode").val() },
                success: function (data, textStatus) {
                    NewsProgramManageEdit.GoList();
                }
            });
        }

        return false;
    },
    Save: function () {
        if ($("#txtProgramName").val() == "") {
            alert("프로그램명은 필수사항 입니다.");
            return false;
        }


        //SmartEditor.SaveDataItem("hidProgramCmsAuth_Intro");

        var form = $('#frmSave')[0];
        var formData = new FormData(form);

        $.ajax({
            type: 'POST',
            url: "/BroadCast/NewsProgramManage/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: formData, //$("#frmSave").serialize(),,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    NewsProgramManageEdit.GoList();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },



    SearchPartnerList: function () {
        $.ajax({
            type: 'POST',
            url: "/BroadCast/NewsProgramManage/PartnerSearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "programCode": $("#programCode").val() },
            success: function (data, textStatus) {
                $("#ulPartnerList").html(data);
            }
        });

        return false;
    },
    OpenPartnerSearch: function () {
        $.ajax({
            type: "POST",
            url: "/BroadCast/Expert/Search",
            data: {},
            success: function (data) {
                $("#divPartnerSearch").html(data);
                $("#divPartnerSearch").modal("show");
            }
        });

        return false;
    },
    AddPartner: function (payNo, partnerName) {
        if ($("#ulPartnerList").find("[name='payNo'][value='" + payNo + "']").length > 0) {
            alert("이미 동일한 대상이 존재 합니다.");
            return false;
        }

        var tag = "";
        tag += "<li>";
        tag += "    " + partnerName + "<button class=\"btn btn-default btn- xs\" onclick=\"return NewsProgramManageEdit.DeletePartner(this);\">×</button>";
        tag += "    <input type=\"hidden\" name=\"payNo\" value=\"" + payNo + "\" />";
        tag += "</li>";

        $("#ulPartnerList").append(tag);

        return false;
    },
    DeletePartner: function (obj) {
        $(obj).closest("li").remove();

        return false;
    },



    SearchAdminList: function () {
        $.ajax({
            type: 'POST',
            url: "/BroadCast/NewsProgramManage/AdminSearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "programCode": $("#programCode").val() },
            success: function (data, textStatus) {
                $("#ulAdminList").html(data);
            }
        });

        return false;
    },
    OpenAdminSearch: function () {
        $.ajax({
            type: "POST",
            url: "/BroadCast/NewsProgramManage/PopAdminSearch?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: {},
            success: function (data) {
                $("#divAdminSearch").html(data);
                $("#divAdminSearch").modal("show");
            }
        });

        return false;
    },
    AddAdmin: function (adminSeq, adminName) {
        if ($("#ulAdminList").find("[name='adminSeq'][value='" + adminSeq + "']").length > 0) {
            alert("이미 동일한 대상이 존재 합니다.");
            return false;
        }

        var tag = "";
        tag += "<li>";
        tag += "    " + adminName + "<button class=\"btn btn-default btn- xs\" onclick=\"return NewsProgramManageEdit.DeleteAdmin(this);\">×</button>";
        tag += "    <input type=\"hidden\" name=\"adminSeq\" value=\"" + adminSeq + "\" />";
        tag += "</li>";

        $("#ulAdminList").append(tag);

        return false;
    },
    DeleteAdmin: function (obj) {
        $(obj).closest("li").remove();

        return false;
    },

    GetCategoryList: function (depth, pseq, callBack) {
        if (pseq != "") {
            $.ajax({
                type: "POST",
                url: "/BroadCast/NewsProgramManage/GetCategoryList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "pseq": pseq, "categoryCode": $("#hidCategoryCode").val() },
                success: function (data) {
                    if (data.IsSuccess == true) {
                        var selected = "";
                        var temp = "";
                        $("#cboCategoryCode" + depth + " option").remove();
                        $("#cboCategoryCode" + depth).append("<option value='' >선택</option>");

                        if (depth == 1) {
                            temp = $("#hidCategoryCode1").val();
                        }
                        else if (depth == 2) {
                            temp = $("#hidCategoryCode2").val();
                        }
                        else if (depth == 3) {
                            temp = $("#hidCategoryCode3").val();
                        }
                        $.each(data.List, function (index, item) {
                            //alert(item.IntValue + ":" + temp + ":");
                            if (item.IntValue == temp) {
                                selected = "selected";
                            }
                            else {
                                selected = "";
                            }
                            $("#cboCategoryCode" + depth).append("<option value='" + item.IntValue + "' " + selected + ">" + item.StringValue + "</option>");
                        });

                        if (callBack != null) {
                            callBack();
                        }
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    }
};


$(document).ready(function () {

    $("#btnList").click(function () {
        NewsProgramManageEdit.GoList();

        return false;
    });

    $("#btnDelete").click(function () {
        NewsProgramManageEdit.Delete();

        return false;
    });

    $("#btnSave").click(function () {
        NewsProgramManageEdit.Save();

        return false;
    });


    $("#btnPartnerSearch").click(function () {
        NewsProgramManageEdit.OpenPartnerSearch();

        return false;
    });


    $("#btnAdminSearch").click(function () {
        NewsProgramManageEdit.OpenAdminSearch();

        return false;
    });

    $("#txtPoint").keyup(function (event) {
        if (isNaN($(this).val()) == true) {
            alert("숫자만 가능합니다.");
            $(this).val("");
            return false;
        }
    });

    $("#cboCategoryCode1").change(function () {
        NewsProgramManageEdit.GetCategoryList(2, $("#cboCategoryCode1").val());
        var temp = $("#cboCategoryCode3").val();
        if (temp == null || temp == "") {
            temp = $("#cboCategoryCode2").val();
        }
        if (temp == null || temp == "") {
            temp = $("#cboCategoryCode1").val();
        }
        $("#hidCategoryCode").val(temp);
        return false;
    });
    $("#cboCategoryCode2").change(function () {
        NewsProgramManageEdit.GetCategoryList(3, $("#cboCategoryCode2").val());
        var temp = $("#cboCategoryCode3").val();
        if (temp == null || temp == "") {
            temp = $("#cboCategoryCode2").val();
        }
        if (temp == null || temp == "") {
            temp = $("#cboCategoryCode1").val();
        }
        $("#hidCategoryCode").val(temp);

        return false;
    });
    $("#cboCategoryCode3").change(function () {
        var temp = $("#cboCategoryCode3").val();
        if (temp == null || temp == "") {
            temp = $("#cboCategoryCode2").val();
        }
        if (temp == null || temp == "") {
            temp = $("#cboCategoryCode1").val();
        }
        $("#hidCategoryCode").val(temp);

        return false;
    });

    NewsProgramManageEdit.SearchPartnerList();
    NewsProgramManageEdit.SearchAdminList();

    NewsProgramManageEdit.GetCategoryList(1, "174"
        , function () {
            NewsProgramManageEdit.GetCategoryList(2, $("#cboCategoryCode1").val()
                , function () {
                    NewsProgramManageEdit.GetCategoryList(3, $("#cboCategoryCode2").val()
                        , function () {
                        }
                    );
                }
            );
        }
    );

    //SmartEditor.CreateItem("hidProgramCmsAuth_Intro");

});



function ExpertSelectApply(expertItem) {
    NewsProgramManageEdit.AddPartner(expertItem.PayNo, expertItem.ExpertName);

    $("#divPartnerSearch").html("");
    $("#divPartnerSearch").modal("hide");
}



function AdminSelectApply(selectedAdminList) {
    $.each(selectedAdminList, function (index, item) {
        NewsProgramManageEdit.AddAdmin(item.AdminSeq, item.AdminName);
    });

    $("#divAdminSearch").html("");
    $("#divAdminSearch").modal("hide");
}

