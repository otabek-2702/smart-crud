<script setup>
import axiosInstance from '@/axios';
import CategoryTable from '@/components/categories/CategoryTable.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const categories = ref([]);
const isLoading = ref(false);

const getCategorys = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get('/categories');
    categories.value = response.data.data.map((el,i) => ({...el, ordinal_number: i+1}))
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

onMounted(() => getCategorys());


// delete category from local data

const deleteCategoryLocal = (id) => {
  categories.value = categories.value.filter((c) => c._id !== id);
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
          @click="router.push({name: 'categories-create'})"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
        >
          Add category
        </button>
      </div>
      <div>
        <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-2xl">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border-b-2 border-gray-200">№</th>
              <th class="py-2 px-4 border-b-2 border-gray-200">Name</th>
              <th class="py-2 px-4 border-b-2 border-gray-200">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            <CategoryTable
            @delete-category="deleteCategoryLocal"
              v-for="category in categories"
              :key="category._id"
              :category="category"
            />
          </tbody>
        </table>
      </div>
    </div>
  </body>
</template>

<style scoped></style>
