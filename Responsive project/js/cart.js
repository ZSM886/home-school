
var windowWidth;

$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
  "type":"get",
  "dataType":"json",
  "success":function(response){
    //判断购物车中有没有商品
    if(response.data.length>0){
      for(var i=0;i<response.data.length;i++){
      var obj=response.data[i];

      var html=`<div class="row goods">
      <div class="goods col-md-2 col-sm-2 col-xs-1">
      <input type="checkbox" class="chkbox check">
      <input type="hidden" class="goods_id" value="${obj.goods_id}">
      </div>
      <div class="col-md-4 col-sm-4 col-xs-2">
      <img src="${obj.goods_thumb}" alt="" class="img-circle goodsPic">
      <p class="picName" title="${obj.goods_name}">${obj.goods_name}</p>
      </div>
      <div class="col-md-1 col-sm-1 hidden-xs">
      <div class="goods-one">${obj.goods_price}</div>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-3">
      <div class="goods-lists">
      <span class="left-button">-</span>
      <input type="text" class="center-text" value="${obj.goods_number}">
      <span class="right-button">+</span>
      </div>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-3">
      <div class="goods-sum">${obj.goods_price * obj.goods_number}</div>
      </div>
      <div class="col-md-1 col-sm-1 col-xs-2">
      <div class="goods-op">
      <span class="cut">删除</span>
      </div>
      </div>
      </div>
`;
$("#Shop").html($("#Shop").html()+html);
}
  
    windowWidth=window.innerWidth;
    if(windowWidth<=768){
      $(".picName").css({"width":$(".lost").width()})
      $(".goodsPic").addClass("hide");
      $(".left-button,.right-button").addClass("hide");
      $(".oper").css({"width":"18"});
      $(".selectAll").addClass("hide");
    }else{
      $(".picName").css({"width":$(".lost").width()-100})
      $(".goodsPic").removeClass("hide");
      $(".oper").css({"width":"50%"});
      $(".selectAll").removeClass("hide");
    }

    
    window.onresize=function(){
      windowWidth=window.innerWidth;
      if(windowWidth>=768){
        $(".goodsPic").removeClass("hide");
        $(".picName").css({"width":$(".lost").width()-100});
        $(".left-button,.right-button").removeClass("hide");
        $(".oper").css({"width":"50%"});
        $(".selectAll").removeClass("hide");
      }else{
        $(".picName").css({"width":$(".lost").width()})
        $(".goodsPic").addClass("hide");
        $(".left-button,.right-button").addClass("hide");
        $(".oper").css({"width":"18"});
        $(".selectAll").addClass("hide");
      }
    }


    // 添加删除事件
    $(".goods-op").click(function(){
      // alert("您是否删除这个商品?");
      
      var now=this;

      $("body").append('<div class="shade"><div class="choose"><p>是否删除选中的商品</p><button class="choose-yes">是</button><button class="choose-no">否</button></div></div>')

      $(".choose-no").click(function(){
        $(".shade").remove();
        return;
      })
      $(".choose-yes").click(function(){
        $(".shade").remove();
        
      var goods=now.parentNode.parentNode;
      
      //删除dom节点
      $(goods).remove();

      //通过数据删除
      updataCarAjax(now,0);
      })

    })

    // 减号按钮事件监听
    $(".left-button").click(function(){
      upDataCart(this,"-1");
    })
    //加号按钮事件监听
    $(".right-button").click(function(){
      upDataCart(this,"+1");
    })

    // 输入内容失去焦点触发改变商品数量
    $(".center-text").blur(function(){
      setGoods(this);
    })
    }
  }
});

// 选中元素删除商品信息
$("#Delete").click(function(){
  //找到商品信息goods里面的复选框（选中状态的）
  var inputs=$(".goods input:checked");

  for(var i=0;i<inputs.length;i++){
    // var goods_id=document.getElementsByClassName("goods_id")[0].value;
    var goodsL=inputs[i].parentNode.parentNode;
    var objPa=inputs[i];

    //删除数据库中响应内容
    updataCarAjax(objPa,0);
    goodsL.parentNode.removeChild(goodsL);
  }
})



