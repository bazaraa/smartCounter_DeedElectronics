var userTable= function() {
	
	var handleUserForm = function() {	
		
		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#user-form').validate({
				errorElement : 'span', // default input error
										// message container
				errorClass : 'help-block', // default input error
											// message class
				focusInvalid : false, // do not focus the last
										// invalid input
				rules : {
					username : {
						required : true
					},
					firstName : {
						required : true
					},
					lastName : {
						required : true
					},
					phone : {
						regex : /^[0-9]{8}/
					},
					regName : {
						regex : /^[а-я-өёүa-z-]{1,2}[0-9]{8,}/
					},
					role : {
						required : true
					},
					organization : {
						required : true
					}
				},

				messages : {
					username : {
						required : "Хэрэглэгчийн нэвтрэх нэр оруулна уу"
					},
					firstName : {
						required : "Хэрэглэгчийн нэр оруулна уу"
					},
					lastName : {
						required : "Хэрэглэгчийн овог оруулна уу"
					},
					phone : {
						regex : "Утасны дугаар дан тооноос бүрдсэн 8 тэмдэгт байна Жишээ нь: 88998899"
					},
					regName : {
						regex : "Хэрэглэгчийн регистерийн дугаар дараах байдлаар байна Жишээ нь: аб12345678"
					},
					role : {
						required : "Хэрэглэгчийн эрх сонгоно уу"
					},
					organization : {
						required : "Хэрэглэгчийн харьяалах байгууллага сонгоно уу"
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

		$('#user-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#user-form').validate().form()) {
					$('#user-form').submit(); // form validation success, call
												// ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#user-form')[0].reset();
		});
	}
	


	return {

		// main function to initiate the module
		init : function() {
			handleUserForm();
		}

	};

}();