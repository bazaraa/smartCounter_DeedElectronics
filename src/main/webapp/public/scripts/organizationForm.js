var orgTable= function() {
	
	var handleOrgForm = function() {	
		
		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#org-form').validate({
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
					},
					phone : {
						regex : /^[0-9]{8}/
					},
					organizationType : {
						required : true
					},
					organizationLevel : {
						required : true
					}
				},

				messages : {
					name : {
						required : "Байгууллагын нэр оруулна уу"
					},
					code : {
						required : "Байгууллагын код оруулна уу"
					},
					phone : {
						regex : "Утасны дугаар дан тооноос бүрдсэн 8 тэмдэгт байна Жишээ нь: 88998899"
					},
					organizationType : {
						required : "Байгууллагын төрөл сонгоно уу"
					},
					organizationLevel : {
						required : "Байгууллагын түвшин сонгоно уу"
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

		$('#org-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#org-form').validate().form()) {
					$('#org-form').submit(); // form validation success, call
												// ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#org-form')[0].reset();
		});
	}
	


	return {

		// main function to initiate the module
		init : function() {
			handleOrgForm();
		}

	};

}();

$("#aimag").change(function(){
	var aimagId = $("#aimag option:selected").val();
	
	$.ajax({
		url : "/organization/getsums/" + aimagId,
		success : function(result) {
			$('#sum').empty();
			result = JSON.parse(result)
			for ( var i in result) {
				var sum = result[i];
				$('#sum').append('<option value="' + sum.id + '">' + sum.name + '</option>');
			}
		}
	});
});

$("#aimag").ready(function(){
	var aimagId = $("#aimag option:selected").val();
	if(aimagId != null){
		$.ajax({
			url : "/organization/getsums/" + aimagId,
			success : function(result) {
				$('#sum').empty();
				result = JSON.parse(result)
				for ( var i in result) {
					var sum = result[i];
					$('#sum').append('<option value="' + sum.id + '">' + sum.name + '</option>');
				}
			}
		});
	}
});

