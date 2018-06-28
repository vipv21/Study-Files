<template>
    <div>
        <!-- 注册页面 -->
        <van-nav-bar title="用户注册" left-text='返回' left-arrow @click-left="goBack" />
        <div class="register-panel">
            <van-field label='用户名' icon="clear" placeholder='请输入用户名' required v-model="username" @click-icon="username='' "/> 

            <van-field label='密码' type='password' placeholder='请输入密码' required v-model="password"  /> 

            <div class="register-button">
                <van-button type='primary' size='large' @click="axiosRegsterUser()" :loading='openLoading'>立即注册</van-button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'  
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading: false     //是否开启用户注册loading状态
            }
        },
        methods:{
            goBack(){   //返回上一页
                this.$router.go(-1);
            },
            axiosRegsterUser(){     //注册axios请求数据
                this.openLoading= true , //开始注册为loading状态
                console.log(this.username);
                axios({
                    url: url.registerUser,
                    method:"post",
                    data:{
                        userName: this.username,
                        password: this.password
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        Toast.success(response.data.message);
                        this.$router.push('/')      //跳转到首页
                    }else{
                        this.openLoading =false;    //注册失败开启按钮
                        Toast.fail('注册失败');
                    }


                }).catch(error=>{
                    console.log(error);
                    this.openLoading =false; 
                })
            }
        }
    }
</script>

<style scoped>
    .register-panel{
        width: 90%;
        border-radius: 5px;
        margin: 20px auto;
        padding-bottom: 80px;
    }
    .register-button{
        padding-top: 10px;
    }
</style>