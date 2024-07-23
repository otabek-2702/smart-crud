<script setup>
import axiosInstance, { getToken } from '@/axios';
import Product from '@/components/products/Product.vue';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

const products = ref([]);

onMounted(async () => {
  const response = await axiosInstance.get('/products');
  products.value = response.data.data.map((el) => {
    const date = new Date(el.createdAt);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    let result = `${day}-${month}-${year}`;

    return { ...el, createdAt: result };
  });
});
onMounted(() => {
  getToken() &&
    toast('You logged in succesfully', {
      theme: 'auto',
      type: 'success',
      position: 'bottom-right',
      autoClose: 1500,
      transition: 'slide',
      dangerouslyHTMLString: true,
    });
});
</script>

<template>
  <body class="bg-gray-200 h-screen">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-2xl">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border-b-2 border-gray-200">№</th>
              <th class="py-2 px-4 border-b-2 border-gray-200">Name</th>
              <th class="py-2 px-4 border-b-2 border-gray-200">Created data</th>
              <th class="py-2 px-4 border-b-2 border-gray-200">Price</th>
              <th class="py-2 px-4 border-b-2 border-gray-200">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            <Product
              v-for="product in products"
              :key="product._id"
              :product="{ ordinal_number: products.length + 1, ...product }"
            />
          </tbody>
        </table>
      </div>
    </div>
  </body>
</template>

<style scoped>
</style>
