//根据id请求不同的json
var id = location.href.split('?id=')[1];
if(id == "106159"){
    getDate("../data/desc106159.json");
} else if(id == "102158"){
  getDate("../data/desc102158.json");
}else {
  getDate("../data/desc102158.json");
}

$(".pro-wrap").on("mouseenter",".listimg li",function(){
  $(".showimg").find("img").prop("src",$(this).find("img").prop("src"));
  $(".listimg li").css("border-color","#E9ECF0");
  $(this).css("border-color","#FF734C");
})

$(".pro-wrap").on("click",".sel-item",function(){
  $(".sel-item").css("border-color","#E9ECF0");
  $(this).css("border-color","#FF734C");
  $(".sel-item i").removeClass("icon-show");
  $(this).find("i").addClass("icon-show");
  var $index = $(this).index();
  $(".pro-left").removeClass("show");
  $(".pro-left").eq($index).addClass("show");
})

//存数据
$(".pro-wrap").on("click",".gocart",function(){
  var flag = false;
  var userName = getLocalStorage('currentname');
  var shopId = window.location.search.split('=')[1]
  if(userName) {
    var goods = getLocalStorage('goods', true) || []
    var userIndex = null

    var userShopCar = goods.filter(function(item, index) {
      if(item && item.userName && (item.userName == userName)) {
        userIndex = index
        return item
      }
    })[0]

    var shopInfo = {}
    var shopList = []

    if(userShopCar) {

      shopList = userShopCar.shopList

      shopList.forEach(function(item,index) {
        if(item.id == shopId) {
          item.count += 1;
          flag = true;
        }
      })
      

      if(!flag ) {
        shopInfo = {
          id: shopId,
          count: 1
        }
        shopList.push(shopInfo)
      }
    }else {
      shopInfo = {
        id: shopId,
        count: 1
      }
      shopList.push(shopInfo)

      userShopCar = {
        userName,
        shopList
      }

      goods.push(userShopCar)
    }

    setLocalStorage('goods',goods);
    window.location.href = '../pages/car.html';
  }else {
    alert('请先登录');
    window.location.href = '/pages/login.html';
  }
})


function getDate(url){
  $.ajax({
    url: url,
    type : "get",
    data : "",
    dataType : "json",
    cache : false,
    success : function(json){
      var html = `<div class="pro-title">
                    <h4>${json.title}</h4>
                    <h5>${json.desc}</h5>
                    <p>${json.addr}</p>
                </div>
                <div class="pro-price">
                  <div class="price-top">
                        <span>售价</span>
                        <p>￥<i>${json.price}</i></p>
                        <b>市场价<s>${json.oldPrice}</s></b>
                        <strong>已售 <i>${json.sale}</i> 件</strong>
                  </div>
                  <div class="price-b">
                      <span>APP/微信专享价 ￥<i>${json.price}</i></span>
                      <div class="gobuy">
                            <div class="gobuy-t">
                                <a>去APP购买<em></em></a>
                            </div> 
                      </div>
                      <div class="gobuy">
                            <div class="gobuy-t">
                                <a>去微信购买<em></em></a>
                            </div> 
                      </div>
                  </div>
                </div>
                <div class="details">
                    <div class="det-item clear">
                        <span>材料</span>
                        <p>${json.materials}</p>
                    </div>
                </div>
                <div class="logistics">
                    <div class="desc clear">
                        <span>配送说明</span>
                        <p>${json.explain}</p>
                    </div>
                    <div class="desc sel clear">
                        <span>选择</span>
                        <p>
                           `;
      $.each(json.kind,function(index,item){
        html+=` <a href="javascript:;" class="sel-item">
                  <img src="${item.imgsrc[0]}" alt="">
                  <em>${item.name}</em>
              `
        if(index === 0){
          html += ` <i class="icon-show"></i>`
        }else{
          html += `<i></i>`
        }
        html += `</a>`
      })
      html += ` </p>
              </div></div>
              <div class="pro-btn">
                  <button class="btn-common gocart" code=${json.code}>加入购物车</button>
                  <button href="" class="btn-common buying">立即购买</button>
                  <span code=${json.code}><i></i>收藏商品</span>
              </div>`;

      $(".pro-right").append(html);

      var pro = "";
      $.each(json.kind,function(i,obj){
        if(i === 0){
          pro += `<div class="pro-left show">`
        }else {
          pro += `<div class="pro-left">`
        }
        pro += ` <div class="showimg">
                    <img src="${obj.imgsrc[0]}" alt="">
                </div>
                <ul class="listimg clear">`
        $.each(obj.imgsrc,function(index,item){
          pro += `<li><img src="${item}" alt=""></li>`
        })
        pro += `</ul>
        </div>`
      })
      $(".pro-right").before(pro);
    }
  });
}


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


//fix-nav
$(".fix-nav li").mouseenter(function(){
  $(this).find(".move").css("display","block");
  $(this).find(".move").animate({left:-120},300);
  $(this).find(".ewm-con").css("display","block");
  $(this).css("background","#ff6600");
})
$(".fix-nav li").mouseleave(function(){
  $(".move").css("left",-150);
  $(this).find(".move").css("display","none");
  $(this).find(".ewm-con").css("display","none");
  $(this).css("background","");
})

//回到顶部
$(".back").click(function(){
  $("body,html").animate({scrollTop:0});
})


//登录成功信息的显示
function msgshow() {
  if(!getLocalStorage('currentname')){
    $(".login").removeClass('hide');
    $(".usermsg").addClass('hide');
    $(".register").removeClass('hide');
    $(".exit").addClass('hide');
  }else {
    $(".usermsg").removeClass('hide').text("你好，" + getLocalStorage('currentname'));
    $(".login").addClass('hide');
    $(".register").addClass('hide');
    $(".exit").removeClass('hide');
  }
}
msgshow();
//退出登录 
$(".exit").click(function(){
  localStorage.removeItem('currentname');
  msgshow();
})
