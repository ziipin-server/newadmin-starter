'use strict' 

require.config({
	baseUrl: '.',
	paths: {
		jquery: 'libs/jquery.min',
		vue: 'libs/vue.min',
		vueRouter: 'libs/vue-router',
		router: 'app/router',
		vueLoader: 'libs/vue-loader',
		vueStrap: 'libs/vue-strap.min',
		vueSwipe: 'libs/vue-swipe/vue-swipe',
		zptable: 'libs/vue-zptable',
		loader: 'libs/vue-loader',
		core: 'app/core',
		validators: 'app/components/validators',
		echarts: 'libs/echarts',
		toastr: 'libs/toastr/toastr.min',
	},
	map: {
		'*': {
			'css': 'libs/css.min.js',
		},
	},
	shim: {
		'toastr': {
			deps: [
				'jquery',
				'css!libs/toastr/toastr.min.css',
			],
			exports: 'toastr',
		},
	},
})

require([
	'router',
	'core',
], function(
	router,
	core
) {
	router.start({
		components: {
			'sidemenu': core.loadComponent('app/components/sidemenu.vue'),
		},
		data: function() {
			return {
				appName: '有个后台',
				breadcrumb: [],
			}
		},
		events: {
			changeBreadcrumb: function(items) {
				this.$set('breadcrumb', items)
				if (items.length > 0) {
					document.title = this.appName + '-'  + items[items.length - 1].title
				}
			},
		},
	}, 'body')
})
