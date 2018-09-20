$(document).ready(function () {
  $('.apb').click(run);
  $('.a').click(aHandler);
  $('.b').click(bHandler);
  $('.c').click(cHandler);
  $('.d').click(dHandler);
  $('.e').click(eHandler);
  $('.info').click(bubbleHandler);
  $('#button').mouseleave(reset);
  $('.num').hide().click(function () {
    event.stopPropagation();
  });
  $.ajaxSetup({
    cache: false
  });
});

function random() {
  return Math.random() >= 0.5;
}

function reset() { //离开button重置
  $('.info').removeClass('enable').addClass('disable').children().text('');
  $('#info').css('margin-top', '40px');
  $('li').removeClass('disable').addClass('enable').children('.num').text('').hide();
  $('#msg').text('');
}

function run(error) { //运行机器人
  if ($('li.disable').length || $('#info').text() != '') // 手动运行时或已经结束时
    return;
  var order = ['A', 'B', 'C', 'D', 'E'];
  var handlers = {
    'A': aHandler,
    'B': bHandler,
    'C': cHandler,
    'D': dHandler,
    'E': eHandler,
  };
  order.sort(random);
  $('#order').text(order.toString());
  $('#info').css('margin-top', '10px');
  var callbacks = [];
  callbacks[5] = function (arg) {
    if (typeof arg === 'number')
      bubbleHandler(arg, callbacks[5]);
    else
      $('#msg').append(arg.msg);
  };
  for (var index = 1; index < 5; ++index) {
    (function (i) {
      callbacks[i] = function (currentSum, next, error) {
        if (!error) {
          handlers[order[i]](currentSum, callbacks[i + 1], callbacks[i]);
        } else {
          $('#msg').append(error.msg)
          next(error.currentSum);
        }
      };
    })(index);
  }
  runFirstHandler(handlers[order[0]], callbacks[1]);
}

function runFirstHandler(handler, next, error) { //启动第一个handler
  if (!error) {
    handler(0, next, runFirstHandler);
  } else {
    $('#msg').append(error.msg);
    next(error.currentSum);
  }
}

function disable(target) { //灭活
  target.each(function () {
    $(this).removeClass('enable').addClass('disable');
  });
}

function enable(target) { //激活
  target.each(function () {
    if ($(this).children('.num').text() == '')
      $(this).removeClass('disable').addClass('enable');
  })
}

function aHandler(currentSum, next, prev) {
  var current = $('.a');
  if (current.children('.num').text() != '' || current.hasClass('disable')) // 正在运行或者已经运行过
    return;
  disable(current.siblings());
  current.children('.num').text('...').show();
  $.get('/', function (data, status) {
    if (status === 'success' && $('li.disable').length && current.hasClass('enable')) { //被重置了
      current.children('.num').text(data);
      enable(current.siblings());
      disable(current);
      if (!$('li.enable').length)
        $('.info').removeClass('disable').addClass('enable');
      if (typeof prev === 'function') { //机器人
        if (random()) { //异常（用try catch反而麻烦了。。这样应该可以吧
          $('#msg').append('A：这是个天大的秘密<br/>');
          next(currentSum + parseInt(data));
        } else {
          prev(null, next, {
            msg: "A：这不是个天大的秘密<br/>",
            currentSum: currentSum + parseInt(data)
          });
        }
      }
    }
  });
}

function bHandler(currentSum, next, prev) {
  var current = $('.b');
  if (current.children('.num').text() != '' || current.hasClass('disable'))
    return;
  disable(current.siblings());
  current.children('.num').text('...').show();
  $.get('/', function (data, status) {
    if (status === 'success' && $('li.disable').length && current.hasClass('enable')) {
      current.children('.num').text(data);
      enable(current.siblings());
      disable(current);
      if (!$('li.enable').length)
        $('.info').removeClass('disable').addClass('enable');
      if (typeof prev === 'function') {
        if (random()) {
          $('#msg').append('B：我不知道<br/>');
          next(currentSum + parseInt(data));
        } else {
          prev(null, next, {
            msg: "B：我知道<br/>",
            currentSum: currentSum + parseInt(data)
          });
        }
      }
    }
  });
}

function cHandler(currentSum, next, prev) {
  var current = $('.c');
  if (current.children('.num').text() != '' || current.hasClass('disable'))
    return;
  disable(current.siblings());
  current.children('.num').text('...').show();
  $.get('/', function (data, status) {
    if (status === 'success' && $('li.disable').length && current.hasClass('enable')) {
      current.children('.num').text(data);
      enable(current.siblings());
      disable(current);
      if (!$('li.enable').length)
        $('.info').removeClass('disable').addClass('enable');
      if (typeof prev === 'function') {
        if (random()) {
          $('#msg').append('C：你不知道<br/>');
          next(currentSum + parseInt(data));
        } else {
          prev(null, next, {
            msg: "C：你知道<br/>",
            currentSum: currentSum + parseInt(data)
          });
        }
      }
    }
  });
}

function dHandler(currentSum, next, prev) {
  var current = $('.d');
  if (current.children('.num').text() != '' || current.hasClass('disable'))
    return;
  disable(current.siblings());
  current.children('.num').text('...').show();
  $.get('/', function (data, status) {
    if (status === 'success' && $('li.disable').length && current.hasClass('enable')) {
      current.children('.num').text(data);
      enable(current.siblings());
      disable(current);
      if (!$('li.enable').length)
        $('.info').removeClass('disable').addClass('enable');
      if (typeof prev === 'function') {
        if (random()) {
          $('#msg').append('D：他不知道<br/>');
          next(currentSum + parseInt(data));
        } else {
          prev(null, next, {
            msg: "D：他知道<br/>",
            currentSum: currentSum + parseInt(data)
          });
        }
      }
    }
  });
}

function eHandler(currentSum, next, prev) {
  var current = $('.e');
  if (current.children('.num').text() != '' || current.hasClass('disable'))
    return;
  disable(current.siblings());
  current.children('.num').text('...').show();
  $.get('/', function (data, status) {
    if (status === 'success' && $('li.disable').length && current.hasClass('enable')) {
      current.children('.num').text(data);
      enable(current.siblings());
      disable(current);
      if (!$('li.enable').length)
        $('.info').removeClass('disable').addClass('enable');
      if (typeof prev === 'function') {
        if (random()) {
          $('#msg').append('E：才怪<br/>');
          next(currentSum + parseInt(data));
        } else {
          prev(null, next, {
            msg: "E：不怪<br/>",
            currentSum: currentSum + parseInt(data)
          });
        }
      }
    }
  });
}

function bubbleHandler(currentSum, prev) {
  if ($('.info').hasClass('disable')) //还没激活
    return;
  $('li.disable').removeClass('disable').addClass('enable');
  $('.info').removeClass('enable').addClass('disable');
  if (typeof currentSum !== 'number') { //手动
    var sum = 0;
    $('li.enable').children('.num').each(function () {
      sum += parseInt($(this).text());
    });
    $('#info').text(sum);
  } else { //机器人
    $('#info').text(currentSum);
    if (random())
      $('#msg').append('大气泡：楼主异步调用战斗力感人，目测不超过' + currentSum.toString());
    else
      prev({
        msg: '大气泡：楼主异步调用战斗力好强，目测超过' + currentSum.toString(),
        currentSum: currentSum
      });
  }
}