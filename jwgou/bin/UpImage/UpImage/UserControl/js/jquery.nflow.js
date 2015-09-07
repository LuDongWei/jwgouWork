// jq弹出窗口插件
// 阳阳开发
// 2013-7-14
// 402423280
/*
<div class="ns_flow">
	<div class="ns_flow_window mlAuto">
		<iframe src="http://www.baidu.com" frameborder="0"></iframe>
	</div>
</div>
*/
/*弹出层*/
//.ns_flow { background-image: url(../images/flow_window_bg.png); overflow: hidden; position: absolute; left: 0px; top: 0px; display: none; z-index: 1000000; }
//.ns_flow .ns_flow_window { border: 5px solid #e4e4ec; background-color: #fff; }
(
	function($) 
	{ 
		//参数 p, 当传为值为 close 时, 关闭当关浮动层
		$.fn.nflow = function(p) {
			if(p && p =="close")
			{
				$(".ns_flow").remove();
			}
			else
			{
				$(this).each(function(index, element) {
					$(this).click(function(e) {
						create(this);
						return false;
					});				
				});
			}
			function create(obj)
			{
				var url = $(obj).attr("url");
				var w = getParameter(url,"width");
				var h = getParameter(url,"height");
				var bg_w = getParameter(url,"bg");
				var html = '<div class="ns_flow"><div class="ns_flow_window ns_flow_mlAuto"><iframe src="" frameborder="0"></iframe></div></div>';
				$("body").append(html);
				init();
				setPos();
				$(window).resize(function(e) {
                    setPos();
                });
				
				function init()
				{
					var b_w = $(window).width()<bg_w ? bg_w : $(window).width();
					var b_h = $(window).height()>$(document).height() ?  $(window).height() : $(document).height();
					var top = $(window).height() / 2 - h / 2 + $(window).scrollTop();
					$(".ns_flow .ns_flow_window").width(w).height(h).css("margin-top", top+"px");
					$(".ns_flow .ns_flow_window iframe").attr("width",w).attr("height",h).attr("src",url);
					$(".ns_flow").width(b_w).height(b_h).css("display","block");
				}
				function setPos()
				{
					var b_w = $(window).width()<bg_w ? bg_w : $(window).width();
					var b_h = $(window).height()>$(document).height() ?  $(window).height() : $(document).height();
					$(".ns_flow").width(b_w).height(b_h);
 				}
			}
			function getParameter(url,name)
			{
				var position =  url.indexOf("?");
				if(position!=-1)
				{
					parameter = url.substr(position+1,url.length-position);
					var reg = new RegExp(name+"=[0-9]+");
					if(reg.test(parameter))
					{
						var regNum = new RegExp("[0-9]+");
						var val = new String(parameter.match(reg));
						if(regNum.test(val))
						{
							return parseInt(val.match(regNum));	
						}
					}
					return 0;
				}
				return 0;
			}		
		};     
	}
)(jQuery);