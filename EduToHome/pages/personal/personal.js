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
      title: '个人中心',
      backgroundColor:'#33DBE2'
    })
  },
  dianjis:function(){
    wx.request({
      url: 'https://b28f0d1e.ngrok.io/dfcMgr/v/wx/getToken',  //仅为示例，并非真实的接口地址
      // data: {
      //   x: '',
      //   y: ''
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }

})