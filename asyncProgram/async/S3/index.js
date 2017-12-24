var req = [];
var running = false;
// var timeId = null;

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
    running = true;
    $('.a').click();
  }
}

function reset() {
  if (req.length) {
    for (var r of req)
      r.abort();
    req = [];
  }
  $('.info').removeClass('enable').addClass('disable').children().text('');
  $('li').removeClass('disable').addClass('enable').children('.num').text('').hide();
  running = false;
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
  if (!running)
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
  req.push($.get('/', function (data, status) {
    if (status === 'success') {
      ele.children('.num').text(data);
      enable(ele.siblings());
      disable(ele);
      callback();
    }
  }));
  if (running && ele.next().length)
    ele.next().click();
}

function allClick() {
  if ($('li.enable').length)
    return;
  $('.info').removeClass('disable').addClass('enable');
  if (running)
    $('.info').click();
}

function compute() {
  var info = $('.info');
  if (info.hasClass('disable'))
    return;
  sum = 0;
  $('.num').each(function () {
    sum += parseInt($(this).text());
  });
  info.removeClass('enable').addClass('disable').children().text(sum);
  $('li.disable').removeClass('disable').addClass('enable');
}