<template>
    <div class="sidebar eg-col6">
        <div class="sidebar__container">
            <router-link :to="{ name: 'index' }" class="sidebar__title">Contacts</router-link>
            <div class="sidebar__search--container eg-flex eg-justifyContentCenter">
                <span class="icon icon-search"></span>
                <input type="text" v-model="searchString" class="sidebar__search" placeholder="SEARCH"/>
            </div>
            <vue-scrollbar classes="sidebar__scrollbar">
                <transition name="ef-opacity" mode="out-in">
                    <div v-if="searchString"
                         :key="searchString"
                         class="ef-transition-opacity sidebar__search__results"
                    >
                        <h1 class="sidebar__search__results--title">{{ searchString }}</h1>
                        <ul class="sidebar__search__results--container">
                            <li v-for="(contact, index) in searchedContacts" :key="index">
                                <router-link
                                        class="sidebar__search__results--single"
                                        :to="{ name: 'displayContact', params: { id: contact.id }}"
                                        v-html="hightlightContactInfo(contact, searchString)"
                                ></router-link>
                            </li>
                        </ul>
                    </div>

                    <div v-else>
                        <div v-for="(contactsList, groupedKey) in sortedContacts"
                             :key="groupedKey"
                             class="ef-transition-opacity sidebar__search__results"
                        >
                            <h1 class="sidebar__search__results--title">{{ groupedKey }}</h1>
                            <ul class="sidebar__search__results--container">
                                <li v-for="(contact, index) in contactsList" :key="index">
                                    <router-link
                                            class="sidebar__search__results--single"
                                            :to="{
                                                name: 'displayContact',
                                                params: { id: contact.id }
                                            }"
                                            v-html="hightlightContactInfo(contact)"
                                    ></router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </vue-scrollbar>
            <transition name="ef-opacity">
                <router-link
                        v-if="$route.name !== 'editContact' && $route.name !== 'newContact' "
                        :key="$route.path"
                        :to="{ name: 'newContact' }"
                        class="et-btn sidebar__btn eg-flexCenter eg-justifyContentCenter ef-transition-opacity"
                >
                    <span class="icon icon-plus-white"></span>
                    <span class="sidebar__btn--title">ADD CONTACT</span>
                </router-link>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as _ from 'lodash'
import VueScrollbar from 'vue2-scrollbar'

export default {
    name: 'SidebarComponent',

    components: { VueScrollbar },

    data() {
        return {
            searchString: '',
            searchedContacts: [],
            sortedContacts: []
        }
    },

    computed: {
        ...mapGetters(['contacts'])
    },

    watch: {
        searchString() {
            this.generateSearchedContactes()
        },

        contacts () {
            this.generateSortedContacts()
            this.generateSearchedContactes()
        }
    },

    mounted () {
        this.generateSortedContacts()
    },

    methods: {
        generateSortedContacts () {
            this.sortedContacts = _.groupBy(this.contacts, contact => {
                if (contact.lastName) {
                    return contact.lastName.charAt(0)
                }

                return contact.firstName.charAt(0)
            })
        },

        generateSearchedContactes () {
            this.searchedContacts = this.contacts.filter(contact => {
                let fullName = contact.firstName + contact.lastName;

                return fullName.includes(this.searchString);
            })
        },

        hightlightContactInfo (contact, substring) {
            let matchedString = substring
            let result = contact.firstName
            if (!substring) {
                matchedString = contact.firstName
            }

            if (contact.lastName) {
                result = contact.lastName + ', ' + contact.firstName
                if (!substring) {
                    matchedString = contact.lastName
                }
            }

            return result.replace(
                new RegExp(matchedString, "ig"),
                matchedTxt => "<span class='highlighted'>" + matchedTxt + "</span>"
            )
        }
    }
}
</script>
