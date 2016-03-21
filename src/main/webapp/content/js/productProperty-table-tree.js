var TableTree = function() {

	var demo1 = function() {

		jQuery('#gtreetable')
				.gtreetable(
						{

							defaultActions : [
									/*
									 * { name: '${createBefore}', event:
									 * function (oNode, oManager) {
									 * oNode.add('before', 'default'); } }, {
									 * name: '${createAfter}', event: function
									 * (oNode, oManager) { oNode.add('after',
									 * 'default'); } },
									 */
									// {
									// name : '${createProperty}',
									// event : function(oNode, oManager) {
									// $('#large').modal('show').trigger('shown');
									// $('#productCategoryId').val(oNode.getId());
									// $('#productCategoryName').val(oNode.getName());
									//    				
									//
									// $.ajax({
									// type: "GET",
									// url: "/productcategory/" +oNode.getId(),
									// async: false,
									// dataType: "json",
									// success: function(
									// result) {
									// if (result.success == true) {
									// var dataTable =
									// $('#pp_editable_1').dataTable();
									// dataTable.fnClearTable();
									// if(result.data.listProperties.length > 0)
									// dataTable.fnAddData(result.data.listProperties);
									// } else {
									// alert(result.message);
									// }
									// },
									// error: function() {
									// alert("Үйлдэл амжилтгүй боллоо. Дахин
									// оролдоно уу.");
									// }
									// });
									//    				
									// }
									// },
									{
										name : '${createFirstChild}',
										event : function(oNode, oManager) {
											oNode.add('firstChild', 'default');
										}
									},
									{
										name : '${createLastChild}',
										event : function(oNode, oManager) {
											oNode.add('lastChild', 'default');
										}
									},
									{
										divider : true
									},
									{
										name : '${update}',
										event : function(oNode, oManager) {
											oNode.makeEditable();
										}
									},
									{
										name : '${delete}',
										event : function(oNode, oManager) {
											bootbox
													.confirm({
														message : "Өгөгдлийг устгахдаа итгэлтэй байна уу?",
														callback : function(
																result) {
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

							'source' : function(id) {
								reload: return {
									type : 'GET',
									url : '/productcategory/getnodes',
									data : {
										'id' : id
									},
									dataType : 'json',
									error : function(XMLHttpRequest) {
										alert(XMLHttpRequest.status + ': '
												+ XMLHttpRequest.responseText);
									}
								}
							},
							'onSave' : function(oNode) {
								var csrf = $("#__csrf__").val();
								var param = {};
								param._csrf = csrf;
								param.id = oNode.getId();
								param.parent = oNode.getParent();
								param.name = oNode.getName();
								param.position = oNode.getInsertPosition();
								param.related = oNode.getRelatedNodeId();
								param.type = oNode.type;
								param.catLevel = oNode.level;

								if (oNode.getName() == "") {
									Metronic.startPageLoading({
										animate : true
									});

									CRSWebUtils.showAlert("danger", "warning",
											"Ангилалын нэр оруулна уу.", 0);
									setTimeout(function() {
										location.reload(1);
									}, 2000);
								} else {
									return {
										type : 'POST',
										url : "/productcategory",
										data : param,
										dataType : 'json',
										success : function(result) {
											if (result.success == true) {
												CRSWebUtils
														.showAlert(
																"success",
																"check",
																"Амжилттай хадгалагдлаа.",
																0);
												oNode._save(result.data);
												oNode.reload();
												// document.location.reload(true);

											} else {
												alert(result.message);
												CRSWebUtils.showAlert("danger",
														"warning",
														result.message, 0);
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
									};
								}
							},
							'onDelete' : function(oNode) {
								var csrf = $("#__csrf__").val();
								var param = {};
								param._csrf = csrf;
								param.id = oNode.getId();
								$
										.ajax({
											type : 'POST',
											url : "/productcategory/delete",
											dataType : 'json',
											data : param,
											success : function(result) {
												if (result.success == true) {
													// oNode.remove();
													CRSWebUtils
															.showAlert(
																	"success",
																	"check",
																	"Амжилттай устгагдлаа.",
																	0);
												} else {
													CRSWebUtils.showAlert(
															"danger",
															"warning",
															result.message, 0);
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
							},
							'types' : {
								'default' : 'glyphicon glyphicon-folder-open',
								folder : 'glyphicon glyphicon-folder-open'
							},
							'inputWidth' : '200px',
							'language' : 'mn'
						});
	}

	return {
		// main function to initiate the module
		init : function() {
			demo1();
		}
	};
}();