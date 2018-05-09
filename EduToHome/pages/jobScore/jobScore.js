//获取应用实例
var app = getApp();
var longtop= false;
Page({
  data: {
    headimg: '../../image/headimg.png',
    a2: '../../image/a2.png',
    a4: '../../image/a4.png'
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '数学-三角形周长计算'
    })
  },

})
