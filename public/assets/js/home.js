function initBanner() {
  var swiper = Swipe(document.querySelector('.swipe'), {
    auto: 3000,
    transitionEnd: function (index) {
      // index++;

      $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
    }
  });

  // 上/下一张
  $('.swipe .arrow').on('click', function () {
    var _this = $(this);

    if (_this.is('.prev')) {
      swiper.prev();
    } else if (_this.is('.next')) {
      swiper.next();
    }
  })
}

// 需求一 : 展示轮播图
$.ajax({
  url: '/slides',
  type: 'GET',
  success: function (data) {

    var html = template('tpl-banners', { data: data })

    $('#swiper').html(html)

    initBanner()
  }
})