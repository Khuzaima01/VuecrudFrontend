<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>



<template>
  <nav class=" bg-gray-700 p-4">
    <router-link to="/" class="text-white mx-3 hover:text-blue-400">Create</router-link>
    <router-link to="/show/product" class="text-white mx-3 hover:text-blue-400">Show</router-link>
  </nav>
  <router-view></router-view>
</template>


<style scoped></style>
