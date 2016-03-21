var OrderForm = function() {

    var handleOrderForm= function() {
    	
   	
        $('#boardRegist-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
            	"view.orderproduct.allotEmployee":{
            		required: true
            	},
            	"view.orderproduct.allotReqDate": {
            		required: true,
            	}
            },

            messages: {
            	"view.orderproduct.allotEmployee":{
            		required: "Хариуцах ажилтнаа сонгоно уу!"
            	},
            	"view.orderproduct.allotReqDate": {
            		required: "Шаардлагатай огноогоо оруулна уу!"
            	},
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });
    }

    return {
        init: function() {
        	handleOrderForm();
        	
				$(".form_datetime").datetimepicker({
					autoclose : true,
					isRTL : false,
					format : "yyyy.mm.dd hh:ii",
					pickerPosition : "bottom-left"
				});
		
        	$("#myordersmanager").dataTable({
				"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
				// set the initial value
				"pageLength" : 20,
				"bLengthChange" : false,
				"bFilter" : true,
				"bPaginate" : true,
				"info" : true,
				"language" : CRSWebUtils.dtLangMN,
				"columnDefs" : [ { // set default column settings
					'orderable' : true,
					'targets' : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
				}, {
					"searchable" : true,
					"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
				} ]
			});
        }
    };
}();

$(document).ready(function() {
	$(".reportinmanager").click(function(){
		var reportCode = $(this).data("form");
		var subTitle = $(this).text();
		$("#modalReportSubFilter-form").attr("action", "/report/" + reportCode);
		$("#modalSubTitle").text("(" + subTitle + ")");
		$("#modalReportSubFilter").modal();
		switch(reportCode)
		{
			case "carzahialga":
				$("#bttsdetailTypeTailan").attr("disabled", true);
				$("#pnlSubFilter_bttsdetail").hide();
				$("#carzahialgaTailan").attr("disabled", false);
				$("#pnlSubFilter_carzahialga").show();
				break;
			case "bttsdetail":
				$("#bttsdetailTypeTailan").attr("disabled", false);
				$("#pnlSubFilter_bttsdetail").show();
				$("#carzahialgaTailan").attr("disabled", true);
				$("#pnlSubFilter_carzahialga").hide();
				break;
		}
		initCarzahialga();
	});
});
function initCarzahialga() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/carzahialga/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				var cmbCompany = $("#carzahialgaTailan");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}
function GridRowCount() {
	$('span.rowCount-grid').remove();

	$('.dataTables_wrapper').find('[id|=group-id]').each(function() {
		var rowCount = $(this).nextUntil('[id|=group-id]').length;
		$(this).find('td').append($('<span />', {
			'class' : 'rowCount-grid'
		}).append($('<b />', {
			'text' : rowCount
		})));
	});
};

function toggleAllot(element) {
	$('#toggleOrderProductStatusID').val(element);
	var vals = $("div#pnlTableMyOrdersManager input[type='checkbox']:checked");
	var tmp = "";
	if (vals.length > 0) {
		$.each(vals, function(k, val) {
			tmp = tmp + val.value + ";";
		});
		$("#orderproductToAllotIDs").val(tmp.slice(0, -1));
		if(element == 'alloted'){
			$("#boardRegist").modal();
		}
		else {
			if (confirm("Та 'Хуваарилаагүй' болгохдоо итгэлтэй байна уу?")) {
				$("#boardRegist-form").submit();
			}
			
		}
	}
}

/*function notToAllot(element) {
	var val = '';
	val = $(element).val();
	var csrf = $("#__csrf__").val();
	var param = {};
	var vals = $("div#pnlTableMyOrdersManager input[type='checkbox']:checked");
	var tmp = "";
	$.each(vals, function(k, val) {
		tmp = tmp + val.value + ";";
	});
	val = tmp.slice(0, -1);
	$("#rejectproductids").val(val);
	param._csrf = csrf;
	param.productids = val;
	if (val != null && val != "") {
		$
				.ajax({
					type : "POST",
					url : "/myordersManager/reject",
					async : false,
					dataType : "json",
					data : param,
				});
	}
}*/