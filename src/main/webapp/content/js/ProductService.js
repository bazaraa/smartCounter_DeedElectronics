var psTableEditable = function() {

	var handleTable = function() {

		var table = $('#ps_editable_1');

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
			"order" : [ [ 10, "asc" ] ]
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
														url : "/productservice/delete",
														async : true,
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

var productServiceForm = function() {

    var handleProductServiceForm= function() {
        $('#productService-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                code: {
                    required: true
                },
                proName: {
                    required: true
                },
                status: {
                    required: true
                },
                category: {
                    required: true
                },
                cannotbenull: {
                    required: true
                },
                productType: {
                    required: true
                },
                company: {
                    required: true
                },
                employee: {
                    required: true
                },
                metre: {
                    required: true
                },
                price: {
                    required: true
                }
            },

            messages: {
            	code: {
                    required: "Код оруулна уу."
                },
                proName: {
                    required: "Нэр оруулна уу."
                },
                status: {
                    required: "Статус сонгоно уу."
                },
                category: {
                    required: "Ангилал сонгоно уу."
                },
                cannotbenull: {
                    required: "Ангилал сонгоно уу."
                },
                productType: {
                    required: "Төрөл сонгоно уу."
                },
                company: {
                    required: "Компани сонгоно уу."
                },
                employee: {
                    required: "Хариуцагч сонгоно уу."
                },
                metre: {
                    required: "Хэмжих нэгж сонгоно уу."
                },
                price: {
                    required: "Үнэ оруулна уу."
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

        $('#productService-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#productService-form').validate().form()) {
                    $('#productService-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        
        $("#formReset").click(function() {
        	$('#productService-form')[0].reset();
        });
    }

    return {
        //main function to initiate the module
        init: function() {

        	handleProductServiceForm();
        	
        	$("#cmbProductType").change(function() {
        		var me = $(this);
        		var productServiceId = $("#productServiceId").val();
        		var productTypeId = me.find('option:selected').val();
        		
        		if(productTypeId == "")
        			productTypeId = -1;
        		
        		if(productServiceId == "")
        			productServiceId = -1;
        		$.ajax({
        			type : "GET",
        			url : "/productservice/getproductproperties/" + productServiceId + "/" + productTypeId,
        			async : false,
        			dataType : "json",
        			success : function(
        					result) {					
        				if(result.success)
        				{
        					var pnlProductProperies = $("#pnlProductProperies");
        					pnlProductProperies.html("");
        					var item = null;
        					for(var i =0; i< result.data.length; i++)
        					{
        						item = result.data[i];
        						if(!item.value)
        						{
        							item.value = "";
        						}
        						
        						pnlProductProperies.append(
									'<div class="form-group">' +
										'<label class="control-label col-md-3">' + item.name  +
										'</label>' +
										'<div class="col-md-6">' +
										'	<input type="hidden" name="properties[' + i + '].property.id" ' +
										'		value="'+ item.id  +'" class="form-control" />' +

										'<input type="hidden" name="properties[' + i + '].productType.id"  ' + 
										'	value="'+productTypeId+'" class="form-control" />' + 
										
										'	<input type="text" name="properties[' + i + '].value" ' +
										'		value="'+ item.value  +'" class="form-control" />' +
										'</div><div class="col-md-3"></div>' +
									'</div>');
        					}
        				}else{
        					CRSWebUtils.showAlert("danger", "warning", result.message, 0);						
        				}
        				Metronic.stopPageLoading();
        			},
        			error : function() {
        				Metronic.stopPageLoading();
        				CRSWebUtils
        						.showAlert(
        								"danger",
        								"warning",
        								"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
        								0);
        			}
        		});
        	});
        }

    };

}();

var TableTree = function() {

    var demo1 = function() {

        jQuery('#gtreetable').gtreetable({
            'source': function(id) {
        		reload : return {
                    type: 'GET',
                    url: '/productservice/getnodes',
                    data: {
                        'id': id
                    },
                    dataType: 'json',
                    error: function(XMLHttpRequest) {
                        alert(XMLHttpRequest.status + ': ' + XMLHttpRequest.responseText);
                    }
                }
            },
            'types': { default: 'glyphicon glyphicon-folder-open', folder: 'glyphicon glyphicon-folder-open'},
            'language': 'mn'
        });
    }
    
    return {
        // main function to initiate the module
        init: function() {
            demo1();
        }
    };
}();