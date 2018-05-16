<template>
    <div> 
        <div class="search">  
            <!-- van为24栅格 -->
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location-icon"/>
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input" placeholder="查找"/>
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
            <!-- swiper -->
        <div class="banner">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                     <img v-lazy="banner.image" alt="轮播图" width="100%">  <!--使用v-lazy懒加载图 -->
                </van-swipe-item>
            </van-swipe>
        </div>
            <!-- type bar  -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key='index'>
                <img v-lazy="cate.image" alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
            
            <!-- 广告条 -->
        <div>
            <img v-lazy='addBanner' alt="" width="100%">
        </div>

        <!-- 商品推荐 -->
        <div class="recommend-arer">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options='swiperOption'>
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" alt=""  width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="floor">
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="floor1_0.image" alt="" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floor1_1.image" alt="" width="100%">
                    </div>
                    <div class=" ">
                        <img :src="floor1_2.image" alt="" width="100%">
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
    import  axios from 'axios'
    //引入vue-awesome-swiper组件 非全局
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
   // import swiperDefault from '../swiper/swiperDefault'     //引入swiperDefault组件
   // import swiperDefault2 from '../swiper/swiperDefault2'     //引入swiperDefault2组件
   // import swiperText from '../swiper/swiperText'           //引入swiperText组件
    export default {
        data() {
            return {
                msg: 'Shopping Mall',
                locationIcon: require('../../assets/images/location.png'),//require引入本地图 打包不会出错
                bannerPicArray:[],
                category:[],        //初始化数据 --菜单
                addBanner:'',       //  --广告图
                recommendGoods:[],
                swiperOption:{
                    slidesPerView:3
                },
                floor1:[],
                floor1_0:{},
                floor1_1:{},
                floor1_2:{},

            }
        },
        components:{swiper,swiperSlide},    //注册引入的组件
        created(){
            axios({ //axios请求
                url:'https://www.easy-mock.com/mock/5af6ad264a8e0f28cef5c471/Vueshop/index',
                methods:'get'
            }).then(response=>{
                console.log(response)
                if(response.status==200){
                    this.bannerPicArray=response.data.data.slides;  //获取banner图
                    this.category=response.data.data.category;      //菜单
                    this.addBanner=response.data.data.advertesPicture.PICTURE_ADDRESS;  //广告图
                    this.recommendGoods=response.data.data.recommend;       //商品推荐
                    this.floor1 = response.data.data.floor1;
                    this.floor1_0 =this.floor1[0];
                    this.floor1_1 =this.floor1[1];
                    this.floor1_2 =this.floor1[2];
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    .test-row{text-align: center;}
    .search{
        height:2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input{
        width:100%;
        height: 1.3rem;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom:1px solid #fff !important;
        background-color: #e5017d;
        color:#fff;
    }
    .banner{
        height: 9.625rem;
    }
    .location-icon{
        padding-top:.2rem;
        padding-left:.3rem;
    }
    .swiper-area{
        clear:both;
        max-height:15rem;
        overflow: hidden;
    }
    .type-bar{
        background-color: #fff;
        margin:0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;      /*flex布局*/
        flex-direction: row;
        flex-wrap: nowrap;
        text-align: center;
    }
    .type-bar div{
        padding: .3rem;
        font-size: 12px;
    }
    /* 商品推荐样式 */
    .recommend-arer{
        background-color: #fff;
        margin-top: .3rem;
    }
    .recommend-title{
        border-bottom: 1px solid #eeeeee;
        font-size: 14px;
        padding: .2rem;
        color: #e5017d;
    }
    .recommend-body{
        border-bottom: 1px solid #eeeeee;

    }
    .recommend-item{
        width: 99%;
        border-right: 1px solid#eee;
        font-size: 12px;
        text-align: center;
    }
    /* floor */
    .floor-anomaly{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .floor-anomaly div{
        /* width: 10rem; */
        box-sizing: border-box;
        
    }
    .floor-one{
        border-right: 1px solid #ddd;
    }
    .floor-two{
        border-bottom: 1px solid #dddddd;
    }

</style>