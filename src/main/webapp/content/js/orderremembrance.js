var orderRemembranceTableEditable = function() {
	var restoreValues = []
	var handleTable = function() {
		function restoreRow(oTable, nRow) {
			console.log(restoreValues)
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);
			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				var html = aData[i + 1]
				if (i < 2) {
					html = restoreValues[i]
				}
				oTable.fnUpdate(html, nRow, i + 1, false);
			}
			oTable.fnDraw();
		}

		function editRow(oTable, nRow) {
			restoreValues = []
			var aData = oTable.fnGetData(nRow);
			var rowId = aData[0]
			var jqTds = $('>td', nRow);
			
			$.ajax({
				url : "/orderRemembrance/getProductTypes",
				success : function(_result) {
					result = JSON.parse(_result)
					for ( var i in result) {
						var type = result[i];
						if (result[i].name == aData[1]) {
							selected = "selected='selected'";
						} else {
							selected = "";
						}
						$('#types').append(
								'<option value="' + type.id + '"  ' + selected
										+ '>' + type.name + '</option>');
					}
					$('#types').change()
					restoreValues.push($('#types').val() !== '' ? $('#types').find('option:selected').text() : '') 
					restoreValues.push($('#product').val() !== '' ? $('#product').find('option:selected').text() : '')
				}
			});
			
			jqTds[0].innerHTML = '<select class="form-control" id="types"><option value="">Сонгох...</option></select>';

			$('#types').change(function(){

				$.ajax({
					url : "/orderRemembrance/getProductTypes/product/" + $('#types option:selected').val(),
					success : function(result) {
						result = JSON.parse(result)
						$('#product').empty();
						if(result == ""){
							$('#product').append('<option value="">Бүтээгдэхүүн байхгүй байна.</option>');
						}else{
						for ( var i in result) {
							var product = result[i];
							if (result[i].name == aData[1]) {
								selected = "selected='selected'";
							} else {
								selected = "";
							}
							$('#product').append('<option value="">Сонгох...</option>');
							$('#product').append('<option value="' + product.id + '"  ' + selected+ '>' + product.name + '</option>');
						}
						}
					}
				});
			});
			
			jqTds[1].innerHTML = '<select class="form-control" id="product"><option value="">Сонгох...</option></select>';
			
			$('#product').change(function(){

				$.ajax({
					url : "/orderRemembrance/getProductTypes/product/price/" + $('#product option:selected').val(),
					success : function(result) {
						result = JSON.parse(result)
						$('#price').val('');
						$('#price').val(result.price);
					}
				});
				
			});
			
			jqTds[2].innerHTML = '<input type="number" readonly=true class="form-control" id="price">';
			jqTds[3].innerHTML = '<input type="number" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[4] + '">';
			jqTds[4].innerHTML = '<input type="number" readonly=true style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[5] + '">';
			jqTds[5].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
			jqTds[6].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			var rowData = oTable.DataTable().row(nRow).data();

			param.orderRememId = $("#orderRemembranceId").val();
			param.orderId = $("#orderId").val();

			param.orderProductId = rowData[0];
			param.productType = jqSelects[0].value;
			param.productService = jqSelects[1].value;
			param.qty = jqInputs[0].value;
			param.price = jqInputs[1].value;
			param.totalAmount = jqInputs[2].value;
			
			param.typeId =jqSelects[0].value;
			param.typeName = jqSelects[0].options[jqSelects[0].selectedIndex].innerHTML;

			param.productId = jqSelects[1].value;
			param.productName = jqSelects[1].options[jqSelects[1].selectedIndex].innerHTML;
			
			if(param.typeName == "" || param.typeName == null)
				param.typeName = 0;
			if(param.productName == "" || param.productName == null)
				param.productName = 0;
			if(param.qty == "" || param.qty == null)
				param.qty = 0;
			if(param.price == "" || param.price == null)
				param.price = 0;
			if(param.totalAmount == "" || param.totalAmount == null)
				param.totalAmount = 0;

			$.ajax({
				type : "POST",
				url : "/orderRemembrance/orderProduct",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						oTable.fnUpdate(result.data.orderProductId, nRow, 0, false);
						oTable.fnUpdate(result.data.typeName, nRow, 1, false);
						oTable
								.fnUpdate(result.data.productName, nRow, 2,
										false);
						oTable.fnUpdate(result.data.qty, nRow, 3, false);
						oTable.fnUpdate(result.data.price, nRow, 4, false);
						oTable
								.fnUpdate(result.data.totalAmount, nRow, 5,
										false);
						oTable.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
								nRow, 6, false);
						oTable.fnUpdate('<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>',
								nRow, 7, false);
						oTable.fnDraw();
						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 5);
					} else {
						alert(result.message);
						CRSWebUtils.showAlert("danger", "warning",
								result.message, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});

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

		var table = $('#orderremembrance_editable_1');

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
			"order" : [ [ 0, "asc" ] ]
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#orderremembrance_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#orderremembrance_editable_1_new')
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
									'', '', '']);
							var nRow = oTable.fnGetNodes(aiNew[0]);
							editRow(oTable, nRow);
							nEditing = nRow;
							nNew = true;

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
							param.orderRemembranceId = $("#orderRemembranceId").val();
							param.productId = rowData[0];
							console.log(param.productId)
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
														url : "/orderRemembrance/orderProduct/delete",
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
																				5);

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
		
		$(document).on('keyup', '#orderremembrance_editable_1 td:nth-child(4) input', function(){
			var price = $('#orderremembrance_editable_1 td:nth-child(3) input').val();
			var count = $('#orderremembrance_editable_1 td:nth-child(4) input').val();
			var total = count * price;
			$('#orderremembrance_editable_1 td:nth-child(5) input').val(total);
		});
		
		$(document).ready(function() {
			
			if($('#boardService').val() != null || $('#boardService').val() != ""){
				var me = $("#board");
				if (me.is(':checked')) {
					$(".board").show();
					$(".stupa").hide();
				}
			} else{
				var me = $("#stupa");
				if (me.is(':checked')) {
					$(".board").hide();
					$(".stupa").show();
				}
			}
		});
		
		$("#board").change(function() {
			var me = $(this);
			if (me.is(':checked')) {
				$(".board").show();
				$(".stupa").hide();
			}

		});
		
		$("#stupa").change(function() {
			var me = $(this);

			if (me.is(':checked')) {
				$(".stupa").show();
				$(".board").hide();
			}

		});

	}

	return {

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};

}();