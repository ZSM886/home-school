if(localStorage.getItem("token")){
    $(".login").html('<ul class="nav navbar-nav navbar-right login"><li class="font-size col_Red"><span>用户名<span>'+ localStorage.getItem("username") +'</span></span><button id="close">取消登录</button></li></ul>');
    // console.log(localStorage.getItem("username"));
    $("#close").click(function(){
        localStorage.clear();
        $(".login").html('<ul class="nav navbar-nav navbar-right login"><li class="font-size col_Red"><a href="html/login.html">亲，请登录</a></li><li class="left_title">或</li><li class="font-size hover_Red"><a href="html/register.html">免费注册</a></li></ul>')
    })
}



$("#magnifier").click(function(){
    var searchStr = $("#search").val();
    window.location.href = "html/goodsSearch.html";                             //"../html/detail.html?goods_id=" + searchStr;    
})

//分类页
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
    var obj = response;
    for(var i = 0; i < obj.data.length;i++){
        $("#classIfton").append('<li><a href="html/list.html?cat_id="'+obj.data[i].cat_id+'>' + obj.data[i].cat_name + '</a></li>');
    }
})


//懒加载添加商品
function showShop(page){
$.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=10",
    "type":"GET",
    "dataType":"json",
    "success":function(response){
    var obj = response;
    for(var i = 0; i < obj.data.length;i++){
        $("#goodList").append('<li><img src="' + obj.data[i].goods_thumb + '"><p><a href="html/goods.html?goods_id='+obj.data[i].goods_id+'">' +obj.data[i].goods_name+'</a></p><p>' +obj.data[i].goods_desc+ '</p><p class="price">价格：<span>￥' +obj.data[i].price+ '</span></p><button goodid="' +obj.data[i].goods_id + '" class="goods_car"><i class="iconfont icon-gouwuche icon_left"></i><span>加入购物车</span></button></li>');
    }
        lock=true;
    $(".goods_car").click(function(event){
        event.preventDefault();
        var goodid = $(this).attr("goodid");
        console.log(goodid)
        var goods_number =localStorage.getItem("cart" + goodid);
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
                    // console.log(response);
                    localStorage.setItem("cart" + goodid,goods_number);
                }
        });
      
      
    })
    }
});
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


var page=1;
$("#maginfier").click(function(){
	var searchStr =  $("#search").val();			
	location.href = "html/goodsSearch.html?search_text=" + searchStr+"&page="+page+"&pagesize=6";
})

