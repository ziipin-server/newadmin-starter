define([
	'jquery',
	'vue',
], function($, Vue) {
	function getGoPage(ins, p) {
		return function() {
			ins.goPage(p)
		}
	}
	Vue.directive('zptable', {
		twoWay: true,
		params: ['url', 'size', 'lazy', 'ctrl', 'qmodel'],
		bind: function() {
			this.$wrapper = $(this.el).wrap('<div></div>').parent()
			this.$pagination = $('<ul class="pagination pagination-sm"></ul>').wrap('<nav></nav>').appendTo(this.$wrapper)
			this.$page = 1
			this.$pageSize = parseInt(this.params.size || 10)
			this.$maxpage = 1
			this.$total = 0
			this.updatePagination = function() {
				var page = this.$page || 1,
					total = this.$total || 0,
					pageSize = this.$pageSize || 1,
					maxpage = this.$maxpage = Math.floor((total + pageSize - 1) / pageSize) || 1,
					self = this
				this.$pagination.empty()
				var $prev = $('<li><a href="javascript:void(0)">&laquo;</a></li>')
						.on('click', (function() {
							this.goPage(this.$page - 1)
						}).bind(this))
						.appendTo(this.$pagination)
				for (var p = Math.max(1, page - 5); p < page; ++p) {
					var action = getGoPage(this, p)
					$('<li><a href="javascript:void(0)">' + p + '</a></li>')
							.on('click', action)
							.appendTo(this.$pagination)
				}
				var $nums = $('<li class="active"><a href="javascript:void(0)">' + page + '</a></li>').appendTo(this.$pagination)
				for (var p = page + 1, end = Math.min(maxpage, page + 5); p <= end; ++p) {
					var action = getGoPage(this, p)
					$('<li><a href="javascript:void(0)">' + p + '</a></li>')
							.on('click', action)
							.appendTo(this.$pagination)
				}
				var $next = $('<li><a href="javascript:void(0)">&raquo;</a></li>')
						.on('click', (function() {
							this.goPage(this.$page + 1)
						}).bind(this))
						.appendTo(this.$pagination)
				if (page <= 1) {
					$prev.addClass('disabled')
				}
				if (page >= maxpage) {
					$next.addClass('disabled')
				}

				//$nums.children('a').text(page + '/' + maxpage)
			}
			this.getData = (function() {
				var url = this.params.url + '?page=' + this.$page + '&page_size=' + this.$pageSize
				if (this.params.qmodel) {
					for (var k in this.params.qmodel) {
						var v = this.params.qmodel[k]
						if ($.isArray(v)) {
							v.forEach(function(vi) {
								url += '&' + k + '=' + encodeURIComponent(vi)
							})
						} else {
							url += '&' + k + '=' + encodeURIComponent(v)
						}
					}
				}
				$.ajax({
					url: url,
					method: 'get',
					dataType: 'json',
					success: (function(rsp) {
						if (rsp.result != 0) {
							alert(rsp.result + ":" + rsp.message)
							return
						}
						rsp = rsp.data
						this.$page = rsp.page
						this.$pageSize = rsp.pagesize
						this.$total = rsp.total
						this.set(rsp.rows)
						this.updatePagination()
						if ($.isFunction(this.params.ctrl.onUpdated)) {
							this.params.ctrl.onUpdated()
						}
					}).bind(this),
				})
			}).bind(this)
			this.goPage = function(page) {
				if (page >= 1 && page <= this.$maxpage) {
					this.$page = page
					this.getData()
				}
			}
			this.updatePagination()
			if (this.params.url && !this.params.lazy) {
				this.getData()
			}
			if (this.params.ctrl) {
				this.params.ctrl.getData = this.getData.bind(this)
				this.params.ctrl.goPage = this.goPage.bind(this)
			}
		},
	})
})
