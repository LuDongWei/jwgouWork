define(function(require, exports, module) {

	var $ = require("jquery");
	var loginUserName = $("#username");
	var loginPassword = $("#password");
	var veryfycodeTextField = $("#verfCode");

	// 检查用户名是否为空

	function checkUserName() {
			if (loginUserName.val() === '') {
				$(".warning_con").html("您的用户名不能为空").parent().fadeIn("fast");
				return false;
			} else {
				$(".warning_con").html("").parent().css("display", 'none');
				return true
			}
		}
		// 检查密码是否为空

	function checkPassword() {
		if (loginPassword.val() === '') {
			$(".warning_con").html("您的密码不能为空").parent().fadeIn("fast");
			return false;
		} else {
			$(".warning_con").html("").parent().css("display", 'none');
			return true
		}
	}


	/*
	 * 解决placeholder兼容
	 */
	function jPlaceholder(h) {
			$.each($("input"), function(i, v) {
				if ($(v).attr("placeholder") != undefined) {
					var l = parseInt($(this).position().left) + 34;
					var t = parseInt($(this).position().top) + parseInt($(this).css("marginTop"));
					$(v).before('<label class="placeholder" style="position:absolute;left:' + l + 'px;top:' + t + 'px;color:#777777;height:' + h + 'px;line-height:' + h + 'px;">' + $(v).attr("placeholder") + '</label>');
					$(v).attr("placeholder", "");
					if ($(v).val() != "") {
						$(v).prev(".placeholder").hide();
					}
				}
			});
			$(".placeholder").on("click", function() {
				$(this).hide();
				$(this).next("input").focus();
			});
			$("input").on("focus", function() {
				$(this).prev(".placeholder").hide();
			});
			$("input").on("blur", function() {
				if ($(this).val() == "") {
					$(this).prev(".placeholder").show();
				}
			});
			$("input").on("keyup", function() {
				if ($(this).val() != "") {
					$(this).prev(".placeholder").hide();
				}
			});

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

	$(function() {
		/*-------解决placeholder兼容-------*/
		checkIE()
			// 点击登录按钮验证
			// 点击登录按钮验证
		$("#loginForm").on("submit", function() {

			var formOk = checkUserName() && checkPassword()

			if (!formOk) {
				return false
			} else {
				return true
			}
		});


	});



});