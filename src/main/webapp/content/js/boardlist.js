var boardEditable = function() {

	var handle = function() {

		// service
		var serviceChangeHandler = function(serviceId, boardId) {
			$('#' + serviceId).change(
							function() {
								var csrf = $("#__csrf__").val();
								var param = {};
								param._csrf = csrf;
								param.service = $('#' + serviceId).val();
								$
										.ajax({
											type : "POST",
											url : "/board/getboardtype",
											async : true,
											dataType : "json",
											data : param,
											success : function(result) {
												if (result.success == true) {
													// board type d option nemeh
													$('#' + boardId + ' option').remove();
													var $option = $('<option>').val("").text("Cонгох...")
													$('#' + boardId).append($option);
													for ( var i in result.data) {
														var $option = $('<option>').val(result.data[i].id).text(result.data[i].name)
														$('#' + boardId).append($option);
													}
												} else {
													CRSWebUtils
															.showAlert("danger","warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",0);
												}
											},
											error : function() {
												CRSWebUtils.showAlert("danger","warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",0);
											}
										});
							});
		}

		serviceChangeHandler('service', 'boardType')
		serviceChangeHandler('dialogService', 'dialogBoardType')
		$('#service').change();
		// //////////////////////////// board type

		// /combo
		var boardChangeHandler = function(boardId, sectorId) {
			$('#' + boardId).change(
							function() {
								if ($("#service option:selected").val() != "") {
									var csrf = $("#__csrf__").val();
									var param = {};
									param._csrf = csrf;
									var loc = location.href.replace(/list/i, 'getboardsector');
									param.boardType = $("#" + boardId).val();
									$
											.ajax({
												type : "POST",
												url : loc,
												async : true,
												dataType : "json",
												data : param,
												success : function(result) {
													if (result.success == true) {
														// board sector d option
														// nemeh
														$('#' + sectorId + ' option').remove();
														var $option = $('<option>').val("").text("Cонгох...")
														$('#' + sectorId).append($option);
														for ( var i in result.data) {
															var $option = $('<option>').val(result.data[i].id).text(result.data[i].name)
															$('#' + sectorId).append($option);
														}
													} else {
														CRSWebUtils.showAlert("danger","warning",result.message,0);
													}
												},
												error : function() {
													CRSWebUtils.showAlert("danger","warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",0);
												}
											});
								} else {
									CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг сонгоно уу.", 0);
								}
							});
		}
		// ///////////////////////////// SECTOR

		boardChangeHandler('boardType', 'boardSector')
		boardChangeHandler('dialogBoardType', 'dialogBoardSector')

		$('#boardSector')
				.change(
						function() {
							if ($("#boardType option:selected").val() != ""
									&& $("#service option:selected").val() != ""
									&& $("#boardSector option:selected").val() != "") {
								var csrf = $("#__csrf__").val();
								var param = {};
								param._csrf = csrf;
								param.id = $("#boardSector").val();
								$("#sectorId").val($("#boardSector").val());
								$.ajax({
											type : "POST",
											url : "/board/sector/get",
											async : true,
											dataType : "json",
											data : param,
											success : function(result) {
												if (result.success == true) {
													var url = result.data.imageUrl;
													if (url != null)
														$('#sectorImage').attr('src',url.replace('//','/'));
													else
														$('#sectorImage').attr('src', null);
													var rowCount = result.data.rowCount;
													$("#myList").children().remove();
													// ////////////////////board
													var csrf = $("#__csrf__").val();
													var param = {};
													param._csrf = csrf;
													param.id = $("#boardSector").val();
													$.ajax({
																type : "POST",
																url : "/board/board/get",
																async : true,
																dataType : "json",
																data : param,
																success : function(result) {
																	var data = result.data.boardList
																	var boardSector = result.data.boardSector
																	data.sort(function(a,b) {
																				return a.board.boardNumber - b.board.boardNumber
																			});
																	for (var i = 0; i < rowCount; i++) {
																		$("#myList").append('<ul id="row'
																								+ i
																								+ '">'
																								+ (i + 1)
																								+ '-р эгнээ </ul>');
																	}
																	for ( var i in data) {
																		var colors = [
																				"white",
																				"red",
																				"yellow",
																				"green" ];
																		var images = [
																				"",
																				"imageCalled",
																				"imageChangedPhone",
																				"imageNotConnect" ];
																		var color = 0;
																		var image = 0;
																		var boardItem = data[i]
																		var contractEndDate = ''
																		if (boardSector.dayOrForever == 'day') {
																			if (boardItem.contractEndDate !== null) {
																				contractEndDate = new Date(boardItem.contractEndDate)
																				var d = new Date();
																				var diff = parseInt((contractEndDate - d) / (1000 * 60 * 60 * 24));
																				if (diff < 0) {
																					color = 1;
																					if (boardItem.callStatus == 'called') {
																						image = 1;
																					} else if (boardItem.callStatus == 'changePhone') {
																						image = 2;
																					} else if (boardItem.callStatus == 'notConnect') {
																						image = 3;
																					}
																				}
																				if (diff >= 0
																						&& diff < 15) {
																					color = 2;
																					if (boardItem.callStatus == 'called') {
																						image = 1;
																					} else if (boardItem.callStatus == 'changePhone') {
																						image = 2;
																					} else if (boardItem.callStatus == 'notConnect') {
																						image = 3;
																					}
																				}
																				if (diff > 14) {
																					color = 3;
																				}
																			}

																		} else {
																			if (boardItem.hasBoardRegist) {
																				color = 3;
																			} else {
																				color = 0;
																			}
																		}
																		$('#row' + data[i].board.rowNumber).append(
																						'<li class="item '
																								+ colors[color]
																								+ ' '
																								+ images[image]
																								+ ' '
																								+ '" onclick="clickLi(this)" id="'
																								+ data[i].board.id
																								+ '" data-contractEndDate="'
																								+ contractEndDate
																								+ '">'
																								+ data[i].board.boardNumber
																								+ '</li>');
																	}
																},
																error : function() {
																	CRSWebUtils.showAlert("danger","warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",0);
																}
															});
												} else {
													CRSWebUtils.showAlert("danger","warning",result.message, 0);
													$("#sectorNote").val("");
													$("#sectorImage").val(null);
												}
											},
											error : function() {
												CRSWebUtils.showAlert("danger","warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",0);
											}
										});
							}

							var csrf = $("#__csrf__").val();
							var param1 = {};
							param1._csrf = csrf;
							param1.dayOrForever = $(this).val();
							$
									.ajax({
										type : "POST",
										url : "/board/sector/getDayOrForever",
										async : true,
										dataType : "json",
										data : param1,
										success : function(result) {
											if (result.success == true) {
												if (result.data == 1) {
													$('#forever').hide();
													$('#day').show();
													$('#dayExtend').show();
												} else {
													$('#forever').show();
													$('#day').hide();
													$('#dayExtend').hide();
												}
											} else {
												CRSWebUtils.showAlert("danger","warning",result.message, 0);
											}
										},
										error : function() {
											CRSWebUtils.showAlert("danger","warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",0);
										}
									});

						});
		// /////////////////////////orders

		$('#dialogBoardSector')
				.change(
						function() {
							if ($(this).val() != "") {
								var csrf = $("#__csrf__").val();
								var param = {};
								param._csrf = csrf;
								param.id = $(this).val();
								$
										.ajax({
											type : "POST",
											url : "/board/getOtherBoards",
											async : true,
											dataType : "json",
											data : param,
											success : function(result) {
												if (result.success == true) {
													$('#boardNumb option')
															.remove();
													var $option = $('<option>')
															.val("")
															.text("Cонгох...")
													$('#boardNumb').append(
															$option);
													for ( var i in result.data) {
														var $option = $(
																'<option>')
																.val(
																		result.data[i].id)
																.text(
																		result.data[i].boardNumber)
														$('#boardNumb').append(
																$option);
													}
												} else {
													CRSWebUtils.showAlert(
															"danger",
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
							}
						})

		$('#saveBoardToAnother')
				.click(
						function() {
							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.id = $('#id').val()
							param.boardId = $('#boardNumb').val();
							$
									.ajax({
										type : "POST",
										url : "/board/saveBoardToAnother",
										async : true,
										dataType : "json",
										data : param,
										success : function(result) {
											if (result.success) {
												CRSWebUtils
														.showAlert(
																"success",
																"check",
																"Амжилттай хадгалагдлаа.",
																10,
																"#pnlModalMessage");
												$('#boardSector').change();
											} else {
												CRSWebUtils.showAlert("danger",
														"warning",
														result.message, 10,
														"#pnlModalMessage");
											}
										},
										error : function() {
											CRSWebUtils
													.showAlert(
															"danger",
															"warning",
															"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
															0,
															"#pnlModalMessage");
										}
									});
						})

		$('#saveBoardToStupa')
				.click(
						function() {
							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							console.log(param)
							param.stupaId = $('#stupaList').val()
							param.clientId = $('#client').val();
							param.orderId = $('#orderId').val()
							$
									.ajax({
										type : "POST",
										url : "/board/saveBoardToStupa",
										async : true,
										dataType : "json",
										data : param,
										success : function(result) {
											if (result.success) {
												CRSWebUtils
														.showAlert(
																"success",
																"check",
																"Амжилттай хадгалагдлаа.",
																10,
																"#pnlModalMessage");
												$('#boardSector').change();
											} else {
												CRSWebUtils.showAlert("danger",
														"warning",
														result.message, 10,
														"#pnlModalMessage");
											}
										},
										error : function() {
											CRSWebUtils
													.showAlert(
															"danger",
															"warning",
															"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
															0,
															"#pnlModalMessage");
										}
									});
						})

		$("#code")
				.change(
						function() {
							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.code = $("#code").val();
							$
									.ajax({
										type : "POST",
										url : "/board/list/getorder",
										async : true,
										dataType : "json",
										data : param,
										success : function(result) {
											if (result.success == true) {
												if (result.data != null) {
													$('#clientcode').val(
															result.data.code);
													$('#clientage').val(
															result.data.age);
													$('#clientgender').val(
															result.data.gender);
													
													if(result.data.gender == 0){
														$('#clientgender').val("Эм");
													} else {
														$('#clientgender').val("Эр");
													}
													
													$('#clientfname').val(
															result.data.fname);
													$('#clientlname').val(
															result.data.lname);
													$('#clientdeathDate')
															.val(
																	result.data.deathDate);
													$('#clientclientDescrip')
															.val(
																	result.data.clientDescrip);
													$('#orderId')
															.val(
																	result.data.orderId);
													$('#client').val(
															result.data.client);
													var url = result.data.imageUrl;
													if (url != null)
														$('#clientcImage')
																.attr(
																		'src',
																		url
																				.replace(
																						'//',
																						'/'));
													else
														$('#clientcImage')
																.attr('src',
																		null);
												} else {
													CRSWebUtils
															.showAlert(
																	"danger",
																	"warning",
																	"Энэ захиалга бүртгэгдсэн байна.",
																	0,
																	"#pnlModalMessage");
												}
											} else {
												CRSWebUtils
														.showAlert(
																"danger",
																"warning",
																"Ийм кодтой захиалга алга байна.",
																0,
																"#pnlModalMessage");
											}
										},
										error : function() {
											CRSWebUtils
													.showAlert(
															"danger",
															"warning",
															"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
															0,
															"#pnlModalMessage");
										}
									});
						});
		// /////////////////////////board regist

		$('#saveBoardRegist')
				.click(
						function() {

							if (!$('#boardRegist-form').validate().form()) {
								return false;
							}
							Metronic.startPageLoading({
								animate : true
							});
							var formData = new FormData();
							formData.append('_csrf', $("#__csrf__").val());
							if ($('#orderId').val() != "")
								formData.append('orderId', $('#orderId').val());
							if ($('#client').val() != "")
								formData.append('client', $('#client').val());
							if ($('#board').val() != "")
								formData.append('board', $("#board").val());
							formData.append('contractNumber', $(
									'#contractNumber').val());
							formData.append('boardStatus', $('#boardStatus')
									.val());
							formData.append('callStatus', $('#callStatus')
									.val());
							formData.append('contractBegDate', $(
									'#contractBegDate').val());
							formData.append('contractEndDate', $(
									'#contractEndDate').val());
							formData.append('funerary', $("#funerary").val());
							formData.append('funeraryPlace',
									$("#funeraryPlace").val());
							formData.append('paymentType', $("#paymentType")
									.val());
							if ($("#overDays").val() != "") {
								formData.append('overDays', $('#overDays')
										.val());
							}
							if ($("#extendDays").val() != "") {
								formData.append('extendDays', $("#extendDays")
										.val());
							}
							if ($("#extendPayment").val() != "") {
								formData.append('extendPayment', $(
										"#extendPayment").val());
							}
							if ($("#totalPayment").val() != "") {
								formData.append('totalPayment', $(
										"#totalPayment").val());
							}
							formData.append('setBoardDate', $("#setBoardDate")
									.val());
							formData.append('paymentDate', $("#paymentDate")
									.val());
							formData.append('conName', $("#conName").val());
							formData.append('conPhoneNumber', $(
									"#conPhoneNumber").val());

							if ($("#discountPercent").val() != "") {
								formData.append('discountPercent', $(
										"#discountPercent").val());
							}

							if ($("#discountAmount").val() != "") {
								formData.append('discountAmount', $(
										"#discountAmount").val());
							}

							if ($("#grandTotalAmount").val() != "") {
								formData.append('grandTotalAmount', $(
										"#grandTotalAmount").val());
							}

							formData.append('discountNote', $("#discountNote")
									.val());

							if ($("#conRelation").val() != "") {
								formData.append('conRelation',
										$("#conRelation").val());
							}

							var thingsImage = $("#thingsImage");
							if (thingsImage.length > 0) {
								var fileslist = thingsImage[0].files;
								if (thingsImage.length > 0 && fileslist[0]) {
									fileslist = fileslist[0];
									formData.append('thingsImage', fileslist);
								}
							}

							formData.append('note', $("#note").val());

							$
									.ajax({
										type : "POST",
										url : "/board/list/regist",
										async : true,
										data : formData,
										dataType : "json",
										contentType : false,
										processData : false,
										success : function(result) {

											if (result.success) {
												CRSWebUtils
														.showAlert(
																"success",
																"check",
																"Амжилттай хадгалагдлаа.",
																10,
																"#pnlModalMessage");
												$('#boardSector').change();
											} else {
												CRSWebUtils.showAlert("danger",
														"warning",
														result.message, 10,
														"#pnlModalMessage");
											}

											Metronic.stopPageLoading();
										},
										error : function(jqXHR, textStatus,
												errorThrown) {

											if (jqXHR.status !== 200) {
												CRSWebUtils
														.showAlert(
																"danger",
																"warning",
																"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
																0,
																"#pnlModalMessage");
											} else {
												CRSWebUtils
														.showAlert(
																"success",
																"check",
																"Амжилттай хадгалагдлаа.",
																0,
																"#pnlModalMessage");
											}

											Metronic.stopPageLoading();
										}
									});
						});
	};

	return {
		// main function to initiate the module
		init : function() {
			handle();
		},
	};

}();

var boardTableEditable = function() {

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
			jqTds[0].innerHTML = '<input type="text" class="form-control date" value="'
					+ aData.setDate + '"/>';

			jqTds[1].innerHTML = '<input type="text" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData.name + '">';

			jqTds[2].innerHTML = '<input type="text" style="width: 100% !important;" class="form-control input-small" value="'
					+ aData.countNumber + '">';

			jqTds[3].innerHTML = '<a class="edit" href="" method="save">Хадгалах</a>';

			// Datepicker
			$('.date').datepicker({
				format : "yyyy.mm.dd"
			});
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);

			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;

			var rowData = oTable.DataTable().row(nRow).data();

			param.myId = rowData[0];
			param.myBoardId = $("#id").val();
			param.mySetDate = jqInputs[0].value;
			param.myName = jqInputs[1].value;
			param.myCountNumber = jqInputs[2].value;

			$.ajax({
				type : "POST",
				url : "/board/list/itemregist",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {

						oTable.fnUpdate(result.data.id, nRow, 0, false);
						oTable.fnUpdate(result.data.setDate, nRow, 1, false);
						oTable.fnUpdate(result.data.name, nRow, 2, false);
						oTable
								.fnUpdate(result.data.countNumber, nRow, 3,
										false);
						oTable.fnUpdate('<a class="delete" href="">Устгах</a>',
								nRow, 4, false);
						oTable.fnDraw();

						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 5,
								"#pnlModalMessageTable");
					} else {
						alert(result.message);
						CRSWebUtils.showAlert("danger", "warning",
								result.message, 5, "#pnlModalMessageTable");
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 5,
							"#pnlModalMessageTable");
				}
			});

		}

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
			oTable
					.fnUpdate('<a class="edit" href="">Засах</a>', nRow, 4,
							false);
			oTable.fnDraw();
		}

		var table = $('#board_editable_1');

		var oTable = table
				.dataTable({
					columns : [ {
						"data" : "id"
					}, {
						"data" : "setDate"
					}, {
						"data" : "name"
					}, {
						"data" : "countNumber"
					} ],
					"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
					// set the initial value
					"pageLength" : 20,
					"bLengthChange" : false,
					"bPaginate" : false,
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
								"render" : function(data, type, row) {
									return '<td><a class="delete" href="javascript:;"> Устгах </a></td>';
								},
								"targets" : 4
							} ],
					"order" : [ [ 1, "asc" ] ]
				// set first column as a default sort by asc
				});

		var tableWrapper = $("#board_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		$('#board_editable_1_new')
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

							var aiNew = oTable.fnAddData({
								id : '',
								setDate : '',
								name : '',
								countNumber : ''

							});
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
							param.boardItemRegistId = $('#board').val();
							param.itemId = rowData['id'];
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
														url : "/board/list/itemregist/delete",
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
																				5,
																				"#pnlModalMessageTable");
															} else {
																CRSWebUtils
																		.showAlert(
																				"danger",
																				"warning",
																				result.message,
																				5,
																				"#pnlModalMessageTable");
															}
														},
														error : function() {
															CRSWebUtils
																	.showAlert(
																			"danger",
																			"warning",
																			"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
																			5,
																			"#pnlModalMessageTable");
														}
													});
										}
									});
						});

		table.on('click', '.cancel', function(e) {
			e.preventDefault();
			// буцах үе
			restoreRow(oTable, nEditing);
			nEditing = null;
			nNew = false;

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

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};

}();

