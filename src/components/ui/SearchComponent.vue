<template>
    <div class="search">
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
        width: 100%;
        height: 60px;
    }

</style>
