<script setup>
import { useRoute } from 'vue-router';
import Navbar from './components/navbar/Navbar.vue';
const route = useRoute()

</script>

<template>
  <Navbar v-if="route.name !== 'login'" />
  <router-view></router-view>
</template>

<style scoped></style>
