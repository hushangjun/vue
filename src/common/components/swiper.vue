<template>
<mt-swipe :auto="4000">
  <mt-swipe-item v-for="(imgs,key) in list" :key="key"><img :src="imgs.img" alt=""></mt-swipe-item>
</mt-swipe>
</template>
<script>
export default {
    props:["list"],
  data () {
    return {
    };
  }
}
</script>
<style lang="css" scoped>
 /* 轮播图*/
    .mint-swipe{
        height: 400px;
    }
    .mint-swipe-item img{
        width: 100%;
    }
    .mint-swipe-item{
        /*background-color: red ;*/
        width: 100%;
        height: 400px;
    }
</style>