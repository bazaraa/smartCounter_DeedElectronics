//var searchresultTable = function() {
//
//	var handleTable = function() {
//		var table = $('#searchResults_table');
//
//		var oTable = table.dataTable({
//			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
//			"pageLength" : 20,
//			"bLengthChange" : false,
//			"language" : CRSWebUtils.dtLangMN,
//			"columnDefs" : [ {
//				'orderable' : true,
//				'targets' : [ 1 ]
//			}, {
//				"searchable" : true,
//				"targets" : [ 1 ]
//			}, {
//				"targets" : 0,
//				"visible" : true,
//			} ],
//			"order" : [ [ 1, "asc" ] ]
//		});
//
//		var tableWrapper = $("#searchResults_table_wrapper");
//
//		tableWrapper.find(".dataTables_length select").select2({
//			showSearchInput : true
//		});
//
//		var nNew = false;
//
//		table.on('click', '.edit', function(e) {
//			e.preventDefault();
//			var me = $(this);
//			var nEditing = me.closest("tr");
//			saveRow(oTable, nEditing);
//		});
//
//		function getHtmlOptions(options, selectedValue) {
//			var html = '<option value="">Сонгох...</option>'
//			for (var i = 0; i < options.length; i++) {
//				var item = options[i]
//				var selected = item.label === selectedValue ? 'selected' : ''
//				html = html + '<option value="' + item.value + '"' + selected
//						+ '>' + item.label + '</option>';
//			}
//			return html;
//		}
//
//	}
//
//	return {
//		init : function() {
//			handleTable();
//		}
//	};
//
//}();