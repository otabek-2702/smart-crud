<script setup></script>

<template>
  <div class="bg-gray-200">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <table class="min-w-full bg-white rounded-lg shadow-2xl">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b-2 border-gray-200">
                <select class="border border-gray-300 rounded-md p-2">
                  <option>Invoise</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </th>
              <th class="py-2 px-4 border-b-2 border-gray-200">
                <select class="border border-gray-300 rounded-md p-2">
                  <option>Company</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </th>
              <th class="py-2 px-4 border-b-2 border-gray-200">
                <select class="border border-gray-300 rounded-md p-2">
                  <option>Duo Data</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </th>

              <th class="py-2 px-4 border-b-2 border-gray-200">
                <select class="border border-gray-300 rounded-md p-2">
                  <option>Amount</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </th>
              <th class="py-2 px-4 border-b-2 border-gray-200">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            <tr class="border-b text-gray-600">
              <th class="px-4 py-3">1</th>
              <th class="px-4 py-3">Palonchiyev Pustonchi</th>
              <th class="px-4 py-3">31.12.2000</th>
              <th class="px-4 py-3 text-red-500"><a href="noname.html">10,000 so'm</a></th>
              <th class="px-4 py-3 flex justify-center gap-4">
                <span class="px-2 text-blue-600"><i class="fa-solid fa-eye"></i></span>
                <span class="px-2 text-gray-600"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="text-gray-500"><i class="fa-solid fa-trash"></i></span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
