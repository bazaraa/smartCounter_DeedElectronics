var resultRegister= function() {

	var handleTable = function() {
		
		$.validator.addMethod(
    	        "regex",
    	        function(value, element, regexp) {
    	            var re = new RegExp(regexp);
    	            return this.optional(element) || re.test(value);
    	        },
    	        "Оруулсан утгаа шалгана уу."
    	);
		
		$('#resultregister-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: { 
            	age: {
                    required: true, min: 0, number: true
                },
                familyName: { required: true },
                lname: { required: true },
                fname: { required: true },
                regNumber: { required: true, regex: /^[а-яА-ЯөӨүҮ]{2}[0-9]{8,}/ },
                serviceType:{ required: true },
                gender:{ required: true }
            },

            messages: {
                age: { required: "Нас оруулна уу",
                	min: "0-с их тоо оруулна уу.",
                	number: "Тоо оруулна уу"},
                familyName: { required: "Ургийн овог оруулна уу" },
                lname: { required: "Овог оруулна уу" },
                fname: { required: "Нэр оруулна уу" },
                regNumber: { required: "Регистрийн дугаар оруулна уу", 
                	regex: "Регистерийн дугаар 'AБ12345678' гэсэн форматтай криллээр байна" },
                serviceType:{ required: "Хаашаа оршуулах сонгоно уу" },
                gender:{ required: "Хүйс сонгоно уу" }
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
            }
        });
		
		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}
			oTable.fnDraw();
		}

		var table = $('#resultregister_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bLengthChange": false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ { // set default column settings
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets": 0,
                "visible": false,
			}],
			"order" : [ [ 1, "asc" ] ]
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#resultregister_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		}); 

		var nEditing = null;
		var nNew = false;

		table.on('click','.delete',function(e) {
			e.preventDefault();
			
			var nRow = $(this).parents('tr')[0];
			var rowData = $(this).parents('table').DataTable().row(nRow).data();

			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.id = rowData[0];
			
			bootbox.confirm({
				message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
				callback : function(result) {
					if (result == false) {
						return;
					}
					$.ajax({
						type : "POST",
						url : "/resultregister/delete",
						async : false,
						dataType : "json",
						data : param,
						success : function(result) {
							if (result.success == true) {
								oTable.fnDeleteRow(nRow);
								CRSWebUtils.showAlert("success", "check", "Амжилттай устгагдлаа.", 0);
							} else {
								CRSWebUtils.showAlert("danger", "warning", result.message, 0);
							}
						},
						error : function() {
							CRSWebUtils.showAlert("danger", "warning", "Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
						}
					});
				}
			});
		});
		
		//enter darsan ued submit хийхгүй.
		$('#resultregister-form input').keypress(function(e) {
            if (e.which == 13) {
                return false;
            }
        });
		
		//утга хэвэнд оруулах
		$("#formReset").click(function() {
        	$('#resultregister-form')[0].reset();
        });
		
		//combobox бусадыг сонгосон үед textbox гарна
		$("#serviceType").change(function() {
			if($("#serviceType").val() == 'other')
			{
				$( "#serviceTypeOther" ).show();
			} else {
				$( "#serviceTypeOther" ).hide();
				$( "#serviceTypeOther" ).val("");
			}
				
		});
		
		$("#deathType").change(function() {
			if($("#deathType").val() == 'other')
			{
				$( "#deathTypeOther" ).show();
			} else {
				$( "#deathTypeOther" ).hide();
				$( "#deathTypeOther" ).val("");
			}
		});
		
		$("#deathPlace").change(function() {
			if($("#deathPlace").val() == 'other')
			{
				$( "#deathPlaceOther" ).show();
			} else {
				$( "#deathPlaceOther" ).hide();
				$( "#deathPlaceOther" ).val("");
			}
		});
		
		//Регистерээр өгөгдөлийн сангаас хайж форм бөглөнө.
		$("#regNumber").change(function() {
			//// search regnumber, set value
			
			////рэгистрийн дугаар мөн хэсэгийг шалгана.
			////биш бол alert
			if($(this).val().match(/^[а-яА-ЯөӨүҮ]{2}[0-9]{8,}/)) {
				 var csrf = $("#__csrf__").val();
					var param = {};
					param._csrf = csrf;
					param.regNumber = $("#regNumber").val();
					$.ajax({
						type : "POST",
						url : "/resultregister/getclient",
						async : false,
						dataType : "json",
						data : param,
						success : function(result) {
							//Регистрийн дугаар олдвол форм бөгөнө.
							if (result.success == true) {
								$("#id").val(result.data.id);
								$("#code").val(result.data.code);
								$("#familyName").val(result.data.familyName);
								$("#age").val(result.data.age);
								$("#lname").val(result.data.lname);
								$("#fname").val(result.data.fname);
								
								$("#registCode").val(result.data.registCode);
								$("#serviceTypeOther").val(result.data.serviceTypeOther);
								$("#deathTypeOther").val(result.data.deathTypeOther);
								$("#deathPlaceOther").val(result.data.deathPlaceOther);
								
								$("#serviceType option[value="+ result.data.serviceType +"]").prop('selected', true);
								$("#deathType option[value="+ result.data.deathType + "]").prop('selected', true);
								$("#deathPlace option[value="+ result.data.deathPlace + "]").prop('selected', true);
								
								if(result.data.removedRegistration)
									$('#removedRegistration').prop('checked',true).parent().addClass("checked");
								else
									$('#removedRegistration').prop('checked',true).parent().removeClass("checked");
								
								if(result.data.gender == 1){
									$('#male').prop('checked',true).parent().addClass("checked");
									$('#female').prop('checked',false).parent().removeClass("checked");
								}
								else{
									$('#female').prop('checked',true).parent().addClass("checked");
									$('#male').prop('checked',false).parent().removeClass("checked");
								}
								
							} else { // үгүй бол цэвэрлэнэ.
								$("#id").val(null);
								$("#code").val("");
								$("#familyName").val("");
								$("#age").val(1);
								$("#lname").val("");
								$("#fname").val("");
								
								$("#registCode").val("");
								$("#serviceTypeOther").val("");
								$("#deathTypeOther").val("");
								$("#deathPlaceOther").val("");
								
								$("#serviceType option").prop('selected', false);
								$("#deathType option").prop('selected', false);
								$("#deathPlace option").prop('selected', false);
								
								$('#removedRegistration').prop('checked',true).parent().removeClass("checked");
									
								$('#male').prop('checked',true).parent().addClass("checked");
								$('#female').prop('checked',false).parent().removeClass("checked");
								
							}
							hideshow();
						},
						error : function() {
							//CRSWebUtils.showAlert("danger", "warning", "Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
						}
					});
			 } else {
				 $("#regNumber").focus();
			 }
		});
		
		//үүсгэсэн өдрөөр хайх
		$("#resultregister_search").click(function() {
			var startDate =  getDateString(new Date($("#startDate").val()));
			var endDate =  getDateString(new Date($("#endDate").val()));
			
			url = "/resultregister/between/" + startDate + "" + endDate + "#resultregister_editable_1";
			window.location.href = url;
		});
	}
	return {
		// main function to initiate the module
		init : function() {
			handleTable();
			hideshow();
		}

	};

}();

//date to string format yyyyMMdd
function getDateString(date) {
	
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString(); 
	var dd  = date.getDate().toString();
	
	return yyyy + "" + (mm[1]?mm:"0"+mm[0]) + "" +(dd[1]?dd:"0"+dd[0]);
};

//Байгаа утгад нь тааруулж textbox нуух, нээх
function hideshow(){
	if($("#serviceType").val() == 'other'){
		$( "#serviceTypeOther" ).show();
	} else {
		$( "#serviceTypeOther" ).hide();
		$( "#serviceTypeOther" ).val("");
	}
	if($("#deathType").val() == 'other')
	{
		$( "#deathTypeOther" ).show();
	} else {
		$( "#deathTypeOther" ).hide();
		$( "#deathTypeOther" ).val("");
	}

	if($("#deathPlace").val() == 'other')
	{
		$( "#deathPlaceOther" ).show();
	} else {
		$( "#deathPlaceOther" ).hide();
		$( "#deathPlaceOther" ).val("");
	}
}
