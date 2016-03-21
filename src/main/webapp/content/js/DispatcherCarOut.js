var dispatcherCarOutTableEditable = function() {

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
			$
					.ajax({
						url : '/dispatcherCar/getDispatcherCarJson/',
						success : function(data) {

							data = JSON.parse(data);
							var optionCarNumbers = getHtmlOptions(data.carNumbers,aData[2]);
							var optionEmployees = getHtmlOptions(data.employees,aData[3]);
					
							jqTds[0].innerHTML = aData[0];
							if (aData[0] == "") {
								jqTds[1].innerHTML = '<input type="checkbox" id="checkbox1" checked="checked">';
							} else {
								jqTds[1].innerHTML = aData[1];
							}
							if (aData[1] == "Үгүй") {
								jqTds[2].innerHTML = '<select class="form-control" id="carNumberSelect">'
								+ optionCarNumbers + '</select>'
								jqTds[3].innerHTML = '<select class="form-control" id="carDriverSelect">'
								+ optionEmployees + '</select>';
							}else{
								jqTds[2].innerHTML = '<input type="text" class="form-control" id="carNumber" name="carNumber" value="'
									+ aData[2]
									+ '"/><select class="form-control" id="carNumberSelect" style="display : none;">'
									+ optionCarNumbers + '</select>';
								jqTds[3].innerHTML = '<input type="text" class="form-control" name="carDriver" id="carDriver" value="'
									+ aData[3]
									+ '"/><select class="form-control" id="carDriverSelect" style="display : none;">'
									+ optionEmployees + '</select>';
							}
//							jqTds[2].innerHTML = '<input type="text" class="form-control" id="carNumber" name="carNumber" value="'
//								+ aData[2]
//								+ '"/><select class="form-control" id="carNumberSelect" style="display : none;">'
//								+ optionCarNumbers + '</select>';
//							jqTds[3].innerHTML = '<input type="text" class="form-control" name="carDriver" id="carDriver" value="'
//								+ aData[3]
//								+ '"/><select class="form-control" id="carDriverSelect" style="display : none;">'
//								+ optionEmployees + '</select>';
							jqTds[4].innerHTML = '<input type="text" class="form-control" name="purpose" value="'
									+ aData[4] + '">';
							jqTds[5].innerHTML = '<div class="input-group input-medium date date-picker" data-date-format="yyyy.mm.dd"><input type="text" class="form-control" value="'
									+ aData[5]
									+ '"/><span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-calendar"></i></button></span></div>';
							jqTds[6].innerHTML = '<div class="input-group"><input id="time1" type="text" class="form-control timepicker timepicker-24" style="width:70px;" value="'
									+ aData[6]
									+ '"/><span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-clock-o"></i></button></span></div>';
							jqTds[7].innerHTML = '<div class="input-group input-medium date date-picker" data-date-format="yyyy.mm.dd"><input type="text" class="form-control" value="'
									+ aData[7]
									+ '"/><span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-calendar"></i></button></span></div>';
							jqTds[8].innerHTML = '<div class="input-group"><input id="time2" type="text" class="form-control timepicker timepicker-24" style="width:70px" name="time" value="'
									+ aData[8]
									+ '"/> <span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-clock-o"></i></button></span></div>';
							jqTds[9].innerHTML = '<input type="text" class="form-control" name="note" value="'
									+ aData[9] + '"/>';
							jqTds[10].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
							jqTds[11].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';
							dispatcherCarOutTableEditable.handleTimePickers();
					
						}
					});
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			
			param.ours = true;
			
			var rowData = oTable.DataTable().row(nRow).data();
			if (nNew == true) {
				param.ours = jqInputs[0].checked;
				param.purpose = jqInputs[3].value;
				param.iDate = jqInputs[4].value;
				param.iTime = jqInputs[5].value;
				param.oDate = jqInputs[6].value;
				param.oTime = jqInputs[7].value;
				param.note = jqInputs[8].value;
				param.carNumber = jqInputs[1].value;
				param.carDriver = jqInputs[2].value;
				param.car = jqSelects[0].value;
				param.driver = jqSelects[1].value;
			}else{
				param.id = jqInputs[0].value;
				if (rowData[1] == "Үгүй") {
					param.ours  = false;
					param.car = jqSelects[0].value;
					param.driver = jqSelects[1].value;
					param.purpose = jqInputs[1].value;
					param.iDate = jqInputs[2].value;
					param.iTime = jqInputs[3].value;
					param.oDate = jqInputs[4].value;
					param.oTime = jqInputs[5].value;
					param.note = jqInputs[6].value;
				}else{
					param.carNumber = jqInputs[1].value;
					param.carDriver = jqInputs[2].value;
					param.ours = true;
					param.purpose = jqInputs[3].value;
					param.iDate = jqInputs[4].value;
					param.iTime = jqInputs[5].value;
					param.oDate = jqInputs[6].value;
					param.oTime = jqInputs[7].value;
					param.note = jqInputs[8].value;
				}
//				param.purpose = jqInputs[2].value;
//				param.iDate = jqInputs[3].value;
//				param.iTime = jqInputs[4].value;
//				param.oDate = jqInputs[5].value;
//				param.oTime = jqInputs[6].value;
//				param.note = jqInputs[7].value;
//				param.carNumber = jqInputs[0].value;
//				param.carDriver = jqInputs[1].value;
//				param.car = jqInputs[0].value;
//				param.driver = jqInputs[1].value;
			}

			$.ajax({
				type : "POST",
				url : "/dispatcherCt/ajax",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {

//						oTable.fnUpdate(result.id, nRow, 0, false);
						if (result.ours == true) {
							oTable.fnUpdate('Тийм', nRow, 1, false);
						} else {
							oTable.fnUpdate('Үгүй', nRow, 1, false);
						}
						if (param.ours == false) {
							oTable.fnUpdate(result.cNumber, nRow, 2, false);
						} else {
							oTable.fnUpdate(result.carNumber, nRow, 2, false);
						}
						if (param.ours == false) {
							oTable.fnUpdate(result.empFirstname, nRow, 3, false);
						} else {
							oTable.fnUpdate(result.carDriver, nRow, 3, false);
						}
						oTable.fnUpdate(result.purpose, nRow, 4, false);
						oTable.fnUpdate(result.iDate, nRow, 5, false);
						oTable.fnUpdate(result.iTime, nRow, 6, false);
						oTable.fnUpdate(result.oDate, nRow, 7, false);
						oTable.fnUpdate(result.oTime, nRow, 8, false);
						oTable.fnUpdate(result.note, nRow, 9, false);
						oTable.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
								nRow, 10, false);
						oTable.fnUpdate('<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>',
								nRow, 11, false);
						oTable.fnDraw();

						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 0);
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.messege, 0);
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
			// oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			// oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			// oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate('<a class="edit" href="">Засах</a>', nRow, 11,
					false);
			oTable.fnDraw();
		}

		var table = $('#dispatcherCarOut_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
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
				"visible" : true,
			} ],
			"order" : [ [ 0, "asc" ] ]
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#dispatcherCar_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#dispatcherCarOut_editable_1_new')
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
									'', '', '','','','','' ]);
							var nRow = oTable.fnGetNodes(aiNew[0]);
							editRow(oTable, nRow);
							nEditing = nRow;
							nNew = true;
						});

		table.on('click','.delete',
						function(e) {
							e.preventDefault();

							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents('table').DataTable()
									.row(nRow).data();

							var csrf = $("#__csrf__").val();
							var param = {};
							var jqInputs = $('input', nRow);
							
							param._csrf = csrf;
							param.id = jqInputs[0].value;

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
														url : "/dispatcherCarOut/delete",
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

		function getHtmlOptions(options, selectedValue) {
			var html = '<option value="">Сонгох...</option>'
			for (var i = 0; i < options.length; i++) {
				var item = options[i]
				var selected = item.label === selectedValue ? 'selected' : ''
				html = html + '<option value="' + item.value + '"' + selected
						+ '>' + item.label + '</option>';
			}
			return html;
		}

	}

	var handleTimePickers = function() {

		$('#checkbox1').click(function() {
			var x = document.getElementById("checkbox1").checked
			if (x == false) {
				$("#carNumber").hide();
				$("#carDriver").hide();
				$("#carNumberSelect").show();
				$("#carDriverSelect").show();
			}
			if (x == true) {
				$("#carNumberSelect").hide();
				$("#carDriverSelect").hide();
				$("#carDriver").show();
				$("#carNumber").show();
			}

		});

		$('.date-picker').datepicker({
			rtl : Metronic.isRTL(),
			orientation : "left",
			format : "yyyy.mm.dd",
			autoclose : true

		});
		// $('body').removeClass("modal-open"); // fix bug when inline picker is
		// used in modal

		$('.timepicker-24').timepicker({
			autoclose : true,
			minuteStep : 5,
			showSeconds : false,
			showMeridian : false
		});
		// // handle input group button click

		// handle input group button click
		$('#time1').parent('.input-group').on(
				'click',
				'.input-group-btn',
				function(e) {
					$(this).parent('.input-group').find('.timepicker-24')
							.timepicker('showWidget');
				});
		$('#time2').parent('.input-group').on(
				'click',
				'.input-group-btn',
				function(e) {
					$(this).parent('.input-group').find('.timepicker-24')
							.timepicker('showWidget');
				});

	}
	return {

		// main function to initiate the module
		init : function() {
			handleTable();

		},
		handleTimePickers : handleTimePickers

	};

}();