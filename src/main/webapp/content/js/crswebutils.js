var CRSWebUtils = (function () {
    var CRSWeb_Utils = function () {
    	this.dtLangMN = { 
    		    "sEmptyTable":     "Хүснэгт хоосон байна",
    	        "sInfo":           "Нийт _TOTAL_ бичлэгээс _START_ - _END_ харуулж байна",
    	        "sInfoEmpty":      "Тохирох үр дүн алга",
    	        "sInfoFiltered":   "(нийт _MAX_ бичлэгээс шүүв)",
    	        "sInfoPostFix":    "",
    	        "sInfoThousands":  ",",
    	        "sLengthMenu":     "Дэлгэцэд _MENU_ бичлэг харуулна",
    	        "sLoadingRecords": "Ачааллаж байна...",
    	        "sProcessing":     "Боловсруулж байна...",
    	        "sSearch":         "Хайлт:",
    	        "sZeroRecords":    "Тохирох бичлэг олдсонгүй",
    	        "oPaginate": {
    	            "sFirst":    "Эхнийх",
    	                "sLast":     "Сүүлийнх",
    	                "sNext":     "Дараах",
    	                "sPrevious": "Өмнөх"
    	        },
    	        "oAria": {
    	                "sSortAscending":  ": цагаан толгойн дарааллаар эрэмбэлэх",
    	                "sSortDescending": ": цагаан толгойн эсрэг дарааллаар эрэмбэлэх"
    	        }
    	};
    }
    CRSWeb_Utils.prototype = {
		showAlert: function(type, icon, message, seconds, containerId) {
			
			if(!containerId)
			{
				containerId = "#alert_container";
			}
			
            Metronic.alert({
                container: containerId, // alerts parent container(by default placed after the page breadcrumbs)
                place: "prepend", // append or prepent in container 
                type: type,  // alert's type
                message: message,  // alert's message
                close: true, // make alert closable
                reset: true, // close all previouse alerts first
                focus: true, // auto scroll to the alert after shown
                closeInSeconds: seconds, // auto close after defined seconds
                icon: icon // put icon before the message
            });
            
            
            
		},
		bootBoxAddLocale: function(){
			bootbox.addLocale('MN', {
			    OK : 'Тийм',
			    CONFIRM : 'Тийм',
			    CANCEL : 'Болих'
			});
			
			bootbox.setLocale('MN')
		},
		formatMoney: function(value){
			var n = value;
			
			var c = 2;
			var d = "."
			var t = ",";
		    c = isNaN(c = Math.abs(c)) ? 2 : c, 
		    d = d == undefined ? "." : d, 
		    t = t == undefined ? "," : t, 
		    s = n < 0 ? "-" : "", 
		    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		    j = (j = i.length) > 3 ? j % 3 : 0;
		   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		 },
		 parseFloat: function(value) {
			 value = value.toString().replace(/,/g, '');
			 return parseFloat(value);
		 }
    };
    return new CRSWeb_Utils;
})(window);
