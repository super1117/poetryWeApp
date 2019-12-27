//index.js
//获取应用实例
const app = getApp()
var thiz;
Page({
  data: {
    data_list:[]
  },
  
  onLoad: function () {
    thiz = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: app.globalData.host + 'poetry/yunPoetry/findYunPoetryByPage', 
      method: 'post',
      data: {
        level: '1',
        author: '李白'
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data.records[0])
        var array = new Array();
        for(var i = 0, j = res.data.records.length; i < j; i++){
          var item = res.data.records[i]
          var json = item.poetry.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
          var jsonObj = JSON.parse(json)
          var poetry = {
            id: item.id,
            title: jsonObj.title,
            author: item.author,
            dynasty: item.dynasty,
            content: jsonObj.content,
            tags: item.tag
          }
          array[i] = poetry
        }
        thiz.setData({
          data_list: array
        })
      }
    })
  },
  onItemClick: function(e){
    var position = e.currentTarget.dataset.position
    var id = this.data.data_list[position].id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
