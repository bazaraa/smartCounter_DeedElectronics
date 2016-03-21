var orderEvaluateForm = function() {

	var handleOrderEvaluateForm = function() {

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			console.log(re.test(value))
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#orderEvaluate-form').validate({
			errorElement : 'span',
			errorClass : 'help-block',
			focusInvalid : false,
			rules : {
				"evaluateFileView.evaluateFileType" : {
					required : true
				},
				"evaluateFileView.paperSize" : {
					required : true
				},
				"evaluateFileView.pageCount" : {
					required : true
				},
				"evaluateFileView.respondent" : {
					required : true
				}
			},

			messages : {
				"evaluateFileView.evaluateFileType" : {
					required : "Төрлийн нэр сонгоно уу"
				},
				"evaluateFileView.paperSize" : {
					required : "Цаасны хэмжээ сонгоно уу"
				},
				"evaluateFileView.pageCount" : {
					required : "Хуудасны тоо оруулна уу"
				},
				"evaluateFileView.respondent" : {
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

		$('#orderEvaluate-form input').keypress(function(e) {
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
			$('#orderEvaluate-form')[0].reset();
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
											url = '<a target="_blank" href="'
													+ res
													+ '" download><i class="fa fa-download fa-lg"></i></a>';
											return url;
										}
									} ]
						});
	}

	return {
		init : function() {
			handleOrderEvaluateForm();
			HandleListDataTable();
		}
	};
}();

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
					param.orderEvaluateId = $("#orderEvaluateId").val();
					param.orderEvaluateFileId = rowData["id"];

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
												url : "/orderOrderEvaluate/delete",
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

$("#evaluateFileType").change(function() {
	var csrf = $("#__csrf__").val();
	var param = {};
	param._csrf = csrf;
	param.orderId = $("#orderId").val();
	param.orderCode = $("#orderCode").val();
	param.orderContractEvaluateId = $("#orderContractEvaluateId").val();
	param.evaluateFileType = $("#evaluateFileType").val();

	$.ajax({
		type : "POST",
		url : "/orderOrderEvaluate/getUserName",
		async : false,
		dataType : "json",
		data : param,
		success : function(result) {
			if (result.success == true) {
				$("#userName").val(result.data.id);
				$("#userName").attr('readonly', true).css('pointer-events', 'none');
			} else {
				$("#userName").val(null);
				$("#userName").attr('readonly', false).css('pointer-events', '');
			}
		},
		error : function() {
			$("#userName").val(null);
			$("#userName").attr('readonly', false).css('pointer-events', '');
		}
	});

});

$(".selectValue").click(
		function() {

			var me = $(this);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.evaluateFileType = me.find(".valueHub").val();

			$.ajax({
				type : "POST",
				url : "/orderOrderEvaluate/getList",
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