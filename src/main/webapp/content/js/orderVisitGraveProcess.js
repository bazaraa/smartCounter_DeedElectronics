var orderVisitGraveProcessForm = function() {

	var handleOrderVisitGraveProcessForm = function() {

		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}

			oTable.fnDraw();
		}

		function editRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			jqTds[3].innerHTML = '<input type="text" class="form-control"  value="'
					+ aData[11] + '">';

			jqTds[4].innerHTML = '<input type="text" class="form-control" id="date" value="'
					+ aData[5] + '">';

			jqTds[5].innerHTML = '<input type="text" class="form-control" readonly="readonly">';

			$.ajax({
				url : "/orderVisitGrave/status",
				success : function(result) {
					result = JSON.parse(result)
					for ( var i in result) {
						var type = result[i];

						if (result[i].label == aData[7]) {
							selected = "selected='selected'";
						} else {
							selected = "";
						}

						$('#visitStatus').append(
								'<option value="' + type.value + '" '
										+ selected + '>' + type.label
										+ '</option>');
					}
				}
			});

			jqTds[6].innerHTML = '<select class="form-control" id="visitStatus"><option value="">Сонгох...</option></select>';
			jqTds[7].innerHTML = '<input type="text" class="form-control" value="'
					+ aData[8] + '">';
			jqTds[8].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
			jqTds[9].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';

			$("#date").datetimepicker({
				autoclose : true,
				isRTL : false,
				format : "yyyy.mm.dd hh:ii",
				pickerPosition : "bottom-left"
			});
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);

			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			var rowData = oTable.DataTable().row(nRow).data();

			param.orderVisitGraveId = $("#id").val();
			param.itemId = rowData[0];

			param.orderId = $("#orderId").val();
			param.count = jqInputs[0].value;
			param.completedDate = jqInputs[1].value;
			param.status = jqSelects[0].value;
			param.noteItem = jqInputs[3].value;

			$.ajax({
				type : "POST",
				url : "/orderVisitGrave/Item",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 0);

						location.reload();
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.message, 0);
						setTimeout(function() {
							window.location.reload(1);
						}, 2000);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});

		}

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable
					.fnUpdate(
							'<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
							nRow, 5, false);
			oTable.fnDraw();
		}

		var table = $('#orderVisitGraveProcess_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bLengthChange" : false,

			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,
			"columnDefs" : [
					{ // set default column settings
						'orderable' : true,
						'targets' : [ 1 ]
					},
					{
						"searchable" : true,
						"targets" : [ 1 ]
					},
					{
						"targets" : 0,
						"visible" : false,
					},
					{
						"targets" : 3,
						render : function(data, type, row) {
							var checked = false;
							if (data && data.indexOf
									&& data.indexOf('checked="true"') > 0)
								checked = true;
							else if (data === true)
								checked = true;

							if (checked)
								return '<span checked="true">Тийм</span>';
							return '<span checked="false">Үгүй</span>';
						},
						className : "dt-body-center"
					}, {
						"targets" : 11,
						"visible" : false,
					} ],
			"order" : [ [ 1, "asc" ] ],
			"language" : CRSWebUtils.dtLangMN
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#orderVisitGraveProcess_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#orderVisitGraveProcess_editable_1_new')
				.click(
						function(e) {
							e.preventDefault();

							if (nNew && nEditing) {
								if (confirm("Previose row not saved. Do you want to save it ?")) {
									saveRow(oTable, nEditing); // save
									$(nEditing).find("td:first").html(
											"Untitled");
									nEditing = null;
									nNew = false;

								} else {
									oTable.fnDeleteRow(nEditing); // cancel
									nEditing = null;
									nNew = false;

									return;
								}
							}

							var aiNew = oTable.fnAddData([ '', '', '', '', '',
									'', '', '' ]);
							var nRow = oTable.fnGetNodes(aiNew[0]);
							editRow(oTable, nRow);
							nEditing = nRow;
							nNew = true;
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

							param.orderId = $("#orderId").val();
							param.orderVisitGraveId = $("#id").val();
							param.itemId = rowData[0];
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
														url : "/orderVisitGrave/deleteItem",
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
		table.on('click', '.cancel', function(e) {
			e.preventDefault();
			if (nNew) {
				oTable.fnDeleteRow(nEditing);
				nEditing = null;
				nNew = false;
			} else {
				restoreRow(oTable, nEditing);
				nEditing = null;
			}
		});

		table.on('click', '.edit', function(e) {
			e.preventDefault();

			/*
			 * Get the row as a parent of the link that was clicked on
			 */
			var nRow = $(this).parents('tr')[0];

			if (nEditing !== null && nEditing != nRow) {
				/*
				 * Currently editing - but not this row - restore the old before
				 * continuing to edit mode
				 */
				restoreRow(oTable, nEditing);
				editRow(oTable, nRow);
				nEditing = nRow;
			} else if (nEditing == nRow && $(this).attr("method") == "save") {
				/* Editing this row and want to save it */
				saveRow(oTable, nEditing);
				nEditing = null;
			} else {
				/* No edit in progress - let's start one */
				editRow(oTable, nRow);
				nEditing = nRow;
			}
		});

	}

	var HandleListDataTable = function() {
		$("#ListItemsTable").dataTable({
			columns : [ {
				"data" : "id"
			}, {
				"data" : "name"
			}, {
				"data" : "note"
			} ],
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"pageLength" : 20,
			"bLengthChange" : false,
			"bFilter" : false,
			"bPaginate" : false,
			"info" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ {
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : false
			} ]
		});
	}

	return {
		init : function() {
			handleOrderVisitGraveProcessForm();
			HandleListDataTable();
		}
	};
}();
//
//$('#reload')
//		.on(
//				"click",
//				function() {
//					var csrf = $("#__csrf__").val();
//					var param = {};
//					param._csrf = csrf;
//					param.orderVisitGraveId = $("#id").val();
//					$
//							.ajax({
//								type : "POST",
//								url : "/orderVisitGrave/refresh",
//								async : false,
//								dataType : "json",
//								data : param,
//								success : function(result) {
//									if (result.success == true) {
//										$('#tableValue').empty();
//										for ( var i in result.data) {
//											var data = result.data[i];
//											
//											var feedback = "Үгүй";
//											if(data.feedback == true){
//												feedback = "Тийм";
//											}
//											
//											$('#tableValue').append('<tr>'
//																+ '<td>' + data.number + '</td>'
//																+ '<td>' + data.executeDate + '</td>'
//																+ '<td>' + feedback + '</td>'
//																+ '<td>' + data.count + '</td>'
//																+ '<td>' + data.completedDate + '</td>'
//																+ '<td>' + data.imageCount + '</td>'
//																+ '<td>' + data.status + '</td>'
//																+ '<td>' + data.note + '</td>'
//																+ '<td style="text-align: center;"><a class="edit" href="javascript:;"><i class="fa fa-pencil-square-o fa-lg"></i></a></td>'
//																+ '<td style="text-align: center;"><a class="delete" href="javascript:;"><i class="fa fa-trash fa-lg"></i></a></td></tr>');
//										}
//
//									} else {
//										CRSWebUtils.showAlert("danger",
//												"warning", result.message, 0);
//									}
//								},
//								error : function() {
//									CRSWebUtils
//											.showAlert(
//													"danger",
//													"warning",
//													"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
//													0);
//								}
//							});
//				});

