// 退出登录的需求
$('#logout').on('click', function (e) {
  // 做一个二认确认 
  var isConfirm = confirm('你确认要退出 吗？');

  if (isConfirm) {
    $.ajax({
      url: '/logout',
      type: 'POST',
      success: function () {
        location.href = '/admin/login.html'
      },
      error: function () {
        alert('退出失败')
      }
    })
  }
})

// 显示登录用户的信息
$.ajax({
  url: '/users/' + userId,
  type: 'GET',
  success: function (data) {
    console.log(data)

    var html = template('tpl-userinfo', data);
    $('#userinfo').html(html)
  }
})