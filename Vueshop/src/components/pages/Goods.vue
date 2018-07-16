<template>
    <div>
        <div class="navbar-div">
            <!-- 顶部导航返回 -->
            <van-nav-bar 
                title="商品详情"
                left-text='返回'
                left-arrow  
                @click-left="onClickLeft"
            />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width='100%'   alt="">
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '@/serviceAPI.config.js';
    import {Toast} from 'vant' ;     //提示

    export default {
        data() {
            return {
                goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7',//模拟传递一个商品id
                goodsInfo:{},   //商品详细信息
            }
        },
        created() {
            //接收goodsid参数
            this.goodsId =this.$route.query.goodsId;
            this.getInfo()
        },
        methods:{
            getInfo(){
                axios({
                    url: url.getDetailGoodsInfo ,
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                }).then(response=>{
                    console.log(response)
                    //判断返回值信息 并且message不为空
                    if (response.data.code==200 && response.data.message) {
                        this.goodsInfo =response.data.message;
                    } else {
                        //vant的提示  Toast
                        Toast('服务器信息获取失败')
                    }
                    console.log( this.goodsInfo);
                }).catch(error=>{
                    console.log(error);
                })
            },
            onClickLeft(){
                this.$router.go(-1) //返回上页
            }
            

        }
    }
</script>

<style scoped>

</style>