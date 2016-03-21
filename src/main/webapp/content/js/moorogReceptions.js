var moorogReceptionsTableEditable = function() {

	var handleTable = function() {

		var table = $('#moorogReceptions_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"bPaginate" : false,
			"bFilter" : true,
			"bInfo" : false,
			"columnDefs" : [ { 
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

		var tableWrapper = $("#moorogReceptions_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		}); 

		var nNew = false;		

		table.on('click','.delete',function(e) {
					e.preventDefault();

					var nRow = $(this).parents('tr')[0];
					var rowData = $(this).parents('table').DataTable()
							.row(nRow).data();
					var jqInputs = $('input', nRow);
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
									
									var moorogid =  param.id;
									
									$
											.ajax({
												type : "GET",
												url : "/morogReception/delete/"+ moorogid,
												async : false,
												dataType : "json",
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

	var findRegisterNumber = function(){
		
		$("#gRegisterID").change(function(){
			
			if($(this).val().match(/^[а-яА-ЯөӨүҮ]{2}[0-9]{8,}/)) {
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.registerNumber = $("#gRegisterID").val();
				$.ajax({
					type : "GET",
					url : "/morogReception/find/",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if(result.data){
							$("#gLastNameID").val(result.data.gLastName);
							$("#gFirstNameID").val(result.data.gFirstname);
							$("#gAgeID").val(result.data.gAge);
							if(result.data.gGender == 1){
								$('#gGenderIDOne').prop('checked',true).parent().addClass("checked");
								$('#gGenderIDZero').prop('checked',false).parent().removeClass("checked");
							}else{
								$('#gGenderIDOne').prop('checked',false).parent().addClass("checked");
								$('#gGenderIDZero').prop('checked',true).parent().removeClass("checked");
							}
							$("#registerNumberIsAliveID").val(true);
						}
					},
					error : function() {
						CRSWebUtils.showAlert("danger", "warning", "Алдаа үүслээ", 0);
						$("#registerNumberIsAliveID").val(false);
					}
				});
			}else{
				CRSWebUtils.showAlert("info", "info", "Тухайн регистерийн дугаар бүртгэлгүй байна.", 10);
				$("#registerNumberIsAliveID").val(false);
			}
		});
		
		
	}
	return {
		init : function() {
			handleTable();
			findRegisterNumber();
			
			$("#moorogId").change(function(){
				
				var param = {};
				param.id = $("#moorogId").val();
				
				$.ajax({
					type : "GET",
					url : "/morogReception/fridge",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$('#fridgeNumber').html('<option value="">Сонгох</option>');
							
							for ( var item in result.data) {
								$('#fridgeNumber').append('<option value="'+result.data[item].code+'">'+result.data[item].name+'</option>');
							}
						} else {
							CRSWebUtils.showAlert("danger", "warning",
									result.message, 0);
						}
					},
					error : function() {
						CRSWebUtils
								.showAlert(
										"danger",
										"warning",
										"Хөргөгч олдсонгүй. Дахин оролдоно уу.",
										0);
					}
				});
				
				
			});
			
			$("#dateTimeEnd").change(function(){
				if($("#mTuluw").val() === "temp"){
					
					var a = Date.daysBetween(new Date($("#dateTimeChangedID").val()), new Date());
					$("#savedDateID").val(a);
					if(a > 0){
					var totalAmount = a * $("#mhonogTulbur").val();
					$("#totalMoneyId").val(totalAmount);
					}else{
						CRSWebUtils
						.showAlert(
								"info",
								"warning",
								"Таны сонгосон хоног өнөөдөрөөс хойшох өдрүүд байна.",
								5);
					}
				}
				
			});
			
			if($("#moorogRecepId").val() !== ''){
				$('#mTuluw')
		        .attr('disabled', true);
			}
			
			$("#mTuluw").ready(function(){
				if($("#mTuluw").val() == "temp"){
					$("#mHonog").show();
					$("#mNiitTulbur").show();
					$("#mhonogTulburShow").show();
				}
				if($("#mTuluw").val() == "serviced"){
					$("#mHonog").hide();
					$("#mNiitTulbur").hide();
					$("#mhonogTulburShow").hide();
				}
			});

			
			$("#mTuluw").change(function(){
				
				if($("#mTuluw").val() == "temp"){
					$("#mHonog").show();
					$("#mNiitTulbur").show();
					$("#mhonogTulburShow").show();
					if($("#dateTimeChangedID").val() !== ''){
					var honog = Date.daysBetween(new Date($("#dateTimeChangedID").val()), new Date());
					$("#savedDateID").val(honog);
					if(honog > 0){
						var totalAmount = honog * $("#mhonogTulbur").val();
						$("#totalMoneyId").val(totalAmount);
					}else{
						CRSWebUtils
						.showAlert(
								"info",
								"warning",
								"Таны сонгосон хоног өнөөдөрөөс хойшох өдрүүд байна.",
								5);
					}
					
					}else{
						CRSWebUtils
						.showAlert(
								"info",
								"warning",
								"Та хоногоо сонгосноор хоногын бодох болно.",
								5);
					}
				}
				if($("#mTuluw").val() == "serviced"){
					$("#mHonog").hide();
					$("#mNiitTulbur").hide();
					$("#mhonogTulburShow").hide();
				}
				
			});
		}
	};

}();

Date.daysBetween = function( date1, date2 ) {
	  //Get 1 day in milliseconds
	  var one_day=1000*60*60*24;

	  // Convert both dates to milliseconds
	  var date1_ms = date1.getTime();
	  var date2_ms = date2.getTime();

	  // Calculate the difference in milliseconds
	  var difference_ms = date2_ms - date1_ms;
	    
	  // Convert back to days and return
		  return Math.round(difference_ms/one_day);
}

var moorogReceptionForm = function() {

	var handleReceptionForm = function() {
		$('#moorogReception-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				moorog : {
					required : true
				},
				MoorogNumber : {
					required : true
				},
				gLastName : {
					required : true
				},
				gFirstname : {
					required : true
				},
				gAge : {
					required : true
				},
				Lastname : {
					required : true
				},
				Firstname : {
					required : true
				},
				from : {
					required : true
				},
				carNumber : {
					required : true
				},
				registerNumber : {
					required : true
				},
				date : {
					required : true
				}
			},

			messages : {
				moorog : {
					required : "Моорог сонгоно уу."
				},
				MoorogNumber : {
					required : "Хөргөгчны дугаарыг сонгоно уу."
				},
				gLastName : {
					required : "Бурхан болоочын овог оруулна уу."
				},
				gFirstname : {
					required : "Бурхан болоочын нэр оруулна уу."
				},
				gAge : {
					required : "Бурхан болоочын нас оруулна уу."
				},
				Lastname : {
					required : "Хүргэж ирсэн хүний овог оруулна уу."
				},
				Firstname : {
					required : "Хүргэж ирсэн хүний нэр оруулна уу."
				},
				from : {
					required : "Хаанас ирсэнээ оруулна уу."
				},
				carNumber : {
					required : "Хүргэж ирсэн машин оруулна уу."
				},
				registerNumber : {
					required : "Хүргэж ирсэн хүний регистерийн дугаар."
				},
				date : {
					required : "Хүлээн авсан огноо."
				}
			},

			invalidHandler : function(event, validator) { // display error
															// alert on form
															// submit

			},

			highlight : function(element) { // hightlight error inputs
				$(element).closest('.form-group').addClass('has-error'); // set
																			// error
																			// class
																			// to
																			// the
																			// control
																			// group
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},

			errorPlacement : function(error, element) {
				if (element.closest('.input-icon').size() === 1) {
					error.insertAfter(element.closest('.input-icon'));
				} else {
					error.insertAfter(element);
				}
			},

			submitHandler : function(form) {
				if($("#registerNumberIsAliveID").val() === ""){
					form.submit();
				}
				if($("#registerNumberIsAliveID").val() === "true"){
					if($("#mTuluw").val() === "temp"){
						CRSWebUtils
						.showAlert(
								"info",
								"warning",
								"Таны регистерийн дугаар бүртгэлтэй тул та тухайн төлөв дээр бүртгэх боломжгүй.",
								15);
						return false;
					}else{
						form.submit();
					}
				}
				if($("#registerNumberIsAliveID").val() === "false"){
					if($("#mTuluw").val() === "serviced"){
						CRSWebUtils
						.showAlert(
								"info",
								"warning",
								"Таны регистерийн дугаар бүртгэлгүй тул тухайн төлөвт бүртгэх боломжгүй.",
								15);
						return false;
					}else{
						if($('#savedDateID').val() <= 0){
							CRSWebUtils
							.showAlert(
									"info",
									"warning",
									"Таны сонгосон хоног өнөөдөрөөс хойших өдрүүд байна та хугацааагаа харна уу.",
									15);
							return false;
						}else{
							form.submit();
						}
					}
				}
			}
		});

		
		$("#dateTimeEnd").datetimepicker({
	            autoclose: true,
	            isRTL: false,
	            format: "yyyy.mm.dd hh:ii",
	            pickerPosition: "bottom-left"
	   });
		
//		$('#car-form input').keypress(function(e) {
//			if (e.which == 13) {
//				if ($('#car-form').validate().form()) {
//					$('#car-form').submit(); // form validation success, call
//												// ajax form submit
//				}
//				return false;
//			}
//		});

//		$("#formReset").click(function() {
//			$('#car-form')[0].reset();
//		});

	}

	return {
		// main function to initiate the module
		init : function() {

			handleReceptionForm();
		}

	};

}();
