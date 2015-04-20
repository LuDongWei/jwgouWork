define(function(require, exports, module) {
    var $ = require("jquery"); 
	
	var LazyLoader = require("http://cca.mbaobao.com/mkts/201406/06/lazyloader.js");
	
	var style = '<style type="text/css">'+
				'.j_wrap{ width:100%; margin:0 auto; background-color:#6f0021; padding-top:15px;}'+
				'.j_main{ width:960px; margin:0 auto; overflow:hidden; font-size:0}'+
				'#j_main{padding-top: 20px}'+
				'.j_main ul{ width:970px}'+
				'.j_main ul li{ float:left; padding-right:4px; padding-bottom:4px}'+
				'.j_main #bn_1 li{ width:478px; height:230px}'+
				'.j_main #bn_2 li{ width:317px; height:300px}'+
				'.j_main #bn_3 li{ width:237px; height:360px}'+
				'.j_main #bn_3{padding-bottom: 28px;overflow: hidden;}'+
				'</style>';
	

	var bottomHtml = '<div class="j_wrap" style="padding-top:15px">'+
						'<div style="width:960px; margin:0 auto; font-size:0; position:relative; height:62px;"><div style="font-size:0; position:absolute; left:0; top:0"><img src="http://cca.mbaobao.com/mkts/201406/05/dnav/navd.jpg" width="964" height="62" /></div></div>'+
						'<!--group1-->'+
						'<div class="j_main" style="padding-top:20px">'+
						'<ul id="bn_1">'+
	'<li><a href="http://mkt.mbaobao.com/a-laokenzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/09/b-1.jpg" width="478" height="230"></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-manjian0609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/09/b-2.jpg" width="478" height="230"></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-chounzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/05/dnav/nz.jpg" width="478" height="230"></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-salenzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/05/dnav/nz-02.jpg" width="478" height="230" /></a></li>'+
	
	
	'<li><a href="http://mkt.mbaobao.com/a-zpnzq140616/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/14/jl/zp.jpg" width="478" height="230" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-ssnzq140616/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/14/jl/ss.jpg" width="478" height="230" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-fgnzq140616/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/14/jl/tm.jpg" width="478" height="230" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-xlnzq140616/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/14/jl/xx.jpg" width="478" height="230" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-nbnzq140616/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/14/jl/nb.jpg" width="478" height="230" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-dpnzq140616/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/14/jl/jd.jpg" width="478" height="230" /></a></li>'+
	
	
	
	
	'<li><a href="http://mkt.mbaobao.com/a-nvbaonzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/05/dnav/nz-03.jpg" width="478" height="230" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-nanbaonzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/05/dnav/nz-04.jpg" width="478" height="230" /></a></li>'+
						'</ul>'+
						'</div>'+
						'<!--group2-->'+
						'<div class="j_main">'+
						'<ul id="bn_2">'+
	'<li><a href="http://mkt.mbaobao.com/a-xiulvnzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/05/dnav/nz-05.jpg" width="317" height="300" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-affordableluxury/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/05/dnav/nz-06.jpg" width="317" height="300" /></a></li>'+
	'<li><a href="http://baby.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/05/dnav/nz-07.jpg" width="317" height="300" /></a></li>'+
						'</ul>'+
						'</div>'+
						'<!--group3-->'+
						'<div class="j_main">'+
						'<ul id="bn_3">'+
	'<li><a href="http://mkt.mbaobao.com/a-dudunzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/dudu.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-lmnzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/lm.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-mnzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/m+.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-aefnzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/af.jpg" width="237" height="360" /></a></li>'+

	'<li><a href="http://iscov.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/iscov.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-rainhanzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/renha.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-soponzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/sopo.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-vinhasnzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/vinhas.jpg" width="237" height="360" /></a></li>'+

	'<li><a href="http://mkt.mbaobao.com/a-gebnzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/gb.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-landeiw0605/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/ldw.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://delin.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/delin.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://coach.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/coach.jpg" width="237" height="360" /></a></li>'+

	'<li><a href="http://longchamp.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/14/jl/longch.jpg" width="237" height="360" /></a></li>'+	
	'<li><a href="http://dolcegabbana.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/dolce.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://fendi.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/fendi.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-guess/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/guess.jpg" width="237" height="360" /></a></li>'+

	'<li><a href="http://mcm.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/mcm.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://lv.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/louis.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://armani.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/aj.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://burberry.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/burberry.jpg" width="237" height="360" /></a></li>'+	

	'<li><a href="http://mkt.mbaobao.com/a-xxbmnzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/sp.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-jansport0506" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/Jansport.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-jworld/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/jworld.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://vanwalk.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/vanwalk.jpg" width="237" height="360" /></a></li>'+	

	'<li><a href="http://toppu.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/toppu.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-yznzq140609/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/yz.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://mkt.mbaobao.com/a-sunday/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/14/jl/sunday.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://bestine.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/bestine.jpg" width="237" height="360" /></a></li>'+
		
	'<li><a href="http://skiphop.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/skip.jpg" width="237" height="360" /></a></li>'+	
	'<li><a href="http://travelbuddies.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/travel.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://trunki.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/trunki.jpg" width="237" height="360" /></a></li>'+
	'<li><a href="http://winghouse.mbaobao.com/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201406/11/brandlist/winghouse.jpg" width="237" height="360" /></a></li>'+
						'</ul>'+
						'</div>'+
					'</div>';
	
	
	$('body').append(style);//加载样式
	
	var Loader = new LazyLoader({
		container : '.wrapper',
		autoDestroy : true,
		dynamic : true,
		threshold : 100,
		moduleLazyAttr : 'data-oxlazy-module',
		moduleLoadCallback : function (id, moduleContainer) {
			$('.J-bottom-brand').append(bottomHtml);
		}
	});

})