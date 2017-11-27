
var max;
var str=location.search.substr(1);
var goodId1=str.split("=")[1];
var page=1;
var pagesize=6;
var goodId=goodId1.split("&")[0];
var strNew=decodeURIComponent(goodId);
console.log(str);
console.log(goodId1);
console.log(goodId);


showShop(page);

function showShop(page){
$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_goods.php",
  "type":"GET",
  "data":{
    "search_text":strNew,
    "page":page,
    "pagesize":pagesize,
  },
  "dataType":"json",
  "success":function(response){
    var obj=response;
		//添加数据
		for(var i=0;i<obj.data.length;i++){
      max=obj.page.count/pagesize;

      $("#shop").append('<div class="col-md-4 col-sm-6 col-xs-12"><div class="box"><div class="thumbnail"><div class="smallGoodsThumb" id="smallGoodsThumb"><a href="goods.html?goods_id='+obj.data[i].goods_id+'"><img src="' + obj.data[i].goods_thumb + '" alt="" class="goodsThumb"/></a></div><div class="caption"><h3 class="goodsNameH"><a class="goodsName" href="goods.html?goods_id='+obj.data[i].goods_id+'" title="'+obj.data[i].goods_name+'">' +obj.data[i].goods_name+ '</a></h3><p class="goodsDesc" title="'+obj.data[i].goods_desc+'"><span>站长推荐:&nbsp;&nbsp;&nbsp;</span>' +obj.data[i].goods_desc+  '</p><p class="goodsPrice"><span>价格:&nbsp;&nbsp;</span>￥' +obj.data[i].price+  '</p><p><a class="btn btn-primary putIn" role="button" id="cart">加入购物车<i class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></i></a><a href="" class="btn btn-default collect" role="button">添加到收藏<i class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></i></a></p></div></div></div></div>');
    }

    //动态获取高度
    var h=$(".goodsThumb").eq(0).height();
    $(".goodsThumb").css("height",h);

		//分页
  }
});}
      

$("#ButtonPrev").click(function(){
  //信号量增加
  page--;
  //范围
  if(page <= 1) page = 1;
  //清空数据
  $("#shop").html("");
  $("#ButtonCenter").html('');
  showShop(page);
})

$("#ButtonNext").click(function(){
  //信号量增加
  page++;
  //范围
  if(page >=max) page = max;
  //清空数据
  $("#shop").html("");
  $("#ButtonCenter").html('');
  showShop(page);
})

//分页的点击事件
$("#ButtonCenter").click(function(event){
  event = event || window.event;
  var target = event.target || event.srcElement;
//				console.log(target.nodeName)
  if( target.nodeName === "BUTTON" ){
    //得到当前分页的内容，存入信号量
    page = target.innerText;
    $("#shop").html('');
    $("#ButtonCenter").html('');
    showShop(page); 
  }  
})

// 通过文本框内的中文搜索
$("#btn1").click(function(){
  $("#shop").html('');
  $("#ButtonCenter").html('');
  // $("#ButtonCenter").css('marginLeft',"0px");
  strNew=$("#search").val();
  page=1;
  showShop(page);
})


//点击购买事件
$("#shop").click(function(event){
  event = event || window.event;
  var target = event.target || event.srcElement;
//				console.log(target.nodeName)
  if( target.id === "cart" ){
    //得到当前分页的内容，存入信号量
  //判断当前是否登录，没登录无法加入购物车，提示用户，并跳转到登录页面，把当前路径发送给登录页面
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
  }  
})


//进入购物车
$("#shoppingCart").click(function(){
	window.location.href="cart.html"
})
