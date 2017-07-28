<template>
    <div id="content">
        <!--新闻内容-->
        <div id="title">
            <h3>{{newsinfo.title}}</h3>
            <p>{{newsinfo.add_time|datefilter}} {{newsinfo.click}}次浏览</p>
        </div>
        <div id="info" v-html="newsinfo.content"></div>
        <!--发表评论-->
        <div>
            <p>发表评论：</p>
                <textarea v-model="comments"></textarea>
                <mt-button type="danger" @click="postcomments" size="large">发表评论</mt-button>
        </div>
        <!--评论列表--> 
        <ul class="mui-table-view">
            <li v-for="item in commentList" class="mui-table-view-cell">
                <p>评论时间：{{item.add_time|datefilter}}</p>
                <p>评论用户：{{item.user_name}}</p>
                <p>评论内容: {{item.content}}</p>
            </li>
        </ul>
        <div>
            <!--查看更多-->
            <mt-button @click="getmorecomments" type="primary" size="large">查看更多</mt-button>
        </div>

    </div>

</template>
<script>
      import api from '../../common/api/api.js'
      import { Toast } from 'mint-ui'
      export default {
          data(){
              return {
                  pageindex:1,
                 newsinfo:{},
                 comments:"",             
                commentList:[],
              }
          },
         methods:{
               getnewsinfo:function(){
                    //获取地址
                    let url = `${api.apidomain}/api/getnew/${this.$route.params.id}`;
                    this.$http.get(url)
                        .then(function(data){
                     
                            if(data.body.status!=0){
                                 Toast('数据异常请联系管理员');
                            return
                            }
                            this.newsinfo = data.body.message[0];
                        })
                    
               },
               getcomments(pageindex=1){
                let url=`${api.apidomain}/api/getcomments/${this.$route.params.id}?pageindex=${pageindex}`;
                    //获取数据
                    this.$http.get(url)
                    .then(data=>{
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                                return;
                        }
                        this.commentList=this.commentList.concat(data.body.message);
                    },
                    error=>{
                        //数据返回失败
                        Toast('数据异常请联系管理员');
                    })
                },
                postcomments(){
                   if(this.comments.trim().length>0){
                         let url=`${api.apidomain}/api/postcomment/${this.$route.params.id}`;
                    //点击发表评论
                    this.$http.post(
                        url,
                        {
                            content:this.comments
                        },
                        {
                            emulateJSON:true
                        })
                     .then(function(data){
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                        //成功的信息
                        Toast(data.body.message)
                        this.commentList.unshift(
                            {
                             "user_name": "牛掰的用户",
                                "add_time": new Date(),
                                "content": this.comments 
                            }
                        ),
                        //提交清空数据
                        this.comments="";
                     })
                   }else{
                       Toast('评论信息不能为空哦！')  
                   }
                },
                getmorecomments(){
                    this.getcomments(this.pageindex++);
                   
                }
            },
            created(){
                //进入页面就渲染
                this.getnewsinfo();
                this.getcomments();
            }
      }
</script>
<style scoped>
    #title h3{
        padding-top:5px;
        color:#0084dd;
    }
    #title p{
        color:rgba(0,0,0,.6);
    }
    #info{
        text-indent:2em;
        padding:5px;
        font-size:16px;
    }
</style>