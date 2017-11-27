
// 返回顶部
$(".top").eq(0).click(function() {
	$("body,html").animate({scrollTop: 0});
});
$(document).scroll(function() {	
	var top = $(document).scrollTop();
	if (top > 200) {
		$(".top").eq(0).show();
	} else {
		$(".top").eq(0).hide();
	}
})


//通过ID获取图片
$.ajax({
	"url":"http://h6.duchengjiu.top/shop/api_goods.php",
	"type":"GET",
	"data":{
		"goods_id":33710
	},
	"dataType":"json",
	"success":function(response){
		var obj=response;
		for(var i=0;i<obj.data.length;i++){
			$("#sP1").append('<a href="html/goods.html?goods_id=33710"><img src="'+obj.data[i].goods_thumb+'"><div class="carousel-caption">'+ obj.data[i].goods_name +'</div></a>');
		}
	}
})

$.ajax({
	"url":"http://h6.duchengjiu.top/shop/api_goods.php",
	"type":"GET",
	"data":{
		"goods_id":36521
	},
	"dataType":"json",
	"success":function(response){
		var obj=response;
		for(var i=0;i<obj.data.length;i++){
			$("#sP2").append('<a href="html/goods.html?goods_id=36521"><img src="'+obj.data[i].goods_thumb+' width="200%"><div class="carousel-caption">'+ obj.data[i].goods_name +'</div></a>');
		}
	}
})

$.ajax({
	"url":"http://h6.duchengjiu.top/shop/api_goods.php",
	"type":"GET",
	"data":{
		"goods_id":257020
	},
	"dataType":"json",
	"success":function(response){
		var obj=response;
		for(var i=0;i<obj.data.length;i++){
			$("#bP1").append('<a href="html/goods.html?goods_id=257020"><img src="'+obj.data[i].goods_thumb+'"><div class="carousel-caption">'+ obj.data[i].goods_name +'</div></a>');
		}
	}
})

$.ajax({
	"url":"http://h6.duchengjiu.top/shop/api_goods.php",
	"type":"GET",
	"data":{
		"goods_id":251500
	},
	"dataType":"json",
	"success":function(response){
		var obj=response;
		for(var i=0;i<obj.data.length;i++){
			$("#bP2").append('<a href="html/goods.html?goods_id=251500"><img src="'+obj.data[i].goods_thumb+'"><div class="carousel-caption">'+ obj.data[i].goods_name +'</div></a>');
		}
	}
})



//对空白的处理
	$(".black").css({"height":$(".box3").height(),"width":$(".box3").width()});


//进入购物车
$("#shoppingCart").click(function(){
	window.location.href="html/cart.html"
})


















// //购物车下拉菜单
// $.ajax({
//   "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
//   "type":"get",
//   "dataType":"json",
//   "success":function(response){
// 		console.log(0);
// 		if(response.data.length==0||localStorage.getItem("token")){
// 			var html=`<li>您的购物车中没有任何商品</li>
// 			`;
// 		$(".dropdown-menu").html(html);
// 		}
// 	}})

