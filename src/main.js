import Vue from 'vue';
import App from './App.vue';

//引入mint-ui
import mint from 'mint-ui'
Vue.use(mint);
import '../node_modules/mint-ui/lib/style.css'

//创建路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
// vue的http请求
import resource from 'vue-resource'
Vue.use(resource);
//引入时间模块
import datefilter from './common/filter/datefilter.js'
Vue.use(datefilter);
//图片预览
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
import home from './component/home/home.vue'
import goods from './component/goods/goods.vue'
import goodsinfo from './component/goods/goodsinfo.vue'
import shoppingcar from './component/shoppingcar/shoppingcar.vue'
import settings from './component/settings/settings.vue'
import news from './component/news/news.vue'
import newsinfo from './component/news/newsinfo.vue'
import photoList from './component/photo/photoList.vue'
import photoinfo from './component/photo/photoinfo.vue'
//引入 mui样式
import './static/css/main.css'
import './static/css/mui.min.css'
//创建路由表
let router = new VueRouter({
    //路由却换以后的样式
    linkActiveClass: "mui-active",
    routes: [
        //首页
        { path: '/home', component: home },
        //商品列表
        { path: '/goods', component: goods },
        //商品信息
        { path: '/goodsinfo/:id', component: goodsinfo },
        //购物车
        { path: '/shoppingcar', component: shoppingcar },
        //设置
        { path: '/settings', component: settings },
        // 新闻
        { path: '/news', component: news },
        // 新闻详情页
        { path: '/newsinfo/:id', component: newsinfo },
        //图片列表
        { path: '/photoList', component: photoList },
        //图片详情
        { path: '/photoinfo/:id', component: photoinfo },
    ]
});
new Vue({
    el: '#view',
    router: router,
    render: function(created) {
        return created(App)
    }
});