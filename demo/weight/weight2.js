/*--测试数据格式--*/
var goodsList = [
    {
     postcodeId : "1234567",
     goods : [{id:"526548",name:"外国的手表",count:1}]
    },
    {
     postcodeId : "1234568",
     goods : [{id:"555555",name:"外国的手表",count:1},
             {id:"666666",name:"外国的电脑",count:2}]
    },
    {
     postcodeId : "1234569",
     goods : [{id:"45685",name:"外国的手表",count:1},
             {id:"525225",name:"外国的电脑",count:2},
             {id:"235665",name:"外国的小猫",count:4},
             {id:"565852",name:"外国的小狗",count:8},
             {id:"665545",name:"外国的玩具",count:7}]
    }
]                   
/*--测试数据格式--*/

var onGoodsTemp = Handlebars.compile($("#onGoods-template").html()),
    packGoodsTemp = Handlebars.compile($("#packGoods-template").html());

var $onPackTable = $("#onPackTable").find('tbody'),
    $packBoxTable = $("#packBoxTable").find('tbody');

var sizeId = ["#ipLong","#ipWide","#ipHigh"]; 

var Weight = 0,
    packGoods = [],
    packOverGoods = []; 

$(function(){
    
   init();

   keyLive();   

   countLwg();
})


function init(){
   packGoods = goodsList;
   
   $onPackTable.html(onTemplate(packGoods)); 
}

//打包对象
function jwgGood(goods){
    
    var jwg = new Object();
    
    jwg.pid = goods.pid;
    jwg.id = goods.id;
    jwg.name = goods.name;
    jwg.count = goods.count;
    jwg.isFirst = goods.isFirst;
    jwg.leg = goods.leg;

    return jwg;
}


function onTemplate(good){
	  var html = ''
    disData(good,function(good_){
       html = onGoodsTemp({'Goods':good_}); 
    })
    return html
}

function packTemplate(good){
    var html = ''
    disData(good,function(good_){
       html = packGoodsTemp({'Goods':good_}); 
    })
    return html
}

//打包数据重新封装
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
               goods[m].pid = postcodeId;
               goods[m].isFirst = false; 
               newGoods.push(goods[m]) 
             }
        };
   };

   callback(newGoods)
}

function resetpack(){
     for (var i = 0; i < packOverGoods.length; i++) {
          if(packOverGoods[i].goods.length === 0 ){
             packOverGoods.remove(i);
          }
     };

     $onPackTable.html(onTemplate(packGoods)); 
     $packBoxTable.html(packTemplate(packOverGoods)); 
}


/*--按钮操作--*/
//打包 
function packBut(this_){

    var self = $(this_).parent().parent(),
        count = parseInt(self.data("count"),10), 
        pid = self.data("pid"),
        id = self.data("id");
      
      for (var m = 0; m < packGoods.length; m++) {
         if( packGoods[m].postcodeId == pid ){
             if(packOverGoods.length>0){
               for (var j = 0; j < packOverGoods.length; j++) {
                   if(packOverGoods[j].postcodeId == pid){
                      //存在
                      var goods = packGoods[m].goods;

                      for (var n = 0; n < goods.length; n++) {
                  
                          if(goods[n].id == id){                    

                             var overgoods = packOverGoods[j].goods;

                             for (var l = 0; l < overgoods.length; l++) {

                                  if(overgoods[l].id == id){

                                      overgoods[l].count = overgoods[l].count + count;
                                      packGoods[m].goods.remove(n);

                                      resetpack(); 
  
                                      return  

                                  }else{

                                     if(l==(parseInt(overgoods.length,10)-1)){

                                        packOverGoods[j].goods.push(goods[n]);

                                        packGoods[m].goods.remove(n);

                                        resetpack(); 

                                        return 

                                     }
                                  }

                             }

                          }                                      
                      };   

                   }else{
                      //不存在
                      if(j==(parseInt(packOverGoods.length,10)-1)){

                        var goods = packGoods[m].goods;

                        for (var n = 0; n < goods.length; n++) {
                    
                            if(goods[n].id == id){                

                               packOverGoods.push({
                                   postcodeId:packGoods[m].postcodeId,
                                   goods:[goods[n]]  
                               }) 

                               packGoods[m].goods.remove(n); 

                               resetpack(); 

                               return 
                            }
                    
                        };                       
                      
                      } 
                       
                   }
               };
             }else{
                //第一次
                var goods = packGoods[m].goods;

                for (var n = 0; n < goods.length; n++) {
                  
                  if(goods[n].id == id){                    

                     packOverGoods.push({
                          postcodeId:packGoods[m].postcodeId,
                          goods:[goods[n]]  
                     })

                     packGoods[m].goods.remove(n);

                     resetpack(); 

                     return 
                  }
                  
                 };   

             }
         }
     }; 
}

