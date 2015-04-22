/*--测试数据格式--*/
var goods=[{id:"123456",name:"外国的手表",count:1},
           {id:"223456",name:"外国的电脑",count:2},
           {id:"323456",name:"外国的小猫",count:4},
           {id:"323458",name:"外国的小狗",count:8},
           {id:"323455",name:"外国的玩具",count:7}];

var goodsList = [
    {
     postcodeId : "1234567",
     goods : [{id:"123456",name:"外国的手表",count:1}]
    },
    {
     postcodeId : "1234568",
     goods : [{id:"123456",name:"外国的手表",count:1},
             {id:"223456",name:"外国的电脑",count:2}]
    },
    {
     postcodeId : "1234569",
     goods : [{id:"123456",name:"外国的手表",count:1},
             {id:"223456",name:"外国的电脑",count:2},
             {id:"323456",name:"外国的小猫",count:4},
             {id:"323458",name:"外国的小狗",count:8},
             {id:"323455",name:"外国的玩具",count:7}]
    }
]                   
/*--测试数据格式--*/

var onGoods = Handlebars.compile($("#onGoods-template").html()),
    packGoods = Handlebars.compile($("#packGoods-template").html());

var $onPackTable = $("#onPackTable").find('tbody'),
    $packBoxTable = $("#packBoxTable").find('tbody');

var sizeId = ["#ipLong","#ipWide","#ipHigh"]; 

var Weight = 0; 

$(function(){
    
   init();

   keyLive();   

   countLwg();
})


function init(){
	disData(goodsList,function(goods_){

      var gHtml = onGoods({'Goods':goods_});

      $onPackTable.html(gHtml); 
      
	})  
}

function jwgGood(pid,id,name,count,isFirst,leg){
    
    var jwg = new Object();
    
    jwg.pid = pid;
    jwg.id = id;
    jwg.name = name;
    jwg.count = count;
    jwg.isFirst = isFirst;
    jwg.leg = leg;

    return jwg;
}

function onTemplate(good){
	  var html = ''
    disData(good,function(good_){
       html = onGoods({'Goods':good}); 
    })
    return html
}

function packTemplate(good){
    var html = packGoods({'Goods':good}); 
    return html
}

function disData(goodsList,callback){
    var  newGoods = [];

    for (var i = 0; i < goodsList.length; i++) {
        var postcodeId = goodsList[i].postcodeId,
            goods = goodsList[i].goods;

        for (var m = 0; m < goods.length; m++) {

             if(goods[m].count > 1){
               goods[m].ispuck = true;
             }else{
               goods[m].ispuck = false;  
             }
             
             if(m===0){
               goods[m].leg = goods.length;
               goods[m].pid = postcodeId;
               goods[m].isFirst = true; 
               newGoods.push(goods[m])
             }else{
               goods[m].leg = goods.length;
               goods[m].pid = postcodeId;
               goods[m].isFirst = false; 
               newGoods.push(goods[m]) 
             }
              
        };
   };

   callback(newGoods)
    

    // for (var i = 0; i < Goods.length; i++) {
    //  	if(Goods[i].count > 1){
    //        Goods[i].ispuck = true;
    //  	}else{
    //        Goods[i].ispuck = false;  
    //  	}
    //  }; 
}

function checkRepeat(pid,id,that,callback){
     var   thisGoods = {}, 
           goods = that.find("tr");
     
     for (var i = 0; i < goods.length; i++) {
        if($(goods[i]).data("pid") === pid){
             
             console.log(1) 

             console.log($(goods[i]))

             thisGoods.firstG = $(goods[i]); 

          if($(goods[i]).data("id") === id ){
            //pid 相等 id也相等

             thisGoods.thisG = $(goods[i]);
             
          }
        }
     };

     console.log(thisGoods)
     console.log(!thisGoods)
     
     callback(thisGoods); 
}

/*--按钮操作--*/
//打包 
function packBut(this_) {

	var self = $(this_).parent().parent(),
	 	  id = self.data("id"),
      pid = self.data("pid"),
	  	name = self.data("name"),
		  count = self.data("count"),
      leg = self.data("leg");


	checkRepeat(pid,id,$packBoxTable, function(repeat) {

		if (!repeat){
			$packBoxTable.append(packTemplate(jwgGood(pid,id, name, count,true,1)));
		} else {
      //是否在这个运单下有这个商品
      if(!repeat.thisG){

         var row = repeat.firstG.find(".row").attr("rowspan");
                 
         repeat.firstG.find(".row").attr("rowspan",parseInt(row,10)+1);
         repeat.firstG.after(packTemplate(jwgGood(pid,id, name, count,false,1))) 

      }else{
         //既有 运单也有 商品

         var count_ = repeat.thisG.data("count"),
         sum = parseInt(count, 10) + parseInt(count_, 10);

         if(repeat.firstG.data("id")==repeat.thisG.data("id")){
            repeat.thisG.replaceWith(packTemplate(jwgGood(pid,id, name, sum,true,1)))  
         }else{
            repeat.thisG.replaceWith(packTemplate(jwgGood(pid,id, name, sum,false,1))) 
         }
      }			
    }
    
    if(parseInt(leg,10) > 1 ){

    }else{
      self.remove(); 
    }

	})
}


