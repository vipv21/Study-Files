import * as echarts from '../../ec-canvas/echarts';

//获取应用实例
var app = getApp();
var longtop= false;
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    headimg: '../../image/headimg.png',
    a2: '../../image/9-1.png',
    a4: '../../image/9-2.png',
    inputShowed: false,
    inputVal: "",
    tabs: ["作业", "统计"],
    activeIndex: 1 , //当前选中项
    sliderOffset: 0,
    sliderLeft: 0,
    date: '2016-09-01', //设置默认日期
    dates: '2018-09-01',
    ec: {   //图表
      onInit: initChart
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '数学'
    });
    //页面选项卡切换
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  // 搜索入口  
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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

//统计图
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#0FD226", "#FFAA33", "#F62020"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [
      {
        value: 55,
        name: '优秀'
      }, {
        value: 20,
        name: '中等'
      }, {
        value: 10,
        name: '较差'
      }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}
