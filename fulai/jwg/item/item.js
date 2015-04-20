define(function(require, exports, module) {
	var $ = require("jquery");
	var G=require('../global/global');
	require("./lazyLoad");

	$(function() {
		var top = $("body").find(".header3").offset().top - 61;
		$(window).scroll(function() {
			var win_top = $(document).scrollTop();
			if (win_top >= top) {
				$("body").find(".header3").css({
					position: "fixed",
					top: "61px"
				})
			} else {
				$("body").find(".header3").css({
					position: "static",
					top: "0"
				})
			}
		})
		 G.initHead();
         G.float_nav();
	})
});