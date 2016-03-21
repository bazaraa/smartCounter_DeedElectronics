var onlineRequestsTable = function() {

	var handleTable = function() {
		function saveRow(oTable, nRow) {
			var jqSelects = $('select', nRow);
			var jqInputs = $('input', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;

			var rowData = oTable.DataTable().row(nRow).data();

			param.id = jqInputs[0].value;
			param.onlineStatus = jqSelects[0].value;	

			$.ajax({
				type : "GET",
				url : "/onlinerequest/savedRequest",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {

						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 0);
						
						if(result.data != null){
							window.location.href = result.data;
						}
						
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

		var table = $('#onlinerequests_table');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ {
				'orderable' : true,
				'targets' : [ 1 ]
			},
			{
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : true,
			} ],
			"order" : [ [ 4, "asc" ] ]
		});

		var tableWrapper = $("#onlinerequests_table_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		});

		var nNew = false;

		table.on('click', '.edit', function(e) {
			e.preventDefault();
			var me = $(this);
			var nEditing = me.closest("tr");
			saveRow(oTable, nEditing);
		});

		function getHtmlOptions(options, selectedValue) {
			var html = '<option value="">Сонгох...</option>'
			for (var i = 0; i < options.length; i++) {
				var item = options[i]
				var selected = item.label === selectedValue ? 'selected' : ''
				html = html + '<option value="' + item.value + '"' + selected
						+ '>' + item.label + '</option>';
			}
			return html;
		}

	}

	return {
		init : function() {
			handleTable();
		}
	};

}();