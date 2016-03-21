var paymentForm = function() {

    var handlePaymentForm= function() {
    	
        $.validator.addMethod(
    	        "regex",
    	        function(value, element, regexp) {
    	            var re = new RegExp(regexp);
    	            console.log(re.test(value))
    	            return this.optional(element) || re.test(value);
    	        },
    	        "Оруулсан утгаа шалгана уу."
    	);
    	
        $('#paymentForm-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
            },

            messages: {
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });

        $('#paymentForm-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#paymentForm-form').validate().form()) {
                    $('#paymentForm-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        
        $("#formReset").click(function() {
        	$('#paymentForm-form')[0].reset();
        });

    }

    return {
        //main function to initiate the module
        init: function() {
        	handlePaymentForm();
        	$("#paymentForm_editable_1").dataTable({
    			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
    			// set the initial value
    			"pageLength" : 20,
    			"bLengthChange": false,
    			"bFilter": false,
    			"bPaginate": false,
    	        "info":     false,
    			"language" : CRSWebUtils.dtLangMN,
    			"columnDefs" : [ { // set default column settings
    				'orderable' : false,
    				'targets' : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    			}, {
    				"searchable" : false,
    				"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    			}, {
    				"targets": 0,
                    "visible": false,
    			}]
    		});
        }
    };
}();