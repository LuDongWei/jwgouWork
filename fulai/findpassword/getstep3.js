define(function(require, exports, module) {

	var $ = require("jquery");

	var LOWER = /[a-z]/,
		UPPER = /[A-Z]/,
		DIGIT = /[0-9]/,
		DIGITS = /[0-9].*[0-9]/,
		SPECIAL = /[^a-zA-Z0-9]/,
		SAME = /^(.)\1+$/;


	/*-------密码判断-------*/
	function checkPassword() {
			var input = $("#password");
			var selfError = input.parent();
			var value = $.trim(input.val());
			var lower = LOWER.test(value),
				upper = UPPER.test(value),
				digit = DIGIT.test(value),
				digits = DIGITS.test(value),
				special = SPECIAL.test(value),
				same = SAME.test(value);

			if (value === "") {
				$("#labelpassword").html("6-20位字符").fadeIn();
				$(".password-meter-bar").attr('class',"password-meter-bar")
				return false;
			} else {
				if (value.length > 20) {
					$("#labelpassword").html("6-20位字符").fadeIn();
					$(".password-meter-bar").attr('class',"password-meter-bar")
					return false
				}
				if (value.length >= 6 && lower && upper && special && digit && digits) {

					$("#labelpassword").html("").fadeOut();
					$(".password-meter-bar").attr('class',"password-meter-bar password-meter-strong")
					return true
				}

				if (value.length >= 6 && ((lower && upper) || (upper && digit) || (lower && digit))) {

					$("#labelpassword").html("").fadeOut();
					$(".password-meter-bar").attr('class',"password-meter-bar password-meter-good")

					return true
				}
				if (value.length >= 6 && (lower || upper || digit || digits)) {

					$("#labelpassword").html("").fadeOut();
					$(".password-meter-bar").attr('class',"password-meter-bar password-meter-good password-meter-too-short")

					return true
				}

			}
		}
		/* 检查重复密码 */
	function passwordConfirm() {
		var input = $("#password1");
		var selfError = input.parent();
		var value = $.trim(input.val());

		if (input.val() === "" && $("#password").val() !== "") {

			$("#labelpassword1").html("两次输入密码不一样，请重新输入").fadeIn();
			return false;
		} else if (value !== $.trim($("#password").val())) {
			$("#labelpassword1").html("两次输入密码不一样，请重新输入").fadeIn();
			return false;
		} else {
			$("#labelpassword1").html("").fadeOut();
			return true
		}
	}


	$(function() {
		$("#password").on("focus", function() {
			$("#labelpassword").html("6-20位英文字母或数字").show();
		});

		$("#password").on("blur", function() {
			checkPassword();
		});
		$("#password1").on("focus", function() {
			$("#labelpassword1").html("").fadeOut();
		});
		$("#password1").on("blur", function() {
			if ($("#password").val() !== "") {
				passwordConfirm();
			}

		});
		//键盘事件

		$("#password").on("keyup", function(e) {
			
			checkPassword()

		});
		/*------点击注册事件-----*/
		$("#myForm").on("submit", function() {
			var formOk = checkPassword() && passwordConfirm()

			if (!formOk) {
				return false
			} else {
				return true
			}

		})


	});



});