'use strict'

define([
	// 
	'jquery',
	'vue',
	//
	'libs/select2/select2.min.js',
	'css!libs/select2/select2.min.css',
], function(
	$,
	Vue
) {
	Vue.directive('select2', {
		twoWay: true,
		priority: 1000,
		params: ['options'],
		bind: function() {
			console.log(0)
			var self = this
			$(this.el)
				.select2()
				.on('change', function () {
					self.set(this.value)
				})
		},
		update: function(value) {
			$(this.el).val(value).trigger('change')
		},
		unbind: function() {
			$(this.el).off().select2('destroy')
		}
	})
})
