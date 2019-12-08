$('#image').on('change', function (e) {

  //1. 用户选择的文件
  var file = this.files[0];

  var formdata = new FormData();

  formdata.append('image', file)

  // 2. 发送请求上传文件
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formdata,

    contentType: false,
    processData: false,

    success: function (data) {

      if (data && data.length > 0) {
        $('#imageField').val(data[0].image)
      } else {
        alert('文件上传出错')
      }

    }
  })

})

// 功能二：新增轮播图
$('#addForm').on('submit', function (e) {
  e.preventDefault();

  var obj = serializeObj($(this));


  $.ajax({
    url: '/slides',
    type: 'post',
    data: obj,
    success: function () {
      location.reload()
    }
  })
})

// 功能三：展示轮播图列表
$.ajax({
  url: '/slides',
  type: 'GET',
  success: function (data) {
    console.log(data);

    $('#slide-container').html(template('tpl-slides', { slides: data }))
  }
})