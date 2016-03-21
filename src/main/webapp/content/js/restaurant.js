var restaurantTableEditable = function() {

	var handleTable = function() {

		var table = $('#restaurant_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ { // set default column settings
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : false,
			} ],
			"order" : [ [ 1, "asc" ] ]
		});
		table
				.on(
						'click',
						'.delete',
						function(e) {
							e.preventDefault();

							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents('table').DataTable()
									.row(nRow).data();

							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.id = rowData[0];

							bootbox
									.confirm({
										message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
										callback : function(result) {
											if (result == false) {
												return;
											}

											$
													.ajax({
														type : "POST",
														url : "/restaurant/delete",
														async : false,
														dataType : "json",
														data : param,
														success : function(
																result) {
															if (result.success == true) {
																oTable
																		.fnDeleteRow(nRow);
																CRSWebUtils
																		.showAlert(
																				"success",
																				"check",
																				"Амжилттай устгагдлаа.",
																				0);
															} else {
																alert(result.message);
																CRSWebUtils
																		.showAlert(
																				"danger",
																				"warning",
																				result.message,
																				0);
															}
														},
														error : function() {
															CRSWebUtils
																	.showAlert(
																			"danger",
																			"warning",
																			"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
																			0);
														}
													});

										}
									});

						});

	}

	return {

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};

}();

var restaurantForm = function() {

    var handleRestaurantForm= function() {
        $('#restaurant-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                "restaurant.code": {
                    required : true
                },
                "restaurant.name": {
                    required : true
                },
                "restaurant.typeCode": {
                    required : true
                },
                "restaurant.companyName": {
                	required : true
                },
                "restaurant.capacity": {
                	required : true
                },
                "restaurant.rcomment": {
                    required : true
                }
            },

            messages: {
            	"restaurant.code": {
                    required : "Танхимын код оруулна уу."
                },
                "restaurant.name": {
                    required : "Танхимын нэр оруулна уу."
                },
                "restaurant.typeCode": {
                    required : "Танхимын төрөл сонгоно уу."
                },
                "restaurant.companyName": {
                	required : "Тухайн танхимын эзэмшил компанийг сонгоно уу."
                },
                "restaurant.capacity": {
                	required : "Багтаамжийг нь бичнэ үү."
                },
                "restaurant.rcomment": {
                    required : "Тайлбараа оруулна уу."
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

        $('#restaurant-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#restaurant-form').validate().form()) {
                    $('#restaurant-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        
        $("#formReset").click(function() {
        	$('#restaurant-form')[0].reset();
        });
    }

    return {
        //main function to initiate the module
        init: function() {

        	handleRestaurantForm();
        	
        }

    };

}();

var FormFileUpload = function () {


    return {
        //main function to initiate the module
        init: function () {

             // Initialize the jQuery File Upload widget:
            $('#restaurant-form').fileupload({
                disableImageResize: false,
                autoUpload: false,
                disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
                maxFileSize: 5000000,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                // Uncomment the following to send cross-domain cookies:
                //xhrFields: {withCredentials: true},                
            });

            // Enable iframe cross-domain access via redirect option:
            $('#restaurant-form').fileupload(
                'option',
                'redirect',
                window.location.href.replace(
                    /\/[^\/]*$/,
                    '/cors/result.html?%s'
                )
            );

            // Upload server status check for browsers with CORS support:
           /* if ($.support.cors) {
                $.ajax({
                    type: 'HEAD'
                }).fail(function () {
                    $('<div class="alert alert-danger"/>')
                        .text('Upload server currently unavailable - ' +
                                new Date())
                        .appendTo('#restaurant-form');
                });
            }*/

            // Load & display existing files:
            $('#restaurant-form').addClass('fileupload-processing');
            $.ajax({
                // Uncomment the following to send cross-domain cookies:
                //xhrFields: {withCredentials: true},
                url: $('#restaurant-form').attr("action"),
                dataType: 'json',
                context: $('#restaurant-form')[0]
            }).always(function () {
                $(this).removeClass('fileupload-processing');
            }).done(function (result) {
                $(this).fileupload('option', 'done')
                .call(this, $.Event('done'), {result: result});
            });
        }

    };

}();