$("#Box").click(function(event){
  //全局委托
  //全选

  var checkboxs=document.getElementsByClassName("chkbox");
  var selected=event.target.checked;
  if(event.target.id==="selectAll"){
    //得到 全选按钮的当前选中状态存入变量
    // selected=event.target.checked;
    // checkboxs=document.getElementsByClassName("chkbox");

    for(var i=0;i<checkboxs.length;i++){
      checkboxs[i].checked=selected;
    }
    showSum();
    return;
  }
  if(event.target.type==="checkbox"){
    showSum();
  }

  var k=$(".chkbox:checked").length;
  if(k==checkboxs.length){
    $("#selectAll").prop("checked",true);
  }else{
    $("#selectAll").prop("checked",false);
  }
})




//显示总价和数量的函数
function showSum(){
 //动态得到数据类数组
  var goods=document.getElementsByClassName("goods");
  var sum=0;
  var num=0;

  for(var i=0;i<goods.length;i++){
    var objGoods=goods[i];

    //判断
    if($(objGoods).children("div:first").children("input:first").is(":checked")){
      //累加
      sum+=parseInt($(objGoods).children("div:eq(4)").children("div:first").text());
      num+=parseInt($(objGoods).children("div:eq(3)").children("div:first").children("input").val());
    }
  }
  $("#Money").text("￥"+sum);
  $("#Amount").text(num);
}



//改变购物车商品数量的业务函数
function upDataCart(obj,num){
  //obj当前触发事件的元素，num：-1，+1
  //找对象
  var Good=obj.parentNode.parentNode.parentNode;

  //找到商品数量
  var goods_id=Good.getElementsByClassName("goods_id")[0].value;
  var goods_number=Good.getElementsByClassName("center-text")[0];
  var goods_number_value=parseInt(goods_number.value);
  var goods_price=Good.getElementsByClassName("goods-one")[0];
  var goods_price_value=parseInt(goods_price.innerText);
  var goods_subtotal=Good.getElementsByClassName("goods-sum")[0];

  //判断范围
    if(num=="-1"&&goods_number_value<=1){
      return;
    }
    if(num=="+1"&&goods_number_value>=100){
      return;
    }
    if(num=="-1"){
      goods_number_value--;
    }else if(num=="+1"){
      goods_number_value++;
    }else if(num>0){
      goods_number_value=num;
    }else{
      goods_number_value=0;
    }
    

    //当前商品的值      //信号量改变后的值
    goods_number.value=goods_number_value;
    
    //算出合计金额
    var subtotal=goods_number_value * goods_price_value;
    
    //把合计金额写入页面
    goods_subtotal.innerText=subtotal;
    showSum();
} 


//设置某件商品的数量
function setGoods(obj){
  //获取商品数量
  var num=parseInt($(obj).val());

  //判断商品数量的值，大于或小于范围
  if(num<1||isNaN(num)){
    $(obj).val(1);
  }
  if(num>100){
    $(obj).val(100);
  }

  //让金额合计变化
  upDataCart(obj,$(obj).val());
}


// 跳转到订单页，并把金额带进去
$("#checkout").click(function(){
  var sum=$("#Money").text().substr(1);
  location.href="checkout.html?sum"+sum;
})


//删除商品通过ajax
function updataCarAjax(obj,num){
  
  var goods=obj.parentNode.parentNode;
  var goods_id=goods.getElementsByClassName("goods_id")[0].value;

  $.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
  "type":"POST",
  "dataType":"json",
  "data":{
    "goods_id":goods_id,
    "number":num,
  },
  "success":function(response){
    localStorage.removeItem("cart"+goods_id);
    alert("删除商品成功");
  }
})
}