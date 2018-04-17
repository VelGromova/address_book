import Vue from 'vue'
import VModal from 'vue-js-modal'
import Vue2Filters from 'vue2-filters'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VModal, { dialog: true })
Vue.use(Vue2Filters)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
