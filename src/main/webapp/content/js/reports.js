var ReportForm = function() {

	var bindEvent = function() {
		$('.date-picker').datepicker({
			rtl : Metronic.isRTL(),
			autoclose : true
		});
		
		$(".clsReportAddon")
				.click(
						function() {
							var me = $(this);

							var parentTable = me.closest("table");
							var subTitle = parentTable.find(".tdReportTitle").html();
							var reportCode = parentTable
									.find(".spanReportCode").text();

							$(".row.clsPnlSubFilter").hide();
							$("#pnlSubFilter_" + reportCode).show();
							$("#modalReportSubFilter-form").attr("action",
									"/report/" + reportCode);
							$("#modalSubTitle").text("(" + subTitle + ")");
							
							if(subTitle == 'Зурхайч нарын тайлан') {
								$('#jStartDateID').datepicker({
								    format: "yyyy",
								    minViewMode: 2,
								    autoclose: true
								});
								$('#jEndDateID').datepicker({
								    format: "yyyy",
								    minViewMode: 2,
								    autoclose: true
								});
								$('#uOnID').datepicker({
								    format: "yyyy",
								    minViewMode: 2,
								    autoclose: true
								});
								$("#pnlSubfilterDateID").hide();
								$("div#pnlSubfilterDateID input").attr("disabled", true);
							}else if(subTitle == 'Жолооч гүйцэтгэл тайлан'){
								$("#pnlSubfilterDateID").hide();
								$("div#pnlSubfilterDateID input").attr("disabled", true);
								$('#sarJilsongoh').datepicker({
								    format: "yyyy",
								    minViewMode: 2,
								    autoclose: true
								});
								$('#jilsongohID').datepicker({
								    format: "yyyy",
								    minViewMode: 2,
								    autoclose: true
								});
								$('#sarJilsongohID').datepicker({
								    format: "yyyy",
								    minViewMode: 2,
								    autoclose: true
								});
							}else {
								$("#pnlSubfilterDateID").show();
								$("div#pnlSubfilterDateID input").attr("disabled", false);
							}
							$("#modalReportSubFilter").modal();

							ReportForm.initSubFilter(reportCode);

						});
	};

	var initSubFilter = function(reportCode) {
		switch (reportCode) {
		case "carhuraangui":
			//Машины хураангуй тайлан
			initCarHuraangui();
			break;
		case "carchiglelhuraangui":
			//Машины чиглэлийн хураангуй тайлан
			initCarChiglelHuraangui();
			break;
		case "carzahialga":
			initCarzahialga();
			break;
		case "busadbuteegdehuun":
			//Бусад бүтээгдэхүүний тайлан
			initOtherProducts();
			initOtherTypes();
			break;
		case "tuslamj":
			//Тусламж тайлан
			initTuslamj();
			break;
		case "hanahadgalaltiinsariin":
			//Хана хадгалалт сар
			initHanaHadgalaltSar();
			break;
		case "hanaedzuils" :
			initHanaEdZuils();
			break;
		case "hanadelgerengui" :
			initHanaDelgerengui();
			break;
		case "caruilchilgee" :
			initCarUilchilgee();
			break;
		case "godUilchilgee" :
			initGodUilchilgee();
			break;
		case "godMedeelel" :
			initGodMedeelelReligion();
			initGodMedeelelCizit();
			break;
		case "jolooch" :
			initJolooch();
			break;
		case "kassiinorlogo":
			initKassUser();
			break;	
		case "stoneborluulalt" : 
			initStoneBorluulalt();
			break;
		case "zurhaich" :
			initZurhaich();
			break;
		default:
			break;
		}

	}

	return {
		init : function() {
			bindEvent();
			
			$('#saveBoardRegist').click(function(){
				if($("#modalSubTitle").text() == "(Чулууны борлуулалтын тайлан)"){
					var a = dateDiff(new Date($('#modalTxtBegDate').val()), new Date($('#modalTxtEndDate').val()));
					if(a >= 31){
						CRSWebUtils.showAlert("danger", "warning",
								"Уг тайлан 31 хоног дотор гарна.", 5);
						return false;
					}
				}		
			});
			
		},
		initSubFilter : initSubFilter
	};
}();

