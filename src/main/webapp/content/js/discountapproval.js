var tableOfNameAndIDs = [];
var rowindex1  = 0; 
var rowindex2  = 0;
var DiscountApprovalForm = function() {

	var handleDiscountApprovalForm = function() {

		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			console.log(re.test(value))
			return this.optional(element) || re.test(value);
		}, "Оруулсан утгаа шалгана уу.");

		$('#discountApproval-form').validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block', // default input error message class
			focusInvalid : false, // do not focus the last invalid input
			rules : {
				"discountapproval.name": {
            		required: true
            	},
			},

			messages : {
				"discountapproval.name":{
            		required: "Зөвшөөрлийн нэр оруулна уу!"
            	},
			},

			invalidHandler : function(event, validator) { // display error

			},

			highlight : function(element) { // hightlight error inputs
				$(element).closest('.form-group').addClass('has-error'); // set
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

		$('#discountApproval-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('#discountApproval-form').validate().form()) {
					$('#discountApproval-form').submit(); // form validation
															// success, call
															// ajax form submit
				}
				return false;
			}
		});
	}
	var filter = function(elem) {
		var compval = $("#approvalerCompany").val();
		var roleval = $("#approvalerUserGroup").val();
		var csrf = $("#__csrf__").val();
		var param = {};
		param._csrf = csrf;
		param.company = compval;
		param.role=roleval;
		$.ajax({
					type : "GET",
					url : "/discountapproval/filter",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							var select = $("#approvalerEmployee");
							$(select).find('option').remove();

							$('<option>').val('').text('Сонгох...').appendTo(select);
							var data = result.data;
							$.each(data, function(k, v) {
								$('<option>').val(v.productId).text(v.productName).appendTo(select);
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
			handleDiscountApprovalForm();
			$("#saveBoardRegist").click(function() {
				var me = $(this);
				var emp = $("#approvalerEmployee").val();
				var step = $("#addapprovalerstepnum").val();
				if(emp != undefined && emp != null && emp != "")
				{
					Metronic.startPageLoading({
						animate : true
					});
					var param = {};
					param._csrf = $("#__csrf__").val();
					param.approvalId = $("#discountapprovalid").val();
					param.emp = emp;
					param.company= $("#approvalerCompany").val();
					param.role = $("#approvalerUserGroup").val();
					param.frequency = $("#approvalersFrequency").val();
					param.stepnum = step;
					param.step1 = step == 1 ? rowindex1 : rowindex2;
					$.ajax({
						type : "POST",
						url : "/discountapproval/addemployee/",
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
							if(step == 1)
							{
								$("#discountapprovalerstep1").prepend(result);
							}
							else {
								$("#discountapprovalerstep2").prepend(result);
							}
							if(step == 1)
								rowindex1++;
							else
								rowindex2++
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
				}
			});
		},
		filter: filter
	};
}();

$(document).ready(function(){
	$(".addDiscountApprovaler").click(function() {
		var step = $(this).data("step");
		$("#addapprovalerstepnum").val(step);
		$("#boardRegist").modal();
	});
	var rIdx = $("#discountApprovalers2RowIdx").val();
	if(rIdx != "" && $.isNumeric(rIdx))
		rowindex2 = parseInt(rIdx);
	rIdx = $("#discountApprovalers1RowIdx").val();
	if(rIdx != "" && $.isNumeric(rIdx))
		rowindex1 = parseInt(rIdx);
	
});