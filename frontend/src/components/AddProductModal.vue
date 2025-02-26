<template>
  <div
    v-if="props.isAddProductModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click.self="closeModal"
  >
    <div class="relative max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <button
        type="button"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        @click="closeModal"
      >
        <img
          src="@/assets/icons/close.svg"
          alt="close modal icon"
          class="w-4 h-4"
        />
      </button>
      <h2 class="text-2xl font-bold mb-4">Add New Product</h2>
      <form @submit.prevent="handleAddProductModalSubmit">
        <div class="mb-4">
          <label for="product_name" class="block text-gray-700"
            >Product Name</label
          >
          <input
            type="text"
            id="product_name"
            v-model="productName"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="product_price" class="block text-gray-700"
            >Product Price</label
          >
          <input
            type="number"
            id="product_price"
            v-model="productPrice"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            @click="closeModal"
          >
            Cancel
          </button>
          <button type="submit" class="bg-yellow1 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { insertProduct } from '../utils/api';

// Define props for the component
const props = defineProps<{ isAddProductModalOpen: boolean }>();

// Define emits for the component
const emits = defineEmits(['close', 'productAdded']);

// Reactive references for form inputs
const productName = ref('');
const productPrice = ref<number | null>(null);

/**
 * Function to close the modal
 * This function emits the close event to the parent component
 */
const closeModal = () => {
  emits('close');
};

/**
 * Function to handle form submission
 * This function inserts a new product and emits the productAdded event
 */
const handleAddProductModalSubmit = async () => {
  // Check if both product name and price have values
  if (productName.value && productPrice.value !== null) {
    try {
      // Prepare the data object
      const data = {
        product_name: productName.value,
        product_price: productPrice.value,
      };
      // Insert the new product
      await insertProduct(data);
      // Reset form inputs
      productName.value = '';
      productPrice.value = null;
      // Emit the productAdded event
      emits('productAdded');
      // Emit the close modal event
      emits('close');
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
