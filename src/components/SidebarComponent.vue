<template>
    <div class="sidebar">
        <div class="sidebarContainer">
            <div class="searchField">
                <label for="name">Contacts</label>
                <searchComponent :placeholder="'Search'"></searchComponent>
            </div>
            <input id="name" type="text" v-model="searchString">
            <ul class="contactList">
                <li class="contactItem" v-for="contact in contacts">
                    <span class="lastName">{{contact.lastName}}</span>,
                    <span>{{contact.firstName}}</span>
                </li>
            </ul>
            <button-component :title="'Add contact'"></button-component>
        </div>
    </div>
</template>

<script>
import ButtonComponent from './ui/ButtonComponent'
import SearchComponent from './ui/SearchComponent'

export default {
  name: 'SidebarComponent',
  components: {
    ButtonComponent,
    SearchComponent
  },
  data () {
    return {
      contacts: [],
      searchString: ''
    }
  },
  created () {
    this.contacts = this.$store.getters.getAllContacts
  },

  watch: {
    searchString () {
      this.contacts = this.$store.getters.getAllContacts.filter(contact => {
        let fullName = contact.firstName + contact.lastName;

        return fullName.includes(this.searchString);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .sidebarContainer {
        position: relative;
        height: 100vh;
        width: 90%;
        margin: 0 auto;
    }
    .searchField {
        padding-top: 6rem;
    }
    .contactList {
        padding: 0;
    }
    .contactItem {
        list-style-type: none;
        letter-spacing: 0.1rem;
    }
    .contactItem:active {
        background-color: #b3b3b3;
    }
    .lastName {
        font-family: 'Poppins Bold';
    }

</style>
