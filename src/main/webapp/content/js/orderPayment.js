$(document).ready(function() {
	$('#orderPayment_table').dataTable({
		"bLengthChange" : false,
		"bPaginate" : false,
		"bJQueryUI" : true,
		"bFilter" : true,
		"bInfo" : false,
		"sScrollX" : "100%",
		"pagingType" : "full_numbers",
		"oLanguage" : CRSWebUtils.dtLangMN,
		"iDisplayLength" : 100

	}).rowGrouping({
		bExpandableGrouping : true,
		bExpandSingleGroup : false,
		iExpandGroupOffset : -1,
		asExpandedGroups : [ "" ]
	});

	GridRowCount();
});

function GridRowCount() {
	$('span.rowCount-grid').remove();
	$('input.expandedOrCollapsedGroup').remove();

	$('.dataTables_wrapper').find('[id|=group-id]').each(function() {
		var rowCount = $(this).nextUntil('[id|=group-id]').length;
		rowCount = "(" + rowCount + ")";
		$(this).find('td').append($('<span />', {
			'class' : 'rowCount-grid'
		}).append($('<b />', {
			'text' : rowCount
		})));
	});

	$('.dataTables_wrapper').find('.dataTables_filter').append($('<input />', {
		'type' : 'button',
		'class' : 'expandedOrCollapsedGroup collapsed btn green',
		'value' : 'Бүгдийг нээх'
	}));

	$('.expandedOrCollapsedGroup').live(
			'click',
			function() {
				if ($(this).hasClass('collapsed')) {
					$(this).addClass('expanded').removeClass('collapsed').val(
							'Бүгдийг хаах').parents('.dataTables_wrapper')
							.find('.collapsed-group').trigger('click');
				} else {
					$(this).addClass('collapsed').removeClass('expanded').val(
							'Бүгдийг нээх').parents('.dataTables_wrapper')
							.find('.expanded-group').trigger('click');
				}
			});
};

// date to string format yyyyMMdd
function getDateString(date) {
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth() + 1).toString();
	var dd = date.getDate().toString();

	return yyyy + "" + (mm[1] ? mm : "0" + mm[0]) + ""
			+ (dd[1] ? dd : "0" + dd[0]);
};

$(".main").click(
		function() {
			var me = $(this);
			var packid = me.attr("packid");

			me.closest("table").find(".clsOrderPaymentDetailData" + packid)
					.toggle("fast");
			// $(this).parent().parent().next(".clsOrderPaymentDetailData").next(".clsOrderPaymentDetailData").toggle("fast");
		});

// Тусламжын хувиар бодох хэсэг
$(".discountPercent").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".detailId").val(); // Find the text
			discountPercent = $("#myDetail" + $text).find(".discountPercent")
					.val();
			totalAmount = $("#myDetail" + $text).find(".totalAmount").val();
			grandTotalAmount = $("#myDetail" + $text).find(".grandTotalAmount")
					.val();
			advance = $("#myDetail" + $text).find(".advanceReal").val();

			var discountAmountValue = totalAmount * discountPercent / 100;
			$("#myDetail" + $text).find(".discountAmount").val(
					CRSWebUtils.formatMoney(discountAmountValue));
			$("#myDetail" + $text).find(".discountAmountReal").val(
					discountAmountValue);

			var grandTotalAmountValue = CRSWebUtils.parseFloat(totalAmount)
					- discountAmountValue;
			$("#myDetail" + $text).find(".grandTotalAmount").val(
					CRSWebUtils.formatMoney(grandTotalAmountValue));
			$("#myDetail" + $text).find(".grandTotalAmountReal").val(
					grandTotalAmountValue);

			if (advance != 0) {
				var balance = grandTotalAmountValue - advance;
				$("#myDetail" + $text).find(".balance").val(
						CRSWebUtils.formatMoney(balance));
				$("#myDetail" + $text).find(".balanceReal").val(balance);
			} else {
				var balance = grandTotalAmountValue;
				$("#myDetail" + $text).find(".balance").val(
						CRSWebUtils.formatMoney(balance));
				$("#myDetail" + $text).find(".balanceReal").val(balance);

				$("#myDetail" + $text).find(".mustPay").val(
						CRSWebUtils.formatMoney(0));
				$("#myDetail" + $text).find(".mustPayReal").val(0);
			}
		});

