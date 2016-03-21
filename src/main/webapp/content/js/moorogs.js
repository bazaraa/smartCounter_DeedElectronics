var moorogsTableEditable = function() {

	var handleTable = function() {

		var table = $('#moorogs_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,
			"columnDefs" : [ { 
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : false,
			} ],
			"order" : [ [ 1, "asc" ] ]
		});

		var tableWrapper = $("#moorogs_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		}); 

		var nNew = false;		

		table
		.on(
				'click',
				'.delete',
				function(e) {
					e.preventDefault();

					var nRow = $(this).parents('tr')[0];
					var rowData = $(this).parents('table').DataTable()
							.row(nRow).data();
					var jqInputs = $('input', nRow);
					var csrf = $("#__csrf__").val();
					var param = {};
					param._csrf = csrf;
					param.id = rowData[0];

					bootbox
							.confirm({
								message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
								callback : function(result) {
									if (result == false) {
										return;
									}
									
									var id = param.id;
									$
											.ajax({
												type : "GET",
												url : "/moorogs/delete",
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

		
		
	}
	return {
		init : function() {
			handleTable();

		}
	};

}();

