// 时间格式化
template.defaults.imports.dateformat = function (d) {
  return d.slice(0, 10)
}

// 收集form 的数据 
function serializeObj(form) {
  var arr = form.serializeArray();
  var obj = {};

  arr.forEach((item) => {
    obj[item.name] = item.value;
  })

  return obj;
}

// 取url 中的的参数
function getUrlParam(name) {
  var query = location.search.slice(1).split('&')
  var value = -1;

  if (query && query.length > 0) {
    query.forEach(item => {
      var tmp = item.split('=');
      if (name === tmp[0]) {
        value = tmp[1];
      }
    })
  }
}