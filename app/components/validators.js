'use strict'

define([
], function() {
	function trim(v) {
		return ('' + v).replace(/^\s+|\s+$/g, '')
	}
	return {
		numRange: function(min, max, errMsg) {
			return function(v) { 
				v = parseFloat(v)
				if (isNaN(v) || v < min || v > max) {
					return errMsg || '取值范围应在' + min + '至' + max + '之间'
				}
			}
		},
		lenRange: function(min, max, errMsg) {
			if (!errMsg) {
				if (min == max) {
					errMsg = '长度应为' + min
				} else {
					errMsg = '长度范围应在' + min + '至' + max + '之间'

				}
			}
			return function(v) {
				if (v.length < min || v.length > max) {
					return errMsg
				}
			}
		},
		regex: function(re, errMsg) {
			errMsg = errMsg || '格式不正确'
			return function(v) {
				if (!re.test(trim(v))) {
					return errMsg
				}
			}
		},
		required: function(errMsg) {
			errMsg = errMsg || '不能为空'
			return function(v) {
				if (!trim(v)) {
					return errMsg
				}
			}
		}
	}
})
