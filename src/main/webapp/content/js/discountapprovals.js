$(document).ready(function () {
	var table = $('#discountapprovals');
    var oTable = table.dataTable({
        "bLengthChange": false,
        "bPaginate": true,
        "bJQueryUI": true,
        "pagingType": "full_numbers",
        "oLanguage" : CRSWebUtils.dtLangMN,
        "iDisplayLength": 30,
    });
	table.on('click', '.delete', function(e) {
		e.preventDefault();
		var nRow = $(this).parents('tr')[0];
		var orderId = $(this).closest('tr').data("approvalid");
		var csrf = $("#__csrf__").val();
		var param = {};
		param._csrf = csrf;
		param.id = orderId;
		bootbox.confirm({
			message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
			callback : function(result) {
				if (result == false) {
					return;
				}
				$.ajax({
					type : "POST",
					url : "/discountapproval/delete",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							oTable.fnDeleteRow(nRow);
							CRSWebUtils.showAlert("success", "check", "Амжилттай устгагдлаа.", 0);
						} else {
							CRSWebUtils.showAlert("danger", "warning", result.message, 0);
						}
					},
					error : function() {
						CRSWebUtils
								.showAlert(
										"danger",
										"warning",
										"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
										0);
					}
				});
			}
		});
	});
});
