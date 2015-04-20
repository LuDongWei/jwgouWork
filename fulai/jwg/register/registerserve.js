define(function(require, exports, module) {

	var $ = require("jquery");
	var chrnum = /^([a-zA-Z0-9]+)$/;

	var REG_PHONE = /^1[1-9][0-9][0-9]{8}$/;


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

	/*-------用户名判断-------*/
	function checkUsername() {
		var input = $("#username");
		var selfError = input.parent();
		var value = $.trim(input.val());
		if (value === "") {
			errorBox(input, "不能为空");
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
	/*-------姓名判断-------*/
	function checkuser() {

		var input = $("#user");
		var selfError = input.parent();
		var value = $.trim(input.val());
		if (value === "") {
			errorBox(input, "不能为空");
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

	/*-------手机判断-------*/
	function checktel() {
		var input = $("#y_phone");
		var selfError = input.parent();
		var value = $.trim(input.val());
		if (value === "") {
			errorBox(input, "不能为空");
			return false;
		} else {
			if (!REG_PHONE.test(value)) {
				if (value.length !== 11) {
					errorBox(input, "手机号码格式错误，应为11位数字");
					return false
				} else {
					errorBox(input, "无效手机号码");
					return false
				}
			} else {
				input.siblings(".label_text_wrap").stop().animate({
					'opacity': '0'
				}, 10, function() {
					input.siblings(".label-tip-info").hide();
				})
				return true
			}


		}
	}
		/*-------公司地址-------*/
	function checkplace() {

		var input = $("#y-place");
		var selfError = input.parent();
		var value = $.trim(input.val());
		if (value === "") {
			errorBox(input, "不能为空");
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

	$(function() {
		$("#username").on("focus", function() {
			var self = $(this);
			Inputtxt(self, "您的公司名称")
		});
		$("#username").on("blur", function() {
			checkUsername();
		});
		$("#user").on("focus", function() {
			var self = $(this);
			Inputtxt(self, "您的姓名")
		});

		$("#user").on("blur", function() {
			checkuser()
		});


		$("#y_phone").on("focus", function() {
			var self = $(this);
			Inputtxt(self, "手机号码")
		});

		$("#y_phone").on("blur", function() {
			checktel()
		});
		$("#y-place").on("focus", function() {
			var self = $(this);
			Inputtxt(self, "公司所在省市")
		});

		$("#y-place").on("blur", function() {
			checkplace()
		});


		/*------点击注册事件-----*/
		$("#myForm").on("submit", function() {
			var formOk = checkUsername() && checkuser() && checktel() && checkplace()

			if (!formOk) {
				return false
			} else {
				return true
			}

		})

		// 点击登录按钮验证更新
		function refreshAuth() {
			var timestamp = Date.parse(new Date());
			$(".auth-image").attr("src", "http://web.gypmro.com/validCode/image?channel=login&tid=635387286676339717" + "?timestamp=" + timestamp);
		}
		$(".refresh-auth").click(function() {
			refreshAuth();
		})


	});



});