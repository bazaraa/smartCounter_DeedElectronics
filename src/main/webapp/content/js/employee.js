var employeeForm = function() {

    var handleEmployeeForm= function() {
        $('#employee-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                },
                birthdate: {
                    required: true
                },
                registerNumber: {
                    required: true
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                zodiac: {
                    required: true
                },
                empType: {
                    required: true
                },
                "company.id": {
                    required: true
                }
            },

            messages: {
                firstname: {
                    required: "Ажилны нэр оруулна уу."
                },
                lastname: {
                    required: "Ажилны овог оруулна уу."
                },
                birthdate: {
                    required: "Төрсөн огноо оруулна уу."
                },
                registerNumber: {
                    required: "Регистрийн дугаар оруулна уу."
                },
                phone: {
                    required: "Утасны дугаар оруулна уу."
                },
                email: {
                    required: "И-мэйл хаяг оруулна уу.",
                    email: "Зөв и-мэйл хаяг оруулна уу."
                },
                zodiac: {
                    required: "Жил сонгоно уу."
                },
                empType: {
                    required: "Төрөл сонгоно уу."
                },
                "company.id": {
                    required: "Төрөл сонгоно уу."
                }
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

        $('#employee-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#employee-form').validate().form()) {
                    $('#employee-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        
        $("#formReset").click(function() {
        	$('#employee-form')[0].reset();
        });
    }

    return {
        //main function to initiate the module
        init: function() {

        	handleEmployeeForm();
        	
        }

    };

}();