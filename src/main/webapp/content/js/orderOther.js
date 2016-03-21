var OrderOtherForm = function() {

	var handleOrderOtherForm = function() {

		$('#orderOther-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {

			},
			messages : {

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

		$('#orderOther-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#orderOther-form').validate().form()) {
					$('#orderOther-form').submit();
				}
				return false;
			}
		});
	}

	var onChangeProductType = function(obj) {
		Metronic.startPageLoading({
			animate : true
		});

		var me = $(obj);
		var pnlParent = me.closest(".pnlOtherDetailProduct");

		OrderOtherForm.onInitControlCar(pnlParent.attr("id"));

		var cmbProduct = pnlParent.find(".cmbProduct");
		cmbProduct.html('<option value="">Сонгох...</option>');

		var packId = -1;
		var productTypeId = -1;

		if ($("#optionsTypePack").is(":checked"))
			packId = $("#productPack").find('option:selected').val();
		if (me.find('option:selected').val() != "")
			productTypeId = me.find('option:selected').val();

		OrderOtherForm.clearValuesOnChangeProduct(pnlParent.attr("id"));

		$.ajax({
			type : "GET",
			url : "/orderOther/getproducts/" + packId + "/" + productTypeId,
			async : false,
			dataType : "json",
			success : function(result) {
				if (result.success) {
					var items = result.data;
					var len = items.length;

					for (var i = 0; i < len; i++)
						cmbProduct.append('<option value="'
								+ items[i].productId + '">'
								+ items[i].productName + '</option>');
				} else {
					CRSWebUtils.showAlert("danger", "warning", result.message,
							0);
				}
				Metronic.stopPageLoading();OrderOtherForm.onChangeProduct(this);
				
			},
			error : function() {
				Metronic.stopPageLoading();
				CRSWebUtils.showAlert("danger", "warning",
						"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
			}
		});

	};

	var onChangeProduct = function(obj) {
		Metronic.startPageLoading({
			animate : true
		});

		var me = $(obj);
		var pnlParent = me.closest(".pnlOtherDetailProduct");

		var imgProductImage = pnlParent.find(".imgProductImage");
		var txtNote = pnlParent.find(".txtNote")
		var txtProductSize = pnlParent.find(".txtProductSize");
		var txtProductPrice = pnlParent.find(".txtProductPrice");

		var txtBoxInnerColor = pnlParent.find(".txtBoxInnerColor");

		var productServiceId = me.find('option:selected').val();

		OrderOtherForm.clearValuesOnChangeProduct(pnlParent.attr("id"));

		if (productServiceId && productServiceId != ""
				&& productServiceId.length > 0) {
			$
					.ajax({
						type : "GET",
						url : "/orderOther/getproduct/" + productServiceId,
						async : false,
						dataType : "json",
						success : function(result) {

							Metronic.stopPageLoading();
							if (result.success) {
								var viewProduct = result.data;
								var properties = viewProduct.properties;
								var pnlProductProperties = pnlParent
										.find(".pnlProductProperties");

								if (viewProduct.productImageUrl)
									imgProductImage.attr("src",
											viewProduct.productImageUrl
													.replace(/\/\//g, '/'));
								
								txtNote.val(viewProduct.note);
								txtProductSize.val(viewProduct.productSize);
								txtProductPrice.val(viewProduct.productPrice);
								txtBoxInnerColor.val(viewProduct.boxInnerColor);

								pnlProductProperties.html("");
								for (var i = 0; i < properties.length; i++) {
									var value = properties[i].propertyValue;
									if (value == null) {
										value = "";
									}
									pnlProductProperties
											.append('<div class="form-group"><label class="control-label col-md-5">'
													+ properties[i].propertyText
													+ ' </label>'
													+ '	<div class="col-md-7">'
													+ '		<input type="text" class="form-control txtProductProperties"'
													+ '			autocomplete="off" readonly="readonly"'
													+ '			value="'
													+ value
													+ '" />'
													+ '	</div>'
													+ '</div>');
								}

								OrderOtherForm.calculate(pnlParent.attr("id"));

							} else {
								CRSWebUtils.showAlert("danger", "warning",
										result.message, 0);
							}
						},
						error : function() {
							Metronic.stopPageLoading();
							CRSWebUtils
									.showAlert(
											"danger",
											"warning",
											"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
											0);
						}
					});
		} else {
			Metronic.stopPageLoading();
		}

	};

	var onChangeCheckSpecial = function(obj) {
		var me = $(obj);
		var uid = me.attr("uid");

		$("#pnlSpecialInfo" + uid).toggle();

	};

	var onClickPnlDiscount = function(obj) {
		var me = $(obj);
		var uid = me.attr("uid");
		$("#pnlDiscountInfo" + uid).toggle();
	}

	var onInitControlCar = function(uniqueid) {

		var pnlParent = $("#" + uniqueid);

		var cmbProductCategory = pnlParent.find(".cmbProductCategory");
		var selectedOption = cmbProductCategory.find("option:selected");

		if (selectedOption.attr("attrtypecode") == "car") {
			pnlParent.find(".productCode").hide();
			pnlParent.find(".productImage").hide();
			pnlParent.find(".productNote").hide();
			pnlParent.find(".carScheduler").show();
			pnlParent.find(".carInfo").show();
			pnlParent.find(".carColor").show();
			pnlParent.find(".takePlace").show();
			pnlParent.find(".takeTime").show();
			pnlParent.find(".receivePlace").show();
			pnlParent.find(".receiveTime").show();
			pnlParent.find(".additionPayment").show();
			pnlParent.find(".normalPrice").show();
			pnlParent.find(".eachPrice").show();
			pnlParent.find(".remains").hide();
			pnlParent.find(".number").hide();
			pnlParent.find(".eachProductPrice").hide();
			pnlParent.find(".takeDayTime").hide();
			pnlParent.find(".fromTake").hide();
		} else {
			pnlParent.find(".productCode").show();
			pnlParent.find(".productImage").show();
			pnlParent.find(".productNote").show();
			pnlParent.find(".carScheduler").hide();
			pnlParent.find(".carInfo").hide();
			pnlParent.find(".carColor").hide();
			pnlParent.find(".takePlace").hide();
			pnlParent.find(".takeTime").hide();
			pnlParent.find(".receivePlace").hide();
			pnlParent.find(".receiveTime").hide();
			pnlParent.find(".additionPayment").hide();
			pnlParent.find(".normalPrice").hide();
			pnlParent.find(".eachPrice").hide();
			pnlParent.find(".additionKm").hide();
			pnlParent.find(".remains").show();
			pnlParent.find(".number").show();
			pnlParent.find(".eachProductPrice").show();
			pnlParent.find(".takeDayTime").show();
			pnlParent.find(".fromTake").show();
		}
		

		pnlParent.find(".notStandart").hide();
		if(selectedOption.attr("attrtypecode") == "box")
		{
			pnlParent.find(".notStandart").show();
		}
		
		pnlParent
				.find('.additionPayment')
				.unbind("change")
				.bind(
						"change",
						function() {

							var me = $(this);
							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.carTypeId = $('#carId').val();
							param.carAddition = $(
									'.additionPayment option:selected').val();

							$
									.ajax({
										type : "POST",
										url : "/orderOther/getProductPrice",
										async : false,
										dataType : "json",
										data : param,
										success : function(result) {
											if (result.success == true) {
												$(".eachPrice input").val(
														result.data);
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

							var me = $(this);
							var pnlParent = me.closest(".pnlOtherDetailProduct");

							if (pnlParent.find('.additionPayment option:selected').val() == 'hodoo') {
								pnlParent.find(".additionKm").show();
							} else {
								pnlParent.find(".additionKm").hide();
							}

							OrderOtherForm.calculate(pnlParent.attr("id"));
						});

		pnlParent
				.find('.reload')
				.unbind("click")
				.bind(
						"click",
						function() {
							var me = $(this);
							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.orderId = $('#orderId').val();
							$
									.ajax({
										type : "POST",
										url : "/orderOther/refresh",
										async : false,
										dataType : "json",
										data : param,
										success : function(result) {
											if (result.success == true) {
												$('.carInfo input').val(result.data.cNumber);
												$('.carColor input').val(result.data.color);
												$('.takePlace input').val(result.data.takePlaceEnumString);
												$('.takeTime input').val(getDateString(new Date(result.data.comeDate)) + ' ' + getTimeString(new Date(result.data.comeDate)));
												$('.receiveTime input').val(getDateString(new Date(result.data.goDate)) + ' ' + getTimeString(new Date(result.data.goDate)));
												$('.receivePlace input').val(result.data.relocateString);
												$('.normalPrice input').val(result.data.price);
												if ($('#carId').val() == null) {
													$('#carId').val(result.data.carTypeId);
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

		pnlParent.find('.additionKm input').unbind("keyup").bind("keyup",
				function() {
					var me = $(this);
					var pnlParent = me.closest(".pnlOtherDetailProduct");
					OrderOtherForm.calculate(pnlParent.attr("id"));
				});

	};

	var onInitControl = function(uniqueid) {

		var pnlProduct = $("#" + uniqueid);
		var pnlParent = $("#" + uniqueid);
		pnlProduct.find(".form_datetime").datetimepicker({
			autoclose : true,
			isRTL : false,
			format : "yyyy.mm.dd hh:ii",
			pickerPosition : "bottom-left"
		});
		pnlProduct.find(".btnSaveProduct").click(function() {
			var uniqueId = $(this).attr("uid");
			OrderOtherForm.saveProduct(uniqueId);
		});
		pnlProduct.find(".btnDeleteProduct").click(function() {
			var uniqueId = $(this).attr("uid");
			OrderOtherForm.deleteProduct(uniqueId);
		});

		pnlProduct.find(".txtBoxSpecialPrice").change(function() {
			var uniqueId = $(this).attr("uid");
			OrderOtherForm.calculate(uniqueId);
		}).keyup(function() {
			var uniqueId = $(this).attr("uid");
			OrderOtherForm.calculate(uniqueId);
		});

		pnlProduct.find(".txtQty").change(function() {
			var uniqueId = $(this).attr("uid");
			OrderOtherForm.calculate(uniqueId);
		}).keyup(function() {
			var uniqueId = $(this).attr("uid");
			OrderOtherForm.calculate(uniqueId);
		});

		pnlProduct.find(".txtDiscountPercent").change(function() {
			var uniqueId = $(this).attr("uid");
			OrderOtherForm.calculate(uniqueId);
		}).keyup(function() {
			var uniqueId = $(this).attr("uid");
			OrderOtherForm.calculate(uniqueId);
		});
		
		var cmbProductCategory = pnlParent.find(".cmbProductCategory");
		var selectedOption = cmbProductCategory.find("option:selected");
		
		pnlParent.find('.fromTake').unbind('change').bind('change', function(){
			if(pnlParent.find('.fromTake option:selected').val() == "other"){
				pnlParent.find('.fromTakeNote').show();
			} else {
				pnlParent.find('.fromTakeNote').hide();
			}
		});

	};

	var saveProduct = function(uniqueid) {

		Metronic.startPageLoading({
			animate : true
		});

		var pnlParent = $("#" + uniqueid);
		pnlParent.find(".caption-helper").text("хадгалж байна...");

		var cmbProductCategory = pnlParent.find(".cmbProductCategory");
		var selectedOption = cmbProductCategory.find("option:selected");

		if (selectedOption && selectedOption.attr("attrtypecode") === "car") {

			var txtOrderProductId = pnlParent.find(".txtOrderProductId");
			var txtDiscountPercent = pnlParent.find(".txtDiscountPercent");
			var txtDiscountAmount = pnlParent.find(".txtDiscountAmount");
			var txtDiscountNote = pnlParent.find(".txtDiscountNote");

			var txtTotalAmount = pnlParent.find(".txtTotalAmount");
			var txtGrandTotalAmount = pnlParent.find(".txtGrandTotalAmount");
			var txtAdditionType = pnlParent.find(".additionValue");
			var txtAdditionKm = pnlParent.find(".additionkm");

			var param = {};
			param._csrf = $("#__csrf__").val();

			param.orderId = $("#orderId").val();
			param.orderOtherId = $("#orderOtherId").val();
			param.orderOtherProductId = txtOrderProductId.val();

			param.productTypeId = selectedOption.val();
			param.productTypeCode = "car";

			param.additionKm = txtAdditionKm.val();
			param.carAddition = txtAdditionType.find("option:selected").val();

			param.discountPercent = txtDiscountPercent.val();
			param.discountAmount = txtDiscountAmount.val();
			param.discountNote = txtDiscountNote.val();
			param.totalAmount = txtTotalAmount.val();
			param.grandTotalAmount = txtGrandTotalAmount.val();

		} else {
			var txtOrderProductId = pnlParent.find(".txtOrderProductId");
			var txtProductId = pnlParent.find(".txtProductId");
			var txtProductSize = pnlParent.find(".txtProductSize");
			var txtProductPrice = pnlParent.find(".txtProductPrice");

			var txtNote = pnlParent.find(".txtNote");
			var checkSpecial = pnlParent.find(".checkSpecial");
			var txtBoxInnerColor = pnlParent.find(".txtBoxInnerColor");
			var txtBoxSpecialSize = pnlParent.find(".txtBoxSpecialSize");
			var txtBoxSpecialPrice = pnlParent.find(".txtBoxSpecialPrice");
			var txtQty = pnlParent.find(".txtQty");

			var txtDiscountPercent = pnlParent.find(".txtDiscountPercent");
			var txtDiscountAmount = pnlParent.find(".txtDiscountAmount");
			var txtDiscountNote = pnlParent.find(".txtDiscountNote");

			var txtTotalAmount = pnlParent.find(".txtTotalAmount");
			var txtGrandTotalAmount = pnlParent.find(".txtGrandTotalAmount");

			var txtTakeDate = pnlParent.find(".txtTakeDate");
			var txtTakePlace = pnlParent.find(".txtTakePlace");
			var txtFromTakeNote = pnlParent.find(".txtFromTakeNote");

			var param = {};
			param._csrf = $("#__csrf__").val();

			param.orderId = $("#orderId").val();
			param.orderOtherId = $("#orderOtherId").val();

			param.orderOtherProductId = txtOrderProductId.val();
			param.packType = $("#optionsTypePack").is(":checked");

			if (param.packType)
				param.packId = $("#productPack").find("option:selected").val();
			else
				param.packId = null;
			param.productId = txtProductId.find("option:selected").val();
			param.productSize = txtProductSize.val();
			param.productPrice = txtProductPrice.val();
			param.productNote = txtNote.val();
			param.special = checkSpecial.is(':checked');
			param.boxInnerColor = txtBoxInnerColor.val();
			param.boxSpecialSize = txtBoxSpecialSize.val();

			param.boxSpecialPrice = txtBoxSpecialPrice.val();
			param.discountPercent = txtDiscountPercent.val();
			param.discountAmount = txtDiscountAmount.val();
			param.discountNote = txtDiscountNote.val();
			param.totalAmount = txtTotalAmount.val();
			param.grandTotalAmount = txtGrandTotalAmount.val();
			param.takeDate = txtTakeDate.val();
			param.takePlace = txtTakePlace.val();
			param.fromTakeNote = txtFromTakeNote.val();
			param.qty = txtQty.val();

			if (param.productPrice === "")
				param.productPrice = null;
			if (param.boxSpecialPrice === "")
				param.boxSpecialPrice = null;
			if (param.totalAmount === "")
				param.totalAmount = null;
			if (param.grandTotalAmount === "")
				param.grandTotalAmount = null;
			if (param.productId === "-1")
				param.productId = null;
		}

		$.ajax({
			type : "POST",
			url : "/orderOther/saveproduct",
			async : true,
			dataType : "json",
			data : param,
			success : function(result) {
				if (result.success) {
					pnlParent.find(".caption-helper").text("хадгалсан");
					pnlParent.find(".txtOrderProductId").val(
							result.data.orderOtherProductId);
					$("#orderOtherId").val(result.data.orderOtherId);

					if (result.data.packType == true) {
						$("#productPack").attr("disabled", "disabled");
						$("#orderOtherTypeProduct_new").show();
					}

				} else {
					CRSWebUtils.showAlert("danger", "warning", result.message,
							0);
				}
				Metronic.stopPageLoading();
			},
			error : function() {
				Metronic.stopPageLoading();
				CRSWebUtils.showAlert("danger", "warning",
						"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
			}
		});
	};

	var clearValuesOnChangeProduct = function(uniqueid) {

		var pnlParent = $("#" + uniqueid);

		var txtProductSize = pnlParent.find(".txtProductSize");
		var txtProductPrice = pnlParent.find(".txtProductPrice");

		var txtNote = pnlParent.find(".txtNote");
		var checkSpecial = pnlParent.find(".checkSpecial");
		var txtBoxInnerColor = pnlParent.find(".txtBoxInnerColor");
		var txtBoxSpecialSize = pnlParent.find(".txtBoxSpecialSize");
		var txtBoxSpecialPrice = pnlParent.find(".txtBoxSpecialPrice");

		var txtDiscountPercent = pnlParent.find(".txtDiscountPercent");
		var txtDiscountAmount = pnlParent.find(".txtDiscountAmount");
		var txtDiscountNote = pnlParent.find(".txtDiscountNote");

		var txtTotalAmount = pnlParent.find(".txtTotalAmount");
		var txtGrandTotalAmount = pnlParent.find(".txtGrandTotalAmount");

		var txtTakeDate = pnlParent.find(".txtTakeDate");
		var txtTakePlace = pnlParent.find(".txtTakePlace");
		var txtFromTakeNote = pnlParent.find(".txtFromTakeNote");

		var txtProductProperties = pnlParent.find(".txtProductProperties");

		var imgProductImage = pnlParent.find(".imgProductImage");
		var txtQty = pnlParent.find(".txtQty");

		txtProductSize.val("");
		txtProductPrice.val("");
		txtNote.val("");

		checkSpecial.prop("checked", false);
		checkSpecial.parent().removeClass("checked");
		$("#pnlSpecialInfo" + checkSpecial.attr("uid")).hide();

		txtBoxInnerColor.val("");
		txtBoxSpecialSize.val("");
		txtBoxSpecialPrice.val("");
		txtDiscountPercent.val("");
		txtDiscountAmount.val("");
		txtDiscountNote.val("");
		txtTotalAmount.val("");
		txtGrandTotalAmount.val("");
		txtTakeDate.val("");
		txtTakePlace.val("");
		txtFromTakeNote.val("");

		txtProductProperties.val("");
		txtProductProperties.closest(".form-group").remove();

		txtBoxInnerColor.closest(".form-group").remove();
		// txtQty.closest(".form-group").remove();

		imgProductImage.attr("src", "");

	};
	var deleteProduct = function(uniqueid) {

		var pnlParent = $("#" + uniqueid);
		var txtOrderProductId = pnlParent.find(".txtOrderProductId");

		bootbox.confirm({
			message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
			callback : function(result) {
				if (result == false) {
					return;
				}
				Metronic.startPageLoading({
					animate : true
				});
				var param = {};
				param._csrf = $("#__csrf__").val();
				param.orderOtherId = $("#orderOtherId").val();
				param.orderOtherProductId = txtOrderProductId.val();

				if (param.orderOtherProductId == "")
					param.orderOtherProductId = -1;

				$.ajax({
					type : "POST",
					url : "/orderOther/deleteproduct",
					async : true,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success) {
							pnlParent.remove();
							// Бүтээгдэхүүн, багц сонгох эсэхийг түгжих эсэх
							if (result.data) {
								$(".optionsOtherTypes").removeAttr("disabled")
										.parent().parent().removeClass(
												"disabled");

								$("#productPack").removeAttr("disabled");
								$("#orderOtherTypeProduct_new").show();
							}
							CRSWebUtils.showAlert("success", "check",
									"Амжилттай устгагдлаа.", 0);
						} else {
							CRSWebUtils.showAlert("danger", "warning",
									result.message, 0);
						}
						Metronic.stopPageLoading();
					},
					error : function() {
						Metronic.stopPageLoading();
						CRSWebUtils.showAlert("danger", "warning",
								"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
								0);
					}
				});
			}
		});
	};

	var onChangeProductPack = function(obj) {
		// Metronic.startPageLoading({animate: true});
		var me = $(obj);

		if (me.val()) {
			$("#orderOtherTypeProduct_new").show();

			$(".optionsOtherTypes").attr("disabled", "disabled").parent()
					.parent().addClass("disabled");
		} else {
			$("#orderOtherTypeProduct_new").hide();

			$(".optionsOtherTypes").removeAttr("disabled").parent().parent()
					.removeClass("disabled");
		}

		// var param = {};
		// param._csrf = $("#__csrf__").val();
		// param.uniqueId = "uid" + (new Date()).getTime();
		// param.productPackId =
		// $("#productPack").find('option:selected').val();

		// $.ajax({
		// type : "POST",
		// url : "/orderOther/packproducttemplate/",
		// async : true,
		// dataType : "html",
		// data : param,
		// success : function(
		// result) {
		// result = result.replace('<!DOCTYPE html>', '');
		// result = result.replace('<html><body>', '');
		// result = result.replace('</body></html>', '');
		//				
		// $("#pnlPackTypeDetail").html(result);
		//				
		// OrderOtherForm.onInitControl("pnlPackTypeDetail");
		//				
		// $(".optionsOtherTypes").attr("disabled", "disabled")
		// .parent().parent().addClass("disabled");
		// Metronic.stopPageLoading();
		// },
		// error : function() {
		// Metronic.stopPageLoading();
		// CRSWebUtils
		// .showAlert(
		// "danger",
		// "warning",
		// "Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
		// 0);
		// }
		// });

	};

	var calculate = function(uniqueId) {

		var pnlParent = $("#" + uniqueId);

		var txtQty = pnlParent.find(".txtQty");
		var txtProductPrice = pnlParent.find(".txtProductPrice");

		var txtDiscountPercent = pnlParent.find(".txtDiscountPercent");
		var txtDiscountAmount = pnlParent.find(".txtDiscountAmount");

		var txtTotalAmount = pnlParent.find(".txtTotalAmount");
		var txtGrandTotalAmount = pnlParent.find(".txtGrandTotalAmount");

		var txtBoxSpecialPrice = pnlParent.find(".txtBoxSpecialPrice");

		var checkSpecial = pnlParent.find(".checkSpecial");

		var qty = txtQty.val();
		var productPrice = txtProductPrice.val();
		var totalAmount = txtTotalAmount.val();
		var discountPercent = txtDiscountPercent.val();
		var discountAmount = txtDiscountAmount.val();
		var grandTotalAmount = txtGrandTotalAmount.val();
		var boxSpecialPrice = txtBoxSpecialPrice.val();
		var checkSpecial = checkSpecial.is(":checked");

		if (qty == "")
			qty = 0;
		if (productPrice == "")
			productPrice = 0;
		if (boxSpecialPrice == "")
			boxSpecialPrice = 0;
		if (discountPercent == "")
			discountPercent = 0;

		if (checkSpecial)
			productPrice = boxSpecialPrice;

		var cmbProductCategory = pnlParent.find(".cmbProductCategory");
		var selectedOption = cmbProductCategory.find("option:selected");

		if (selectedOption && selectedOption.attr("attrtypecode") === "car") {

			var undsenUne = pnlParent.find('.normalPrice input').val();
			var une = pnlParent.find('.eachPrice input').val();
			var km = pnlParent.find('.additionKm input').val();

			if (undsenUne == "")
				undsenUne = 0;
			if (une == "")
				une = 0;
			if (km == "")
				km = 0;

			if (pnlParent.find('.additionPayment option:selected').val() == 'hodoo') {
				totalAmount = parseFloat(km * une) + parseFloat(undsenUne);

			} else {
				totalAmount = parseFloat(une) + parseFloat(undsenUne);
			}

		} else {
			totalAmount = parseFloat(qty * productPrice).toFixed(2);
		}
		discountAmount = parseFloat(totalAmount * discountPercent / 100)
				.toFixed(2);

		grandTotalAmount = parseFloat(totalAmount - discountAmount).toFixed(2);

		txtDiscountAmount.val(discountAmount);
		txtTotalAmount.val(totalAmount);
		txtGrandTotalAmount.val(grandTotalAmount);

	}

	return {
		// main function to initiate the module
		init : function() {
			handleOrderOtherForm();
			onInitControl("pnlProductTypeDetail");
			onInitControl("pnlPackTypeDetail");

			$("#optionsTypeProduct").change(function() {
				var me = $(this);

				if (me.is(':checked')) {
					$("#pnlProductType").show();
					$("#pnlProductTypeDetail").show();
					$("#pnlPackTypeDetail").hide();
					$("#pnlPackType").hide();
				}
			});
			$("#optionsTypePack").change(function() {
				var me = $(this);
				if (me.is(':checked')) {
					$("#pnlProductType").hide();
					$("#pnlProductTypeDetail").hide();
					$("#pnlPackTypeDetail").show();
					$("#pnlPackType").show();
				}
			});

			// Бүтээгдэхүүн гэж сонгоод шинэ товч дарах
			$("#orderOtherProduct_new")
					.click(
							function() {
								var me = $(this);

								Metronic.startPageLoading({
									animate : true
								});

								var param = {};
								param._csrf = $("#__csrf__").val();
								param.uniqueId = "uid" + (new Date()).getTime();
								param.orderId = $('#orderId').val();

								$
										.ajax({
											type : "POST",
											url : "/orderOther/producttemplate/",
											async : true,
											dataType : "html",
											data : param,
											success : function(result) {
												result = result.replace(
														'<!DOCTYPE html>', '');
												result = result.replace(
														'<html>', '');
												result = result.replace(
														'<body>', '');
												result = result.replace(
														'</body>', '');
												result = result.replace(
														'</html>', '');

												var detail = $(".pnlOtherDetailProduct");

												detail.find(".portlet-body")
														.hide();
												detail
														.find(
																".tools .collapse")
														.removeClass("collapse")
														.addClass("expand");

												$("#pnlProductTypeDetail")
														.prepend(result);

												OrderOtherForm
														.onInitControl(param.uniqueId);

												$(".optionsOtherTypes").attr(
														"disabled", "disabled")
														.parent().parent()
														.addClass("disabled");

												Metronic.stopPageLoading();
											},
											error : function() {
												Metronic.stopPageLoading();
												CRSWebUtils
														.showAlert(
																"danger",
																"warning",
																"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
																0);
											}
										});

							});

			$("#orderOtherTypeProduct_new")
					.click(
							function() {

								var me = $(this);

								Metronic.startPageLoading({
									animate : true
								});

								var param = {};
								param._csrf = $("#__csrf__").val();
								param.uniqueId = "uid" + (new Date()).getTime();
								param.packId = $("#productPack").find(
										"option:selected").val();

								$
										.ajax({
											type : "POST",
											url : "/orderOther/packitemtemplate/",
											async : true,
											dataType : "html",
											data : param,
											success : function(result) {
												result = result.replace(
														'<!DOCTYPE html>', '');
												result = result.replace(
														'<html>', '');
												result = result.replace(
														'<body>', '');
												result = result.replace(
														'</body>', '');
												result = result.replace(
														'</html>', '');

												var detail = $(".pnlOtherDetailProduct");

												detail.find(".portlet-body")
														.hide();
												detail
														.find(
																".tools .collapse")
														.removeClass("collapse")
														.addClass("expand");

												$("#pnlPackTypeDetail")
														.prepend(result);

												OrderOtherForm
														.onInitControl(param.uniqueId);

												$(".optionsOtherTypes").attr(
														"disabled", "disabled")
														.parent().parent()
														.addClass("disabled");

												Metronic.stopPageLoading();
											},
											error : function() {
												Metronic.stopPageLoading();
												CRSWebUtils
														.showAlert(
																"danger",
																"warning",
																"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
																0);
											}
										});

							});

			$('.classOrderOtherProductType').each(
					function(index, val) {
						var me = $(this);
						var pnlParent = me.closest(".pnlOtherDetailProduct");
						var cmbProductCategory = pnlParent
								.find(".cmbProductCategory");
						if ($(this).val() === "car") {
							var option = cmbProductCategory
									.find("option[attrtypecode=car]");
							pnlParent.find('.reload').click();
							pnlParent.find('.additionValue').change();
						}
					});
		},
		onChangeProductType : onChangeProductType, // Бүтээгдэхүүний төрөл
		// сонгох
		onChangeProduct : onChangeProduct, // Бүтээгдэхүүн сонгох
		onChangeCheckSpecial : onChangeCheckSpecial, // Стандарт бус эсэх
		// өөрчлөгдөхөд
		onClickPnlDiscount : onClickPnlDiscount, // Тусламж линк дээр дарах
		onInitControlCar : onInitControlCar,
		onInitControl : onInitControl, // Бүтээгдэхүүн нэмэх хэсэг гарч ирэхэд
		// контролд ивэнт холбох,
		saveProduct : saveProduct, // Бүтээгдэхүүний мэдээлэл хадгалах
		deleteProduct : deleteProduct, // Бүтээгдэхүүн устгах
		onChangeProductPack : onChangeProductPack, // Бүтээгдэхүүний багцыг
		// өөрчлөх
		clearValuesOnChangeProduct : clearValuesOnChangeProduct,
		calculate : calculate
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
