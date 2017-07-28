<template>
    <div id="content">
    <!--轮播图-->
    <swiper :list='swipeItemList'></swiper>
        <div id="buy">
            <h3>{{goodsinfo.title}}</h3>
            <ul>
            <li class="price">
                现价：<strong style="font-size:6vw;color:red">{{goodsinfo.sell_price}}</strong>&nbsp;&nbsp;  <del>市场价：{{goodsinfo.market_price}}</del>
            </li>
            <li class="inputli">
                    购买数量： <buycount @count="getbuycount"></buycount>
                </li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button @click="gotoshoppingCar"  type="danger">加入购物车</mt-button>
                </li>
            </ul>
        </div>
     
			
    </div>
</template>
<script>
  import hubVue from '../../common/api/hubVue.js'
   import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'
    import swiper from '../../common/components/swiper.vue'  
    import buycount from '../../common/components/buycount.vue'
 import {setItem}  from '../../common/api/localStorageService.js'
export default {
    components:{
        swiper,buycount
    },
    data () {
     return {
        goodsinfo:{},
        goodsdesc:{},
        swipeItemList:[],
        count:1
      };
    },
    methods:{
        getgoodsinfo(){
            let url=`${api.apidomain}/api/goods/getinfo/${this.id}`;
            this.$http.get(url)
                .then(function(data){
                      if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                        this.goodsinfo=data.body.message[0];

                })
        },
        getdesc(){
            let url=`${api.apidomain}/api/goods/getdesc/${this.id}`; 
            this.$http.get(url)
              .then(function(data){
                     if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                     }
                      this.goodsdesc=data.body.message[0];
              })
              
        },
        //获取商品图片轮播图
        getswiper(){
            let url = `${api.apidomain}/api/getthumimages/${this.id}`; this.$http.get(url)
                .then(function(data){
                      if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                     }
                     this.swipeItemList=data.body.message;
                     
                })
        },
        getbuycount(data){
            //解除双向数据绑定
            this.count=data;
        },
        gotoshoppingCar(){
            //要保留购买数据存放在loacalstorage中
            setItem({id:this.id,cou:this.count})
            hubVue.$emit('count',this.count);
            this.$router.push({path:'/shoppingcar'})
        }
        
    },
    created(){
        this.id=this.$route.params.id;
        this.getgoodsinfo();
        this.getdesc();
        this.getswiper()
    }
}
</script>
<style lang="css" scoped>

    #buy,#params
    {
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
    .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
    #buy h3{
        color:#0094ff;
        padding: 5px;
    }
    #buy li,#params li{
        list-style: none;
        padding: 8px;
    }

    #buy .price span{
        color:red;
    }
    #other .imgdesc{
        margin-bottom: 20px;
    }
    .inputli{
        position: relative;
    }
    .countbutton{
        position: absolute;
        left:100px;
        top:5px;
    }
</style>
