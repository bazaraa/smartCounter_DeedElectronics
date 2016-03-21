$(document).ready(
		function() {

			// үүсгэсэн өдрөөр хайх
			$("#finance_search").click(
					function() {
						var startDate = getDateString(new Date($("#startDate")
								.val()));
						var endDate = getDateString(new Date($("#endDate")
								.val()));
						var serviceType = $("#serviceType").val();
						if (serviceType == "") {
							url = "/myordersFinance/between/" + startDate + "/"
									+ endDate + "/" + $('#left:checked').val();
						} else {
							url = "/myordersFinance/between/" + startDate + "/"
									+ endDate + "/" + serviceType + "/"
									+ $('#left:checked').val();
						}
						window.location.href = url;
					});

			$('#finance_table').dataTable({
				"bLengthChange" : false,
				"bPaginate" : true,
				"bJQueryUI" : true,
				"bFilter" : true,
				"bInfo" : true,
				"pagingType" : "full_numbers",
				"oLanguage" : CRSWebUtils.dtLangMN,
				"iDisplayLength" : 50,
			}).rowGrouping({
				bExpandableGrouping : true,
				bExpandSingleGroup : false,
				iExpandGroupOffset : -1,
				asExpandedGroups : [ "" ]
			});

			GridRowCount();
		});

function GridRowCount() {
	$('span.rowCount-grid').remove();
	$('input.expandedOrCollapsedGroup').remove();

	$('.dataTables_wrapper').find('[id|=group-id]').each(function() {
		var rowCount = $(this).nextUntil('[id|=group-id]').length;
		rowCount = "(" + rowCount + ")";
		$(this).find('td').append($('<span />', {
			'class' : 'rowCount-grid'
		}).append($('<b />', {
			'text' : rowCount
		})));
	});

	$('.dataTables_wrapper').find('.dataTables_filter').append($('<input />', {
		'type' : 'button',
		'class' : 'expandedOrCollapsedGroup collapsed btn green',
		'value' : 'Бүгдийг нээх'
	}));

	$('.expandedOrCollapsedGroup').live(
			'click',
			function() {
				if ($(this).hasClass('collapsed')) {
					$(this).addClass('expanded').removeClass('collapsed').val(
							'Бүгдийг хаах').parents('.dataTables_wrapper')
							.find('.collapsed-group').trigger('click');
				} else {
					$(this).addClass('collapsed').removeClass('expanded').val(
							'Бүгдийг нээх').parents('.dataTables_wrapper')
							.find('.expanded-group').trigger('click');
				}
			});
};

 // date to string format yyyyMMdd
 function getDateString(date) {
	 var yyyy = date.getFullYear().toString();
	 var mm = (date.getMonth() + 1).toString();
	 var dd = date.getDate().toString();

	 return yyyy + "" + (mm[1] ? mm : "0" + mm[0]) + "" + (dd[1] ? dd : "0" + dd[0]);
};
