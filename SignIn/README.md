# Quick start
`$ npm start` or `$ node ./bin/www`

# Brief
采用sha256加密保存，session实现持久化和信息安全并储存在MongoDB（不过也安全不到哪里去，数据存在`mongodb://localhost:27017/db`的usr集合中，可在`db.js`自行修改

# MVC（低仿）
`views -> *.jade`
`controller` 调用`model`的方法并进行逻辑判断最后作出回应
`model` 提供关于DB，validator，parse的api，应该算三个模型吧，因为只提供了api。。
参考[](https://www.cnblogs.com/diyunfei/p/6752618.html)

# 吐槽
* 为啥我的sign in这么复杂啊。。别人家的这么简单
* ui轻点，我受不了
* 服务端的validator和前端的差不多。。不过在前端包含一个model的validator感觉怪怪的，所以又复制了个。
* 前端要不要加密的问题我看到网上貌似有两派，不过作业貌似没做要求，所以就没做