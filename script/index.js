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

// 侧边栏菜单
$.ajax({
  url : "../data/slider-item.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    let html = ''
    $.each(json,function(index,item){
      if(item.menu) {
        html += `<div class="slider-item menu-item">
              <dl class="clear"><dt>
              <a href="">${item.title}</a><span></span>`
      }else {
        html += `<div class="slider-item">
        <dl class="clear"><dt>
        <a href="">${item.title}</a>`
      }
      html += `</dt>`
      if(item.content) {
        $.each(item.content,(i, it) => {
          html += `<dd><a href="">${it}</a></dd>`
        })
      }
      html += `</dl>`

      if(item.menu && index==3) {
        html += `<div class="right-desc">`
        $.each(item.menu, (mi, mit) => {
          html += `
                <div class="desc-list">
                <h3>${mit.tit}</h3>
                <div class="desc-items clear">
          `
          $.each(mit.con, (ci, cit) => {
            if(isObject(cit)){
              html += `
              <a href=""><img src="${cit.src}" alt=""/><p>${cit.p}</p></a>
            `
            }else {
              html +=`<a href="" class="cities">${cit}</a>`
            }
           
          })

          html +=`</div>
          </div>`
        }) 
        html+='</div>'
      }
      if(item.menu && (index==2 || index == 4)){
        html += `<div class="right-desc different ">`
        $.each(item.menu, (mi, mit) => {
          html += `
                <div class="desc-list">
                <h3>${mit.tit}</h3>
                <div class="desc-items clear">
          `
          $.each(mit.con, (ci, cit) => {
            html += `
              <a href=""><img src="${cit.src}" alt=""/><p>${cit.p}</p></a>
            `
          })

          html +=`</div>
          </div>`
        }) 
        html+='</div>'
      }

      html += `</div>`
    })
      $(".nav-slider-con").append(html);
  }
});

$(".nav-slider-con").on("mouseenter",".menu-item",function(){
  var index = $(".menu-item").index($(this));
  $(".right-desc").eq(index).removeClass("show");
  $(".right-desc").eq(index).addClass("show");
  $(this).css("background","#fff");
  $(this).find("dl dt a").addClass("dt_color");
  $(this).find("dl a").addClass("a_color");
})
$(".nav-slider-con").on("mouseleave",".menu-item",function(){
  $(".right-desc").removeClass("show");
  $(this).css("background","");
  $(this).find("dl dt a").removeClass("dt_color");
  $(this).find("dl a").removeClass("a_color");
})



// banner
var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop : true,
  autoplay : {
      delay : 3000
  },
  disableOnInteraction : true,
  effect : 'fade',
  pagination :{
      el: '.swiper-pagination',
      clickable :true,
      bulletActiveClass: 'my-bullet-active',
  }
});
//鼠标滑过pagination控制swiper切换
for(var i=0;i<swiper.pagination.bullets.length;i++){
  swiper.pagination.bullets[i].onmouseover=function(){
    this.click();
  };
} 
$(".banner").mouseenter(function(){
  swiper.autoplay.stop();
});
$(".banner").mouseleave(function(){
  swiper.autoplay.start();
});

//festival渲染
$.ajax({
  url : "../data/festival.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var newli = "";
    $.each(json,function(index,item){
      newli += ` <li>
                <a href="">
                  <img data-original="${item.src}" alt="">
                  <h4>${item.title}</h4>
                  <p class="desc">${item.desc}</p>
                  <p class="price">${item.price}</p>
                </a>
              </li>`;
    });
    $(".festival-main").append(newli);
  }
});


//楼层渲染
$.ajax({
  url : "../data/floor.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    // var hd = "";
    var bd = "";
    $.each(json,function(index,item){
      bd = `<div class="flbox"><div class="fl w"><div class="hd clear">
            <h3>
              <a href="">${item.title[0].tit}</a>
              <span>${item.title[0].detail}</span>
            </h3>
            <a href="" class="more">${item.title[0].more}</a>
          </div>`
      $.each(item.content,function(i,obj){
        if(i==0){
          bd += `<div class="bd clear"><div class="bd-l">
                  <a href="" class="bd-l-t"><img data-original="${obj.src}" alt=""></a>
                  <div class="bd-l-b">
                    <a href="">${obj.txt}</a>
                  </div>
              </div><ul class="bd-r clear">`
        }else {
          bd += `<li>
                <a href="">
                  <div class="pro-img">
                    <img data-original="${obj.img}" alt="">
                  </div>
                  <div class="pro-b">
                    <h4>${obj.h4}</h4>
                    <span>￥<i class="price">${obj.price}</i></span>
                    <p>${obj.p}</p>
                  </div>
                </a>
              </li>`
        }
      });
      bd +=`</ul></div></div></div>`;
      $(".cake").before(bd);
    });
  }
});

