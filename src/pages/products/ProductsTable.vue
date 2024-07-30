<script setup>
import axiosInstance, { getToken } from '@/axios';
import ProductTable from '@/components/products/ProductTable.vue';
import {  transformProductsData } from '@/utilities';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const { query } = useRoute();
const products = ref([]);
const categories = ref([]);
const filterCategory = ref(query.c ?? '');
const isLoading = ref(false);

watch(filterCategory, (newVal) => {
  if (newVal != query.c) {
    products.value = getProducts(newVal);
  }
});

const getProducts = async (categoryFilter) => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get('/products');
    if (!categories.value.length) {
      const responseCategories = await axiosInstance.get('/categories');
      categories.value = responseCategories.data.data;
    }
    products.value = transformProductsData(
      response.data.data,
      categories.value,
      categoryFilter ?? '',
    ); // ordinal number is adding from this util
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

onMounted(() => {
  getProducts(query.c ?? '');
});
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
  }
});

// delete product from local data

const deleteProductLocal = (id) => {
  products.value = products.value.filter((p) => p._id !== id);
};
</script>

<template>
  <loading-spinner v-if="isLoading" />
  <body class="bg-gray-200 pb-8" style="min-height: 90vh">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="d-flex pt-3 pb-4">
        <div>
          <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Category</label
          >
          <select
            id="category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            v-model="filterCategory"
          >
            <option :selected="true" value="">All Categories</option>
            <option
              v-for="category in categories"
              :selected="category._id == filterCategory"
              :key="category._id"
              :value="category._id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <v-spacer></v-spacer>
        <button
          type="button"
          @click="router.push({ name: 'product-create' })"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
        >
          Add product
        </button>
      </div>
      <div class="flex justify-center" v-if="!products.length">
        <img src="@/assets/nodata.png" alt="" />
      </div>
      <div v-else>
        <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-2xl">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border-b-2 border-gray-200">№</th>
              <th class="py-2 px-4 border-b-2 border-gray-200">Name</th>
              <th class="py-2 px-4 border-b-2 border-gray-200">Category</th>
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
