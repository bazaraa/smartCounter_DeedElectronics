var orderRestaurantAdditionTableEditable = function() {

	var handleTable = function() {
		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}

			oTable.fnDraw();
		}

		function editRow(oTable, nRow) {
			$(nRow).addClass('editRow')
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);
			
			jqTds[0].innerHTML = '<select style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[1] + '"></select>';
			jqTds[1].innerHTML = '<input type="text" readonly="true" class="form-control" value="'
					+ aData[2] + '"/>';
			jqTds[2].innerHTML = '<input type="number" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[3] + '">';
			jqTds[3].innerHTML = '<input type="number" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[4] + '">';
			jqTds[4].innerHTML = '<input type="number" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[5] + '">';

			var checked = "";
			if (aData[6] && aData[6].indexOf
					&& aData[6].indexOf('checked="true"') > 0)
				checked = "checked='checked'";
			else if (aData[6] === true)
				checked = "checked='checked'";
			jqTds[5].innerHTML = '<input type="checkbox"  ' + checked + '>';
			$('#orderrestaurantaddition_editable_1 .editRow :checkbox').change()

			jqTds[6].innerHTML = '<input type="text" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[7] + '">';
			jqTds[7].innerHTML = '<input type="text" readonly="true" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[8] + '">';
			jqTds[8].innerHTML = '<input type="text" readonly="true" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[9] + '">';
			jqTds[9].style.textAlign="center";
			jqTds[9].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
			jqTds[10].style.textAlign="center";
			jqTds[10].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';

			$
					.ajax({
						url : '/orderRestaurant/getProductEnums',
						success : function(data) {
							
							
							productNames = JSON.parse(data)
							productNamesOptions = ''
							for (var i = 0; i < productNames.length; i++) {
								var item = productNames[i]
								productNamesOptions = productNamesOptions
										+ '<option value="' + item.value + '">'
										+ item.label + '</option>'
							}
							var product = find(productNames, 'label', aData[1])
							$('#orderrestaurantaddition_editable_1 td:first-child select').html(productNamesOptions);
							if(product)
								$('#orderrestaurantaddition_editable_1 td:first-child select').val(product.value).change();
							else
								$('#orderrestaurantaddition_editable_1 td:first-child select').change();
							
							
						}
					})
		}

		function saveRow(oTable, nRow) {
			$(nRow).removeClass('editRow')
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			var rowData = oTable.DataTable().row(nRow).data();
			param.orderRestId = $("#orderRestaurantId").val();
			param.orderId = $("#orderId").val();

			param.additionId = rowData[0];
			param.addition = jqSelects[0].value;
			param.inTable = jqInputs[1].value;
			param.countTable = jqInputs[2].value;
			param.total = jqInputs[3].value;
			param.fromOut = jqInputs[4].checked;
			param.note = jqInputs[5].value;
			param.price = jqInputs[6].value;
			param.totalAmount = jqInputs[7].value;
			
			if(param.fromOut == true){
				param.note = '';
				param.price = '0';
				param.totalAmount = '0';
			}
			param.enumUnit = jqInputs[0].value;
			param.enumName = jqSelects[0].options[jqSelects[0].selectedIndex].innerHTML;

			if(param.countTable === "" || param.countTable === null)
				param.countTable = 0;
			if(param.inTable === "" || param.inTable === null)
				param.inTable = 0;
			if(param.total === "" || param.total === null)
				param.total = 0;
			if(param.price === "" || param.price === null)
				param.price = 0;
			if(param.totalAmount === "" || param.totalAmount === null)
				param.totalAmount = 0;
			
			$
					.ajax({
						type : "POST",
						url : "/orderRestaurant/orderRestaurantAddition",
						async : false,
						dataType : "json",
						data : param,
						success : function(result) {
							if (result.success == true) {
								oTable.fnUpdate(result.data.additionId, nRow,
										0, false);
								oTable.fnUpdate(result.data.enumName, nRow, 1,
										false);
								oTable.fnUpdate(result.data.enumUnit,
										nRow, 2, false)
								oTable.fnUpdate(result.data.inTable, nRow, 3,
										false);
								oTable.fnUpdate(result.data.countTable, nRow,
										4, false);
								oTable.fnUpdate(result.data.total, nRow, 5,
										false);
								oTable.fnUpdate(result.data.fromOut, nRow, 6,
										false);
								oTable.fnUpdate(result.data.note, nRow, 7,
										false);
								oTable.fnUpdate(result.data.price, nRow, 8,
										false);
								oTable.fnUpdate(result.data.totalAmount, nRow,
										9, false);
								oTable.fnUpdate(
										'<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
										nRow, 10, false);
								oTable.fnUpdate(
										'<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>',
										nRow, 11, false);
								oTable.fnDraw();
								CRSWebUtils.showAlert("success", "check",
										"Амжилттай хадгалагдлаа.", 0);
							} else {
								CRSWebUtils.showAlert("danger", "warning",
										result.message, 0);
							}
						},
						error : function(data) {
							CRSWebUtils
									.showAlert(
											"danger",
											"warning",
											"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
											0);
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
			oTable
					.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>', nRow, 5,
							false);
			oTable.fnDraw();
		}

		var table = $('#orderrestaurantaddition_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bPaginate": false,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [
					{ // set default column settings
						'orderable' : true,
						'targets' : [ 1 ]
					},
					{
						"searchable" : true,
						"targets" : [ 1 ]
					},
					{
						"targets" : 0,
						"visible" : false,
					},
					{
						"targets" : 6,
						render : function(data, type, row) {
							var checked = false;
							if (data && data.indexOf
									&& data.indexOf('checked="true"') > 0)
								checked = true;
							else if (data === true)
								checked = true;
							if (checked)
								return '<span checked="true">Тийм</span>';
							return '<span checked="false">Үгүй</span>';
						},
						className : "dt-body-center"
					}],
			"order" : [ [ 0, "asc" ] ]
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#orderrestaurantaddition_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#orderrestaurantaddition_editable_1_new')
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

							var aiNew = oTable.fnAddData([ '', '', '', '', '',
									'', '', '', '', '', '', '' ]);
							var nRow = oTable.fnGetNodes(aiNew[0]);
							editRow(oTable, nRow);
							nEditing = nRow;
							nNew = true;

							$(
									'#orderrestaurant_editable_1 td:first-child select')
									.html(productTypes).change()

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
							param.orderId = $("#orderId").val();
							param.orderRestaurantId = $("#orderRestaurantId").val();
							param.additionId = rowData[0];
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
														url : "/orderRestaurant/orderRestaurantAddition/delete",
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
			var rowData1 = oTable.DataTable().row(nRow).data();
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

		window.productTypes = ''

		$('#productPackType').change(
				function() {
					if ($(this).val() !== '') {
						$.ajax({
							url : '/orderRestaurant/getProductTypes/'
									+ $(this).val(),
							success : function(data) {
								data = JSON.parse(data)
								productTypes = ''
								for (var i = 0; i < data.length; i++) {
									var item = data[i]
									productTypes = productTypes
											+ '<option value="' + item.id
											+ '">' + item.name + '</option>'
								}
							}
						})
					}
				});

		$(document).on(
				'change',
				'#productPackType',
				function() {
					var change = $(this).val();
					if (change === "none".toString()) {
						$('#orderrestaurant_editable_1_new').attr('disabled',
								'disabled');
					} else {
						$('#orderrestaurant_editable_1_new').removeAttr(
								'disabled');
					}
				});

//		var productTypes = []
//
//		$(document)
//				.on(
//						'change',
//						'#orderrestaurant_editable_1 td:first-child select',
//						function() {
//							if ($(this).val() !== '') {
//								$
//										.ajax({
//											url : '/orderRestaurant/getProductServices/'
//													+ $(this).val(),
//											success : function(data) {
//												data = JSON.parse(data)
//												productTypes = data
//												productServices = ''
//												for (var i = 0; i < data.length; i++) {
//													var item = data[i]
//													productServices = productServices
//															+ '<option value="'
//															+ item.id
//															+ '">'
//															+ item.name
//															+ '</option>'
//												}
//												$(
//														'#orderrestaurant_editable_1 td:nth-child(2) select')
//														.html(productServices);
//												$(
//														'#orderrestaurant_editable_1 td:nth-child(2) select')
//														.change()
//											}
//										})
//							}
//						});

		function hideEls() {
			$("#checklist").hide();
			$("#company").hide();
			$("#address").hide();
		}
		hideEls()

		$(document)
				.on(
						'change',
						'#orderTypeEnum',
						function() {
							if ($("#orderTypeEnum").val() == "") {
								hideEls()
							} else if ($("#orderTypeEnum").val() == "charityservice"
									|| $("#orderTypeEnum").val() == "hundetgelservice") {
								$("#checklist").show();
								$("#company").hide();
								$("#address").hide();
							} else if ($("#orderTypeEnum").val() == "other"
									|| $("#orderTypeEnum").val() == "hurgeltfood") {
								$("#address").show();
								$("#company").hide();
								$("#checklist").hide();
							} else if ($("#orderTypeEnum").val() == "employeefood") {
								$("#company").show();
								$("#checklist").hide();
								$("#address").hide();
							}
						});

		$(document).on('focusin', '[name=qtyTable]', function() {
			var qtyPeople = $('[name=qtyPeople]').val();
			var oneForTable = $('[name=oneForTable]').val();
			var qtyTable = Math.round(qtyPeople / oneForTable);
			$('[name=qtyTable]').val(qtyTable);
		});

		$(document)
				.on(
						'focusin',
						'#orderrestaurantaddition_editable_1 td:nth-child(4) input',
						function() {
							var qtyTable = $('[name=qtyTable]').val();
							$(
									'#orderrestaurantaddition_editable_1 td:nth-child(4) input')
									.val(qtyTable);
						});

		$('#orderrestaurantaddition_editable_1_new')
				.click(
						function() {
							$
									.ajax({
										url : '/orderRestaurant/getProductEnums',
										success : function(data) {
											productNames = JSON.parse(data)
											productNamesOptions = ''
											for (var i = 0; i < productNames.length; i++) {
												var item = productNames[i]
												productNamesOptions = productNamesOptions
														+ '<option value="'
														+ item.value
														+ '">'
														+ item.label
														+ '</option>'
											}
											$(
													'#orderrestaurantaddition_editable_1 td:first-child select')
													.html(productNamesOptions)
													.change()
										}
									});
							
							var countTable = $('#countTables').val();
							if(countTable != null || countTable != ""){
								$('#orderrestaurantaddition_editable_1 td:nth-child(4) input').val(countTable);
							}else{
								$('#orderrestaurantaddition_editable_1 td:nth-child(4) input').val(0);
							}
							
						});

		$(document)
				.on(
						'change',
						'#orderrestaurantaddition_editable_1 td:first-child select',
						function() {
							
							var me = $(this);
							
							var product = find(productNames, 'value', me.val());
							$('#orderrestaurantaddition_editable_1 td:nth-child(2) input').val(product.unit);
									
							$.ajax({
								url : '/orderRestaurant/getAdditionItemPrice/' + me.find("option:selected").val(),
								async: false,
								success : function(data) {
									var data = JSON.parse(data);
									
							
									$('#orderrestaurantaddition_editable_1 td:nth-child(8) input').val(data.itemprice);
								}
							});
							
							
						})

		$(document).on('keyup', '#orderrestaurantaddition_editable_1 td:nth-child(4) input',
				function() {
					var oneForTable = $('#orderrestaurantaddition_editable_1 td:nth-child(3) input').val();
					var Table = $('#orderrestaurantaddition_editable_1 td:nth-child(4) input').val();
					var totalTable = oneForTable * Table
					$('#orderrestaurantaddition_editable_1 td:nth-child(5) input').val(totalTable);
					var price = $('#orderrestaurantaddition_editable_1 td:nth-child(8) input').val();
					var grandTotalPrice = totalTable * price
					$('#orderrestaurantaddition_editable_1 td:nth-child(9) input').val(grandTotalPrice);
				});
		
		$(document).on('change', '#orderrestaurantaddition_editable_1 td:nth-child(4) input',
				function() {
					var oneForTable = $('#orderrestaurantaddition_editable_1 td:nth-child(3) input').val();
					var Table = $('#orderrestaurantaddition_editable_1 td:nth-child(4) input').val();
					var totalTable = oneForTable * Table
					$('#orderrestaurantaddition_editable_1 td:nth-child(5) input').val(totalTable);
					var price = $('#orderrestaurantaddition_editable_1 td:nth-child(8) input').val();
					var grandTotalPrice = totalTable * price
					$('#orderrestaurantaddition_editable_1 td:nth-child(9) input').val(grandTotalPrice);
				});

		$(document).on('keyup', '#orderrestaurantaddition_editable_1 td:nth-child(8) input',
				function() {
					var totalKg = $('#orderrestaurantaddition_editable_1 td:nth-child(5) input').val();
					var price = $('#orderrestaurantaddition_editable_1 td:nth-child(8) input').val();
					var grandTotalPrice = totalKg * price
					$('#orderrestaurantaddition_editable_1 td:nth-child(9) input').val(grandTotalPrice);
				});
		
		$(document).on('keyup', '#orderrestaurantaddition_editable_1 td:nth-child(3) input',
				function() {
					var oneForTable = $('#orderrestaurantaddition_editable_1 td:nth-child(3) input').val();
					var Table = $('#orderrestaurantaddition_editable_1 td:nth-child(4) input').val();
					var totalKg = oneForTable * Table;
					$('#orderrestaurantaddition_editable_1 td:nth-child(5) input').val(totalKg);
					var price = $('#orderrestaurantaddition_editable_1 td:nth-child(8) input').val();
					var grandTotalPrice = totalKg * price
					$('#orderrestaurantaddition_editable_1 td:nth-child(9) input').val(grandTotalPrice);
				});
		
		$(document).on('change', '#orderrestaurantaddition_editable_1 td:nth-child(3) input',
				function() {
					var oneForTable = $('#orderrestaurantaddition_editable_1 td:nth-child(3) input').val();
					var Table = $('#orderrestaurantaddition_editable_1 td:nth-child(4) input').val();
					var totalKg = oneForTable * Table;
					$('#orderrestaurantaddition_editable_1 td:nth-child(5) input').val(totalKg);
					var price = $('#orderrestaurantaddition_editable_1 td:nth-child(8) input').val();
					var grandTotalPrice = totalKg * price
					$('#orderrestaurantaddition_editable_1 td:nth-child(9) input').val(grandTotalPrice);
				});

		function find(arr, propName, propValue) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i][propName] == propValue) {
					return arr[i]
				}
			}
		}
		
		$(document).on('change', '#orderrestaurantaddition_editable_1 td:nth-child(6) :checkbox', function(){
			var check = $(this).attr('checked');
			setTimeout(function() {
			if(check == "checked"){
				$('#orderrestaurantaddition_editable_1 td:nth-child(7) input').attr('disabled', 'disabled');
				$('#orderrestaurantaddition_editable_1 td:nth-child(8) input').attr('disabled', 'disabled');
				$('#orderrestaurantaddition_editable_1 td:nth-child(9) input').attr('disabled', 'disabled');
				$('#orderrestaurantaddition_editable_1 td:nth-child(7) input').val('');
				$('#orderrestaurantaddition_editable_1 td:nth-child(9) input').val('');
			}else{
				
				$('#orderrestaurantaddition_editable_1 .editRow td:nth-child(7) input').removeAttr('disabled');
				$('#orderrestaurantaddition_editable_1 .editRow td:nth-child(8) input').removeAttr('disabled');
				$('#orderrestaurantaddition_editable_1 .editRow td:nth-child(9) input').removeAttr('disabled');
			}
			}, 7)
		});
		
		$(document).on('keyup', '#discountPercent', function() {
			var totalAmount = $('#totalAmount').val();
			var discountPercent = $('#discountPercent').val();
			var discountAmount = (totalAmount / 100) * discountPercent;
			var grandTotal = totalAmount - discountAmount;
			$('#discountAmount').val(discountAmount);
			$('#discountAmountFake').val(CRSWebUtils.formatMoney(discountAmount));
			$('#grandTotalAmount').val(grandTotal);
			$('#grandTotalAmountFake').val(CRSWebUtils.formatMoney(grandTotal));
			
		});
		
		$(document).on('keyup', '#discountAmountFake', function() {
			var totalAmount = $('#totalAmount').val();
			var discountAmount = $('#discountAmountFake').val();
			var discountAmountCalc = (discountAmount * 100) / totalAmount;
			$('#discountPercent').val(discountAmountCalc);
			var grandTotal = totalAmount - discountAmount;
			$('#discountAmount').val($('#discountAmountFake').val());
			$('#grandTotalAmount').val(grandTotal);
			$('#grandTotalAmountFake').val(CRSWebUtils.formatMoney(grandTotal));
		});
		
		$(document).on('keyup', '#peopleTable', function(){
			var people = $('#people').val();
			var peopleTable = $('#peopleTable').val();
			var countTables = Math.floor(people / peopleTable);
			$('#countTables').val(countTables - 1);
			var centerTable = (people - ((countTables - 1) * peopleTable));
			$('#centerTable').val(centerTable)
		});

	}

	return {

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};

}();