var dispatcherTableEditable = function() {

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

							jqTds[1].innerHTML = aData[1] ;
							jqTds[2].innerHTML = aData[2];
							jqTds[3].innerHTML = aData[3];
							jqTds[4].innerHTML = aData[4];
							jqTds[5].innerHTML = '<div class="input-group input-medium date date-picker" data-date-format="yyyy.mm.dd"><input type="text" class="form-control"/><span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-calendar"></i></button></span></div>';
							jqTds[6].innerHTML = '<div class="input-group"><input type="text" id="time" class="form-control timepicker timepicker-24" style="width:70px;" /><span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-clock-o"></i></button></span></div>';
							jqTds[7].innerHTML = '<input type="text" id="receiverName" style="width: 100% !important;" class="form-control input-small" value="'
									+ aData[7] + '">';
							jqTds[8].innerHTML = '<input type="text" id="additionNote" style="width: 100% !important;" class="form-control input-small" value="'
									+ aData[8] + '">';
							jqTds[9].innerHTML = aData[9];
							jqTds[10].innerHTML = aData[10];
							jqTds[11].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
							jqTds[12].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';
							dispatcherTableEditable.handleTimePickers();

		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;

			var rowData = oTable.DataTable().row(nRow).data();

			 param.id = jqInputs[0].value;
			 param.date = jqInputs[1].value;
			 param.time = jqInputs[2].value;
			 param.receiverName = jqInputs[3].value;
			 param.additionNote = jqInputs[4].value;
			 
			 if (param.date == "") {
				 CRSWebUtils.showAlert("danger", "warning",
							"Х.Өгсөн огноо хоосон байна. Огноо оруулна уу", 0);
			}else{
			
			$.ajax({
				type : "POST",
				url : "/dispatcherProduct/ajax",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {

						 oTable.fnUpdate(result.id, nRow, 0, false);
						 oTable.fnUpdate(result.date, nRow, 5,
								 false);	
						 oTable.fnUpdate(result.time, nRow, 6,
								 false);	
						 oTable.fnUpdate(result.receiverName, nRow, 7,
								 false);	
						 oTable.fnUpdate(result.additionNote, nRow, 8,
						 false);
						 oTable.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
								nRow, 11, false);
						 oTable.fnUpdate('<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>',
								nRow, 12, false);
						 oTable.fnDraw();

						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 0);
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.message, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
			}
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

		var table = $('#dispatcher_editable_1');

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
			"order" : [ [ 1, "asc" ] ]
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#dispatcher_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#monastery_editable_1_new')
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
														url : "/dispatcher/delete",
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
	}

	var handleTimePickers = function() {

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
		// handle input group button click
		$('#time').parent('.input-group').on(
				'click',
				'.input-group-btn',
				function(e) {
					$(this).parent('.input-group').find('.timepicker')
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

var dispatcherCarOut = function() {

	var handleCarOuForm = function() {
		$('#dispatcherProduct-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				product : {
					required : true
				},
				giver : {
					required : true
				},
				note : {
					required : true
				},
				receiveDate : {
					required : true
				},
				destDate : {
					required : true
				},
				receiverEmp : {
					required : true
				}
			},

			messages : {
				product : {
					required : "Бараа сонгоно уу."
				},
				giver : {
					required : "Хүлээнгэн өгөгч сонгоно уу."
				},
				note : {
					required : "Тэмдэглэл бичнэ үү"
				},
				receiveDate : {
					required : "Хүлээн авсан цагаа оруулна уу"
				},
				destDate : {
					required : "Бараа өгөх огноо оруулна уу"
				},
				receiverEmp : {
					required : "Бараа авах хүнийг сонгоно уу"
				}
			},

			invalidHandler : function(event, validator) { // display error
															// alert on form
															// submit

			},

			highlight : function(element) { // hightlight error inputs
				$(element).closest('.form-group').addClass('has-error'); // set
																			// error
																			// class
																			// to
																			// the
																			// control
																			// group
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},

			errorPlacement : function(error, element) {
				if (element.closest('.input-icon').size() === 1) {
					error.insertAfter(element.closest('.input-icon'));
				} else {
					error.insertAfter(element);
				}
			},

			submitHandler : function(form) {
				form.submit();
			}
		});

//		$('#car-form input').keypress(function(e) {
//			if (e.which == 13) {
//				if ($('#car-form').validate().form()) {
//					$('#car-form').submit(); // form validation success, call
//												// ajax form submit
//				}
//				return false;
//			}
//		});

		$("#formReset").click(function() {
			$('#car-form')[0].reset();
		});

	}

	return {
		// main function to initiate the module
		init : function() {

			handleCarOuForm();
		}

	};

}();