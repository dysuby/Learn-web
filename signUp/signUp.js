'use strict';

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var path = require('path');

http.createServer(deal).listen(8000);

var usr = {};
const target = ['name', 'id', 'phone', 'email']; //内容项

function parse(_url) {
  return querystring.parse(url.parse(_url).query).username;
}

function getMIME(_path) {
  var ext = path.extname(_path);
  if (ext == '.js' || ext == '.html' || ext == '.css')
    return 'text/' + ext.substr(1);
  else if (ext == '.ico' || ext == '.jpg' || ext == '.png' || ext == '.jpeg')
    return 'image/' + ext.substr(1);
}


function check(usr, data) {
  var err = new Array();
  for (const each in usr) {
    for (var i = 0; i < 4; ++i) {
      if (usr[each][target[i]] == data[target[i]]) {
        err.push(target[i]);
      }
    }
  }
  return err;
}

function writeDetails(response, request, data) {
  fs.readFile('./public/html/details.html', 'utf8', function (err, buffer) {
    if (err) {
      console.log(err);
      response.writeHead(404);
      response.end();
    } else {
      for (var i = 0; i < 4; ++i)
        buffer = buffer.replace('{' + target[i] + '}', data[target[i]]);
      console.log(request.method + ' ./public/html/details.html: Success');
      response.writeHead(200, { 'content-type': 'text/html' });
      response.write(buffer);
      response.end();
    }
  });
}

function writeError(response, request, data, pos) { //用户名被占用
  fs.readFile('./public/html/index.html', 'utf8', function (err, buffer) {
    if (err) {
      console.log(err);
      response.writeHead(404);
      response.end();
    } else {
      for (var i = 0; i < 4; ++i) {
        var index = buffer.indexOf('id="' + target[i] + '"');
        if (index == -1) {
          console.log(target[i]);
          response.writeHead(404);
          response.end();
          return;
        } else {
          for (; buffer[index] != '>'; ++index) { }
          buffer = buffer.substr(0, index) + ' value="' + data[target[i]] + '"' + buffer.substr(index);
          index = buffer.substr(index).indexOf('class="error"') + buffer.substr(0, index).length;
          if (pos.indexOf(target[i]) != -1) {
            for (; buffer[index] != '>'; ++index) { }
            buffer = buffer.substr(0, index + 1) + '* 已被占用' + buffer.substr(index + 1);
          }
        }
      }
      console.log(request.method + ' ./public/html/index.html: Success');
      response.writeHead(200, { 'content-type': 'text/html', 'location': './index.html' });
      response.write(buffer);
      response.end();
    }
  });
  pos.includes = function (target) {
    
  };
}

function write(response, request, _path) { //index.html, css, js
  fs.readFile(_path, function (err, data) {
    var mime = getMIME(_path);
    if (err) {
      console.log(err);
      response.writeHead(302, { 'content-type': 'text/html', 'location': './index.html' });
      response.end();
    } else {
      console.log(request.method + ' ' + _path + ': Success');
      response.writeHead(200, { 'content-type': mime });
      response.write(data);
      response.end();
    }
  });
}

function redirect(response, request) { //用户不存在时重定向
  console.log('Responce: User doesn\'t exist');
  fs.readFile('./public/html/404.html', function (err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404);
      response.end();
    } else {
      console.log(request.method + ' ./404.html: Success');
      response.writeHead(200, { 'content-type': 'text/html' });
      response.write(data);
      response.end();
    }
  });
}

function deal(request, response) {
  var name = parse(request.url);
  fs.readFile('./public/data.json', 'utf8', function (err, data) {
    if (err)
      console.log(err);
    usr = data ? JSON.parse(data) : {};
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      var data = '';
      request.on('data', function (chunk) {
        data += chunk;
      });
      request.on('end', function () {
        data = querystring.parse(data);
        if (check(usr, data).length != 0) {
          writeError(response, request, data, check(usr, data));
        } else {
          usr[data.name] = data;
          fs.writeFile('./public/data.json', JSON.stringify(usr), function (err) {
            if (err)
              console.log(err);
            response.writeHead(302, { 'content-type': 'text/html', 'location': './?username=' + data.name });
            response.end();
          })
        }
        console.log(usr);
      });
    } else if (name && usr[name]) {
      writeDetails(response, request, usr[name]);
    } else {
      var _path;
      if (name) {
        redirect(response, request);
      } else {
        if (request.url === '/details.html' || request.url === '/404.html') {
          response.writeHead(403);
          response.end();
        } else {
          if (path.extname(request.url) == '.html')
            _path = './public/html' + request.url;
          else
            _path = './public' + request.url;
          write(response, request, _path);
        }
      }
    }
  });
}

console.log('Serve at 127.0.0.1:8000 now');