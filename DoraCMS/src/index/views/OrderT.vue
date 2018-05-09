<template>
    <article class="contentContainer">
        <div class="mainbody case-box">
            <el-row :gutter="0">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="5">
                    &nbsp;
                </el-col>
                <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="14" >
                    <div class="case-list">
                    <!-- 内容写这里 -->

                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="学校" prop="school">
                        <el-input type="text" v-model="ruleForm2.school" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="学号" prop="number">
                        <el-input type="text" v-model="ruleForm2.number" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                      </el-form-item>
                    </el-form>
                    </div>
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="5">
                    &nbsp;
                </el-col>
            </el-row>
        </div>
        
    </article>
</template>
<style lang="scss">

</style>

<script>
// import AdsPannel from "../components/AdsPannel.vue";
import api from "~api";
import axios from "axios";
import metaMixin from "~mixins";
import { mapGetters } from "vuex";


export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else{
          callback();
        }
      };
      var validateSchool = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入学校'));
        } else{
          callback();
        }
      };
      var validateNmuber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入学号'));
        } else{
          callback();
        }
      };

      return {
        ruleForm2: {
          pass: '980421',
          school: '1916',
          number: '1601080315'
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          school: [
            { validator: validateSchool, trigger: 'blur' }
          ],
          number: [
            { validator: validateNmuber, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // console.log(valid);
          if (valid) {
          let params = this.ruleForm2;
          // console.log(params);
          // return;
          api.post("users/search", params,{
            headers:{'Content-Type':'application/json; charset=UTF-8'}
            }).then(result => {
              if (result.data.state == "success") {
                console.log(result);
                // window.location = this.referPath;
              } else {
                this.$message({
                  message: result.data.message,
                  type: "error"
                });
              }
            }).catch(err => {
              this.$message.error(err.response.data.error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    },
  //   computed: {
  //     ...mapGetters({
  //       userLoginFormData: "frontend/user/loginForm"
  //   })
  // }
}
</script>