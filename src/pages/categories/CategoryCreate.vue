<script setup>
import axiosInstance from '@/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const isLoading = ref(false);
const category = ref();



const handleSubmit = async () => {
  const loadToastId = toast.loading('The Category is creating!', {
    theme: 'auto',
    position: 'bottom-right',
    transition: 'slide',
    dangerouslyHTMLString: true,
    isLoading: true,
  });
  try {
    const response = await axiosInstance.post('/categories', { name: category.value });
    if (response.data.status === 'success') {
      toast.update(loadToastId, {
        type: 'success',
        render: 'The Category created successfully.',
        autoClose: 1500,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      });
      router.push({name: 'categories'});
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
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create a category</h2>
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Category Name</label
            >
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type category name"
              required="required"
              v-model="category"
            />
          </div>


        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Save changes
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
