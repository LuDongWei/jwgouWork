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

var successData = {
  ResponseStatus: 0,
  ResponseMsg: "扫描成功",
  ResponseData: {
    IncomePackageList: [{
      postcodeId: "6907992100012",
      Type: "UPS",
      ShelfNo: "",
      goods: [{
        id: 273597,
        name: "dsad",
        count: 12
      }]
    }],
    PackTypeList: [{
      TypeHtml: "小包直邮件有客户自",
      TypeId: 1,
      IsChoice: true
    }, {
      TypeHtml: "大包普通件全额关税补贴， 适用于母婴产品，一般保健品，普通衣物，鞋帽，普货，价格为$5一磅",
      TypeId: 2,
      IsChoice: false
    }, {
      TypeHtml: "大包商业件全额关税补贴，化妆品类、包包、单价100刀品牌服装、品牌鞋子等，价格为$5一磅",
      TypeId: 3,
      IsChoice: false
    }, {
      TypeHtml: "大包特殊件全额关税补贴，电子产品，手表，高价格品牌服装、品牌鞋子等，价格为$5一磅，另外会有强制处理费。",
      TypeId: 4,
      IsChoice: false
    }],
    SendAddress: "flfly 12035 NE Marx ST Portland OR 97220 503-567-9758",
    ReceiveAddress: "张三丰 13313331333 中国 浙江省 杭州市 临安市 中环大厦1-102 314000",
    ServiceList: [{
      name : 'name01' ,
      IsMutileChoice: false,
      SubServiceList: [{
        Id: 1,
        serviceHtml: "内部填充加固",
        Amout: 3,
        CalculateFun: 0,
        IsChoice: true
      }, {
        Id: 2,
        serviceHtml: "简易打包",
         Amout: 1,
        CalculateFun: 0,
        IsChoice: false
      }, {
        Id: 3,
        serviceHtml: "原箱转运",
        Amout: 0,
        CalculateFun: 0,
        IsChoice: false
      }]
    }, {
      name : 'name02' , 
      IsMutileChoice: true,
      SubServiceList: [{
        Id: 8,
        serviceHtml: "取出宣传资料",
        Amout: 0,
        CalculateFun: 0,
        IsChoice: false
      }, {
        Id: 9,
        serviceHtml: "去除发票",
        Amout: 0,
        CalculateFun: 0,
        IsChoice: false
      }]
    }, {
      name : 'name03' ,
      IsMutileChoice: false,
      SubServiceList: [{
        Id: 11,
        serviceHtml: "顺风(&lt;span style=&quot;color:#E53333;&quot;&gt;转运物品每磅需要加收$1&lt;/span&gt;)",
        Amout: 1,
        CalculateFun: 1,
        IsChoice: true
      }, {
        Id: 12,
        serviceHtml: "其他",
        Amout: 0,
        CalculateFun: 0,
        IsChoice: false
      }, {
        Id: 13,
        serviceHtml: "韵达",
        Amout: 6,
        CalculateFun: 1,
        IsChoice: false
      }]
    }],
    PackRemark: null,
    FreightSetup: {
      FreightSetupStr: "首重2磅，首重费用：$10.00，续重费用：$5.00,小数点进位值：0.50",
      FirstMoney: 0,
      NexMoney: 5, 
      FirstWeight: 2, 
      WeightPoint: 0.5, //进位值
      FlyVolumeSet: 139, //体积重转化系数
      defaultMoney: 5  //初始化费率
    },
    Insurance: 123
  }
}
var failData = {
  ResponseStatus: 1,
  ResponseMsg: "运单不存在",
  ResponseData: ""
}
/*--测试数据格式--*/


var waybillTemp = Handlebars.compile($("#waybill-template").html()),
    packageTemp = Handlebars.compile($("#packageRadio-template").html()),
    packageInfTemp = Handlebars.compile($("#packageInf-template").html()),
    onGoodsTemp = Handlebars.compile($("#onGoods-template").html()),
    packGoodsTemp = Handlebars.compile($("#packGoods-template").html());

var $waybillTable = $("#waybillList").find('tbody'),
    $onPackTable = $("#onPackTable").find('tbody'),
    $packBoxTable = $("#packBoxTable").find('tbody');

var sizeId = ["#ipLong","#ipWide","#ipHigh"]; 

var WEIGHTURL = "http://192.168.1.120:82/Pre_Shipment/scanIncomeTrackNo",
    Weight = 0,
    Weight2 = 0,
    postcodeIdList = [],
    responseData = null,
    packageList = [],
    packGoods = [],
    packOverGoods = [],
    WeightMoney = null; 

