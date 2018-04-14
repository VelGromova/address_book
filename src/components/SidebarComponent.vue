<template>
    <div class="sidebar">
        <button-component :title="'Add contact'"></button-component>
    </div>
</template>

<script>
import ButtonComponent from './ui/ButtonComponent'
export default {
  name: 'SidebarComponent',
  components: {
    ButtonComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