var BoardRegistForm = function() {

	var handleBoardRegistForm = function() {

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#boardRegist-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				code : {
					required : true
				},
				funerary : {
					required : true
				},
				funeraryPlace : {
					required : true
				},
				setBoardDate : {
					required : true
				},
				conName : {
					required : true
				},
				conPhoneNumber : {
					required : true,
					regex : /^[0-9]/
				},
				conRelation : {
					required : true
				},
				extendPayment : {
					regex : /^[0-9]/
				},
				allPayment : {
					regex : /^[0-9]/
				},
				addDay : {
					regex : /^[0-9]/
				},
				contractNumber : {
					required : true
				},
				contractBegDate : {
					required : true
				},
				contractEndDate : {
					required : true
				},
			},

			messages : {
				code : {
					required : "Бурхан болоочийн код оруулна уу."
				},
				funerary : {
					required : "Чандарын савыг сонгоно уу."
				},
				funeraryPlace : {
					required : "Чандарын байршилыг сонгоно уу."
				},
				setBoardDate : {
					required : "Огноо оруулна уу."
				},
				conName : {
					required : "Холбоо барих хүний нэрийг оруулна уу."
				},
				conPhoneNumber : {
					required : "Утасны дугаар оруулна уу.",
					regex : "Тоо оруулна уу"
				},
				conRelation : {
					required : "Холбоо хамааралыг оруулна уу."
				},
				extendPayment : {
					required : "Тоо оруулна уу."
				},
				allPayment : {
					required : "Тоо оруулна уу."
				},
				addDay : {
					required : "Тоо оруулна уу."
				},
				contractNumber : {
					required : "Гэрээний дугаараа оруулна уу."
				},
				contractBegDate : {
					required : "Гэрээний эхлэх огноогоо оруулна уу."
				},
				contractEndDate : {
					required : "Гэрээний дуусах огноогоо оруулна уу."
				},
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
		});
	}
	return {
		// main function to initiate the module
		init : function() {
			handleBoardRegistForm();
		}
	};
}();

