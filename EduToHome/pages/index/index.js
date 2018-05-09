//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    headimg:'../../image/headimg.png',
    clap:'../../image/claps.png',
    pz: '../../image/pz.png',
    a2src: '../../image/a2.png',
    a3src: '../../image/a3.png',
    a4src: '../../image/a4.png',
    signupimg:'../../image/signup.png',
    more: '../../image/more.png',
    imgsrc:'http://suo.im/53DTZa',
    showView: true,
    focus: false,
    inputValue: '',
    resultData: [], // 存放数据
    page: 1, // 页码值
  },
  onLoad: function (e) {
    var that = this;
    // 生命周期函数--监听页面加载 
    showView: (e.showView == "true" ? true : false);
    inputView: (e.inputView == "false" ? true : false);

    // app.getUserInfo(function (e) {
    //   app.globalData.userInfo = e.detail.userInfo
    //   this.setData({
    //     userInfo: e.detail.userInfo,
    //     hasUserInfo: true
    //   })
    // })
    that.onloadRequest(1);
  },

  
  onloadRequest: function (e, page) {
    page = page == undefined ? 0 : page
    console.debug(e+"输出是"+page);
    var that = this
    // 0是下滑刷新
    if (e == 0) {
      // 执行REQUEST请求相应的数据
      wx.request({
        url: app.requestUrl,
        data: {
          flag: 'pageData',
          data: that.data.userStatus,
          state: that.data.state,
          page: page
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          // return;
          // 如果没有数据直接返回首页 有数据则展示
          if (res.data.length) {
            wx.hideToast()
            wx.stopPullDownRefresh()
            that.setData({
              resultData: res.data
            })

          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    else if (e == 1) {
      // 执行REQUEST请求相应的数据
      console.log('测试');
      wx.request({

        url: app.requestUrl +'dfcMgr/v/wx/getNews?parentCode=1003',
        data: {
          flag: 'pageData',
          data: that.data.userStatus,
          state: that.data.state,
          page: page
        },
        header: {
          // 'Content-Type': 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: function (res) {
          // console.log(res.data.newsList)
          that.setData({
            resultData: res.data.newsList
          })
          // 如果没有数据直接返回首页 有数据则展示
          if (res.data.length) {
            // wx.hideToast()
            // wx.stopPullDownRefresh()
            // for (var ii = 0; ii < res.data.length; ii++) {
            //   that.data.resultData.push(res.data[ii])
            // }
            console.log(res.data.newsList)
            that.setData({
              resultData: res.data.newsList
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },

































  // -----------------------
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    // console.log('onPullDownRefresh', new Date())
  },
  review: function () {   //操作
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  //弹窗 公开分享
  noTitlemodalTap: function (e) {   
    wx.showModal({
      content: "是否公开让所有用户可见",
      cancelText: "取消",
      confirmText: "公开",
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
    })
  },

  // 查看图片
  viewImg:function(e){
    console.log('1111')
    var src = e.currentTarget.dataset.src;//获取data-src
    var imgList = e.currentTarget.dataset.imgsrc;//获取data-list
      //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },

  //上传图
  chooseImage:function(){
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        console.log('成功');
        // var tempFilePaths = res.tempFilePaths;
        wx.navigateTo({
          url: '../share/share'
        })
      }
    });
  },


  //显示对话框
  showModal: function (e) {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(800).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(800).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //回复消息
  reply:function(){
    console.log('点击回复');
    var that = this;
    that.setData({
      inputView: (!that.data.inputView)
    })
  },
  confirms:function(e){
    console.log('输入完成');
    var that = this;
    var value = e.detail.value;
    // var resultData=[];
    // for (var ii = 0; ii < resultData.length; ii++) {
    //   that.resultData.push(value[ii])
    // }

    that.setData({
      inputView: (!that.data.inputView),
      inputValue: value
    })
  },


  //转发分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '家校通',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  }
})
