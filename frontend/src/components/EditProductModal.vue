<template>
  <div
    v-if="props.isEditModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
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
      <h2 class="text-2xl font-bold mb-4">Edit Product</h2>
      <form @submit.prevent="handleEditProductSubmit">
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
            Edit Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { updateProductById } from '../utils/api';
import { Product } from '../types/index';

// Define props for the component
const props = defineProps<{ isEditModalOpen: boolean; product: Product }>();

// Define emits for the component
const emits = defineEmits(['close', 'productEdited']);

// Reactive references for form inputs
const productId = ref(props.product.product_id);
const productName = ref(props.product.product_name);
const productPrice = ref(props.product.product_price);

/**
 * Function to close the modal
 * This function emits the close event to the parent component
 */
const closeModal = () => {
  emits('close');
};

/**
 * Function to handle form submission
 * This function updates the product and emits the productEdited event
 */
const handleEditProductSubmit = async () => {
  // Check if both product name and price have values
  if (productName.value && productPrice.value !== null) {
    try {
      // Prepare the data object
      const id = productId.value;
      const data = {
        product_name: productName.value,
        product_price: productPrice.value,
      };
      // Update the product
      await updateProductById(id, data);
      // Emit the productEdited event
      emits('productEdited');
      // Emit the close event
      emits('close');
    } catch (error) {
      console.error('Failed to edit product:', error);
    }
  }
};
</script>

<style scoped></style>
