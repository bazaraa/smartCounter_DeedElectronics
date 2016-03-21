var ppTableEditable = function() {

	// Үзүүлэлт (Property) нэмэх хэсэг
	var saveProductProperty = function() {
		var csrf = $("#__csrf__").val();
		var param = {};
		param._csrf = csrf;

		var properties = [];

		$(".propertyDataCode").each(function() {
			var me = $(this);
			var index = me.attr("propertyindex");
			var value = $(".propertyDataValue" + index).val();

			var item = {
				dataCode : me.val(),
				dataValue : value
			};
			properties.push(item);
		});

		param.productCategory = {};
		param.currentProperty = {};

		param.productCategory.id = $("#productCategoryId").val();
		param.currentProperty.id = $("#currentPropertiesId").val();
		param.currentProperty.code = $("#propertyCode").val();
		param.currentProperty.name = $("#propertyName").val();
		param.currentProperty.inputType = $("#propertyInputType").val();
		param.currentProperty.active = $("#propertyActive").is(":checked");
		param.currentProperty.pPropertyData = properties;

		$
				.ajax({
					type : "POST",
					url : "/productcategory/property",
					async : true,
					contentType : "application/json; charset=utf-8",
					dataType : "json",
					data : JSON.stringify(param),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("X-CSRF-TOKEN", csrf);
					},
					success : function(result) {
						if (result.success == true) {

							$('#currentPropertiesId').val('');
							$('#propertyCode').val('');
							$("#propertyName").val('');
							$("#propertyInputType").val('');
							$("#propertyActive").attr("checked", false)
									.parent().removeClass("checked");

							$("#p_scents").html("");

							// Нэмэгдсэн жагсаалтыг шууд харуулж байна
							var dataTable = $('#pp_editable_1').dataTable();
							dataTable.fnClearTable();
							if (result.data.productCategory.pProperties.length > 0)
								dataTable
										.fnAddData(result.data.productCategory.pProperties);

							// alert("Амжилттай хадгалагдлаа.");
							bootbox.alert("Амжилттай хадгалагдлаа.");
						} else {
							alert(result.message);
						}
					},
					error : function() {
						bootbox
								.alert("Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.");
					}
				});

	};

	// Үзүүлэлт (Property) нэмэх хэсэг
	var clearProductProperty = function() {
		$('#currentPropertiesId').val('');
		$('#propertyCode').val('');
		$("#propertyName").val('');
		$("#propertyInputType").val('');
		$("#propertyActive").attr("checked", false).parent().removeClass(
				"checked");

		$("#p_scents").html("");

	};

	var handleTable = function() {
		var table = $('#pp_editable_1');
		var oTable = table
				.dataTable({
					"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
					columns : [ {
						"data" : 'id'
					}, {
						"data" : 'name'
					}, {
						"data" : 'code'
					}, {
						"data" : 'inputType'
					}, {
						"data" : 'active'
					} ],
					// set the initial value
					"bFilter" : false,
					"bPaginate" : true,
					"bInfo" : true,
					"pageLength" : 5,
					"bLengthChange" : false,
					"language" : CRSWebUtils.dtLangMN,
					"columnDefs" : [
							{ // set default column settings
								'orderable' : true,
								'targets' : [ 1 ]
							},
							{
								"targets" : 0,
								"visible" : false,
							},
							{
								"targets" : 3,
								render : function(data, type, row) {
									if (data == 'CB') {
										return 'COMBOBOX';
									} else if (data == 'TX') {
										return 'TEXT';
									} else if (data == 'DT') {
										return 'DATETIME';
									} else if (data == 'CH') {
										return 'CHECKBOX';
									}
								},
								className : "dt-body-center"
							},
							{
								"targets" : 4,
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
									return '<td><a class="edit" href="javascript:;"><i class="fa fa-pencil-square-o fa-lg"></i></a></td>';
								},
								"targets" : 5
							},
							{
								"render" : function(data, type, row) {
									return '<td><a class="delete" href="javascript:;"><i class="fa fa-trash fa-lg"></i></a></td>';
								},
								"targets" : 6
							} ],
					"order" : [ [ 1, "asc" ] ]
				});

		// Үзүүлэлт (Property) устгах хэсэг
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

							param.productCategory = {};
							param.currentProperty = {};
							param.productCategory.id = $("#productCategoryId")
									.val();
							param.currentProperty.id = rowData.id;
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
														url : "/productcategory/deleteproperty",
														async : true,
														contentType : "application/json;",
														dataType : "json",
														data : JSON
																.stringify(param),
														beforeSend : function(
																xhr) {
															xhr
																	.setRequestHeader(
																			"X-CSRF-TOKEN",
																			csrf);
														},
														success : function(
																result) {
															if (result.success == true) {
																$(
																		'#currentPropertiesId')
																		.val('');
																$(
																		'#propertyCode')
																		.val('');
																$(
																		"#propertyName")
																		.val('');
																$(
																		"#propertyInputType")
																		.val('');
																$(
																		"#propertyActive")
																		.attr(
																				"checked",
																				false)
																		.parent()
																		.removeClass(
																				"checked");

																$("#p_scents")
																		.html(
																				"");

																// Устгагдсан
																// жагсаалтыг
																// шууд харуулж
																// байна
																var dataTable = $(
																		'#pp_editable_1')
																		.dataTable();
																dataTable
																		.fnClearTable();
																if (result.data.productCategory.pProperties.length > 0)
																	dataTable
																			.fnAddData(result.data.productCategory.pProperties);

																bootbox
																		.alert("Амжилттай устгагдлаа.");
															} else {
																alert(result.message);
															}
														},
														error : function() {
															bootbox
																	.alert("Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.");
														}
													});
										}
									});

						});

		// Үзүүлэлт(Property) засах хэсэг
		table
				.on(
						'click',
						'.edit',
						function(e) {
							e.preventDefault();

							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents('table').DataTable()
									.row(nRow).data();

							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;

							var categoryid = $("#productCategoryId").val();
							var propertyId = rowData.id;

							$
									.ajax({
										type : "GET",
										url : "/productcategory/" + categoryid
												+ "/" + propertyId,
										async : true,
										dataType : "json",
										beforeSend : function(xhr) {
											xhr.setRequestHeader(
													"X-CSRF-TOKEN", csrf);
										},

										success : function(result) {
											if (result.success == true) {
												$("#currentPropertiesId")
														.val(
																result.data.currentProperty.id);
												$("#propertyCode")
														.val(
																result.data.currentProperty.code);
												$("#propertyName")
														.val(
																result.data.currentProperty.name);
												$("#propertyInputType")
														.val(
																result.data.currentProperty.inputType);

												if (result.data.currentProperty.active == true) {
													$("#propertyActive")
															.attr(
																	"checked",
																	result.data.currentProperty.active)
															.parent().addClass(
																	"checked");
												} else {
													$("#propertyActive")
															.attr(
																	"checked",
																	result.data.currentProperty.active)
															.parent().addClass(
																	"");
												}

												if (result.data.currentProperty.inputType == 'CB') {
													$("#p_scents").html("");
													var obj = null;
													var len = result.data.currentProperty.pPropertyData.length;
													for (var i = 0; i <= len; i++) {
														var style = result.data.currentProperty.inputType == 'CB' ? 'block'
																: 'none';
														document
																.getElementById('hidden_div').style.display = style;
														var dataCode = result.data.currentProperty.pPropertyData[i].dataCode;
														var dataValue = result.data.currentProperty.pPropertyData[i].dataValue;
														/*
														 * $('<p><label
														 * for="p_scnts">' + '<input
														 * type="text"
														 * class="form-control
														 * propertyDataCode"
														 * value="'+ dataCode
														 * +'"
														 * propertyindex="'+i+'"
														 * size="40" id="p_scnt"
														 * name="currentPropertypPropertyData['+
														 * i +'].dataCode"/>' + '<br/>' + '<input
														 * type="text"
														 * class="form-control
														 * propertyDataValue'+ i
														 * +'" value="'+
														 * dataValue +'"
														 * size="40" id="p_scnt"
														 * name="currentProperty.pPropertyData['+
														 * i +'].dataValue" />' + '</label>' + '<a
														 * href="#"
														 * id="remScnt">Устгах</a>' + '</p>').appendTo('#p_scents');
														 */

														$(
																'<p><label for="p_scnts">'
																		+ '<input type="text" class="form-control propertyDataCode" value="'
																		+ dataCode
																		+ '" propertyindex="'
																		+ i
																		+ '" size="40" name="currentPropertypPropertyData['
																		+ i
																		+ '].dataCode"/>'
																		+ '<br/>'
																		+ '<input type="text" class="form-control propertyDataValue'
																		+ i
																		+ '" value="'
																		+ dataValue
																		+ '" size="40" name="currentProperty.pPropertyData['
																		+ i
																		+ '].dataValue" />'
																		+ '</label>'
																		+ '<a href="#" id="remScnt">Устгах</a>'
																		+ '</p>')
																.appendTo(
																		'#p_scents');

														$('#remScnt')
																.live(
																		'click',
																		function() {
																			if (i >= 0) {
																				$(
																						this)
																						.parents(
																								'p')
																						.remove();
																				i--;
																			}
																			return false;
																		});
													}
												} else {
													var style = result.data.currentProperty.inputType == 'CB' ? 'block'
															: 'none';
													document
															.getElementById('hidden_div').style.display = style;
													$("#p_scents").html("");
												}

											} else {
												alert(result.message);
											}
										},
										error : function() {
											alert("Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.");
										}
									});

						});
	}

	return {

		// main function to initiate the module
		init : function() {
			handleTable();

			$("#btnSaveProductProperty").click(function() {
				saveProductProperty();
			});

			$("#resetFunc").click(function() {
				clearProductProperty();
			});

		},

	};

}();

