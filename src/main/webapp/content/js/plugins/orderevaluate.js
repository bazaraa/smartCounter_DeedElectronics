var orderEvaluateForm = function() {

	return {
		init : function() {

			$("#list_editable_1").dataTable({
				"columns" : [ {
					"data" : "id"
				}, {
					"data" : "extension"
				}, {
					"data" : "paperSize"
				}, {
					"data" : "pageCount"
				}, {
					"data" : "fileName"
				}],
				"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
				"pageLength" : 20,
				"bLengthChange" : false,
				"bFilter" : false,
				"bPaginate" : false,
				"info" : false,
				"language" : CRSWebUtils.dtLangMN,
				"columnDefs" : [ {
					'orderable' : false,
					'targets' : [ 0, 1, 2, 3, 4, 5, 6]
				}, {
					"searchable" : false,
					"targets" : [ 0, 1, 2, 3, 4, 5, 6]
				}, {
					"targets" : 0,
					"visible" : false,
				}, {
					"targets" : 5,
					"render" : function(data, type, full, meta) {
						return '<a class="delete" href="">Устгах</a>';
					}
				}, {
					"targets" : 6,
					"data": "url",
					"render" : function(data, type, full, meta) {
						var str = data;
						if(data == null){
							var res = str;
						} else {
							var res = str.replace("//", "/");
						}
						url = '<a target="_blank" href="' + res + '"> Татаж авах </a>';
						return url;
					}
				} ]
			});
		}
	};
}();

$("#list_editable_1").on('click', '.delete', function(e) {
	e.preventDefault();

	var nRow = $(this).parents('tr')[0];
	var rowData = $(this).parents('table').DataTable().row(nRow).data();

	var csrf = $("#__csrf__").val();
	var param = {};
	param._csrf = csrf;
	param.orderId = $("#orderId").val();	
	param.orderCode = $("#orderCode").val();	
	param.orderEvaluateId = $("#orderEvaluateId").val();	 
	param.orderEvaluateFileId = rowData["id"];
	
	console.log(param);
	
	bootbox.confirm({
		message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
		callback : function(result) {
			if (result == false) {
				return;
			}

			$.ajax({
				type : "POST",
				url : "/orderOrderEvaluate/delete",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						CRSWebUtils.showAlert("success", "check",
								"Амжилттай устгагдлаа.", 0);
					} else {
						alert(result.message);
						CRSWebUtils.showAlert("danger", "warning",
								result.message, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});

		}
	});

});

$(".selectValue").click(
		function() {

			var me = $(this);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.evaluateFileType = me.find(".valueHub").val();

			$.ajax({
				type : "POST",
				url : "/orderOrderEvaluate/getList",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {

						var dataTable = $('#list_editable_1').dataTable();
						dataTable.fnClearTable();
						if (result.data.length > 0) {
							dataTable.fnAddData(result.data);
						}

					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.message, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});

		});