function clearForm() {
	$('#code').val("");
	$('#clientlname').val("");
	$('#clientfname').val("");
	$('#clientcImage').val("");
	$('#clientage').val("");
	$('#clientgender').val("");
	$('#clientcode').val("");
	$('#clientdeathDate').val("");
	$('#clientclientDescrip').val("");
	$("#funerary").val("");
	$("#funeraryPlace").val("");
	$('#setBoardDate').val("");
	$('#contractNumber').val("");
	$('#contractBegDate').val("");
	$('#contractEndDate').val("");
	$('#paymentDate').val("");
	$('#overDays').val("");
	$("#paymentType").val("");
	$('#extendDays').val("");
	$('#extendPayment').val("");
	$('#totalPayment').val("");
	$('#conName').val("");
	$('#conPhoneNumber').val("");
	$('#note').val("");
	$("#conRelation").val("");
}

function getDateString(date) {

	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth() + 1).toString();
	var dd = date.getDate().toString();

	return yyyy + "." + (mm[1] ? mm : "0" + mm[0]) + "."
			+ (dd[1] ? dd : "0" + dd[0]);

};

var clickLi = function(li) {
	$('#boardNumber').val($(li).text());
	$('#board').val($(li).attr('id'));
	$("#boardRegist").modal();

};

