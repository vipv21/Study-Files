<template>
    <div>
        <div class="navbar-div">
            <!-- 头部 -->
            <van-nav-bar title="购物车" left-text='返回' left-arrow  
                @click-left="onClickLeft"></van-nav-bar>
        </div>
        <div class="cart-title">
            <van-button size='small' 
                type='danger' 
                @click="clearCart" 
                plain 
            >清空购物车</van-button>
        </div>
        <!-- 显示购物车中商品 使用flex布局-->
        <div class="cart-list">
            <div class="pang-row"  v-for="(item,index) in cartInfo "  :key="index">
                <div class="pang-img">
                    <img :src="item.image" width="100%" alt="">
                </div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.name}} </div>
                    <div class="pang-control">
                        <!-- 计步器效果 双向绑定 -->
                        <van-stepper v-model="item.count"  />
                    </div>
                </div>
                <div class="pang-goods-price">
                    <!-- 单价 -->
                    <div>￥{{item.price | moneyFilter}} </div>
                    <!-- 数量 -->
                    <div>
                        x{{item.count}}
                    </div>
                    <!-- 总价 -->
                    <div class="allPrice">
                        ￥{{item.price*item.count | moneyFilter}}
                    </div>
                </div>
            </div>
        </div>

        <!-- 总价 -->
        <div class="totalMoeny">
            商品总价：￥{{totalMoney | moneyFilter}}
        </div>
    </div>
</template>

<script>
    import {toMoney} from '@/components/filter/moneyFilter.js'

    export default {
        data() {
            return {
                cartInfo: [],   //
                isEmpty: false,  //购物车是否为空

            }
        },
        //价格过滤器
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        created() {
            this.getCartInfo();
        },
        //计算属性
        computed:{
            //商品总价的计算 
            totalMoney(){
                let allMoney =0 ;
                this.cartInfo.forEach((item,index)=>{
                    //总价= 单价* 数量
                    allMoney += item.price * item.count
                } )
                //本地保存 商品单价 和数量
                localStorage.cartInfo = JSON.stringify(this.cartInfo)
                return allMoney
            }
            
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1) //返回上页
            },
            //获取购物车数据方法
            getCartInfo() {
                //判断本地是否有购物车信息存在
                if (localStorage.cartInfo) {
                    this.cartInfo = JSON.parse( localStorage.cartInfo );
                }
                console.log( '购物车信息' + JSON.stringify(this.cartInfo) )
                this.isEmpty =  this.cartInfo.length >0 ? true:false ;
            },
            //清空购物车
            clearCart(){
                localStorage.removeItem('cartInfo');
                this.cartInfo = []  ;
            },
            //总价计算

        },
    }
</script>

<style scoped>
    .cart-title{
        height: 2rem;
        line-height: 2rem;
        background-color: #ffffff;
        border-bottom: 1px solid #e4e7ee;
        padding: 5px ;text-align: right;
    }
    .cart-list{
        background-color: #fff;
    }
    .pang-row{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:1px solid #E4E7ED;
    }
    .pang-img{
        flex:6;
    }
    .pang-text{
        flex:14;
        padding-left:10px;
    }
    .pang-control{
        padding-top: 10px;
    }
    .pang-goods-price{
        flex:4;
        text-align: right;
    }
    .allPrice{
        color: red;
    }
    .totalMoeny{
        text-align: right;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
    }   
</style>