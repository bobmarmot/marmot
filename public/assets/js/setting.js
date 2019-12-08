// 需求一：保存网站设置
$('#settingForm').on('submit', function (e) {

  e.preventDefault()

  var obj = serializeObj($(this));

  // 对布尔值进行处理
  if (!obj.comment) {
    obj.comment = false;
  }

  if (!obj.review) {
    obj.review = false;
  }

  // 发送请求保存设置
  $.ajax({
    url: '/settings',
    type: 'post',
    data: obj,

    timeout: 5000, // 请求的超时时间

    success: function (data) {
      console.log(data);
    }
  })

})

// 需求二 ：图片上传
$('#logo').on('change', function (e) {

  var formdata = new FormData();

  formdata.append('image', this.files[0]);

  // 发送图片上传的请求

  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formdata,

    contentType: false,
    processData: false,

    success: function (data) {
      console.log(data);

      // 容错判断
      if (data && data.length > 0) {
        $('#site_logo').val(data[0].image);

        $('#logoimg').attr('src', data[0].image)
      }
    }
  })
})


// 需求三： 回显 用户设置

