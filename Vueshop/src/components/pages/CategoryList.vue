<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"></van-nav-bar>
        </div>

        <div>
            <van-row>
                <!-- 6+18 共24栅格 -->
                <van-col span='6'>
                    <div id="leftNav">
                        <ul>
                            <!-- :class 实现绑定反白效果  类别索引等于当前索引值时 categoryActive:categoryIndex==index -->
                            <li v-for="(item,index) in category" :key="index" 
                            @click="clickCategry(index,item.ID)" 
                            :class="{categoryActive:categoryIndex==index}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span='18'>
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key='index' :title="item.MALL_SUB_NAME"></van-tab>
                        </van-tabs>
                    </div>
                    
                    <div id="list-div">
                        <!-- 下拉刷新 -->
                        <van-pull-refresh v-model="isRefresh" @refresh='onRefresh' >
                            <!-- 上拉加载数据 -->
                            <van-list v-model="loading" :finished='finished' @load="onLoad" >
                                <div class="list-item" v-for="(item,index) in goodList" :key='index'>
                                    <div class="list-item-img">
                                        <!-- :onerror 绑定错误不显示图片时的默认图片展示 -->
                                        <img :src="item.IMAGE1" width="100%" :onerror='errorImg'>
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>￥{{item.ORI_PRICE}}元</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>

                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '@/serviceAPI.config.js';
    import { Toast } from 'vant';

    export default {
        data() {
            return {
                category :[],    //初始化定义
                categoryIndex :0 ,  //反白效果默认索引值
                categorySub : [],    //小类类别
                active :0 ,     //第0个开始激活的标签
                loading : false ,   //加载状态 是否使用
                finished: false , //上拉加载是否有数据
                goodList :[] ,      //商品数据
                isRefresh: false, //下拉刷新 开关

                page:1,             //商品列表页
                categorySubId:'',   //商品子类id
                errorImg: 'this.src="'+require('@/assets/images/errorimg.png')+'"' ,//引入静态默认图片

            }
        },
        created() { //执行axios
            this.getCategory();
        },
        mounted() {
            // 只有在这个生命周期中 页面加载完 操作dom
            //获取窗口的高度
            let winHeight = document.documentElement.clientHeight;
            // console.log(winHeight) 
            document.getElementById('leftNav').style.height = winHeight -46 +'px';
            //上拉加载 页面高度
            document.getElementById('list-div').style.height = winHeight -90 +'px';
        },
        methods:{
            getCategory(){
                axios({
                    url: url.getCategoryList,
                    method:'get'
                })
                .then(response=>{
                    // console.log(response)
                    // 判断请求状态为200并且message不为空
                    if (response.data.code ==200 && response.data.message) {
                        this.category = response.data.message ;
                        //获取数组中第一个的id  解决小类第一个为空
                        this.getCategorySubByCategoryID(this.category[0].ID)
                    } else {
                        Toast('服务器错误，获取信息失败')
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            },
            clickCategry(index,categoryId){    //点击的索引值传入实现效果
                this.categoryIndex = index ;
                //初始化操作
                this.page = 1;
                this.finished =false ;
                this.goodList =[] ;

                this.getCategorySubByCategoryID(categoryId);
            },
            //根据大类获取小类
            getCategorySubByCategoryID(categoryId){
                axios({
                    url: url.getCategorySubList ,
                    method :'post',
                    data:{
                        categoryId:categoryId
                    }
                }).then(response=>{
                    // console.log(response);
                    if (response.data.code == 200 && response.data.message) {
                        this.categorySub = response.data.message ;
                        this.active = 0 ;       //解决切换时数据不同步
                        //读取大类信息
                        this.categorySubId =this.categorySub[0].ID;
                        this.onLoad();
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //上拉加载
            onLoad(){
                setTimeout(() => {
                //如果有小类id则赋值 否则从子类的第一个中取id赋值
                    this.categorySubId = this.getCategorySubId ? this.categorySubId:this.categorySub[0].ID
                    this.getGoodList(); //获取商品列表信息
                }, 1000);
            },
            //下拉刷新
            onRefresh(){
                //定时 防止并行多次执行
                setTimeout(() => {
                    this.isRefresh =false ;
                    this.finished =false ;  //解决加载完后 上拉卡住
                    this.goodList= [];  //goodList赋值为空
                    this.page = 1 ; //页数
                    this.onLoad();  //重新执行加载
                }, 500);   
            },
            //获取商品信息
            getGoodList(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                        categorySubId:this.categorySubId ,
                        page: this.page ,   //显示第几页
                    }
                }).then(response=>{
                    // console.log(response);
                    if (response.data.code==200 &&response.data.message.length) {
                        this.page++;
                        //合并数组信息 旧的 + 新的
                        this.goodList = this.goodList.concat(response.data.message);
                    } else {
                        //禁止上拉加载
                        this.finished = true ;
                    }
                    this.loading = false ; 
                }).catch(error=>{
                    console.log(error);
                })
            },
            //index索引值 title标题
            onClickCategorySub(index,title){
                //获取小类id值
                this.categorySubId = this.categorySub[index].ID;
                console.log('category:'+this.catergorySubId);
                //切换小类类别 初始化值
                this.goodList= [];  //清空值
                this.finished = false;  //加载到底为false
                this.page = 1;  //初始化为第一页
                this.onLoad() ; //调用加载方法  
            },
        }
    }
</script>

<style scoped>
    #leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li{
        line-height: 2rem; border-bottom: 1px solid #E4E7Ed;
        padding: 3px;font-size: 0.8rem;
        text-align: center;
    }
    .categoryActive{        /*动态绑定反白效果*/
        background-color: #ffffff;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>