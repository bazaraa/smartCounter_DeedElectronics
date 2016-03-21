var permissionForm = function() {

    var handlePermissionForm= function() {
        $('#permission-form').validate({
            errorElement: 'span', 
            errorClass: 'help-block',
            focusInvalid: false, 
            rules: {
                name: {
                    required: true
                },
                code: {
                    required: true
                }
            },

            messages: {
                name: {
                    required: "Эрхийн нэр оруулна уу."
                },
                code: {
                    required: "Эрхийн код оруулна уу."
                }
            },

            invalidHandler: function(event, validator) {    

            },

            highlight: function(element) { 
                $(element)
                    .closest('.form-group').addClass('has-error'); 
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

        $('#permission-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#permission-form').validate().form()) {
                    $('#permission-form').submit(); 
                }
                return false;
            }
        });
        $("#formReset").click(function() {
        	$('#permission-form')[0].reset();
        });
    }

    return {
        init: function() {

        	handlePermissionForm();

        }

    };

}();