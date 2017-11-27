var rate=2;
var windowWidth;


//通过url内容，得到商品id，查询商品，并展示到页面中
var str = location.search.substr(1);

var goodId = str.split("=");

//		console.log(goodId[1]);  
$.ajax({
  "url": "http://h6.duchengjiu.top/shop/api_goods.php",
  "type": "GET",
  "data": {
    "goods_id": goodId[1]
  },
  "dataType": "json",
  "success": function(response){
    console.log(response);
    
    var obj = response;
  
    for(var i=0;i<obj.data.length;i++){
      $("#shop").append('<div class="goodsInfo"><a href="goods.html?goods_id='+obj.data[i].goods_id+'" ><div class="smallGoodsThumb"><img src="' + obj.data[i].goods_thumb + '" alt=""/><div class="zoom"></div></div></a><p><h3><a href="goods.html?goods_id='+obj.data[i].goods_id+'" class="goodsName">名称:&nbsp;&nbsp;&nbsp;' +obj.data[i].goods_name+ '</a></h3></p><p class="goodsDesc"><span>简介:&nbsp;&nbsp;&nbsp;</span>' +obj.data[i].goods_desc+  '</p><p class="goodsPrice"><span>价格:&nbsp;&nbsp;&nbsp;</span>￥' +obj.data[i].price+  ' </p><div class="bigGoodsThumb"><img src="'+obj.data[i].goods_thumb+'" class="oimg"><div></div>');
    }
    // console.log($(".smallGoodsThumb img").width());
      windowWidth=window.innerWidth;
      ass(windowWidth);

  }
})
window.onresize=function(){
  windowWidth=window.innerWidth;
  
  ass(windowWidth);
}


//放大镜
function ass(windowWidth){
  console.log(windowWidth);
  console.log(windowWidth>=995);
  if(windowWidth<1170) {
    $(".smallGoodsThumb").off("mouseover");
    $(".smallGoodsThumb").off("mouseout");
    $(".smallGoodsThumb").off("mousemove");

    return;
  }


    console.log(windowWidth>=995)
  $(".smallGoodsThumb").mouseover(function(){
    $(".zoom,.bigGoodsThumb").css("display","block");
  })

  $(".smallGoodsThumb").mouseout(function(){
    $(".zoom,.bigGoodsThumb").css("display","none");
  })

  $(".smallGoodsThumb").mousemove(function(event){
    var event = event || window.event;        
    //得到页面的卷动值
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    
    var x = event.clientX - (getAllTop($(".smallGoodsThumb").get(0)) - scrollLeft)- 180;
    var y = event.clientY - (getAllLeft($(".smallGoodsThumb").get(0)) - scrollTop)- 30;
    
    //范围
    if(x < 0 ) x = 0;
    if(y < 0 ) y = 0;
    if(x > 216) x = 216;
    if(y > 216) y = 216;
    
    //赋值
    $(".zoom").css({"left":x,"top":y});
    
    //让大图移动
    $(".bigGoodsThumb img").css({"left":-x*rate,"top":-y*rate});
  })
  }

//返回这个元素在页面的净位置
function getAllTop(obj){
  //累加器
  //一会while开始，是从它父级累加
  var allTop = obj.offsetTop;
  //当前正在计算高度的元素
  var currentObj = obj;
  while(currentObj = currentObj.offsetParent){
    allTop += currentObj.offsetTop;
  }
  return allTop;
}

//返回这个元素在页面的净位置
function getAllLeft(obj){
  //累加器
  //一会while开始，是从它父级累加
  var allLeft = obj.offsetLeft;
  //当前正在计算高度的元素
  var currentObj = obj;
  while(currentObj = currentObj.offsetParent){
    allLeft += currentObj.offsetLeft;
    
  }
  return allLeft;
}




//点击购买事件
  $(".btn").eq(0).click(function(){
    console.log(1);
  if(!localStorage.getItem("token")){
    alert("请登录后才能加入购物车！");
    location.href = "login.html#callback=" + location.href;
  }
  
//			console.log(goodId[1]); 

  //获取本地存储中的商品数量信息
  var goods_number = localStorage.getItem("cart"+goodId[1]);
  
  //如果有 则是买过！让之前的数量+1  如果没有就是第一次购买，那么数量是1
  goods_number = goods_number ? parseInt(goods_number)+1 : 1;
  
  $.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.getItem("token"),
    "type":"POST",
    "dataType": "json",
    "data": {
      "goods_id" : goodId[1],
      "number"   : goods_number
    },
    "success": function(response){
      console.log(response);
      
      //成功后存储商品信息购买数量到本地存储中
      localStorage.setItem("cart"+ goodId[1],goods_number);
      //跳转到购物车页面
    }
  }); 
})


//进入购物车
$("#shoppingCart").click(function(){
	window.location.href="cart.html"
})
