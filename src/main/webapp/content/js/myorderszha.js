$(document).ready(function () {
	

	var today = $.datepicker.formatDate('yymmdd', new Date());
	$.ajax({
		type : "GET",
		url : "/mooncalendar/getdata/" + today,
		async : true,
		dataType : "json",
		success : function(result) {			
			if (result && result.length > 0) {
				var item = result[0];
				
				if(item.lunation)
					$("#mclunation").text(item.lunation);
				if(item.sunRiseSet)
					$("#mcsunriseset").html(item.sunRiseSet.replace('-', "<br />"));
				if(item.yearDate)
					$("#mcyeardate").text(item.yearDate);
			}
		},
		error : function() {
		}
	});
	
	$.ajax({
		type : "GET",
		url : "/myordersZha/weather",
		success : function(result) {	
			
			if(result != "")
			{
				var pnltempweather = $("#pnltempweather");
				
				var index = result.indexOf("<script>");
				result = result.substring(0, index);
				pnltempweather.html(result);
				
				var temperature = "";
				var condition = "";
				pnltempweather.find(".temperature .big .c").each(function() {
					temperature = $(this).text();
					temperature = "<span style='font-size: 18px; font-weight: bold;'>"+temperature+"</span>"
				});
				pnltempweather.find(".condition .temp-desc").each(function() {
					condition = $(this).text();				
				});	
				pnltempweather.html("");
				
				$("#mcweather").html(temperature + " | " + condition);
			}
			
		},
		error : function() {
		}
	});
	
		
    $('#myorderszha').dataTable({
        "bLengthChange": false,
        "bPaginate": true,
        "bJQueryUI": true,
        "bFilter": true, 
		"bInfo": true,
        "pagingType": "full_numbers",
        "oLanguage" : CRSWebUtils.dtLangMN,
        "iDisplayLength": 50,
    }).rowGrouping({
        bExpandableGrouping: true,
        bExpandSingleGroup: false,
        iExpandGroupOffset: -1,
        asExpandedGroups: [""]
    });

    GridRowCount();
});

function GridRowCount() {
    $('span.rowCount-grid').remove();
    $('input.expandedOrCollapsedGroup').remove();

    $('.dataTables_wrapper').find('[id|=group-id]').each(function () {
        var rowCount = $(this).nextUntil('[id|=group-id]').length;
        rowCount = "(" + rowCount + ")";
        $(this).find('td').append($('<span />', { 'class': 'rowCount-grid' }).append($('<b />', { 'text': rowCount })));
    });

    $('.dataTables_wrapper').find('.dataTables_filter').append($('<a class="expandedOrCollapsedGroup btn green" href="/order"> Шинээр нэмэх <i	class="fa fa-plus"></i></a>'));
    $('.dataTables_wrapper').find('.dataTables_filter').append($('<input />', { 'type': 'button', 'class': 'expandedOrCollapsedGroup collapsed btn green', 'value': 'Бүгдийг нээх' }));

    $('.expandedOrCollapsedGroup').live('click', function () {
        if ($(this).hasClass('collapsed')) {
            $(this).addClass('expanded').removeClass('collapsed').val('Бүгдийг хаах').parents('.dataTables_wrapper').find('.collapsed-group').trigger('click');
        }
        else {
            $(this).addClass('collapsed').removeClass('expanded').val('Бүгдийг нээх').parents('.dataTables_wrapper').find('.expanded-group').trigger('click');
        }
    });
};