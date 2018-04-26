var ProgramTemplateEdit = {
    SearchGroupList: function () {
        $.ajax({
            type: 'POST',
            url: "/BroadCast/ProgramTemplate/ProgramTemplateGroupList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "programTemplateSeq": $("#hidProgramTemplateSeq").val() },
            success: function (data, textStatus) {
                $("#ulProgramTemplateGroupList").html(data);
            }
        });

        return false;
    },
    Save: function () {

        var urlCount = 0;
        var isContinue = true;

        var urlExp = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/

        $.each($(".devUrl"), function (index, item) {
            if ($(item).val() != "") {
                urlCount++;

                if (urlExp.test($(item).val()) == false) {
                    alert("URL 형식이 잘못되었습니다.\r\nhttp://www.site.xx.xx");
                    $(item).focus();
                    isContinue = false;
                    return false;
                }
            }
        });

        if (isContinue == true) {

            if ($("#ulProgramTemplateGroupList").find("[name='programGroupSeqList']").length > 1) {
                alert("그룹은 하나만 선택가능 합니다.");
                return false;
            }


            SmartEditor.SaveDataItem("hidRemark");

            var form = $('#frmSave')[0];
            var formData = new FormData(form);
            $.ajax({
                type: 'POST',
                url: "/BroadCast/ProgramTemplate/Save?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: formData, //$("#frmSave").serialize(),
                processData: false,
                contentType: false,
                success: function (data, textStatus) {
                    if (data.IsSuccess == true) {
                        //ProgramTemplateIndex.BindEdit();
                        document.location.reload();
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    Delete: function () {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: 'POST',
                url: "/BroadCast/ProgramTemplate/Delete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "programCode": $("#hidProgramCode").val() },
                success: function (data, textStatus) {
                    document.location.reload();
                }
            });
        }

        return false;
    },


    OpenProgramGroupSearch: function () {
        $.ajax({
            type: "POST",
            url: "/BroadCast/ProgramTemplate/ProgramGroupSearch?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { },
            success: function (data) {
                $("#divProgramGroupSearch").html(data);
                $("#divProgramGroupSearch").modal("show");
            }
        });

        return false;
    },


    AddProgramTemplateGroup: function (programGroupSeq, programGroupName) {
        if ($("#ulProgramTemplateGroupList").find("[name='programGroupSeqList'][value='" + programGroupSeq + "']").length > 0) {
            alert("이미 동일한 대상이 존재 합니다.");
            return false;
        }

        var tag = "";
        tag += "<li>";
        tag += "    " + programGroupName + "<button class=\"btn btn-default btn- xs\" onclick=\"return ProgramTemplateEdit.DeleteProgramTemplateGroup(this);\">×</button>";
        tag += "    <input type=\"hidden\" name=\"programGroupSeqList\" value=\"" + programGroupSeq + "\" />";
        tag += "</li>";

        $("#ulProgramTemplateGroupList").append(tag);

        return false;
    },
    DeleteProgramTemplateGroup: function (obj) {
        $(obj).closest("li").remove();

        return false;
    },

    TypeChange: function () {
        var templateType = $("[name='TEMPLATE_TYPE']:checked").val();

        if (templateType == "A") {
            //$("#divTypeA").show();
            $("#divTypeB").hide();
        }
        else {
            //$("#divTypeA").hide();
            $("#divTypeB").show();
        }

        return false;
    },



    SearchPartnerList: function () {
        $.ajax({
            type: 'POST',
            url: "/BroadCast/ProgramTemplate/PartnerSearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "programCode": $("#hidProgramCode").val() },
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
        tag += "    " + partnerName + "<button class=\"btn btn-default btn- xs\" onclick=\"return ProgramTemplateEdit.DeletePartner(this);\">×</button>";
        tag += "    <input type=\"hidden\" name=\"payNo\" value=\"" + payNo + "\" />";
        tag += "</li>";

        $("#ulPartnerList").append(tag);

        return false;
    },
    DeletePartner: function (obj) {
        $(obj).closest("li").remove();

        return false;
    },

    ViewTypeChange: function () {
        var viewType = $("[name='MainViewType']:checked").val();

        if (viewType == "Image") {
            $("#divRemark").hide();
        }
        else {
            $("#divRemark").show();
        }

        return false;
    }
};





$(document).ready(function () {

    $("#divEdit_btnSave").click(function () {
        ProgramTemplateEdit.Save();

        return false;
    });


    $("#divEdit_btnDelete").click(function () {
        ProgramTemplateEdit.Delete();

        return false;
    });


    $("#divEdit_btnProgramGroupSearch").click(function () {
        ProgramTemplateEdit.OpenProgramGroupSearch();

        return false;
    });


    $("#divEdit_btnPartnerSearch").click(function () {
        ProgramTemplateEdit.OpenPartnerSearch();

        return false;
    });

    $("[name='MainViewType']").change(function () {
        ProgramTemplateEdit.ViewTypeChange();

        return false;
    });
    

    if ($("#hidProgramTemplateSeq").val() == "" || $("#hidProgramTemplateSeq").val() == "0" || $("#hidDelYn").val() == "Y") {
        $("#btnDelete").hide();
        $("#divEdit_btnDelete").hide();
    }
    else {
        $("#btnDelete").show();
        $("#divEdit_btnDelete").show();
    }

    SmartEditor.CreateItem("hidRemark");

    ProgramTemplateEdit.SearchGroupList();
    ProgramTemplateEdit.SearchPartnerList();


    setTimeout(ProgramTemplateEdit.ViewTypeChange, 500);
    //ProgramTemplateEdit.ViewTypeChange();
});




function ExpertSelectApply(expertItem) {
    ProgramTemplateEdit.AddPartner(expertItem.PayNo, expertItem.ExpertName);

    $("#divPartnerSearch").html("");
    $("#divPartnerSearch").modal("hide");
}
