var fileLibraryForm = function() {

	var handleForm = function() {
		$('#fileLibrary-form')
				.validate(
						{
							errorElement : 'span',
							errorClass : 'help-block',
							focusInvalid : false,
							rules : {
								"fileLibrary.name" : {
									required : true
								},
								"fileLibrary.file" : {
									required : true
								},
								"fileLibrary.serviceType" : {
									required : true
								}
							},

							messages : {
								"fileLibrary.name" : {
									required : "Файлын нэр оруулна уу."
								},
								"fileLibrary.file" : {
									required : " "
								},
								"fileLibrary.serviceType" : {
									required : "Төрөл сонгоно уу."
								}
							},

							invalidHandler : function(event, validator) {
							},

							highlight : function(element) {
								$(element).closest('.form-group').addClass(
										'has-error');
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
								// 
								var inputFileUpload = document
										.getElementById("inputFileUpload");
								if (inputFileUpload.files.length > 0) {
									if (inputFileUpload.files[0].size > 10485760) {
										CRSWebUtils.showAlert("danger", "warning", "Файлын хэмжээ 10 MB -аас бага байх ёстой.", 0);
										return false;
									}
								}

								form.submit();
							}
						});

		$('#fileLibrary-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#fileLibrary-form').validate().form()) {

					var inputFileUpload = document
							.getElementById("inputFileUpload");
					if (inputFileUpload.files.length > 0) {
						if (inputFileUpload.files[0].size > 10485760) {

							CRSWebUtils.showAlert("danger", "warning", "Файлын хэмжээ 10 MB -аас бага байх ёстой.", 0);
							return false;
						}
					}
					$('#fileLibrary-form').submit();
				}
				return false;
			}
		});
	}

	return {
		init : function() {
			handleForm();
		}
	};
}();