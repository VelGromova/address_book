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
        position: absolute;
        width: 100%;
        height: 45px;
        bottom: 0;
        color: #fff;
        background: #6cc04a;
        text-transform: uppercase;
        font: 1rem / 1 Poppins;
        border: 0;
        outline: none;
    }

</style>
