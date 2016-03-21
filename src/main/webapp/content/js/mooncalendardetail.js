var mooncalendarForm = function() {

    var handleMoonCalendarForm= function() {
    	
        $('#mooncalendardetail-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                lunation: { required: true , max: 30, min: 1 },
                yearDate: { required: true },
                sunRiseSet: { required: true }
            },

            messages: {
                lunation: { required: "Билгийн тооллийг оруулна уу.", 
                	max: "30-с бага тоо оруулна уу.",
                	min: "1-с их тоо оруулна уу.",
                	number: "Тоо оруулна уу"},
                yearDate: { required: "Жил-өдөрийг оруулна уу." },
                sunRiseSet: { required: "Нар ургах, шингэх цаг оруулна уу." }
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
            	$("#saveDetail").click();
            }
        });
        $('#mooncalendardetail-form input').keypress(function(e) {
            if (e.which == 13) {
            	$("#saveDetail").click();
                return false;
            }
        });
        //хадгалах. ajax-р хадгалаад дараачийн өдөрлүү(dateDetail) шилжинэ6
        //Билгийн тоолол дараагын өдөр болж
        //нар ургах шингэх нь хэвэндээ байна.
        $("#saveNext").click(function (){

            if (!$('#mooncalendardetail-form').validate().form()) {
            	return false;
            }
            
        	var csrf = $("#__csrf__").val();
        	var param = {};
        	
        	param._csrf = csrf;
        	if(document.getElementById("id").value != 0)
        		param.id = $('#id').val();
        	param.dateDetail = $('#dateDetail').val();
        	param.lunation = $('#lunation').val();
        	param.sunRiseSet = $('#sunRiseSet').val();
        	param.yearDate = $('#yearDate').val();
        	param.description = $('#description').val();
        	
        	param.dashNyam = $('#dashNyam').prop('checked');
        	param.baljinNyam = $('#baljinNyam').prop('checked');
        	param.modonHohimoi = $('#modonHohimoi').prop('checked');
        	param.tersuud = $('#tersuud').prop('checked');
        	
        	$.ajax({
        		type : "POST",
        		url : "/mooncalendar",
        		dataType : "json",
        		data : param,
        		success : function(result) {
        			if (result.success == true) {
        				//update data
        				scheduler.load("/mooncalendar/getdata/" + getDateString( new Date(result.data.dateDetail), ""),"json");
        				CRSWebUtils.showAlert("success", "check", "Амжилттай хадгалагдлаа.", 0)
        				
        				var tDate = new Date($('#dateDetail').val());
        	        	var start = new Date(tDate);
        	    		var end = new Date(tDate);
        	    		start.setDate(tDate.getDate() + 1);
        	    		end.setDate(tDate.getDate() + 2);

        	    		var evs = scheduler.getEvents(start, end);
        	    		if(evs == 0){
        	    			$('#id').val(0);
        	    			var date = new Date($('#dateDetail').val());
        	    			date.setDate(date.getDate() + 1);
        	    			$('#dateDetail').val(getDateString(date, "."));
        	    			var lunation = parseInt($('#lunation').val());
        	    			if(lunation < 30)
        	    				$('#lunation').val(lunation + 1);
        	    			else
        	    				$('#lunation').val(1);
        	    			$('#yearDate').val("");
        	    			$('#dashNyam').prop('checked',false).parent().removeClass("checked");
        	    			$('#baljinNyam').prop('checked',false).parent().removeClass("checked");
        	    			$('#modonHohimoi').prop('checked',false).parent().removeClass("checked");
        	    			$('#tersuud').prop('checked',false).parent().removeClass("checked");
        	    			$('#description').val("");
        	    		} else {
        	    			var splId = evs[0].id.split("_");
        	    			var eventObj = scheduler.getEvent(splId[0]);
        	    			setMoonDetail(eventObj);
        	    		}
        			} else {
        				CRSWebUtils.showAlert("danger", "warning", result.message, 0);
        			}
        		},
        		error : function() {
    				CRSWebUtils.showAlert("danger","warning",
    					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
        		}
        	});	
        });
        
        
        $("#saveDetail").click(function (){

            if (!$('#mooncalendardetail-form').validate().form()) {
            	return false;
            }
            
        	var csrf = $("#__csrf__").val();
        	var param = {};
        	
        	param._csrf = csrf;
        	if(document.getElementById("id").value != 0)
        		param.id = $('#id').val();
        	param.dateDetail = $('#dateDetail').val();
        	param.lunation = $('#lunation').val();
        	param.sunRiseSet = $('#sunRiseSet').val();
        	param.yearDate = $('#yearDate').val();
        	param.description = $('#description').val();
        	
        	param.dashNyam = $('#dashNyam').prop('checked');
        	param.baljinNyam = $('#baljinNyam').prop('checked');
        	param.modonHohimoi = $('#modonHohimoi').prop('checked');
        	param.tersuud = $('#tersuud').prop('checked');
        	
        	$.ajax({
        		type : "POST",
        		url : "/mooncalendar",
        		dataType : "json",
        		data : param,
        		success : function(result) {
        			if (result.success == true) {
        				//update data
        				scheduler.load("/mooncalendar/getdata/" + getDateString( new Date(result.data.dateDetail), ""),"json");
        				CRSWebUtils.showAlert("success", "check", "Амжилттай хадгалагдлаа.", 0);
        			} else {
        				CRSWebUtils.showAlert("danger", "warning", result.message, 0);
        			}
        		},
        		error : function() {
    				CRSWebUtils.showAlert("danger","warning",
    					"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
        		}
        	});
        });
        
    }

    return {
        //main function to initiate the module
        init: function() {
        	handleMoonCalendarForm();
        }
    };
}();
// date g string bolgoh, types hamaarj
function getDateString(date, type) {
	
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString(); 
	var dd  = date.getDate().toString();
	
	if(type == "."){
		return yyyy + "." + (mm[1]?mm:"0"+mm[0]) + "." +(dd[1]?dd:"0"+dd[0]);
	}
	
	if(type == "-"){
		return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" +(dd[1]?dd:"0"+dd[0]);
	}
	
	return yyyy + "" + (mm[1]?mm:"0"+mm[0]) + "" +(dd[1]?dd:"0"+dd[0]);
};

