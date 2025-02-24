<template>
  <li
    class="bg-blue1 mt-2 px-2 py-4 rounded-md gap-2 sm:px-4 lg:flex lg:p-8 lg:gap-3"
  >
    <!-- Display the name of the supplier -->
    <p class="justify-self-start">
      <strong>Name:</strong> {{ props.supplier.name }}
    </p>
    <!-- Display the description of the supplier -->
    <p class="justify-self-start">
      <strong>Description:</strong> {{ props.supplier.description }}
    </p>
    <!-- Button to view supplier details -->
    <button
      @click="props.viewSupplierDetail(props.supplier.id)"
      class="mt-2 bg-yellow1 text-purple1 font-bold py-1 px-4 rounded-full text-sm lg:flex-end lg:px-5 lg:py-3"
    >
      View Details
    </button>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Supplier } from '../types/index';

// Define the props with the Supplier type for type safety
const props = defineProps<{
  supplier: Supplier;
  viewSupplierDetail: (id: string) => void;
}>();
</script>

<style scoped></style>
