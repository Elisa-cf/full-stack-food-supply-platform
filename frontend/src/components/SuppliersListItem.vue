<template>
  <li
    class="bg-white mt-2 p-4 rounded-lg shadow-md min-h-full text-grey2 group hover:scale-105"
  >
    <div
      class="group-hover:bg-red3 group-hover:p-4 group-hover:text-brown1 rounded-lg flex flex-col gap-4 h-full"
    >
      <!-- Display the name of the supplier -->
      <p class="font-bold text-xl">
        {{ props.supplier.name }}
      </p>
      <!-- Display the description of the supplier -->
      <p class="justify-self-start h-10">
        {{ props.supplier.description }}
      </p>
      <!-- Display random data -->
      <div class="flex gap-2 mt-auto">
        <div
          class="p-2 bg-purple3 rounded-lg w-full text-purple4"
          v-for="data in props.randomData"
          :key="data.id"
        >
          <p>
            <span class="font-bold text-lg">{{
              getFirstLine(data.value)
            }}</span>
            <br />
            <span>{{ getSecondLine(data.value) }}</span>
          </p>
        </div>
      </div>

      <!-- Button to view supplier details -->
      <button
        @click="props.viewSupplierDetail(props.supplier.id)"
        class="mt-2 bg-purple4 text-white font-bold py-1 px-4 rounded-md text-sm lg:flex-end lg:px-5 lg:py-3 hidden group-hover:block"
      >
        View Details
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Supplier } from '../types/index';

// Define the props with the Supplier type for type safety
const props = defineProps<{
  supplier: Supplier;
  viewSupplierDetail: (id: string) => void;
  randomData: { id: number; value: string }[];
}>();

// Function to get the first line of the text
const getFirstLine = (value: string) => {
  const lines = value.split(' ');
  return lines[0];
};

// Function to get the second line of the text
const getSecondLine = (value: string) => {
  const lines = value.split(' ');
  return lines.slice(1).join(' ');
};
</script>

<style scoped></style>
