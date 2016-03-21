var orderStoneAdditionTableEditable = function() {

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
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);
			$
					.ajax({
						url : '/orderStone/getOrderStonAdditionJson/',
						success : function(data) {

							data = JSON.parse(data);
							var optionCarNumbers = getHtmlOptions(data.orderStoneAddition,aData[1]);
							
					
							jqTds[1].innerHTML = '<select class="form-control" name="product" id="product1">'
								+ optionCarNumbers + '</select>';
							jqTds[2].innerHTML = '<input type="number" class="form-control" min="0" readonly="true" id="onePrice" value="'
									+ aData[2] + '">';
							if (aData[3] == "") {
								jqTds[3].innerHTML = '<input type="number" class="form-control" name="qty" min="0" value="0" id="qty">';
							}else{
								jqTds[3].innerHTML = '<input type="number" class="form-control" name="qty" min="0" id="qty" value="' 
									+ aData[3] + '">';
							}
							jqTds[4].innerHTML = '<input type="number" class="form-control" name="totalAmount" min="0" readonly="true" id="totalamount" value="'
									+ aData[4] + '">';
							jqTds[5].innerHTML = '<input type="number" class="form-control" name="uldegdel" min="0" readonly="true" value="'
										+ aData[5] + '">';
							jqTds[6].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
							jqTds[7].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';
							orderStoneAdditionTableEditable.handleTimePickers();
					
						}
					});
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			
			var rowData = oTable.DataTable().row(nRow).data();
			param.qty = jqInputs[1].value;
			param.totalAmount = jqInputs[2].value;
			param.uldegdel = jqInputs[3].value;
			param.orderId = $("#orderId").val();
			param.price = jqInputs[0].value;
			param.id = $("#product1").val();
			
			if (param.qty == "") {
				param.qty = 0;
			}
			if (param.totalAmount == "") {
				param.totalAmount = 0;
			}
			if (param.uldegdel == "") {
				param.uldegdel = 0;
			}
			
			$.ajax({
				type : "POST",
				url : "/stoneAddition/ajax",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {

//						oTable.fnUpdate(result.id, nRow, 0, false);
						oTable.fnUpdate(result.data.productServiceName, nRow, 1, false);
						oTable.fnUpdate(result.data.price, nRow, 2, false);
						oTable.fnUpdate(result.data.qty, nRow, 3, false);
						oTable.fnUpdate(result.data.totalAmount, nRow, 4, false);
						oTable.fnUpdate(result.data.uldegdel, nRow, 5, false);
						oTable.fnUpdate('<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
								nRow, 6, false);
						oTable.fnUpdate('<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>',
								nRow, 7, false);
						oTable.fnDraw();

						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 0);
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

		}

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			// oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			// oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			// oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate('<a class="edit" href="">Засах</a>', nRow, 11,
					false);
			oTable.fnDraw();
		}

		var table = $('#orderStoneAddition_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,
			"columnDefs" : [ { // set default column settings
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : true,
			} ],
			"order" : [ [ 0, "asc" ] ]
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#dispatcherCar_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#orderStoneAddition_editable_1_new')
				.click(
						function(e) {
							e.preventDefault();

							if (nNew && nEditing) {
								if (confirm("Previose row not saved. Do you want to save it ?")) {
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

							var aiNew = oTable.fnAddData([ '', '', '', '', '','','','' ]);
							var nRow = oTable.fnGetNodes(aiNew[0]);
							editRow(oTable, nRow);
							nEditing = nRow;
							nNew = true;
						});

		table.on('click','.delete',
						function(e) {
							e.preventDefault();

							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents('table').DataTable()
									.row(nRow).data();

							var csrf = $("#__csrf__").val();
							var param = {};
							var jqInputs = $('input', nRow);
							
							param._csrf = csrf;
							param.id = jqInputs[0].value;
							param.orderId = $("#orderId").val();
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
														url : "/stoneAddition/delete",
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

		function getHtmlOptions(options, selectedValue) {
			var html = '<option value="">Сонгох...</option>'
			for (var i = 0; i < options.length; i++) {
				var item = options[i]
				var selected = item.label === selectedValue ? 'selected' : ''
				html = html + '<option value="' + item.value + '"' + selected
						+ '>' + item.label + '</option>';
			}
			return html;
		}

	}

	var handleTimePickers = function() {

		$("#product1").change(function(){
			
			var param = {};

			param.id = $("#product1").val();
			
			$.ajax({
							type : "GET",
							url : "/orderStoneAddition/getPrice",
							async : false,
							data : param,
							success : function(
									result) {
								
								if (result.success) {
									$("#onePrice").val(result.data.price);
									var qty = $("#qty").val();
									
									var totalAmount = result.data.price * qty;
									
									$("#totalamount").val(totalAmount);
									
									
								} else {
									CRSWebUtils.showAlert(
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
			
		});
		
		$("#qty").keyup(function(){
			
			var price = $("#onePrice").val();
			var qty = $("#qty").val();
			var totalAmount = price * qty;
			$("#totalamount").val(totalAmount);
			
		})
		
		
//		$('#checkbox1').click(function() {
//			var x = document.getElementById("checkbox1").checked
//			if (x == false) {
//				$("#carNumber").hide();
//				$("#carDriver").hide();
//				$("#carNumberSelect").show();
//				$("#carDriverSelect").show();
//			}
//			if (x == true) {
//				$("#carNumberSelect").hide();
//				$("#carDriverSelect").hide();
//				$("#carDriver").show();
//				$("#carNumber").show();
//			}
//
//		});
	}
	return {

		// main function to initiate the module
		init : function() {
			handleTable();
			

		},
		handleTimePickers : handleTimePickers

	};

}();