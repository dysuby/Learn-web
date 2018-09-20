# 大概算说明吧？
* `$ node signUp.js` 在signUp目录下运行

* 用户不存在会重定向

* 直接访问`details.html`和`404.html`会被拒绝

* `./public/data.json`是保存用户数据的

* 依赖关系:
```json
{
  "404.html": {
    "css": "style.css",
    "js": "404redirect.js"
  },
  "details.html": {
    "css": "style.css",
    "js": ["back.js", "jquery-3.2.1-min.js"]
  },
  "index.html": {
    "css": "style.css",
    "js": ["client.js", "jquery-3.2.1-min.js"]
  }
}
```