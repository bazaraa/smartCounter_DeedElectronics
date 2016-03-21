var notificationsForm = function() {

    var handleNotificationsForm= function() {
        	$("#notifications_editable_1").dataTable({
    			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
    			"pageLength" : 20,
    			"bLengthChange": false,
    			"bFilter": true,
    			"bPaginate": true,
    	        "info":     false,
    			"language" : CRSWebUtils.dtLangMN,
    			"order": [[ 5, "desc" ]],
    			"columnDefs" : [ { 
    				'orderable' : true,
    				'targets' : [ 0, 1, 2, 3, 4, 5, 6, 7, 8]
    			}, {
    				"searchable" : true,
    				"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8]
    			}, 
    			{
    				"targets": [0, 1, 6, 7],
                    "visible": false,
    			}],
    			"rowCallback": function( row, data, index ) {
				    // Bold the grade for all 'A' grade browsers
				    if ( data[1] == "confirm" && data[7] == "false" ) {
				      $(row).css("color", "#45B6AF");
				      $(row).css("font-weight", "bold");
				    }else if ( data[6] == null || data[6] == "false" ) {
				      $(row).css("font-weight", "bold");
				    }
				  }
    		});

    }

    return {
        //main function to initiate the module
        init: function() {
        	handleNotificationsForm();
        }
    };
}();