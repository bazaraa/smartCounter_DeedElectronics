var userForm = function() {

    var handleUserForm= function() {
        $('#user-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                "role.id": {
                    required: true
                },
                "employee.id": {
                    required: true
                },
                active: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "Хэрэглэгчийн нэр оруулна уу."
                },
                "role.id": {
                    required: "Бүлэг сонгоно уу."
                },
                "employee.id": {
                    required: "Ажилтан сонгоно уу."
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

        $('#user-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#user-form').validate().form()) {
                    $('#user-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        $("#formReset").click(function() {
        	$('#user-form')[0].reset();
        });
    }

    return {
        //main function to initiate the module
        init: function() {

        	handleUserForm();

        }

    };

}();