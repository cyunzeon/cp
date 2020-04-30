import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
  base: process.env.BASE_URL,
  routes: [{
    path: '/index/:gid',
    name: 'index',
    component: () => import('@/pages/lottery'),
  },{
    path: '/type/:gid',
    name: 'type',
    component: () => import('@/pages/type'),
  }]
})