// Тусламжын үнээр бодох хэсэг
$(".discountAmount").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".detailId").val(); // Find the text
			discountAmount = $("#myDetail" + $text).find(".discountAmount")
					.val();
			totalAmount = $("#myDetail" + $text).find(".totalAmount").val();
			grandTotalAmount = $("#myDetail" + $text).find(".grandTotalAmount")
					.val();
			advance = $("#myDetail" + $text).find(".advanceReal").val();

			var discountPercentValue = discountAmount * 100 / totalAmount;
			$("#myDetail" + $text).find(".discountPercent").val(
					discountPercentValue);
			$("#myDetail" + $text).find(".discountAmountReal").val(discountAmount);
			$("#myDetail" + $text).find(".discountAmount").val(CRSWebUtils.formatMoney(discountAmount));

			var grandTotalAmountValue = CRSWebUtils.parseFloat(totalAmount)
					- discountAmount;
			$("#myDetail" + $text).find(".grandTotalAmount").val(
					CRSWebUtils.formatMoney(grandTotalAmountValue));
			$("#myDetail" + $text).find(".grandTotalAmountReal").val(
					grandTotalAmountValue);

			if (advance != 0) {
				var balance = grandTotalAmountValue - advance;
				$("#myDetail" + $text).find(".balance").val(
						CRSWebUtils.formatMoney(balance));
				$("#myDetail" + $text).find(".balanceReal").val(balance);
			} else {
				var balance = grandTotalAmountValue;
				$("#myDetail" + $text).find(".balance").val(
						CRSWebUtils.formatMoney(balance));
				$("#myDetail" + $text).find(".balanceReal").val(balance);
			}
		});

// Урьдчилгаа төлсөн дүн
$(".advance").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".detailId").val(); // Find the text
			advance = $("#myDetail" + $text).find(".advance").val();
			grandTotalAmount = $("#myDetail" + $text).find(".grandTotalAmountReal").val();

			$("#myDetail" + $text).find(".advance").val(
					CRSWebUtils.formatMoney(advance));
			$("#myDetail" + $text).find(".advanceReal").val(advance);

			var balance = grandTotalAmount - advance;
			$("#myDetail" + $text).find(".balance").val(
					CRSWebUtils.formatMoney(balance));
			$("#myDetail" + $text).find(".balanceReal").val(balance);

			var grandTotalAmountValue = CRSWebUtils.parseFloat(grandTotalAmount) - discountAmount;
			$("#myDetail" + $text).find(".grandTotalAmount").val(CRSWebUtils.formatMoney(grandTotalAmount));
			$("#myDetail" + $text).find(".grandTotalAmountReal").val(grandTotalAmount);
		});

// Төлөх төлбөр
$(".mustPay").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".detailId").val(); // Find the text
			mustPay = $("#myDetail" + $text).find(".mustPay").val();

			$("#myDetail" + $text).find(".mustPay").val(
					CRSWebUtils.formatMoney(mustPay));
			$("#myDetail" + $text).find(".mustPayReal").val(mustPay);
		});

// Картын шимтгэл
$(".paymentType")
		.change(
				function() {
					var $row = $(this).closest("tr"); // Find the row
					var $text = $row.find(".detailId").val(); // Find the text
					paymentType = $("#myDetail" + $text).find(
							".paymentType option:selected").val();
					if (paymentType != "card") {
						$("#myDetail" + $text).find(".cardTake").attr(
								'readonly', true);
					} else {
						$("#myDetail" + $text).find(".cardTake").attr(
								'readonly', false);
					}
				});

