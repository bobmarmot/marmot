// 取最新评论的数据 
$.ajax({
  url: '/comments/lasted',
  type: 'GET',
  success: function (resp) {

    var htmlStr = `
    {{each data}}
    <li>
    <a href="javascript:;">
      <div class="avatar">
        <img src="{{$value.author.avatar}}" alt="">
      </div>
      <div class="txt">
        <p>
          <span>{{$value.author.nickName}}</span>{{ dateformat($value.createAt)}}说:
        </p>
        <p>{{$value.content}}</p>
      </div>
    </a>
    </li>
    {{/each}}
    `;

    var html = template.render(htmlStr, { data: resp });

    $('#commnetBox').html(html)

  }
})


// 显示 网站 的分类 
$.ajax({
  url: '/categories',
  type: 'GET',
  success: function (data) {
    console.log(data);

    // 准备模板 

    var htmlStr = `
      {{each data}}
      <li><a href="/list.html?categroy={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
      {{/each}}
      `;

    $('.navBox').html(template.render(htmlStr, { data }))
  }
})