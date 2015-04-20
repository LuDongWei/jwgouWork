define(function(require, exports, module) {
	var $ = require("jquery");
	var login = require("./login");
	$(function() {
		$("#login").click(function() {
			login.init()
		})
	})
});