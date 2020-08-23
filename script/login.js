//header
$(".header .menu").mouseenter(function(){
    var index = $(".menu").index($(this));
    $(this).css("background","#fff").siblings(".menu").css("background","#F3F5F7");
    $(".a-box").removeClass("show");
    $(".a-box").eq(index).addClass("show");
});
$(".header .menu").mouseleave(function(){
  $(this).css("background","#F3F5F7");
  $(".a-box").removeClass("show");
});

//切换登录方式
$('#tellogin').click(function(e) {
    $(".way1").attr('class', 'way1')
    $(".way2").attr('class', 'way2 hidden')
    $("#tellogin").attr('class', 'tel active')
    $("#emaillogin").attr('class', 'account')
})
$('#emaillogin').click(function(e) {
    $(".way1").attr('class', 'way1 hidden')
    $(".way2").attr('class', 'way2')
    $("#tellogin").attr('class', 'tel')
    $("#emaillogin").attr('class', 'account active')
})

$("#code-toggle").click(function() {
    $(".tel-login-way").attr('class', 'tel-login-way hidden')
    $(".code-login-way").attr('class', 'code-login-way')
})
$("#acc-toggle").click(function() {
    $(".tel-login-way").attr('class', 'tel-login-way')
    $(".code-login-way").attr('class', 'code-login-way hidden')
})


//账号密码登录
var regbtn = $(".reg-bt");
regbtn.click(function(){
    //手机号码验证
    if(!$(".tel-num").val()){
        $(".tel-tip").show();
        $(".tel-tip").text("请输入手机号");
        return false;
    }
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if(!reg.test($(".tel-num").val())){
        $(".tel-tip").show();
        $(".tel-tip").html("手机号码格式错误");
        return false
    }
    $(".tel-tip").hide();

    //密码验证
    if(!$(".pwd-str").val()){
        $(".pwd-tip").show();
        $(".pwd-tip").text("请输入密码");
        return false;
    }
    if($(".pwd-str").val().length < 6){
        $(".pwd-tip").show();
        $(".pwd-tip").html("密码长度不少于6位");
        return false
    }
    $(".pwd-tip").hide();

    var userName = $('.tel-num').val()
    var password = $('.pwd-str').val()
    login(userName, password)
    
})


//注册成功存到localstorage
function login(userName, password) {
    var val = verify(userName,password);
    if(!val) {
        alert("用户名或密码不正确");
        return false;
    }else {
        setLocalStorage('currentname',$('.tel-num').val())
        setTimeout(function(){
            location.href = './index.html'
        },300)
    }
}
//判断用户名和密码是否正确
function verify(userName,password) {
    var userInfos = getLocalStorage('userInfos',true) || []
    return userInfos.some(function(item){
        return item.userName == userName && item.password == password
    })
}