//сонгосон өдрийн мэдээллийг modal дээр харуулах.
function setMoonDetail(event){
	clrMoonDetail();
	$('#id').val(event.id);
	$('#dateDetail').val(getDateString( new Date(event.dateDetail), "."));
	$('#lunation').val(event.lunation);
	$('#sunRiseSet').val(event.sunRiseSet);
	$('#yearDate').val(event.yearDate);
	$('#description').val(event.description);
	
	if(event.dashNyam)
		$('#dashNyam').prop('checked',true).parent().addClass("checked");
	if(event.baljinNyam)
		$('#baljinNyam').prop('checked',true).parent().addClass("checked");
	if(event.modonHohimoi)
		$('#modonHohimoi').prop('checked',true).parent().addClass("checked");
	if(event.tersuud)
		$('#tersuud').prop('checked',true).parent().addClass("checked");
};
//modal-ийн утга цэвэрлэх
function clrMoonDetail(){
	$('#id').val(0);
	$('#dateDetail').val("");
	$('#lunation').val("1");
	$('#sunRiseSet').val("");
	$('#yearDate').val("");
	$('#description').val("");
	
	$('#dashNyam').prop('checked',false).parent().removeClass("checked");
	$('#baljinNyam').prop('checked',false).parent().removeClass("checked");
	$('#modonHohimoi').prop('checked',false).parent().removeClass("checked");
	$('#tersuud').prop('checked',false).parent().removeClass("checked");
};

$("#selectDate").change(function(){
	
	var date = new Date($("#selectDate").val());
	//cal deer haragdaj bgaa uduruudiig haruulah
	var start = new Date(date);
	var end = new Date(date);
	
	start.setDate(date.getDate() - 6);;
	end.setDate(date.getDate() + 37);
	
	scheduler.load("/mooncalendar/getdata/" + getDateString(start, "") + getDateString(end,""),"json");
	
    scheduler.updateView(date);
});

//cal-ийн тохиргоо
function initCalendar() {
	
	   // <![CDATA[
	scheduler.config.details_on_create = false;
	scheduler.config.details_on_dblclick = false;
	scheduler.config.drag_create = false;
	scheduler.config.dblclick_create = false;
	
	scheduler.config.xml_date = "%Y-%m-%d %H:%i";
	scheduler.config.month_date = "%Y он %F";
	
	//init

	scheduler.init('scheduler_here', new Date(), "month");	
	
	scheduler.attachEvent("onDblClick", function (id, e){
		var splId = id.split("_");
		var eventObj = scheduler.getEvent(splId[0]);
		setMoonDetail(eventObj);
		$("#large").modal();
	})
	
	scheduler.attachEvent("onEmptyClick", function (date, e){
		var start = new Date(date);
		var end = new Date(start);
		end.setDate(start.getDate() + 1);
		
		var evs = scheduler.getEvents(start,new Date(end));
		
		if(evs == 0){
			clrMoonDetail();
			$('#dateDetail').val(getDateString(date, "."));		
			$("#large").modal();
		}
	});
	
	//cal deer дараагын сар, өмнөх сарыг дарсан үед хийгдэх event 	
	scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
		//haragdaj bgaa uduruudiig haruulah
		var temp = new Date(date);
		var start = new Date(temp);
		var end = new Date(temp);
		
		start.setDate(temp.getDate() - 6);;
		end.setDate(temp.getDate() + 37);
		
		scheduler.load("/mooncalendar/getdata/" + getDateString(start, "") + getDateString(end,""),"json");
	    return true;
	});
	
	//илүү click-г false
	scheduler.attachEvent("onCellClick", function (x_ind, y_ind, x_val, y_val, e){
		return false;
	});
	
	scheduler.attachEvent("onCellDblClick", function (x_ind, y_ind, x_val, y_val, e){
		return false;
	});
	
	scheduler.attachEvent("onClick", function (id, e){
		return false;
	});
	
	//event bar deer umnu n haragdah text
	scheduler.templates.event_bar_date = function(start,end,ev){
		return "";
	};
	
	//cal deer haragdaj bgaa uduruudiig haruulah
	var temp = new Date();
	temp.setDate(1);
	var start = new Date(temp);
	var end = new Date(temp);
	
	start.setDate(temp.getDate() - 6);;
	end.setDate(temp.getDate() + 37);
	
	scheduler.load("/mooncalendar/getdata/" + getDateString(start, "") + getDateString(end,""),"json");
	
	//scheduler.updateView(new Date("2012-7-4"));
}
