function serializeObj(form) {
  var arr = form.serializeArray();
  var obj = {};

  arr.forEach((item) => {
    obj[item.name] = item.value;
  })

  return obj;
}

// 绑定 submit 事件
$('#userForm').on('submit', function () {

  var obj = serializeObj($(this));

  // 根据obj 中是否有id 来判断是 是更新用户还是新增用户
  if (obj.id) {
    $.ajax({
      url: '/users/' + obj.id,
      type: 'PUT',
      data: obj,
      success: function (data) {
        // 部分刷新 
        loadUser()
      },
      error: function (err) {
        alert('添加用户失败');
      }
    })

  } else {
    // 新增用户
    $.ajax({
      url: '/users',
      type: 'POST',
      data: obj,
      success: function (data) {
        // 部分刷新 
        loadUser()
      },
      error: function (err) {
        alert('添加用户失败');
      }
    })
  }



  return false;
})

// 使用了事件委托
$('#data-container').on('click', '.edit', function (e) {
  var id = $(this).data('id');
  // var id = $(this).attr('data-id')

  // 请求用户数据 
  $.ajax({
    url: '/users/' + id,
    type: 'GET',
    success: function (data) {
      console.log(data)
      // 开始渲染模板

      var html = template('tpl-modify', data);

      $('#userForm').html(html);
    }
  })
})

// 处理删除用户的功能
$('#data-container').on('click', '.del', function (e) {
  var id = $(this).data('id');
  if (confirm('你确认要删除这个用吗？')) {
    $.ajax({
      url: '/users/' + id,
      type: 'DELETE',
      success: function () {
        // location.reload()
        loadUser();
      }
    })
  }

})

// 改成事件委托
$('#userForm').on('change', '#avatar', function () {
  var formData = new FormData();

  formData.append('avatar', this.files[0])

  // 开始发送请求
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (resp) {
      console.log(resp);

      var url = resp[0].avatar;

      // 1. 让用户看到这张图 
      $('#preview').attr('src', url);

      // 2. 设置隐藏域
      $('#hiddenInput').val(url)

    }
  })
})

// 获取用户列表 
function loadUser() {
  $.ajax({
    url: '/users',
    type: 'GET',
    success: function (data) {
      console.log(data);

      // 渲染模板 
      var html = template('tpl-users', { users: data })

      $('#data-container').html(html);
    }
  })
}

loadUser()

// 全选相关的代码
$('#selectAll').on('change', function () {
  var isChecked = this.checked;

  var deleteMany = $('#deleteMany');

  if (isChecked) {
    deleteMany.show();
  } else {
    deleteMany.hide();
  }

  $('#data-container').find('input:checkbox').prop('checked', isChecked)
})

$('#data-container').on('change', 'input:checkbox', function () {

  var allCheckbox = $('#data-container input:checkbox');

  var hasChecked = allCheckbox.filter(':checked').length;

  var deleteMany = $('#deleteMany');

  if (hasChecked > 0) {
    deleteMany.show();
  } else {
    deleteMany.hide();
  }


  // 是否已经全部选中
  var checkAll = allCheckbox.length === hasChecked

  $('#selectAll').prop('checked', checkAll)
})

// 批量删除的事件
$('#deleteMany').on('click', function () {

  var hasChecked = $('#data-container input:checked');

  // 仅供参考
  var arr = hasChecked.toArray().map(x => $(x).data('id'));


  if (confirm('你真的要批量删除用户吗？')) {
    $.ajax({
      url: '/users/' + arr.join('-'),
      type: 'delete',
      success: function () {
        loadUser();
      }
    })
  }

})
