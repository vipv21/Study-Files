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



    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Shopping Mall',
                locationIcon: require('../../assets/images/location.png'),//require引入打包不会出错
                bannerPicArray:[
                    {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
                    {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
                    {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
                ]
            }
        },
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
</style>