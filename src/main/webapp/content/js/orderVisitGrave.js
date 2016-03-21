var orderVisitGraveForm = function() {

	var handleOrderVisitGraveForm = function() {

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			console.log(re.test(value))
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#orderVisitGrave-form').validate({
			errorElement : 'span',
			errorClass : 'help-block',
			focusInvalid : false,
			rules : {
				"executePlace" : {
					required : true
				},
				"visitGraveType" : {
					required : true
				},
				"executeDate" : {
					required : true
				},
				"fullName" : {
					required : true,
					regex : /^[а-яА-ЯөӨүҮa-zA-Z]/
				},
				"relation" : {
					required : true
				},
				"phone1" : {
					required : true,
					regex : /^[0-9]/
				}
			},

			messages : {
				"executePlace" : {
					required : "Гүйцэтгэх газраа оруулна уу!!!"
				},
				"visitGraveType" : {
					required : "Төрөл сонгоно уу!!!"
				},
				"executeDate" : {
					required : "Гүйцэтгэх огноо сонгоно уу!!!"
				},
				"fullName" : {
					required : "Бүтэн нэр оруулна уу!!!",
					regex : "Хүний нэр дунд тоо оруулхыг хориглоно"
				},
				"relation" : {
					required : "Холбоо хамаарал сонгоно уу!!!"
				},
				"phone1" : {
					required : "Утасны дугаар оруулна уу!!!",
					regex : "Утасны дугаар зөвхөн тоо байна."
				}
			},

			invalidHandler : function(event, validator) {
			},

			highlight : function(element) { // hightlight error
				// inputs
				$(element).closest('.form-group').addClass('has-error'); // set
				// error
				// class
				// to
				// the control group
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

		$('#orderVisitGrave-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#orderVisitGrave-form').validate().form()) {
					$('#orderVisitGrave-form').submit(); // form validation
					// success, call
					// ajax form submit
				}
				return false;
			}
		});

		$("#formReset").click(function() {
			$('#orderVisitGrave-form')[0].reset();
		});

		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);
			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				var html = aData[i + 1]
				if (i < 2) {
					html = $(aData[i + 1])
					for (var j = 0; j < html.length; j++) {
						if (html[j].selected) {
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
			var jqTds = $('>td', nRow);

			jqTds[1].innerHTML = '<select id="product" class="form-control"></select>';
			jqTds[2].innerHTML = '<input type="text" id="price" readonly="readonly" class="form-control" value="'
					+ aData[3] + '">';

			if (aData[4] == '') {
				aData[4] = 0;
			}

			jqTds[3].innerHTML = '<input type="number" id="quantity" class="form-control" value="'
					+ aData[4] + '">';

			if (aData[6] == '') {
				aData[6] = 0;
			}

			jqTds[4].innerHTML = '<input type="text" id="repeatCount" class="form-control" readonly="readonly" value="' + aData[6] + '">';

			if(aData[7] == ""){
				var date = new Date();
				var res = date.getFullYear() + '.' +  0 +(date.getMonth() + 1) + '.' + date.getDate();
				$("#repeatCount").val(1);
			} else {
				var str = aData[7];
				var res = str.replace(/<br>/g, ",");
			}

			jqTds[5].innerHTML = '<input type="text" class="form-control multidate" value="' + res + '"/>';

			$(".multidate").change(function() {
				var value = $(".multidate").val();
				var words = value.split(",");
				$("#repeatCount").val(words.length);
			});
			if (aData[0] == "") {
				$("#quantity").change(function() {
					var price = $("#price").val();
					var qty = $("#quantity").val();

					var total = CRSWebUtils.parseFloat(price) * qty;
					$('#total').val("");
					$('#total').val(CRSWebUtils.formatMoney(total));
					$('#grandTotal').val("");
					$('#grandTotal').val(CRSWebUtils.formatMoney(total));
				});
			} else {
				$("#quantity").keyup(
						function() {
							var price = $('#price').val();
							var qty = $('#quantity').val();
							var total = CRSWebUtils.parseFloat(price) * qty;
							$('#total').val("");
							$('#total').val(CRSWebUtils.formatMoney(total));

							if (aData[9] != '') {
								$('#grandTotal').val("");
								var discount = $('#discountValue').val();
								var grandTotal = total
										- CRSWebUtils.parseFloat(discount);
								$('#grandTotal').val(
										CRSWebUtils.formatMoney(grandTotal));
							} else {
								$('#grandTotal').val("");
								$('#grandTotal').val(
										CRSWebUtils.formatMoney(total));
							}
						});
			}

			jqTds[6].innerHTML = '<input type="text" id="total" class="form-control" readonly="readonly" value="'
					+ aData[8] + '">';

			if (aData[9] == '') {
				aData[9] = 0;
			}

			jqTds[7].innerHTML = '<input type="text" id="discountValue" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData[9] + '">';

			if (aData[0] == "") {
				$('#discountValue').change(
						function() {
							var total = $('#total').val();
							var grandTotal = CRSWebUtils.parseFloat(total)
									- $('#discountValue').val();
							$('#grandTotal').val(
									CRSWebUtils.formatMoney(grandTotal));
						});
			} else {
				$('#discountValue').change(
						function() {
							var total = $('#total').val();
							if (aData[9] != '') {
								var grandTotal = CRSWebUtils.parseFloat(total)
										- $('#discountValue').val();
								$('#grandTotal').val(
										CRSWebUtils.formatMoney(grandTotal));
							} else {
								var discount = $('#discountValue').val();
								var grandTotal = CRSWebUtils.parseFloat(total)
										- CRSWebUtils.parseFloat(discount);
								$('#grandTotal').val(
										CRSWebUtils.formatMoney(grandTotal));
							}
						});
			}

			jqTds[8].innerHTML = '<input type="text" id="grandTotal" style="width: 100% !important;" class="form-control input-small" readonly="readonly" value="'
					+ aData[10] + '">';
			jqTds[9].innerHTML = '<select id="myemployee" class="form-control"><option value="">Сонгох...</option></select>';

			var checked = "";
			if (aData[12] && aData[12].indexOf
					&& aData[12].indexOf('checked="true"') > 0)
				checked = "checked='checked'";
			else if (aData[12] === true)
				checked = "checked='checked'";

			jqTds[10].innerHTML = '<input type="checkbox" ' + checked + '>';
			jqTds[11].innerHTML = '<input type="text" class="form-control" readonly="readonly" value="'
					+ res + '">';
			jqTds[12].innerHTML = '<a class="edit" href="" method="save"><i class="fa fa-floppy-o fa-lg"></i></a>';
			jqTds[13].style.textAlign = "center";
			jqTds[13].innerHTML = '<a class="cancel" href=""><i class="fa fa-times fa-lg"></i></a>';
			// Хариуцсан ажилтаны жагсаалт
			if (aData[0] == "") {
				$.ajax({
					url : "/orderVisitGrave/getnodes",
					success : function(result) {
						result = JSON.parse(result)
						for ( var i in result) {
							var emp = result[i];

							if (result[i].name == $("#username").text()) {
								selected = "selected='selected'";
							} else {
								selected = "";
							}
							$('#myemployee').append(
									'<option value="' + emp.id + '" '
											+ selected + '>' + emp.name
											+ '</option>');
						}
					}
				});
			} else {
				$.ajax({
					url : "/orderVisitGrave/getnodes",
					success : function(result) {
						result = JSON.parse(result)
						for ( var i in result) {
							var emp = result[i];

							if (result[i].name == aData[11]) {
								selected = "selected='selected'";
							} else {
								selected = "";
							}
							$('#myemployee').append(
									'<option value="' + emp.id + '" '
											+ selected + '>' + emp.name
											+ '</option>');
						}
					}
				});
			}

			// Бүтээгдэхүүнүүдийг авч байна
			var value = "";
			if ($("#productPackId").val() == "") {
				value = "/orderVisitGrave/products/" + "all"

				$.ajax({
					url : value,
					success : function(result) {
						result = JSON.parse(result)
						$('#product').empty();
						for ( var i in result) {
							var pro = result[i];
							if (result[i].name == aData[2]) {
								selected = "selected='selected'";
							} else {
								selected = "";
							}
							$('#product').append(
									'<option value="' + pro.id + '" '
											+ selected + '>' + pro.name
											+ '</option>');
							
							if(i == 0){
				
								$.ajax({
									url : "/orderVisitGrave/products/price/"
											+ $("#orderId").val()
											+ "/"
											+ pro.id,
									success : function(result) {
										result = JSON.parse(result)
										$('#price').val("");
										$('#price')
												.val(
														CRSWebUtils
																.formatMoney(result.price));
				
										if ($("#quantity").val() == 0) {
											$("#total")
													.val(
															CRSWebUtils
																	.formatMoney(result.price));
										}
				
										if ($("#discountValue").val() == 0) {
											$('#grandTotal')
													.val(
															CRSWebUtils
																	.formatMoney(result.price));
										}
									}
								});
							}
						}
					}
				});
			} else {
				value = "/orderVisitGrave/products/"
						+ $("#productPackId").val()
				$.ajax({
					url : value,
					success : function(result) {
						result = JSON.parse(result)
						$('#product').empty();
						for ( var i in result) {
							var pro = result[i];
							if (result[i].name == aData[2]) {
								selected = "selected='selected'";
							} else {
								selected = "";
							}

							$('#product').append(
									'<option value="' + pro.id + '" '
											+ selected + '>' + pro.name
											+ '</option>');
							if(i == 0){
				
								$.ajax({
									url : "/orderVisitGrave/products/price/"
											+ $("#orderId").val()
											+ "/"
											+ pro.id,
									success : function(result) {
										result = JSON.parse(result)
										$('#price').val("");
										$('#price')
												.val(
														CRSWebUtils
																.formatMoney(result.price));
				
										if ($("#quantity").val() == 0) {
											$("#total")
													.val(
															CRSWebUtils
																	.formatMoney(result.price));
										}
				
										if ($("#discountValue").val() == 0) {
											$('#grandTotal')
													.val(
															CRSWebUtils
																	.formatMoney(result.price));
										}
									}
								});
							}
						}
					}
				});
			}
			$("#productPackId").change(
					function() {
						var value = "";
						if ($("#productPackId").val() == "") {
							value = "/orderVisitGrave/products/" + "all"
							$.ajax({
								url : value,
								success : function(result) {
									result = JSON.parse(result)
									$('#product').empty();
									for ( var i in result) {
										var pro = result[i];

										if (result[i].name == aData[2]) {
											selected = "selected='selected'";
										} else {
											selected = "";
										}

										$('#product').append(
												'<option value="' + pro.id
														+ '" ' + selected + '>'
														+ pro.name
														+ '</option>');
									}
								}
							});
						} else {
							value = "/orderVisitGrave/products/"
									+ $("#productPackId").val()
							$.ajax({
								url : value,
								success : function(result) {
									result = JSON.parse(result)
									$('#product').empty();
									for ( var i in result) {
										var pro = result[i];
										if (result[i].name == aData[2]) {
											selected = "selected='selected'";
										} else {
											selected = "";
										}

										$('#product').append(
												'<option value="' + pro.id
														+ '" ' + selected + '>'
														+ pro.name
														+ '</option>');
									}
								}
							});
						}
					});

			// Бүтээгдэхүүний үнэ авч байна
			$('#product').change(function() {
				$.ajax({
					url : "/orderVisitGrave/products/price/"
							+ $("#orderId").val()
							+ "/"
							+ $(
									"#product option:selected")
									.val(),
					success : function(result) {
						result = JSON.parse(result)
						$('#price').val("");
						$('#price')
								.val(
										CRSWebUtils
												.formatMoney(result.price));

						if ($("#quantity").val() == 0) {
							$("#total")
									.val(
											CRSWebUtils
													.formatMoney(result.price));
						}

						if ($("#discountValue").val() == 0) {
							$('#grandTotal')
									.val(
											CRSWebUtils
													.formatMoney(result.price));
						}
					}
				});
			});

			// Datepicker олон
			$('.multidate').datepicker({
				multidate : true,
				format : "yyyy.mm.dd"
			});
		}
		
		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			var rowData = oTable.DataTable().row(nRow).data();

			param.orderVisitGraveId = $("#id").val();
			param.detailId = rowData[0];
			param.productService = jqSelects[0].value;
			param.orderId = $("#orderId").val();
			param.price = CRSWebUtils.parseFloat(jqInputs[0].value);
			param.qty = jqInputs[1].value;
			param.repeantcount = jqInputs[2].value;
			param.dates = jqInputs[3].value;
			param.totalAmount = CRSWebUtils.parseFloat(jqInputs[4].value);
			param.packDiscountAmount = CRSWebUtils.parseFloat(jqInputs[5].value);
			param.grandTotalAmount = CRSWebUtils.parseFloat(jqInputs[6].value);
			param.repondent = jqSelects[1].value;
			param.feedback = jqInputs[7].checked;
			param.feedbackDate = jqInputs[8].value;

			if (param.productService == "") {
				CRSWebUtils.showAlert("danger", "warning",
						"Бүтээгдэхүүн сонгогдоогүй байна!", 0);
				oTable.fnDeleteRow(nRow, null, true);
			} else {
				$
						.ajax({
							type : "POST",
							url : "/orderVisitGrave/Detail",
							async : false,
							dataType : "json",
							data : param,
							success : function(result) {
								if (result.success == true) {
									oTable.fnUpdate(result.data.id, nRow, 0,
											false);
									oTable.fnUpdate($('#myTableLen tr').length, nRow, 1,
											false);
									oTable.fnUpdate(result.data.proName, nRow,
											2, false);
									oTable.fnUpdate(result.data.price, nRow, 3,
											false);
									oTable.fnUpdate(result.data.qty, nRow, 4,
											false);
									oTable.fnUpdate(result.data.repeantcount,
											nRow, 6, false);
									oTable.fnUpdate(result.data.feedbackDate
											.replace(/,/g, '<br/>'), nRow, 7,
											false);
									oTable.fnUpdate(result.data.totalAmount,
											nRow, 8, false);
									oTable.fnUpdate(
											result.data.packDiscountAmount,
											nRow, 9, false);
									oTable.fnUpdate(
											result.data.grandTotalAmount, nRow,
											10, false);
									oTable.fnUpdate(result.data.respondent,
											nRow, 11, false);
									oTable.fnUpdate(result.data.feedback, nRow,
											12, false);
									oTable.fnUpdate(result.data.feedbackDate
											.replace(/,/g, "<br>"), nRow, 13,
											false);
									oTable
											.fnUpdate(
													'<a class="edit" href=""><i class="fa fa-pencil-square-o fa-lg"></i></a>',
													nRow, 14, false);
									oTable
											.fnUpdate(
													'<a class="delete" href=""><i class="fa fa-trash fa-lg"></i></a>',
													nRow, 15, false);
									oTable.fnDraw();
									CRSWebUtils.showAlert("success", "check",
											"Амжилттай хадгалагдлаа.", 0);
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
												"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
												0);
							}
						});
			}
		}

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate(jqInputs[3].checked, nRow, 3, false);
			oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
			oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
			oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
			oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
			oTable.fnUpdate(jqInputs[8].value, nRow, 8, false);
			oTable.fnUpdate(jqInputs[9].checked, nRow, 9, false);
			oTable.fnUpdate(jqInputs[10].value, nRow, 10, false);
			oTable.fnUpdate(jqInputs[11].value, nRow, 11, false);
			oTable.fnUpdate(jqSelects[0].value, nRow, 12, false);
			oTable.fnUpdate('<a class="edit" href="">Засах</a>', nRow, 14,
					false);
			oTable.fnDraw();
		}

		var table = $('#orderVisitGrave_editable_1');

		var oTable = table
				.dataTable({
					"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
					// set the initial value
					"pageLength" : 15,
					"bLengthChange" : false,

					"bPaginate" : false,
					"bFilter" : false,
					"bInfo" : false,
					"opts" : {
						language : 'en',
						format : 'DD.MM.YYYY',
						pickTime : false,
						daysOfWeekDisabled : [ 0, 6 ]
					},
					"columnDefs" : [
							{ // set default column settings
								'orderable' : false,
								'targets' : [ 3, 4, 6, 7, 8, 9, 10, 11, 12, 13,
										14, 15, 16 ]
							},
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
								"targets" : 5,
								"visible" : false,
							},
							{
								"targets" : 12,
								render : function(data, type, row) {
									var checked = false;
									if (data
											&& data.indexOf
											&& data.indexOf('checked="true"') > 0)
										checked = true;
									else if (data === true)
										checked = true;

									if (checked)
										return '<span checked="true">Тийм</span>';
									return '<span checked="false">Үгүй</span>';
								},
								className : "dt-body-center"
							},
							{
								"render" : function(data, type, row) {
									if (row[17] == "false") {
										return '<td><a class="edit" href="javascript:;"> <i class="fa fa-pencil-square-o fa-lg"></i> </a></td>';
									} else {
										return '<td><p><i class="fa fa-pencil-square-o fa-lg"></i></p></td>';
									}

								},
								"targets" : 14
							},
							{
								"render" : function(data, type, row) {
									if (row[17] == "false") {
										return '<td><a class="delete" href="javascript:;"> <i class="fa fa-trash fa-lg"></i> </a></td>';
									} else {
										return '<td><p> <i class="fa fa-trash fa-lg"></i> </p></td>';
									}
								},
								"targets" : 15
							}, {
								"targets" : 16,
								"visible" : false,
							} ],

					"order" : [ [ 0, "asc" ] ],
					"language" : CRSWebUtils.dtLangMN
				// set first column as a default sort by asc
				});

		var tableWrapper = $("#orderVisitGrave_editable_1_new_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#orderVisitGrave_editable_1_new')
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

							var aiNew = oTable.fnAddData([ '', '', '', '', '',
									'', '', '', '', '', '', '', '', '', '', '',
									'', '', '', '', '', '' ]);
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
							param.orderVisitGraveId = $("#id").val();
							param.detailId = rowData[0];

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
														url : "/orderVisitGrave/delete",
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
		
		

	}
	return {
		init : function() {
			handleOrderVisitGraveForm();

			$("#executeDate").datetimepicker({
				autoclose : true,
				isRTL : false,
				format : "yyyy.mm.dd hh:ii",
				pickerPosition : "bottom-left"
			});

		}
	};
}();
