console.log(location.search)
var str=location.search.substr(1);
var goodId=str.split("=")[1];
var strNew=decodeURIComponent(goodId);
$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_goods.php",
  "type":"GET",
  "data":{
    "search_text":strNew,
  },
  "dataType":"json",
  "success":function(response){

    var obj=response;
    var html="";

    for(var i=0;i<obj.data.length;i++){
      html+='<div class="col-lg-6 col-md-6"><img src="' + obj.data[i].goods_thumb + '" alt="" /><p><a href="detail.html?goods_id='+obj.data[i].goods_id+'">商品名称:' +obj.data[i].goods_name+ '</a></p><p>商品简介:' +obj.data[i].goods_desc+  '</p><p class="price">商品价格:￥'+obj.data[i].price+'</p></div>';
    }

    $("#shop").html(html);
  }
})

// 通过文本框内的中文搜索
$("#btn1").click(function(){
  var strNew=$("#search").val();
    
  $.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_goods.php",
  "type":"GET",
  "data":{
    "search_text":strNew,
  },
  "dataType":"json",
  "success":function(response){

    var obj=response;
    var html="";

    for(var i=0;i<obj.data.length;i++){
      html+='<div class="col-lg-6 col-md-6"><img src="' + obj.data[i].goods_thumb + '" alt="" /><p><a href="detail.html?goods_id='+obj.data[i].goods_id+'">商品名称:' +obj.data[i].goods_name+ '</a></p><p>商品简介:' +obj.data[i].goods_desc+  '</p><p class="price">商品价格:￥'+obj.data[i].price+'</p></div>';
    }

    $("#shop").html(html);
  }
})
})


