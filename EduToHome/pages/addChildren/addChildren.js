//teacher.js
//获取应用实例
var app = getApp()
Page({
  data:{
    headimg: '../../image/headimg.png',
    tj: '../../image/tj.png',
    config: '../../image/config.png',
    countries: ["三段小学", "美国小学", "英国小学"],
    year: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"],
    classes: ["一班", "二班", "三班"],
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加孩子'
    })
  },
  bindCountryChange: function (e) {   //选择学校
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },

  bindYear: function (e) {   //选择年级
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      yearIndex: e.detail.value
    })
  },

  bindClasses: function (e) {   //选择班级
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      classesIndex: e.detail.value
    })
  },

})