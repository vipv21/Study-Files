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
            <!-- 封装2  swiper组件 绑定属性bannerPicArray，属性需要 引入并注册 -->
        <!-- <swiper-test :bannerPicArray='bannerPicArray'></swiper-test> -->

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
                            <div>￥{{item.price|moneyFilter}}(￥{{item.mallPrice |moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- 楼层组件 -->
        <floor-component :floorData='floor1' :floorTitle='floorName.floor1'></floor-component>  <!--调用封装的组件 并用props 父组件传给 子组件数据 -->
        <floor-component :floorData='floor2' :floorTitle='floorName.floor2'></floor-component>
        <floor-component :floorData='floor3' :floorTitle='floorName.floor3'></floor-component>

        <!-- 热卖商品 -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter='20'>
                        <van-col span='12' v-for="(item,index ) in hotGoods" :key="index">
                        <!-- 此处 goods-infos 为引入的组件设置的名称 绑定属性的 图片 名称 价格-->
                            <goods-infos :goodsImage='item.image' :goodsName='item.name' :goodsPrice='item.price' ></goods-infos>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>



    </div>
</template>

<script>
    import  axios from 'axios'
    //引入vue-awesome-swiper组件 非全局
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'    //引入 封装的 楼层组件
    import swiperTest from '../component/swiperTest'  //引入 封装的 swiper组件

   // import swiperDefault from '../swiper/swiperDefault'     //引入swiperDefault组件
   // import swiperDefault2 from '../swiper/swiperDefault2'     //引入swiperDefault2组件

    import {toMoney} from '@/components/filter/moneyFilter.js'     //@ 表示src目录下 路径
    import goodsInfos from '../component/goodsInfos'        //引入封装的 热卖商品组件
    import url from '@/serviceAPI.config.js'    //引入封装的 Axios  配置文件。自定义为url 下面引用

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
                floor1:[],      //楼层效果 初始化
                floor2:[], 
                floor3:[], 
                floorName:{},   //楼层标题 初始化
                hotGoods:[]     //热卖商品
            }
        },
        filters:{
            moneyFilter(monery){
                return toMoney(monery); //此处toMoney 为引入是名称
            }
        },
        components:{swiper,swiperSlide,floorComponent,swiperTest,goodsInfos},    //注册引入的组件
        created(){
            axios({ //axios请求
                url: url.getShoppingMallInfo ,   //数据请求接口   此更新了接口
                methods:'get',
            }).then(response=>{
                console.log(response)
                if(response.status==200){
                    this.bannerPicArray=response.data.data.slides;  //获取banner图
                    this.category=response.data.data.category;      //菜单
                    this.addBanner=response.data.data.advertesPicture.PICTURE_ADDRESS;  //广告图
                    this.recommendGoods=response.data.data.recommend;       //商品推荐
                    this.floorName = response.data.data.floorName;     //楼层数据
                    this.floor1 = response.data.data.floor1;     //楼层数据
                    this.floor2 = response.data.data.floor2;     //楼层数据
                    this.floor3 = response.data.data.floor3;     //楼层数据
                    this.hotGoods =response.data.data.hotGoods  //热卖商品
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
        overflow:hidden;
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
        text-align: center;
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
    /* 热卖商品 */
    .hot-area{
        text-align: center;
        font-size:14px;
        height: 1.8rem;
        line-height:1.8rem;
    }
</style>