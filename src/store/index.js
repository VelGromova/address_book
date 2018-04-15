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
        mobile: '06-12345678',
        address: ''
      },
      {
        id: 2,
        firstName: 'Don',
        lastName: 'Kooijman',
        email: 'don.kooijman@wonderkind.com',
        mobile: '06-12345678',
        address: ''
      },
      {
        id: 3,
        firstName: 'Amar',
        lastName: 'Muric',
        email: 'amar.muric@wonderkind.com',
        mobile: '06-12345678',
        address: ''
      }
    ]
  },
  getters: {
    getAllContacts (state) {
      return state.contacts
    },
    findContactById (state) {
      return id => {
        let result = state.contacts.find(contact => contact.id == id)
        if (!result) {
          return {}
        }

        return result
      }
    }
  },
  mutation: {
    addNewContact (state, contact) {
      state.contacts.push(contact)
    },
    removeContact (state, contact) {
      state.contacts.filter(
        contactInStore => contactInStore != contact
      )}
  },
  actions: {

  }
})
