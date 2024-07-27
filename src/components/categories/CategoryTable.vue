<script setup>
import axiosInstance from '@/axios';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useFocus } from '@vueuse/core';
import { nextTick, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps(['category']);
const categoryName = ref(props.category.name);
const myInput = ref('null');
const emits = defineEmits(['delete-category']);
const isEditing = ref(false);

const editCategoryIcon = () => {
  if (isEditing.value) {
    isEditing.value = false;
  } else {
    isEditing.value = true
    nextTick(() => {
      myInput.value.focus()

    })
  }
};

const editCategory = async () => {
  const loadToastId = toast.loading('The Product is changing!', {
    theme: 'auto',
    position: 'bottom-right',
    transition: 'slide',
    dangerouslyHTMLString: true,
    isLoading: true,
  });
  try {
    const response = await axiosInstance.put(`/categories/${props.category._id}`, {name: categoryName.value});
    if (response.data.status === 'success') {
      toast.update(loadToastId, {
        type: 'success',
        render: 'The Category chenged successfully.',
        autoClose: 1500,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      });
      isEditing.value = false
    }
  } catch (error) {
    console.log(error);
    toast(error.message, {
      theme: 'auto',
      type: 'error',
      autoClose: 2000,
      transition: 'slide',
      dangerouslyHTMLString: true,
    });
    toast.remove(loadToastId);
  } 
}

const deleteCategory = async () => {
  const loadToastId = toast.loading('The Category is deleting!', {
    theme: 'auto',
    type: 'success',
    position: 'bottom-right',
    transition: 'slide',
    dangerouslyHTMLString: true,
    isLoading: true,
  });
  try {
    const response = await axiosInstance.delete(`/categorys/${props.category._id}`);
    if (response.data.status === 'success') {
      emits('delete-category', props.category._id);
      toast.update(loadToastId, {
        render: 'The Category deleted!',
        autoClose: 1500,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      });
    }
  } catch (error) {
    console.log(error);
    toast(error.message, {
      theme: 'auto',
      type: 'error',
      autoClose: 1700,
      transition: 'slide',
      dangerouslyHTMLString: true,
    });
  }
};
</script>

<template>
  <tr class="odd:text-gray-800 even:bg-gray-100">
    <th class="px-4 py-3">{{ category.ordinal_number }}</th>
    <th class="px-4 py-2 w-75">

        <input
        type="text"
        name="name"
        id="name"
        class="bg-transparent border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 w-50 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-primary-500 text-center"
        :class="{ 'border-opacity-0': !isEditing }"
        placeholder="Type category name"
        required="required"
        v-model="categoryName"
        ref="myInput"
        :disabled="!isEditing"
      />
      <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 ml-4 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 transition-all"
          :class="{'hidden':!isEditing}"
          @click="editCategory"
        >
          Save changes
        </button>
    </th>
    <th class="px-4 py-4 flex justify-center gap-4">
      <router-link :to="{ name: 'home' }">
        <font-awesome-icon
          class="px-1 text-blue-600 text-lg cursor-pointer"
          :icon="faEye"
        ></font-awesome-icon>
      </router-link>

      <font-awesome-icon
        @click="editCategoryIcon"
        class="px-1 text-green-600 text-lg cursor-pointer"
        :icon="faPenToSquare"
      ></font-awesome-icon>

      <font-awesome-icon
        @click="deleteCategory"
        class="px-1 text-red-600 text-lg cursor-pointer"
        :icon="faTrash"
      ></font-awesome-icon>
    </th>
  </tr>
</template>

<style scoped>
.v-leave-active {
  animation: removeEl 1s linear 0s 1 normal forwards;
}

@keyframes removeEl {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-50px);
    opacity: 0.5;
  }
}
</style>
