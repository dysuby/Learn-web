(function () {
  var blank = 15, size = 4, isSorted = true;
  $(document).ready(function () {
    set(size);
    $('#again').click(again);
    $('.size').click(change);
    $('#reset').click(reset);
  });

  function set(size) {
    $('#puzzle').html("");
    for (var index = 0; index < size * size - 1; ++index) {
      $('#puzzle').append('<div class= "img' + size + ' p' + size + index + '" id="no' + size + index + '"></div>');
    }
    $('#puzzle div').click(hit);
    blank = size * size - 1;
    isSorted = true;
  }

  function hit() {
    if (isSorted)
      return;
    $('#msg').attr('class', 'hide');
    var target = parseInt($(event.target).attr('class').substring(7));
    if (target - blank != size && target - blank != -size
      && !(target % size != 0 && target - blank == 1) && !(blank % size != 0 && blank - target == 1))
      return;
    $(event.target).attr('class', 'img' + size + ' p' + size + blank);
    blank = target;
    setTimeout(judge, 500);
  }

  function reset() {
    var position = new Array();
    for (let index = 0; index < size * size; index++)
      position.push(index);
    $('#puzzle div').each(function (index) {
      $(this).attr('class', 'img' + size + ' p' + size + position[index]);
    });
    blank = position[size * size - 1];
    isSorted = true;
  }

  function change() {
    var newSize = $(event.target).attr('id').substring(2);
    if (newSize == size)
      return;
    size = newSize;
    set(size);
  }

  function judge() {
    var flag = true;
    $('#puzzle div').each(function () {
      flag = flag ? $(this).attr('id').substring(3) == $(this).attr('class').substring(7) : false;
    });
    if (flag) {
      $('#msg').attr('class', 'show');
      isSorted = true;
    }
  }

  function again() {
    $('#msg').attr('class', 'hide');
    var position = new Array();
    for (let index = 0; index < size * size - 1; index++)
      position.push(index);
    var times = Math.floor(Math.random() * 1000) * 2; /*经过偶数次交换后逆序数奇偶性不变，依然可复原*/
    (function () {
      var temp = 0;
      while (times) {
        var p1 = Math.floor(Math.random() * (size * size - 1));
        var p2 = Math.floor(Math.random() * (size * size - 1));
        if (p1 != p2) {
          temp = position[p1];
          position[p1] = position[p2];
          position[p2] = temp;
          --times;
        }
      }
    })();
    $('#puzzle div').each(function (index) {
      $(this).attr('class', 'img' + size + ' p' + size + position[index]);
    });
    blank = size * size - 1;
    isSorted = false;
  }

})();