var boardTableEditable = function() {
	
    var handleTable = function() {
    	// service combobox change
    	$('#service').change(function() {
    		var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.service = $("#service").val();
			$.ajax({
				type : "POST",
				url : "/board/getboardtype",
				async : true,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						//board type d option nemeh
						$('#boardType option').remove();
						var $option =$('<option>')
							.val("")
							.text("Cонгох...")
						$('#boardType').append($option);
						for(var i in result.data){
							var $option =$('<option>')
								.val(result.data[i].id)
								.text(result.data[i].name)
							$('#boardType').append($option);
						}
					} else {
						CRSWebUtils.showAlert("danger", "warning",result.message, 0);
					}
				},
				error : function() {
					CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});
    	}); 
    	////////////////////////////// board type
    	//шинээр төрөл нэмэх
    	$('#saveType').click(function() {
    		if($("#typeName").val() != "") {
	    		if($("#service option:selected").val() != "" ){
		    		var csrf = $("#__csrf__").val();
					var param = {};
					param._csrf = csrf;
					param.name = $("#typeName").val();
					param.service = $("#service option:selected").val();
					$.ajax({
						type : "POST",
						url : "/board/type",
						async : true,
						dataType : "json",
						data : param,
						success : function(result) {
							if (result.success == true) {
								CRSWebUtils.showAlert("success", "check","Амжилттай хадгалагдлаа.", 0);
								$option =$('<option>')
									.val(result.data.id)
									.text(result.data.name)
									.prop('selected', true);
								$('#boardType').append($option);
							} else {
								CRSWebUtils.showAlert("danger", "warning",result.message, 0);
							}
						},
						error : function() {
							CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
						}
					});
	    		} else {
	    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг сонгоно уу.", 0);
	    		}
	    		$("#typeName").val("");
				$("#typeModal").modal('hide');
	    	} else {
				alert("Нэрийг оруулна уу.");
			}
    	});
    	//төрөл засах товчийг дарах
    	$("#typeEdit").click(function() {
    		if($("#boardType option:selected").val() !="" &&
    				$("#service option:selected").val() !="" ){
    			$("#typeNameEdit").val($("#boardType option:selected").text());
    			$("#typeModalEdit").modal();
    		} else {
    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг болон төрөлийг сонгоно уу.", 0);
    		}
    	});
    	//төрөл засах доторх засах товч
    	$('#editType').click(function() {
    		if($("#typeNameEdit").val() != "") {
	    		if($("#boardType option:selected").val() !="" &&
	    				$("#service option:selected").val() !="" ){
		    		var csrf = $("#__csrf__").val();
					var param = {};
					param._csrf = csrf;
					param.id = $("#boardType").val();
					param.name = $("#typeNameEdit").val();
					$.ajax({
						type : "POST",
						url : "/board/type",
						async : true,
						dataType : "json",
						data : param,
						success : function(result) {
							if (result.success == true) {
								CRSWebUtils.showAlert("success", "check","Амжилттай хадгалагдлаа.", 0);
								$("#boardType option[value='" + result.data.id + "']").remove();
								$option =$('<option>')
									.val(result.data.id)
									.text(result.data.name)
									.prop('selected', true);
								$('#boardType').append($option);
							} else {
								CRSWebUtils.showAlert("danger", "warning",result.message, 0);
							}
						},
						error : function() {
							CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
						}
					});
	    		} else {
	    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг болон төрөлийг сонгоно уу.", 0);
	    		}
	    		$("#typeNameEdit").val("");
				$("#typeModalEdit").modal('hide');
	    	} else {
				alert("Нэрийг оруулна уу.");
			}
			
    	});
    	//төрөл засах доторх устгах товч
    	$('#deleteType').click(function() {
    		if($("#boardType option:selected").val() != "" &&
    				$("#service option:selected").val() !="" ){
	    		var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = $("#boardType").val();

				bootbox.confirm({
					message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
					callback : function(result) {
						if (result == false) {
							return;
						}
						$.ajax({
							type : "POST",
							url : "/board/type/delete",
							async : true,
							dataType : "json",
							data : param,
							success : function(result) {
								if (result.success == true) {
									CRSWebUtils.showAlert("success", "check","Амжилттай хадгалагдлаа.", 0);
									$("#boardType option[value='" + result.data + "']").remove();
								} else {
									CRSWebUtils.showAlert("danger", "warning",result.message, 0);
								}
							},
							error : function() {
								CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
							}
						});
					}
				});
    		}  else {
    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг болон төрөлийг сонгоно уу.", 0);
    		}
    		$("#typeNameEdit").val("");
			$("#typeModalEdit").modal('hide');
    	});
    	///төрөл combobox 
    	$('#boardType').change(function() {
    		if($("#service option:selected").val() !="" ){
    			var csrf = $("#__csrf__").val();
    			var param = {};
    			param._csrf = csrf;
    			param.boardType = $("#boardType").val();
    			$.ajax({
    				type : "POST",
    				url : "/board/getboardsector",
    				async : true,
    				dataType : "json",
    				data : param,
    				success : function(result) {
    					if (result.success == true) {
    						//board sector d option nemeh
    						$('#boardSector option').remove();
    						var $option =$('<option>')
    							.val("")
    							.text("Cонгох...")
    						$('#boardSector').append($option);
    						for(var i in result.data){
    							var $option =$('<option>')
    								.val(result.data[i].id)
    								.text(result.data[i].name)
    							$('#boardSector').append($option);
    						}
    					} else {
    						CRSWebUtils.showAlert("danger", "warning",result.message, 0);
    					}
    				},
    				error : function() {
    					CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
    				}
    			});
    		} else {
    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг сонгоно уу.", 0);
    		}
    	});
    	/////////////////////////////// SECTOR 
    	//sector засах товч
    	$("#sectorEdit").click(function() {
    		if($("#boardType option:selected").val() != "" && 
    				$("#service option:selected").val() != "" &&
    				$("#boardSector option:selected").val() != ""){
    			
    			$("#sectorEditName").val($("#boardSector option:selected").text());
    			$("#sectorEditNote").val($("#sectorNote").val());
    			$("#sectorEditPrice").val($('#sectorPrice').val());
    			$("#dayOrForeverEdit").val($("#dayOrForever").val());
    			$("#companyEdit").val($("#company").val());
    			var url = $('#sectorImage').attr('src');
    			if(url != null)
    				$('#sectorEditModalImage').attr('src', url);
    			else
    				$('#sectorEditModalImage').attr('src', null);
    			$("#sectorModalEdit").modal();
    		} else {
    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг болон төрөлийг сонгоно уу.", 0);
    		}
    	});
    	///sector combobox
    	$('#boardSector').change(function() {
    		if($("#boardType option:selected").val() !="" &&
    				$("#service option:selected").val() !="" &&
    				$("#boardSector option:selected").val() != ""){
    			var csrf = $("#__csrf__").val();
    			var param = {};
    			param._csrf = csrf;
    			param.id = $("#boardSector").val();
    			$.ajax({
    				type : "POST",
    				url : "/board/sector/get",
    				async : true,
    				dataType : "json",
    				data : param,
    				success : function(result) {
    					if (result.success == true) {
    						console.log(result.data)
    						$("#sectorNote").val(result.data.note);
    						$('#sectorPrice').val(result.data.sectorPrice);
    						$('#dayOrForever').val(result.data.dayOrForever);
    						$('#company').val(result.data.company);
    						var url = result.data.imageUrl;
    						if(url != null)
    							$('#sectorImage').attr('src', url.replace( '//', '/') );
    						else
    							$('#sectorImage').attr('src', null );
    						var rowCount = result.data.rowCount;
    						$("#myList").children().remove();
    						//////////////////////board 
    						//тухайн sector т хамаарах board-ийг дэлэгцэнд харуулах
    						var csrf = $("#__csrf__").val();
    		    			var param = {};
    		    			param._csrf = csrf;
    		    			param.id = $("#boardSector").val();
    						$.ajax({
    		    				type : "POST",
    		    				url : "/board/board/get",
    		    				async : true,
    		    				dataType : "json",
    		    				data : param,
    		    				success : function(result) {
    		    					var data = result.data.boards
    		    					data.sort(function(a,b) {
    		    						return a.boardNumber - b.boardNumber 
    		    					});
    		    					//эгнээ үүсгэх
    		    					for(var i=0; i<rowCount;i++ ){
    		    						$("#myList").append('<ul id="row'+ i +'">' + (i+1) + 
    		    								'-р эгнээ<input type="button" name="rows" value="Хана нэмэх" onclick="addBoard(this)"/></ul>');
    		    					}
    		    					//хана үүсгэх
    		    					for(var i in data){
    		    						$('#row'+data[i].rowNumber).append('<li class="item" onclick="clickLi(this)" id="'+
    		    								data[i].id + '" >' +
    		    								data[i].boardNumber + '</li>');
    		    					}
    		    				},
    		    				error : function() {
    		    					CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
    		    				}
    						});
    					} else {
    						CRSWebUtils.showAlert("danger", "warning",result.message, 0);
    						$("#sectorNote").val("");
    						$("#sectorImage").val(null);
    					}
    				},
    				error : function() {
    					CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
    				}
    			});
    		}
    	});
    	//sector хадгалах
    	$('#saveSector').click(function() {
    		if($('#sectorName').val() != ""){  
	    		if($("#boardType option:selected").val() !="" &&
					$("#service option:selected").val() !="" ){
				  	
	    			//зурагтай болхоор formdata болгож байна
	    			var formData = new FormData();
	    		    formData.append('_csrf', $("#__csrf__").val());
	    		    formData.append('name', $('#sectorName').val());
	    		    formData.append('note', $('#sectorNewNote').val());
	    		    formData.append('sectorPrice', $('#sectorNewPrice').val());
	    		    formData.append('dayOrForever', $('#dayOrForeverNew').val());
	    		    formData.append('boardType', $("#boardType").val());
	    		    formData.append('company', $("#companyNew").val());
	    		    
	    		    if($('#sectorNewImage').val() != "")
	    		    	formData.append('sectorImage', $('#sectorNewImage').prop("files")[0] );
	    		    
					$.ajax({
						type : "POST",
						url : "/board/sector",
						async : true,
						dataType : "json",
						data : formData,
						processData: false,
					    contentType: false,
						success : function(result) {
							if (result.success == true) {
								//option-ны утга солих
								CRSWebUtils.showAlert("success", "check","Амжилттай хадгалагдлаа.", 0);
								$option =$('<option>')
									.val(result.data.id)
									.text(result.data.name)
									.prop('selected', true);
								$('#boardSector').append($option);
								$('#boardSector').change();
							} else {
								CRSWebUtils.showAlert("danger", "warning",result.message, 0);
							}
						},
						error : function() {
							CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
						}
					});
	    		} else {
	    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг болон төрөлийг сонгоно уу.", 0);
	    		}
				$("#sectorName").val("");
				$('#sectorNewImage').val(null);
				$("#sectorModalImage").val(null);
				$("#sectorNewNote").val("");
				$("#sectorModal").modal('hide');
    		} else {
    			alert("Нэрийг оруулна уу.");
    		}
    	});
    	
    	/// sector засах доторх засах
    	$('#editSector').click(function() {
    		if($('#sectorEditName').val() != ""){  
	    		if($("#boardType option:selected").val() !="" &&
	    				$("#service option:selected").val() !="" &&
	    				$("#boardSector option:selected").val() != ""){
	    			//зурагтай болхоор formdata болгож байна
					var formData = new FormData();
	    		    formData.append('_csrf', $("#__csrf__").val());
	    		    formData.append('name', $('#sectorEditName').val() );
	    		    formData.append('sectorPrice', $('#sectorEditPrice').val());
	    		    formData.append('dayOrForever', $('#dayOrForeverEdit').val());
	    		    formData.append('company', $("#companyEdit").val());
	    		    formData.append('note', $('#sectorEditNote').val() );
	    		    formData.append('boardType', $("#boardType").val() );
	    		    formData.append('id',  $("#boardSector").val());
	    		    formData.append('imageUrl', $('#sectorEditModalImage').attr('src'));
	    		    if($('#sectorEditImage').val() != "")
	    		    	formData.append('sectorImage', $('#sectorEditImage').prop("files")[0] );
	    		    
					$.ajax({
						type : "POST",
						url : "/board/sector",
						async : true,
						dataType : "json",
						data : formData,
						processData: false,
					    contentType: false,
						success : function(result) {
							if (result.success == true) {
								//option-ны утга солих
								CRSWebUtils.showAlert("success", "check","Амжилттай хадгалагдлаа.", 0);
								$("#boardSector option[value='" + result.data.id + "']").remove();
								$option =$('<option>')
									.val(result.data.id)
									.text(result.data.name)
									.prop('selected', true);
								$('#boardSector').append($option);
								$('#boardSector').change();
							} else {
								CRSWebUtils.showAlert("danger", "warning",result.message, 0);
							}
						},
						error : function() {
							CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
						}
					});
	    		} else {
	    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээ, төрөл болон секторыг сонгоно уу.", 0);
	    		}
				$('#sectorEditModalImage').val(null);
				$("#sectorEditImage").val(null);
				$("#sectorEditNote").val("");
				$("#sectorEditPrice").val("");
				$("#sectorEditName").val("");
				$("#sectorModalEdit").modal('hide');
    		} else {
    			alert("Нэрийг оруулна уу.");
    		}
    	});
    	//sector устгах
    	$('#deleteSector').click(function() {
    		if($("#boardType option:selected").val() !="" &&
    				$("#service option:selected").val() !="" &&
    				$("#boardSector option:selected").val() != ""){
    			var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.id = $("#boardSector").val();
				bootbox.confirm({
					message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
					callback : function(result) {
						if (result == false) {
							return;
						}
						$.ajax({
							type : "POST",
							url : "/board/sector/delete",
							async : true,
							dataType : "json",
							data : param,
							success : function(result) {
								if (result.success == true) {
									CRSWebUtils.showAlert("success", "check","Амжилттай хадгалагдлаа.", 0);
									$("#boardSector option[value='" + result.data + "']").remove();
								} else {
									CRSWebUtils.showAlert("danger", "warning",result.message, 0);
								}
							},
							error : function() {
								CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
							}
						});
					}
				});
    		} else {
    			CRSWebUtils.showAlert("danger", "warning","Үйлчилгээг, төрөл болон секторыг сонгоно уу.", 0);
    		}
    		$('#sectorEditModalImage').val(null);
			$("#sectorEditImage").val(null);
			$("#sectorEditNote").val("");
			$("#sectorEditPrice").val("");
			$("#sectorEditName").val("");
			$("#sectorModalEdit").modal('hide');
    	});
    	//эгнээ нэмэх
    	$( '#addRows' ).click(function(){
    		if($("#boardSector option:selected").val() != ""){
    			$("#myList").append('<ul id="row'+($("#myList").children().size())+
    					'">' +($("#myList").children().size()+1) +
    				'-р эгнээ<input type="button" name="rows" value="Хана нэмэх" onclick="addBoard(this)"/></ul>');
    		} else {
    			CRSWebUtils.showAlert("danger", "warning","Секторыг сонгоно уу", 0);
    		}
    	});
    	//ханын утга солих
    	$( '#boardEdit').click(function(){
    		//id тай бол үгүй бол
    		if($('#boardID').val() != ""){
    			$('li#'+ $('#boardID').val()).text($('#boardNumber').val());
    		} else {
    			$('li[name="' + $('#boardName').val() + '"]').text($('#boardNumber').val());
    			
    		}
    		$("#boardEditModal").modal('hide');
    	});
    	//хана устгах
    	$( '#boardDelete').click(function(){
    		//id тай бол үгүй бол
    		if($('#boardID').val() != ""){
    			bootbox.confirm({
    				message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
    				callback : function(result) {
    					if (result == false) {
    						return;
    					}
		    			var csrf = $("#__csrf__").val();
						var param = {};
						param._csrf = csrf;
						param.id = $("#boardID").val();
						$.ajax({
							type : "POST",
							url : "/board/board/delete",
							async : true,
							dataType : "json",
							data : param,
							success : function(result) {
								if (result.success == true) {
									$('li#'+ $('#boardID').val()).remove();
									CRSWebUtils.showAlert("success","check","Амжилттай устгагдлаа.",0);
								} else {
									CRSWebUtils.showAlert("danger", "warning",result.message, 0);
								}
							},
							error : function() {
								CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
							}
						});
    				}
    			})
			    		
    		} else {
    			$('li[name="' + $('#boardName').val() + '"]').remove();
    			
    		}
    		$("#boardEditModal").modal('hide');
    	});
    	/// ханыг одоо байгаа байдалаар нь хадгалах
    	$( '#saveBoards' ).click(function(){
    		if($("#boardSector option:selected").val() != ""){
    			var uls = $("#myList").children();
    			if(uls.size() > 0) {
    				for(var i = 0; i < uls.size(); i++){
    				var lis = $(uls[i]).children();
    					if(lis.size( ) > 1){
    						for(var j = 1; j < lis.size(); j++){
    							var csrf = $("#__csrf__").val();
    							var param = {};
    							param._csrf = csrf;
    							param.rowNumber = i;
    							param.colNumber = j;
    							param.boardNumber = $(lis[j]).text();
    							param.boardSector = $("#boardSector").val();
    							param.id = $(lis[j]).attr('id');
    							$.ajax({
    								type : "POST",
    								url : "/board/board",
    								async : true,
    								dataType : "json",
    								data : param,
    								success : function(result) {
    									if (result.success == true) {
    										
    									}
    								},
    								error : function() {
    									CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
    								}
    							});
    						}
    					}
    				}
    				
    				//sector-ийн эгнээ өөрчлөх
    				var formData = new FormData();
    			    formData.append('_csrf', $("#__csrf__").val());
    			    formData.append('id',  $("#boardSector").val());
    			    formData.append('imageUrl', $('#sectorImage').attr('src'));
    			    formData.append('rowCount', uls.size());
    				$.ajax({
    					type : "POST",
    					url : "/board/sector",
    					async : true,
    					dataType : "json",
    					data : formData,
    					processData: false,
    				    contentType: false,
    					success : function(result) {
    						if (result.success == true) {
    							CRSWebUtils.showAlert("success", "check","Амжилттай хадгалагдлаа.", 0);
    						} else {
    							CRSWebUtils.showAlert("danger", "warning",result.message, 0);
    						}
    					},
    					error : function() {
    						CRSWebUtils.showAlert("danger", "warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
    					}
    				});
    				
    			} else {
    				alert("Эгнээ үүсгэнэ үү");
    			}
    		} else {
    			alert("Секторыг сонгоно уу");
    		}
    	});
    };
    
    return {
        // main function to initiate the module
        init: function() {
            handleTable();
        },	
    };

}();
//------------------------------------------------------------------------
// үүссэн хана дээр дарах
var clickLi = function(li){
	$('#boardID').val("");
	$('#boardName').val("");
	$('#boardNumber').val("");
	var str = $(li).text();
	if($(li).attr('id') != null){
		$('#boardID').val($(li).attr('id'));
	} else {
		$('#boardName').val($(li).attr('name'))
	}
	$('#boardNumber').val(str);
	$("#boardEditModal").modal();
};
// үүссэн Хана нэмэх дээр дарах
var addBoard = function(input){
	$(input).parent().append('<li class="item" onclick="clickLi(this)" name="'
			+ ($('.item').size()+1) + '" >'
			+ ($('.item').size()+1) + '</li>');
};

