<template>
    <div class="main">
        <div class="mainContainer">
            <!--<div v-if="id">this is article with ID: <span>{{id}}</span></div>-->
            <!--<div v-else>Hello from main</div>-->
            <div class="contactHeader">
                <div class="contactPhoto">
                    Photo
                </div>
                <div v-if="contact.id" class="contactInfo">
                    <span class="contactName">{{contact.firstName + contact.lastName}}</span>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
                <div v-else class="newContactInfo">
                    <input v-model="contact.fullName" type="text" placeholder="Name">
                </div>
            </div>
            <div class="contactBody">
                <div v-if="contact.id">
                    <span class="email">{{contact.email}}</span>
                    <span class="mobile">{{contact.mobile}}</span>
                </div>
                <div v-else>
                    <label for="email">Email</label>
                    <search-component :id="email" :type="text" :v-model="contact.email"></search-component>
                    <label for="mobile">Mobile</label>
                    <search-component :id="mobile" :type="number" :v-model="contact.mobile"></search-component>
                    <button-component @click="addNewContact" :title="'Save changes'"></button-component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ButtonComponent from './ui/ButtonComponent'
  import SearchComponent from "./ui/SearchComponent";

export default {
  name: 'MainComponent',
  components: {
    SearchComponent,
    ButtonComponent
  },
  data () {
    return {
      id: '',
      contact: {
        id: '',
        fullName: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: ''
      }
    }
  },
  created () {
    this.id = this.$route.params.addressId
    if (this.id) {
      this.contact = this.$store.getters.findContactById(this.id)
    }
  },
  methods: {
    addNewContact () {
      this.$store.commit('addNewContact', this.contact)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mainContainer {
        position: relative;
        width: 80%;
        height: 100vh;
        margin: 0 auto;
    }
    .contactHeader {
        padding-top: 6rem;
    }
    .contactBody {
        width: 80%;
    }
    label {
        font-size: 2rem;
        margin-top: 3rem;
        color: #5D6479;
    }
</style>
