//获取应用实例
var app = getApp();
var longtop= false;
Page({
  data: {
    imageList: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '公开分享'
    });
  },
  chooseImage: function () {  //上传图
    var that = this;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有

      success: function (res) {
        //上传图片到服务器
        var i = that.data.i;
        // netUtil.uploadFileRequest('/hallapplet/device/upload', res.tempFilePaths[0], 'file', {}, function (res) {
        //   var imgUrl = JSON.parse(res.data).resParam.imgAddr + JSON.parse(res.data).resParam.imgPath;

        that.setData({  //测试先执行这个
          imageList: that.data.imageList.concat(res.tempFilePaths)
        });

          // 限制只能上传三张照片
          // if (that.data.imgList.length < 3) {
          //   that.data.arr.push(imgUrl)
          //   that.data.imgList.push(imgUrl)
          //   var num = that.data.i + 1;
          //   that.setData({
          //     arr: that.data.arr,
          //     i: num,
          //     tempFilePaths: that.data.imgList
          //   });
          // } else {
          //   wx.showModal({
          //     title: '温馨提示',
          //     content: '最多可上传三张照片',
          //     showCancel: false,
          //     confirmText: '确定',
          //     confirmColor: colors.confirmColor
          //   });
          // }
        // })
      }
    });

  },
  previewImage: function (e) {    //预览图片
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    }); 
  },
  delImage: function (e) {     //长按删除
    console.log('长按成功');
    var that = this;
    var imageList = that.data.imageList;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    imageList.splice(index, 1);
    var num = that.data.i - 1
    // that.setData({
    //   tempFilePaths: imageList,
    //   arr: arr,
    //   i: num,
    // });
    //拖拽移除未完成






  },








































  switchChange: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
})
