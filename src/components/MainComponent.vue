<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import DisplayContact from './main/DisplayContact'
import EditContact from './main/EditContact'

export default {
    name: 'MainComponent',

    components: {
        DisplayContact,
        EditContact
    }
}
</script>

<style scoped></style>
