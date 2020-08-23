$.ajax({
  url: "../data/list.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  // async : false,
  success : function(json){
    var html = "";
    $.each(json,function(index,item){
      html += `<div class="shop-item">
                <a href="${item.a}">
                  <div class="img">
                      <img data-original="${item.img}" alt="">
                  </div>
                  <div class="info">`
      if(item.promotion){
        html += `<div class="promotion">${item.promotion}</div>`
      }else {
        html += `<div class="promotion"> &nbsp;</div>`
      }
      html += `<div class="name">${item.name}</div>
              <div class="desc">${item.desc}</div>
              <div class="price">${item.price}</div>
          </div></a>
        </div>`
    })
    $(".list").append(html);
  }
});

// 懒加载
setTimeout(function(){
  $("img").lazyload({effect: "fadeIn"});
},300)


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