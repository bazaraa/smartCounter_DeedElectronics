var moorogTableEditable = function() {

	var handleTable = function() {

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;

			var rowData = oTable.DataTable().row(nRow).data();

			param.id = rowData[0];
			param.fridgeName = jqInputs[0].value;
			param.active = jqInputs[1].checked;

			var moorogid = $("#moorogid").val();
			var detailid = param.id;
			
			if (detailid == "") {
				$.ajax({
					type : "GET",
					url : "/moorog/savedmoorog/"+ moorogid + "/",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {

							oTable.fnUpdate("<input type=" + 'text'
									+ " class=" + 'form-control'
									+ " value=" + result.data.fridgeName
									+ ">", nRow, 1, false);

							if (result.data.active) {
								oTable
										.fnUpdate(
												'<input type="checkbox" checked="true">',
												nRow, 2, false);
							} else {
								oTable.fnUpdate('<input type="checkbox">',
										nRow, 2, false);

							}

							CRSWebUtils.showAlert("success", "check",
									"Амжилттай хадгалагдлаа.", 0);
						} else {
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
			}else{
			
			$.ajax({
						type : "GET",
						url : "/moorog/savedmoorog/"+ moorogid + "/" + detailid,
						async : false,
						dataType : "json",
						data : param,
						success : function(result) {
							if (result.success == true) {

								oTable.fnUpdate("<input type=" + 'text'
										+ " class=" + 'form-control'
										+ " value=" + result.data.fridgeName
										+ ">", nRow, 1, false);

								if (result.data.active) {
									oTable
											.fnUpdate(
													'<input type="checkbox" checked="true">',
													nRow, 2, false);
								} else {
									oTable.fnUpdate('<input type="checkbox">',
											nRow, 2, false);

								}

								CRSWebUtils.showAlert("success", "check",
										"Амжилттай хадгалагдлаа.", 0);
							} else {
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

		function editRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);
			
			jqTds[0].innerHTML = '<input type="text" class="form-control" value="'+aData[1]+'"/>';
			jqTds[1].innerHTML = '<input type="checkbox"/>';
			jqTds[2].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
			jqTds[3].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';
		}

		var table = $('#moorogRegister_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,
			"columnDefs" : [ {
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

		var tableWrapper = $("#moorogRegister_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		});
		var nEditing = null;
		var nNew = false;

		$('#moorogRegisterNew_editable_1_new').click(function(e) {
			e.preventDefault();

			var aiNew = oTable.fnAddData([ '','', '', '', '' ]);
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
							var jqInputs = $('input', nRow);
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
											
											var moorogid = $("#moorogid").val();
											var detailid = param.id;
											
											$
													.ajax({
														type : "GET",
														url : "/moorog/delete/"
																+ moorogid
																+ "/"
																+ detailid,
														async : false,
														dataType : "json",
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

		table.on('click', '.edit', function(e) {
			e.preventDefault();
			var me = $(this);
			var nEditing = me.closest("tr");
			saveRow(oTable, nEditing);
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

	}
	return {
		init : function() {
			handleTable();

		}
	};

}();

var moorogForm = function() {

	var handleMoorogForm = function() {
		$('#moorog-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				serviceType : {
					required : true
				},
				Username : {
					required : true
				},
				note : {
					required : true
				}
			},

			messages : {
				serviceType : {
					required : "Байршилаа сонгоно уу."
				},
				Username : {
					required : "Нэрийг оруулна уу."
				},
				note : {
					required : "Моорийн хаяг оруулна уу."
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


		$("#formReset").click(function() {
			$('#moorog-form')[0].reset();
		});

	}

	return {
		// main function to initiate the module
		init : function() {

			handleMoorogForm();

		}

	};

}();