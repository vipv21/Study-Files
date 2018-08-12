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
            <img :src="goodsInfo.IMAGE1" width='100%' alt="">
        </div>
        <!-- 名称 -->
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <!-- 价格 -->
        <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元 </div>    
        <!-- tab 选项卡 -->
        <div>
            <!-- swipeable 左右滑动效果 & sticky 吸顶效果-->
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评论">
                    评论
                </van-tab>
            </van-tabs>
        </div>
        <!-- 底部菜单按钮 -->
        <div class="goods-bottom">
            <div>
                <van-button size='large' type='primary' @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button size='large' type='danger'>直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '@/serviceAPI.config.js';
    import {Toast} from 'vant' ;     //提示
    import {toMoney} from '@/components/filter/moneyFilter.js'

    export default {
        data() {
            return {
                goodsId: '',//模拟传递一个商品id
                goodsInfo:{},   //商品详细信息
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        created() {
            //接收goodsid参数   编程式导航 接收 兼容处理query和params
            this.goodsId= this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId ;
            this.getInfo();

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
            },
            //添加产品到购物车操作
            addGoodsToCart(){
                //取出本地购物车中的商品信息
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo ) : [] ;
                //查找本地  如果有查找返回数组第一个，否则返回undefine
                let isHaveGoods = cartInfo.find(cart=>cart.goodsId ==this.goodsId);
                console.log( isHaveGoods);
                console.log(this.goodsInfo)
                //判断数据存在本地 存在则不添加反之添加
                if (!isHaveGoods) {
                    //新的购物车商品信息
                    let newGoodsInfo = {
                        goodsId: this.goodsInfo.ID,
                        name:this.goodsInfo.NAME ,
                        price: this.goodsInfo.PRESENT_PRICE ,
                        image: this.goodsInfo.IMAGE1,
                        count: 1 ,
                    }
                    cartInfo.push(newGoodsInfo);
                    localStorage.cartInfo =JSON.stringify(cartInfo);
                    Toast.success('添加成功');
                } else {
                    Toast.success('已有此商品');
                }
                this.$router.push({name:'Cart'});
            }
            

        }
    }
</script>

<style scoped>
    .goods-name,.goods-price{
        background-color: #fff;
    }
    .detail{       /*  解决图片之间的间隙问题 */
        font-size: 0;
    }
    .goods-bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #ffffff;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom >div{
        flex: 1;
        padding: 5px;
    }
</style>