var statusOptions = $('#boardStatus').html()

$(document).on(
		'click',
		'.item',
		function() {
			clearForm();
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			var id = $(this).attr('id');
			param.board = id;
			param.sectorId = $("#sectorId").val();
			$.ajax({
				type : "POST",
				url : "/board/getBoardItem",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					$('#boardStatus').html(statusOptions)
					if (result.boardStatus == 'registering') {
						$('#boardStatus option:last').remove()
					} else if (result.boardStatus == 'confirmed') {
						$('#boardStatus option:first').remove()
					} else if (result.boardStatus == 'extendContract') {
						$('#boardStatus option:first').remove()
					}
					$("#boardDayOrForeverEnum").val(result.boardDayOrForever);
					$("#boardPrice").val(result.boardSectorPrice);
					$('#boardStatus').val(result.boardStatus);
					$('#callStatus').val(result.callStatus);
					$('#id').val(result.id);
					$('#code').val(result.code);
					$('#orderId').val(result.orderId);
					$('#client').val(result.client);
					$('#clientlname').val(result.clientlname);
					$('#clientfname').val(result.clientfname);
					$('#clientage').val(result.clientage);
					$('#clientgender').val(result.clientgender);
					
					if(result.clientgender == 0){
						$('#clientgender').val("Эм");
					} else {
						$('#clientgender').val("Эр");
					}
					
					$('#clientcode').val(result.clientcode);
					$('#clientdeathDate').val(result.clientdeathDate);
					$('#clientclientDescrip').val(result.clientclientDescrip);
					$("#funerary option[value = " + result.funerary + " ] ")
							.attr("selected", true);
					$(
							"#funeraryPlace option[value = "
									+ result.funeraryPlace + " ] ").attr(
							"selected", true);
					$('#setBoardDate').val(result.setBoardDate);
					$('#contractNumber').val(result.contractNumber);
					$('#contractBegDate').val(result.contractBegDate);
					$('#contractEndDate').val(result.contractEndDate)
					$('#paymentDate').val(result.paymentDate);
					$('#overDays').val(result.overDays);
					$(
							"#paymentType option[value = " + result.paymentType
									+ " ] ").attr("selected", true);
					$('#extendDays').val(result.extendDays);
					$('#extendPayment').val(result.extendPayment);
					$('#totalPayment').val(result.totalPayment);
					$('#conName').val(result.conName);
					$('#conPhoneNumber').val(result.conPhoneNumber);
					$('#discountPercent').val(result.discountPercent);
					$('#discountAmount').val(result.discountAmount);
					$('#discountNote').val(result.discountNote);
					$('#grandTotalAmount').val(result.grandTotalAmount);
					$('#note').val(result.note);
					$(
							"#conRelation option[value = " + result.conRelation
									+ " ] ").attr("selected", true);
					var image;
					if (result.clientcImage != undefined
							&& result.clientcImage != null) {
						image = result.clientcImage.replace('//', '/');
					}
					$('#clientcImage').attr('src', image);
					var dataTable = $('#board_editable_1').dataTable();
					dataTable.fnClearTable();
					if (result.Items && result.Items.length > 0) {
						dataTable.fnAddData(result.Items);
					}
					var image1;
					if (result.image != undefined && result.image != null) {
						image1 = result.image.replace('//', '/');
					}
					$('#boardItemImage').attr('src', image1);
					var formId = 'boardRegist-form';
					enableAllInput(formId);

					if ($('#boardStatus').val() == "registering") {
						$('#changeToAnother').hide();
						$('#changeToStupa').hide();
						$('#itemRegist').hide();
						disableInput('userInfo', [ 'code' ])
						disableInput('agreementInfo', [ 'contractNumber',
								'contractBegDate', 'contractEndDate',
								'extendPayment', 'paymentDate', 'paymentType',
								'extendDays', 'conRelation', 'conPhoneNumber',
								'conName', 'discountPercent', 'discountAmount', 'discountNote',
								'note' ]);
					} else if ($('#boardStatus').val() == "confirmed") {
						$('#changeToAnother').show();
						$('#itemRegist').show();
						$('#changeToStupa').show();
						disableInput(formId, [ 'boardStatus', 'dialogService',
								'dialogBoardType', 'dialogBoardSector',
								'boardNumb', 'callStatus', 'funeraryPlace', 'stupaList' ])
					} else if ($('#boardStatus').val() == "extendContract") {
						disableInput(formId, [ 'boardStatus', 'dialogService',
								'dialogBoardType', 'dialogBoardSector',
								'boardNumb', 'extendDays', 'callStatus',
								'funeraryPlace', 'stupaList' ])
					}

					if ($('#boardDayOrForeverEnum').val() == "forever") {
						$('#hideExtendDays').hide();
						$('#hideExtendPayment').hide();
						$('#hideOverDays').hide();
						$('#callStat').hide();
						if (result.boardStatus == 'confirmed') {
							$('#boardStatus option:last').remove();
						}
						$('#funeraryPlace option[value="itself"]').hide();
					} else {
						$('#hideExtendDays').show();
						$('#hideExtendPayment').show();
						$('#hideOverDays').show();
						$('#callStat').show();
						$('#funeraryPlace option[value="itself"]').show();
					}
				}
			});
		});

