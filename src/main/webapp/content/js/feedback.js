var feedbackForm = function() {

    var handleFeedBackForm= function() {
        
        $("#formReset").click(function() {
        	$('#feedback-form')[0].reset();
        });
        
        $(document).ready(function() {
			var me = $("#client");
			if (me.is(':checked')) {
				$(".client").show();
				$(".company").hide();
			}

		});
        
        $(document).ready(function() {
			var me = $("#company");
			if (me.is(':checked')) {
				$(".client").hide();
				$(".company").show();
			}

		});
		
		$("#client").change(function() {
			var me = $(this);
			if (me.is(':checked')) {
				$(".client").show();
				$(".company").hide();
			}

		});
		
		$("#company").change(function() {
			var me = $(this);
			if (me.is(':checked')) {
				$(".company").show();
				$(".client").hide();
			}

		});
		
		$('#typeOfTwo').ready(function(){
			$('#typeOfTwo').change();
		});
		
		$("#typeOfTwo").change(function() {
			var me = $(this);
			if (me.val() == "feedback") {
				$(".offer").show();
				$(".complaint").hide();
			}

		});
		
		$("#typeOfTwo").change(function() {
			var me = $(this);
			if (me.val() == "complaint") {
				$(".offer").hide();
				$(".complaint").show();
			}

		});
		
		$('#feedback-form')
		.validate(
				{
					errorElement : 'span', // default input error
											// message container
					errorClass : 'help-block', // default input error
												// message class
					focusInvalid : false, // do not focus the last
											// invalid input
					rules : {
						productPack : {
							required : true
						},
						companyFeedBackType : {
							required : true
						},
						productPack1 : {
							required : true
						},
						description : {
							required : true
						}
					},

					messages : {
						productPack : {
							required : "Санал гомдол гаргах бүтээгдэхүүнээ сонгоно уу."
						},
						companyFeedBackType : {
							required : "Төрөлөө сонгоно уу."
						},
						productPack1 : {
							required : "Санал гомдол гаргах бүтээгдэхүүнээ сонгоно уу."
						},
						description : {
							required : "Тэмдэглэлээ оруулна уу."
						}
					},

					invalidHandler : function(event, validator) { 

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
		
    }

    return {
        //main function to initiate the module
        init: function() {

        	handleFeedBackForm();
        	
        }

    };

}();