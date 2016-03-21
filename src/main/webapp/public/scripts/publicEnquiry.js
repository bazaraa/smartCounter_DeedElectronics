var publicEnquiryForm = function() {

	var handleForm = function() {

		var form1 = $('#publicEnquiry-form');
		var error1 = $('.alert-danger', form1);
		var success1 = $('.alert-success', form1);

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		form1
				.validate({
					errorElement : 'span',
					errorClass : 'help-block',
					focusInvalid : false,
					ignore : "",
					rules : {
						"publicEnquiry.lastName" : {
							required : true,
							regex : /^[а-яА-ЯөӨүҮa-zA-Z]/
						},
						"publicEnquiry.firstName" : {
							required : true,
							regex : /^[а-яА-ЯөӨүҮa-zA-Z]/
						},
						"publicEnquiry.interestDate" : {
							required : true
						},
						"publicEnquiry.interestTime" : {
							required : true
						},
						"publicEnquiry.phone1" : {
							required : true,
							regex : /^[0-9]/
						},
						"publicEnquiry.email" : {
							required : true,
							regex : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
						}
					},

					messages : {
						"publicEnquiry.lastName" : {
							required : "Овгоо оруулна уу.",
							regex : "Овог оруулах хэсэгт тоо оруулах боломжгүй"
						},
						"publicEnquiry.firstName" : {
							required : "Нэрээ оруулна уу.",
							regex : "Нэр оруулах хэсэгт тоо оруулах боломжгүй"
						},
						"publicEnquiry.interestDate" : {
							required : "Сонирхож буй өдрөө оруулна уу."
						},
						"publicEnquiry.interestTime" : {
							required : "Сонирхож буй цагаа оруулна уу."
						},
						"publicEnquiry.phone1" : {
							required : "Утасны дугаараа оруулна уу.",
							regex : "Утасны дугаар зөвхөн тоо байна."
						},
						"publicEnquiry.email" : {
							required : "Имэйл хаягаа оруулна уу",
							regex : "Имэйл хаягаа зөв оруулна уу. Жишээ нь: abc@abc.com"
						}
					},

					invalidHandler : function(event, validator) {
					},

					highlight : function(element) {
						$(element).closest('.form-group').addClass('has-error');
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
	}

	return {
		init : function() {
			handleForm();
		}
	};
}();