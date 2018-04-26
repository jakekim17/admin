
var ProgramGroupSearchList = {
    Add: function () {
        var now = new Date();
        var year = now.getFullYear();
        var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
        var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();
        var chan_val = year + '-' + mon + '-' + day;

        var tag = "";
        tag += "<tr>";
        tag += "    <td><input type=\"hidden\" name=\"PROGRAM_GROUP_SEQ\" value=\"0\"></td>";
        tag += "    <td class=\"text-left\">";
        tag += "        <input type=\"text\" class=\"form-control\" name=\"GROUP_NAME\" >";
        tag += "    </td>";
        tag += "    <td>" + chan_val + "</td>";
        tag += "    <td>";
        tag += "        <button class=\"btn btn-success\" onclick=\"return ProgramGroupSearchList.Save(this);\">저장</button>";
        tag += "    </td>";
        tag += "</tr>";

        $("#tbProgramGroupSearchList").prepend(tag);

        return false;
    },

    Modify: function (obj) {
        $(obj).closest("tr").find("span").hide();
        $(obj).closest("tr").find("input").show();

        $(obj).closest("tr").find(".devModify").hide();
        $(obj).closest("tr").find(".devDelete").hide();
        $(obj).closest("tr").find(".devSave").show();

        return false;
    },
    Save: function (obj) {
        var programGroupSeq = $(obj).closest("tr").find("[name='PROGRAM_GROUP_SEQ']").val();
        var groupName = $(obj).closest("tr").find("[name='GROUP_NAME']").val();

        $.ajax({
            type: "POST",
            url: "/BroadCast/ProgramTemplate/ProgramGroupSave?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: { "PROGRAM_GROUP_SEQ": programGroupSeq, "GROUP_NAME": groupName },
            success: function (data) {
                if (data.IsSuccess == true) {
                    ProgramGroupSearch.LastListReload();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    Delete: function (obj) {
        var programGroupSeq = $(obj).closest("tr").find("[name='PROGRAM_GROUP_SEQ']").val();

        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/BroadCast/ProgramTemplate/ProgramGroupDelete?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
                data: { "programGroupSeq": programGroupSeq },
                success: function (data) {
                    if (data.IsSuccess == true) {
                        ProgramGroupSearch.LastListReload();
                    }
                    else {
                        alert(data.Msg);
                    }
                }
            });
        }

        return false;
    },
    Apply: function () {
        var checkItem = $("#tbProgramGroupSearchList").find("[name='PROGRAM_GROUP_SEQ']:checked");
        if (checkItem.length == 0) {
            alert("적용할 그룹을 선택하여 주십시오.");
            return false;
        }

        var programGroupSeq = checkItem.val();
        var programGroupName = $(checkItem).closest("tr").find("[name='GROUP_NAME']").val();
        ProgramTemplateEdit.AddProgramTemplateGroup(programGroupSeq, programGroupName);

        $("#divProgramGroupSearch").modal("hide");
        $("#divProgramGroupSearch").html("");

        return false;
    }
}

            

$(document).ready(function () {

    $("#divProgramGroupSearchList_btnAdd").click(function () {
        ProgramGroupSearchList.Add();

        return false;
    });

    $("#divProgramGroupSearchList_btnApply").click(function () {
        ProgramGroupSearchList.Apply();

        return false;
    });
    

    $("#divProgramGroupSearchList_divPaging").html(cfGetPagingHtml(divProgramGroupSearchList_totalDataCount, $("#divProgramSearch_currentIndex").val(), $("#divProgramSearch_pageSize").val(), "ProgramGroupSearch.SearchList"));


});


