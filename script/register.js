var yzmStr = ''

//header
$(".header .menu").mouseenter(function(){
    var index = $(".menu").index($(this));
    $(this).css("background","#fff").siblings(".menu").css("background","#F3F5F7");
    $(".a-box").removeClass("show");
    $(".a-box").eq(index).addClass("show");
    console.log($(".a-box").eq(index)[0]);
});
$(".header .menu").mouseleave(function(){
  $(this).css("background","#F3F5F7");
  $(".a-box").removeClass("show");
});


//切换注册方式
var telLoginBtn = $('#tellogin')
var emailLoginBtn = $('#emaillogin')
telLoginBtn.click(function() {
    $(".way1").attr('class', 'way1')
    $(".way2").attr('class', 'way2 hidden')
    $("#tellogin").attr('class', 'tel active')
    $("#emaillogin").attr('class', 'account')
})
emailLoginBtn.click(function() {
    $(".way1").attr('class', 'way1 hidden')
    $(".way2").attr('class', 'way2')
    $("#tellogin").attr('class', 'tel')
    $("#emaillogin").attr('class', 'account active')
})

//手机账号注册验证
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

    var yzm = $('.yzm').val()

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

    if(yzm == yzmStr) {
        var userName = $('.tel-num').val()
        var password = $('.pwd-str').val()
        register(userName, password)

    }else {
        alert("注册失败，验证码不正确");
    }
})

 //获取随机验证码
 $('.yzm-btn').click(function() {
    yzmStr = parseInt(Math.random()*(899999)+100000)
    alert(yzmStr)
})

//注册成功存到localstorage
function register(userName, password) {
    var val = verify(userName)
    if(val) {
        alert('用户名已被注册，请更换');
        return false
    }else {
        var userInfos = getLocalStorage('userInfos',true) || []
        userInfos.push({
            userName,
            password
        })
        setLocalStorage('userInfos',userInfos);
        alert("注册成功，1s秒后跳转到登录页面");
        setTimeout(function(){
            location.href="../pages/login.html";
        })
    }
}
//判断用户名是否重名
function verify(userName) {
    var userInfos = getLocalStorage('userInfos',true) || []
    return userInfos.some(function(item){
        return item.userName == userName
    })
}


