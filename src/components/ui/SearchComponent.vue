<template>
    <div class="search">
        <label for="search">Contacts</label>
        <input type="text" class="searchInput" id="search">
        <svg></svg>
    </div>
</template>


<script>
  export default {
    name: 'SearchComponent',
  }
</script>

<style scoped>
    .searchInput {
        border: 1px solid lightgray;
        border-radius: 10px;
        width: 380px;
        height: 60px;
    }
    label {
        font-size: 2rem;
        margin-top: 3rem;
    }

</style>
