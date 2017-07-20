import Vue from 'vue'
import App from './App.vue'

new Vue({
    el:'#view',
    render:function(created){
        return created(App)
    }
});