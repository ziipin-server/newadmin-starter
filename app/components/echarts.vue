<template>
	<div :style="style">
	</div>
</template>

<requirements>
	ec:		'//cdn.bootcss.com/echarts/3.2.2/echarts.min.js'
</requirements>

<script>
	return {
		data: function() {
			return {
				style: {
					width: '100%',
					height: '100%',
				},
				chart: null,
			}
		},
		ready: function() {
			this.chart = ec.init(this.$el)
			this.chart.setOption({
				title: {text: 'Test'},
				tooltip: {},
				legend: {
					data:['销量']
				},
				xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20],
				}],
			})
		},
	}
</script>
