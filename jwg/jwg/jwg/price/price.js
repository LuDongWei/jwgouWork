define(function(require, exports, module) {

	"use strict";
	var G=require('../global/global');
	var $ = require('jquery');
	var num = /^[0-9]*[1-9][0-9]*$/ //正则判断数量
		/*
		 * 解决placeholder兼容
		 */
	function jPlaceholder(h) {
			$.each($("input"), function(i, v) {
				if ($(v).attr("placeholder") != undefined) {
					var l = parseInt($(this).position().left) + 10;
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

		function checkVal() {
			var txt = $("#buyCount").val();
			if (txt != "" && num.test(txt)) {

			} else {
				alert("请输入正确的数量")
			}
		}
		$('body').on("click", '#confirmToBuy', function() {
			checkVal()
		})
		$("#buyCount").on("keyup", function(e) {
			if (e.keyCode == 13) {
				checkVal()
			}

		});
        $("body").on("click",'.buy-version-compare-btn',function(){
        	 var txt=$(this).text();
        	console.log(txt.length)
        	if(txt.length > 4){
              $("body").find(".buy-version-compare-content").fadeOut();
              $("body").find(".buy-version-compare-btn").text('功能明细')
        	}
        	else{
        		$("body").find(".buy-version-compare-content").fadeIn();
        		 $("body").find(".buy-version-compare-btn").text('收起功能明细')
        	}
        })
 
         G.initHead();
          G.float_nav();
	})



})