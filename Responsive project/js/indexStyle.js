
// 返回顶部
$(".fanhuidingbu").eq(0).click(function() {
	$("body,html").animate({scrollTop: 0});
});
$(document).scroll(function() {	
	var top = $(document).scrollTop();
	if (top > 200) {
		$(".fanhuidingbu").eq(0).show();
	} else {
		$(".fanhuidingbu").eq(0).hide();
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
			$("#sP1").append('<a href="goods.html?goods_id=33710"><img src="'+obj.data[i].goods_thumb+'"><div class="carousel-caption">'+ obj.data[i].goods_name +'</div></a>');
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
			$("#sP2").append('<a href="goods.html?goods_id=36521"><img src="'+obj.data[i].goods_thumb+' width="200%"><div class="carousel-caption">'+ obj.data[i].goods_name +'</div></a>');
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
			$("#bP1").append('<a href="goods.html?goods_id=257020"><img src="'+obj.data[i].goods_thumb+'"><div class="carousel-caption">'+ obj.data[i].goods_name +'</div></a>');
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
			$("#bP2").append('<a href="goods.html?goods_id=251500"><img src="'+obj.data[i].goods_thumb+'"><div class="carousel-caption">'+ obj.data[i].goods_name +'</div></a>');
		}
	}
})

	//搜索按钮，实现跳转
	var page=1;
$("#btn1").click(function(){
	var searchStr =  $("#search").val();			
	window.location.href = "goodsSearch.html?search_text=" + searchStr+"&page="+page+"&pagesize=2";
})