var orderContractForm = function() {

	var handleOrderContractForm = function() {

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

			$.ajax({
				url : '/orderContract/getnodes/' + $("#orderContractId").val(),
				success : function(data) {
					enums = JSON.parse(data)
					enumsOptions = '<option>Сонгох...</option>'
					for (var i = 0; i < enums.length; i++) {
						var item = enums[i]
						if (enums[i].name == aData[1]) {
							selected = "selected='selected'";
						} else {
							selected = "";
						}

						$('#enums').append(
								'<option value="' + item.value + '"  '
										+ selected + '>' + item.label
										+ '</option>');
					}
				}
			})

			jqTds[0].innerHTML = '<select id="enums" class="form-control"><option>Сонгох...</option></select>';
			jqTds[4].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);

			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			var rowData = oTable.DataTable().row(nRow).data();

			param.orderId = $("#orderId").val();
			param.orderCode = $("#orderCode").val();
			param.orderContractId = $("#orderContractId").val();
			param.contractType = $("#enums").val();

			$.ajax({
				url : "/orderContract/enums",
				type : "POST",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						oTable.fnUpdate(param.contractType, nRow, 0, false);
						oTable.fnDraw();

						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 0);
						location.reload();
					} else {
						alert(result.message);
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

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable
					.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>', nRow, 5,
							false);
			oTable.fnDraw();
		}

		var table = $('#orderEva_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bLengthChange" : false,

			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,

			"language" : CRSWebUtils.dtLangMN
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#orderEva_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#orderEva_editable_1_new')
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

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			console.log(re.test(value))
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#orderContract-form').validate({
			errorElement : 'span',
			errorClass : 'help-block',
			focusInvalid : false,
			rules : {
				"contractFileView.contractFileType" : {
					required : true
				},
				"contractFileView.paperSize" : {
					required : true
				},
				"contractFileView.pageCount" : {
					required : true
				},
				"contractFileView.respondent" : {
					required : true
				}
			},

			messages : {
				"contractFileView.contractFileType" : {
					required : "Төрлийн нэр сонгоно уу"
				},
				"contractFileView.paperSize" : {
					required : "Цаасны хэмжээ сонгоно уу"
				},
				"contractFileView.pageCount" : {
					required : "Хуудасны тоо оруулна уу"
				},
				"contractFileView.respondent" : {
					required : "Байршил сонгоно уу"
				}
			},

			invalidHandler : function(event, validator) {
			},

			highlight : function(element) { // hightlight error
				// inputs
				$(element).closest('.form-group').addClass('has-error'); // set
				// error
				// class
				// to
				// the control group
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

		$('#orderContract-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#orderEvaluate-form').validate().form()) {
					$('#orderEvaluate-form').submit(); // form validation
					// success, call
					// ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#orderContract-form')[0].reset();
		});
	}
	var HandleListDataTable = function() {
		$("#list_editable_1")
				.dataTable(
						{
							columns : [ {
								"data" : "id"
							}, {
								"data" : "extension"
							}, {
								"data" : "paperSize"
							}, {
								"data" : "pageCount"
							}, {
								"data" : "fileName"
							} ],
							"lengthMenu" : [ [ 5, 15, 20, -1 ],
									[ 5, 15, 20, "All" ] ],
							"pageLength" : 20,
							"bLengthChange" : false,
							"bFilter" : false,
							"bPaginate" : false,
							"info" : false,
							"language" : CRSWebUtils.dtLangMN,
							"columnDefs" : [
									{
										'orderable' : true,
										'targets' : [ 1 ]
									},
									{
										"targets" : 0,
										"visible" : false
									},
									{
										"targets" : 5,
										"render" : function(data, type, full,
												meta) {
											return '<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>';
										}
									},
									{
										"targets" : 6,
										"data" : "url",

										"render" : function(data, type, full,
												meta) {
											var str = data;
											if (data == null) {
												var res = str;
											} else {
												var res = str
														.replace("//", "/");
											}

											if (data != null) {
												url = '<a target="_blank" href="'
														+ res
														+ '" download><i class="fa fa-download fa-lg"></i></a>';
											} else {
												url = '<p><i class="fa fa-download fa-lg"></i></p>';
											}

											return url;
										}
									} ]
						});
	}
	return {
		init : function() {
			handleOrderContractForm();
			HandleListDataTable();
		}
	};
}();

$("#contractFileType").ready(
		function() {
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.orderId = $("#orderId").val();
			param.orderCode = $("#orderCode").val();
			param.orderContractId = $("#orderContractId").val();
			param.contractType = $("#contractFileType").val();

			$.ajax({
				type : "POST",
				url : "/orderContract/getUserName",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#userName").val(result.data.id);
						$("#userName").attr('readonly', true).css(
								'pointer-events', 'none');
					} 
				},
				error : function() {
					$("#userName").val(null);
					$("#userName").attr('readonly', false).css(
							'pointer-events', '');
				}
			});

		});

$(".selectFileValue").click(
		function() {

			var me = $(this);
			contractType = me.find(".valueFileHub").val();
			$("#contractFileType").val(contractType);
			$("#contractFileType").attr('readonly', true).css('pointer-events',
					'none');

			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.orderId = $("#orderId").val();
			param.orderCode = $("#orderCode").val();
			param.orderContractId = $("#orderContractId").val();
			param.contractType = me.find(".valueFileHub").val();

			$.ajax({
				type : "POST",
				url : "/orderContract/getUserName",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#userName").val(result.data.id);
						$("#userName").attr('readonly', true).css(
								'pointer-events', 'none');
					}
				},
				error : function() {
					$("#userName").val(null);
					$("#userName").attr('readonly', false).css(
							'pointer-events', '');
				}
			});

		});

$(".selectValue").click(
		function() {

			var me = $(this);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.orderId = $("#orderId").val();
			param.contractType = me.find(".valueHub").val();

			$.ajax({
				type : "POST",
				url : "/orderContract/getList",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						var dataTable = $('#list_editable_1').dataTable();
						dataTable.fnClearTable();
						if (result.data.length > 0) {
							dataTable.fnAddData(result.data);
						}

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

		});

$("#list_editable_1")
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
					param.orderCode = $("#orderCode").val();
					param.orderContractId = $("#orderContractId").val();
					param.orderContractFileId = rowData["id"];

					console.log(param);

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
												url : "/orderContract/delete",
												async : false,
												dataType : "json",
												data : param,
												success : function(result) {
													if (result.success == true) {
														CRSWebUtils
																.showAlert(
																		"success",
																		"check",
																		"Амжилттай устгагдлаа.",
																		0);
														location.reload();
													} else {
														alert(result.message);
														CRSWebUtils.showAlert(
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