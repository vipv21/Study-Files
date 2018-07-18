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
                        左侧导航
                    </div>
                </van-col>
                <van-col span='18'>
                    <div>
                        右侧列表
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

            }
        },
        created() { //执行axios
            this.getCategory();
        },
        methods:{
            getCategory(){
                axios({
                    url: url.getCategoryList,
                    method:'get'
                })
                .then(response=>{
                    console.log(response)
                    // 判断请求状态为200并且message不为空
                    if (response.data.code ==200 && response.data.message) {
                        
                    } else {
                        Toast('服务器错误，获取信息失败')
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
    .leftNav{
        background-color: aliceblue;
    }
</style>