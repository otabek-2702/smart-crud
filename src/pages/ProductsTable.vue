<script setup>
import axiosInstance, { getToken } from '@/axios';
import ProductTable from '@/components/products/ProductTable.vue';
import { transformCreatedAtValue } from '@/utilities';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const products = ref([]);
const isLoading = ref(false);

const getProducts = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get('/products');
    products.value = transformCreatedAtValue(response.data.data) // ordinal number is adding from this util
  } catch (error) {
    console.log(error);
    toast(error.message, {
      theme: 'auto',
      type: 'error',
      autoClose: 1700,
      transition: 'slide',
      dangerouslyHTMLString: true,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => getProducts());
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
    sessionStorage.setItem('logged', '1')
  }
})

// delete product from local data

const deleteProductLocal = (id) => {
  products.value = products.value.filter((p) => p._id !== id);
};
</script>

<template>
  <loading-spinner v-if="isLoading" />
  <body class="bg-gray-200 min-[h-screen] pb-8">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="d-flex pt-3 pb-4">
        <v-spacer></v-spacer>
        <button
          type="button"
          @click="router.push({name: 'product-create'})"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
        >
          Add product
        </button>
      </div>
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
            <ProductTable
              @delete-product="deleteProductLocal"
              v-for="product in products"
              :key="product._id"
              :product="product"
            />
          </tbody>
        </table>
      </div>
    </div>
  </body>
</template>

<style scoped></style>
