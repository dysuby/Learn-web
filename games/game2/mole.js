(function () {
  var startFlag = false, left = 30, id = null, /*stopFlag = false,*/ blueBox = null, produceId = null;
  window.onload = function () {
    var map = document.getElementById('map');
    map.style.width = 27 * 10 + 'px';
    map.style.height = 20 * 8 + 'px';
    function addChild() {
      var newNode = document.createElement('div');
      newNode.className = 'boxes';
      map.appendChild(newNode);
      newNode.addEventListener('click', hit);
    }
    for (var index = 0; index < 60; ++index) {
      addChild();
    }
    var button = document.getElementById('se');
    button.addEventListener('click', start);
  }

  // function deal() {
  //   if (startFlag && !stopFlag)
  //     stop();
  //   else
  //     start();
  // }

  function start() {
    if (!startFlag) {
      produce();
      startFlag = true;
    } else {
      gameover();
      startFlag = false;
      return;
    }
    var time = document.getElementById('timeLeft');
    id = setInterval(minu, 1000);
    produceId = setInterval(produce, 1000);
    // startFlag = true;
    // stopFlag = false;
    showMsg("Playing");
    function minu() {
      if (left == 0)
        gameover();
      time.textContent = --left;
    }
  }

  function gameover() {
    showMsg("Game Over");
    clearInterval(id);
    left = 30;
    // stopFlag = false;
    startFlag = false;
    var score = document.getElementById('score');
    if (blueBox != null) {
      var children = document.getElementById('map').children;
      children[blueBox].classList.remove('blueBox');
    }
    alert("Game over.\nYour score is: " + score.textContent);
    clearInterval(produceId);
    score.textContent = '0';
    var time = document.getElementById('timeLeft');
    time.textContent = left;
  }

  // function stop() {
  //   showMsg("Stoping");
  //   clearInterval(id);
  //   clearInterval(produceId);
  //   stopFlag = true;
  // }

  function showMsg(msg) {
    var status = document.getElementById('status');
    status.textContent = msg;
  }

  function produce() {
    var children = document.getElementById('map').children;
    var random = Math.round(Math.random() * 59);
    if (blueBox != null) {
      children[blueBox].classList.remove('blueBox');
      while (random === blueBox) {
        random = Math.round(Math.random() * 59);
      }
    }
    children[random].classList.add('blueBox');
    blueBox = random;
  }

  function hit() {
    if (!startFlag/* || stopFlag*/)
      return;
    var box = event.target;
    if (box.classList.contains('blueBox')) {
      scoreChange(1);
      produce();
      clearInterval(produceId);
      produceId = setInterval(produce, 1000);
    } else {
      scoreChange(-1);
    }
    function scoreChange(num) {
      var score = document.getElementById('score');
      score.textContent = parseInt(score.textContent) + num;
    }
  }
})();
