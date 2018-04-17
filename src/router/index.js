import VueRouter from 'vue-router'
import Vue from 'vue'
import MainComponent from '@/components/MainComponent'
import DisplayContact from '@/components/main/DisplayContact'
import EditContact from '@/components/main/EditContact'

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
        path: '/contact',
        name: 'newContact',
        component: EditContact
    },
    {
      path: '/contact/:id',
      component: MainComponent,
      children: [
          {
              path: '/',
              name: 'displayContact',
              component: DisplayContact
          },

          {
              path: 'edit',
              name: 'editContact',
              component: EditContact
          },
      ]
    }
  ]
})
