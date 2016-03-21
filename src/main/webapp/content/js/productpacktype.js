var productpackTypeTableEditable = function() {

	var handleTable = function() {

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
			jqTds[0].innerHTML = '<input type="text" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[1] + '">';
			jqTds[1].innerHTML = '<input type="text" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[2] + '">';

			var checked = "";
			if (aData[3] && aData[3].indexOf
					&& aData[3].indexOf('checked="true"') > 0)
				checked = "checked='checked'";
			else if (aData[3] === true)
				checked = "checked='checked'";

			jqTds[2].innerHTML = '<input type="checkbox" ' + checked + '>';

			jqTds[3].style.textAlign = "center";
			jqTds[3].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
			jqTds[4].style.textAlign = "center";
			jqTds[4].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);

			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;

			var rowData = oTable.DataTable().row(nRow).data();

			param.id = rowData[0];
			param.code = jqInputs[0].value;
			param.name = jqInputs[1].value;
			param.isActive = jqInputs[2].checked;

			if (param.code == "" || param.code == "") {
				CRSWebUtils
						.showAlert(
								"danger",
								"warning",
								"Төрлийн код эсвэл төрлийн нэрийг оруулаагүй байна. Дахин бүртгэлээ эхлэнэ үү.",
								0);
				oTable.fnDeleteRow(nRow, null, true);
			} else {
				$
						.ajax({
							type : "POST",
							url : "/productpacktype",
							async : false,
							dataType : "json",
							data : param,
							success : function(result) {
								if (result.success == true) {

									oTable.fnUpdate(result.data.id, nRow, 0,
											false);
									oTable.fnUpdate(result.data.code, nRow, 1,
											false);
									oTable.fnUpdate(result.data.name, nRow, 2,
											false);
									oTable.fnUpdate(result.data.isActive, nRow,
											3, false);
									oTable
											.fnUpdate(
													'<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
													nRow, 4, false);
									oTable
											.fnUpdate(
													'<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>',
													nRow, 5, false);
									oTable.fnDraw();

									CRSWebUtils.showAlert("success", "check",
											"Амжилттай хадгалагдлаа.", 0);
								} else {
									alert(result.message);
									CRSWebUtils.showAlert("danger", "warning",
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
			}
		}

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable
					.fnUpdate(
							'<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
							nRow, 5, false);
			oTable.fnDraw();
		}

		var table = $('#productpacktype_editable_1');

		var oTable = table
				.dataTable({
					"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
					// set the initial value
					"pageLength" : 20,
					"bLengthChange" : false,
					"language" : CRSWebUtils.dtLangMN,
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
									if (data
											&& data.indexOf
											&& data.indexOf('checked="true"') > 0)
										checked = true;
									else if (data === true)
										checked = true;

									if (checked)
										return '<span checked="true">Тийм</span>';
									return '<span checked="false">Үгүй</span>';
								},
								className : "dt-body-center"
							},
							{
								"render" : function(data, type, row) {
									if (row[0] == 1 || row[0] == 2
											|| row[0] == 3 || row[0] == 4
											|| row[0] == 5 || row[0] == 6
											|| row[0] == 7 || row[0] == 8) {
										return '';
									} else {
										return '<td><a class="edit" href="javascript:;"><i class="fa fa-pencil-square-o fa-lg"></i></a></td>';
									}
								},
								"targets" : 4
							},
							{
								"render" : function(data, type, row) {
									if (row[0] == 1 || row[0] == 2
											|| row[0] == 3 || row[0] == 4
											|| row[0] == 5 || row[0] == 6
											|| row[0] == 7 || row[0] == 8) {
										return '';
									} else {
										return '<td><a class="delete" href="javascript:;"><i class="fa fa-trash fa-lg"></i></a></td>';
									}
								},
								"targets" : 5
							} ],
					"order" : [ [ 1, "asc" ] ]
				// set first column as a default sort by asc
				});

		var tableWrapper = $("#productpacktype_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#productpacktype_editable_1_new')
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
							param.id = rowData[0];

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
														url : "/productpacktype/delete",
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

	return {

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};

}();