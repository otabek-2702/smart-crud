<script setup>
import axiosInstance from '@/axios';
import { useAbility } from '@casl/vue';
import { toast } from 'vue3-toastify';

const props = defineProps(['product']);
const emits = defineEmits(['delete-product']);

const {can} = useAbility()

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
  <tr class="odd:text-gray-800 even:bg-gray-100">
    <th class="px-4 py-3">{{ product.ordinal_number }}</th>
    <th class="px-4 py-3">
      <router-link v-if="can('read', 'Product')" :to="{ path: `products/${product._id}`, query: { v: null } }">
        {{ product.name }}
      </router-link>
      <span v-else>
        {{ product.name }}
      </span>
    </th>
    <th class="px-4 py-3">
      {{ product.category_name }}
    </th>
    <th class="px-4 py-3">{{ product.createdAt }}</th>
    <th class="px-4 py-3">{{ product.price }} usd</th>
    <th class="px-4 py-3 flex justify-center gap-4" v-if="can('edit', 'Product') || can('delete', 'Product')">
      <router-link :to="{ name: 'product-edit', params: { id: product._id } }">
        <font-awesome-icon
        v-if="can('edit', 'Product')"
          class="px-1 text-green-600 text-lg cursor-pointer"
          icon="fas fa-pen-to-square"
        ></font-awesome-icon>
      </router-link>

      <font-awesome-icon
      v-if="can('delete', 'product')"
        @click="deleteProduct"
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
