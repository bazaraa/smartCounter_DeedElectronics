var tableOfNameAndIDs = [];
var rowindex  = 0; 
var OrderSheet2Form = function() {

	var handleOrderSheet2Form = function() {

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			console.log(re.test(value))
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#orderOrderSheet2-form').validate({
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

		$('#orderOrderSheet2-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#orderOrderSheet2-form').validate().form()) {
					$('#orderOrderSheet2-form').submit(); // form validation
															// success, call
															// ajax form submit
				}
				return false;
			}
		});
	}
	// Хямдралын хувь, үнийн дүн оруулах талбаруудыг харуулна
	var onClickPnlDiscount = function(obj) {
		var me = $(obj);
		var id = me.attr("id");
		$("#pnlDiscountInfo" + id).toggle();
	}
	
	// хямдралын хувь, үнийн дүнг оруулах үед тооцоолол хийнэ
	var calculate = function(elem) {
		var totalAmount = purifyNumValues($("#totalAmountID").val());
		var discountPercent = 0;
		var discountAmount = 0;
		var grandTotalAmount = 0;
		if(elem.name == 'ordersheet2.discountAmount')
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
	// Үйлчилгээний дэд төрөл нь "бусад" үед бүтээгдэхүүний төрлүүдийг авчирна.
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
			url : "/ordersheet2other/populateproductsrvces/",
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
	// хана, суврага руу үсрэх линкүүдийг тоггл хийх
	var changeTowallLink = function(elem)
	{
		var val = $(elem).val();
		switch(val)
		{
			case "wallforever":
				$("#trkeepashinwallstupa").hide();
				$("#trkeepashinwallforever").show();
			break;
			case "wallstupa":
				$("#trkeepashinwallforever").hide();
				$("#trkeepashinwallstupa").show();
			break;
		}
	}
	return {
		init : function() {
			handleOrderSheet2Form();
			// үйлчилгээний дэд төрөл нь бусад үед бүтээгдэхүүн нэмэх товчлуурын хийх үйлдэл
			// html төрөлтэй дата авчрах ба тус html -г хэрэгцээт өгөгдлөөр дүүргээд
			// харуулна.
			$("#orderSheet2Other_new").click(function() {
				var me = $(this);
				Metronic.startPageLoading({
					animate : true
				});
				var param = {};
				param._csrf = $("#__csrf__").val();
				param.id = rowindex;
				$.ajax({
					type : "POST",
					url : "/ordersheet2other/getservicetypes/",
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

						// orderproductsother_editable_2 tbody руу үр дүнгийн html-ээ нэвмнэ.
						// хэрэв дататай бол датаг нь дүүргэсэн байна.
						$("#orderproductsother_editable_2 tbody").prepend(result);
						//html ээ нэмсний дараа бүтээгдэхүүний төрлүүдийг авчирч нэмнэ.
						$("#ordersheet2OtherProductType" + rowindex + "ID").unbind("change").bind("change", function() {
							OrderSheet2Form.populateOtherServices(this);
						});
						// бүх контролуудын event -үүдийг холбож байна.
						$("#ordersheet2OtherProduct" + rowindex + "ID").unbind("change").bind("change", function (){
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
		clickDscntBtn: onClickPnlDiscount,
		changeDscntPercField: calculate,
		populateOtherServices: onProductTypeChange,
		changeTowallLink: changeTowallLink
	};
}();

// тоон талбарын утгыг мөнгөн түнгээр форматлах функц
function numberWithCommas(x) {
	return (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '₮');
}
// мөнгөн дүнгээс тоо болгох
function purifyNumValues(x)
{
	return x.replace(/,/g, '').replace(/\₮/g, '');
}

$(document).ready(
		function() {
			fvsS(['reserved', 'commited', 'canceled'], 'contentMainTabID', 'orderStatusID');
			fvsS(['reserved', 'commited', 'canceled'], 'pnlordersheet2statusid', 'orderStatusID');
			fvsS(['reserved', 'commited', 'canceled'], 'pnlbuttonid', 'orderStatusID');
			
			// форм submit хийхээс өмнө бүх тооцооллоо ахиж хийнэ.
			$('#orderOrderSheet2-form').on('submit', function() {
				var divid= $("input[type='radio'][name='ordersheet2.serviceType']:checked").val() + 'ID';
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
			
			// ҮДТөрлүүдэд харгалзах div -үүдийн id
			var servicesIDs = [ "cremateID", "cremateBuriedCorpsID", "otherID", "ashWallID", "tombID" ];
			// идэвхтэй байгаа ҮДТ -н div -н id -г дээрх хүснэгтээс хасна.
			servicesIDs = $.grep(servicesIDs, function(val) {
				return val != initDivName;
			});
			
			var order = [];
			var tblid = "orderproducts_editable_1";
			// бүтээгдэхүүнүүдийн эрэмбэлэлт хийх хэсэг. ҮДТ бүрээрээ өөр өөрөөр эрэмбэ хийгдэнэ.
			if(initDivName != "otherID")
			{
				switch(initDivName)
				{
				case "cremateID":
					order = ["pouch", "nasylka", "car", "morgue", "room",
								"decoration","sanitaterite", "cresset", "cremate", "keepintemplewall", "locateash", "ashbox",
								"rite", "box"];
					tblid = "orderproducts_editable_1";
					if($("#carSchedulerNameID").val() != null && $("#carSchedulerNameID").val() != "") {
						$("div#cremateID input[id^='crematepouch'][id$='idQty']").attr("readonly", "readonly");
						$("div#cremateID input[id^='crematenasylka'][id$='idQty']").attr("readonly", "readonly");
					}
					break;
				case "cremateBuriedCorpsID":
					order = ["cremateburiedcorps", "car", "pouch", "nasylka", "keepintemplewall", "relictype", "rite", "cresset", "deadanalyst"];
					tblid = "orderproducts_editable_2";
					if($("#carSchedulerNameID").val() != null && $("#carSchedulerNameID").val() != "") {
						$("div#cremateBuriedCorpsID input[id^='cremateBuriedCorpspouch'][id$='idQty']").attr("readonly", "readonly");
						$("div#cremateBuriedCorpsID input[id^='cremateBuriedCorpsnasylka'][id$='idQty']").attr("readonly", "readonly");
					}
					break;
				case "tombID":
					order = ["box", "rite", "car", "blanket", "cresset",
								"flower","potion", "room", "preparation", "constsupportcare", "constclearcare"];
					tblid = "orderproducts_editable_4";
					break;
				case "ashWallID":
					order = ["rite", "cresset",	"flower","potion", "room", "constsupportcare", "constclearcare"];
					tblid = "orderproducts_editable_3";
					break;
				}
				var $table = $("#" + tblid);
				for(var i = order.length; --i >= 0; ) {
					$table.prepend($table.find('#tr' + order[i] + 'id'));
				}
			}
			else if(initDivName === "otherID") {
				var rIdx = $("#ordersheet2OtherProductReplaceRowIdxID").val();
				if(rIdx != "" && $.isNumeric(rIdx))
					rowindex = parseInt(rIdx);
				for(var i = 0; i <= rowindex; i++ ){
					$("#ordersheet2OtherProductType" + i + "ID").unbind("change").bind("change", function() {
						OrderSheet2Form.populateOtherServices(this);
					});
					$("#ordersheet2OtherProduct" + i + "ID").unbind("change").bind("change", function (){
						setPriceOfSelected('otherID', this);
					});
				}
			}
			// идэвхтэй биш div -н бүх элементийг идэвхгүй болгоно. ингэснээр server -лүү submit хийгдэхгүй
			$.each(servicesIDs, function(k, v) {
				$("div#" + v + " :input").attr("disabled", true);
			});
			
			$("#btnRfrsh_restScheduler").click(function(){
				var orderid = $("#ordersheet2orderid").val();
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = orderid;
				param.schedulerType = "rest";
				$.ajax({
					type : "GET",
					url : "/ordersheet2/getschedulerdata",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#restSchedulerNameID").val(result.data["schedulerName"]);
							$("#restSchedulerTimeID").val(result.data["schedulerStartTime"]);
							$("#restSchedulerNoteID").val(result.data["note"]);
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
			});
			$("#btnRfrsh_RoomScheduler").click(function(){
				var orderid = $("#ordersheet2orderid").val();
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = orderid;
				param.schedulerType = "room";
				$.ajax({
					type : "GET",
					url : "/ordersheet2/getschedulerdata",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#roomSchedulerNameID").val(result.data["schedulerName"]);
							$("#roomSchedulerTimeID").val(result.data["schedulerStartTime"]);
							$("#roomSchedulerNoteID").val(result.data["note"]);
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
			});
			$("#btnRfrsh_carScheduler").click(function() {
				var orderid = $("#ordersheet2orderid").val();
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = orderid;
				param.schedulerType = "car";
				$.ajax({
					type : "GET",
					url : "/ordersheet2/getschedulerdata",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#carSchedulerNameID").val(result.data["schedulerName"]);
							$("#carSchedulerPickPlaceID").val(result.data["getPlace"]);
							$("#carSchedulerPickTimeID").val(result.data["schedulerStartTime"]);
							$("#carSchedulerDeliveryPlaceID").val(result.data["deliveryPlace"]);
							$("#carSchedulerDeliveryTimeID").val(result.data["schedulerEndTime"]);
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
			});
			
			/********************** чандар байрлуулах хэсгийн шинэчлэх товч *****************************/
			
			$("#btnRfrsh_keepashinwalforeverl").click(function(){
				var orderid = $("#ordersheet2orderid").val();
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = orderid;
				param.schedulerType = "wallforever";
				$.ajax({
					type : "GET",
					url : "/ordersheet2/getwallsdata",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#keepashinwallforevername").val(result.data["schedulerName"]);
							$("#keepashinwallforeverprice").val(numberWithCommas(result.data["price"]));
							$("#keepashinwallforeverQtyID").val(result.data["qty"]);
							$("#keepashinwallforeverAmountidPrice").val(numberWithCommas(result.data["amount"]));
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
			});
			$("#btnRfrsh_keepashinwallstupa").click(function(){
				var orderid = $("#ordersheet2orderid").val();
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = orderid;
				param.schedulerType = "wallstupa";
				$.ajax({
					type : "GET",
					url : "/ordersheet2/getwallsdata",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							$("#keepashinstupaname").val(result.data["schedulerName"]);
							$("#keepashinstupaprice").val(numberWithCommas(result.data["price"]));
							$("#keepashinstupaQtyID").val(result.data["qty"]);
							$("#keepashinstupaAmountidPrice").val(numberWithCommas(result.data["amount"]));
						}
					},
					error : function(e, a) {
						alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
					}
				});
			});
			
			/***********************************************************************************************/
			var wallval = $("input[type='radio'][name='ordersheet2.keepashinwall']:checked").val();
			switch(wallval)
			{
				case "wallforever":
					$("#trkeepashinwallforever").show();
					$("#trkeepashinwallstupa").hide();
					break;
				case "wallstupa":
					$("#trkeepashinwallforever").hide();
					$("#trkeepashinwallstupa").show();
					break;
				default:
					/*$("#trkeepashinwallforever").hide();
					$("#trkeepashinwallstupa").hide();*/
					break;
			}
});
// багц сонгох үед бүтээгдэхүүнүүдээ шүүнэ.
function filterByPack(elem) {
	var elemval = elem.value;
	var csrf = $("#__csrf__").val();
	var param = {};
	param._csrf = csrf;
	param.productPack = elemval;
	$.ajax({
				type : "GET",
				url : "/ordersheet2/filterbypack",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						var divid = $('input[name="ordersheet2.serviceType"]:checked').val();
						var select = $("div#" + divid + "ID select");
						$.each(select, function(key, val) {
							$(val).find('option').remove();
						});

						$.each(select, function(key, val) {
							$('<option>').val('').text('Сонгох...').appendTo($(val));
						});
						var data = result.data;
						$.each(data, function(k, v) {
							$('<option>').val(v.id).text(v.proName).data("proprice", v.proPrice).appendTo($('div#'+divid+'ID select[id^="'+divid+v.proType+'"]'));
						});
					}
				},
				error : function(e, a) {
					alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
				}
			});
}
// бүтээгдэхүүн сонгогдох үед тухайн бүтээгдэхүүний үнийг "үнэ" талбарт зоогоод тооцоолол хийнэ.
function setPriceOfSelected(divid, element) {
	var price = $(element).find("option:selected").data("proprice");
	if(element.id.indexOf('nasylka') > -1 || element.id.indexOf('pouch') > -1) {
		price = 0;
	}
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
	$('div#'+divid +' input#'+ toPriceId).val(numberWithCommas(price * 1));
	if($.isNumeric(qty) && $.isNumeric(price)) {
		$("div#"+ divid+ " input#"+toAmtId).val(numberWithCommas(price * qty));
	}
	calcTotalAmount(divid);
}
// тоо хэмжээ өөрчлөгдөх үед тооцоолол хийнэ.
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
// үнийн дүн бодно
function calcTotalAmount(divid) {
	var totalPrice = 0;
	$("div#"+divid+" input[id$='idPrice']").each(function(k, v) {
		var s = purifyNumValues(v.value);
		if ($.isNumeric(s)) {
			totalPrice += parseInt(s);
		}
	});
	
	$("table#keepashtable input[id$='idPrice']").each(function(k, v) {
		var s = purifyNumValues(v.value);
		if ($.isNumeric(s)) {
			totalPrice += parseInt(s);
		}
	});
	
	$("#totalAmountID").val(numberWithCommas(totalPrice));
	$("#grandTotalAmountID").val(numberWithCommas(totalPrice));
	calcDiscount($("#discountPercentID"));
}
// хямдрал бодно
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
// "багцын үнэ өөрчлөгдөх" сонгогдох үед дуудагдана.
function usePackPrice(element) {
	var packprice;
	var divid= $("input[type='radio'][name='ordersheet2.serviceType']:checked").val() + 'ID';
	if (element.checked) {
		packprice = $("#productPackID").find("option:selected").data("packprice");
		if(!$.isNumeric(packprice))
			packprice = 0;
		$("#totalAmountID").val(numberWithCommas(packprice));
		/*багцын үнэ ашиглаж байгаа үед бүтээгдэхүүнүүдийн үнийг нуух*/
		$.each($("div#"+divid+" input[id$='idPrice']"), function(k, v){
			$(v).data("myvalue", v.value);
			$(v).val('0₮');
		});
		$.each($("div#"+divid+" input[id$='price']"), function(k, v){
			$(v).data("myvalue", v.value);
			$(v).val('0₮');
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
		
		$("table# input[id$='idPrice']").each(function(k, v) {
			$(v).val($(v).data("myvalue"));
			$(v).data("myvalue", '');
		});
		$("table# input[id$='price']").each(function(k, v) {
			$(v).val($(v).data("myvalue"));
			$(v).data("myvalue", '');
		});
		calcTotalAmount(divid);
	}
}
//Үйлчилгээний дэд төрөл өөрчлөгдөх үед дуудагдана.
function changeServiceType(element) {
	// үйлчилгээний дэд төрөлд харгалзах div -үүдийн id -г харуулж байна.
	var servicesIDs = [ "cremateID", "cremateBuriedCorpsID", "otherID", "ashWallID", "tombID" ];
	var tmp = [];
	var order = [];
	$("#totalAmountID").val('0');
	$('#grandTotalAmountID').val('0');
	var tblid = "orderproducts_editable_1";
	var currentServiceType = $("#currentServiceType").val();
	if(element.value == currentServiceType) {
		$("#totalAmountID").val($("#currentTotalAmount").val());
		$("#grandTotalAmountID").val($("#currentGrandTotalAmount").val());
		$("#discountPercentID").val($("#currentDscntPerc").val());
		$("#discountamountid").val($("#currentDscntAmt").val());
	}
	if(element.value === "other") { // хэрэв үйлчилгээний дэд төрөл бусад байвал эрэмбэлэлт хийгдэхгүй
		//OrderSheet2Form.prepareOtherProducts();
	}
	else { // бүтээгдэхүүнүүд дээр эрэмбэлэлт хийж байна.
		switch(element.value)
		{
			case "cremate": 
				// Ж.нь: ҮДТөрөл нь чандар байвал бүтээгдэхүүний эрэмбэ нь дараах байдалтай байна.
				order = ["pouch", "nasylka", "car", "morgue", "room",
							"decoration","sanitaterite", "cresset", "cremate", "keepintemplewall", "locateash", "ashbox",
							"rite", "box"];
				tblid = "orderproducts_editable_1";
				if($("#carSchedulerNameID").val() != null && $("#carSchedulerNameID").val() != "") {
					$("div#cremateID input[id^='crematepouch'][id$='idQty']").attr("readonly", "readonly");
					$("div#cremateID input[id^='crematenasylka'][id$='idQty']").attr("readonly", "readonly");
				}
				break;
			case "cremateBuriedCorps":
				order = ["cremateburiedcorps", "car", "pouch", "nasylka", "keepintemplewall", "relictype", "rite", "cresset", "deadanalyst"];
				tblid = "orderproducts_editable_2";
				if($("#carSchedulerNameID").val() != null && $("#carSchedulerNameID").val() != "") {
					$("div#cremateBuriedCorpsID input[id^='cremateBuriedCorpspouch'][id$='idQty']").attr("readonly", "readonly");
					$("div#cremateBuriedCorpsID input[id^='cremateBuriedCorpsnasylka'][id$='idQty']").attr("readonly", "readonly");
				}
				break;
			case "tomb":
				order = ["box", "rite", "car", "blanket", "cresset",
							"flower","potion", "room", "preparation", "constsupportcare", "constclearcare"];
				tblid = "orderproducts_editable_4";
				break;
			case "ashWall":
				order = ["rite", "cresset",	"flower","potion", "room", "constsupportcare", "constclearcare"];
				tblid = "orderproducts_editable_3";
				break;
		}
		var $table = $("#" + tblid);
		for(var i = order.length; --i >= 0; ) {
			$table.prepend($table.find('#tr' + order[i] + 'id'));
		}
	}
	// сонгогдсон байнаа үдт-г идэвхжүүлж бусдыг нь идэвхгүй болгоно. ингэснээрээ серверлүү submit хийхгүй.
	$.each(servicesIDs, function(k, v) {
		if (element.value + "ID" == v) {
			$("div#" + v).show();
			$("div#" + v + " :input").attr("disabled", false);
		} else {
			$("div#" + v).hide();
			$("div#" + v + " :input").attr("disabled", true);
		}
	});
	tableOfNameAndIDs = tmp;
	var val = element.value;
	var csrf = $("#__csrf__").val();
	var param = {};
	param._csrf = csrf;
	param.serviceType = val;
	// ҮДТ -с хамаарч багцуудыг шүүж харуулна.
	$.ajax({
				type : "GET",
				url : "/ordersheet2/filterbyservicetype",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						/*var divid = $('input[name="ordersheet2.serviceType"]:checked').val();
						var select = $("div#" + divid + "ID select");
						$.each(select, function(key, val) {
							$(val).find('option').remove();
						});
						$.each(select, function(key, val) {
							$('<option>').val('').text('Сонгох...').appendTo($(val));
						});*/
						
						$('#productPackID').find('option').remove();
						$('<option>').val('').text('Сонгох...').appendTo($('#productPackID'));
						var data = result.data;
						$.each(data, function(k, v) {
							$('<option>').val(v.id).text(v.proName).data("packprice", v.proPrice).appendTo($('#productPackID'));
						});
					}
					else {
						alert(result.message);
					}
				},
				error : function(e, a) {
					alert('Таны хүсэлтийг боловсруулахад алдаа гарлаа. Системийн админд хандана уу!');
				}
			});
}