<template>
  <div class="app__container eg-flex">
    <sidebar-component></sidebar-component>
    <transition name="ef-opacity" mode="out-in">
      <router-view :key="$route.path" class="eg-flex11 ef-transition-opacity"></router-view>
    </transition>
    <v-dialog/>
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

<style lang="scss">
@import 'assets/scss/all';
</style>