$(function(){
   //扫描运单
   scansWaybill();

   //信息展示
   infInit();

   // 分包
   // partBox();
   

   // ajax(WEIGHTURL,{
   //   IncomeTrackNo : 
   //        },function(json){
   //          console.log(json) 
   //        })
})

/*-----------------运单号扫描-------------------*/
var wyOnce = true;
$("#wayReset").on("click",function(){
    wyOnce = true;
    $waybillTable.html("");
    $("#waybillId").val("");
    $("#waybillId").focus();
})

function scansWaybill(){
    $("#waybillId").focus();
    
    $("#waybillId").on("change",function(){
       var sid = $(this).val();

       if(wyOnce){
          // ajax(WEIGHTURL,{
          //   IncomeTrackNo :sid
          // },function(json){
          //   console.log(json) 
          // })
          json = successData;

          if(json.ResponseStatus == 1){
            $("#wayState").find(".wait").hide();
            $("#wayState").find(".failWait").html(json.ResponseMsg);  
            $("#wayState").find(".failWait").show();           
          }else{
            responseData = json.ResponseData;
            packageList = json.ResponseData.IncomePackageList;
         
            postcodeIdList.push(sid);  
                       
            wayTemp();

            wyOnce = false;
          }
       }else{
            postcodeIdList.push(sid);  

            wayTemp();
       }

       $("#waybillId").select();
    })     
}

function wayTemp(){
    var newpack = [];
    var isList = true; 

    for (var i = 0; i < packageList.length; i++) {
         for (var n = 0; n < postcodeIdList.length; n++) {
              if ( packageList[i].postcodeId ==  postcodeIdList[n]) {
                   packageList[i].isScan = true;
              };            
         };
         newpack.push(packageList[i])
    };
     
    $waybillTable.html(waybillTemp({'packageList': newpack }));

    for (var m = 0; m < newpack.length; m++) {
         isList = !!newpack[m].isScan && isList;  
    };

    if(isList){
      waySuccess();
    }
}  

function waySuccess(){
    $("#wayState").find(".wait").hide();
    $("#wayState").find(".failWait").hide();
    $("#wayState").find(".finish").show();

    infInit();
}

/*-----------------信息确认---------------------*/
function infInit(){

    //需要获取数据
    responseData =successData.ResponseData; 

    if(responseData){
       
       if(responseData.PackTypeList){
          infPackInf(responseData.PackTypeList);
       }
        
       infAddress(responseData.SendAddress,responseData.ReceiveAddress);

       if(responseData.ServiceList){
          infContent(responseData.ServiceList,responseData.Insurance,responseData.PackRemark) 
       } 

       if(responseData.FreightSetup){
          infWeight(responseData.FreightSetup)
       }

       if(responseData.IncomePackageList){
          partBox(responseData.IncomePackageList) 
       }

       $("#jwgInf").show();
       $("#jwgWeight").show();
    }
}

//包裹类型
function infPackInf(data){
   $("#packageRadio").html(packageTemp({'packageRadio':data}));
}

//地址信息
function infAddress(SendAddress,ReceiveAddress){

    $("#sendAddress").html(SendAddress);

    $("#receiveAddress").html(ReceiveAddress);
}

//内容填充
function infContent(data,cost,remark){

    for (var i = 0; i < data.length; i++) {
         var name = data[i].name,
             list = data[i].SubServiceList;

         for (var n = 0; n < list.length; n++) {
               list[n].name =name; 
         };    
    };

    $("#packageInfOne").html(packageInfTemp({"packageInf": data}));
    $("#packageInfTwo").find("#insuranceCost").val(cost); 
    $("#packageInfTwo").find("#userRemark").html(remark);
}

//物品重量
function infWeight(data){
    
    WeightMoney = data;
     
    //重量
    keyLive();

    //计算
    countLwg();


    //价格计算
    var bang = parseFloat($("#ipWeight").html(),10);
    if( bang !=  0 ){
       priceCompute(bang);  
    }
}


/*-----------------分包管理----------------------*/
function partBox(data){
   packGoods = data;
   
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

    packOverGoods = goodsList;  

    var newPackGoods = clone(packGoods);

    for (var i = 0; i < newPackGoods.length; i++) {
         newPackGoods[i].goods=[];
    };

	  $onPackTable.html(onTemplate(newPackGoods)); 

    packGoods = newPackGoods;

    $packBoxTable.html(packTemplate(packOverGoods)); 

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
        	$("#amendWg").attr("disabled", false)
        } 
	 }else{
        $("#ipWeight").html(Weight);
        $("#ipWeight").change();
        $("#amendWg").attr("disabled", true);
	 }
})

