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
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="idnex">
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







    </div>
</template>

<script>
    import  axios from 'axios'
    export default {
        data() {
            return {
                msg: 'Shopping Mall',
                locationIcon: require('../../assets/images/location.png'),//require引入本地图 打包不会出错
                bannerPicArray:[],
                category:[],        //初始化数据 --菜单
                addBanner:'',          //  --广告图
            }
        },
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



</style>