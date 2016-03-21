var monitoringTableEditable = function() {

	var handleTable = function() {

		var table = $('#monitoring_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [
					{ // set default column settings
						'orderable' : false,
						'targets' : [ 2, 10, 11, 12, 13, 14, 15, 16, 17, 18,
								19, 20, 21 ]
					}, {
						"targets" : 0,
						"visible" : false,
					}, {
						"searchable" : true,
						"targets" : [ 1 ]
					} ],
			"order" : [ [ 0, "asc" ] ]
		// set first column as a default sort by asc
		});
	}

	return {

		// main function to initiate the module
		init : function() {
			handleTable();

			$("#date").datepicker({
				format : "yyyy.mm.dd"
			});

			if ($("#date").val() == "") {
				$("#date").datepicker("setDate", new Date());
			}
		}

	};

}();

// Хуудас ачааллах үед Сигнал сонгогдоно
$(document).ready(function() {
	var me = $("#signal");

	if (me.is(':checked')) {
		$(".time").hide();
		$(".time").hide();
		$(".time").hide();
		$(".time").hide();
		$(".time").hide();

		$(".signal").show();
		$(".signal").show();
		$(".signal").show();
		$(".signal").show();
		$(".signal").show();
	}

});
// Сигнал сонгох үед
$("#signal").change(function() {
	var me = $(this);

	if (me.is(':checked')) {
		$(".time").hide();
		$(".time").hide();
		$(".time").hide();
		$(".time").hide();
		$(".time").hide();

		$(".signal").show();
		$(".signal").show();
		$(".signal").show();
		$(".signal").show();
		$(".signal").show();
	}

});
// Цаг сонгох үед
$("#time").change(function() {
	var me = $(this);

	if (me.is(':checked')) {
		$(".time").show();
		$(".time").show();
		$(".time").show();
		$(".time").show();
		$(".time").show();

		$(".signal").hide();
		$(".signal").hide();
		$(".signal").hide();
		$(".signal").hide();
		$(".signal").hide();
	}
});

//window.setTimeout(function(){ document.location.reload(true); }, 30000);
