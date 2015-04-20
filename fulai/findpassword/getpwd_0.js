define(function(require, exports, module) {

	var $ = require("jquery");
	var REG_EMAIL = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;

	/*-------用户名判断-------*/
	function checkUsername() {
		var input = $("#userName");
		var selfError = input.parent();
		var value = $.trim(input.val());
		if (value === "") {
			$("#labeluserName").addClass("error").html("您的邮箱不能为空").fadeIn();
			return false;
		} else {

			if (REG_EMAIL.test(value)) {
				$("#labeluserName").html("").fadeOut();
				return true
			} else {
				$("#labeluserName").addClass("error").html("邮箱不正确，请重新输入").fadeIn();
			}
		}
	}

	/*-------验证码判断-------*/
	function checkVerifycode() {
		var input = $("#verfCode");
		var selfError = input.parent();
		var value = $.trim(input.val());
		if (value === "") {
			selfError.find(".error").html("验证码不能为空").show()
			return false;
		} else {
			if (value.length > 4) {
				value.length = 4;
				return false
			} else {
				if (value.length != 4) {
					selfError.find(".error").html("验证码错误，请重新填写").show();
					return false
				} else {
					return true;
				}

			}
		}
	}
	$(function() {
		$("#userName").on("focus", function() {
			$("#labeluserName").html("输入您的注册邮箱").show();
		});

		$("#userName").on("blur", function() {
			$(this).siblings(".error").hide()
			checkUsername();
		});
		$("#verfCode").on("focus", function() {
			$(this).siblings(".error").hide()
		});
		$("#verfCode").on("blur", function() {
			checkVerifycode();
		});

		/*------点击注册事件-----*/
		$("#myForm").on("submit", function() {
			var formOk = checkUsername() && checkVerifycode()

			if (!formOk) {
				return false
			} else {
				return true
			}

		})

		// 点击登录按钮验证更新
		function refreshAuth() {
			var timestamp = Date.parse(new Date());
			$(".auth-image").attr("src", "http://www.jwgou.com/admin/getValidateImg.aspx" + "?timestamp=" + timestamp);
		}
		$(".refresh-auth").click(function() {
			refreshAuth();
		})
         $("#auth-image").click(function(){
         	$(".refresh-auth").trigger("click")
         })
	});



});