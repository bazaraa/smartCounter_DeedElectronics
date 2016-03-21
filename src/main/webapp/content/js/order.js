var OrderForm = function() {

    var handleOrderForm= function(elem) {
    	
        $.validator.addMethod(
    	        "regex",
    	        function(value, element, regexp) {
    	            var re = new RegExp(regexp);
    	            return this.optional(element) || re.test(value);
    	        },
    	        "Оруулсан утгаа шалгана уу."
    	);
        var isCremate = true;
    	var st = $("#orderServiceTypeID").val();
    	if(elem != null && ($(elem).val() == "cremetorRight" || $(elem).val() == "cremetorLeft")) {
    		isCremate = false;
    		$("#removeablespanid").remove();
    		$('#order-form').validate({
			   onsubmit : false
			});
    	}
    	else {
    		$("#removeablespanid").remove();
    		$("#intermentplacelabelid").append('<span class="required" id="removeablespanid"> * </span>');
    	}
        $('#order-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
            	"order.orderServiceType":{
            		required: true
            	},
            	"order.client.regNumber": {
            		required: true,
            		regex: /^[а-я-өёүa-z-]{2}[0-9]{8,}/
            	},
            	"order.client.familyName": {
            		required: true,
            		regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
            	},
                "order.client.lname": {
                	required: true,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
                },
                "order.client.fname": {
                	required: true,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
                },
                "order.client.citizenship": {
                	required: true
                },
                "order.client.address": {
                	required: true
                },
                "order.client.cemeteryType": {
                	required: true
                },
                "order.intermentPlace": {
                	required: isCremate
                },
                "order.orderCustomers[0].lastName": {
                	required: true,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
                },
                "order.orderCustomers[0].firstName": {
                	required: true,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
                },
                "order.orderCustomers[0].registerNumber": {
                	required: true,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]{2}[0-9]{8,}/
                },
                "order.orderCustomers[0].phone1": {
                	required: true,
                	regex: /[0-9]{6,}/,
                },
                "order.orderCustomers[0].phone2": {
                	required: false,
                	regex: /[0-9]{6,}/,
                },
                "order.orderCustomers[1].lastName": {
                	required: false,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
                },
                "order.orderCustomers[1].firstName": {
                	required: false,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
                },
                "order.orderCustomers[1].registerNumber": {
                	required: false,
                	regex: /^[а-яА-ЯөӨүЁёҮa-zA-Z]{2}[0-9]{8,}/
                },
                "order.orderCustomers[1].phone1": {
                	required: false,
                	regex: /[0-9]{6,}/,
                },
                "order.orderCustomers[1].phone2": {
                	required: false,
                	regex: /[0-9]{6,}/,
                },
                "order.orderCustomers[2].lastName": {
                	required: false,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
                },
                "order.orderCustomers[2].firstName": {
                	required: false,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]/,
                },
                "order.orderCustomers[2].registerNumber": {
                	required: false,
                	regex: /^[а-яА-ЯөӨЁёүҮa-zA-Z]{2}[0-9]{8,}/
                },
                "order.orderCustomers[2].phone1": {
                	required: false,
                	regex: /[0-9]{6,}/,
                },
                "order.orderCustomers[2].phone2": {
                	required: false,
                	regex: /[0-9]{6,}/,
                },
                "order.orderExecDate": {
                	required: true,
                }
            },
            messages: {
            	"order.orderServiceType":{
            		required: "Үйлчилгээний төрлөө сонгоно уу!"
            	},
            	"order.client.regNumber": {
            		required: "Регистрийн дугаар оруулна уу!",
            		regex: "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
            	},
            	"order.client.familyName": {
            		required: "Ургийн овог оруулна уу!",
            		regex: "Ургийн овогт тоо орсон байна."
            	},
                "order.client.lname": {
                	required: "Овог оруулна уу!",
            		regex: "Овгийн нэрэнд тоо орсон байна."
                },
                "order.client.fname": {
                	required: "Бурхан болоочийн нэрийг оруулна уу!",
            		regex: "Тоо орсон байна."
                },
                "order.client.citizenship": {
                	required: "Бурхан болоочийн иргэншлийг сонгоно уу!"
                },
                "order.client.address": {
                	required: "Хаяг оруулна уу!"
                },
                "order.client.cemeteryType": {
                	required: "Оршуулах хэлбэрээ сонгоно уу!"
                },
                "order.intermentPlace": {
                		required: "Нутаглуулах газраа сонгоно уу!",
                },
                "order.orderCustomers[0].lastName": {
                	required: "Захиалагчийн овгийг оруулна уу",
                	regex: "Захиалагчийн овгийн нэрэнд тоо орсон байна.",
                },
                "order.orderCustomers[0].firstName": {
                	required: "Захиалагчийн нэрийг оруулна уу",
                	regex: "Захиалагчийн нэрэнд тоо орсон байна",
                },
                "order.orderCustomers[0].registerNumber": {
                	required: "Захиалагчийн регистрийн дугаарыг оруулна уу",
                	regex: "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
                },
                "order.orderCustomers[0].phone1": {
                	required: "Захиалагчийн утасны дугаарыг оруулна уу",
                	regex: "Утасны дугаар хамгийн багадаа 6 оронтой тоо байна",
                },
                "order.orderCustomers[0].phone2": {
                	regex: "Утасны дугаар хамгийн багадаа 6 оронтой тоо байна",
                },
                "order.orderCustomers[1].lastName": {
                	regex: "Захиалагчийн овгийн нэрэнд тоо орсон байна.",
                },
                "order.orderCustomers[1].firstName": {
                	regex: "Захиалагчийн нэрэнд тоо орсон байна",
                },
                "order.orderCustomers[1].registerNumber": {
                	regex: "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
                },
                "order.orderCustomers[1].phone1": {
                	regex: "Утасны дугаар хамгийн багадаа 6 оронтой тоо байна",
                },
                "order.orderCustomers[1].phone2": {
                	regex: "Утасны дугаар хамгийн багадаа 6 оронтой тоо байна",
                },
                "order.orderCustomers[1].email": {
                	regex: "имэйл хаяг 'email@domain.mn' загвартай байна.",
                },
                "order.orderCustomers[2].lastName": {
                	regex: "Захиалагчийн овгийн нэрэнд тоо орсон байна.",
                },
                "order.orderCustomers[2].firstName": {
                	regex: "Захиалагчийн нэрэнд тоо орсон байна",
                },
                "order.orderCustomers[2].registerNumber": {
                	regex: "Регистерийн дугаар 'AA12345678' гэсэн форматтай байна"
                },
                "order.orderCustomers[2].phone1": {
                	regex: "Утасны дугаар хамгийн багадаа 6 оронтой тоо байна",
                },
                "order.orderCustomers[2].phone2": {
                	regex: "Утасны дугаар хамгийн багадаа 6 оронтой тоо байна",
                },
                "order.orderCustomers[2].email": {
                	regex: "имэйл хаяг 'email@domain.mn' загвартай байна.",
                },
                "order.orderExecDate": {
                	required: "Гүйцэтгэх огноо оруулна уу!"
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
            	element.parent().find(".help-block").remove();
                error.insertAfter(element);
            },

            submitHandler: function(form) {
                form.submit();
            }
        });
       
        $('#orderIntermentPlace').rules('add', {
                required: isCremate
        });
        $('#order-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#order-form').validate().form()) {
                    $('#order-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        
        $("#formReset").click(function() {
        	$('#client-form')[0].reset();
        });
    }
    var enableField = function(elem, fieldids)
    {
    	if($(elem).is(":checked"))
    	{
    		$.each(fieldids, function(k, v){
    			$("#"+v).prop("readonly", false)
    		});
    	}
    	else {
    		$.each(fieldids, function(k, v){
    			$("#"+v).prop("readonly", true)
    		});
    	}
    }
    return {
        //main function to initiate the module
    	rehandleOrderForm: handleOrderForm,
        init: function() {
        		
			$("#ordClientBirthDate").change(function(){
				if($("#ordClientDeathDate").val() != ''){
					calcClientAge();
				}
			});
			
			$("#ordClientDeathDate").change(function(){
				if($("#ordClientBirthDate").val() != ''){
					calcClientAge();
				}
			});
			
        	$("#orderServiceTypeID").change(function() {
        		var me = $(this);
        		var selectedVal = me.find("option:selected").val();
        		var intermentPlace = $("#orderIntermentPlace");
        		
        		
        		switch(selectedVal)
        		{
        		case "cremetorRight":
        			intermentPlace.val("baruunBTTS");
        			break;
        		case "cemeteryRight":
        			intermentPlace.val("memorialGarden");
        			break;
        		case "cremetorLeft":
        			intermentPlace.val("ZuunBTTS");
        			break;
        		case "cemeteryLeft":
        			intermentPlace.val("heavenGarden");
        			break;
        		default:
        			intermentPlace.val("");
        			break;
        		}
        		
        	});
        	
        	
        	
        	
        	
        	handleOrderForm($("#orderServiceTypeID"));
        	$("#ordercustomers_editable_1").dataTable({
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
    				'targets' : [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
    			}, {
    				"searchable" : false,
    				"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
    			}, {
    				"targets": 0,
                    "visible": false,
    			}]
    		});
        },
        enableField: enableField
    };
}();
$(document).ready(
				function() {
					fvsS(['reserved', 'commited', 'canceled'], 'orderContentMainTabID', 'orderStatusID');
					fvsS(['reserved', 'commited', 'canceled'], 'pnlorderstatusid', 'orderStatusID');
					fvsS(['reserved', 'commited', 'canceled'], 'pnlbuttonid', 'orderStatusID');
					
				    $("#orderStatusID").removeAttr("disabled");
				    $("#pnlbuttonid").find("button").removeAttr("disabled");
					var constOthers = [ 'religionValue_ID', 'deathPlaceValue_ID', 'deathTypeValue_ID' ];
					var fillKeyFields = [ 'clientCode_ID', 'clientRegNumber_ID' ];
					
					$('#order-form').on('submit', function() {
						var awards = "";
						$.each($("div#awardsContainerDiv input:checked"), function(idx, val) {
							awards =awards + val.id+ ";";
						});
						$.each($("#awardsotherid").val().split(/[,;]+/), function(idx, val) {
							if(val != "") {
								awards = awards + val + ";";
							}
						});
						awards = awards.slice(0, -1);
						$("#clientAwardsID").val(awards);
						//if($("#orderServiceTypeIDhidden").val() != "" && $("#orderServiceTypeIDhidden").val() == "specialDocument") {
							//if(($("#orderEndNumber").val() == "0" && $("#orderBegNumber").val() == "0") || ($("#orderEndNumber").val() == "" && $("#orderBegNumber").val() == "")) {
								//CRSWebUtils.showAlert("danger","warning","Онцгойлох бичгийн эхлэх болон төгсгөлийн дугаарыг орууна уу!",0);
								//return false;
							//}
						//}
					});
					
					var awards = $("#clientAwardsID").val();
					var tmpawards = awards.split(';');
					awards += ";";
					$.each(tmpawards, function(idx, val) {
						var elem = $("#"+$.trim(val)); 
						if(elem != undefined && elem != null && elem.length > 0) {
							elem.prop('checked', true).parent().addClass("checked");
							awards = awards.replace(val+";", "");
						}
					});
					awards = awards.slice(0, -1);
					$("#awardsotherid").val(awards);
					$.each(constOthers, function(index, value) {
						if ($("#" + value).val() == "other") {
							$("#" + value + "_Reason").hide();
							$("#" + value + "_Other").show();
						} else if ($("#" + value).val() == "illness") {
							$("#" + value + "_Reason").show();
							$("#" + value + "_Other").hide();
						} else if($("#" + value).val() == "hospital") {
							$("#" + value + "_Hospital").show();
							$("#" + value + "_Other").hide();
						}
						else {
							$("#" + value + "_Other").hide();
							$("#" + value + "_Reason").hide();
						}
					});
					switch($("#orderIntermentPlace").val())
					{
						case "hodoo":
							$("#intermentPlaceCountrySideID").show();
							$("#intermentPlaceValue_ID_Other").hide();
							break;
						case "other":
							$("#intermentPlaceCountrySideID").hide();
							$("#intermentPlaceValue_ID_Other").show();
							break;
						default:
							$("#intermentPlaceCountrySideID").hide();
							$("#intermentPlaceValue_ID_Other").hide();
							break;
					}
					if($("#orderIntermentPlace").val() == "") {
						
					}
					
					var orderid = $("#orderid").val();
					if (orderid == null || orderid == '') {
						$('#orderServiceTypeID').prop("disabled", false);
					}
					//OrderForm.rehandleOrderForm($("#orderServiceTypeID"));
				});
