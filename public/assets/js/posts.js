// 查询文章的函数 

var queryObj = {};
function queryPost(obj, page) {

  queryObj = obj;
  obj.page = page || 1;
  $.ajax({
    url: '/posts',
    type: 'GET',
    data: obj,
    success: function (data) {
      console.log('data-->', data)

      var html = template('tpl-post', data);

      $('#post-container').html(html)

      var page = template('tpl-pagination', data)

      $('#pagination').html(page)
    }
  })
}

function changePage(page) {

  console.log(queryObj, page)
  queryPost(queryObj, page)
}



queryPost({}, 1);

// 绑定事件
$('#queryForm').on('submit', function (e) {
  e.preventDefault();
  var ob = serializeObj($(this));
  console.log(ob)
  queryPost(ob, 1)

})

$.ajax({
  url: '/categories',
  type: 'GET',
  success: function (data) {
    var html = template('tpl-category', { data: data })
    $('#category').html(html)
  }
})