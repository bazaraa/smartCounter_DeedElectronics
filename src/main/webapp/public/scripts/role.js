var roleTable= function() {
	
	var handleRoleForm = function() {	
		
		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#role-form').validate({
				errorElement : 'span', // default input error
										// message container
				errorClass : 'help-block', // default input error
											// message class
				focusInvalid : false, // do not focus the last
										// invalid input
				rules : {
					name : {
						required : true
					},
					code : {
						required : true
					}
				},

				messages : {
					name : {
						required : "Бүлгийн нэр оруулна уу"
					},
					code : {
						required : "Бүлгийн код оруулна уу"
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

		$('#role-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#role-form').validate().form()) {
					$('#role-form').submit(); // form validation success, call
												// ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#role-form')[0].reset();
		});
	}
	


	return {

		// main function to initiate the module
		init : function() {
			handleRoleForm();
		}

	};

}();