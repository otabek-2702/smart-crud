<script setup>
import axiosInstance from '@/axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const isLoading = ref(false);
const product = ref({});
const categories = ref([]);

const getProduct = async () => {
  isLoading.value = true;
  try {
    const responseCategories = await axiosInstance.get(`categories/`);
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
  const loadToastId = toast.loading('The Product is creating!', {
    theme: 'auto',
    position: 'bottom-right',
    transition: 'slide',
    dangerouslyHTMLString: true,
    isLoading: true,
  });
  try {
    const { name, price, category } = product.value;
    const response = await axiosInstance.post('/products', { name, price, category });
    if (response.data.status === 'success') {
      toast.update(loadToastId, {
        type: 'success',
        render: 'The Product created successfully.',
        autoClose: 1500,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      });
      router.push({name:'products'});
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
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create a product</h2>
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
              required="required"
              v-model="product.name"
            />
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Category</label
            >
            <select
              id="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required="required"
              v-model="product.category"
            >
              <option selected="" disabled="">Select category</option>
              <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
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
              required="required"
              v-model="product.price"
            />
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Create Product
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
