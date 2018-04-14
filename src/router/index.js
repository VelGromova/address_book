import VueRouter from 'vue-router'
import Vue from 'vue'
import MainComponent from '@/components/MainComponent'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: MainComponent
    },
    {
      path: '/address/:addressId',
      name: 'address',
      component: MainComponent
    }
  ]
})
