
var userName = getLocalStorage('currentname');
var goods = getLocalStorage('goods', true) || []

var userShopCar = goods.filter(function(item, index) {
    if(item && item.userName && (item.userName == userName)) {
      userIndex = index
      return item
    }
})[0]


if(userShopCar) {
    var shopList = userShopCar.shopList;
    shopList.forEach(function(item,index){
        if(item.id == 102158){
            getData("../data/desc102158.json");
            $(".box .a102158").val(item.count);
        }
        if(item.id == 106159){
            getData("../data/desc106159.json");
            $(".box .a106159").val(item.count);
        }
        console.log($(".box input"))
    })
    
}else {
    $(".empty").removeClass('hiden');
    $(".shop-box").addClass('hiden');
}


//请求数据
function getData(url){
    $.ajax({
        url: url,
        type : "get",
        data : "",
        dataType : "json",
        cache : false,
        async : false,
        success : function(json){
            html = ` <div class="item clear">
            <div class="selector">
                <div class="select-btn"></div>
            </div>
            <div class="name clear">
                <div class="shop-img">
                    <img src="${json.kind[0].imgsrc[0]}" alt="">
                </div>
                <a href="" class="shop-desc">
                    <p class="desc">
                        ${json.title} ${json.materials}
                    </p>
                    <p class="addr">顺丰配送至深圳</p>
                </a>
            </div>
            <div class="price">${json.price}</div>
            <div class="pr">${json.oldPrice}</div>
            <div class="count">
                <div class="box">
                    <div class="red">-</div>
                    <input type="text" name="" id="" value="" class="${json.code}">
                    <div class="add">+</div>
                </div>
            </div>
            <div class="action">
                <a class="delete" href="javascript:;">删除</a>
                <a class="shouc" href="javascript:;">
                    移到我的收藏
                </a>
            </div>
        </div>`
        $(".shopmenu").append(html);
        }
    });
}



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