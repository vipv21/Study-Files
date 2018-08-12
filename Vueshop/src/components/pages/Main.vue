<template>
    <div>
        <div class="main-div">
            <router-view></router-view>
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon='shop' >首页</van-tabbar-item>
            <van-tabbar-item icon='records' >列表</van-tabbar-item>
            <van-tabbar-item icon='cart' >购物车</van-tabbar-item>
            <van-tabbar-item icon='contact' >个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,   //默认打开
                nowPath:''  //当前路径
            }
        },
        created() {
            this.changeTabBarActive()
        },
        //页面更新触发
        updated() {
            this.changeTabBarActive();
        },
        methods: {
            //改变选中效果时触发 跳转到购物车页面
            changeTabBarActive(){
                //跳到购物车页面
                this.nowPath = this.$route.path;
                if (this.nowPath =='/Cart') {
                    this.active = 2;
                }
            },
            //
            changeTabbar(active) {
                console.log(active);
                switch (active) {
                    case 0:
                        this.$router.push({name:'ShoppingMall'})    //使用name传参
                        break;
                    case 1:
                        this.$router.push({name:'CategoryList'})    
                        break;
                    case 2:
                        this.$router.push({name:'Cart'})    
                        break;
                    case 3:
                        this.$router.push({name:'Member'})  //个人中心
                        break;
                }
            }
        },
    }
</script>

<style scoped>

</style>