function showOrHide(element) {
	if(element.name == "order.intermentPlace") {
		switch(element.value)
		{
			case "hodoo":
				$("#intermentPlaceCountrySideID").show();
				$("#intermentPlaceValue_ID_Other").hide();
				break;
			case "other":
				$("#intermentPlaceValue_ID_Other").show();
				$("#intermentPlaceCountrySideID").hide();
				break;
			default:
				$("#intermentPlaceCountrySideID").hide();
				$("#intermentPlaceValue_ID_Other").hide();
				break;
		}
	}
	else {
		var elemid = $(element).attr("id");
		if ($(element).val() == 'other') {
			$("#" + elemid + "_Other").show();
			$("#" + elemid + "_Reason").hide();
			$("#" + elemid + "_Hospital").hide();
		} else if ($("#" + elemid).val() == "illness") {
			$("#" + elemid + "_Reason").show();
			$("#" + elemid + "_Other").hide();
			$("#" + elemid + "_Hospital").hide();
		} else if($("#" + elemid).val() == "hospital") {
			$("#" + elemid + "_Hospital").show();
			$("#" + elemid + "_Other").hide();
			$("#" + elemid + "_Reason").hide();
		}
		else {
			$("#" + elemid + "_Other").hide();
			$("#" + elemid + "_Reason").hide();
			$("#" + elemid + "_Hospital").hide();
		}
	}
}

