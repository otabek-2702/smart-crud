<script setup>
import axiosInstance from '@/axios';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter()
const {
  params: { id },
  query,
} = useRoute();
const isLoading = ref(false);
const product = ref({});
const categories = ref([]);
const isView = Object.entries(query).some((q) => q[0] === 'v');

const pageTitle = computed(() => (isView ? 'View a Product' : 'Edit a Product'));

const forwardToCategory = () => {
  console.log('f')
  if (isView) {
    router.push({name: 'products', query: {c: product.value.category}})
  }
}

const getProduct = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`products/${id}`);
    const responseCategories = await axiosInstance.get(`categories/`);
    product.value = await response.data.data;
    categories.value = await responseCategories.data.data;
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

onMounted(() => getProduct());

const handleSubmit = async () => {
  const loadToastId = toast.loading('The Product is changing!', {
    theme: 'auto',
    position: 'bottom-right',
    transition: 'slide',
    dangerouslyHTMLString: true,
    isLoading: true,
  });
  try {
    const { name, price, category } = product.value;
    const response = await axiosInstance.put(`/products/${id}`, { name, price, category });
    if (response.data.status === 'success') {
      toast.update(loadToastId, {
        type: 'success',
        render: 'The Product chenged successfully.',
        autoClose: 1500,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      });
      router.push('/products');
    }
  } catch (error) {
    console.log(error);
    toast.update(loadToastId, {
      type: 'error',
      render: error.message,
      autoClose: 1500,
      theme: 'auto',
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    });
  }
};
</script>

<template>
  <loading-spinner v-if="isLoading" />

  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">{{ pageTitle }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Product Name</label
            >
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
              v-model="product.name"
              :disabled="isView"
            />
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              @click="forwardToCategory"
              :class="{
                'cursor-pointer': isView
              }"
              >Category 
              <font-awesome-icon
              class="text-sm"
              icon="fas fa-chevron-right"
              v-if="isView"
              >

              </font-awesome-icon>
              </label            >
            <select
              id="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              v-model="product.category"
              :disabled="isView"
            >
              <option selected="" disabled>Select category</option>
              <option
                v-for="category in categories"
                :selected="category._id == product.category"
                :key="category._id"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="w-full">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Price</label
            >
            <input
              type="number"
              name="price"
              id="price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="$2999"
              v-model="product.price"
              :disabled="isView"
            />
          </div>
        </div>
        <button
          type="submit"
          v-if="!isView"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Save changes
        </button>
        <button
          type="button"
          @click="()=>router.back()"
          v-else
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
        <font-awesome-icon :icon="faChevronLeft" class="pr-2"></font-awesome-icon>
          Back
        </button>
        
      </form>
    </div>
  </section>
</template>

<style scoped></style>
