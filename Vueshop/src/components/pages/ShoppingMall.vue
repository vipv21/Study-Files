<template>
    <div>   
        <!-- van为24栅格 -->
        <van-row class="test-row">
            <van-col span='8'>文字一</van-col>
            <van-col span='8'>文字一</van-col>
            <van-col span='8'>文字一</van-col>
        </van-row>

        <van-row>
            <van-col span='4'>span4</van-col>
            <van-col span="10">span10</van-col>
        </van-row>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "Shopping Mall"
            }
        },
    }
</script>

<style scoped>
    .test-row{text-align: center;}
</style>