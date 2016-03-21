var orderMonitorForm = function() {

    var handleOrderMonitorForm= function() {
        	$("#ordermonitor_editable_1").dataTable({
    			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
    			"pageLength" : 20,
    			"bLengthChange": false,
    			"bFilter": true,
    			"bPaginate": true,
    	        "info":     false,
    			"language" : CRSWebUtils.dtLangMN,
    			"columnDefs" : [ { 
    				'orderable' : false,
    				'targets' : [ 0, 1, 2, 3, 4, 5, 6 ]
    			}, {
    				"searchable" : true,
    				"targets" : [ 0, 1, 2, 3, 4, 5, 6 ]
    			}, {
    				"targets": 0,
                    "visible": false,
    			}]
    		});

    }

    return {
        //main function to initiate the module
        init: function() {
        	handleOrderMonitorForm();
        }
    };
}();

function formSubmit(elem){
	var id = $(elem).attr("value");
	id = id.replace(/,/g, '');
	$("#productidid").val(id);
	$("#productstatusid").val($("#status" + id).find("option:selected").val());
	
	$("#ordermonitorsave-form").submit();
}