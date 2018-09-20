"use strict";

var querystring = require('querystring');
var url = require('url');

function detailHandler(req, res) { //渲染detail
  var session = req.session;
  if (session.signed) { //已经登录
    var userInfo = session.info;
    if (req.originalUrl != '/?username='+ userInfo.username) { //尝试登录他人页面或其他页面
      var username = req.query.username || userInfo.username;
      var errorMsg = userInfo.username !== username ? '只能够访问自己的数据' : '';
      session.errorMsg = errorMsg;
      res.redirect('/?username=' + userInfo.username);
    } else {
      res.render('details', {
        data: userInfo,
        errorMsg: session.errorMsg ? session.errorMsg : ''
      });
      session.errorMsg = '';
    }
  } else {
    session.errorMsg = {
      top: '请先登录'
    };
    res.redirect('/');
  }
}

module.exports = detailHandler;