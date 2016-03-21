var TableAdvanced = function() {
	var initTable1 = function() {

		var table = $('#sample_1');

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);

			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;			

			var aData = oTable.fnGetData(nRow);
			var jqTds = $('form input');
			var textarea = $('form textarea');
			
			jqTds[2].value = aData[0];
			jqTds[3].value = aData[1];
			jqTds[4].value = aData[2];
			textarea[0].value = aData[4];
			
			$.ajax({
				type : "POST",
				url : "/room",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {

						oTable.fnUpdate(result.data.id, nRow, 0, false);
						oTable.fnUpdate(result.data.code, nRow, 1, false);
						oTable.fnUpdate(result.data.name, nRow, 2, false);
						oTable.fnUpdate(result.data.isActive, nRow, 3, false);
						oTable.fnUpdate('<a class="edit" href="">Засах</a>',
								nRow, 4, false);
						oTable.fnUpdate('<a class="delete" href="">Устгах</a>',
								nRow, 5, false);
						oTable.fnDraw();

						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 0);
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
		
		/* Fixed header extension: http://datatables.net/extensions/keytable/ */

		var oTable = table.dataTable({
			// Internationalisation. For more info refer to http://datatables.net/manual/i18n
			"language" : {
				"aria" : {
					"sortAscending" : ": activate to sort column ascending",
					"sortDescending" : ": activate to sort column descending"
				},
				"emptyTable" : "Хүснэгтэд өгөгдөл алга",
				"info" : "Нийт _TOTAL_ илэрцээс _START_ ээс _END_",
				"infoEmpty" : "Талбар олдсонгүй",
				"infoFiltered" : " ",
				"lengthMenu" : "  ",
				"search" : "Хайх: ",
				"zeroRecords" : "Тохирох илэрц олдсонгүй"
			},
			"order" : [ [ 0, 'asc' ] ],
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] // change per page values here
			],
			"pageLength" : 10, // set the initial value,
			"columnDefs" : [ { // set default column settings
				'orderable' : true,
				'targets' : [ 0 ]
			}, {
				"searchable" : true,
				"targets" : [ 0 ]
			} ],
			"order" : [ [ 1, "asc" ] ]
		});

		var oTableColReorder = new $.fn.dataTable.ColReorder(oTable);

		var tableWrapper = $('#sample_1_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper
		tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown

		$('#sample_1')
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
							param.id = rowData[0];

							bootbox
									.confirm({
										message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
										callback : function(result) {
											if (result == false) {
												return;
											} else {

												$
														.ajax({
															type : "POST",
															url : "/room/delete",
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
																	alert(result.message);
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

										}
									});

						});

		table.on('click', '.edit', function(e) {
			e.preventDefault();

			/*
			 * Get the row as a parent of the link that was clicked on
			 */
			var nRow = $(this).parents('tr')[0];

			if (nEditing !== null && nEditing != nRow) {
				/*
				 * Currently editing - but not this row - restore the old before
				 * continuing to edit mode
				 */
				restoreRow(oTable, nEditing);
				editRow(oTable, nRow);
				nEditing = nRow;
			} else if (nEditing == nRow && $(this).attr("method") == "save") {
				/* Editing this row and want to save it */
				saveRow(oTable, nEditing);
				nEditing = null;
			} else {
				/* No edit in progress - let's start one */
				editRow(oTable, nRow);
				nEditing = nRow;
			}
		});
	}

	return {

		//main function to initiate the module
		init : function() {

			if (!jQuery().dataTable) {
				return;
			}

			console.log('me 1');

			initTable1();

			console.log('me 2');
		}

	};

}();