$(".floor").on("mouseenter",".bd-r li a",function(){
  $(this).children().css("color","#FF734C");
  $(this).find("p").css("color","#FF734C");
});
$(".floor").on("mouseleave",".bd-r li a",function(){
  $(this).children().css("color","#232628");
  $(this).find("p").css("color","#71797f");
});

//蛋糕 城市
$.ajax({
  url: "../data/city.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var a = "";
    $.each(json,function(index,item){
      a += `<a href="">${item}</a>`
    })
    $(".city-r").append(a);
  }
});

$.ajax({
  url: "../data/cake.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var li = "";
    $.each(json,function(index,item){
      li += `<li>
              <a href="">
                <img data-original="${item.src}" alt="">
                <p>${item.tit}</p>
              </a>
            </li>`
    })
    $(".cake-kind").append(li);
  }
});

$.ajax({
  url: "../data/cake-pro.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var li = "";
    $.each(json,function(index,item){
      li += `<li>
              <a href="">
                <div class="pro-img">
                  <img data-original="${item.img}" alt="">
                </div>
                <div class="pro-b">
                  <h4>${item.h4}</h4>
                  <span>￥<i class="price">${item.price}</i></span>
                  <p>${item.p}</p>
                </div>
              </a>
            </li>`
    })
    $(".cake-pro").append(li);
  }
});

//礼物
$.ajax({
  url: "../data/gift-h.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var gift = `<div class="gift-t clear">`;
    $.each(json,function(index,item){
      if(index==0){
        $.each(item.title,function(i,obj){
          gift += `<a href="">${obj}</a>`;
        })
      }
      gift += `</div><ul class="gift-b clear">`;
      if(index>=1){
        gift += `<li><a href=""><img data-original="${item.src}" alt=""><p>${item.tit}</p></a></li>`
      }
    })
    gift += `</ul>`
    $(".gift-h").append(gift);
  }
})

$.ajax({
  url: "../data/gift-pro.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var li = "";
    $.each(json,function(index,item){
      li += `<li>
              <a href="">
                <div class="pro-img">
                  <img data-original="${item.img}" alt="">
                </div>
                <div class="pro-b">
                  <h4>${item.h4}</h4>
                  <span>￥<i class="price">${item.price}</i></span>
                  <p>${item.p}</p>
                </div>
              </a>
            </li>`
    })
    $(".gift-pro").append(li);
  }
});

//晒单
$.ajax({
  url: "../data/eva-pro.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var li = "";
    $.each(json,function(index,item){
      li += `<li>
              <a href="" class="clear">
                <div class="evaluate-l">
                  <div class="e-user">
                    <img src="${item.img}" alt="">
                    <span>${item.user}</span>
                  </div>
                  <p class="eva">${item.eva}</p>
                  <div class="msg">
                    <p>${item.p1}</p>
                    <p>${item.p2}</p>
                  </div>
                </div>
                <div class="evaluate-r">
                  <img src="${item.src}" alt="">
                </div>
              </a>
            </li>`
    })
    $(".evaluate-pro").append(li);
  }
});

//热门资讯
$.ajax({
  url: "../data/news-b.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var li = "";
    $.each(json,function(index,item){
      li += `<li>
              <a href="">${item}</a>
            </li>`
    })
    $(".news-b").append(li);
  }
});


//help 
$.ajax({
  url: "../data/help.json",
  type : "get",
  data : "",
  dataType : "json",
  cache : false,
  success : function(json){
    var dl = "";
    $.each(json,function(index,item){
      dl += `<dl><dt>${item.title}</dt>`
      $.each(item.con,function(i,obj){
        dl += ` <dd><a href="">${obj}</a></dd>`
      })
      dl += `</dl>`
    })
    $(".help-r").before(dl);
  }
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


//预加载
setTimeout(function(){
  $("img").lazyload({effect: "fadeIn"});
},1000)