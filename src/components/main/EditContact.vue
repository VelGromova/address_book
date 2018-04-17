<template>
    <div class="main">
        <div class="main__container">
            <div class="main__header eg-flexCenter">
                <div class="contact__photo">
                    <span class="icon icon-avatar-edit"></span>
                </div>
                <div class="contact__fullname">
                    <input type="text" class="contact__field contact__input"
                           v-model="fullName"
                           placeholder="Type your name"
                    >
                </div>
                <div class="eg-flexCenter eg-justifyContentCenter">
                    <router-link
                            :to="{
                               name: 'displayContact',
                               params: { id: contact.id }
                            }"
                            v-if="contact.id"
                            class="contact__action"
                    >
                        <span class="icon icon-back-button"></span>
                    </router-link>
                </div>
            </div>

            <transition-group name="ef-opacity" class="main__content">
                <div v-if="!availableFieldsToAdd.email"
                     :key="'email'"
                     class="ef-transition-opacity"
                >
                    <h4 class="contact__field--title">Email</h4>
                    <input class="contact__field contact__input"
                           v-model="contact.email"
                           placeholder="Type your email"
                    >
                </div>

                <div v-if="!availableFieldsToAdd.mobile"
                     :key="'mobile'"
                     class="ef-transition-opacity"
                >
                    <h4 class="contact__field--title">Mobile</h4>
                    <input class="contact__field contact__input"
                           v-model="contact.mobile"
                           placeholder="Type your mobile"
                    >
                </div>

                <div v-if="!availableFieldsToAdd.address"
                     :key="'address'"
                     class="ef-transition-opacity"
                >
                    <h4 class="contact__field--title">Address</h4>
                    <input class="contact__field contact__input"
                           v-model="contact.address"
                           placeholder="Type your address"
                    >
                </div>

                <button
                        class="contact__field__new eg-flexCenter ef-transition-opacity"
                        v-if="isAddButtonAvailable"
                        :key="isAddButtonAvailable"
                        @click="selectFieldToAdd"
                >
                    <span class="icon icon-plus"></span>
                    <span>ADD INPUT FIELD</span>
                </button>
            </transition-group>
        </div>
        <modal
                :name="'selectField'"
                :height="'auto'"
        >
            <ul class="select__field__container">
                <li class="select__field"
                    v-for="(isAvailable, field) in availableFieldsToAdd"
                    v-if="isAvailable"
                    :key="field"
                    @click="addNewField(field)"
                >
                    {{ field }}
                </li>
            </ul>
        </modal>

        <transition name="ef-opacity">
            <div class="main__save__container ef-transition-opacity" v-if="isSaveButtonAvailable">
                <button
                        class="et-btn main__save__btn eg-flexCenter eg-justifyContentCenter"
                        @click="saveContact"
                >SAVE CHANGES</button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'EditContact',

    data () {
        return {
            fullName: '',

            contact: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                address: ''
            },

            availableFieldsToAdd: {
                email: true,
                mobile: true,
                address: true
            },

            isAddButtonAvailable: true,
            isSaveButtonAvailable: false
        }
    },

    watch: {
       fullName () {
           if (this.fullName && this.fullName !== ' ') {
               this.isSaveButtonAvailable = true
           }
       }
    },

    mounted () {
        let result = this.$store.getters.contact(this.$route.params.id)
        if (result) {
            this.contact = result
        }

        this.fullName = this.contact.firstName + ' ' + this.contact.lastName
        if (this.fullName === ' ') {
            this.fullName = ''
        }

        if (this.contact.email) {
            this.availableFieldsToAdd.email = false
        }

        if (this.contact.mobile) {
            this.availableFieldsToAdd.mobile = false
        }

        if (this.contact.address) {
            this.availableFieldsToAdd.address = false
        }
    },

    methods: {
        checkButtonToDisplay () {
            let isAddButtonAvailable = false
            for (let field in this.availableFieldsToAdd) {
                if (this.availableFieldsToAdd[field]) {
                    isAddButtonAvailable = true
                }
            }

            this.isAddButtonAvailable = isAddButtonAvailable
        },

        selectFieldToAdd () {
            this.$modal.show('selectField')
        },

        addNewField (field) {
            this.availableFieldsToAdd[field] = false
            this.$modal.hide('selectField')
            this.checkButtonToDisplay()
        },

        saveContact () {
            this.contact.firstName = this.fullName.split(' ')[0]
            this.contact.lastName = this.fullName.split(' ')[1]
            if (!this.contact.lastName) {
                this.contact.lastName = ''
            }

            if (!this.contact.id) {
                this.$modal.show('dialog', {
                    title: 'Create a new contact?',
                    buttons: [
                        {
                            title: 'Yes',
                            handler: () => {
                                this.$store.dispatch('addNewContact', this.contact).then(() => {
                                    this.$modal.hide('dialog')
                                    this.$router.push({name: 'index'})
                                })
                            }
                        },
                        {
                            title: 'No'
                        }
                    ]
                })
            } else {
                this.$modal.show('dialog', {
                    title: 'Save changes?',
                    buttons: [
                        {
                            title: 'Yes',
                            handler: () => {
                                this.$store.dispatch('updateContact', this.contact).then(() => {
                                    this.$modal.hide('dialog')
                                    this.$router.push({
                                        name: 'displayContact',
                                        params: { id: this.contact.id }
                                    })
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
}
</script>