function initHanaDelgerengui() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/hanadelgerengui/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				$("#hanadelgerenguiCompanyList").empty();
				var cmbCompany = $("#hanadelgerenguiCompanyList");
				cmbCompany.append("<option value='all' >Сонгох...</option>");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
}
function initHanaHadgalaltSar() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/hanahadgalaltiinsariin/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				$("#hanahadgalaltiinsariinCompanyList").empty();
				var cmbCompany = $("#hanahadgalaltiinsariinCompanyList");
				cmbCompany.append("<option value='all' >Сонгох...</option>");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
}
function initKassUser() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/kassiinorlogo/findlocation",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var users = result.data;
				$("#cmbKassiinOrlogoUsers").empty();
				var cmbUsers = $("#cmbKassiinOrlogoUsers");
				cmbUsers.append("<option value='all' >Сонгох...</option>");
				for (var i = 0; i < users.length; i++) {
					cmbUsers.append("<option value='"
							+ users[i].userId + "' >"
							+ users[i].userName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
}
function initOtherTypes() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/OtherProducts/findtypes",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var types = result.data;
				$("#otherProductTypeList").empty();
				var cmbTypes = $("#otherProductTypeList");
				cmbTypes.append("<option value='all' >Сонгох...</option>");
				for (var i = 0; i < types.length; i++) {
					cmbTypes.append("<option value='"
							+ types[i].typeId + "' >"
							+ types[i].typeName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
}
function initHanaEdZuils() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/hanaedzuils/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				$("#hanedzuilsCompanyList").empty();
				var cmbCompany = $("#hanedzuilsCompanyList");
				cmbCompany.append("<option value='all' >Сонгох...</option>");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
}
function initOtherProducts() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/OtherProducts/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				$("#otherProductCompanyList").empty();
				var cmbCompany = $("#otherProductCompanyList");
				cmbCompany.append("<option value='all' >Сонгох...</option>");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
}
function initTuslamj() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/tuslamj/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				$("#tuslamjCompanyList").empty();
				var cmbCompany = $("#tuslamjCompanyList");
				cmbCompany.append("<option value='all' >Сонгох...</option>");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
}
function initCarHuraangui() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/carhuraangui/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				var cmbCompany = $("#cmbCarHuraanguiCompany");
				cmbCompany.html("");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}

function initCarChiglelHuraangui() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/carchiglelhuraangui/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				var cmbCompany = $("#cmbCarChiglelHuraanguiCompany");
				cmbCompany.html("");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}
function initCarzahialga() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/carzahialga/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				var cmbCompany = $("#cmbCarZahialgaTailan");
				cmbCompany.html("");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}
