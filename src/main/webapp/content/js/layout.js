
jQuery(document).ready(function() {    
	$("#btnLogout").click(function() {
		$("#logout-form").submit();		
	});
	
	//дохио ирсэн эсэхийг шалгах 
	CRSWebUtils.findLatestNotifications();
	setInterval(CRSWebUtils.findLatestNotifications, 33000);
});