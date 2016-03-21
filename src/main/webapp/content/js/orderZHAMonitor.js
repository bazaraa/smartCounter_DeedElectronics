var orderZHAMonitorTableEditable = function() {

	var handleTable = function() {

		var table = $('#orderZHAMonitor_editable_1');
		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bPaginate" : false,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ { // set default column settings
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : false,
			}, {
				"targets" : 8,
				"visible" : false,
			}, ],
			"order" : [ [ 8, "asc" ] ]
		});

		table.on('click', '.edit', function(e) {
			e.preventDefault();
			var nRow = $(this).parents('tr')[0];
			var rowData = $(this).parents('table').DataTable().row(nRow).data();
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			
			param.zhaId = rowData[0];
			param.employee = $("#eachValue" + rowData[0]).find(".respondent").val();
			param.done = $("#eachValue" + rowData[0]).find(".done").prop('checked') ;
			param.note = $("#eachValue" + rowData[0]).find(".txtnote").val();
			console.log(param);
			
			$.ajax({
				type : "POST",
				url : "/orderZHAMonitor",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						location.reload();
					} else {
						alert(result.message);
						CRSWebUtils.showAlert("danger", "warning", result.message, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning", "Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});

		});

		table
				.on(
						'click',
						'.delete',
						function(e) {
							e.preventDefault();

							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents('table').DataTable()
									.row(nRow).data();

							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.zhaId = rowData[0];

							bootbox
									.confirm({
										message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
										callback : function(result) {
											if (result == false) {
												return;
											}

											$
													.ajax({
														type : "POST",
														url : "/orderZHAMonitor/delete",
														async : false,
														dataType : "json",
														data : param,
														success : function(
																result) {
															if (result.success == true) {
																oTable
																		.fnDeleteRow(nRow);
																CRSWebUtils
																		.showAlert(
																				"success",
																				"check",
																				"Амжилттай устгагдлаа.",
																				0);
															} else {
																alert(result.message);
																CRSWebUtils
																		.showAlert(
																				"danger",
																				"warning",
																				result.message,
																				0);
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

	}
	return {
		// main function to initiate the module
		init : function() {
			handleTable();
		}
	};
}();