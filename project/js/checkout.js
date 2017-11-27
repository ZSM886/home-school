var address_id = 0;

addressAjax();
function addressAjax(){
  
$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token,
  "type":"GET",
  "dataType": "json",
  "success": function(response){
    
    if(response.code === 0){
      
      var htmlData = '';
      for(var i=0;i<response.data.length;i++){
        var obj = response.data[i];
        
        htmlData += '<div class="row address-item" data-id="' +obj.address_id+ '"><div class="col-md-2 col-sm-2 col-xs-2 people">收货人：'+obj.address_name+'</div><div class="col-md-6 col-sm-6 col-xs-5 detailedAddress">详细地址：'
        +obj.address+'</div><div class="col-md-3 col-sm-3 col-xs-3 phone">手机号：'+ obj.mobile +'</div><div class="col-md-1 col-sm-1 col-xs-1 remove">X</div></div>'
        
      }
      $(".site").html(htmlData);
      
      
      //添加点击事件
      $(".address-item").click(function(event){
        
        console.log(1);
        $(this).addClass("active").siblings().removeClass("active");
        
        if(event.target){
          address_id = event.target.parentNode.getAttribute("data-id");
        }
      })
      
      //删除地址事件
      $(".remove").click(function(event){
        
        var remmoveLi = this.parentNode;
        remmoveLi.parentNode.removeChild(remmoveLi);
        
        //调用删除的ajax
        removeAjax(remmoveLi);
      })
      
    }
    
    
  }
});

}


//显示新增地址
$(".newAddress").click(function(){
  $("#add").show();
})

//隐藏新增地址
$(".close").click(function(){
  $("#add").hide();
})

//新建收货人地址信息
$("#btn").click(function(){
  //获取地址信息
  var data = $("form").serialize();
//				console.log(data);
  
  
  $.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token + "&status=add",
    "type":"POST",
    "dataType": "json",
    "data": data,
    "success": function(response){
      
      if(response.code === 0){
        $("#add").hide();
        addressAjax();
      }
      
      
    }
  });
})

//删除地址事件
function removeAjax(obj){
  //获取地址的id
  var address_id = $(obj).attr("data-id");
  
  $.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token + "&status=delete&address_id="+ address_id,
    "type":"GET",
    "dataType": "json",
    "success": function(response){
      console.log(response);
    }
  });
}

//获取总金额放入div元素
//通过location.search 获取get传过来数据,截取？ 在通过分割 = 
console.log(str);
var str = location.search.substr(1);
//用分割方法得到 = 号两边的内容
var sum = str.split("=");
//用下标找到金额

$("#sum").html("<span>当前订单的总金额是:&nbsp;&nbsp;&nbsp;<em>￥" +sum[1]+ "</em>元</span>")


//下订单事件
$("#order").click(function(){
  //判断地址是否选中
  if( address_id === 0){
    console.log(sum[1]);
    alert("请选择地址后在下单！");
    return;
  }
  
  //ajax调用
  $.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token + "&status=add",
    "type":"POST",
    "dataType": "json",
    "data": {
      "address_id": address_id,
      "total_prices": sum[1]
    },
    "success": function(response){
      console.log(sum[1]);
      if(response.code === 0){
        alert("提交订单成功！");
        //跳转到查询订单页面
        location.href = "order.html";
      }
    }
  });
})