$('#deleteBoardRegist')
		.click(
				function() {
					var csrf = $("#__csrf__").val();
					var param = {};
					param._csrf = csrf;
					param.board = $("#board").val();
					param.boardRegist = $('#id').val();
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
												url : "/board/regist/delete",
												async : true,
												dataType : "json",
												data : param,
												success : function(result) {
													if (result.success == true) {
														CRSWebUtils
																.showAlert(
																		"success",
																		"check",
																		"Амжилттай устгагдлаа.",
																		0,
																		"#pnlModalMessage");
													} else {
														CRSWebUtils
																.showAlert(
																		"danger",
																		"warning",
																		result.message,
																		0,
																		"#pnlModalMessage");
													}
												},
												error : function() {
													CRSWebUtils
															.showAlert(
																	"danger",
																	"warning",
																	"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
																	0,
																	"#pnlModalMessage");
												}
											});
								}
							});
				});

var current = "";
$('#extendDays').change(
		function() {
			var d = new Date();
			if (current == "") {
				current = $("#contractEndDate").val();
			}
			d.setFullYear(current.split('.')[0], current.split('.')[1] - 1,
					current.split('.')[2]);
			d
					.setDate(parseInt(current.split('.')[2])
							+ parseInt($(this).val()));

			$("#contractEndDate").val(
					d.getFullYear()
							+ "."
							+ ((d.getMonth() + 1) < 10 ? "0"
									+ (d.getMonth() + 1) : (d.getMonth() + 1))
							+ "."
							+ (d.getDate() < 10 ? "0" + d.getDate() : d
									.getDate()));

			var payment = parseFloat($('#boardPrice').val());
			var extendDays = parseFloat($('#extendDays').val());
			$('#extendPayment').val(payment * extendDays);
			$('#contractEndDate').change();
			var prev = parseFloat($('#totalPayment').val());
			var real = parseFloat($('#extendPayment').val());
			$('#totalPayment').val(real + prev);

		});

