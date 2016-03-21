var carrechargeTableEditable = function() {

	var handleTable = function() {

		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}
			oTable.fnDraw();
		}

		var table = $('#carrecharge_editable_1');

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

		var tableWrapper = $("#carrecharge_editable_1_wrapper");

//		tableWrapper.find(".dataTables_length select").select2({
//			showSearchInput : false
//		// hide search box with special css class
//		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

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
														url : "/carrecharge/delete",
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



var carrechargeForm = function() {

	var reChargeForm = function() {
		$('#carrecharge-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				car : {
					required : true
				},
				note : {
					required : true
				},
				adjustment : {
					required : true
				},
				employee : {
					required : true
				}
			},

			messages : {
				car : {
					required : "Машинаа сонгоно уу !"
				},
				note : {
					required : "Тайлбар бичнэ үү !"
				},
				adjustment : {
					required : "Залруулга хоосон байна !"
				},
				employee : {
					required : "Жолооч сонгоно уу !"
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
				form.submit();
			}
		});

//		Машины төрөлөөр авах
		$("#car").change(function() {
			
			var carId = $(this).val()
			
			if(carId === ''){
				window.location.href = "/carrecharge/"
			}else{
			url = "/carrecharge/table/" + carId;
			window.location.href = url;
			}
//			 $.ajax({
//					type : "GET",
//					url : "/carrecharge/table/" + carId,
//					async : true,
//					dataType : "json",							
//					success : function(cResult) {
//						
//					},
//					error : function() {
//						return false;
//					}
//				});
			
		});
		
		
		$("#carSearch").change(function(){
			
			var carId = $("#carSearch").val();
			if(carId == ""){
				url = "/carrecharge";
				window.location.href = url;
			}else{
				url = "/carrecharge/select/" + carId + "#carrecharge_editable_1";
				window.location.href = url;	
			}
			
		});
		
		$("#carrecharge_search").click(function() {
			var startDate =  getDateString(new Date($("#startDate").val()));
			var endDate =  getDateString(new Date($("#endDate").val()));
			url = "/carrecharge/between/" + startDate + "" + endDate + "#carrecharge_editable_1";
			window.location.href = url;
		});
		
		
		$("#formReset").click(function() {
			$('#carrecharge-form')[0].reset();
		});

	}

	return {
		// main function to initiate the module
		init : function() {

			reChargeForm();

		}

	};

}();



function getDateString(date) {
	
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString(); 
	var dd  = date.getDate().toString();
	
	return yyyy + "" + (mm[1]?mm:"0"+mm[0]) + "" +(dd[1]?dd:"0"+dd[0]);
};