$("#amendWg").on("blur",function(){
	 if($("#amendWg").val() ==="" ){
       alert("填写数据不能为空")
	 }else{
	 	    $("#ipWeight").html($("#amendWg").val());
        $("#ipWeight").change();
        $("#amendWg").attr("disabled", true)
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
        Weight2 = parseFloat( $("#ipWeight").html(),10);    
      }
   }else{
      for (var i = 0; i < sizeId.length; i++) {
         $(sizeId[i]).attr("disabled", true);
         $(sizeId[i]).val("");

         $("#ipWeight").html(Weight2);
         $("#ipWeight").change();
      };
   }
})
/*--按钮操作--*/


/*--计算公式--*/
// 体积重量=长（英寸）*宽（英寸）*高（英寸）/139
// 计费重量=（体积重量+实际重量）/2
// 当体积重量大于实际重量时，计费重量=（体积重量+实际重量）/2
// -------------
// 运费 = 首重价格 + (计费重量 - 首重)*续重磅率
// FreightSetup: {
//   FreightSetupStr: "首重2磅，首重费用：$10.00，续重费用：$5.00,小数点进位值：0.50",
//   FirstMoney: 10,
//   NexMoney: 5,
//   FirstWeight: 2,
//   WeightPoint: 0.5, //进位值
//   FlyVolumeSet: 139, //体积重转化系数
//   defaultMoney: 5 //初始化费率
// },

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
    var W1 = parseFloat(Long,10)*parseFloat(Wide,10)*parseFloat(High,10)/parseFloat(WeightMoney.FlyVolumeSet,10),
        W2 = (Weight2+W1)/2;

    if(W1>Weight){
        $("#ipWeight").html(W2);
        $("#ipWeight").change();
    }
}

function keyLive(){
   var weig=setInterval(function(){
      if($("#ipWeightHi").val() === ""){

         $("#ipWeightHi").focus();  
      }else{

         Weight = parseFloat($("#ipWeightHi").val())

         $("#ipWeight").html(Weight);
         $("#ipWeight").change();
         clearInterval(weig);
      }
   },1500)
}

$("#ipWeight").on('change',function(){
     var bang = parseFloat($("#ipWeight").html(),10);
     
     priceCompute(bang);
})

function priceCompute(bang){
   //计算 价格
   var weig = bang.toString().split('.'),
       regular  = parseFloat(weig[0],10), 
       decimals = parseFloat('0.'+weig[1],10),
       newWeig = 0,
       weightPrice = 0,
       FirstMoney = WeightMoney.FirstMoney,
       NexMoney = WeightMoney.NexMoney;    
       
       if (!FirstMoney) FirstMoney = WeightMoney.defaultMoney ;
       if (!NexMoney) NexMoney = WeightMoney.defaultMoney ;
       

       if(decimals > WeightMoney.WeightPoint){
          newWeig = regular + 1;
       }else{
          newWeig = bang;
       }
       
       
       if(newWeig > WeightMoney.FirstWeight){
         // 大于首磅
         weightPrice = FirstMoney + (bang-WeightMoney.FirstWeight)*NexMoney;
       }else{
         weightPrice = FirstMoney; 
       }
       
       allPrice(weightPrice);
}

function allPrice(weightPrice){
     
     
    
}

/*--计算公式--*/


/*---tool(工具)---*/
function ajax(url,data,callback){
    $.ajax({
       type: "get",
       url: url,
       dataType: "jsonp",
       jsonp: "jsoncallback",
       data: data,
       success: function(json) {
            callback && callback(json);
       }
    })  
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

function clone(obj)
{
  var o,i,j,k;
  if(typeof(obj)!="object" || obj===null)return obj;
  if(obj instanceof(Array))
  {
    o=[];
    i=0;j=obj.length;
    for(;i<j;i++)
    {
      if(typeof(obj[i])=="object" && obj[i]!=null)
      {
        o[i]=arguments.callee(obj[i]);
      }
      else
      {
        o[i]=obj[i];
      }
    }
  }
  else
  {
    o={};
    for(i in obj)
    {
      if(typeof(obj[i])=="object" && obj[i]!=null)
      {
        o[i]=arguments.callee(obj[i]);
      }
      else
      {
        o[i]=obj[i];
      }
    }
  }
 
  return o;
}
