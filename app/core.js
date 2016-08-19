'use strict'

define([
	'jquery',
	'vue',
	'loader',
], function(
	$,
	Vue,
	loader
) {
	var basePageMixin = {
		methods: {
			httpRequest: function(method, url, params) {
				return $.ajax({
					url: url,
					method: method,
					data: params,
					dataType: 'json',
					cache: false,
				})
			},
			httpGet: function(url, params) {
				return this.httpRequest('get', url, params)
			},
			httpPost: function(url, params) {
				return this.httpRequest('post', url, params)
			},
			getForm: function(url, params) {
				var d = $.Deferred()
				this.httpGet(url, params)
					.success(function(rsp) {
						if (rsp.result != 0) {
							d.rejectWith(rsp.result, rsp.message)
						} else {
							d.resolve(rsp.data)
						}
					})
					.fail(function() {
						d.reject()
					})
				return d.promise()
			},
			submitForm: function(url, params, formModel) {
				var d = $.Deferred(),
					sp = url.indexOf('?') >= 0 ? '&': '?'
				if (params) {
					for (var k in params) {
						var v = params[k]
						if ($.isArray(v)) {
							v.forEach(function(vi) {
								url += sp + k + '=' + encodeURIComponent(vi)
								sp = '&'
							})
						} else {
							url += sp + k + '=' + encodeURIComponent(v)
							sp = '&'
						}
					}
				}
				this.httpPost(url, formModel)
					.success(function(rsp) {
						if (rsp.result != 0) {
							d.rejectWith(rsp.result, rsp.message)
						} else {
							d.resolve(rsp.data)
						}
					})
					.fail(function() {
						d.reject()
					})
				return d.promise()
			},
			setBreadcrumb: function(paths) {
				this.$dispatch('changeBreadcrumb', paths)
			},
		},
	}
	var listPageMixin = {
		data: function() {
			return {
				qmodel: {},
				rows: [],
				ctrl: {
					onUpdated: (function() {
						this.editing = -1
					}).bind(this),
				},
				editing: -1,
				rowBeforeEdit: {},
			}
		},
		methods: {
			beginEdit: function(index) {
				if (!this.getSaveInfo) {
					return
				}
				var row = this.rows[index]
				this.editing = index
				this.rowBeforeEdit = $.extend({}, row)
			},
			saveEdit: function() {
				if (!this.getSaveInfo) {
					return
				}
				var row = this.rows[this.editing],
					saveInfo = this.getSaveInfo(row)
				if (saveInfo == null) {
					return
				}
				this.submitForm(saveInfo.url, {}, saveInfo.form
				).done(function() {
					toastr.success('保存成功')
				}).fail(function() {
					toastr.error('保存失败')
				})
				this.editing = -1
			},
			quitEdit: function() {
				if (!this.getSaveInfo) {
					return
				}
				var row = this.rows[this.editing]
				$.extend(this.rows[this.editing], this.rowBeforeEdit)
				this.editing = -1
			},
			query: function() {
				this.ctrl.goPage(1)
			},
		},
	}
	return {
		loadPage: function(path) {
			return loader.loadVue(path, [
				basePageMixin,
			])
		},
		loadComponent: function(path) {
			return loader.loadVue(path, [])
		},
		setTitle: function(vm, title) {
			vm.$dispatch('changeTitle', title)
		},
		listPageMixin: listPageMixin,
	}
})
