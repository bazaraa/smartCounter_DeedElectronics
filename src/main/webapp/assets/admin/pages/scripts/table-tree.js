var TableTree = function() {

    var demo1 = function() {

        jQuery('#gtreetable').gtreetable({
            'source': function(id) {
        		reload : return {
                    type: 'GET',
                    url: '/productcategory/getnodes',
                    data: {
                        'id': id
                    },
                    dataType: 'json',
                    error: function(XMLHttpRequest) {
                        alert(XMLHttpRequest.status + ': ' + XMLHttpRequest.responseText);
                    }
                }
            },
            'onSave':function (oNode) {
            	var csrf = $("#__csrf__").val();
        		var param = {};
        		param._csrf = csrf;	
        		param.id 		= 	oNode.getId();
        		param.parent 	= 	oNode.getParent();
        		param.name 		= 	oNode.getName();
        		param.position 	= 	oNode.getInsertPosition();
        		param.related 	= 	oNode.getRelatedNodeId();
        		param.type 		=	oNode.type;
        		param.catLevel 	=	oNode.level;
        		
                return {
                    type: 'POST',
                    url: "/productcategory",
                    data: param,
                    dataType: 'json',
                    success : function(result) {
        				if (result.success == true) {
        					oNode._save(result.data);
        					CRSWebUtils.showAlert("success", "check", "Амжилттай хадгалагдлаа.", 0);
        					document.location.reload(true);
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
                  };
              },
              'onDelete':function (oNode) {
            	  	var csrf = $("#__csrf__").val();
            	  	var param = {};
            	  	param._csrf = csrf;
            	  	param.id = oNode.getId();
					return {
						type: 'POST',
						url: "/productcategory/delete",
						dataType: 'json',
						data : param,
	        			success : function(result) {
	        				if (result.success == true) {
	        					CRSWebUtils.showAlert("success", "check", "Амжилттай устгагдлаа.", 0);
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
					};
            }, 
            'types': { default: 'glyphicon glyphicon-folder-open', folder: 'glyphicon glyphicon-folder-open'},
            'inputWidth': '200px',
            'language': 'mn'
        });
    }
    
    return {
        // main function to initiate the module
        init: function() {
            demo1();
        }
    };
}();