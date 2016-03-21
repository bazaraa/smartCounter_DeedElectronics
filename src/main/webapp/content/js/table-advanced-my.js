var TableAdvanced = function () {
    var initTable1 = function () {
    	
        var table = $('#sample_1');

        /* Fixed header extension: http://datatables.net/extensions/keytable/ */

        var oTable = table.dataTable({
            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "Хүснэгтэд өгөгдөл алга",
                "info": "Нийт _TOTAL_ илэрцээс _START_ ээс _END_",
                "infoEmpty": "Талбар олдсонгүй",
                "infoFiltered": " ",
                "lengthMenu": "  ",
                "search": "Хайх: ",
                "zeroRecords": "Тохирох илэрц олдсонгүй"
            },
            "order": [
                [0, 'asc']
            ],
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            "pageLength": 10, // set the initial value,
            "columnDefs": [{  // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [1, "asc"]
            ]           
        });

        var oTableColReorder = new $.fn.dataTable.ColReorder( oTable );

        var tableWrapper = $('#sample_1_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper
        tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        table.on('click', '.edit', function(e) {
			e.preventDefault();

			/*
			 * Get the row as a parent of the link that was clicked on
			 */
			console.log("test");
			var nRow = $(this).parents('tr')[0];
			var rowData =oTable.DataTable().row(nRow).data();
			console.log(rowData[5]);
		});
    }

    return {

        //main function to initiate the module
        init: function () {

//            if (!jQuery().dataTable) {
//                return;
//            }

            console.log('me 1');

            initTable1();

            console.log('me 2a');
        }

    };

}();