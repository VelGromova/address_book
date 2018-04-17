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
        contacts (state) {
            let contacts = JSON.parse(window.localStorage.getItem('contacts'))
            if (contacts) {
                state.contacts = contacts
            }

            return state.contacts
        },

        contact (state) {
            return id => {
                let contacts = JSON.parse(window.localStorage.getItem('contacts'))
                if (contacts) {
                    state.contacts = contacts
                }

                return state.contacts.find(contact => contact.id === id)
            }
        }
    },

    mutations: {
        addNewContact (state, contact) {
            contact.id = state.contacts.length + 1
            state.contacts.push(contact)
        },

        removeContactById (state, contactId) {
            state.contacts = state.contacts.filter(contactInStore => contactInStore.id !== contactId)
        },

        updateContact (state, contact) {
            state.contacts = state.contacts.map( existedContact => {
                if (existedContact.id === contact.id) {
                    return contact
                }

                return existedContact
            })
        }
    },

    actions: {
        addNewContact (context, contact) {
            context.commit('addNewContact', contact)
            window.localStorage.setItem('contacts', JSON.stringify(context.state.contacts))
        },

        updateContact (context, contact) {
            context.commit('updateContact', contact)
            window.localStorage.setItem('contacts', JSON.stringify(context.state.contacts))
        },

        removeContactById (context, contactId) {
            context.commit('removeContactById', contactId)
            window.localStorage.setItem('contacts', JSON.stringify(context.state.contacts))
        }
    }
})
