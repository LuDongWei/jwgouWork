define(function(require, exports, module) {

	"use strict";

	var $ = require('jquery');
	var G = require('../global/global');

	function check_sub() {
		var truck_no = $('#truck_no').val();
		var error = '';
		if (truck_no != '') {
			var receiver_name = $('#receiver_name').val();
			if (receiver_name != '') {
				var vcode = $('#vcode').val();
				if (vcode != '') {
					return true;
				} else {
					error = '验证码不能为空！';
				}
			} else {
				error = '收货人姓名不能为空！';
			}
		} else {
			error = '运单号不能为空！';
		}
		if (error != '') {
			$('#error_mess').html(error);
			$('#error').css('display', '');

			setTimeout(function() {
				if ($("#error_mess").html() != '') {
					$("#error").fadeOut('slow', function() {});
				}
			}, 1600);
			return false;
		}
	}
	$(function() {
		G.initHead();
		G.float_nav();
		$('#code').click(function() {
			var url = $(this).attr('src');
			$(this).attr('src', url);
		});
		setTimeout(function() {
			if ($("#error_mess").html() != '') {
				$("#error").fadeOut('slow', function() {});
			}
			if ($("#suc_mess").html() != '') {
				$("#success").fadeOut('slow', function() {});
			}
			if ($("#notice_mess").html() != '') {
				$("#notice").fadeOut('slow', function() {});
			}
		}, 3000);
		/*------点击注册事件-----*/
		$("#submitid_form").on("submit", function() {
			var formOk =check_sub()
			if (!formOk) {
				return false
			} else {
				return true
			}

		})
	})



})