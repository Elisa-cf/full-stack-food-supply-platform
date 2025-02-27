<template>
  <!-- Loop through the products and display each product -->
  <div
    v-for="product in props.products"
    :key="product.product_id"
    class="bg-white rounded-2xl rounded-bl-none shadow-2xl max-h-60 group overflow-hidden"
  >
    <img
      src="@/assets/images/basket.jpg"
      alt="Delete"
      class="w-40 h-40 mx-auto"
    />
    <div
      class="bg-purple1 rounded-l-3xl rounded-bl-none text-white pl-6 py-2 pr-6 titles"
    >
      <!-- Display product name -->
      <h2 class="text-xl font-semibold mb-2 capitalize">
        {{ product.product_name }}
      </h2>
      <!-- Display product price -->
      <p class="mb-4">{{ product.product_price }}€</p>

      <div class="flex justify-between items-center">
        <!-- Button component to update a product -->
        <UpdateProductBtn
          :product="product"
          @productEdited="handleProductEdited"
        />
        <!-- Button to delete a product -->
        <button @click="handleDeleteProduct(product.product_id)">
          <img
            src="@/assets/icons/trash.svg"
            alt="Delete"
            class="w-6 h-6 text-white"
          />
        </button>
      </div>
    </div>
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

<style scoped>
.titles {
  transform: translateY(0);
  transition: transform 0.3s;
}
.group:hover .titles {
  transform: translateY(-40%);
}
</style>