// Картын шимтгэл
$(".cardTake").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".detailId").val(); // Find the text
			cardTake = $("#myDetail" + $text).find(".cardTake").val();

			$("#myDetail" + $text).find(".cardTake").val(
					CRSWebUtils.formatMoney(cardTake));
			$("#myDetail" + $text).find(".cardTakeReal").val(cardTake);
		});

// Багц тусламжын хувиар бодох хэсэг
$(".packDiscountPercent").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".packId").val(); // Find the text
			discountPercent = $("#myPack" + $text).find(".packDiscountPercent")
					.val();
			totalAmount = $("#myPack" + $text).find(".packTotalAmount").val();
			packAdvance = $("#myPack" + $text).find(".packAdvanceReal").val();

			var discountAmountValue = totalAmount * discountPercent / 100;
			$("#myPack" + $text).find(".packDiscountAmount").val(
					CRSWebUtils.formatMoney(discountAmountValue));
			$("#myPack" + $text).find(".packDiscountAmountReal").val(
					discountAmountValue);

			var grandTotalAmountValue = totalAmount - discountAmountValue;
			$("#myPack" + $text).find(".packGrandTotalAmount").val(
					CRSWebUtils.formatMoney(grandTotalAmountValue));
			$("#myPack" + $text).find(".packGrandTotalAmountReal").val(
					grandTotalAmountValue);

			if (packAdvance != 0) {
				var balance = grandTotalAmountValue - packAdvance;
				$("#myPack" + $text).find(".packBalance").val(
						CRSWebUtils.formatMoney(balance));
				$("#myPack" + $text).find(".packBalanceReal").val(balance);
			} else {
				var balance = grandTotalAmountValue;
				$("#myPack" + $text).find(".packBalance").val(
						CRSWebUtils.formatMoney(balance));
				$("#myPack" + $text).find(".packBalanceReal").val(balance);

				$("#myPack" + $text).find(".packMustPay").val(
						CRSWebUtils.formatMoney(0));
				$("#myPack" + $text).find(".packMustPayReal").val(0);
			}
		});

// Багц тусламжын үнээр бодох хэсэг
$(".packDiscountAmount").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".packId").val(); // Find the text
			discountAmount = $("#myPack" + $text).find(".packDiscountAmount")
					.val();
			totalAmount = $("#myPack" + $text).find(".packTotalAmount").val();
			packAdvance = $("#myPack" + $text).find(".packAdvanceReal").val();

			var discountPerValue = discountAmount * 100 / totalAmount;
			$("#myPack" + $text).find(".packDiscountPercent").val(
					discountPerValue);
			$("#myPack" + $text).find(".packDiscountAmount").val(CRSWebUtils.formatMoney(discountAmount));

			var grandTotalAmountValue = totalAmount - discountAmount;
			$("#myPack" + $text).find(".packGrandTotalAmount").val(
					CRSWebUtils.formatMoney(grandTotalAmountValue));
			$("#myPack" + $text).find(".packGrandTotalAmountReal").val(
					grandTotalAmountValue);

			if (packAdvance != 0) {
				var balance = grandTotalAmountValue - packAdvance;
				$("#myPack" + $text).find(".packBalance").val(
						CRSWebUtils.formatMoney(balance));
				$("#myPack" + $text).find(".packBalanceReal").val(balance);
			} else {
				var balance = grandTotalAmountValue;
				$("#myPack" + $text).find(".packBalance").val(
						CRSWebUtils.formatMoney(balance));
				$("#myPack" + $text).find(".packBalanceReal").val(balance);

				$("#myPack" + $text).find(".packMustPay").val(
						CRSWebUtils.formatMoney(0));
				$("#myPack" + $text).find(".packMustPayReal").val(0);
			}
		});

