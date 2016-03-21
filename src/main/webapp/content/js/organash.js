var organAshForm = function() {

    var handlePreOrderForm= function() {
    	
    	$.validator.addMethod(
    	        "regex",
    	        function(value, element, regexp) {
    	            var re = new RegExp(regexp);
    	            return this.optional(element) || re.test(value);
    	        },
    	        "Оруулсан утгаа шалгана уу."
    	);
    	
        $('#organash-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                "organAshExecDate": {
                    required: true
                },
                "serviceType": {
                	required: true
                },
                "client.familyName": {
                	required: true,
                	regex: /^[а-яА-яЯөӨёЁүҮa-zA-Z]/
                },
                "client.lname": {
                	required: true,
                	regex: /^[а-яА-яЯөӨёЁүҮa-zA-Z]/
                },
                "client.fname": {
                	required: true,
                	regex: /^[а-яА-яЯөӨёЁүҮa-zA-Z]/
                },
                "client.citizenship": {
                	required: true
                },
                "client.regNumber": {
                	required: true,
                	regex: /^[а-яА-ЯөӨёЁүҮ]{2}[0-9]{8,}/
                },
                "client.address": {
                	required: true
                },
                "orderCustomer[0].lastName": {
                	required: true,
                	regex: /^[а-яА-яЯөӨёЁүҮa-zA-Z]/
                },
                "orderCustomer[0].firstName": {
                	required: true,
                	regex: /^[а-яА-ЯөӨүёЁҮa-zA-Z]/,
                },
                "orderCustomer[0].registerNumber": {
                	required: true,
                	regex: /^[а-яА-ЯөӨёЁүҮ]{2}[0-9]{8,}/,
                },
                "orderCustomer[0].relation": {
                	required: true
                },
                "orderCustomer[0].phone1": {
                	required: true,
                	regex: /^[0-9]{8,}/,
                },
                "orderCustomer[0].phone2": {
                	regex: /^[0-9]{8,}/,
                }
            },

            messages: {
                "organAshExecDate": {
                    required: "Гүйцэтгэх огноо оруулна уу."
                },
                "serviceType": {
                	required: "Үйлчилгээний төрөл сонгоно уу."
                },
                "client.familyName": {
                	required: "Ургийн овог оруулна уу.",
                    regex: "Ургийн овог дунд тоо оруулхыг хориглоно"
                },
                "client.lname": {
                	required: "Овог оруулна уу.",
                    regex: "Хүний овог дунд тоо оруулхыг хориглоно"
                },
                "client.fname": {
                	required: "Нэр оруулна уу.",
                    regex: "Хүний нэр дунд тоо оруулхыг хориглоно"
                },
                "client.citizenship": {
                	required: "Иргэншил сонгоно уу."
                },
                "client.regNumber": {
                	required: "Регистрийн дугаар оруулна уу.",
                	regex: "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
                },
                "client.address": {
                	required: "Гэрийн хаяг оруулна уу."
                },
                "client.address": {
                	required: "Гэрийн хаяг оруулна уу."
                },
                "orderCustomer[0].lastName": {
                	required: "Холбоо барих хүний овог оруулна уу.",
                    regex: "Хүний овог дунд тоо оруулхыг хориглоно"
                },
                "orderCustomer[0].firstName": {
                	required: "Холбоо барих хүний нэр оруулна уу.",
                    regex: "Хүний нэр дунд тоо оруулхыг хориглоно"
                },
                "orderCustomer[0].registerNumber": {
                	required: "Холбоо барих хүний регистерийн дугаар оруулна уу.",
                    regex: "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
                },
                "orderCustomer[0].relation": {
                	required: "Холбоо хамаарал сонгоно уу."
                },
                "orderCustomer[0].phone1": {
                	required: "Холбоо барих хүний утасны дугаар оруулна уу.",
                    regex: "Утасны дугаар зөвхөн тоо байна."
                },
                "orderCustomer[0].phone2": {
                    regex: "Утасны дугаар зөвхөн тоо байна."
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
        
        $('#organash-form input').keypress(function(e) {
            if (e.which == 1) {
                if ($('#organash-form').validate().form()) {
                    $('#organash-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        
        $("#formReset").click(function() {
        	$('#organash-form')[0].reset();
        });
        
        $("#regNumber").change(function() {	
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.regNumber = $("#regNumber").val();
			$.ajax({
				type : "POST",
				url : "/organash/getclient",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#clientid").val(result.data.id);
						$("#clientcode").val(result.data.code);
						$("#clientfamily").val(result.data.familyName);
						$("#clientlname").val(result.data.lname);
						$("#clientfname").val(result.data.fname);
						$("#clientcitizenship option[value="+ result.data.citizenship +"]").prop('selected', true);
						$("#clientnationality").val(result.data.nationality);
						$("#clientaddress").val(result.data.address);
						$("#clientbirthplace").val(result.data.birthPlace);
						$("#clientbirthdate").val(getDateString(new Date(result.data.birthDate)));
						$("#clientzodiac option[value="+ result.data.zodiac +"]").prop('selected', true);
						$("#clientreligion option[value="+ result.data.religion +"]").prop('selected', true);
						$("#clienteducation option[value="+ result.data.education +"]").prop('selected', true);
						$("#clientjobspot").val(result.data.jobSpot);	
						
						if(result.data.gender == 1) {
							$('#clientmale').prop('checked',true).parent().addClass("checked");
							$('#clientfemale').prop('checked',false).parent().removeClass("checked");
						} else {
							$('#clientfemale').prop('checked',true).parent().addClass("checked");
							$('#clientmale').prop('checked',false).parent().removeClass("checked");
						}
						
					} else { // үгүй бол цэвэрлэнэ.
						$("#clientid").val(null);
						$("#clientcode").val("");
						$("#clientfamily").val("");
						$("#clientlname").val("");
						$("#clientfname").val("");
						$("#clientcitizenship option").prop('selected', false);
						$("#clientnationality").val("");
						$("#clientaddress").val("");
						$("#clientbirthplace").val("");
						$("#clientbirthdate").val("");
						$("#clientzodiac option").prop('selected', false);
						$("#clientreligion option").prop('selected', false);
						$("#clienteducation option").prop('selected', false);
						$("#clientjobspot").val("");
							
						$('#clientmale').prop('checked',true).parent().addClass("checked");
						$('#clientfemale').prop('checked',false).parent().removeClass("checked");
						
					}
				},
				error : function() {
					//CRSWebUtils.showAlert("danger", "warning", "Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
		});
    }

    return {
        //main function to initiate the module
        init: function() {
        	handlePreOrderForm();
        	$("#organashcustomers_editable_1").dataTable({
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
    				'targets' : [ 0, 1, 2, 3, 4, 5, 6 ]
    			}, {
    				"searchable" : false,
    				"targets" : [ 0, 1, 2, 3, 4, 5, 6 ]
    			}, {
    				"targets": 0,
                    "visible": false,
    			}]
    		});
        }
    };
}();

$(document).ready(function () {
	if($('.cusid').val() != null){
		for(var i = 0 ; i <= 2; i++){
			$('.cusid')[i].name = "orderCustomer[" + i + "].id";
			$('.cuslastName')[i].name = "orderCustomer[" + i + "].lastName";
			$('.cusfirstName')[i].name = "orderCustomer[" + i + "].firstName";
			$('.cusregisterNumber')[i].name = "orderCustomer[" + i + "].registerNumber";
			$('.cusrelation')[i].name = "orderCustomer[" + i + "].relation";
			$('.cusphone1')[i].name = "orderCustomer[" + i + "].phone1";
			$('.cusphone2')[i].name = "orderCustomer[" + i + "].phone2";
		}
	} else { }
		
});

function getDateString(date) {
	
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString(); 
	var dd  = date.getDate().toString();
	
	return yyyy + "." + (mm[1]?mm:"0"+mm[0]) + "." +(dd[1]?dd:"0"+dd[0]);
};

function familyPreperation() {
	window
			.open(
					"/organash/document/familypreperation",
					"_blank",
					"type=fullWindow, fullscreen, scrollbars=yes, toolbar=yes, scrollbars=yes, resizable=yes");
}

function serviceToRate() {
	window
			.open(
					"/organash/document/servicetorate",
					"_blank",
					"type=fullWindow, fullscreen, scrollbars=yes, toolbar=yes, scrollbars=yes, resizable=yes");
}