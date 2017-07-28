<template>
<!--新闻列表-->
    <div id="content">
        <ul v-for="news in newsList.message" class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<router-link v-bind="{to:'/newsinfo/'+news.id}" class="">
                    
						<img class="mui-media-object mui-pull-left" :src="news.img_url">
						<div class="mui-media-body">
							{{news.title}}
							<p class="mui-ellipsis">{{news.zhaiyao}}</p>
                            <span>时间：{{news.add_time|datefilter}}</span> &nbsp;&nbsp;&nbsp; <span>点击：{{news.click}}</span>
						</div>
					</router-link>
				</li>
				
		</ul>
    </div>        
</template>
<style scoped>
    
</style>
<script>
    import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'
  export default{
        data(){
            return{
                text:'news新闻',
                newsList:{
                    "status": 0,
                    "message": [
                        {
                            "id": 13,
                            "title": "1季度多家房企利润跌幅超50% 去库存促销战打响",
                            "add_time": "2015-04-16T03:50:28.000Z",
                            "zhaiyao": "房企一季度销售业绩已经陆续公布，克而瑞研究中心统计",
                            "click": 1,
                            "img_url": "http://182.254.146.100:8080/upload/201504/16/201504161149414479.jpg"
                        },
                        {
                            "id": 14,
                            "title": "买房还是炒股，2015年买房无法拒绝的5大理由",
                            "add_time": "2015-04-16T04:05:34.000Z",
                            "zhaiyao": "转眼间2015年已经过去了4个月，在这短短的四个月",
                            "click": 2,
                            "img_url": "http://182.254.146.100:8080/upload/201504/16/201504161205596364.jpg"
                        },
                    ]
                }
            }
        },
        methods:{
            getnews:function (){
                let url=`${api.apidomain}/api/getnewslist`;
                this.$http.get(url)
                 .then(data=>{
                     if(data.body.status!=0){
                          Toast('数据异常请联系管理员');
                            return;
                     }
                     this.newsList=data.body
                 },
                 error=>{
                      Toast('数据异常请联系管理员');
                 })
            },
        },
        created(){
            this.getnews();
        }
    }
</script>