//删除
function deleteBut(this_){
   var self = $(this_).parent().parent(),
       count = parseInt(self.data("count"),10), 
       pid = self.data("pid"),
       id = self.data("id");   
   
   for (var m = 0; m < packOverGoods.length; m++) {
      if( packOverGoods[m].postcodeId == pid ){

          for (var j = 0; j < packGoods.length; j++) {
              if(packGoods[j].postcodeId == pid){
                  
                var goods = packOverGoods[m].goods;

                for (var n = 0; n < goods.length; n++) {
            
                    if(goods[n].id == id){ 
                       var overgoods = packGoods[j].goods;

                       if(overgoods.length){

                           for (var l = 0; l < overgoods.length; l++) {

                               if(overgoods[l].id == id){

                                  overgoods[l].count = overgoods[l].count + count;
                                  packOverGoods[m].goods.remove(n);  

                                  resetpack();

                                  return 
                               }else{

                                  if(l==(parseInt(overgoods.length,10)-1)){

                                     packGoods[j].goods.push(goods[n]);

                                     packOverGoods[m].goods.remove(n);

                                     resetpack(); 

                                     return 

                                  }
                               } 
                           }

                       }else{
                          packGoods[j].goods.push(goods[n]);

                          packOverGoods[m].goods.remove(n);

                          resetpack(); 

                          return 
                       }                 
                    }
            
                };   
              } 
          }
      }  
   }
}

//拆分
function splitBut(this_){

    var self = $(this_).parent().parent(),
    splitNum = parseInt(self.find("#splitNum").val(),10), 
         pid = self.data("pid"),
          id = self.data("id"),
       count = parseInt(self.data("count"),10); 

       var re =/^\+?[1-9][0-9]*$/; 

    if(re.test(splitNum)){
      if (count > splitNum){

         for (var m = 0; m < packGoods.length; m++) {
           if( packGoods[m].postcodeId == pid ){
               if(packOverGoods.length>0){
                 for (var j = 0; j < packOverGoods.length; j++) {
                     if(packOverGoods[j].postcodeId == pid){
                        //存在
                        var goods = packGoods[m].goods;

                        for (var n = 0; n < goods.length; n++) {
                    
                            if(goods[n].id == id){                            
                               var overgoods = packOverGoods[j].goods;

                               for (var l = 0; l < overgoods.length; l++) {

                                   if(overgoods[l].id == id){

                                      overgoods[l].count = overgoods[l].count + splitNum;
                                      packGoods[m].goods[n].count = count-splitNum;

                                      resetpack(); 
  
                                      return  
                                   }else{

                                     if(l==(parseInt(overgoods.length,10)-1)){

                                       var newGoods = jwgGood(goods[n]);
                                           newGoods.count = splitNum;  
                                
                                          packOverGoods[j].goods.push(newGoods);
     
                                          packGoods[m].goods[n].count = count-splitNum;

                                          resetpack(); 

                                          return 
                                      }    
                                   }
                               };
                            }
                    
                        };   

                     }else{
                        //不存在
                        if(j==(parseInt(packOverGoods.length,10)-1)){

                          var goods = packGoods[m].goods;

                          for (var n = 0; n < goods.length; n++) {
                      
                              if(goods[n].id == id){ 
                                 var newGoods = jwgGood(goods[n]);
                                     newGoods.count = splitNum;                 

                                 packOverGoods.push({
                                     postcodeId:packGoods[m].postcodeId,
                                     goods:[newGoods]  
                                 }) 

                                 packGoods[m].goods[n].count = count-splitNum;

                                 resetpack(); 

                                 return 
                              }
                      
                          };                       
                        
                        } 
                         
                     }
                 };
               }else{
                  //第一次
                  var goods = packGoods[m].goods;

                  for (var n = 0; n < goods.length; n++) {
                    
                    if(goods[n].id == id){ 

                       var newGoods = jwgGood(goods[n]);
                           newGoods.count = splitNum;                      

                       packOverGoods.push({
                            postcodeId:packGoods[m].postcodeId,
                            goods:[newGoods]  
                       })                      
                       
                       packGoods[m].goods[n].count = (count-splitNum);

                       resetpack(); 

                       return 
                    }
                    
                   };   

                 }
              }
          };

      }else{
         alert("拆分个数不能大于或等于商品数量！")
      } 
    }else{
      alert("请输入正确数字格式") 
    }
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

/*-------------------价格修改操作----------------------*/

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



/*---tool(工具)---*/
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

Array.prototype.remove=function(dx)
{
　　if(isNaN(dx)||dx>this.length){return false;}
　　for(var i=0,n=0;i<this.length;i++)
　　{
　　　　if(this[i]!=this[dx])
　　　　{
　　　　　　this[n++]=this[i]
　　　　}
　　}
　　this.length-=1
}
