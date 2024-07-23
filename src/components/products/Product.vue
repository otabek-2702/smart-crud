<script setup>
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { computed } from 'vue';

const props = defineProps(['product']);

const isPair = (props.product.__v + 1) % 2 === 0

// const createdAt = computed(() => {
//     const date = new Date(props.product.createdAt)
//     const day = date.getDate().toString().padStart(2,'0')
//     const month = (date.getMonth() +1).toString().padStart(2,'0')
//     const year = date.getFullYear().toString()
//     let result = `${day}-${month}-${year}`

//     return result
// })

</script>

<template>
  <tr class="border-b text-gray-600" :class="{'bg-gray-100': isPair}">
    <th class="px-4 py-3">{{product.__v +1}}</th>
    <th class="px-4 py-3">{{product.name}}</th>
    <th class="px-4 py-3">{{product.createdAt}}</th>
    <th class="px-4 py-3">{{product.price}} usd</th>
    <th class="px-4 py-3 flex justify-center gap-4">
      <font-awesome-icon class="px-1 text-blue-600 text-lg cursor-pointer" :icon="faEye"></font-awesome-icon>
      <font-awesome-icon class="px-1 text-green-600 text-lg cursor-pointer" :icon="faPenToSquare"></font-awesome-icon>
      <font-awesome-icon class="px-1 text-red-600 text-lg cursor-pointer" :icon="faTrash"></font-awesome-icon>
    </th>
  </tr>

</template>

<style scoped></style>
