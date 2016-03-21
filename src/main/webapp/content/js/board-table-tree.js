var TableTree = function() {

    var demo1 = function() {

        jQuery('#gtreetable').gtreetable({ defaultActions : [{
        	
    			name : '${createProperty}',
    			event : function(oNode, oManager) {
    				$('#large').modal('show').trigger('shown');
    				$('#productCategoryId').val(oNode.getId());
    				$('#productCategoryName').val(oNode.getName());
    				
    	            $.ajax({
    	                type: "GET",
    	                url: "/productcategory/" + oNode.getId(),
    	                async: false,
    	                dataType: "json",
    	                success: function(result) {
    	                    if (result.success == true) {
    	                    	var dataTable = $('#pp_editable_1').dataTable();
    	                    	dataTable.fnClearTable();
    	                    	if(result.data.listProperties.length > 0)
    	                    		dataTable.fnAddData(result.data.listProperties);    	                    	
    	                    } else {
    	                    	CRSWebUtils.showAlert("danger", result.massege, 0);
    	                    }
    	                },
    	                error: function() {
    	                	CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
    	                }
    	            });
    				
    			}
    		}, {
    			name : '${createFirstChild}',
    			event : function(oNode, oManager) {
    				oNode.add('firstChild', 'default');
    			}
    		}, {
    			name : '${createLastChild}',
    			event : function(oNode, oManager) {
    				oNode.add('lastChild', 'default');
    			}
    		}, {
    			divider : true
    		}, {
    			name : '${update}',
    			event : function(oNode, oManager) {
    				oNode.makeEditable();
    			}
    		}, {
    			name : '${delete}',
    			event : function(oNode, oManager) {
    				/*if (confirm(oManager.language.messages.onDelete)) {
    					oNode.remove();
    				}*/
    				bootbox.confirm({
    					message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
    					callback : function(result) {
    						if (result == false) {
    							return;
    						} else {
    							oNode.remove();
    							return;
    						}
    					}
    				});
    			}
    		} ],
        
            'source': function(id) {
        		reload : return {
                    type: 'GET',
                    url: '/board/getboards',
                    data: {'id': id},
                    dataType: 'json',
                    error: function(XMLHttpRequest) {
                        CRSWebUtils.showAlert("danger", XMLHttpRequest.status + ': ' + XMLHttpRequest.responseText, 0);
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
        					CRSWebUtils.showAlert("danger", "warning", result.message, 0);
        				}
        			},
        			error : function() {
        				CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
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
	        					CRSWebUtils.showAlert("danger", "warning",
	        							result.message, 0);
	        				}
	        			},
	        			error : function() {
	        				CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
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