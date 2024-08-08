<script setup>
import { onMounted } from 'vue';
import { getToken } from '@/axios';
import { toast } from 'vue3-toastify';

onMounted(() => {
  if (getToken() && !sessionStorage.getItem('logged')) {
    toast('You logged in succesfully', {
      theme: 'auto',
      type: 'success',
      position: 'bottom-right',
      autoClose: 1500,
      transition: 'slide',
      dangerouslyHTMLString: true,
    });
    sessionStorage.setItem('logged', '1');
  } else if(!getToken() ) {
    router.push({name: 'login'})
  }
});
</script>

<template>
  <div>
    <h1 class="text-h1 text-center mt-16">
      Welcome to our
      <span class="font-semibold text-green">C</span><span class="font-semibold text-blue">R</span
      ><span class="font-semibold text-yellow-darken-2">U</span
      ><span class="font-semibold text-red">D</span>
      system creted by our command
    </h1>
    <h2 class="text-center mt-7">
      <router-link :to="{ name: 'products' }" class="text-2xl text-blue underline"
        >Products</router-link
      >
    </h2>
  </div>
</template>

<style scoped></style>
