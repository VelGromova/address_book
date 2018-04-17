import SidebarComponent from '@/components/SidebarComponent'
import { shallow, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import { expect } from 'chai'

describe('SidebarComponent.vue', () => {
    let localVue
    let wrapper
    let router

    let computed = {
        contacts () {
            return [
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
        }
    }

    beforeEach(() => {
        localVue = createLocalVue()
        localVue.use(VueRouter)
        router = new VueRouter()

        wrapper = shallow(SidebarComponent, {
            localVue,
            router,
            computed,
            stubs: { 'VueScrollbar': '<div></div>' }
        })
    })

    afterEach(() => {
        wrapper.vm.$destroy()
    })

    it('Should correct sort the contacts by second name', () => {
        let expectedResult = {
            F: [{
                id: 1,
                firstName: 'Lonneke',
                lastName: 'Faber',
                email: 'lonneke.faber@wonderkind.com',
                mobile: '06-12345678',
                address: ''
            }],
            K: [{
                id: 2,
                firstName: 'Don',
                lastName: 'Kooijman',
                email: 'don.kooijman@wonderkind.com',
                mobile: '06-12345678',
                address: ''
            }],
            M: [{
                id: 3,
                firstName: 'Amar',
                lastName: 'Muric',
                email: 'amar.muric@wonderkind.com',
                mobile: '06-12345678',
                address: ''
            }]
        }

        wrapper.vm.generateSortedContacts()

        expect(wrapper.vm.sortedContacts).to.deep.equal(expectedResult)
    })

    it('Should correct generate contacts list by search input', () => {
        let expectedFoundResult = [{
            id: 1,
            firstName: 'Lonneke',
            lastName: 'Faber',
            email: 'lonneke.faber@wonderkind.com',
            mobile: '06-12345678',
            address: ''
        }]

        wrapper.setData({searchString: 'Fa'})
        expect(wrapper.vm.searchedContacts).to.deep.equal(expectedFoundResult)

        wrapper.setData({searchString: 'Faber'})
        expect(wrapper.vm.searchedContacts).to.deep.equal(expectedFoundResult)

        wrapper.setData({searchString: 'Should not found'})
        expect(wrapper.vm.searchedContacts).to.deep.equal([])
    })

    it('Should correct highlight the contact', () => {
        let contact = {
            id: 1,
            firstName: 'Lonneke',
            lastName: 'Faber',
            email: 'lonneke.faber@wonderkind.com',
            mobile: '06-12345678',
            address: ''
        }

        expect(wrapper.vm.hightlightContactInfo(contact)).to.equal('<span class=\'highlighted\'>Faber</span>, Lonneke')
        expect(wrapper.vm.hightlightContactInfo(contact, 'Fa')).to.equal('<span class=\'highlighted\'>Fa</span>ber, Lonneke')
        expect(wrapper.vm.hightlightContactInfo(contact, 'Not highlighted')).to.equal('Faber, Lonneke')
    })
})
