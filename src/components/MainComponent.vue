<template>
    <div class="main">
        <div v-if="id">this is article with ID: <span>{{id}}</span></div>
        <div v-else>Hello from main</div>
    </div>
</template>

<script>
export default {
  name: 'MainComponent',
  data () {
    return {
      id: '',
      profile: {
        name: '',
        surname: ''
      }
    }
  },
  created () {
    this.id = this.$route.params.addressId;
    console.log(this.$route);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
