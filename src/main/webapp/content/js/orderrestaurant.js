
var orderRestaurantTableEditable = function() {
	
		var handleRestaurantForm = function() {
		$('#restaurant-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				restOrderType : {
					required : true
				},
				pack : {
					required : true
				},
				fullName : {
					required : true
				},
				phone1 : {
					required : true
				},
				relation : {
					required : true
				}
			},

			messages : {
				restOrderType : {
					required : "Зориулалт сонгоно уу."
				},
				pack : {
					required : "Цэс сонгоно уу."
				},
				fullName : {
					required : "Овог, нэр оруулна уу."
				},
				phone1 : {
					required : "Утасны дугаар оруулна уу."
				},
				relation : {
					required : "Холбоо хамаарал оруулна уу."
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

		$('#restaurant-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#restaurant-form').validate().form()) {
					$('#restaurant-form').submit(); // form validation success, call
												// ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#restaurant-form')[0].reset();
		});

	}
	
	var handleTable = function() {
		
		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);
			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				var html = aData[i + 1]
				if(i < 2) {
					html = $(aData[i + 1])
					for(var j = 0; j < html.length; j++) {
						if(html[j].selected) {
							html = html[j].innerHTML
							break
						}
					}
				}
				oTable.fnUpdate(html, nRow, i + 1, false);
			}
			oTable.fnDraw();
		}
 
		function editRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var rowId = aData[0]
			if(rowId === '') {
				rowId = 0
			}
			$.ajax({
				url: '/orderRestaurant/getOrderProduct/' + $('#productPackType').val() + '/' + rowId,
				success: function(data) {
					data = JSON.parse(data)
					_productTypes = JSON.parse(data.productTypeOptions)
					aData[1] = getHtmlOptions(JSON.parse(data.productTypeOptions), data.productType)
					aData[2] = getHtmlOptions(JSON.parse(data.productServiceOptions), data.productService)
					//aData[10] = data.image;
					
					var jqTds = $('>td', nRow);
					jqTds[0].innerHTML = '<select style="width: 100% !important;" class="form-control input-small">'
							+ aData[1] + '</select>';
					jqTds[1].innerHTML = '<select style="width: 100% !important;" class="form-control input-small" value="'
						+ aData[2] + '"></select>';
					jqTds[2].innerHTML = '<input type="number" style="width: 100% !important;" class="form-control input-small" value="'
							+ aData[3] + '">';
					jqTds[3].innerHTML = '<input type="number" readonly=true style="width: 100% !important;" class="form-control input-small" value="'
						+ aData[4] + '">';
					jqTds[4].innerHTML = '<input type="number" readonly=true style="width: 100% !important;" class="form-control input-small" value="'
						+ aData[5] + '">';
//					jqTds[5].innerHTML = '<input type="number" style="width: 100% !important;" class="form-control input-small" value="'
//						+ aData[6] + '">';
//					jqTds[6].innerHTML = '<input type="number" style="width: 100% !important;" class="form-control input-small" value="'
//						+ aData[7] + '">';
//					jqTds[7].innerHTML = '<input type="number" readonly=true style="width: 100% !important;" class="form-control input-small" value="'
//						+ aData[8] + '">';
					jqTds[5].innerHTML = '<input type="text" style="width: 100% !important;" class="form-control input-small" value="'
						+ aData[6] + '">';
					jqTds[6].innerHTML = '<img src="' + aData[7] + '" style="width: 100px; height: 60px;"/>';
					jqTds[7].style.textAlign="center";
					jqTds[7].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
					jqTds[8].style.textAlign="center";
					jqTds[8].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';
					
					$('#orderrestaurant_editable_1 td:first-child select').change()
				}
			})
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;			
			var rowData =oTable.DataTable().row(nRow).data();
			
			param.orderRestId = $("#orderRestaurantId").val();
			param.orderId = $("#orderId").val();
			
			param.orderProductId = rowData[0];
			param.productType = jqSelects[0].value;
			param.productService = jqSelects[1].value;
			param.qty = jqInputs[0].value;
			param.price = jqInputs[1].value;
			param.totalAmount = jqInputs[2].value;
