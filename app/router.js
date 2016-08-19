'use strict'

define([
	'vue',
	'vueRouter',
	'core',
], function(Vue, VueRouter, core) {
	Vue.use(VueRouter)
	var router = new VueRouter({
		transitionOnLoad: true,
	})
	router.map({
		'/': {
			component: core.loadPage('app/pages/index.vue'),
		},
		'/simple-list-demo': {
			component: core.loadPage('app/pages/simple-list-demo.vue'),
		},
		'/list-demo': {
			component: core.loadPage('app/pages/list-demo.vue'),
		},
		'/edit-demo': {
			component: core.loadPage('app/pages/edit-demo.vue'),
		},
	})
	router.redirect({
		'*': '/',
	})
	router.beforeEach(function(transition) {
		if (window.innerWidth <= 720) {
			$('.body').removeClass('hidemenu')
		}
		transition.next()
	})
	return router
})
