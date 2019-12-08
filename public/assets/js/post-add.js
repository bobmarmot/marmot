// 查询 文章的分类
$.ajax({
  url: '/categories',
  type: 'get',
  success: function (data) {
    console.log(data);

    var html = template('tpl-options', { options: data })

    $('#category').html(html)
  }
})

// 处理上传图片
$('#feature').on('change', function () {
  // 1. 准备一个formdata
  var formdata = new FormData();

  formdata.append('cover', this.files[0])

  // 开始上传图片
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formdata,

    processData: false,
    contentType: false,

    success: function (data) {

      if (data && data.length > 0) {
        var url = data[0].cover;
        $('#thumbnailField').val(url)
      }
    }
  })
})

// 把文章保存到数据库
$('#addForm').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();


  // 发送请求
  $.ajax({
    url: '/posts',
    type: 'POST',
    data: data,
    success: function (resp) {
      console.log(resp);

      location.href = '/admin/posts.html'
    }
  })
})


// 取文章的详情
$.ajax({
  url: '/posts/' + getUrlParam('id'),
  type: 'GET',
  success: function (resp) {
    console.log(resp)
  }
})