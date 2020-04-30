// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import axios from 'axios'
import Vuex from 'vuex'
import 'lib-flexible/flexible.js'



//全局引入mintui的组件
import MintUI from 'mint-ui';
//import 'mint-ui/lib/style.css';
Vue.use(MintUI);

//import Vant from 'vant';
//import 'vant/lib/index.css';
//Vue.use(Vant);

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.use(Vuex);
Vue.prototype.$http=axios;

var instance = axios.create({
  baseURL:'',
  timeout:5000,
  headers:{"Content-Type":"multipart/form-data"
}
});
 
Vue.prototype.axios = axios;
Vue.prototype.instance=instance;
//单个引入mintui的组件
// import {Button,Swipe} from 'mint-ui';
// 注册成全局标签
// Vue.component(Button.name,"Button");
// Vue.component(Swipe.name,"Swipe");

if (process.env.NODE_ENV == 'development') {
    Vue.prototype.keyUrl = '/api'
}
else if (process.env.NODE_ENV == 'production') {
    Vue.prototype.keyUrl = ''
}
Vue.prototype.lottery = {
  '01':{
    "name":"双色球",
    'nameEng':'ssq',
    'redNumMax':'33',
    'redNumMin':'1',
    'redNumSize':'6',
    'blueNumMax':'16',
    'blueNumSize':'1',
  },
  '03':{
    "name":"福彩3D",
    'nameEng':'3d',
    'redNumMax':'10',
    'redNumMin':'0',
    'redNumSize':'3',
    'blueNumMax':'10',
    'blueNumSize':'0',
  },
  '52':{
    "name":"排列五",
    'nameEng':'p5',
    'redNumMin':'0',
    'redNumMax':'10',
    'redNumSize':'5',
    'blueNumMax':'10',
    'blueNumSize':'0',
  },
  '53':{
    "name":"排列三",
    'nameEng':'p3',
    'redNumMax':'10',
    'redNumMin':'0',
    'redNumSize':'3',
    'blueNumMax':'10',
    'blueNumSize':'0',
  },
  '50':{
    "name":"大乐透",
    'nameEng':'dlt',
    'redNumMax':'35',
    'redNumMin':'1',
    'redNumSize':'5',
    'blueNumMax':'12',
    'blueNumSize':'2',
  },
}
Vue.prototype.DownUrl = {
  'ios':'https://apps.apple.com/cn/app/%E6%8E%8C%E4%B8%8A%E5%AE%9D-%E4%BE%BF%E6%8D%B7%E5%B0%8F%E5%8A%A9%E6%89%8B/id1474061339?tdsourcetag=s_pctim_aiomsg',
  'and':'http://down.688cai.com/az_xlaicai/lianlianz.apk'
};
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
