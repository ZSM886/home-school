if( localStorage.getItem("token") ){    
    $("body").html("<h1>" + localStorage.getItem("username") + "您已经登录成功了！</h1>")

    setTimeout(function(){
        location.href = "../index.html";
    },2000);
}

$("#login").click(function(){
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    console.log(username,password);

    var re =  /^[A-Za-z0-9]+$/;


    console.log(username.length,password.length );

 

    if( username == "" && password == "" ){
        alert("请输入用户名或密码~");
    }else if( !re.test(username) || !re.test(password) ){
        alert("用户名或密码错误");
    }else if( username.length > 16 || username.length < 6 || password.length > 18 || password.length < 6 ){
            alert("用户名和密码长度不得大于16或者小于6位");
    }else{
        Verify();
    }
    
    // if( !re.test(username) ){
    //     alert("用户名错误");
    // }else if( !re.test(password)){
    //     alert("密码错误");
    // }else{
    //     alert("请正确输入用户名密码");
    // }

    function Verify(){
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_user.php",
            "type":"POST",
            "dataType":"json",
            "data":{
                "status":"login",
                "username":username,
                "password":password
            },
            "success":function(response){
                console.log(response);     
                if(response.code ===0){
                    var data = response.data;
                    for(property in data){
                        if(data.hasOwnProperty(property)){
                            localStorage.setItem(property,data[property]);                        
                            localStorage.setItem(property,data[property]);
                        }
                    }
                    alert(response.message);
                    var callbackURL = location.hash.substr(10);
                    if( callbackURL ){
                        Window.location.href = callbackURL;
                    }else{
                        window.location.href = "../index.html";
                    }       
                }       
            }
        });
    }
})