var dispatcherCarTableEditable = function() {

	var handleTable = function() {

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			var jqSelects = $('select', nRow);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;

			var rowData = oTable.DataTable().row(nRow).data();

			 param.id = jqInputs[0].value;
			 
			 //param.currentDate;				
			 //param.carSchedulerId;				
			 //param.carId;
			 //param.carNumber;				
			 //Хөдлөх цаг
			 //param.comeDate;
			 //param.driverName;
			 //param.driverId;				
			 //param.itemCount;				
			// param.available;
			 //param.out;				
			 //Гарсан цаг
			 //param.outDate;
			 param.available = jqInputs[1].checked;
			 param.note = jqInputs[2].value;
			 param.out = jqInputs[3].checked;
			 param.driverId = jqSelects[0].value;
			 
			$.ajax({
				type : "POST",
				url : "/dispatcherCar/saveoutcar",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {

//						 oTable.fnUpdate(result.data.id, nRow, 0, false);
//						 oTable.fnUpdate(result.data.receiverName, nRow, 7,
//								 false);	
//						 oTable.fnUpdate(result.data.additionNote, nRow, 8,
//						 false);

						CRSWebUtils.showAlert("success", "check",
								"Амжилттай хадгалагдлаа.", 0);
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

		}

		var table = $('#dispatcherCar_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ { 
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : true,
			} ],
			"order" : [ [ 2, "asc" ] ]
		});

		var tableWrapper = $("#dispatcherCar_editable_1_wrapper");

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
			for(var i = 0; i < options.length; i++) {
				var item = options[i]		
				var selected = item.label === selectedValue ? 'selected' : ''
				html = html + '<option value="' + item.value + '"' + selected + '>' + item.label + '</option>';
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