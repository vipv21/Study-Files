<template>
    <div>
        <swiper>
            <swiper-slide>

            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css' 
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption: {
                    direction:"vertical",
                    slidersPerView:"auto",
                    freeMode:true,
                    mouse
                }
            }
        },
        components:{swiper,swiperSlide}
    }
</script>

<style scoped>

</style>