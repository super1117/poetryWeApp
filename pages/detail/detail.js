// pages/detail/detail.js
const app = getApp()
let thiz
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    vh: 0,
    poetry: {
      title: "",
      auhtor: "",
      dynasty: "",
      content: "",
      tags: ""
    },
    authorInfo: {},
    about: [],
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onPageChangedListener: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    thiz = this
    wx.getSystemInfo({
      success: function (res) {
        thiz.setData({ vh: res.windowHeight - 80})
      }
    })  
    wx.request({
      url: app.globalData.host + 'poetry/yunPoetry/findEntityById',
      data: {
        id: options.id
      },
      success(res){
        console.log(res.data)
        var poetryJson = res.data.poetry.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
        var poetry = JSON.parse(poetryJson)
        var authroInfoJson = res.data.authorInfo.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
        var auhtorInfo = JSON.parse(authroInfoJson)
        var aboutJson = res.data.about.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
        var about = JSON.parse(aboutJson)
        thiz.setData({
            poetry: {
              title: poetry.title,
              author: res.data.author,
              dynasty: res.data.dynasty,
              content: poetry.content,
              tags: res.data.tag
            },
          authorInfo: auhtorInfo,
          about: about
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})