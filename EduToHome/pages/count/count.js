//获取应用实例
var app = getApp();
var longtop= false;
Page({
  data: {
    headimg: '../../image/headimg.png',
    Chinese: '../../image/Chinese.png',
    math: '../../image/mathematics.png',
    English: '../../image/English.png',
    biological: '../../image/biological.png',
    music: '../../image/music.png',
    arts: '../../image/arts.png',
    physical: '../../image/physical.png',
    political: '../../image/political.png',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '家校通'
    })
  },




  switchChange: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
})
