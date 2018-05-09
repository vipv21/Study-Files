//获取应用实例
var app = getApp();
var longtop= false;
Page({
  data: {
    headimg: '../../image/headimg.png',
    a2: '../../image/a2.png',
    a4: '../../image/a4.png',
    tj:'../../image/tj.png',
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    imageList: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '第一题'
    })
  },
  previewImage: function (e) {    //预览图片 需要接口处理图片地址
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    });
  },

  checkChange:function(){
    
  }











})
