<template>
  <div id="app">
    <sidebar-component></sidebar-component>
    <main-component></main-component>
  </div>
</template>

<script>
import SidebarComponent from './components/SidebarComponent.vue'
import MainComponent from './components/MainComponent.vue'

export default {
  name: 'app',
  components: {
    SidebarComponent,
    MainComponent
  }
}
</script>

<style>

</style>
