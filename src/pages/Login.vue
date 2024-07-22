<script setup>
import axiosInstance from '@/axios';
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoading = ref(false);

const email = ref('');
const password = ref('');
const doRemember = ref(true);

// watch();

const saveAuth = (response) => {
  console.log('first');
  if (doRemember.value) {
    localStorage.setItem('authToken', response.data.data);
    router.push({ name: 'products' });
  } else {
    sessionStorage.setItem('authToken', response.data.data);
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
      saveAuth(adminResponse)
      localStorage.setItem('isAdmin', true);
    }
  } catch (error) {
    console.log(error);
  }
  try {
    const sellerResponse = await axiosInstance.post('/sellers/login', {
      email: email.value,
      password: password.value,
    });

    if (sellerResponse.status === 200) {
      saveAuth(sellerResponse)
    }
  } catch (error) {
    console.log(error);
  }

  // if (response.status === 200) {
  //   console.log('first');
  //   if (doRemember.value) {
  //     localStorage.setItem('authToken', response.data.data);
  //     router.push({ name: 'products' });
  //   } else {
  //     sessionStorage.setItem('authToken', response.data.data);
  //     router.push({ name: 'products' });
  //   }
  //   router.push({ name: 'products' });
  // }

  isLoading.value = false;
};
</script>

<template>
  <LoadingSpinner v-if="isLoading" />
  <!-- Toast -->
  <div class="absolute bottom-3 end-2">
    <div
      class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
      role="alert"
    >
      <div class="flex p-4">
        <div class="flex-shrink-0">
          <svg
            class="flex-shrink-0 size-4 text-red-500 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
            ></path>
          </svg>
        </div>
        <div class="ms-3">
          <p class="text-sm text-gray-700 dark:text-neutral-400">
            Email yoki parol xato kiritilgan
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- End Toast -->

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
