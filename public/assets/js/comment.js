// 取评论数据
$.ajax({
  url: '/comments',
  type: 'get',
  success: function (data) {
    $('#data-container').html(template('tpl-comments', data))
  }
})