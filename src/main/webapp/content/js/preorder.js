var preOrderForm = function() {

	var handlePreOrderForm = function() {

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			console.log(re.test(value))
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#preorder-form')
				.validate(
						{
							errorElement : 'span', // default input error
							// message container
							errorClass : 'help-block', // default input error
							// message class
							focusInvalid : false, // do not focus the last
							// invalid input
							rules : {
								"preOrderExecDate" : {
									required : true
								},
								"client.regNumber" : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮ]{2}[0-9]{8,}/
								},
								"client.familyName" : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/,
								},
								"client.lname" : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/,
								},
								"client.fname" : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/,
								},
								"client.citizenship" : {
									required : true
								},
								"client.address" : {
									required : true
								},
								"orderCustomer[0].lastName" : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/
								},
								"orderCustomer[0].firstName" : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/
								},
								"orderCustomer[0].registerNumber" : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮ]{2}[0-9]{8,}/
								},
								"orderCustomer[0].relation" : {
									required : true
								},
								"orderCustomer[0].phone1" : {
									required : true,
									regex : /^[0-9]/
								}
							},

							messages : {
								"preOrderExecDate" : {
									required : "Гүйцэтгэх огноогоо оруулна уу."
								},
								"client.regNumber" : {
									required : "Регистрийн дугаар оруулна уу.",
									regex : "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
								},
								"client.familyName" : {
									required : "Ургийн овог оруулна уу.",
									regex : "Ургийн овог дунд тоо оруулхыг хориглоно"
								},
								"client.lname" : {
									required : "Овог оруулна уу.",
									regex : "Хүний овог дунд тоо оруулхыг хориглоно"
								},
								"client.fname" : {
									required : "Нэр оруулна уу.",
									regex : "Хүний нэр дунд тоо оруулхыг хориглоно"
								},
								"client.citizenship" : {
									required : "Иргэншил сонгоно уу."
								},
								"client.address" : {
									required : "Гэрийн хаяг оруулна уу."
								},
								"orderCustomer[0].lastName" : {
									required : "Холбоо барих хүний овог оруулна уу.",
									regex : "Хүний овог дунд тоо оруулхыг хориглоно"
								},
								"orderCustomer[0].firstName" : {
									required : "Холбоо барих хүний нэр оруулна уу.",
									regex : "Хүний нэр дунд тоо оруулхыг хориглоно"
								},
								"orderCustomer[0].registerNumber" : {
									required : "Холбоо барих хүний регистерийн дугаар оруулна уу.",
									regex : "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
								},
								"orderCustomer[0].relation" : {
									required : "Холбоо хамаарал сонгоно уу."
								},
								"orderCustomer[0].phone1" : {
									required : "Холбоо барих хүний утасны дугаар оруулна уу.",
									regex : "Утасны дугаар зөвхөн тоо байна."
								}
							},

							invalidHandler : function(event, validator) { // display
								// error
								// alert
								// on
								// form
								// submit

							},

							highlight : function(element) { // hightlight error
								// inputs
								$(element).closest('.form-group').addClass(
										'has-error'); // set error class to
								// the control group
							},

							success : function(label) {
								label.closest('.form-group').removeClass(
										'has-error');
								label.remove();
							},

							errorPlacement : function(error, element) {
								if (element.closest('.input-icon').size() === 1) {
									error.insertAfter(element
											.closest('.input-icon'));
								} else {
									error.insertAfter(element);
								}
							},

							submitHandler : function(form) {
								form.submit();
							}
						});

		$('#preorder-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#preorder-form').validate().form()) {
					$('#preorder-form').submit(); // form validation success,
					// call ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#client-form')[0].reset();
		});

		$("#clientregNumber")
				.change(
						function() {
							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.regNumber = $("#clientregNumber").val();
							$
									.ajax({
										type : "POST",
										url : "/preorder/getclient",
										async : false,
										dataType : "json",
										data : param,
										success : function(result) {
											if (result.success == true) {
												$("#clientid").val(
														result.data.id);
												$("#clientcode").val(
														result.data.code);
												$("#clientfamily").val(
														result.data.familyName);
												$("#clientlname").val(
														result.data.lname);
												$("#clientfname").val(
														result.data.fname);
												$(
														"#clientcitizenship option[value="
																+ result.data.citizenship
																+ "]").prop(
														'selected', true);
												$("#clientnationality")
														.val(
																result.data.nationality);
												$("#clientaddress").val(
														result.data.address);
												$("#clientbirthplace").val(
														result.data.birthPlace);
												$("#clientbirthdate")
														.val(
																getDateString(new Date(
																		result.data.birthDate)));
												$(
														"#clientzodiac option[value="
																+ result.data.zodiac
																+ "]").prop(
														'selected', true);
												$(
														"#clientreligion option[value="
																+ result.data.religion
																+ "]").prop(
														'selected', true);
												$(
														"#clienteducation option[value="
																+ result.data.education
																+ "]").prop(
														'selected', true);
												$("#clientjobspot").val(
														result.data.jobSpot);

												if (result.data.gender == 1) {
													$('#clientmale').prop(
															'checked', true)
															.parent().addClass(
																	"checked");
													$('#clientfemale').prop(
															'checked', false)
															.parent()
															.removeClass(
																	"checked");
												} else {
													$('#clientfemale').prop(
															'checked', true)
															.parent().addClass(
																	"checked");
													$('#clientmale').prop(
															'checked', false)
															.parent()
															.removeClass(
																	"checked");
												}

											} else { // үгүй бол цэвэрлэнэ.
												$("#clientid").val(null);
												$("#clientcode").val("");
												$("#clientfamily").val("");
												$("#clientlname").val("");
												$("#clientfname").val("");
												$("#clientcitizenship option")
														.prop('selected', false);
												$("#clientnationality").val("");
												$("#clientaddress").val("");
												$("#clientbirthplace").val("");
												$("#clientbirthdate").val("");
												$("#clientzodiac option").prop(
														'selected', false);
												$("#clientreligion option")
														.prop('selected', false);
												$("#clienteducation option")
														.prop('selected', false);
												$("#clientjobspot").val("");

												$('#clientmale').prop(
														'checked', true)
														.parent().addClass(
																"checked");
												$('#clientfemale').prop(
														'checked', false)
														.parent().removeClass(
																"checked");

											}
										},
										error : function() {
											// CRSWebUtils.showAlert("danger",
											// "warning", "Үйлдэл амжилтгүй
											// боллоо. Дахин оролдоно уу.", 0);
										}
									});
						});

	}

	return {
		// main function to initiate the module
		init : function() {
			handlePreOrderForm();
			$("#preordercustomers_editable_1").dataTable({
				"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
				// set the initial value
				"pageLength" : 20,
				"bLengthChange" : false,
				"bFilter" : false,
				"bPaginate" : false,
				"info" : false,
				"language" : CRSWebUtils.dtLangMN,
				"columnDefs" : [ { // set default column settings
					'orderable' : false,
					'targets' : [ 0, 1, 2, 3, 4, 5, 6 ]
				}, {
					"searchable" : false,
					"targets" : [ 0, 1, 2, 3, 4, 5, 6 ]
				}, {
					"targets" : 0,
					"visible" : false,
				} ]
			});
		}
	};
}();

