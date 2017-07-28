<template>
    <div>
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
 props:["artid"],
  data () {
    return {
          pageindex:1,
          comments:'',
          commentList:[]
    };
  },
  methods:{
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
      this.getcomments();
}
}
</script>
<style  scoped>
</style>