<template>
    <div class="main">
        <div class="main__container">
            <div v-if="contact.id">
                <div class="main__header eg-flexCenter">
                    <div class="contact__photo">
                        <span class="icon icon-avatar"></span>
                    </div>
                    <div class="contact__fullname">{{ fullName | truncate }}</div>
                    <div class="eg-flexCenter eg-justifyContentCenter">
                        <router-link
                                :to="{ name: 'editContact'}"
                                class="contact__action"
                        >
                            <span class="icon icon-edit"></span>
                        </router-link>
                        <div class="contact__action" @click="deleteContact">
                            <span class="icon icon-delete"></span>
                        </div>
                    </div>
                </div>
                <div class="main__content">
                    <div v-if="contact.email">
                        <h4 class="contact__field--title">Email</h4>
                        <p class="contact__field contact__value"> {{ contact.email }}</p>
                    </div>

                    <div v-if="contact.mobile">
                        <h4 class="contact__field--title">Mobile</h4>
                        <p class="contact__field contact__value"> {{ contact.mobile }}</p>
                    </div>

                    <div v-if="contact.address">
                        <h4 class="contact__field--title">Address</h4>
                        <p class="contact__field contact__value"> {{ contact.address }}</p>
                    </div>
                </div>
            </div>

            <div v-else>
                <h1 class="contact__not__found">Sorry, contact was not found in adress book</h1>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'DisplayContact',

    data () {
        return {
            contact: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                address: ''
            }
        }
    },

    mounted () {
        let contact = this.$store.getters.contact(this.$route.params.id)
        if (contact) {
            this.contact = contact
        }
    },

    computed: {
        fullName () {
            if (this.contact.lastName) {
                return this.contact.lastName + ' ' + this.contact.firstName
            }

            return this.contact.firstName
        }
    },

    methods: {
        deleteContact () {
            this.$modal.show('dialog', {
                title: 'Do you really want to delete this contact?',
                buttons: [
                    {
                        title: 'Yes',
                        handler: () => {
                            this.$store.dispatch('removeContactById', this.contact.id).then(() => {
                                this.$modal.hide('dialog')
                                this.$router.push({ name: 'index' })
                            })
                        }
                    },
                    {
                        title: 'No'
                    }
                ]
            })
        }
    }
}
</script>