$('#extendDays').keyup(
		function() {
			var d = new Date();
			if (current == "") {
				current = $("#contractEndDate").val();
			}
			d.setFullYear(current.split('.')[0], current.split('.')[1] - 1,
					current.split('.')[2]);
			d
					.setDate(parseInt(current.split('.')[2])
							+ parseInt($(this).val()));

			$("#contractEndDate").val(
					d.getFullYear()
							+ "."
							+ ((d.getMonth() + 1) < 10 ? "0"
									+ (d.getMonth() + 1) : (d.getMonth() + 1))
							+ "."
							+ (d.getDate() < 10 ? "0" + d.getDate() : d
									.getDate()));

			var payment = $('#boardPrice').val();
			var extendDays = $('#extendDays').val();
			$('#extendPayment').val(payment * extendDays);
			$('#contractEndDate').change();
			var prev = parseFloat($('#totalPayment').val());
			var real = parseFloat($('#extendPayment').val());
			$('#totalPayment').val(real + prev);

		});

$('#discountPercent').keyup(
		function() {
			var totalAmount = $('#totalPayment').val();
			var discountPercent = $('#discountPercent').val();
			var discountAmount = parseFloat(totalAmount / 100)
					* discountPercent;
			$('#discountAmount').val(discountAmount);
			var grandTotalAmount = parseFloat(totalAmount
					- $('#discountAmount').val());
			$('#grandTotalAmount').val(grandTotalAmount);
		});

