<script setup>
import axiosInstance from '@/axios';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps(['product']);
const emits = defineEmits(['delete-product']);

const deleteProduct = async () => {
  const loadToastId = toast.loading('The Product is deleting!', {
    theme: 'auto',
    type: 'success',
    position: 'bottom-right',
    transition: 'slide',
    dangerouslyHTMLString: true,
    isLoading: true,
  });
  try {
    const response = await axiosInstance.delete(`/products/${props.product._id}`);
    if (response.data.status === 'success') {
      emits('delete-product', props.product._id);
      toast.update(loadToastId, {
        render: 'The Product deleted!',
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
    toast.remove(loadToastId);
  }
};
</script>

<template>
  <tr class="odd:text-gray-800 even:bg-gray-100">
    <th class="px-4 py-3">{{ product.ordinal_number }}</th>
    <th class="px-4 py-3">
      <router-link :to="{ name: 'products-view', params: { id: product._id } }">
        {{ product.name }}
      </router-link>
    </th>
    <th class="px-4 py-3">{{ product.createdAt }}</th>
    <th class="px-4 py-3">{{ product.price }} usd</th>
    <th class="px-4 py-3 flex justify-center gap-4">
      <router-link :to="{ name: 'product-edit', params: { id: product._id } }">
        <font-awesome-icon
          class="px-1 text-green-600 text-lg cursor-pointer"
          :icon="faPenToSquare"
        ></font-awesome-icon>
      </router-link>

      <font-awesome-icon
        @click="deleteProduct"
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
