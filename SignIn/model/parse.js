"use strict";

function parse() {
  this.parseInfo = function (option) { //将数据搞一下，虽然好像没什么必要。。但是懒得删了
    var options = option || {};
    var data = {
      'username': options.username || '',
      'password': options.password || '',
      'repeatPsd': options.repeatPsd || '',
      'schoolId': options.schoolId || '',
      'phone': options.phone || '',
      'email': options.email || '',
    };
    return data;
  }

  this.parseError = function (fromValidator, fromDb) { //将错误信息整合一下
    var invalid = fromValidator || {};
    var db = fromDb || {};
    var errorMsg = {
      'username': invalid.username || db.username || '',
      'password': invalid.password || db.password || '',
      'repeatPsd': invalid.repeatPsd || '',
      'schoolId': invalid.schoolId || db.schoolId || '',
      'phone': invalid.phone || db.phone || '',
      'email': invalid.email || db.email || '',
    };
    return errorMsg;
  }

};

exports = module.exports = new parse();