function parseDate(str) {
	var mdy = str.split('.')
	return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

function daydiff(first, second) {
	return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

$('#contractEndDate').change(
		function() {
			if ($('#boardDayOrForeverEnum').val() == "day") {
				var contractBegDate = $('#contractBegDate').val();
				var contractEndDate = $('#contractEndDate').val()
				if (contractBegDate != "" && contractEndDate != "") {
					var diffDay = daydiff(parseDate(contractBegDate),
							parseDate(contractEndDate));
					var price = $('#boardPrice').val();
					var totalAmount = parseFloat(diffDay * price);
					$('#totalPayment').val(totalAmount)
				}
			}
		});

var enableInput = function(inputIds) {
	$.each(inputIds, function(index, value) {
		$('#' + value).each(function() {
			$(this).removeAttr('disabled')
		})
	})
}

var enableAllInput = function(formId) {
	$.each([ 'input', 'select', 'textarea' ], function(index, value) {
		$('#' + formId + ' ' + value).each(function() {
			$(this).removeAttr('disabled')
		})
	})
}

var disableInput = function(formId, excludeIds) {
	$.each([ 'input', 'select', 'textarea' ], function(index, value) {
		$('#' + formId + ' ' + value).each(function() {
			if ($.inArray($(this).attr('id'), excludeIds) === -1) {
				$(this).attr('disabled', 'disabled')
			}
		})
	})
}

$('#boardStatus').change(
		function() {
			var formId = 'boardRegist-form'
			if ($(this).val() == 'confirmed') {
				disableInput(formId, [ 'boardStatus', 'dialogService',
						'dialogBoardType', 'dialogBoardSector', 'boardNumb',
						'callStatus', 'funeraryPlace', 'stupaList' ])
			} else if ($(this).val() == 'extendContract') {
				disableInput(formId, [ 'boardStatus', 'dialogService',
						'dialogBoardType', 'dialogBoardSector', 'boardNumb',
						'funeraryPlace', 'stupaList' ])
				enableInput([ 'extendDays', 'callStatus' ])
			} else if ($(this).val() == 'registering') {
				enableAllInput(formId)
				disableInput('userInfo', [ 'code' ])
				disableInput('agreementInfo', [ 'contractNumber',
						'contractBegDate', 'contractEndDate', 'extendPayment',
						'paymentDate', 'paymentType', 'extendDays',
						'conRelation', 'conPhoneNumber', 'conName',
						'discountPercent', 'discountAmount', 'discountNote',
						'note' ]);
			}

		});

$('#discountAmount').keyup(function() {
	var discountAmount = ($('#discountAmount').val() * 100) / $('#totalPayment').val();
	$('#discountPercent').val(discountAmount);
	var totalPayment = $('#totalPayment').val();
	var grandTotalAmount = parseFloat(totalPayment - $('#discountAmount').val());
	$('#grandTotalAmount').val(grandTotalAmount);
});

$('.toggle').click(function() {
	$('#discountToggle').toggle();
});