// Багц урьдчилгаа төлсөн дүн
$(".packAdvance").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".packId").val(); // Find the text
			advance = $("#myPack" + $text).find(".packAdvance").val();
			grandTotalAmount = $("#myPack" + $text).find(
					".packGrandTotalAmountReal").val();

			$("#myPack" + $text).find(".packAdvance").val(
					CRSWebUtils.formatMoney(advance));
			$("#myPack" + $text).find(".packAdvanceReal").val(advance);

			var balance = grandTotalAmount - advance;
			$("#myPack" + $text).find(".packBalance").val(
					CRSWebUtils.formatMoney(balance));
			$("#myPack" + $text).find(".packBalanceReal").val(balance);
		});

// Багц төлөх төлбөр
$(".packMustPay").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".packId").val(); // Find the text
			mustPay = $("#myPack" + $text).find(".packMustPay").val();

			$("#myPack" + $text).find(".packMustPay").val(
					CRSWebUtils.formatMoney(mustPay));
			$("#myPack" + $text).find(".packMustPayReal").val(mustPay);
		});

// Төлөх хэлбэр
$(".packCardTake").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".packId").val(); // Find the text
			cardTake = $("#myPack" + $text).find(".packCardTake").val();

			$("#myPack" + $text).find(".packCardTake").val(
					CRSWebUtils.formatMoney(cardTake));
			$("#myPack" + $text).find(".packCardTakeReal").val(cardTake);
		});

// Картын шимтгэл
$(".packPaymentType").change(
		function() {
			var $row = $(this).closest("tr"); // Find the row
			var $text = $row.find(".packId").val(); // Find the text

			packPaymentType = $("#myPack" + $text).find(
					".packPaymentType option:selected").val();
			if (packPaymentType != "card") {
				$("#myPack" + $text).find(".packCardTake").attr('readonly',
						true);
			} else {
				$("#myPack" + $text).find(".packCardTake").attr('readonly',
						false);
			}
		});

$(document).ready(
		function() {
			var count = $('#myTable tr').length - 1;
			for (var i = 0; i <= count; i++) {
				// Багцгүй бүтээгдэхүүний нэр

				$('.discountType')[i].name = "details[" + i + "].discountTypeEnum";
				$('.paymentType')[i].name = "details[" + i + "].balanceType";
				$('.discountPercent')[i].name = "details[" + i + "].discountPercent";
				$('.discountAmountReal')[i].name = "details[" + i + "].discountAmount";
				$('.grandTotalAmountReal')[i].name = "details[" + i + "].grandTotalAmount";
				$('.advanceReal')[i].name = "details[" + i + "].advance";
				$('.balanceReal')[i].name = "details[" + i + "].balance";
				$('.mustPayReal')[i].name = "details[" + i + "].mustPay";
				$('.cardTakeReal')[i].name = "details[" + i + "].cardTake";
				$('.payedUser')[i].name = "details[" + i + "].payedUser";
				$('.detailId')[i].name = "details[" + i + "].detailId";

				if ($('.packId')[i] != null) {
					// Багцтай бүтээгдэхүүний нэр
					$('.packId')[i].name = "packs[" + i + "].packId";
					$('.packDiscountType')[i].name = "packs[" + i
							+ "].packDiscountTypeEnum";
					$('.packDiscountPercent')[i].name = "packs[" + i
							+ "].packDiscountpercent";
					$('.packDiscountAmountReal')[i].name = "packs[" + i
							+ "].packDiscountAmount";
					$('.packTotalAmount')[i].name = "packs[" + i
							+ "].packTotalAmount";
					$('.packGrandTotalAmountReal')[i].name = "packs[" + i
							+ "].packGrandTotalAmount";
					$('.packAdvanceReal')[i].name = "packs[" + i
							+ "].packAdvance";
					$('.packBalanceReal')[i].name = "packs[" + i
							+ "].packBalance";
					$('.packMustPayReal')[i].name = "packs[" + i + "].mustPay";
					$('.packPaymentType')[i].name = "packs[" + i
							+ "].packBalanceType";
					$('.packCardTakeReal')[i].name = "packs[" + i
							+ "].cardTake";
					$('.packPayedUser')[i].name = "packs[" + i + "].payedUser";
				}
			}
		});

