<template>
    <div id="content">
          <ul class="mui-table-view">
            <li  v-for="item in photoList" :key="item.id"   class="mui-table-view-cell mui-media">
                <router-link v-bind="{to:'/photoinfo/'+item.id}" class="">
            
                    <img class="mui-media-object mui-pull-right" v-lazy="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class="mui-ellipsis" v-html="item.content"> </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'
export default {

  data () {
    return {
        photoList:[]
    }
  },
  methods:{
      getphotoList(){
        let url = `${api.apidomain}/api/getimages/0`;
        this.$http.get(url)
            .then(function (data){
                  //判断状态
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                //正常数据
                this.photoList = data.body.message;        
            })
      }
     
  },
   created(){
          //调用组件
          this.getphotoList();
      }
}
</script>
<style scoped>
 image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>