//拆分
function splitBut(this_){
	var self = $(this_).parent().parent(),
	    splitNum = self.find("#splitNum").val(), 
	    id = self.data("id"),
		  name = self.data("name"),
		  count = self.data("count");

	var re =/^\+?[1-9][0-9]*$/;
	
	if(re.test(splitNum)){
		if (count > splitNum) {
			checkRepeat(id, $packBoxTable, function(repeat) {
				var spn = parseInt(splitNum,10); 
				if (!repeat) {
					$packBoxTable.append(packTemplate(jwgGood(id, name, spn)));
				} else {
					var count_ = repeat.data("count"),
						sum = parseInt(count_, 10) + spn;

					repeat.replaceWith(packTemplate(jwgGood(id, name, sum)));
				}
				self.replaceWith(onTemplate(jwgGood(id, name, parseInt(count, 10) - spn)));
			})
		} else if (count == splitNum) {
            packBut(this_)
		} else {
			alert("拆分个数不能大于商品数量！")
		}
	}else{
	  alert("请输入正确数字格式")	
	}
}

//删除
function deleteBut(this_){
	var self = $(this_).parent().parent(),
	    id = self.data("id"),
		name = self.data("name"),
		count = self.data("count");
    
    checkRepeat(id,$onPackTable,function(repeat){
    	if(!repeat){
        $onPackTable.append(onTemplate(jwgGood(id, name, count)));
    	}else{
           var count_ = repeat.data("count"),
               sum =parseInt(count_, 10)+parseInt(count, 10);

           repeat.replaceWith(onTemplate(jwgGood(id, name, sum)));    
    	}
    	self.remove();
    })    	
}

//不拆分立即打包  --全部移入打包
$("#promptlyAllBut").on("click",function(){

	  $onPackTable.html("");
    
      var gHtml = packGoods({'Goods':goods});

      $packBoxTable.html(gHtml); 
})

//完成并进行打印  --进行称重操作
$("#parcelUpBut").on("click",function(){
	  $('.goWeight').modal(); 
})

//修改商品价格
$("#checkWeight").on("click",function(){
	 if($(this).is(':checked')){  
        if(Weight===0){
            alert("商品还未进行称重不能进行修改");
            $(this).attr("checked",false);
        }else{
        	$("#amendWg").show();
        } 
	 }else{
        $("#ipWeight").val(Weight);
        $("#amendWg").hide();
	 }
})

$("#newSubmit").on("click",function(){
	 if($("#newWeight").val() ==="" ){
       alert("填写数据不能为空")
	 }else{
	 	    $("#ipWeight").val($("#newWeight").val());
        $("#amendWg").hide();	 	
	 }
})

//修改长宽高
$("#checkSize").on("click",function(){
   if($(this).is(':checked')){
      if (Weight === 0) {
         alert("先进行商品称重再设置长宽高");
         $(this).attr("checked",false);
      } else {
        for (var i = 0; i < sizeId.length; i++) {
          $(sizeId[i]).attr("disabled", false);
        };      
      }
   }else{
      for (var i = 0; i < sizeId.length; i++) {
         $(sizeId[i]).attr("disabled", true);
         $(sizeId[i]).val("");

         $("#ipWeight").val(Weight);
      };
   }
})
/*--按钮操作--*/


/*--计算公式--*/
// 体积重量=长（英寸）*宽（英寸）*高（英寸）/139
// 计费重量=（体积重量+实际重量）/2
// 当体积重量大于实际重量时，计费重量=（体积重量+实际重量）/2
function countLwg(){
   for (var i = 0; i < sizeId.length; i++) {
     $(sizeId[i]).on("blur",function(){
       var l = $(sizeId[0]).val(),   
           w = $(sizeId[1]).val(),
           h = $(sizeId[2]).val();
       
       if(l!=""&&w!=""&&h!=""){
          weighting(l,w,h);
       }
     })
   };
}

function weighting(Long,Wide,High){
    var W1 = parseFloat(Long,10)*parseFloat(Wide,10)*parseFloat(High,10),
        W2 = (Weight+W1)/2;

    if(W1>Weight){
        $("#ipWeight").val(W2);
    }
}
/*--计算公式--*/



/*--输入框--*/
function keyLive(){
   var weig=setInterval(function(){
   	  if($("#ipWeightHi").val() === ""){

         $("#ipWeightHi").focus();  
   	  }else{

         Weight = parseFloat($("#ipWeightHi").val())

   	  	 $("#ipWeight").val(Weight);
         clearInterval(weig);
   	  }
   },1500)
}


// $(document).keydown(function (event) {
//     if(event.keyCode == 13){
//        for (var i = 0; i < inputId.length; i++) {
//            	if($(inputId[i]).val() === "" ){
//            		$(inputId[i]).focus();
//            		return
//            	}
//        };          
//     } 
// })
/*--输入框--*/
