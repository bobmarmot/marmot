// 请求热门数据 

var htmlStr = `{{each data}}<li>
  <a href="javascript:;">
    <img src="{{$value.thumbnail}}" alt="">
    <span>{{$value.title}}</span>
  </a>
</li>{{/each}}`;


// 请求数据 
$.ajax({
  url: '/posts/recommend',
  type: 'GET',
  success: function (data) {

    var html = template.render(htmlStr, { data: data });

    $('#recommentBox').html(html)

  }
})