$("#turul").change(function() {
			var $text = $("#turul").val(); // Find the text

			$.ajax({
				url : '/orderPayment/getProductTypes/' + $text,
				success : function(data) {
					dataParsed = JSON.parse(data)
					for (var i = 0; i < dataParsed.length; i++) {
						var item = dataParsed[i];
						$('#ner').append('<option value="' + item.id + '">' + item.name + '</option>');
						
					}
				}
			});
		});
$("#ner").change(function() {
			var $text = $("#ner option:selected").val(); // Find the text

			$.ajax({
				url : '/orderPayment/getProductPrice/' + $text,
				success : function(data) {
					dataParsed = JSON.parse(data)
					$('#une').val(dataParsed.price);
				}
			});
		});
$("#tooshirheg").change(function() {
			var $qty = $("#tooshirheg").val(); // Find the text
			var $price = $("#une").val();
			var $total = $price * $qty;
			$('#niitune').val($total);
		});
$("#tuslamjhuvi").change(function() {
			var $percent = $('#tuslamjhuvi').val();
			var $total = $('#niitune').val();
			var $discountAmount = $percent * $total / 100;
			var value = $total - $discountAmount;
			$('#tuslamjdun').val(value);
			var grand = $total - value;
			$('#etssiindun').val(grand);
		});
$("#tuslamjdun").change(function() {
			var $amount = $('#tuslamjdun').val();
			var $total = $('#niitune').val();
			var $discountpercent = $amount * 100 / $total;
			$('#tuslamjhuvi').val($discountpercent)
			var grand = $total - $amount;
			$('#etssiindun').val(grand);
		});
$("#uidchilgaa").change(function() {
			var $advance = $('#uidchilgaa').val();
			var $grandTotalAmount = $('#etssiindun').val();
			var $balance = $grandTotalAmount - $advance;
			$('#uldegdel').val($balance);
		});
$("#tulsunhelber").change(function() {
			if ($("#tulsunhelber option:selected").val() != "card") {
				$("#cartShimtgel").attr('readonly', true);
			} else {
				$("#cartShimtgel").attr('readonly', false);
			}
		});
$("#saveNewProduct").click(function() {
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.productId = $("#ner option:selected").val();
			if($('#niitune').val() > 0){
				param.totalAmount = $('#niitune').val();
			} else {
				param.totalAmount = 0;
			}
			param.discountTypeEnum = $('#tuslamjturul').val();
			if($('#tuslamjdun').val() > 0){
				param.discountAmount = $('#tuslamjdun').val();
			} else {
				param.discountAmount = 0;
			}
			param.discountPercent = $('#tuslamjhuvi').val();
			if($('#etssiindun').val() > 0){
				param.grandTotalAmount = $('#etssiindun').val();
			} else {
				param.grandTotalAmount = 0;
			}
			if($('#uidchilgaa').val() > 0){
				param.advance = $('#uidchilgaa').val();
			} else {
				param.advance = 0;
			}
			if($('#uldegdel').val() > 0){
				param.balance = $('#uldegdel').val();
			} else {
				param.balance = 0;
			}
			param.balanceType = $('#tulsunhelber').val();
			if($('#cartShimtgel').val() > 0){
				param.cardTake = $('#cartShimtgel').val();
			} else {
				param.cardTake = 0;
			}
			param.detailId = $('#orderId').val();
			param.payedUser = $('#tulsunhuniiner').val();
			$.ajax({
						type : "POST",
						url : "/orderpaymentdetail",
						async : false,
						dataType : "json",
						data : param,
						success : function(result) {
							if (result.success == true) {
								$('#large').modal('hide');
								console.log(result.data);
								
							} else {
								CRSWebUtils.showAlert("danger",
										"warning",
										result.message, 0);
							}
						},
						error : function() {
							CRSWebUtils.showAlert(
											"danger",
											"warning",
											"Үйлдэл амжилтгүй б	оллоо. Дахин оролдоно уу.",
											0);
						}
					});
});

