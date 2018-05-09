//获取应用实例
var app = getApp();
var longtop= false;
Page({
  data: {
    headimg: '../../image/headimg.png',
    a2: '../../image/a2.png',
    a4: '../../image/a4.png',
    date: '2016-09-01',
    dates: '2018-09-01',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '数学'
    })
  },
  // 日期修改
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChanges: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },




})
