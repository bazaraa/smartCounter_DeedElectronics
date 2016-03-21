var orderPaymentCanceledTableEditable = function() {

	var handleTable = function() {

		var table = $('#orderPayment_canceled_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,
			"autoWidth" : false,
			"columnDefs" : [ {
				"searchable" : false,
				"orderable" : false,
				"targets" : [ 1 ],
			}, {
				"targets" : [ 0, 3 ],
				"visible" : false,
			} ],
			"order" : [ [ 0, "desc" ] ]
		});

//		table
//				.on(
//						'click',
//						'.edit',
//						function(e) {
//							e.preventDefault();
//							var nRow = $(this).parents('tr')[0];
//							var rowData = $(this).parents('table').DataTable()
//									.row(nRow).data();
//							var csrf = $("#__csrf__").val();
//							var param = {};
//							param._csrf = csrf;
//							param.orderId = $("#orderId").val();
//							param.cancelId = rowData[0];
//							param.used = $("#eachValue" + rowData[0]).find(
//									".isPayed").prop('checked');
//
//							$
//									.ajax({
//										type : "POST",
//										url : "/orderPayment/canceled",
//										async : false,
//										dataType : "json",
//										data : param,
//										success : function(result) {
//											if (result.success == true) {
//												var checked = ""; 
//												if(result.data.payed == true){
//													checked = "Ашигласан";
//												} else {
//													checked = "Ашиглаагүй";
//												}
//												
//												oTable.fnUpdate(result.data.id,nRow, 0, false);
//												oTable.fnUpdate(result.data.note, nRow, 1, false);
//												oTable.fnUpdate(checked, nRow, 2, false);
//												oTable.fnUpdate(result.data.amount, nRow, 3, false);
//												oTable.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',nRow, 4, false);
//												oTable.fnDraw();
//
//												CRSWebUtils
//														.showAlert(
//																"success",
//																"check",
//																"Амжилттай хадгалагдлаа.",
//																0);
//											} else {
//												alert(result.message);
//												CRSWebUtils.showAlert("danger",
//														"warning",
//														result.message, 0);
//											}
//										},
//										error : function() {
//											CRSWebUtils
//													.showAlert(
//															"danger",
//															"warning",
//															"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
//															0);
//										}
//									});
//
//						});
	}
	return {

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};
}();