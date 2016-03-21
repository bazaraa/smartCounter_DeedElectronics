var clientForm = function() {

	var handleClientForm = function() {

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#client-form')
				.validate(
						{
							errorElement : 'span', // default input error
													// message container
							errorClass : 'help-block', // default input error
														// message class
							focusInvalid : false, // do not focus the last
													// invalid input
							rules : {
								familyName : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/
								},
								lname : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/
								},
								fname : {
									required : true,
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/
								},
								citizenship : {
									required : true
								},
								birthDate : {
									required : true
								},
								birthPlace : {
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/
								},
								deathDate : {
									required : true
								},
								nationality : {
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/
								},
								regNumber : {
									required : true,
									regex : /^[а-я-өёүa-z-]{1,2}[0-9]{8,}/
								},
								jobSpot : {
									regex : /^[а-яА-ЯөӨёЁүҮa-zA-Z]/
								},
								cemeteryType : {
									required : true
								},
							},

							messages : {
								familyName : {
									required : "Ургийн овог оруулна уу",
									regex : "Ургийн овог дунд тоо оруулхыг хориглоно"
								},
								lname : {
									required : "Овог оруулна уу",
									regex : "Хүний овог дунд тоо оруулхыг хориглоно"
								},
								fname : {
									required : "Нэр оруулна уу",
									regex : "Хүний нэр дунд тоо оруулхыг хориглоно"
								},
								citizenship : {
									required : "Иргэншил сонгоно уу"
								},
								birthDate : {
									required : "Төрсөн огноо оруулна уу",
								},
								birthPlace : {
									regex : "Төрсөн газрын нэр дунд тоо оруулхыг хориглоно"
								},
								deathDate : {
									required : "Нас барсан огноо оруулна уу",
								},
								nationality : {
									regex : "Яс үндэс дунд тоо оруулхыг хориглоно"
								},
								regNumber : {
									required : "Регистрийн дугаар оруулна уу",
									regex : "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
								},
								jobSpot : {
									regex : "Албан тушаал дунд тоо оруулхыг хориглоно"
								},
								cemeteryType : {
									required : "Оршуулах хэлбэр сонгоно уу"
								},
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

		$('#client-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#client-form').validate().form()) {
					$('#client-form').submit(); // form validation success, call
												// ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#client-form')[0].reset();
		});
		
//		$("#submitBtn").click(function() {
//			death = parseInt(getYearString(new Date($("#deathDate").val())));
//			birth = parseInt(getYearString(new Date($("#birthDate").val())));
//			$("#age").val(death - birth);
//		});

		$("#regNumber").change(
						function() {
							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.regNumber = $("#regNumber").val();
							$
									.ajax({
										type : "POST",
										url : "/client/getclient",
										async : false,
										dataType : "json",
										data : param,
										success : function(result) {
											if (result.success == true) {
												$("#id").val(result.data.id);
												$("#code")
														.val(result.data.code);
												$("#familyName").val(
														result.data.familyName);
												$("#age").val(result.data.age);
												$("#lname").val(
														result.data.lname);
												$("#fname").val(
														result.data.fname);
												$("#birthPlace").val(
														result.data.birthPlace);
												if (result.data.birthDate == null) {
													$("#birthDate").val();
												} else {
													$("#birthDate")
															.val(
																	getDateString(new Date(
																			result.data.birthDate)));
												}
												$(
														"#zodiac option[value="
																+ result.data.zodiac
																+ "]").prop(
														'selected', true);
												$(
														"#citizenship option[value="
																+ result.data.citizenship
																+ "]").prop(
														'selected', true);
												$("#heightWeightWidth")
														.val(
																result.data.heightWeightWidth);
												$("#nationality")
														.val(
																result.data.nationality);
												$(
														"#religion option[value="
																+ result.data.religion
																+ "]").prop(
														'selected', true);
												$("#address").val(
														result.data.address);
												$(
														"#education option[value="
																+ result.data.education
																+ "]").prop(
														'selected', true);
												$("#jobSpot").val(
														result.data.jobSpot);
												if (result.data.deathDate == null) {
													$("#deathDate")
															.val(
																	getDateString(new Date()));
												} else {
													$('#deathDate')
															.val(
																	getDateString(new Date(
																			result.data.deathDate)));
												}
												$(
														"#deathPlace option[value="
																+ result.data.deathPlace
																+ "]").prop(
														'selected', true);
												$(
														"#deathType option[value="
																+ result.data.deathType
																+ "]").prop(
														'selected', true);

												if (result.data.age == null) {
													death = parseInt(getYearString(new Date(
															result.data.deathDate)));
													birth = parseInt(getYearString(new Date(
															result.data.birthDate)));
													$("#age")
															.val(death - birth);
												} else {
													$("#age").val(
															result.data.age);
												}

												if (result.data.gender == 1) {
													$('#male')
															.prop('checked',
																	true)
															.parent()
															.addClass("checked");
													$('#female').prop(
															'checked', false)
															.parent()
															.removeClass(
																	"checked");
												} else {
													$('#female').prop(
															'checked', true)
															.parent().addClass(
																	"checked");
													$('#male').prop('checked',
															false).parent()
															.removeClass(
																	"checked");
												}
											} else {
												$("#id").val(null);
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
			if($('#loginRoleId').val() === 'ROLE_HOROSCOPER'){
				$('#zurhaichNamtarPictures').hide();
				$('#zurhaichNamtarOngoitsoloh').hide();
				$('#newOrderCreate').hide();
			}else{
				$('#zurhaichNamtarPictures').show();
				$('#zurhaichNamtarOngoitsoloh').show();
				$('#newOrderCreate').show();
			}
			
			
			$("#birthDate").change(function(){
				if($("#deathDate").val() != ''){
					calcClientAge();
				}
			});
			
			$("#deathDate").change(function(){
				if($("#birthDate").val() != ''){
					calcClientAge();
				}
			});
			handleClientForm();

		}

	};

}();


function calcClientAge(){
	var deathDate = $("#deathDate").val();
		var arr = deathDate.split(".");
		var death = arr[0];
		var deathYear = parseInt(death);
		var deathMonth = parseInt(arr[1]);
		var deathDay = parseInt(arr[2]);
		
		var birthDate = $("#birthDate").val();
		var arr1 = birthDate.split(".");
		var birth = arr1[0];
		var birthYear = parseInt(birth);
		var birthMonth = parseInt(arr1[1]);
		var birthDay = parseInt(arr1[2]);
		
		var yeardiff = deathYear - birthYear;
		var monthdiff = deathMonth - birthMonth;
		if(yeardiff == 0)
		{
			if(monthdiff == 0)
				$("#age").val((deathDay - birthDay) + " өдөр");
			else
				$("#age").val(monthdiff + " сар");
		}else {
			if(yeardiff == 1)
			{
				monthdiff = 12 - (birthMonth - deathMonth);
				if(monthdiff > 0)
					$("#age").val(monthdiff + " сар");
					
			}else $("#age").val(yeardiff);
		}
}

$('#monk').change("click", function() {
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.monkId = $('#monk').val();
			if(param.monkId != ""){
				$.ajax({
						type : "POST",
						url : "/client/getMonastery",
						async : false,
						dataType : "json",
						data : param,
						success : function(result) {
							if (result.success == true) {
								$('#monastery').val(result.data.monasteryId);
							} else {
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
			}
		});

function calcSpecialDocNum() {
	var begNumber = $("#startNumber").val();
	var endNumber = $("#endNumber").val();
	if ($.isNumeric(begNumber) && $.isNumeric(endNumber)) {

		begNumber = parseInt(begNumber);
		endNumber = parseInt(endNumber);
		if (begNumber != 0 && endNumber != 0) {
			$("#documentCount").val(endNumber - begNumber + 1);
		}
	}
}

function getDateString(date) {

	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth() + 1).toString();
	var dd = date.getDate().toString();

	return yyyy + "." + (mm[1] ? mm : "0" + mm[0]) + "."
			+ (dd[1] ? dd : "0" + dd[0]);
};

function getYearString(date) {

	var yyyy = date.getFullYear().toString();

	return yyyy;
};