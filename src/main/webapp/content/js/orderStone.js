var orderStones = function() {

	var handleTable = function() {

		$('#orderStone-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				statue : {
					required : true
				}
//				lastName : {
//					required : true
//				},
//				firstName : {
//					required : true
//				}
//				addword : {
//					required : true
//				},
//				"approve.fullName" :{
//					required : true
//				},
//				"approve.phone" :{
//					required : true
//				},
//				"approve.relation" :{
//					required : true
//				},
//				"recipient.fullName" :{
//					required : true
//				},
//				"recipient.phone" :{
//					required : true
//				},
//				"recipient.relation" :{
//					required : true
//				},
//				takePlace : {
//					required : true
//				},
//				recipientSignImage :{
//					required : true
//				},
//				takeDate : {
//					required : true
//				},
//				"recipient.takeDate" : {
//					required : true
//				}
			},

			messages : {
				statue : {
					required : "Хөшөөний кодоо сонгоно уу!"
				}
//				lastName : {
//					required : "Овог оруулна уу!"
//				},
//				firstName : {
//					required : "Нэр оруулна уу!"
//				}
//				addword : {
//					required : "Нэмэлт үг оруулна уу!"
//				},
//				"approve.fullName" :{
//					required : "Баталгаажуулагчийн нэрийг оруулна уу"
//				},
//				"approve.phone" :{
//					required : "Баталгаажуулагчийн утасны дугаарыг оруулна уу"
//				},
//				"approve.relation" :{
//					required : "Баталгаажуулагчийн холбоо хамаарал оруулна уу"
//				},
//				"recipient.fullName" :{
//					required : "Хүлээн авсан хүний нэрийг оруулна уу"
//				},
//				"recipient.phone" :{
//					required : "Хүлээн авсан хүний утасны дугаарыг оруулна уу"
//				},
//				"recipient.relation" :{
//					required : "Хүлээн авсан хүний холбоо хамаарал оруулна уу"
//				},
//				takePlace : {
//					required : "Авах газар сонгоно уу"
//				},
//				recipientSignImage : {
//					required : "Хүлээн авсан хүний гарын үсэг хоосон байна."
//				},
//				takeDate : {
//					required : "Авах онгоо, цагыг оруулж өгнө үү"
//				},
//				"recipient.takeDate" : {
//					required : "Авах огноо, цагийг оруулж өгнө үү"
//				}
			},

			invalidHandler : function(event, validator) { // display error
				// alert on form
				// submit

			},

			highlight : function(element) { // hightlight error inputs
				$(element).closest('.form-group').addClass('has-error'); // set
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
				// form.submit();
				document.getElementById("addition").disabled = false;
				if ($('#orderStone-form').validate().form()) {
					//	                    
					var xyFirstname = $('#hidFirstname').val();
					// $('#orderStone-form').submit(); //form validation
					// success, call ajax form submit
					var splitted = xyFirstname.split(",");
					var xFirstname = splitted[0];
					var yFirstname = splitted[1];

					var xyLastname = $('#hidLastname').val();
					// $('#orderStone-form').submit(); //form validation
					// success, call ajax form submit
					var splitted = xyLastname.split(",");
					var xLastname = splitted[0];
					var yLastname = splitted[1];

					var xyYear = $('#hidYear').val();
					// $('#orderStone-form').submit(); //form validation
					// success, call ajax form submit
					var splitted = xyYear.split(",");
					var xYear = splitted[0];
					var yYear = splitted[1];

					var xyAddword = $('#hidAddword').val();
					// $('#orderStone-form').submit(); //form validation
					// success, call ajax form submit
					var splitted = xyAddword.split(",");
					var xAddword = splitted[0];
					var yAddword = splitted[1];

					var elemt = $('#pzagwar').html();
					$('#templateid').val(elemt);

					var obj = {
						FirstName : {
							x : xFirstname,
							y : yFirstname
						},
						LastName : {
							x : xLastname,
							y : yLastname
						},
						Year : {
							x : xYear,
							y : yYear
						},
						Addword : {
							x : xAddword,
							y : yAddword
						}
					};
					var ObjStr = JSON.stringify(obj);
					$("#hiddenPosition").val(ObjStr);


					var orderStatusType = $("#orderStatusID").val();

					if (orderStatusType == "reserved") {
					
						if ($("#approveChangefullName").val() == "") {
							CRSWebUtils.showAlert(
								"danger",
								"warning",
								"Баталгаажуулагчийн овог нэр хоосон байна.",
								0);
							return false;
						}else if ($("#approveChangerelation").val() == "") {
							CRSWebUtils.showAlert(
								"danger",
								"warning",
								"Баталгаажуулагчийн холбоо хамааралыг оруулна уу.",
								0);
							return false;
						}else if ($("#approveChangephone").val() == "") {
							CRSWebUtils.showAlert(
								"danger",
								"warning",
								"Баталгаажуулагчийн утасыг оруулна уу.",
								0);
							return false;
						}else{
							form.submit();
						}
					}
					
					
					//					 
					form.submit();
				}

			}
		});

		$('#year').keyup(function() {

			if ($('#dyear').is(":hidden")) {
				$("#pyear").html($(this).val());
				$('#dyear').show();
			} else {
				$("#pyear").html($(this).val());
				$('#dyear').show();
			}

		});

		$('#lastName').keyup(function() {

			if ($('#dlastName').is(":hidden")) {
				$("#plastName").html($(this).val());
				$('#dlastName').show();
			} else {
				$("#plastName").html($(this).val());
				$('#dlastName').show();
			}

		});

		$('#firstName').keyup(function() {

			if ($('#dfirstName').is(":hidden")) {
				$("#pfirstName").html($(this).val());
				$('#dfirstName').show();
			} else {
				$("#pfirstName").html($(this).val());
				$('#dfirstName').show();
			}

		});

		$('#addwordid').keyup(function() {

			if ($('#dAddword').is(":hidden")) {
				$("#paddword").html($(this).val());
				$('#dAddword').show();
			} else {
				$("#paddword").html($(this).val());
				$('#dAddword').show();
			}

		});
		//
		$('#myModal').on('show.bs.modal', function(event) {			
			$("#boolImageUpload").val("true");
		});

		//
		$('#myModal').on('hidden.bs.modal', function(event) {
			$("#boolImageUpload").val("false");
		});
		
		//

		$('#pyear').mouseup(function() {

			var out = document.getElementById("pyear");
			$('#hidYear').val(out.style.left + "," + out.style.top);
		});

		$('#pfirstName').mouseup(function() {

			var out = document.getElementById("pfirstName");
			$('#hidFirstname').val(out.style.left + "," + out.style.top);
		});

		$('#plastName').mouseup(function() {
			var out = document.getElementById("plastName");
			$('#hidLastname').val(out.style.left + "," + out.style.top);
		});
		
		$('#paddword').mouseup(function() {

			var out = document.getElementById("paddword");
			$('#hidAddword').val(out.style.left + "," + out.style.top);
			
		});
		$('#logo1').click(function() {
			
			$('#imagesType').val("logo");
			
			var param = {};
			
			param.type = $("#imagesType").val();
			
			$.ajax({
				type : "GET",
				url : "/stone/pictures",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
					$("#mybodyID").html("");
						for (var x in result.data) {
								$("#mybodyID").append("<div class='col-sm-3' >" +
										"<div class='form-group'><div class='col-md-12' style='height: 100px; text-align: center;'><img src="
										+ result.data[x].signImage
												+ " style='max-height:100px; max-width:100px;'></img></div><div class='col-md-12' style='text-align: center;'><button data-picurl='"
													+ result.data[x].signImage
														+ "' id='savedPicturesUrl"
																	+ x
																		+ "' type='button' class='btn btn-primary' style='margin: auto; padding: auto;'>Сонгох</button></div></div></div>");
						}
						baba();
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.messege, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
			
		});
		$('#maaniin1').click(function() {
			$('#imagesType').val("maaniin");
			
var param = {};
			
			param.type = $("#imagesType").val();
			
			$.ajax({
				type : "GET",
				url : "/stone/pictures",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#mybodyID").html("");
						for (var x in result.data) {
							$("#mybodyID").append("<div class='col-sm-3' >" +
									"<div class='form-group'><div class='col-md-12' style='height: 100px; text-align: center;'><img src="
									+ result.data[x].signImage
											+ " style='max-height:100px; max-width:100px;'></img></div><div class='col-md-12' style='text-align: center;'><button data-picurl='"
												+ result.data[x].signImage
													+ "' id='savedPicturesUrl"
																+ x
																	+ "' type='button' class='btn btn-primary' style='margin: auto; padding: auto;'>Сонгох</button></div></div></div>");

						}
						baba();
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.messege, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
		});
		$('#narsar1').click(function() {
			$('#imagesType').val("narsar");
var param = {};
			
			param.type = $("#imagesType").val();
			
			$.ajax({
				type : "GET",
				url : "/stone/pictures",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#mybodyID").html("");
						for (var x in result.data) {
							$("#mybodyID").append("<div class='col-sm-3' >" +
									"<div class='form-group'><div class='col-md-12' style='height: 100px; text-align: center;'><img src="
									+ result.data[x].signImage
											+ " style='max-height:100px; max-width:100px;'></img></div><div class='col-md-12' style='text-align: center;'><button data-picurl='"
												+ result.data[x].signImage
													+ "' id='savedPicturesUrl"
																+ x
																	+ "' type='button' class='btn btn-primary' style='margin: auto; padding: auto;'>Сонгох</button></div></div></div>");

						}
						baba();
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.messege, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
		});
		$('#zagalmai1').click(function() {
			$('#imagesType').val("zagalmai");
var param = {};
			
			param.type = $("#imagesType").val();
			
			$.ajax({
				type : "GET",
				url : "/stone/pictures",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#mybodyID").html("");
						for (var x in result.data) {
							$("#mybodyID").append("<div class='col-sm-3' >" +
									"<div class='form-group'><div class='col-md-12' style='height: 100px; text-align: center;'><img src="
									+ result.data[x].signImage
											+ " style='max-height:100px; max-width:100px;'></img></div><div class='col-md-12' style='text-align: center;'><button data-picurl='"
												+ result.data[x].signImage
													+ "' id='savedPicturesUrl"
																+ x
																	+ "' type='button' class='btn btn-primary' style='margin: auto; padding: auto;'>Сонгох</button></div></div></div>");

						}
						baba();
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.messege, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
		});
		$('#busad1').click(function() {
			$('#imagesType').val("busad");
var param = {};
			
			param.type = $("#imagesType").val();
			
			$.ajax({
				type : "GET",
				url : "/stone/pictures",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#mybodyID").html("");
						for (var x in result.data) {
							$("#mybodyID").append("<div class='col-sm-3' >" +
									"<div class='form-group'><div class='col-md-12' style='height: 100px; text-align: center;'><img src="
									+ result.data[x].signImage
											+ " style='max-height:100px; max-width:100px;'></img></div><div class='col-md-12' style='text-align: center;'><button data-picurl='"
												+ result.data[x].signImage
													+ "' id='savedPicturesUrl"
																+ x
																	+ "' type='button' class='btn btn-primary' style='margin: auto; padding: auto;'>Сонгох</button></div></div></div>");

						}
						baba();
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.messege, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
		});
		$('#zul1').click(function() {
			$('#imagesType').val("zul");
var param = {};
			
			param.type = $("#imagesType").val();
			
			$.ajax({
				type : "GET",
				url : "/stone/pictures",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#mybodyID").html("");
						for (var x in result.data) {
							$("#mybodyID").append("<div class='col-sm-3' >" +
									"<div class='form-group'><div class='col-md-12' style='height: 100px; text-align: center;'><img src="
									+ result.data[x].signImage
											+ " style='max-height:100px; max-width:100px;'></img></div><div class='col-md-12' style='text-align: center;'><button data-picurl='"
												+ result.data[x].signImage
													+ "' id='savedPicturesUrl"
																+ x
																	+ "' type='button' class='btn btn-primary' style='margin: auto; padding: auto;'>Сонгох</button></div></div></div>");

						}
						baba();
					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.messege, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
		});
		$('#file1').click(function(){
			$('#imagesType').val("file");
		});
		
		
//		$("#dAddword").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		
//		$("#pfirstName").draggable({
//			scroll:false,
//			containment: '#backgroud'
//		});
//		
//		$("#plastName").draggable({
//			scroll:false,
//			containment: '#backgroud'
//		});
		
//		$("#dyear").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		$("#dfirstName").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		$("#dlastName").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		$("#logoPicturesView").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		$("#maaniinPicturesView").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		$("#narsardulPicturesView").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		$("#zagalmaiPicturesView").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		$("#busadPicturesView").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
//		$("#zulPicturesView").draggable({ 
//				scroll: false,
//			containment: '#backgroud'
//		});
		
		$("#getColorId").click(function(){
			var color = $("#somesname").val();
			document.getElementById("dfirstName").style.color = color;

			document.getElementById("dlastName").style.color = color;

			document.getElementById("dyear").style.color = color;

			document.getElementById("dAddword").style.color = color;
			
		});
		
	}

	function baba(){
		
		$.each($("button[id^='savedPicturesUrl']"), function(k, v){
			$(v).click(function(){
				
				var me = $(this);
				
				$.each($("button[id^='savedPicturesUrl']"), function(k, v) {
					$(v).html("Сонгох");
				});
				me.html("Сонгосон");
				$("#stoneSixPictures").val($(this).data("picurl"));
				
//				document.getElementById("savedPicturesUrl"+k).disabled = true;
			});
		})
		/*$("#savedPicturesUrl").click(function(){
			alert("a");
		});*/
		
	}
	return {
		// main function to initiate the module
		init : function() {
			handleTable();
//			Зураг устгах талаар
//			$('#maaniinPicturesView').bind('click',function(){
//				alert("CLICK");
//			});

	    	$("#approveChangeDate").datetimepicker({
	            autoclose: true,
	            isRTL: false,
	            format: "yyyy.mm.dd hh:ii",
	            pickerPosition: "bottom-left"
	        });
	    	
	    	$("#orderStoneDate").datetimepicker({
	            autoclose: true,
	            isRTL: false,
	            format: "yyyy.mm.dd hh:ii",
	            pickerPosition: "bottom-left"
	        });
	    	
//			
//			$("#removed").click(function(){
//				
//				alert($("#removedValue").val());
//				
//			});
			// aler
	    	
	    	$("#removed").click(function(){
	    		
	    		var a = $("#removedValue").val();
	    		
	    		switch ($("#removedValue").val()) {
				case "logo":
					$("#logoPicturesView").html("");
					deletePictures();
					break;
	    		case "manin":
					$("#maaniinPicturesView").html("");	  
					deletePictures();
	    			break;
	    		case "narsar":
					$("#narsardulPicturesView").html("");	    
					deletePictures();
	    			break;
				case "zagalmai":
					$("#zagalmaiPicturesView").html("");
					deletePictures();
					break;
				case "busad":
					$("#busadPicturesView").html("");
					deletePictures();
					break;
				case "zul":
					$("#zulPicturesView").html("");
					deletePictures();
					break;
	    		}
	    	});
	    	
	    	var deletePictures = function() {
	                    
	    		var param = {};
	    		param.type = $("#removedValue").val();
	    		param.id = $("#orderId").val();
	    		
				$.ajax({
	                        method: "GET",
	                        dataType: "json", 
	                        jsonp: 'jsonp',
	                        data : param,
	                        url:"/removedPictrues", 
	                        success: function(result) {
	                        	
	                        },error : function() {
								CRSWebUtils
								.showAlert(
										"danger",
										"warning",
										"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
										0);
					}
	             });
	    	};
	    	
	    	
			$(document).ready(function() {

//				 var objstr = $("#hiddenPosition").val();
//				 var obj1 = JSON.parse(objstr);
//				 var year = document.getElementById("pyear");
//				 $('#dyear').show(500);
				
				var template = $('#templateid').val();
				
//				var imgLogo = $('#logoPicturesView');

				if (template == "") {
				} else {
//					$('#pzagwar').append($('#maaniinPicturesView').html());
					$('#pzagwar').html(template);
					
					var logo = $("#logoImage");
					var maani = $("#maaniImage");
					var sunmoon = $("#sunmoonImage");
					var cross = $("#crossImage");
					var light = $("#lightImage");
					var others = $("#othersImage");
					var stone = $("#stoneImage");
					var file = $("#fileImage");
					
					if(logo.length > 0)
					{
						var logoImg = $("<img src='"+logo.val()+"' style='max-width: 100px; max-height: 100px; position : absolute;' class='drag' id='logods'/>");					
						$("#logoPicturesView").html(logoImg);
					}
					if(maani.length > 0)
					{
						var maaniImg = $("<img src='"+maani.val()+"' style='max-width: 100px; max-height: 100px; position:absolute;' class='drag'/>");					
						$("#maaniinPicturesView").html(maaniImg);
					}
					
					if(sunmoon.length > 0)
					{
						var sunmoonImg = $("<img  class='drag' src='"+sunmoon.val()+"' style='max-width: 100px; max-height: 100px;position:absolute;'  class='drag'></img>");					
						$("#narsardulPicturesView").html(sunmoonImg);
					}
					
					if(cross.length > 0)
					{
						var crossImg = $("<img src='"+cross.val()+"' style='max-width: 100px; max-height: 100px;position:absolute;'  class='drag'></img>");					
						$("#zagalmaiPicturesView").html(crossImg);
					}
					if(light.length > 0)
					{
						var lightImg = $("<img src='"+light.val()+"' style='max-width: 100px; max-height: 100px;position:absolute;'  class='drag'></img>");					
						$("#zulPicturesView").html(lightImg);
					}
					if(others.length > 0)
					{
						var othersImg = $("<img src='"+others.val()+"' style='max-width: 100px; max-height: 100px;position:absolute;'  class='drag'></img>");					
						$("#busadPicturesView").html(othersImg);
					}
					if(stone.length > 0)
					{
						var stoneImg = $("<img src='"+stone.val()+"' style='width: 340px; height: 420px;' />");					
						$("#stonePicturesView").html(stoneImg);
					}
					if(file.length > 0)
					{
						var fileImg = $("<img src='"+file.val()+"' style='max-width: 100px; max-height: 100px;position:absolute;'  class='drag'></img>");					
						$("#filePicturesView").html(fileImg);
					}
//					$('#pzagwar').html(template);
//					var a = $('#pzagwar').find('#maaniinPicturesView').remove();
//					alert(a);
					
				}
				
				$("#logoPicturesView").click(function(){
					$("#removedValue").val("logo");
					$("#removed").text("Лого устгах");
					$("#removed").show();
				});
				$("#maaniinPicturesView").click(function(){
					$("#removedValue").val("manin");
					$("#removed").text("Манийн үсэг устгах");
					$("#removed").show();
				});
				$("#narsardulPicturesView").click(function(){
					$("#removedValue").val("narsar");
					$("#removed").text("Нар сар устгах");
					$("#removed").show();
				});
				$("#zagalmaiPicturesView").click(function(){
					$("#removedValue").val("zagalmai");
					$("#removed").text("Загалмай устгах");
					$("#removed").show();
				});
				$("#busadPicturesView").click(function(){
					$("#removedValue").val("busad");
					$("#removed").text("Бусад зураг устгах");
					$("#removed").show();
				});
				$("#zulPicturesView").click(function(){
					$("#removedValue").val("zul");
					$("#removed").text("Зул устгах");
					$("#removed").show();
				});
				
			});

		}

	};

}();
