(function () {
  var startFlag = false, cheatedFlag = false, hitWallFlag = false, redWall = null;
  window.onload = function () {
    var s = document.getElementById('start');
    s.addEventListener('mouseover', start);
    var e = document.getElementById('end');
    e.addEventListener('mouseover', end);
    var walls = document.getElementsByClassName('wall');
    for (wall of walls) {
      wall.addEventListener('mouseover', hit);
    }
    var maze = document.getElementById('maze');
    maze.addEventListener('mouseout', leave); /*可以用mouseleave但是好像一些浏览器不支持*/
  }

  function start() {
    if (hitWallFlag)
      redWall.className = 'wall';
    var msg = document.getElementById('msg');
    if (msg.textContent != '') {
      msg.textContent = '';
      msg.className = 'hidden';
    }
    startFlag = true;
    cheatedFlag = false;
    hitWallFlag = false;
  }

  function end() {
    if (!cheatedFlag && !hitWallFlag && startFlag) {
      showMsg('You Win');
    } else /*if (!hitWallFlag)*/if (!hitWallFlag && cheatedFlag) {
      showMsg("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!");
    }
    startFlag = false;
  }

  function hit() {
    if (startFlag && !hitWallFlag) {
      redWall = event.target;
      redWall.className = 'hit';
      hitWallFlag = true;
      startFlag = false;
      showMsg('You Lose');
    }
  }

  function leave() {
    if (this.contains(event.relatedTarget)) /*替代mouseleave*/
      return;
    if (hitWallFlag) {
      redWall.className = 'wall';
      hitWallFlag = false;
    }
    // if (startFlag) 根据需求不同更改（游戏结束后是否判断作弊
    cheatedFlag = true;
  }

  function showMsg(str) {
    var msg = document.getElementById('msg');
    msg.textContent = str;
    msg.className = 'show';
  }

})();