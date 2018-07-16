<template>
    <div class="goods-info" @click="goGoodsPage">   <!-- 点击商品跳转 -->
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    import {toMoney} from '@/components/filter/moneyFilter.js'
    export default {
        props:['goodsImage','goodsName','goodsPrice','goodsId'],   //传入商品图、名称、价格 、id
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods:{
            goGoodsPage(){  //路由跳转
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
            }
        }
    }
</script>

<style scoped>
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap; 
}
</style>