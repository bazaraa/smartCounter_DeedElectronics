var productPackEditable = function() {

	var handleTable = function() {

		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}
			oTable.fnDraw();
		}

		var table = $('#ppack_editable_1');

		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 20,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ { // set default column settings
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : false,
			} ],
			"order" : [ [ 1, "asc" ] ]
		});

		var tableWrapper = $("#ppack_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		table
				.on(
						'click',
						'.delete',
						function(e) {
							e.preventDefault();

							var nRow = $(this).parents('tr')[0];
							var rowData = $(this).parents('table').DataTable()
									.row(nRow).data();

							var csrf = $("#__csrf__").val();
							var param = {};
							param._csrf = csrf;
							param.id = rowData[0];

							bootbox
									.confirm({
										message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
										callback : function(result) {
											if (result == false) {
												return;
											}

											$
													.ajax({
														type : "POST",
														url : "/productpack/delete",
														async : false,
														dataType : "json",
														data : param,
														success : function(
																result) {
															if (result.success == true) {
																oTable
																		.fnDeleteRow(nRow);
																CRSWebUtils
																		.showAlert(
																				"success",
																				"check",
																				"Амжилттай устгагдлаа.",
																				0);
															} else {
																//alert(result.message);
																CRSWebUtils
																		.showAlert(
																				"danger",
																				"warning",
																				result.message,
																				0);
															}
														},
														error : function() {
															CRSWebUtils
																	.showAlert(
																			"danger",
																			"warning",
																			"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",
																			0);
														}
													});

										}
									});

						});
		
	}

	return {

		// main function to initiate the module
		init : function() {
			handleTable();
		}

	};

}();


var productPackForm = function() {

    var handleProductPackForm= function() {
    	
    	$.validator.addMethod(
    	        "regex",
    	        function(value, element, regexp) {
    	            var re = new RegExp(regexp);
    	            console.log(re.test(value))
    	            return this.optional(element) || re.test(value);
    	        },
    	        "Оруулсан утгаа шалгана уу."
    	);
    	
        $('#productPack-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                code: {
                    required: true,
                    minlength: 2
                },
                name: {
                    required: true,
                    minlength: 2
                },
                packType: {
                    required: true
                },
                price: {
                    required: true,
                    regex: /^[0-9]/
                }
            },

            messages: {
            	code: {
                    required: "Код оруулна уу.",
                    minlength: "Хамгийн багадаа 2 үсэг байна"
                },
                name: {
                    required: "Нэр оруулна уу.",
                    minlength: "Хамгийн багадаа 2 үсэг байна"
                },
                packType: {
                    required: "Төрөл сонгоно уу."
                },
                price: {
                    required: "Үнэ оруулна уу.",
                    regex: "Үнэ талбарт зөвхөн тоо оруулна"
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });
        
        $('#productPack-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#productPack-form').validate().form()) {
                    $('#productPack-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        
        $("#formReset").click(function() {
        	$('#productPack-form')[0].reset();
        });
    }

    return {
        init: function() {

        	handleProductPackForm();
        	
        }

    };

}();

	$('.multi-select').multiSelect({
	  selectableHeader: "<input type='text' style='width : 100%; height: 30px; margin-bottom: 5px;' class='search-input' autocomplete='off' placeholder='Хайлт...'>",
	  selectionHeader: "<input type='text' style='width : 100%; height: 30px; margin-bottom: 5px;' class='search-input' autocomplete='off' placeholder='Хайлт...'>",
	  afterInit: function(ms){
	    var that = this,
	        $selectableSearch = that.$selectableUl.prev(),
	        $selectionSearch = that.$selectionUl.prev(),
	        selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
	        selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';
	
	    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
	    .on('keydown', function(e){
	      if (e.which === 40){
	        that.$selectableUl.focus();
	        return false;
	      }
	    });
	
	    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
	    .on('keydown', function(e){
	      if (e.which == 40){
	        that.$selectionUl.focus();
	        return false;
	      }
	    });
	  },
	  afterSelect: function(){
	    this.qs1.cache();
	    this.qs2.cache();
	  },
	  afterDeselect: function(){
	    this.qs1.cache();
	    this.qs2.cache();
	  }
	});
	
$("#productType").change(function() {
		var csrf = $("#__csrf__").val();
		var param = {};
		param._csrf = csrf;
		param.productTypeId = $("#productType").val();
		$.ajax({
			type : "GET",
			url : "/productpack/pickProduct",
			async : false,
			dataType : "json",
			data : param,
			success : function(result) {
				if (result.success == true) {
					$("#my_multi_select1").remove();
					var len = result.data;
					for(var i = 0; i < len.length; i++){
					}
				}
			},
			error : function() {
			 	CRSWebUtils.showAlert("danger", "warning", "Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
			}
		});
	});

$('#search').keyup(function(){
	
	var val = $(this).val().toLowerCase();
	
	console.log($('#my_multi_select1').val());
	
});

/*
var table = $('#myTable');
var i = $('#myTable tr').length;
function jAdd() {
    $('#myTable').append(
		    '<tr>'+
			'<td><input type="checkbox" class="icheck" /></td>'+
			'<input type="hidden" name="productPackData[' + i + '].id" class="form-control" />'+
			'<td ><input type="text" name="productPackData[' + i + '].productCode" class="form-control" /></td> '+
			'<td><input type="text" name="productPackData[' + i + '].productName" class="form-control" /></td>'+
			'<td><input type="text" name="productPackData[' + i + '].productDesc" class="form-control" /></td>'+
			'<td><input type="text" name="productPackData[' + i + '].productPrice" class="form-control" /></td>'+
			'</tr>');
    		i++
}

function deleteRow(tableID) {
	try {
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;
		for (var i = 0; i < rowCount; i++) {
			var row = table.rows[i];
			var chkbox = row.cells[0].childNodes[0];
			if (null != chkbox && true == chkbox.checked) {
				if (rowCount <= 1) {
					alert("Cannot delete all the rows.");
					break;
				}
				table.deleteRow(i);
				rowCount--;
				i--;
				var reCount = table.rows.length;
				for(var i = 0 ; i <= reCount; i++){
					$('.packid')[i].name = "productPackData["+ i +"].id";
					$('.packCode')[i].name = "productPackData["+ i +"].productCode";
					$('.packName')[i].name = "productPackData["+ i +"].productName";
					$('.packDesc')[i].name = "productPackData["+ i +"].productDesc";
					$('.packPrice')[i].name = "productPackData["+ i +"].productPrice";
				}
			}
		}
	} catch (e) {
		alert(e);
	}
}

$(document).ready(function () {
	var count = $('#myTable tr').length - 1;
	if($('.packid').val() != null){
		for(var i = 0 ; i <= count; i++){
			$('.packid')[i].name = "productPackData["+ i +"].id";
			$('.packCode')[i].name = "productPackData["+ i +"].productCode";
			$('.packName')[i].name = "productPackData["+ i +"].productName";
			$('.packDesc')[i].name = "productPackData["+ i +"].productDesc";
			$('.packPrice')[i].name = "productPackData["+ i +"].productPrice";
		}
	} else { }
		
});
*/