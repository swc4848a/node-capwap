define(['marionette', 'templates/compiled'], function(Marionette, JST) {
	var draw = function(array) {

		var categories = _.keys(_.groupBy(array, function(obj) {
			return obj.threadId
		}));

		var mapCategories = _.map(categories, function(item) {
			return 'thread:' + item;
		});

		console.log(mapCategories);

		var groupName = _.groupBy(array, function(obj) {
			return obj.name
		});

		console.log(groupName);

		var keyGroupName = _.keys(groupName);

		console.log(keyGroupName);

		var series = [];
		for (var i = 0; i < keyGroupName.length; ++i) {
			var groupData = groupName[keyGroupName[i]];
			var data = [];
			for (var j = 0; j < groupData.length; ++j) {
				var freequeue = groupData[j].freequeue;
				var percent;
				if (freequeue.tail - freequeue.head > 0) {
					percent = (freequeue.tail - freequeue.head + 1) / 500;
				} else {
					percent = (freequeue.tail + 50000 - freequeue.head + 1) / 500;
				}
				data.push(percent);
				var stat = groupData[j].stat;
				if (stat.in !== stat.out) console.log('left to process [%d]', stat.in - stat.out);
			}
			var item = {
				name: keyGroupName[i],
				data: data
			};
			series.push(item);
		}

		console.log(series);

		$('#container').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Capwap Apserver Tracer Share Memory Usage'
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				categories: mapCategories,
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Free Percent (%)'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					'<td style="padding:0"><b>{point.y:.3f}%</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: series
		});

	};

	var Homepage = Marionette.ItemView.extend({
		template: JST.HomepageTemplate,
		onShow: function() {
			setInterval(this.query, 5000);
		},
		query: function() {
			$.ajax({
				url: 'Stat'
			}).success(function(data, textStatus, jqXHR) {
				var array = data.result[0].data;
				console.log(array);
				draw(array);
			});
		}
	});
	return Homepage;
});