<script setup>
const handleLogOut = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  router.replace({ name: 'login' });
};
</script>

<template>
  <header
    class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-1 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700"
  >
    <nav
      class="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex items-center justify-between">
        <a class="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="SMART IT"
          >SMART IT</a
        >
        <div class="sm:hidden">
          <button
            type="button"
            class="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
            data-hs-collapse="#navbar-collapse-with-animation"
            aria-controls="navbar-collapse-with-animation"
            aria-label="Toggle navigation"
          >
            <svg
              class="hs-collapse-open:hidden size-4"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            <svg
              class="hs-collapse-open:block flex-shrink-0 hidden size-4"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="navbar-collapse-with-animation"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
          <span
            class="text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
          >
            <router-link
              class="py-3 ps-px sm:px-3 font-medium"
              active-class="text-blue-600 dark:text-blue-500"
              to="/"
              >Products
            </router-link>
          </span>
          <span
            class="text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
          >
            <router-link
              class="py-3 ps-px sm:px-3 font-medium"
              active-class="text-blue-600 dark:text-blue-500"
              to="/categories"
            >
              Categories
            </router-link>
          </span>
          <a
            @click="handleLogOut"
            class="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500"
            href="#"
          >
            <svg
              class="flex-shrink-0 size-4"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M8 8L4 12M4 12L8 16M4 12L16 12"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Log out
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
