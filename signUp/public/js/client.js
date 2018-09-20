$(document).ready(function () {
  $('form').submit(check);
  $('input:reset').on('click', reset);
})

function reset() {
  $('input:text').attr('value', "").val("");
  $('.error').text("");
}

function checkName(str) {
  if (str.length < 6)
    return "长度过短";
  else if (str.length > 18)
    return "长度过长";
  else if (/^[0-9_]/.test(str))
    return "必须以字母开头";
  else if (/\W/.test(str))
    return "只能包含字母，数字，下划线";
}

function checkIdandPhone(str, length) {
  if (str.length != length)
    return "长度必须为" + length + "位";
  else if (/\D/.test(str))
    return "学号必须为数字";
  else if (/^0/.test(str))
    return "不能以0开头";
}

function checkEmail(str) {
  return "非法邮箱地址";
}

function check() {
  var nameReg = /^[a-zA-Z]\w{5,17}$/;
  var idReg = /^[1-9][0-9]{7}$/;
  var phoneReg = /^[1-9][0-9]{10}$/;
  var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  var flag = true;
  $('form').change(check);
  $('input:text').each(function () {
    if (!$(this).val()) {
      if (flag)
        $('.error').text('');
      $(this).next().text('* 不能为空');
      flag = false;
    }
  });
  if (flag == false)
    return false;
  if (!nameReg.test($('#name').val()))
    err($('#name'), checkName($('#name').val()));
  if (!idReg.test($('#id').val()))
    err($('#id'), checkIdandPhone($('#id').val(), 8));
  if (!phoneReg.test($('#phone').val()))
    err($('#phone'), checkIdandPhone($('#phone').val(), 11));
  if (!emailReg.test($('#email').val()))
    err($('#email'), checkEmail($('#email').val()));
  function err(ele, str) {
    if (flag && $('.error').length)
      $('.error').text("");
    ele.next().text('* ' + str);
    flag = false;
  }
  return flag;
}