$(".selectValue")
		.click(
				function() {
					$('#myTable').empty();
					var me = $(this);
					var count = me.find(".valueHub").val();
					var id = me.find(".myId").val();
					$("#myItemId").val(id);

					var csrf = $("#__csrf__").val();
					var param = {};
					param._csrf = csrf;
					param.itemId = me.find(".myId").val();
					param.orderId = $("#orderId").val();
					$
							.ajax({
								type : "POST",
								url : "/orderVisitGrave/getItems",
								async : false,
								dataType : "json",
								data : param,
								success : function(result) {
									if (result.success == true) {
										var dataTable = $('#ListItemsTable').dataTable();
										dataTable.fnClearTable();
										if (result.data.length > 0) {
											dataTable.fnAddData(result.data);
										} else {
											for (var i = 0; i < count; i++) {
												$('#myTable')
														.append(
																'<tr><td><input type="text" class="form-control" name="productName['
																		+ i
																		+ ']"></td><td><input type="text" class="form-control" name="productDescrip['
																		+ i
																		+ ']"></td></tr>');
											}
										}

									} else {
										CRSWebUtils.showAlert("danger",
												"warning", result.message, 0);
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

$(".selectValuePic")
		.click(
				function() {
					var me = $(this);
					var count = me.find(".valueHub").val();
					var id = me.find(".myId1").val();
					$("#myItemId1").val(id);

					var csrf = $("#__csrf__").val();
					var param = {};
					param._csrf = csrf;
					param.itemId = id;
					param.orderId = $("#orderId").val();

					$
							.ajax({
								type : "POST",
								url : "/orderVisitGrave/getItemImages",
								async : false,
								dataType : "json",
								data : param,
								success : function(result) {
									if (result.success == true) {
										$('#imagesList').empty();
										for (var i = 0; i < result.data.length; i++) {

											var str = result.data[i].imageUrl;
											var Re = new RegExp("//", "g");
											var res = str.replace(Re, "/");

											$('#imagesList')
													.append(
															'<img src="'
																	+ res
																	+ '" style="padding:5px; width:100px; height:100px">'
																	+ '<a class="btn btn-default" href="/orderVisitGrave/deleteImage/'
																	+ result.data[i].id
																	+ '/'
																	+ id
																	+ '/'
																	+ $(
																			"#orderId")
																			.val()
																	+ '" style="position: absolute; margin-left:-50px">'
																	+ '<i class="icon-trash"></i></a>');
										}

									} else {
										CRSWebUtils.showAlert("danger",
												"warning", result.message, 0);
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