//teacher.js
//获取应用实例
var app = getApp()
Page({
  data:{
    headimg: '../../image/headimg.png',
    tj: '../../image/tj.png',
    config: '../../image/config.png',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '孩子信息'
    })
  },


})