<script setup>
import axiosInstance from '@/axios';
import {  ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();

const isLoading = ref(false);
const errorMessage = ref('');

const email = ref('');
const password = ref('');
const doRemember = ref(true);

watch(errorMessage, (newVal) => {
  if (newVal.lastIndexOf('401')) {
    errorMessage.value = 'Email yoki Parol xato kiritilgan ';
  }
});

const saveAuth = (token) => {
  if (doRemember.value) {
    localStorage.setItem('authToken', token);
    router.push({ name: 'products' });
  } else {
    sessionStorage.setItem('authToken', token);
    router.push({ name: 'products' });
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const adminResponse = await axiosInstance.post('/admins/login', {
      email: email.value,
      password: password.value,
    });

    if (adminResponse.status === 200) {
      saveAuth(adminResponse.data.data);
      localStorage.setItem('isAdmin', true);
    }
  } catch (error) {
    console.log(error);
    errorMessage.value = error.message;
  }
  try {
    const sellerResponse = await axiosInstance.post('/sellers/login', {
      email: email.value,
      password: password.value,
    });

    if (sellerResponse.status === 200) {
      saveAuth(sellerResponse.data.data);
    }

    // reset error message
    errorMessage.value = '';
  } catch (error) {
    console.log(error);
  }
  errorMessage.value &&
    toast(errorMessage, {
      theme: 'auto',
      type: 'error',
      position: 'bottom-right',
      autoClose: 2000,
      transition: 'slide',
      dangerouslyHTMLString: true,
    });

  isLoading.value = false;
};
</script>

<template>
  <loading-spinner v-if="isLoading" />

  <!-- section -->
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="handleSubmit">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model="email"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                v-model="password"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    :checked="true"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                    v-model="doRemember"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 hover:border-blue-700 text-white font-bold py-2 px-2 border-b-4 border-blue-600 rounded-lg transition duration-200 transform hover:scale-105 active:border-b-20 w-full flex justify-center"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
