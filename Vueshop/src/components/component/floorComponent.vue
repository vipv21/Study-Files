<template>      <!--楼层组件封装-->
    <div>
           <!-- 楼层效果 -->
        <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="floorData0.image" alt="" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floorData1.image" alt="" width="100%">
                    </div>
                    <div> <img :src="floorData2.image" alt="" width="100%"></div>
                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item,index) in floorData.slice(3)" :key="index" >
                    <img :src="item.image" alt="" width="100%">
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
    export default {
        props:['floorData','floorTitle'],
        data() {
            return {
               floorData0:{},
               floorData1:{},
               floorData2:{}
            }
        },
        created(){
            //这里请求数据 会有延迟导致页面没有数据  需要放置在 watch中监听
        },
        watch:{ //监听
            floorData:function(val){    //数据发生变化再次赋值
                this.floorData0= this.floorData[0];
                this.floorData1= this.floorData[1];
                this.floorData2= this.floorData[2];
            }
        }
    }
</script>

<style scoped>
    /* floor */
    .floor-title{
        text-align: center;
        font-size: 14px;
        height: 1.8rem; line-height: 1.8rem;
    }
    .floor-anomaly{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .floor-anomaly div{
        /* width: 10rem; */
        box-sizing: border-box;
        
    }
    .floor-one{
        border-right: 1px solid #ddd;
    }
    .floor-two{
        border-bottom: 1px solid #dddddd;
    }
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        background-color: #fff;
    
    }
    .floor-rule div{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 50%;
        border-bottom:1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
        border-right: 1px solid #ddd;
    }
</style>