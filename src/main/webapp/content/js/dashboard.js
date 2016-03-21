var dashboardTableEditable = function() {
	var handleTable = function() {
		var table = $('#dashboard_editable_1');
		var oTable = table.dataTable({
			"lengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			// set the initial value
			"pageLength" : 15,
			"bLengthChange" : false,
			"language" : CRSWebUtils.dtLangMN,
			"columnDefs" : [ { // set default column settings
				'orderable' : true,
				'targets' : [ 1 ]
			}, {
				"targets" : 0,
				"visible" : false,
			}, {
				"searchable" : true,
				"targets" : [ 1 ]
			} ],
			"order" : [ [ 0, "asc" ] ]
		// set first column as a default sort by asc
		});
	}
	return {
		// main function to initiate the module
		init : function() {
			handleTable();
		}
	};
}();



$(function() {
	function chart(result) {
	Metronic.startPageLoading({
		animate : true
	});
	$('#chartByYear').highcharts(
			{
				title : {
					text : '',
					x : -20,
					style : {
						display : 'none'
					}
				// center
				},
				exporting : {
					enabled : false
				},
				subtitle : {
					text : '',
					style : {
						display : 'none'
					},
					x : -20
				},
				xAxis : {
					categories : [ '1 сар', '2 сар', '3 сар', '4 сар', '5 сар', '6 сар', '7 сар', '8 сар', '9 сар', '10 сар', '11 сар', '12 сар' ]
				},
				yAxis : {
					title : {
						text : '',
						style : {
							display : 'none'
						}
					},
					
					tickInterval: 1,
					minRange: 1,
					allowDecimals: false,
					startOnTick: true,
					endOnTick: true,
					
					plotLines : [ {
						value : 0,
						width : 1,
						color : '#808080'
					} ]
				},
				legend : {
					layout : 'horizontal',
					align : 'center',
					verticalAlign : 'bottom',
					borderWidth : 0
				},
				series : [
						{
							name : result[0].name,
							data : [ result[0].jan, result[0].feb, result[0].mar, result[0].apr, result[0].may, result[0].jun, result[0].jul, result[0].aug, result[0].sep, result[0].oct, result[0].nov, result[0].dec ]
						},
						{
							name : result[1].name,
							data : [ result[1].jan, result[1].feb, result[1].mar, result[1].apr, result[1].may, result[1].jun, result[1].jul, result[1].aug, result[1].sep, result[1].oct, result[1].nov, result[1].dec ]
						},
						{
							name : result[2].name,
							data : [ result[2].jan, result[2].feb, result[2].mar, result[2].apr, result[2].may, result[2].jun, result[2].jul, result[2].aug, result[2].sep, result[2].oct, result[2].nov, result[2].dec ]
						},
						{
							name : result[3].name,
							data : [ result[3].jan, result[3].feb, result[3].mar, result[3].apr, result[3].may, result[3].jun, result[3].jul, result[3].aug, result[3].sep, result[3].oct, result[3].nov, result[3].dec ]
						},
						{
							name : result[4].name,
							data : [ result[4].jan, result[4].feb, result[4].mar, result[4].apr, result[4].may, result[4].jun, result[4].jul, result[4].aug, result[4].sep, result[4].oct, result[4].nov, result[4].dec ]
						}]
			});
	}
	$.ajax({
		type : "GET",
		async : false,
		dataType : "json",
		url : '/dashboard/ThisYear',
		success : function(result) {
			// var data = [ result.jan, result.feb, result.mar, result.apr,
			// result.may, result.jun, result.jul, result.aug, result.sep,
			// result.oct, result.nov, result.dec ];
			// var data = [ result ];
			chart(result);
			Metronic.stopPageLoading();
		}
	});
});