function initCarUilchilgee() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/caruilchilgee/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var companies = result.data;
				var cmbCompany = $("#cmbCarUilchilgeeTailan");
				cmbCompany.html("");
				for (var i = 0; i < companies.length; i++) {
					cmbCompany.append("<option value='"
							+ companies[i].companyId + "' >"
							+ companies[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}
function initGodUilchilgee() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/godUilchilgee/findNutagLuulah",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var nutagluulah = result.data;
				var cmbCompany = $("#cmbGodUilchilgeeTailan");
				cmbCompany.html("");
				for (var i = 0; i < nutagluulah.length; i++) {
					cmbCompany.append("<option value='"
							+ nutagluulah[i].id + "' >"
							+ nutagluulah[i].name + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
	
	$.ajax({
		type : "GET",
		url : "/report/godUilchilgee/findUilchilgeeTurul",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var turul = result.data;
				var cmbCompany = $("#cmbGodUilchilgeeTurul");
				cmbCompany.html("");
				for (var i = 0; i < turul.length; i++) {
					cmbCompany.append("<option value='"
							+ turul[i].id + "' >"
							+ turul[i].name + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}
function initGodMedeelelReligion() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/godMedeelel/findReligion",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var nutagluulah = result.data;
				var cmbCompany = $("#cmbGodMedeelelReligion");
				cmbCompany.html("");
				for (var i = 0; i < nutagluulah.length; i++) {
					cmbCompany.append("<option value='"
							+ nutagluulah[i].id + "' >"
							+ nutagluulah[i].name + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}
function initGodMedeelelCizit() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/godMedeelel/findCizit",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var nutagluulah = result.data;
				var cmbCompany = $("#cmbGodMedeelelCizit");
				cmbCompany.html("");
				for (var i = 0; i < nutagluulah.length; i++) {
					cmbCompany.append("<option value='"
							+ nutagluulah[i].id + "' >"
							+ nutagluulah[i].name + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}
function initJolooch() {
	
	if($("#cmbjolooch").val() == "sar"){
		$("#sarShow").show();
		$("#sarJilShow").show();
		$("#jilShow").hide();
	}else{
		$("#sarShow").hide();
		$("#jilShow").show();
		$("#sarJilShow").hide();
	}
	
	$("#cmbjolooch").change(function(){
		if($("#cmbjolooch").val() == "sar"){
			$("#sarShow").show();
			$("#jilShow").hide();
			$("#sarJilShow").show();
		}else{
			$("#sarShow").hide();
			$("#jilShow").show();
			$("#sarJilShow").hide();
		}
	});
	
	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/carguitsetgel/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var nutagluulah = result.data;
				var cmbCompany = $("#joloochCompanyList");
				cmbCompany.html("");
				cmbCompany.append("<option value='00'>Бүгд</option>");
				for (var i = 0; i < nutagluulah.length; i++) {
					cmbCompany.append("<option value='"
							+ nutagluulah[i].companyId + "' >"
							+ nutagluulah[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});
	
}
function initStoneBorluulalt() {

	Metronic.startPageLoading({
		animate : true
	});

	$.ajax({
		type : "GET",
		url : "/report/stoneBorluulat/findcompanies",
		async : true,
		dataType : "json",
		success : function(result) {
			if (result.success) {
				var company = result.data;
				var cmbCompany = $("#cmbStoneBorluulalt");
				cmbCompany.html("");
				cmbCompany.append("<option value=''>Сонгох</option>");
				for (var i = 0; i < company.length; i++) {
					cmbCompany.append("<option value='"
							+ company[i].companyId + "' >"
							+ company[i].companyName + "</option>");
				}
			}
			Metronic.stopPageLoading();
		},
		error : function() {
			Metronic.stopPageLoading();
			CRSWebUtils.showAlert("danger", "warning",
					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
		}
	});

}
function initZurhaich() {
	
	$("#zTuluw").ready(function(){
		if($("#zTuluw").val() == "uliral"){
			$("#zUon").show();
			$("#zUuliral").show();
			$("#jStartDateId").hide();
			$("#jEndDateId").hide();
		}
		if($("#zTuluw").val() == "jil"){
			$("#zUon").hide();
			$("#zUuliral").hide();
			$("#jStartDateId").show();
			$("#jEndDateId").show();
		}
	});
	
	$("#zTuluw").change(function(){
		if($("#zTuluw").val() == "uliral"){
			$("#zUon").show();
			$("#zUuliral").show();
			$("#jStartDateId").hide();
			$("#jEndDateId").hide();
		}
		if($("#zTuluw").val() == "jil"){
			$("#zUon").hide();
			$("#zUuliral").hide();
			$("#jStartDateId").show();
			$("#jEndDateId").show();
		}
	});
	
//	Metronic.startPageLoading({
//		animate : true
//	});

//	$.ajax({
//		type : "GET",
//		url : "/report/carguitsetgel/findcompanies",
//		async : true,
//		dataType : "json",
//		success : function(result) {
//			if (result.success) {
//				var nutagluulah = result.data;
//				var cmbCompany = $("#joloochCompanyList");
//				
//				cmbCompany.append("<option value='00'>Бүгд</option>");
//				for (var i = 0; i < nutagluulah.length; i++) {
//					cmbCompany.append("<option value='"
//							+ nutagluulah[i].companyId + "' >"
//							+ nutagluulah[i].companyName + "</option>");
//				}
//			}
//			Metronic.stopPageLoading();
//		},
//		error : function() {
//			Metronic.stopPageLoading();
//			CRSWebUtils.showAlert("danger", "warning",
//					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
//		}
//	});
	
};

function dateDiff(begDate,endDate){
	  //Get 1 day in milliseconds
	  var one_day=1000*60*60*24;

	  // Convert both dates to milliseconds
	  var date1_ms = begDate.getTime();
	  var date2_ms = endDate.getTime(); 

	  // Calculate the difference in milliseconds
	  var difference_ms = date2_ms - date1_ms;
	     
	  // Convert back to days and return
	return Math.round(difference_ms/one_day); 
}