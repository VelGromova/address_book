<template>
    <div class="sidebar">
        <button-component :title="'Add contact'"></button-component>
        <!--<search-component></search-component>-->
        <input type="text" v-model="searchString">
        <ul>
            <li v-for="contact in contacts">
                <span class="lastName">{{contact.lastName}}</span>,
                <span>{{contact.firstName}}</span>
            </li>
        </ul>
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
    .sidebar {
        width: 30%;
    }

</style>