// ------------------------------------------------------------------------

$("#resetFunc").click(
		function() {
			$('#currentPropertiesId').val('');
			$('#propertyCode').val('');
			$("#propertyName").val('');
			$("#propertyInputType").val('');
			$("#propertyActive").attr("checked", false).parent().removeClass(
					"checked");
			$("#p_scents").html("");
		});

// ComboBox сонгох үед харагдах
document.getElementById('propertyInputType').addEventListener('change',
		function() {
			var style = this.value == 'CB' ? 'block' : 'none';
			document.getElementById('hidden_div').style.display = style;
		});
// Нэмэх хэсэг
$(function() {
	var scntDiv = $('#p_scents');
	var i = $('#p_scents p').size() - 1;

	$('#addScnt')
			.live(
					'click',
					function() {
						$(
								'<p><label for="p_scnts">'
										+ '<input type="text" class="form-control propertyDataCode" propertyindex="'
										+ i
										+ '" size="40" id="p_scnt" name="currentPropertypPropertyData['
										+ i
										+ '].dataCode" placeholder="Код" />'
										+ '<br/>'
										+ '<input type="text" class="form-control propertyDataValue'
										+ i
										+ '" size="40" id="p_scnt" name="currentProperty.pPropertyData['
										+ i
										+ '].dataValue" placeholder="Утга" />'
										+ '</label>'
										+ '<a href="#" id="remScnt">Устгах</a>'
										+ '</p>').appendTo(scntDiv);
						i++;
						return false;
					});

	$('#remScnt').live('click', function() {
		if (i >= 0) {
			$(this).parents('p').remove();
			i--;
		}
		return false;
	});
});
// Модны эх үүсгэх
$("#saveRoot").click(function(){
	var nameval = document.getElementById("saveValue");
	var csrf = $("#__csrf__").val();
	var param = {};
	param._csrf = csrf;

	param.parent = "0";
	param.name = nameval.value;
	param.position = "1";
	param.related = "";
	param.type = "folder";
	param.catLevel = "1";

	if (nameval.value == "") {
		$('#small').modal('hide');
		CRSWebUtils.showAlert("danger", "warning", "Ангилалын нэр оруулна уу.", 0);
	} else {
		$.ajax({
			type : "POST",
			url : "/productcategory",
			async : true,
			dataType : "json",
			data : param,
			success : function(result) {
				if (result.success == true) {
					CRSWebUtils.showAlert("success", "check",
							"Амжилттай хадгалагдлаа.", 0);
					location.reload();
				} else {
					alert(result.message);
					CRSWebUtils.showAlert("danger", "warning", result.message,
							0);
				}
			},
			error : function() {
				CRSWebUtils.showAlert("danger", "warning",
						"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
			}
		});
	}
});