//Тусламжын table нийт дүн
var totalDiscountAmount = 0;
var totalDiscountAmount1 = 0;
$('#orderPayment_table tbody tr').each(function() {
	var price = $(this).find(".discountAmountReal").val();
	var price1 = $(this).find(".packDiscountAmount").val();
	if(price != null){
		totalDiscountAmount += CRSWebUtils.parseFloat(price);
	}
	
	if(price1 != null){
		totalDiscountAmount1 += CRSWebUtils.parseFloat(price1);
	}
	
	var total = totalDiscountAmount + totalDiscountAmount1;
	$("#totalValueOfDiscount").val(CRSWebUtils.formatMoney(total));
});	
//Эцсийн дүн table нийт дүн
var totalGrandAmount = 0;
var totalGrandAmount1 = 0;
$('#orderPayment_table tbody tr').each(function() {
	var price = $(this).find(".grandTotalAmountReal").val();
	var price1 = $(this).find(".packGrandTotalAmountReal").val();
	
	if(price != null){
		totalGrandAmount += CRSWebUtils.parseFloat(price);
	}
	
	if(price1 != null){
		totalGrandAmount1 += CRSWebUtils.parseFloat(price1);
	}
	
	var totalGrand = totalGrandAmount + totalGrandAmount1;
	$("#totalValueOfGrandTotal").val(CRSWebUtils.formatMoney(totalGrand));
});	

//Урьдчилгаа төлсөн дүн table нийт дүн
var totalAdvanceAmount = 0;
var totalAdvanceAmount1 = 0;
$('#orderPayment_table tbody tr').each(function() {
	var price = $(this).find(".advanceReal").val();
	var price1 = $(this).find(".packAdvanceReal").val();
	
	if(price != null){
		totalAdvanceAmount += CRSWebUtils.parseFloat(price);
	}
	
	if(price1 != null){
		totalAdvanceAmount1 += CRSWebUtils.parseFloat(price1);
	}
	
	var totalAdvance = totalAdvanceAmount + totalAdvanceAmount1;
	$("#totalValueOfAdvance").val(CRSWebUtils.formatMoney(totalAdvance));
});	

//Үлдэгдэл дүн table нийт дүн
var totalBalanceAmount = 0;
var totalBalanceAmount1 = 0;
$('#orderPayment_table tbody tr').each(function() {
	var price = $(this).find(".balanceReal").val();
	var price1 = $(this).find(".pakcBalanceReal").val();
	if(price != null){
		totalBalanceAmount += CRSWebUtils.parseFloat(price);
	}
	
	if(price1 != null){
		totalBalanceAmount1 += CRSWebUtils.parseFloat(price1);
	}
	
	var totalBalance = totalBalanceAmount + totalBalanceAmount1;
	$("#totalValueOfBalance").val(CRSWebUtils.formatMoney(totalBalance));
});	

