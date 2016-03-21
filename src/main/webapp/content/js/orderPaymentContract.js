var orderPaymentBoardContractTableEditable = function() {

	var handleTable = function() {

		var table = $('#orderPayment_board_contract_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"bPaginate" : false,
			"bFilter" : false,
			"bInfo" : false,
			"autoWidth" : false,
			"columnDefs" : [ {
				"searchable" : false,
				"orderable" : false,
				"targets" : [ 1  ],
			}, {
				"targets" : [ 0 ],
				"visible" : false,
			} ],
			"order" : [ [ 0, "desc" ] ]
		});
	}
	return {

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};
}();
