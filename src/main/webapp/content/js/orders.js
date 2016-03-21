/*var ordersTable= function() {

	var handleTable = function() {

		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}

			oTable.fnDraw();
		}

		var table = $('#orders_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bLengthChange": false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ { // set default column settings
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets": 0,
                "visible": false,
			}],
			"order" : [ [ 1, "asc" ] ]
		// set first column as a default sort by asc
		});

		var tableWrapper = $("#orders_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		table
				.on(
						'click',
						'.delete',
						function(e) {
							e.preventDefault();
							
							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents(
									'table').DataTable().row(
									nRow).data();

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

											$.ajax({
														type : "POST",
														url : "/order/delete",
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

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};

}();*/

$(document).ready(function () {
	var table = $('#orders')
    var oTable = table.dataTable({
        "bLengthChange": false,
        "bPaginate": true,
        "bJQueryUI": true,
        "pagingType": "full_numbers",
        "oLanguage" : CRSWebUtils.dtLangMN,
        "iDisplayLength": 30,
    }).rowGrouping({
        bExpandableGrouping: true,
        bExpandSingleGroup: false,
        iExpandGroupOffset: -1,
        asExpandedGroups: [""]
    });

    GridRowCount();
    table.on('click', '.delete', function(e) {
		e.preventDefault();
		var orderId = $(this).closest('tr').data("orderid");

		var csrf = $("#__csrf__").val();
		var param = {};
		param._csrf = csrf;
		param.id = orderId;
		
		bootbox.confirm({
			message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
			callback : function(result) {
				if (result == false) {
					return;
				}
				$.ajax({
					type : "POST",
					url : "/order/delete",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						if (result.success == true) {
							oTable.fnDeleteRow(nRow);
							CRSWebUtils.showAlert("success", "check", "Амжилттай устгагдлаа.", 0);
						} else {
							CRSWebUtils.showAlert("danger", "warning", result.message, 0);
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
});

function GridRowCount() {
    $('span.rowCount-grid').remove();
    $('input.expandedOrCollapsedGroup').remove();

    $('.dataTables_wrapper').find('[id|=group-id]').each(function () {
        var rowCount = $(this).nextUntil('[id|=group-id]').length;
        rowCount = "(" + rowCount + ")";
        $(this).find('td').append($('<span />', { 'class': 'rowCount-grid' }).append($('<b />', { 'text': rowCount })));
    });

    $('.dataTables_wrapper').find('.dataTables_filter').append($('<input />', { 'type': 'button', 'class': 'expandedOrCollapsedGroup collapsed btn green', 'value': 'Бүгдийг нээх' }));

    $('.expandedOrCollapsedGroup').live('click', function () {
        if ($(this).hasClass('collapsed')) {
            $(this).addClass('expanded').removeClass('collapsed').val('Бүгдийг хаах').parents('.dataTables_wrapper').find('.collapsed-group').trigger('click');
        }
        else {
            $(this).addClass('collapsed').removeClass('expanded').val('Бүгдийг нээх').parents('.dataTables_wrapper').find('.expanded-group').trigger('click');
        }
    });
};