function fillClientForm(element) {
	var val = '';
	val = $(element).val();
	var csrf = $("#__csrf__").val();
	var param = {};
	param._csrf = csrf;
	param.regNumber = val;
	if (val != null && val != "") {
		$
				.ajax({
					type : "POST",
					url : "/order/findbyvalue",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("*[name^='order.client.']").each(
											function(e, v) {
												var lpName = v.name.split(".");
												if (lpName.length > 1 && result.data[lpName[2]] != undefined) {
													if (v.type == 'radio') {
														if (result.data[lpName[2]].toString() == "0") {
															$('#clientgenderfemaleid').prop('checked', true).parent().addClass("checked");
															$('#clientgendermaleid').prop('checked', false).parent().removeClass("checked");
														} else {
															$('#clientgendermaleid').prop('checked', true).parent().addClass("checked");
															$('#clientgenderfemaleid').prop('checked', false).parent().removeClass("checked");
														}
													} else {
														$(this).val(result.data[lpName[2]]);
													}
													if (result.data.age == null) {
														if(result.data.deathDate != null && result.data.deathDate != '' && result.data.birthDate != null && result.data.birthDate != '')
														{
															death = new Date(result.data.deathDate.replace(/\./g, '\/')).getFullYear();
															birth = new Date(result.data.birthDate.replace(/\./g, '\/')).getFullYear();
															$("#clientage").val(death - birth);
														}
													} else {
														$("#clientage").val(result.data.age);
													}
												}
											});
							$("#cmbMonk").val(result.data.monkId);
							$("#cmbMonastery").val(result.data.monasteryId);
						}else{
							alert('Таны хайсан регистерийн дугаар бүртгэлгүй байна!');
							$("*[name^='order.client.']").each(
									function(e, v) {
										v.value = '';
									});
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
	}
}

function getSpecialDocs(element) {
	val = $(element).val();
	var csrf = $("#__csrf__").val();
	var param = {};
	param._csrf = csrf;
	param.documentCount = val;
	$.ajax({
		type : "POST",
		url : "/order/getspecialdocs",
		async : false,
		dataType : "json",
		data : param,
		success : function(result) {
			if (result.success == true) {
				$("#orderEndNumber").val(result.data[1]);
				$("#orderBegNumber").val(result.data[0]);
			}
		},
		error : function(e, a) {
			alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
		}
	});
}

function setItsValue(elem) {
	$("#orderServiceTypeIDhidden").val($("#orderServiceTypeID").val());
	OrderForm.rehandleOrderForm(elem);
	if($(elem).val() != "cremetorLeft" && $(elem).val() != "cremetorRight")
	{
		$("#removeablespanid").remove();
		$('#orderIntermentPlace').rules('add', {
                required: true
        });
		$("#intermentplacelabelid").append('<span class="required" id="removeablespanid"> * </span>');
	}
	else {
		$("#removeablespanid").remove();
		$('#orderIntermentPlace').rules('add', {
                required: false
        });
	}
}


function calcClientAge(){
	var deathDate = $("#ordClientDeathDate").val();
		var arr = deathDate.split(".");
		var death = arr[0];
		var deathYear = parseInt(death);
		var deathMonth = parseInt(arr[1]);
		var deathDay = parseInt(arr[2]);
		
		var birthDate = $("#ordClientBirthDate").val();
		var arr1 = birthDate.split(".");
		var birth = arr1[0];
		var birthYear = parseInt(birth);
		var birthMonth = parseInt(arr1[1]);
		var birthDay = parseInt(arr1[2]);
		
		var yeardiff = deathYear - birthYear;
		var monthdiff = deathMonth - birthMonth;
		if(yeardiff == 0)
		{
			if(monthdiff == 0)
				$("#clientage").val((deathDay - birthDay) + " өдөр");
			else
				$("#clientage").val(monthdiff + " сар");
		}else {
			if(yeardiff == 1)
			{
				monthdiff = 12 - (birthMonth - deathMonth);
				if(monthdiff > 0)
					$("#clientage").val(monthdiff + " сар");
					
			}else $("#clientage").val(yeardiff);
		}
}