$(document)
		.ready(
				function() {
					if ($('.cusid').val() != null) {
						for (var i = 0; i <= 2; i++) {
							$('.cusid')[i].name = "orderCustomer[" + i + "].id";
							$('.cuslastName')[i].name = "orderCustomer[" + i
									+ "].lastName";
							$('.cusfirstName')[i].name = "orderCustomer[" + i
									+ "].firstName";
							$('.cusregisterNumber')[i].name = "orderCustomer["
									+ i + "].registerNumber";
							$('.cusrelation')[i].name = "orderCustomer[" + i
									+ "].relation";
							$('.cusphone1')[i].name = "orderCustomer[" + i
									+ "].phone1";
							$('.cusphone2')[i].name = "orderCustomer[" + i
									+ "].phone2";
						}
					} else {
					}
				});

$("#packcode").change(
		function() {

			var me = $(this);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.packid = $("#packcode").val();

			if ($("#packcode").val() == "") {
				CRSWebUtils.showAlert("danger", "warning", "Багц сонгоно уу.",
						0);
			} else {
				$.ajax({
					type : "POST",
					url : "/preorder/getpack",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#price").val(result.data);
							$("#priceFake").val(CRSWebUtils.formatMoney(result.data));

						} else {
							CRSWebUtils.showAlert("danger", "warning",
									result.message, 0);
						}
					},
					error : function() {
						CRSWebUtils.showAlert("danger", "warning",
								"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
								0);
					}
				});
			}

		});

$("#prePaymentPercentage").keyup(
		function() {
			if ($("#prePaymentPercentage").val() > 100 || $("#prePaymentPercentage").val() < 0) {
				CRSWebUtils.showAlert("danger", "warning",
						"Урьдчилгаа хувь 1 - 100% байна.", 0);
			} else {
				var Total = $("#price").val() * $("#prePaymentPercentage").val() / 100;
				$("#prePayment").val(Total);
				$("#prePaymentFake").val(CRSWebUtils.formatMoney(Total));
				
				var TotalLeft = $("#price").val() - Total;
				$("#lastMoney").val(TotalLeft);
				$("#lastMoneyFake").val(CRSWebUtils.formatMoney(TotalLeft));
			}
		});

$("#prePaymentFake").keyup(function() {
	var percentage = $("#prePaymentFake").val() * 100 / $("#price").val();
	$("#prePaymentPercentage").val(percentage);
	
	var prePayment = $("#prePaymentFake").val();
	$("#prePayment").val(prePayment);
	
	var TotalLeft = $("#price").val() - $("#prePaymentFake").val();
	$("#lastMoney").val(TotalLeft);
	$("#lastMoneyFake").val(CRSWebUtils.formatMoney(TotalLeft));
});

function getDateString(date) {

	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth() + 1).toString();
	var dd = date.getDate().toString();

	return yyyy + "." + (mm[1] ? mm : "0" + mm[0]) + "."
			+ (dd[1] ? dd : "0" + dd[0]);
};

function benefutOfStupa() {
	window
			.open(
					"/preorder/document/benefitofstupa",
					"_blank",
					"type=fullWindow, fullscreen, scrollbars=yes, toolbar=yes, scrollbars=yes, resizable=yes");
}

function serviceToRate() {
	window
			.open(
					"/preorder/document/servicetorate",
					"_blank",
					"type=fullWindow, fullscreen, scrollbars=yes, toolbar=yes, scrollbars=yes, resizable=yes");
}

function digGraveToRate() {
	window
			.open(
					"/preorder/document/diggravetorate",
					"_blank",
					"type=fullWindow, fullscreen, scrollbars=yes, toolbar=yes, scrollbars=yes, resizable=yes");
}

function preOrderRegisteration() {
	window
			.open(
					"/preorder/document/preOrderRegisteration",
					"_blank",
					"type=fullWindow, fullscreen, scrollbars=yes, toolbar=yes, scrollbars=yes, resizable=yes");
}
