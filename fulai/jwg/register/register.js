define(function(require, exports, module) {

	var $ = require("jquery");
	var chrnum = /^([a-zA-Z0-9]+)$/;
	var REG_EMAIL = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;
	var REG_PHONE = /^1[1-9][0-9][0-9]{8}$/;
	var EMAIL_URL = "http://web.gypmro.com/ajax/HasRegister"; //接口
	var ispass = true; //用户名判断

	/*---------解决placeholder兼容--------*/
	function jPlaceholder(h) {
			$.each($("input"), function(i, v) {
				if ($(v).attr("placeholder") != undefined) {
					var l = parseInt($(this).position().left) + 5;
					var t = parseInt($(this).position().top) + parseInt($(this).css("marginTop"));
					$(v).before('<label class="placeholder" style="position:absolute;left:' + l + 'px;top:' + t + 'px;color:#777777;height:' + h + 'px;line-height:' + h + 'px;">' + $(v).attr("placeholder") + '</label>');
					$(v).attr("placeholder", "");
					if ($(v).val() != "") {
						$(v).prev(".placeholder").hide();
					}
				}
			});

			$(".placeholder").click(function() {
				$(this).hide();
				$(this).next("input").focus();
			})
			$("input").focus(function() {
				$(this).prev(".placeholder").hide();
			})

			$("input").blur(function() {
				if ($(this).val() == "") {
					$(this).prev(".placeholder").show();
				}
			})
			$("input").keyup(function() {
				if ($(this).val() != "") {
					$(this).prev(".placeholder").hide();
				}
			})


		}
		/*判断是否为ie*/
	function checkIE() {
			var _IE = (function() {
				var v = 3,
					div = document.createElement('div'),
					all = div.getElementsByTagName('i');
				while (
					div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
					all[0]
				);
				return v > 4 ? v : false;
			}());

			if (_IE && _IE < 7) {
				var divTmp = '<div style="height:50px;width:100px;background:#ffe464;border:1px solid #c8a209;z-index:9999;width:1200px;line-height:50px;text-align:center;">IE版本过低，推荐升级你的浏览器。建议下载以下的免费浏览器：<a href="https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B6E29D538-ECA3-3687-97DA-B8AAC8C2A08D%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D0%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26installdataindex%3Ddefaultbrowser/update2/installers/ChromeSetup.exe" target="_blank">谷歌浏览器</a>或IE8以上浏览器，其它浏览器建议使用极速模式。</div>';
				$("body").prepend(divTmp);
			}
			if (_IE && _IE > 6) {
				jPlaceholder(40)
			}

		}
		/*-------解决placeholder兼容-------*/
	checkIE()
		/*-------errorshow-------*/
	function errorBox(self, txt) {
		var self = $(self);
		self.siblings(".label_text_wrap").stop().animate({
			'opacity': '0'
		}, 0)
		self.parent().find(".label-tip-info").addClass("label-tip-error");
		self.parent().find(".label-tip-info").css("display", "block")
		self.parent().find(".label_text_wrap .arrow").css("border-right", "12px solid #f97252")
		self.parent().find(".label_text_wrap .l_error").css("background-color", "#f97252").text(txt)
		self.siblings(".label_text_wrap").animate({
			'opacity': '1'
		}, 600)

	}

	function Inputtxt(current, txt) {
		var self = $(current);
		self.siblings(".label_text_wrap").animate({
			'opacity': '0'
		}, 0)
		self.parent().find(".label-tip-info").removeClass("label-tip-error");
		self.parent().find(".label_text_wrap .arrow").css("border-right", "12px solid #0591aa")
		self.parent().find(".label_text_wrap .l_error").css("background-color", "#0591aa").text(txt)
		self.siblings(".label-tip-info").show();
		self.siblings(".label_text_wrap").animate({
			'opacity': '1'
		}, 800)

	}

	/*-------鼠标离开为空事件-------*/
	// 验证email是否注册过
	function checkEmail(email, callBack) {
		if (typeof(callBack) !== "function") {
			callBack = function() {};
		}
		$.ajax({
			"type": "GET",
			"url": EMAIL_URL,
			"dataType": "json",
			"data": {
				"loginName": email
					// "d": (new Date()).getTime()
			},
			"success": function(json) {

				if (json.error === 1) {
					callBack(true);
				} else if (json.error === 0) {
					callBack(false);
				}
			},
			"error": function() {
				// alert("服务不可用!");
			}
		});
	}

	/*-------用户名判断-------*/
	function checkUsername() {
			var input = $("#username");
			var selfError = input.parent();
			var value = $.trim(input.val());
			if (value === "") {
				errorBox(input, "用户名不能为空");
				return false;
			} else {
				// phone email
				if (!REG_EMAIL.test(value) && !REG_PHONE.test(value)) {
					if (/^\d+$/.test(value)) {
						if (value.length < 11 && value.length > 11) {
							errorBox(input, "手机号码格式错误，应为11位数字");
							return false
						} else {
							errorBox(input, "无效手机号码");
							return false
						}
					} else {
						errorBox(input, "邮箱地址格式错误！");
						return false
					}
				}
				// email
				if (REG_EMAIL.test(value)) {

					input.siblings(".label_text_wrap").stop().animate({
						'opacity': '0'
					}, 10, function() {
						input.siblings(".label-tip-info").hide();
					});
					return true
				}

				// phone
				if (REG_PHONE.test(value)) {
					input.siblings(".label_text_wrap").stop().animate({
						'opacity': '0'
					}, 10, function() {
						input.siblings(".label-tip-info").hide();
					});
					return true
				}


			}
		}
		/*-------密码判断-------*/
	function checkPassword() {

			var input = $("#password");
			var selfError = input.parent();
			var value = $.trim(input.val());
			if (value === "") {
				errorBox(input, "密码不能为空");
				return false;
			} else {
				if (chrnum.test(value)) {
					if (value.length < 6 || value.length > 20) {
						errorBox(input, "6-20位英文字母或数字")
					} else {
						input.siblings(".label_text_wrap").stop().animate({
							'opacity': '0'
						}, 10, function() {
							input.siblings(".label-tip-info").hide();
						})
						return true
					}
				} else {
					errorBox(input, "只能为数字和字母组成")
				}
			}
		}
		/* 检查重复密码 */
	function passwordConfirm() {

			var input = $("#recommendCode");
			var selfError = input.parent();
			var value = $.trim(input.val());
			if (input.val() === "") {
				errorBox(input, "重复密码不能为空");
				return false;
			} else if (value !== $.trim($("#password").val())) {
				errorBox(input, "两次密码输入不一致，请重新输入")
				return false;
			} else {
				input.siblings(".label_text_wrap").stop().animate({
					'opacity': '0'
				}, 10, function() {
					input.siblings(".label-tip-info").hide();
				})
				return true
			}
		}
		/*-------验证码判断-------*/
	function checkVerifycode() {
		var input = $("#verfCode");
		var selfError = input.parent();
		var value = $.trim(input.val());
		if (value === "") {
			errorBox(input, "不能为空");
			return false;
		} else {
			if (value.length != 4) {
				errorBox(input, "验证码错误");
			return false;

				return false
			} else {
				input.siblings(".label_text_wrap").stop().animate({
					'opacity': '0'
				}, 10, function() {
					input.siblings(".label-tip-info").hide();
				})
				return true
				return true
			}
		}

	}

	$(function() {
		$("#useremail").on("focus", function() {
			var self = $(this);
			Inputtxt(self, "请输入您的常用邮箱")
		});
		$("#useremail").on("blur", function() {
			checkUsername();
		});
		$("#username").on("blur", function() {
			checkUsername();
		});
		$("#password").on("focus", function() {
			var self = $(this);
			Inputtxt(self, "4-20位英文字母或数字")
		});

		$("#password").on("blur", function() {
			checkPassword();
		});

		$("#recommendCode").focus(function() {
			var self = $(this);
			Inputtxt(self, "请确认您的密码")
		})
		$("#recommendCode").on("blur", function() {
			passwordConfirm()
		});

		$("#verfCode").on("focus", function() {
			var self = $(this);
			Inputtxt(self, "请确认4位验证码")
		});
		$("#verfCode").on("blur", function() {
			checkVerifycode();
		});

		/*------点击注册事件-----*/
		$("#myForm").on("submit", function() {
			checkUsername()
			checkPassword()
			passwordConfirm()
			checkVerifycode()
			var Isuser = $("#username")
			if ($("#username").hasClass("namefalse")) {
				ispass = false
			}

			var formOk = checkUsername() && ispass && checkPassword() && passwordConfirm() && checkVerifycode()
			if (!formOk) {
				return false
			} else {
				
				window.location.href='http://www.mbaobao.com/';
				
				return false
			}

		})

		// 点击登录按钮验证更新
		function refreshAuth() {
			var timestamp = Date.parse(new Date());
			$(".auth-image").attr("src", "http://www.jwgou.com/admin/getValidateImg.aspx?0.871052632573992?timestamp=" + timestamp);
		}
		$(".refresh-auth").click(function() {
			refreshAuth();
		})
		$('body').find(".auth-image").click(function() {
			refreshAuth();
		})


	});



});