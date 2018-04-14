<template>
    <div class="button">
        <button>{{title}}</button>
    </div>
</template>

<script>
  export default {
    name: 'ButtonComponent',
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    button {
        background-color: #6cc04a;
    }

</style>
