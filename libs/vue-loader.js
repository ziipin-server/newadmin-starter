'use strict'

define([
	'jquery',
	'vue'
], function(
	$,
	Vue
) {
	return {
		loadVue: function(path, mixins) {
			var name = path.replace('/', '-').substring(0, path.length - 4)
			mixins = mixins || []
			return Vue.component(name, function(resolve, reject) {
				$.ajax({
					url: path,
					dataType: 'text',
					success: function(rsp) {
						var sects = {}, text = rsp
						while (true) {
							var begin1 = text.search(/^<\w+>$/m)
							if (begin1 < 0) {
								break
							}
							var end1 = text.indexOf('>', begin1)
							if (end1 < 0) {
								break
							}
							var tag = text.substring(begin1 + 1, end1)
							text = text.substr(end1 + 1)
							var begin2 = text.search(new RegExp('^</' + tag + '>$', 'm'))
							if (begin2 < 0) {
								break
							}
							var end2 = text.indexOf('>', begin2)
							if (end2 < 0) {
								break
							}
							sects[tag] = text.substring(0, begin2)
							text = text.substring(end2 + 1)
						}
						var tpl = sects.template || ''
						var cmpFunc = 'function() {\n' + sects.script + '\n}'
						if (sects.requirements) {
							var requireVars = [], requireCodes = []
							sects.requirements.split('\n').forEach(function(r) {
								r = r.replace(/^\s+|\s+$/g, '')
								if (!r) {
									return
								}
								var m = r.match(/(\w+)\s*:\s*('[^']+')/)
								if (!m || m.length != 3) {
									return
								}
								var varName = m[1], path = m[2]
								if (varName == '_') {
									requireCodes.push(path)
								} else {
									requireVars.push([varName, path])
								}
							})
							cmpFunc = '(function(resolve) {\n' +
										'require([' + 
											requireVars.map(function(i){return i[1]}).concat(requireCodes).join(', ') +
										'], function(' +
											requireVars.map(function(i){return i[0]}).join(', ') +
										') {\n' +
										'\tresolve((' + cmpFunc + ')()) })})'
						} else {
							cmpFunc = '(function(resolve) {\n\tresolve((' + cmpFunc + '\n)()\n)\n})'
						}
						eval(cmpFunc)(function(c) {
								c.template = c.template || tpl
								if ('undefined' === typeof c.mixins) {
									c.mixins = mixins
								} else {
									c.mixins = c.mixins.concat(mixins)
								}
								resolve(c)
						})
					},
					fali: function() {
						reject('get content from ' + path + ' fail')
					},
				})
			})
		},
	}
})
