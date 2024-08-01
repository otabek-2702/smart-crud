<script setup>
import axiosInstance from '@/axios';
import { useAbility } from '@casl/vue';
import { nextTick, ref } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps(['category']);
const emits = defineEmits(['delete-category'])
const {can} = useAbility()
const categoryName = ref(props.category.name);
const myInput = ref(null);
const isEditing = ref(false);
const dialog = ref(false);

const editCategoryIcon = () => {
  if (isEditing.value) {
    isEditing.value = false;
  } else {
    isEditing.value = true;
    nextTick(() => {
      myInput.value.focus();
    });
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
    const response = await axiosInstance.put(`/categories/${props.category._id}`, {
      name: categoryName.value,
    });
    if (response.data.status === 'success') {
      toast.update(loadToastId, {
        type: 'success',
        render: 'The Category chenged successfully.',
        autoClose: 1500,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      });
      isEditing.value = false;
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

const deleteCategory = async () => {
  dialog.value = false;
  const loadToastId = toast.loading('The Category is deleting!', {
    theme: 'auto',
    type: 'success',
    position: 'bottom-right',
    transition: 'slide',
    dangerouslyHTMLString: true,
    isLoading: true,
  });
  try {
    const response = await axiosInstance.delete(`/categories/${props.category._id}`);
    if (response.data.status === 'success') {
      toast.update(loadToastId, {
        render: 'The Category deleted!',
        autoClose: 1500,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      });
      emits('delete-category', props.category._id)
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
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card
      prepend-icon="mdi-map-marker"
      text="With deleting this category you will delete all associated with it products!"
      title="Confirmation"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog = false"> Disagree </v-btn>

        <v-btn @click="deleteCategory"> Agree </v-btn>
      </template>
    </v-card>
  </v-dialog>
  <tr class="odd:text-gray-800 even:bg-gray-100">
    <th class="px-4 py-3">{{ category.ordinal_number }}</th>
    <th class="px-4 py-2 w-75">
      <input
        type="text"
        name="name"
        id="name"
        class="bg-transparent border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 w-50 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500 text-center"
        :class="{ 'border-opacity-0': !isEditing }"
        placeholder="Type category name"
        required="required"
        v-model="categoryName"
        ref="myInput"
        :disabled="!isEditing"
      />
    </th>
    <th class="px-4 py-4 flex justify-center gap-4">
      <router-link v-if="can('read', 'Products')" :to="{ name: 'products', query:{c: category._id} }">
        <font-awesome-icon
          class="px-1 text-blue-600 text-lg cursor-pointer"
          icon="fa fa-eye"
        ></font-awesome-icon>
      </router-link>

      <font-awesome-icon
        @click="editCategory"
        class="px-1 text-green-600 text-lg cursor-pointer"
        icon="fas fa-circle-check"
        v-if="isEditing"
      >
      </font-awesome-icon>

      <font-awesome-icon
      v-if="can('edit', 'Category')"
        @click="editCategoryIcon"
        class="px-1 text-green-600 text-lg cursor-pointer"
        icon="fas fa-pen-to-square"
      ></font-awesome-icon>

      <font-awesome-icon
      v-if="can('delete', 'Category')"
        @click="dialog = true"
        class="px-1 text-red-600 text-lg cursor-pointer"
        icon="fas fa-trash"
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
