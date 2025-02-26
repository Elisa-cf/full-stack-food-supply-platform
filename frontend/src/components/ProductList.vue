<template>
  <!-- Loop through the products and display each product -->
  <div
    v-for="product in props.products"
    :key="product.product_id"
    class="relative bg-white p-4 rounded-lg shadow-md"
  >
    <!-- Button to delete a product -->
    <button
      class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      @click="handleDeleteProduct(product.product_id)"
    >
      <img src="@/assets/icons/trash.svg" alt="Delete" class="w-4 h-4" />
    </button>
    <!-- Display product name -->
    <h2 class="text-xl font-semibold mb-2">{{ product.product_name }}</h2>
    <!-- Display product price -->
    <p class="text-gray-700 mb-4">{{ product.product_price }}€</p>
    <!-- Button component to update a product -->
    <UpdateProductBtn :product="product" @productEdited="handleProductEdited" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import UpdateProductBtn from './UpdateProductBtn.vue';
import { Product } from '../types/index';

// Define props for the component
const props = defineProps<{ products: Product[] }>();

// Define emits for the component
const emits = defineEmits(['deleteProduct', 'productEdited']);

/**
 * Function to delete a product by ID
 * This function emits the deleteProduct event to the parent component
 * @param {number} id - The ID of the product to delete
 */
const handleDeleteProduct = (id: number) => {
  emits('deleteProduct', id);
};

/**
 * Function to handle the product edited event
 * This function emits the productEdited event to the parent component
 */
const handleProductEdited = () => {
  emits('productEdited');
};
</script>

<style scoped></style>
