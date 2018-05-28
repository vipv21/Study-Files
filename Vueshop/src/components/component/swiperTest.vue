<template>
    <div>  <!--封装swiper组件 -->
            <!-- swiper -->
        <div class="banner">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                     <img v-lazy="banner.image" alt="轮播图" width="100%">  <!--使用v-lazy懒加载图 -->
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    export default {
        props:['bannerPicArray'],  //传递给父组件数据 名字自定义
        data() { 
            return {

            }
        },
        created(){

        }
    }
</script>

<style scoped>
    .swiper-area{
        clear:both;
        max-height:15rem;
        overflow: hidden;
    }
</style>