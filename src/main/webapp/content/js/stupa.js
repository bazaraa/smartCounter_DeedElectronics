var stupaTableEditable = function() {

	var handleTable = function() {

		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}
			oTable.fnDraw();
		}

		var table = $('#stupa_editable_1');

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
		
		var tableWrapper = $("#stupa_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;
		
		table.on('click','.delete', function(e) {
			e.preventDefault();

			var nRow = $(this).parents('tr')[0];
			var rowData = $(this).parents('table').DataTable().row(nRow).data();

			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.id = rowData[0];

			bootbox.confirm({
				message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
				callback : function(result) {
					if (result == false) {
						return;
					}
					$.ajax({
						type : "POST",
						url : "/stupa/delete",
						async : false,
						dataType : "json",
						data : param,
						success : function(
								result) {
							if (result.success == true) {
								oTable.fnDeleteRow(nRow);
								CRSWebUtils.showAlert("success","check","Амжилттай устгагдлаа.",0);
							} else {
								alert(result.message);
								CRSWebUtils.showAlert("danger","warning",result.message,0);
							}
						},
						error : function() {
							CRSWebUtils.showAlert("danger","warning","Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.",0);
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


var stupaForm = function() {

    var handleStupaForm = function() {
        $('#stupa-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                name: { required: true },
                code: { required: true },
                capacity: { required: true, min: 1, number: true },
                location: { required: true }
            },

            messages: {
            	name: { required: "Нэр оруулна уу." },
                code: { required: "Код оруулна уу." },
                capacity: { required: "Хэмжээг оруулна уу.",
                    min: "1-с их тоо оруулна уу.",
                    number: "Тоо оруулна уу"},
                location: { required: "Байршилаа сонгоно уу." }
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

        $('#stupa-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#stupa-form').validate().form()) {
                    $('#stupa-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
        
        $("#formReset").click(function() {
        	$('#stupa-form')[0].reset();
        });
    } 
    return {
        //main function to initiate the module
        init: function() {
        	handleStupaForm();
        }
    };
}();

var addClientStupa = function() {
	
	var handleStupa = function() {
		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}
			oTable.fnDraw();
		}

		var table = $('#stupa_editable_1');

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
		
		var tableWrapper = $("#stupa_editable_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput : true
		// hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;
		
		table.on('click','.delete', function(e) {
			e.preventDefault();

			var nRow = $(this).parents('tr')[0];
			var rowData = $(this).parents('table').DataTable().row(nRow).data();

			bootbox.confirm({
				message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
				callback : function(result) {
					if (result == false) {
						return;
					}
					url = "/stupa/addclient/delete/"+ $('#id').val() +"/" + rowData[0] ;
					window.location.href = url;
				}
			});
		});
		
		$.validator.addMethod(
    	        "regex",
    	        function(value, element, regexp) {
    	            var re = new RegExp(regexp);
    	            return this.optional(element) || re.test(value);
    	        },
    	        "Оруулсан утгаа шалгана уу."
    	);
		
		$('#addClient-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
            	cRegNum: { required: true, regex: /^[а-яА-ЯөӨүҮ]{2}[0-9]{8,}/ }
            },

            messages: {
            	cRegNum: { required: "Регистрийн дугаар оруулна уу",
            		regex: "Регистерийн дугаар 'AБ12345678' гэсэн форматтай криллээр байна"},
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
        });
		
		$("#cRegNum").change(function() {
			//// search regnumber, set value
			
			////рэгистрийн дугаар мөн хэсэгийг шалгана.
			////биш бол alert
			if($(this).val().match(/^[а-яА-ЯөӨүҮ]{2}[0-9]{8,}/ )) {
				var csrf = $("#__csrf__").val();
				var param = {};
				param._csrf = csrf;
				param.regNumber = $("#cRegNum").val();
				$.ajax({
					type : "POST",
					url : "/stupa/getclient",
					async : false,
					dataType : "json",
					data : param,
					success : function(result) {
						//Регистрийн дугаар олдвол форм бөгөнө.
						if (result.success == true) {
							$("#clientID").val(result.data.id);
							$("#clientAge").val(result.data.age);
							$("#clientLname").val(result.data.lname);
							$("#clientFname").val(result.data.fname);
							if(result.data.gender == 1)
								$('#clientGender').val("Эр");
							if(result.data.gender == 0)
								$('#clientGender').val("Эм");
						} else { // үгүй бол цэвэрлэнэ.
							$("#clientID").val(null);
							$("#clientAge").val("");
							$("#clientLname").val("");
							$("#clientFname").val("");
							$('#clientGender').val("");
							CRSWebUtils.showAlert("danger", "warning", "Тухайн регистрийн дугаартай хүн олдсонгүй", 0);
						}
					},
					error : function() {
						CRSWebUtils.showAlert("danger", "warning", "Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
					}
				});
			} else {
				$("#cRegNum").focus();
				$("#clientID").val(null);
				$("#clientAge").val("");
				$("#clientLname").val("");
				$("#clientFname").val("");	
				$('#clientGender').val("");
				$('#cCode').val("");
			}
		});
		
		$("#clean").click(function (){
			$("#clientID").val(null);
			$("#clientAge").val("");
			$("#cRegNum").val("");
			$("#clientLname").val("");
			$("#clientFname").val("");	
			$('#clientGender').val("");
			$('#cCode').val("");
		});
		
		$("#addClient").click(function (){
			if($("#space").val() > 0){
				if (!$('#addClient-form').validate().form()) {
	            	return false;
	            }
				
				if($("#clientID").val() !== null) {
					url = "/stupa/addclient/"+ $('#id').val() +"/" + $('#clientID').val();
					window.location.href = url;
				} else {
					CRSWebUtils.showAlert("danger", "warning", "Тухайн регистрийн дугаартай хүн олдсонгүй", 0);
				}
			} else {
				CRSWebUtils.showAlert("danger", "warning", "Суварга дүүрсэн байна.", 0);
			}
		});
		
	} 
	return {
        //main function to initiate the module
        init: function() {
        	handleStupa();
        }
    };
}();

function setFunerary() {
	$("#funerary option[value='sats']").prop('selected', true);
}