function calculateDiscount() {
	var txtTotalAmount = $("#totalValueOfGrandTotal");
	var txtDiscountAmount = $("#discountAmount");
	var txtDiscountAmountReal = $("#discountAmountReal");
	var txtDiscountPercent = $("#discountPercent");
	var txtGrandTotalAmount = $("#grandTotalAmount");
	var txtGrandTotalAmountReal = $("#grandTotalAmountReal");

	var totalAmount = txtTotalAmount.val();
	var discountAmount = txtDiscountAmount.val();
	var discountAmountReal = txtDiscountAmount.val();
	var discountPercent = txtDiscountPercent.val();
	var grandTotalAmount = txtGrandTotalAmount.val();
	var grandTotalAmountReal = txtGrandTotalAmountReal.val();

	if (totalAmount == "" || totalAmount == null)
		totalAmount = 0;
	if (discountAmount == "" || discountAmount == null)
		discountAmount = 0;
	if (discountAmountReal == "" || discountAmount == null)
		discountAmountReal = 0;
	if (discountPercent == "" || discountPercent == null)
		discountPercent = 0;
	if (grandTotalAmount == "" || grandTotalAmount == null)
		grandTotalAmount = 0;
	if (grandTotalAmountReal == "" || grandTotalAmountReal == null)
		grandTotalAmountReal = 0;

	discountAmount = parseFloat(CRSWebUtils.parseFloat(totalAmount) * discountPercent / 100).toFixed(2);
	grandTotalAmount = parseFloat(CRSWebUtils.parseFloat(totalAmount) - discountAmount).toFixed(2)
	
	txtDiscountAmount.val(CRSWebUtils.formatMoney(discountAmount));
	txtDiscountAmountReal.val(discountAmount);
	txtGrandTotalAmount.val(CRSWebUtils.formatMoney(grandTotalAmount));
	txtGrandTotalAmountReal.val(grandTotalAmount);
}

function calculateDiscountAmount() {
	var txtTotalAmount = $("#totalValueOfGrandTotal");
	var txtDiscountAmount = $("#discountAmount");
	var txtDiscountAmountReal = $("#discountAmountReal");
	var txtDiscountPercent = $("#discountPercent");
	var txtGrandTotalAmount = $("#grandTotalAmount");
	var txtGrandTotalAmountReal = $("#grandTotalAmountReal");
	
	var totalAmount = txtTotalAmount.val();
	var discountAmount = txtDiscountAmount.val();
	var discountAmountReal = txtDiscountAmount.val();
	var discountPercent = txtDiscountPercent.val();
	var grandTotalAmount = txtGrandTotalAmount.val();
	var grandTotalAmountReal = txtGrandTotalAmountReal.val();

	if (totalAmount == "" || totalAmount == null)
		totalAmount = 0;
	if (discountAmount == "" || discountAmount == null)
		discountAmount = 0;
	if (discountAmountReal == "" || discountAmount == null)
		discountAmountReal = 0;
	if (discountPercent == "" || discountPercent == null)
		discountPercent = 0;
	if (grandTotalAmount == "" || grandTotalAmount == null)
		grandTotalAmount = 0;
	if (grandTotalAmountReal == "" || grandTotalAmountReal == null)
		grandTotalAmountReal = 0;

	discountPercent = parseFloat(discountAmount * 100 / CRSWebUtils.parseFloat(totalAmount)).toFixed(2);
	grandTotalAmount = parseFloat(CRSWebUtils.parseFloat(totalAmount) - discountAmount).toFixed(2)
	
	txtDiscountPercent.val(discountPercent);
	txtDiscountAmount.val(CRSWebUtils.formatMoney(discountAmount));
	txtDiscountAmountReal.val(discountAmount);
	txtGrandTotalAmount.val(CRSWebUtils.formatMoney(grandTotalAmount));
	txtGrandTotalAmountReal.val(grandTotalAmount);
}

$("#discountPercent").keyup(function() {
	calculateDiscount();
});
			
$("#discountAmount").change(function() {
	calculateDiscountAmount();
});

$("#advance").change(function() {
	var balance =  0;
	if($("#advance").val() != ''){
		var advance = $("#advance").val();
		var grandTotalAmount = $("#grandTotalAmountReal").val();
		balance = parseFloat(grandTotalAmount - advance).toFixed(2);
	}
	$("#advance").val(CRSWebUtils.formatMoney(advance));
	$("#advanceReal").val(advance);
	$("#balance").val(CRSWebUtils.formatMoney(balance));
	$("#balanceReal").val(balance);
});