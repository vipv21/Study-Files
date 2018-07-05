<template>
    <div>
        <!-- 登录页面 -->
        <van-nav-bar title="用户登录" left-text='返回' left-arrow @click-left="goBack" />
        <div class="register-panel">
            <van-field label='用户名' 
                icon="clear" 
                placeholder='请输入用户名' 
                required v-model="username" 
                @click-icon="username=''"
                :error-message='usernameErrorMsg'
            /> 

            <van-field label='密码' 
                type='password' 
                placeholder='请输入密码' 
                required v-model="password"  
                :error-message='passwordErrorMsg'   
            /> <!--数据的绑定-->

            <div class="register-button">
                <van-button type='primary' size='large' @click="loginAction()" :loading='openLoading'>登录</van-button>
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
                openLoading: false ,    //是否开启用户注册loading状态
                usernameErrorMsg:'',     //用户名注册出错提示
                passwordErrorMsg:'',     //密码注册出错提示
            }
        },
        methods:{
            goBack(){   //返回上一页
                this.$router.go(-1);
            },
            //登录方法
            loginAction(){
                // if (this.checkForm()) {
                //     this.axiosLoginUser();    //如果正确则请求，反之不请求 
                // } 
                
                //如果正确则请求，反之不请求   （ 简化写法 ）
                this.checkForm() && this.axiosLoginUser();
            },
            axiosLoginUser(){     //注册axios请求数据
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



                }).catch(error=>{
                    console.log(error);

                })
            },
            checkForm(){        //验证表单的方法
                let isOK =true ;
                if (this.username.length< 5 ) {
                    this.usernameErrorMsg ='用户名不能低于5位！';
                    isOK =false ;
                }else{
                    this.usernameErrorMsg='';
                }
                if (this.password.length<6) {
                    this.passwordErrorMsg='密码不能低于6位！';
                    isOK = false;
                }else{
                    this.passwordErrorMsg=''
                }

                return isOK;
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