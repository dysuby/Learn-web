var req = null;
var running = false;
// var timeId = null;
var order = ['A', 'B', 'C', 'D', 'E'];
var index = 0;

$(document).ready(function () {
  $('.num').hide().click(function () {
    event.stopPropagation();
  });
  $('.button').click(click);
  $('#button').mouseleave(reset);
  $('.info').click(compute);
  $('.apb').click(run);
  $.ajaxSetup({
    cache: false
  });
});

function run() {
  if (running == false && $('li.disable').length == 0) {
    order.sort(function () {
      return Math.random() >= 0.5;
    });
    $('#order').text(order.toString());
    $('li.' + order[0].toLowerCase()).click();
    $('#info').css('margin-top', '10px');
    running = true;
  }
}

function reset() {
  if (req) {
    req.abort();
    req = null;
  }
  $('.info').removeClass('enable').addClass('disable').children().text('');
  $('li').removeClass('disable').addClass('enable').children('.num').text('').hide();
  $('#info').css('margin-top', '40px');
  running = false;
  order.sort();
  index = 0;
  // if (timeId) {
  //   clearTimeout(timeId);
  //   timeId = null;
  // }
}

function click() {
  var current = $(this);
  if (current.hasClass('disable') || current.children('.num').text() !== '')
    return;
  current.children('.num').text('...').show();
  disable(current.siblings());
  getNum(current, allClick);
}

function disable(target) {
  target.each(function () {
    $(this).removeClass('enable').addClass('disable');
  });
}

function enable(target) {
  target.each(function () {
    if ($(this).children('.num').text() == '')
      $(this).removeClass('disable').addClass('enable');
  })
}

function getNum(ele, callback) {
  req = $.get('/', function (data, status) {
    if (status === 'success') {
      ele.children('.num').text(data);
      enable(ele.siblings());
      disable(ele);
      callback();
    }
  });
}

function allClick() {
  if ($('li.enable').length) {
    if (running && index < 4)
      // timeId = setTimeout(function () { $('li.' + order[++index].toLowerCase()).click(); }, 800);
      $('li.' + order[++index].toLowerCase()).click();
    return;
  }
  $('.info').removeClass('disable').addClass('enable');
  if (running)
    // timeId = setTimeout(compute, 800);
    compute();
}

function compute() {
  var info = $('.info');
  if (info.hasClass('disable'))
    return;
  sum = 0;
  $('.num').each(function () {
    sum += parseInt($(this).text());
  });
  info.removeClass('enable').addClass('disable').children('#info').text(sum);
  $('li.disable').removeClass('disable').addClass('enable');
}