//			param.discountPercent = jqInputs[3].value;
//			param.discountAmount = jqInputs[4].value;
//			param.grandTotalAmount = jqInputs[5].value;
			param.note = jqInputs[3].value;
			
			param.typeId =jqSelects[0].value;
			param.typeName = jqSelects[0].options[jqSelects[0].selectedIndex].innerHTML;

			param.productId = jqSelects[1].value;
			param.productName = jqSelects[1].options[jqSelects[1].selectedIndex].innerHTML;
			
			if(param.qty === "" || param.qty === null)
				param.qty = 0;
			if(param.price === "" || param.price === null)
				param.price = 0;
			if(param.totalAmount === "" || param.totalAmount === null)
				param.totalAmount = 0;
//			if(param.discountPercent === "" || param.discountPercent === null)
//				param.discountPercent = 0;
//			if(param.discountAmount === "" || param.discountAmount === null)
//				param.discountAmount = 0;
//			if(param.grandTotalAmount === "" || param.grandTotalAmount === null)
//				param.grandTotalAmount = 0;
			
			$.ajax({
				type : "POST",
				url : "/orderRestaurant/orderProduct",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						oTable.fnUpdate(result.data.productId, nRow, 0, false);
						oTable.fnUpdate(result.data.typeName, nRow, 1, false);
						oTable.fnUpdate(result.data.productName, nRow, 2, false);
						oTable.fnUpdate(result.data.qty, nRow, 3, false);
						oTable.fnUpdate(result.data.price, nRow, 4, false);
						oTable.fnUpdate(result.data.totalAmount, nRow, 5, false);
//						oTable.fnUpdate(result.data.discountPercent, nRow, 6, false);
//						oTable.fnUpdate(result.data.discountAmount, nRow, 7, false);
//						oTable.fnUpdate(result.data.grandTotalAmount, nRow, 8, false);
						oTable.fnUpdate(result.data.note, nRow, 6, false);
						oTable.fnUpdate('Зураг', nRow, 7, false);
						oTable.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>', nRow, 8, false);
						oTable.fnUpdate('<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>',	nRow, 9, false);
						oTable.fnDraw();
						CRSWebUtils.showAlert("success", "check", "Амжилттай хадгалагдлаа.", 0);
					} else {
						CRSWebUtils.showAlert("danger", "warning", result.message, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
			
			var totalAmount = 0;
			$('#orderrestaurantaddition_editable_1 tbody tr').each(function() {
				var price = parseInt($(this).children().eq(8).text());
				totalAmount += price;
			})
			var totalAmount1 = 0;
			$('#orderrestaurant_editable_1 tbody tr').each(function() {
				var price = parseInt($(this).children().eq(4).text());
				totalAmount1 += price;
			})
			$('#totalAmount').val((isNaN(totalAmount1) ? 0 : totalAmount1) + (isNaN(totalAmount) ? 0 : totalAmount));
			$('#totalAmountFake').val(CRSWebUtils.formatMoney((isNaN(totalAmount1) ? 0 : totalAmount1) + (isNaN(totalAmount) ? 0 : totalAmount)));
		}

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>', nRow, 5, false);
			oTable.fnDraw();
		}

		var table = $('#orderrestaurant_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bPaginate": false,
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
			}
			],
			"order" : [ [ 0, "asc" ] ]
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#orderrestaurant_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#orderrestaurant_editable_1_new')
				.click(
						function(e) {
							e.preventDefault();

							if (nNew && nEditing) {
								if (confirm("Хадгалахгүйгээр шинээр үүсгэх гэж байна шүү!")) {
									saveRow(oTable, nEditing); // save
									$(nEditing).find("td:first").html(
											"Untitled");
									nEditing = null;
									nNew = false;

								} else {
									oTable.fnDeleteRow(nEditing); // cancel
									nEditing = null;
									nNew = false;

									return;
								}
							}

							var aiNew = oTable.fnAddData(['', '', '', '', '',
									'', '', '', '', '']);
							var nRow = oTable.fnGetNodes(aiNew[0]);
							editRow(oTable, nRow);
							nEditing = nRow;
							nNew = true;
							$('#orderrestaurant_editable_1 td:first-child select').html(productTypes).change()
							
							var people = $('#people').val();
							setTimeout(function() {
								$('#orderrestaurant_editable_1 tbody tr:first td:eq(2) input').val(people);
							}, 50);
							
						});

		table
				.on(
						'click',
						'.delete',
						function(e) {
							e.preventDefault();
							
							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents(
									'table').DataTable().row(
									nRow).data();

							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.orderId = $("#orderId").val();
							param.orderRestaurantId = $("#orderRestaurantId").val();
							param.productId = rowData[0];
							bootbox
									.confirm({
										message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
										callback : function(result) {
											if (result == false) {
												return;
											}
											$.ajax({
														type : "POST",
														url : "/orderRestaurant/orderProduct/delete",
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
																var totalAmount = 0;
																$('#orderrestaurantaddition_editable_1 tbody tr').each(function() {
																	var price = parseInt($(this).children().eq(8).text());
																	totalAmount += price;
																})
																var totalAmount1 = 0;
																$('#orderrestaurant_editable_1 tbody tr').each(function() {
																	var price = parseInt($(this).children().eq(4).text());
																	totalAmount1 += price;
																})
																$('#totalAmount').val((isNaN(totalAmount1) ? 0 : totalAmount1) + (isNaN(totalAmount) ? 0 : totalAmount));
																$('#totalAmountFake').val(CRSWebUtils.formatMoney((isNaN(totalAmount1) ? 0 : totalAmount1) + (isNaN(totalAmount) ? 0 : totalAmount)));
																setPackReadonly()
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

		table.on('click', '.cancel', function(e) {
			e.preventDefault();
			if (nNew) {
				oTable.fnDeleteRow(nEditing);
				nEditing = null;
				nNew = false;
			} else {
				restoreRow(oTable, nEditing);
				nEditing = null;
			}
		});

		table.on('click', '.edit', function(e) {
			e.preventDefault();

			/*
			 * Get the row as a parent of the link that was clicked on
			 */
			var nRow = $(this).parents('tr')[0];
			var rowData1 =oTable.DataTable().row(nRow).data();
			if (nEditing !== null && nEditing != nRow) {
				/*
				 * Currently editing - but not this row - restore the old before
				 * continuing to edit mode
				 */
				restoreRow(oTable, nEditing);
				editRow(oTable, nRow);
				nEditing = nRow;
			} else if (nEditing == nRow && $(this).attr("method") == "save") {
				/* Editing this row and want to save it */
				saveRow(oTable, nEditing);
				nEditing = null;
			} else {
				/* No edit in progress - let's start one */
				editRow(oTable, nRow);
				nEditing = nRow;
			}
		});
		
		$(document).ready(
				function() {	
					$('#restaurant-form').on('submit', function(e) {
						
						var awards = "";
						$.each($("div#checklist input:checked"), function(idx, val) {
							awards =awards + val.id+ ";";
						});
						awards = awards.slice(0, -1);
						$("#checklistId").val(awards);
						
						
					});
					
					var awards = $("#checklistId").val();
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
				});
		
		productTypes = ''
			
		$('#productPackType').change(function() {
			if($(this).val() !== '') {
				$.ajax({
					url: '/orderRestaurant/getProductTypes/' + $(this).val(),
					success: function(data) {
						data = JSON.parse(data)
						productTypes = ''
						for(var i = 0; i < data.length; i++) {
							var item = data[i]		
							productTypes = productTypes + '<option value="' + item.id + '">' + item.name + '</option>'
						}
					}
				})
			}
		});
		
		$('#productPackType').ready(function(){
			var change = $('#productPackType').val();
			if(change == ""){
				$('#orderrestaurant_editable_1_new').attr('disabled', 'disabled');
			}else{
				$('#orderrestaurant_editable_1_new').removeAttr('disabled');
			}
		});
		
		$('.toggle').click(function(){
			$('#discountToggle').toggle();
		});
	
		_productTypes = []
		
		$(document).on('change', '#orderrestaurant_editable_1 td:first-child select', function() {
			if($(this).val() !== '') {
				$.ajax({
					url: '/orderRestaurant/getProductServices/' + $('#productPackType').val() + '/' + $(this).val(),
					success: function(data) {
						data = JSON.parse(data)
						_productTypes = data
						productServices = ''
						for(var i = 0; i < data.length; i++) {
							var item = data[i]
							productServices = productServices + '<option value="' + item.id + '">' + item.name + '</option>'
						}
						$('#orderrestaurant_editable_1 td:nth-child(2) select').html(productServices);
						$('#orderrestaurant_editable_1 td:nth-child(2) select').change()
					}
				})
			}
		});
		
		$(document).on('change', '#orderrestaurant_editable_1 td:nth-child(2) select', function() {
			if($(this).val() !== '') {
				var index = $(this).find(':selected').index();
				$('#orderrestaurant_editable_1 td:nth-child(4) input').val(_productTypes[index].price);
				$('#orderrestaurant_editable_1 td:nth-child(7) img').attr('src', _productTypes[index].image);
			}
		});
		
		$(document).on('keyup', '#orderrestaurant_editable_1 td:nth-child(3) input', function(){
			var count = $('#orderrestaurant_editable_1 td:nth-child(3) input').val();
			var price = $('#orderrestaurant_editable_1 td:nth-child(4) input').val();
			var total = count * price;
			
			
//			var discountPercent = $('#orderrestaurant_editable_1 td:nth-child(6) input').val();
//			if(discountPercent === "" || discountPercent === null)
//			{
//				discountPercent = 0;
//			}
//			var discountTotal = (discountPercent / 100) * total;
//			var afterDiscount = total - discountTotal;
//			
//			$('#orderrestaurant_editable_1 td:nth-child(7) input').val(discountTotal);
//			$('#orderrestaurant_editable_1 td:nth-child(8) input').val(afterDiscount);
				
			$('#orderrestaurant_editable_1 td:nth-child(5) input').val(total);
		});
		
		$(document).on('change', '#orderrestaurant_editable_1 td:nth-child(3) input', function(){
			var count = $('#orderrestaurant_editable_1 td:nth-child(3) input').val();
			var price = $('#orderrestaurant_editable_1 td:nth-child(4) input').val();
			var total = count * price;
			
			
//			var discountPercent = $('#orderrestaurant_editable_1 td:nth-child(6) input').val();
//			if(discountPercent === "" || discountPercent === null)
//			{
//				discountPercent = 0;
//			}
//			var discountTotal = (discountPercent / 100) * total;
//			var afterDiscount = total - discountTotal;
//			
//			$('#orderrestaurant_editable_1 td:nth-child(7) input').val(discountTotal);
//			$('#orderrestaurant_editable_1 td:nth-child(8) input').val(afterDiscount);
				
			$('#orderrestaurant_editable_1 td:nth-child(5) input').val(total);
		});
		
//		$(document).on('keyup', '#orderrestaurant_editable_1 td:nth-child(6) input', function(){
//			var discountPercent = $('#orderrestaurant_editable_1 td:nth-child(6) input').val();
//			var total = $('#orderrestaurant_editable_1 td:nth-child(5) input').val();
//			var discountTotal = (discountPercent / 100) * total;
//			var afterDiscount = total - discountTotal;
//			$('#orderrestaurant_editable_1 td:nth-child(7) input').val(discountTotal);
//			$('#orderrestaurant_editable_1 td:nth-child(8) input').val(afterDiscount);
//		});
//		
//		$(document).on('change', '#orderrestaurant_editable_1 td:nth-child(6) input', function(){
//			var discountPercent = $('#orderrestaurant_editable_1 td:nth-child(6) input').val();
//			var total = $('#orderrestaurant_editable_1 td:nth-child(5) input').val();
//			var discountTotal = (discountPercent / 100) * total;
//			var afterDiscount = total - discountTotal;
//			$('#orderrestaurant_editable_1 td:nth-child(7) input').val(discountTotal);
//			$('#orderrestaurant_editable_1 td:nth-child(8) input').val(afterDiscount);
//		});
		
		function hideEls() {
			$("#checklist").hide();
			$("#company").hide();
			$("#address").hide();			
		}
		hideEls()
		
		$(document).ready(function(){
			if($("#orderTypeEnum").val() === ""){
				hideEls()
			}
			else if($("#orderTypeEnum").val() === "charityservice" || $("#orderTypeEnum").val() === "hundetgelservice"){
				$("#checklist").show();
				$("#company").hide();
				$("#address").hide();
			}
			else if($("#orderTypeEnum").val() === "other" || $("#orderTypeEnum").val() === "hurgeltfood"){
				$("#address").show();
				$("#company").hide();
				$("#checklist").hide();
			}
			else if($("#orderTypeEnum").val() === "employeefood"){
				$("#company").show();
				$("#checklist").hide();
				$("#address").hide();
			}
		});
		
		$(document).ready(function(){
			if($("#orderTypeEnum").val() != ""){
				$('#orderTypeEnum').attr('readonly', 'true').css('pointer-events','none');
			}else{
				$('#orderTypeEnum').removeAttr('readonly');
			}
		});
		
		function setPackReadonly() {
			var emptyCount = $("#orderrestaurant_editable_1 tbody tr").has('.dataTables_empty').length
			if(emptyCount != 1){
				$('#productPackType').attr('readonly', 'true').css('pointer-events','none');
			}else{
				$('#productPackType').removeAttr('readonly').css('pointer-events', 'auto');
			}
		}
		setPackReadonly()
		
		function getHtmlOptions(options, selectedValue) {
			var html = ''
			for(var i = 0; i < options.length; i++) {
				var item = options[i]		
				var selected = item.id === selectedValue ? 'selected' : ''
				html = html + '<option value="' + item.id + '"' + selected + '>' + item.name + '</option>';
			}
			return html;
		}
		
		$('#reload').on("click", function() {
			var me = $(this);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.orderId = $('#orderId').val();
			$.ajax({
						type : "POST",
						url : "/orderRestaurant/refresh",
						async : false,
						dataType : "json",
						data : param,
						success : function(result) {
							if (result.success == true) {
								if(result.data.resName != null){
									$('#restaurantname').val(result.data.resName);
									$('#startDate').val(getDateString(new Date(result.data.startDate)));
									$('#startTime').val(getTimeString(new Date(result.data.startDate)));
								} else {		
									$('#restaurantname').val();
									$('#startDate').val();
									$('#startTime').val();
									CRSWebUtils.showAlert(
											"danger",
											"warning",
											"Энэ захиалга дээр танхимын хуваарь захиалаагүй байна.",
											0);
								}
								
							} else {
								CRSWebUtils.showAlert("danger",
										"warning",
										result.message, 0);
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
		});
		
	}
	
	return {

		// main function to initiate the module
		init : function() {
			handleTable();
			handleRestaurantForm();
		}

	};

}();

function getTimeString(time) {
	h = time.getHours().toString(); // 0-24 format
	m = time.getMinutes().toString();

	return (h[1] ? h : "0" + h[0]) + ":" + (m[1] ? m : "0" + m[0]);
};

function getDateString(date) {

	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth() + 1).toString();
	var dd = date.getDate().toString();

	return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-"
			+ (dd[1] ? dd : "0" + dd[0]);
};
