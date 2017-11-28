//查询订单详情
$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token,
    "type":"GET",
    "dataType": "json",
    "success": function(response){
      
      if(response.code === 0){
        
        var html = '';
        //外层for循环，循环的是订单的长度
        for(var i=0;i<response.data.length;i++){
          var obj = response.data[i]; //每条的订单信息
          
          html += '<div class="order-item">';
          html += '<div class="order-item-header">订单号：' + obj.order_id +'</div>';
          
          //里层for循环
          for(var j=0;j<obj.goods_list.length;j++){
            
            var goods = obj.goods_list[j];  //商品列表
            
            //商品金额计算
            goods.subtotal = goods.goods_number * goods.goods_price;
            
            html += '<div class="row"><div data-id="'+goods.goods_id+'" class="col-dm-3 col-sm-3 hidden-xs order-item-pic"><img src="'+goods.goods_thumb+'" class="img-rounded"></div><div class="col-dm-7 col-sm-7 col-xs-12">商品名称：' + goods.goods_name 
            + '商品数量：' + goods.goods_number 
            + '商品单价：' + goods.goods_price 
            + '商品金额：' + goods.subtotal 
            + '</div></div>';
          }
          
          html += '</div>'
        }
        
        $("#order-list").html(html);
      }
    }
});