import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        id: 1,
        firstName: 'Lonneke',
        lastName: 'Faber',
        email: 'lonneke.faber@wonderkind.com',
        mobile: '06-12345678'
      },
      {
        id: 2,
        firstName: 'Don',
        lastName: 'Kooijman',
        email: 'don.kooijman@wonderkind.com',
        mobile: '06-12345678'
      },
      {
        id: 3,
        firstName: 'Amar',
        lastName: 'Muric',
        email: 'amar.muric@wonderkind.com',
        mobile: '06-12345678'
      }
    ]
  },
  getters: {
    getAllContacts (state) {
      return state.contacts
    }
  },
  mutation: {

  },
  actions: {

  }
})
