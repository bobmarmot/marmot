
function serializeObj(form) {
  var arr = form.serializeArray();
  var obj = {};

  arr.forEach((item) => {
    obj[item.name] = item.value;
  })

  return obj;
}
$('#cateGoryForm').on('submit', function (e) {
  e.preventDefault();

  var obj = serializeObj($(this));


  $.ajax({
    url: '/categories',
    type: 'POST',
    data: obj,
    success: function (data) {

      loadCategory()
    }
  })
})

// 拿分类的数据 

function loadCategory() {
  $.ajax({
    url: '/categories',
    type: 'GET',
    success: function (data) {
      var html = template('tpl-categroy', { categroies: data })
      $('#table-data').html(html)
    }
  })
}

loadCategory()
