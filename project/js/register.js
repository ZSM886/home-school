$('input[name="username"]').blur(function(){
    var username = $('input[name="username"]').val();
    console.log(username);
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_user.php",
        "type":"POST",
        "dataType": "json",
        "data": {
            "status": "check",
            "username": username
        },
        "success": function(response){
            console.log(response);
            if(response.code === 0){
                $(".success").show();
                $(".error").hide();
            }else if(response.code === 2001){
                $(".error").show();
                $(".success").hide();
            }
        }
    });
})

$("#register").click(function(){
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    // console.log(username,password);
    if(password.length < 6 || password.length>20){
        alert("密码长度应该在6-20位之内！");
        return;
    }
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_user.php",
        "type":"POST",
        "dataType":"json",
        "data": {
            "status":"register",
            "username":username,
            "password":password,
        },
        "success": function(response){
            console.log(response);
            if(response.code === 0){
                alert(response.message);
                window.location.href = "login.html";
            }
        }
    });
})