$(function() {
	function chart(data) {
		Metronic.startPageLoading({
			animate : true
		});
		$('#chartBy7Days')
				.highcharts(
						{
							chart : {
								type : 'bar'
							},
							exporting : {
								enabled : false
							},
							title : {
								text : '',
								style : {
									display : 'none'
								}
							},
							subtitle : {
								text : '',
								style : {
									display : 'none'
								}
							},
							xAxis : {
								categories : [ 'Баруун БТЦ', 'Дурсгалын ЦХ',
										'Зүүн БТЦ', 'Диваажингийн ЦХ',
										'Ресторан' ],
								title : {
									text : null
								}
							},
							yAxis : {
								min : 0,
								title : {
									text : 'Population ( )',
									align : 'high',
									style : {
										display : 'none'
									}
								},
								labels : {
									overflow : 'justify'
								}
							},
							tooltip : {
								valueSuffix : ' '
							},
							plotOptions : {
								bar : {
									dataLabels : {
										enabled : true
									}
								}
							},
							legend : {
								layout : 'horizontal',
								align : 'center',
								verticalAlign : 'bottom',
								x : -40,
								y : 80,
								floating : true,
								borderWidth : 1,
								backgroundColor : ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
								shadow : true,
								style : {
									display : 'none'
								}
							},
							credits : {
								enabled : false
							},
							series : [ {
								name : 'Өнгөрсөн 7 хоногт',
								data : data
							} ]
						});

	}

	$.ajax({
		type : "GET",
		async : false,
		dataType : "json",
		url : '/dashboard/before7Day',
		success : function(result) {
			var data = [ result.first, result.second, result.third,
					result.forth, result.fifth ];
			chart(data);
			Metronic.stopPageLoading();
		}
	})
});

$(function() {
	function chart(result) {
		Metronic.startPageLoading({
			animate : true
		});
		$(document).ready(function() {
			// Build the chart
			$('#pieChartByDay').highcharts({
				chart : {
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false,
					type : 'pie'
				},
				title : {
					text : '',
					style : {
						display : 'none'
					},
				},
				exporting : {
					enabled : false
				},
				tooltip : {
					pointFormat : '{series.name}: <b>{point.y}</b>'
				},
				plotOptions : {
					pie : {
						allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : false
						},
						showInLegend : true
					},
					series : {
						dataLabels : {
							enabled : true,
							formatter : function() {
								return this.point.y;
							},
							distance : -30,
							color : 'black'
						}
					}
				},
				series : [ {
					name : 'Үйлдэл',
					colorByPoint : true,
					data : [ {
						name : 'Ажилд гарсан',
						y : result.out
					}, {
						name : 'Хөдлөсөн',
						y : result.taken,
						sliced : true,
						selected : true
					}, {
						name : 'Захиалга гүйцэтгэсэн',
						y : result.deliveried
					}, {
						name : 'Буцсан',
						y : result.gone
					}, {
						name : 'Машин тавьсан',
						y : result.in
					}, {
						name : 'Зогссон',
						y : result.warned
					} ]
				} ]
			});
		});
	}
	$.ajax({
		type : "GET",
		async : false,
		dataType : "json",
		url : '/dashboard/carServiceToday',
		success : function(result) {
			var dataPie = [ result ];
			chart(result);
			Metronic.stopPageLoading();
		}
	})
});

Metronic.stopPageLoading();

$(".selectValue").click(
		function() {
			Metronic.startPageLoading({
				animate : true
			});
			var me = $(this);
			var csrf = $("#__csrf__").val();
			var param = {};
			param._csrf = csrf;
			param.orderDay = me.find(".valueDay").val();
			param.serviceCode = me.find(".valueService").val();
			
			$.ajax({
				type : "POST",
				url : "/dashboard/orderDescription",
				async : false,
				dataType : "json",
				data : param,
				success : function(result) {
					if (result.success == true) {
						$("#checked").text(result.data[0] + " / ");
						$("#reserved").text(result.data[1] + " / ");
						$("#commited").text(result.data[2]);

					} else {
						CRSWebUtils.showAlert("danger", "warning",
								result.message, 0);
					}
					Metronic.stopPageLoading();
				},
				error : function() {
					Metronic.stopPageLoading();
					CRSWebUtils.showAlert("danger", "warning",
							"Үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.", 0);
				}
			});

		});