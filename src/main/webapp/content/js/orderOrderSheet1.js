var tableOfNameAndIDs = [];
var rowindex  = 0; 
var OrderSheet1Form = function() {

	var handleOrderSheet1Form = function() {

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			console.log(re.test(value))
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#orderOrderSheet1-form').validate({
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

		$('#orderOrderSheet1-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#orderOrderSheet1-form').validate().form()) {
					$('#orderOrderSheet1-form').submit(); // form validation
					// success, call
					// ajax form submit
				}
				return false;
			}
		});
	}
	var onToggleMonkField = function(elem)
	{
		if($(elem).find("option:selected").val() === "cemeteryMonk")
		{
			$("#outsideMonkNameDivID").toggle();
			$("div#ourMonkNameDivID :input").each(function(k, v) {
				$(v).attr("disabled", false);
			});
			$("#ourMonkNameDivID").toggle();
			$("div#outsideMonkNameDivID :input").each(function(k, v) {
				$(v).attr("disabled", true);
			});
		}
		else
		{
			$("#outsideMonkNameDivID").show();
			$("#ourMonkNameDivID").hide();
			
			$("div#outsideMonkNameDivID :input").each(function(k, v) {
				$(v).attr("disabled", false);
			});
			$("div#ourMonkNameDivID :input").each(function(k, v) {
				$(v).attr("disabled", true);
			});
		}
	}
	var onClickPnlDiscount = function(obj) {
		var me = $(obj);
		var id = me.attr("id");
		$("#pnlDiscountInfo" + id).toggle();
	}
	
	var calculate = function(elem) {
		var totalAmount = purifyNumValues($("#totalAmountID").val());
		var discountAmount = 0;
		var discountPercent = 0;
		var grandTotalAmount = 0;
		if(elem.name == 'ordersheet1.discountAmount')
		{
			discountAmount = $(elem).val();
			if($.isNumeric(totalAmount) && totalAmount > 0){
				discountPercent = discountAmount * 100 / totalAmount;
			}
			$("#discountPercentID").val(discountPercent.toFixed(2));
		}
		else
		{
			discountPercent = $(elem).val();
			if($.isNumeric(totalAmount)){
				discountAmount = totalAmount * discountPercent / 100;
			}
		}

		if($.isNumeric(totalAmount)) {
			grandTotalAmount = totalAmount - discountAmount;
		}
		$("#grandTotalAmountID").val(numberWithCommas(grandTotalAmount));
		$("#discountamountid").val(numberWithCommas(discountAmount));
	}
	
	var onProductTypeChange = function(elem)
	{
		//var currow = $(element).closest('tr').find("td:nth-child(2)");
		var select = $(elem).parent('td').siblings().find('select');
		var pack = $("#productPackID").find("option:selected").val();
		var protype = $(elem).find("option:selected").val();
		var csrf = $("#__csrf__").val();
		var param = {};
		param._csrf = csrf;
		param.productPack = pack;
		param.proType = protype;
		$.ajax({
			type : "POST",
			url : "/ordersheet1other/populateproductsrvces/",
			async : false,
			dataType : "json",
			data : param,
			success : function(result) {
				if (result.success == true) {
					$(select).find('option').remove();
					$('<option>').val('').text('Сонгох...').appendTo($(select));

					var data = result.data;
					$.each(data, function(k, v) {
						$('<option>').val(v.id).text(v.proName).data("proprice", v.proPrice).appendTo($(select));
					});
				}
			},
			error : function(e, a) {
				alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
			}
		});
	}

	return {
		init : function() {
			handleOrderSheet1Form();
			$("#orderSheet1Other_new").click(function() {
				var me = $(this);
				Metronic.startPageLoading({
					animate : true
				});
				var param = {};
				param._csrf = $("#__csrf__").val();
				param.id = rowindex;
				$.ajax({
					type : "POST",
					url : "/ordersheet1other/getservicetypes/",
					async : false,
					dataType : "html",
					data : param,
					success : function(result) {
						result = result.replace('<!DOCTYPE html>', '');
						result = result.replace('<html>', '');
						result = result.replace('<body>', '');
						result = result.replace('<table>', '');
						result = result.replace('</table>', '');
						result = result.replace('</body>', '');
						result = result.replace('</html>', '');

						$("#orderproductsother_editable_1 tbody").prepend(result);
						$("#ordersheet1OtherProductType" + rowindex + "ID").unbind("change").bind("change", function() {
							OrderSheet1Form.populateOtherServices(this);
						});
						$("#ordersheet1OtherProduct" + rowindex + "ID").unbind("change").bind("change", function (){
							setPriceOfSelected('otherID', this);
						});
						rowindex++;
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
		},
		toggleMonkField: onToggleMonkField,
		clickDscntBtn: onClickPnlDiscount,
		changeDscntPercField: calculate,
		populateOtherServices: onProductTypeChange
	};
}();
function numberWithCommas(x) {
	return (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '₮');
}
function purifyNumValues(x)
{
	return x.replace(/,/g, '').replace(/\₮/g, '');
}
$(document).ready(function() {
		fvsS([ 'reserved', 'commited', 'canceled' ], 'contentMainTabID', 'orderStatusID');
		fvsS([ 'reserved', 'commited', 'canceled' ], 'pnlbtns', 'orderStatusID');
		fvsS([ 'reserved', 'commited', 'canceled' ], 'pnlstatusid', 'orderStatusID');
		$('#orderOrderSheet1-form').on('submit', function() {
			var divid= $("input[type='radio'][name='ordersheet1.serviceType']:checked").val() + 'ID';
			if (!$('#usepackpriceid').is(':checked')) {
				calcTotalAmount(divid);
			}
			$.each($("div#"+divid+" input[id$='idPrice']"), function(k, v){
				$(v).val(purifyNumValues(v.value));
			});
			$.each($("div#"+divid+" input[id$='price']"), function(k, v){
				$(v).val(purifyNumValues(v.value));
			});
			$("#totalAmountID").val(purifyNumValues($("#totalAmountID").val()));
			$("#discountamountid").val(purifyNumValues($("#discountamountid").val()));
			$("#grandTotalAmountID").val(purifyNumValues($("#grandTotalAmountID").val()));
		});

		var initDivName = $("#serviceTypeNameID").val() + "ID";
		$("#" + initDivName).show();
		tableOfNameAndIDs = [];
		var servicesIDs = [ "buryInEarthID", "relocateCorpsID",
				"buryAshInEarthID", "tombID", "ashWallID",
				"otherID" ];
		servicesIDs = $.grep(servicesIDs, function(val) {
			return val != initDivName;
		});
			
		var order = [];
		var tblid = "orderproducts_editable_1";
		if(initDivName != "otherID")
		{
			if(initDivName ==="buryAshInEarthID" || initDivName ==="buryInEarthID")
			{
				order = [ "box", "stupa", "statue", "rite", "car", "blanket",
						"cresset", "flower", "potion", "room", "jewel", "bookblanket", "pillow" ];
				if(initDivName==="buryInEarthID")
					tblid = "orderproducts_editable_1";
				else
					tblid = "orderproducts_editable_3";
			}
			else if(initDivName ==="relocateCorpsID")
			{
				order = [ "digoutcorps", "buryinearth", "rite", "cresset", "flower", "potion" ];
				tblid = "orderproducts_editable_2";
			}
			var $table = $("#" + tblid);
			for(var i = order.length; --i >= 0; ) {
				$table.prepend($table.find('#tr' + order[i] + 'id'));
			}
		}
		else if(initDivName === "otherID") {
			var rIdx = $("#ordersheet1OtherProductReplaceRowIdxID").val();
			if(rIdx != "" && $.isNumeric(rIdx))
				rowindex = parseInt(rIdx);
			for(var i = 0; i <= rowindex; i++ ){
				$("#ordersheet1OtherProductType" + i + "ID").unbind("change").bind("change", function() {
					OrderSheet1Form.populateOtherServices(this);
				});
				$("#ordersheet1OtherProduct" + i + "ID").unbind("change").bind("change", function (){
					setPriceOfSelected('otherID', this);
				});
			}
		}

		$.each(servicesIDs, function(k, v) {
			$("div#" + v + " :input").attr("disabled", true);
		});

		var paqcmonk = $("#aqcuireplacemonknameid option:selected").val();
		if(paqcmonk === "cemeteryMonk")
		{
			$("#outsideMonkNameDivID").hide();
			$("div#outsideMonkNameDivID :input").each(function(k, v) {
				$(v).attr("disabled", true);
			});
			$("#ourMonkNameDivID").show();
			$("div#ourMonkNameDivID :input").each(function(k, v) {
				$(v).attr("disabled", false);
			});
		}
		else
		{
			$("#outsideMonkNameDivID").show();
			$("#ourMonkNameDivID").hide();
			
			$("div#outsideMonkNameDivID :input").each(function(k, v) {
				$(v).attr("disabled", false);
				
				
			});
			$("div#ourMonkNameDivID :input").each(function(k, v) {
				$(v).attr("disabled", true);
			});
		}
		
		$("#btnRfrsh_restScheduler1").click(function(){
				var orderid = $("#ordersheet1orderid").val();
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = orderid;
				param.schedulerType = "rest";
				$.ajax({
					type : "GET",
					url : "/ordersheet1/getschedulerdata",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#restScheduler1NameID").val(result.data["schedulerName"]);
							$("#restScheduler1TimeID").val(result.data["schedulerStartTime"]);
							$("#restScheduler1NoteID").val(result.data["note"]);
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
			});
			$("#btnRfrsh_roomScheduler1").click(function(){
				var orderid = $("#ordersheet1orderid").val();
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = orderid;
				param.schedulerType = "room";
				$.ajax({
					type : "GET",
					url : "/ordersheet1/getschedulerdata",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#roomScheduler1NameID").val(result.data["schedulerName"]);
							$("#roomScheduler1TimeID").val(result.data["schedulerStartTime"]);
							$("#roomScheduler1NoteID").val(result.data["note"]);
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
			});
			$("#btnRfrsh_carScheduler1").click(function() {
				var orderid = $("#ordersheet1orderid").val();
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = orderid;
				param.schedulerType = "car";
				$.ajax({
					type : "GET",
					url : "/ordersheet1/getschedulerdata",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#carScheduler1NameID").val(result.data["schedulerName"]);
							$("#carScheduler1PickPlaceID").val(result.data["getPlace"]);
							$("#carScheduler1ColorID").val(result.data["color"]);
							$("#carScheduler1PickTimeID").val(result.data["schedulerStartTime"]);
							$("#carScheduler1DeliveryPlaceID").val(result.data["deliveryPlace"]);
							$("#carScheduler1DeliveryTimeID").val(result.data["schedulerEndTime"]);
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
			});
});

function filterByPack(elem) {
	var elemval = elem.value;
	var csrf = $("#__csrf__").val();
	var param = {};
	param._csrf = csrf;
	param.productPack = elemval;
	$
			.ajax({
				type : "GET",
				url : "/ordersheet1/filterbypack",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						var divid = $(
								'input[name="ordersheet1.serviceType"]:checked')
								.val();
						var select = $("div#" + divid + "ID select");
						$.each(select, function(key, val) {
							$(val).find('option').remove();
						});

						$.each(select, function(key, val) {
							$('<option>').val('').text('Сонгох...').appendTo(
									$(val));
						});
						var data = result.data;
						$.each(data, function(k, v) {
							$('<option>').val(v.id).text(v.proName).data(
									"proprice", v.proPrice).appendTo(
									$('div#' + divid + 'ID select[id^="'
											+ divid + v.proType + '"]'));
						});
					}
				},
				error : function(e, a) {
					alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
				}
			});
}
function setPriceOfSelected(divid, element) {
	var price = $(element).find("option:selected").data("proprice");
	var toPriceId=element.id.slice(0,-2) + 'price';
	var toQtyId = element.id.slice(0,-2) + 'idQty';
	var toAmtId = element.id.slice(0,-2) + 'idPrice';
	var qty = $("div#"+divid + " input#"+toQtyId).val();
	if(price == undefined) {
		price = 0;
		qty = 0;
	}
	else {
		if(qty == 0 || qty == "") {
			$("div#"+divid + " input#"+toQtyId).val(1);
			qty = 1;
		}
	}
	$('div#'+divid +' input#'+ toPriceId).val(numberWithCommas(price));
	if($.isNumeric(qty) && $.isNumeric(price)) {
		$("div#"+ divid+ " input#"+toAmtId).val(numberWithCommas(price * qty));
	}
	calcTotalAmount(divid);
}

function calcByQty(divid, element) {
	var toAmtId = element.id.slice(0,-5) + 'idPrice';
	var toPriceId=element.id.slice(0,-5) + 'price';
	var price = purifyNumValues($('div#'+divid +' input#'+ toPriceId).val());
	var amtByqty;
	if($.isNumeric($(element).val())) {
		amtByqty = parseInt(price) * parseInt($(element).val());
		$("div#" + divid + " input#"+toAmtId).val(numberWithCommas(amtByqty));
	}
	calcTotalAmount(divid)
}
function calcTotalAmount(divid) {
	var totalPrice = 0;
	$("div#"+divid+" input[id$='idPrice']").each(function(k, v) {
		var s = purifyNumValues(v.value);
		if ($.isNumeric(s)) {
			totalPrice += parseInt(s);
		}
	});
	$("#totalAmountID").val(numberWithCommas(totalPrice));
	$("#grandTotalAmountID").val(numberWithCommas(totalPrice));
	calcDiscount($("#discountPercentID"));
}
function calcDiscount(element) {
	var totalAmount = $("#totalAmountID").val();
	totalAmount = purifyNumValues(totalAmount);
	var discount = element.attr("value");
	if ($.isNumeric(totalAmount) && parseInt(totalAmount) > 0
			&& $.isNumeric(discount) && parseInt(discount) > 0) {
		var discountAmount = totalAmount * discount / 100;
		discount = discountAmount;
		$("#discountAmountID").val(numberWithCommas(discountAmount));
	}
	$("#grandTotalAmountID").val(numberWithCommas(parseInt(totalAmount) - discount));
}
function usePackPrice(element) {
	var packprice;
	var divid= $("input[type='radio'][name='ordersheet1.serviceType']:checked").val() + 'ID';
	if (element.checked) {
		packprice = $("#productPackID").find("option:selected").data("packprice");
		if(!$.isNumeric(packprice))
			packprice = 0;
		$("#totalAmountID").val(numberWithCommas(packprice));
		$.each($("div#"+divid+" input[id$='idPrice']"), function(k, v){
			$(v).data("myvalue", v.value);
			$(v).val('');
		});
		$.each($("div#"+divid+" input[id$='price']"), function(k, v){
			$(v).data("myvalue", v.value);
			$(v).val('');
		});  
		if(packprice == 0) {
			$("#discountPercentID").data("myvalue", $("#discountPercentID").val());
			$("#discountPercentID").val(0);
		}
		calcDiscount($("#discountPercentID"));
	} else {
		$("#discountPercentID").val($("#discountPercentID").data("myvalue"));
		$.each($("div#"+divid+" input[id$='idPrice']"), function(k, v){
			$(v).val($(v).data("myvalue"));
			$(v).data("myvalue", '');
		});  
		$.each($("div#"+divid+" input[id$='price']"), function(k, v){
			$(v).val($(v).data("myvalue"));
			$(v).data("myvalue", '');
		});
		calcTotalAmount(divid);
	}
}
function changeServiceType(element) {
	var servicesIDs = [ "buryInEarthID", "relocateCorpsID", "buryAshInEarthID",
			"tombID", "ashWallID", "otherID" ];
	var tmp = [];
	var csrf = $("#__csrf__").val();
	var order = [];
	var tblid = "orderproducts_editable_1";
	$("#totalAmountID").val('0');
	$('#grandTotalAmountID').val('0');
	var currentServiceType = $("#currentServiceType").val();
	if(element.value == currentServiceType) {
		$("#totalAmountID").val($("#currentTotalAmount").val());
		$("#grandTotalAmountID").val($("#currentGrandTotalAmount").val());
		$("#discountPercentID").val($("#currentDscntPerc").val());
		$("#discountamountid").val($("#currentDscntAmt").val());
	}
	
	if(element.value === "other") {
		//OrderSheet1Form.prepareOtherProducts();
	}
	else {
		if(element.value==="buryAshInEarth" || element.value === "buryInEarth")
		{
			order = [ "box", "stupa", "statue", "rite", "car", "blanket",
					"cresset", "flower", "potion", "room", "jewel", "bookblanket", "pillow" ];
			if(element.value==="buryInEarth")
				tblid = "orderproducts_editable_1";
			else
				tblid = "orderproducts_editable_3";
		}
		else if(element.value ==="relocateCorps") {
			order = [ "digoutcorps", "buryinearth", "rite", "cresset", "flower", "potion" ];
			tblid = "orderproducts_editable_2";
		}
		var $table = $("#" + tblid);
		for(var i = order.length; --i >= 0; ) {
			$table.prepend($table.find('#tr' + order[i] + 'id'));
		}
	}
	$.each(servicesIDs, function(k, v) {
		if (element.value + "ID" == v) {
			$("div#" + v + " :input").attr("disabled", false);
			$("div#" + v).show();
		} else {
			$("div#" + v).hide();
			$("div#" + v + " :input").attr("disabled", true);
		}
	});
	/* tableOfNameAndIDs = tmp; */
	var val = element.value;
	var param = {};
	param._csrf = csrf;
	param.serviceType = val;
	$.ajax({
		type : "GET",
		url : "/ordersheet1/filterbyservicetype",
		async : false,
		dataType : "json",
		data : param,
		success : function(result) {
			if (result.success == true) {
				$('#productPackID').find('option').remove();
				$('<option>').val('').text('Сонгох...').appendTo(
						$('#productPackID'));
				var data = result.data;
				$.each(data, function(k, v) {
					$('<option>').val(v.id).text(v.proName).data(
							"packprice", v.proPrice).appendTo(
							$('#productPackID'));
				});
			}
		},
		error : function(e, a) {
			alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
		}
	});
}