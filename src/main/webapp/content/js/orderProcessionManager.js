var orderProcessionManagerTableEditable = function() {

	var handleTable = function() {

		var table = $('#orderProcessionManager_editable_1');
		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bPaginate" : false,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ { // set default column settings
				"searchable": false,
				"orderable": false,
				'targets' : 1,
			}, {
				"targets" : 0,
				"visible" : false,
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets" : 8,
				"visible" : false,
			} ],
			"order" : [ [ 8, "asc" ] ]
		// set first column as a default sort by asc
		});

		
		table
				.on(
						'click',
						'.edit',
						function(e) {
							e.preventDefault();
							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents('table').DataTable()
									.row(nRow).data();
							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;

							param.pmId = rowData[0];
							param.employee = $("#eachValue" + rowData[0]).find(
									".respondent").val();
							param.done = $("#eachValue" + rowData[0]).find(
									".done").prop('checked');
							param.note = $("#eachValue" + rowData[0]).find(
									".txtnote").val();

							$
									.ajax({
										type : "POST",
										url : "/orderProcessionManager",
										async : false,
										dataType : "json",
										data : param,
										success : function(result) {
											if (result.success == true) {
												location.reload();
											} else {
												alert(result.message);
												CRSWebUtils.showAlert("danger",
														"warning",
														result.message, 0);
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
							param.pmId = rowData[0];

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
														url : "/orderProcessionManager/delete",
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