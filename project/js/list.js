$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
        var obj = response;
        for(var i=0;i<obj.data.length;i++){
            $("#classIfton").append('<li><a href="list.html?cat_id='+obj.data[i].cat_id+'">' + obj.data[i].cat_name + '</a></li>');
        }
    })
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
    var obj = response;
    for(var i = 0; i < obj.data.length; i++){
        $("classIfton").append('<li><a href="index.html?cat_id='+obj.data[i].cat_id+'">'+ obj.data[i].cat_name +'</a></li>')
    }
})


function showShop(page){
    console.log(page);
    console.log(location.search.substr(1));
var str = location.search.substr(1);
var catId = str.split("=");
$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=10",
    "type": "GET",
    "data": {
        "cat_id": catId[1]
    },
    "dataType":"json",
    "success": function(response){
        var obj = response;
        for(var i=0;i<obj.data.length;i++){
            $("#goodList").append('<li><img src=" ' +obj.data[i].goods_thumb+ '"> <p><a href="../html/goods.html?goods_id=' +obj.data[i].goods_id+ '">名称：' +obj.data[i].goods_name+ '</a></p><p>简介：' +obj.data[i].goods_desc+'</p><p class="price">价格：<span>￥' +obj.data[i].price+ '</span></p><button goodid="' +obj.data[i].goods_id + '" class="goods_car"><i class="iconfont icon-gouwuche icon_left"></i><span>加入购物车</span></button></li>')
        }
        lock=true;
        $(".goods_car").click(function(){
            var goodid = $(this).attr("goodid");
            var goods_number =localStorage.getItem("curt" + goodid);
            goods_number = goods_number ? parseInt(goods_number) + 1 : 1;
            $.ajax({
                "url":"http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.getItem("token"),
                "type":"POST",
                "dataType":"json",
                "data":{
                    "goods_id":goodid,   
                    "number":goods_number
                },
                "success":function(response){
                    console.log(response);
                    localStorage.setItem("curt" + goodid,goods_number);
                }
            });
            
        })        
    }
})
        
}

// //懒加载
var page = 1;
showShop(page);
var lock=true;
$(window).scroll(function(){
// //函数截流
if(!lock) return;

var A = $(window).scrollTop();
var B = $(window).height();
var C = $(document).height();

var rate = A / ( C - B );

if(rate >= 0.7){
    page++;	//信号量++
    showShop(page);
    //函数截流，每次触发的时候要把锁置为false
    lock = false;
}
})





//进入购物车
$("#shoppingCart").click(function(){
	window.location.href="cart.html"
})