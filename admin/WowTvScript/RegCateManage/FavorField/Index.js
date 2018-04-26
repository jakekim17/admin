
var RegCateManageFavorFieldIndex = {
    SortUp: function (obj) {
        var currentTR = $(obj).closest("tr");
        var currentRowIndex = $(currentTR).index();
        var targetRowIndex = currentRowIndex - 1;
        if (currentRowIndex > 0) {
            RegCateManageFavorFieldIndex.ChangeSort(currentRowIndex, targetRowIndex);
        }
    },

    SortDown: function (obj) {
        var currentTR = $(obj).closest("tr");
        var tableRowCount = $("#tblCodeList>tbody>tr").length;
        var currentRowIndex = $(currentTR).index();
        var targetRowIndex = currentRowIndex + 1;
        if (tableRowCount > targetRowIndex) {
            RegCateManageFavorFieldIndex.ChangeSort(currentRowIndex, targetRowIndex);
        }
    },

    ChangeSort: function (currentRowIndex, targetRowIndex) {

        // 사용여부 교환
        var currentChecked = $("#tblCodeList>tbody>tr:eq(" + currentRowIndex + ")").find("[name=Apply]").prop("checked");
        var targetChecked = $("#tblCodeList>tbody>tr:eq(" + targetRowIndex + ")").find("[name=Apply]").prop("checked");
        $("#tblCodeList>tbody>tr:eq(" + currentRowIndex + ")").find("[name=Apply]").prop("checked", targetChecked);
        $("#tblCodeList>tbody>tr:eq(" + targetRowIndex + ")").find("[name=Apply]").prop("checked", currentChecked);

        // Key 교환
        var currentId = $("#tblCodeList>tbody>tr:eq(" + currentRowIndex + ")").find("[name=InterestId]").val();
        var targetId = $("#tblCodeList>tbody>tr:eq(" + targetRowIndex + ")").find("[name=InterestId]").val();
        $("#tblCodeList>tbody>tr:eq(" + currentRowIndex + ")").find("[name=InterestId]").val(targetId);
        $("#tblCodeList>tbody>tr:eq(" + targetRowIndex + ")").find("[name=InterestId]").val(currentId);

        // 항목 교환
        var currentDescript = $("#tblCodeList>tbody>tr:eq(" + currentRowIndex + ")").find("[name=Descript]").val();
        var targetDescript = $("#tblCodeList>tbody>tr:eq(" + targetRowIndex + ")").find("[name=Descript]").val();
        $("#tblCodeList>tbody>tr:eq(" + currentRowIndex + ")").find("[name=Descript]").val(targetDescript);
        $("#tblCodeList>tbody>tr:eq(" + targetRowIndex + ")").find("[name=Descript]").val(currentDescript);
    },

    Add: function () {
        var rowCount = $("#tblCodeList>tbody>tr").length;
        var appendHtml =
            "<tr>" +
            "   <td><input type=\"checkbox\" name=\"Apply\"></td>" +
            "   <td><input type=\"text\" class=\"form-control\" name=\"Descript\"></td>" +
            "   <td>" +
            "       <span class=\"btn-arrow-up\"><button class=\"btn btn-default\" name=\"SortUp\" onclick=\"RegCateManageFavorFieldIndex.SortUp(this); return false;\">위로</button></span>" +
            "       <span class=\"btn-arrow-down\"><button class=\"btn btn-success\" name=\"SortDown\" onclick=\"RegCateManageFavorFieldIndex.SortDown(this); return false;\">아래로</button></span>" +
            "       <input type=\"hidden\" name=\"InterestId\" />" +
            "   </td>" +
            "   <td>" +
            "       <button class=\"btn btn-default\" onclick=\"RegCateManageFavorFieldIndex.Delete(this); return false;\">삭제</button>" +
            "   </td>" +
            "</tr>";
        $('#tblCodeList > tbody:last').append(appendHtml);
    },

    Save: function () {

        var validated = true;
        $("#tblCodeList>tbody>tr").each(function () {
            var descript = $(this).find("[name=Descript]").val().trim();
            if (descript == "") {
                validated = false;
                alert("항목을 입력하세요.");
                $(this).find("[name=Descript]").focus();
                return false;
            }
        });
        if (validated == false) {
            return;
        }

        if (confirm(CommonMsg.ModifyConfirmMsg) == true) {

            var submitList = new Array();
            var submitItem = null;
            var sort = 0;
            $("#tblCodeList>tbody>tr").each(function () {

                var interestId = $(this).find("[name=InterestId]").val();
                var descript = $(this).find("[name=Descript]").val().trim();
                var apply = $(this).find("[name=Apply]").prop("checked");
                sort += 10;

                submitItem = new Object();
                submitItem.InterestId = interestId;
                submitItem.Descript = descript;
                submitItem.Apply = apply;
                submitItem.Sort = sort;
                if (interestId == "") {
                    submitItem.SaveType = "ADD";
                }
                else {
                    submitItem.SaveType = "MODIFY";
                }

                submitList.push(submitItem);
            });

            if ($("#deletedList").val() != "") {
                var deletedIds = $("#deletedList").val().split(",");
                for (i = 0; i < deletedIds.length; i++) {

                    submitItem = new Object();
                    submitItem.InterestId = deletedIds[i];
                    submitItem.SaveType = "DELETE";

                    submitList.push(submitItem);
                }
            }

            var submitValue = JSON.stringify(submitList);

            $.ajax({
                type: "POST",
                url: "/RegCateManage/FavorField/Save?currentMenuSeq=" + $("#CurrentMenuSeq").val(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: submitValue,
                success: function (data) {
                    if (data.Called == true) {
                        var errorMessage = "";
                        for (i = 0; i < data.ResultList.length; i++) {
                            if (data.ResultList[i].IsSuccess == false) {
                                errorMessage += "\r\n - (" + data.ResultList[i].InterestId + ")" + data.ResultList[i].Descript + ": " + data.ResultList[i].ReturnMessage;
                            }
                        }
                        if (errorMessage == "") {
                            alert("처리되었습니다.");
                            location.reload(true);
                        }
                        else {
                            alert("처리되지 않은 항목이 있습니다.\r\n" + errorMessage);
                        }
                    }
                    else {
                        alert(data.ReturnMessage);
                    }
                }
            });
        }
    },

    Delete: function (obj) {
        var currentTR = $(obj).closest("tr");
        var interestId = $(currentTR).find("[name=InterestId]").val();
        var deletedList = $("#deletedList").val();
        if (interestId != "") {
            if (deletedList == "") {
                $("#deletedList").val(interestId);
            }
            else {
                $("#deletedList").val(deletedList + "," + interestId);
            }
        }
        $(currentTR).remove();
    }
};


$(document).ready(function () {

    $("#btnAdd").click(function () {
        RegCateManageFavorFieldIndex.Add();
        return false;
    });

    $("#btnSave").click(function () {
        RegCateManageFavorFieldIndex.Save();
        return false;
    });

    $("#btnDelete").click(function () {
        RegCateManageFavorFieldIndex.Delete();
        return false;
    });
});

