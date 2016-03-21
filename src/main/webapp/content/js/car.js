var carTableEditable = function() {

	var handleTable = function() {

		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}
			oTable.fnDraw();
		}

		var table = $('#car_editable_1');

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
				"visible" : false,
			} ],
			"order" : [ [ 1, "asc" ] ]
		});

		var tableWrapper = $("#car_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

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
														url : "/car/delete",
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

var carForm = function() {

	var handleCarForm = function() {
		$('#car-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				color : {
					required : true
				},
				cNumber : {
					required : true
				},
				created : {
					required : true
				},
				carType : {
					required : true
				},
				price : {
					required : true
				}
			},

			messages : {
				color : {
					required : "Машины өнгө оруулна уу."
				},
				cNumber : {
					required : "Машины дугаар оруулна уу."
				},
				created : {
					required : "Бүртгэгдсэн огноо сонгоно уу."
				},
				carType : {
					required : "Машины төрөл сонгоно уу."
				},
				price : {
					required : "Машины үндсэн үнэ."
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

		$('#car-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#car-form').validate().form()) {
					$('#car-form').submit(); // form validation success, call
												// ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#car-form')[0].reset();
		});

	}

	return {
		// main function to initiate the module
		init : function() {

			handleCarForm();

		}

	};

}();
