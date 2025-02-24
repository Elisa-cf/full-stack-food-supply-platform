<template>
  <div>
    <!-- Button to open the modal for adding a new product -->
    <button
      class="bg-yellow1 text-white px-4 py-2 my-20 rounded"
      @click="openModal"
    >
      Add New Product
    </button>
    <!-- Modal component for adding a new product -->
    <AddProductModal
      :isAddProductModalOpen="isModalOpen"
      @close="closeModal"
      @productAdded="handleProductAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddProductModal from './AddProductModal.vue';

// Reactive reference to control the modal state
const isModalOpen = ref(false);

// Define emits for the component
const emit = defineEmits(['productAdded']);

/**
 * Function to open the modal
 */
const openModal = () => {
  isModalOpen.value = true;
};

/**
 * Function to close the modal
 */
const closeModal = () => {
  isModalOpen.value = false;
};

/**
 * Function to handle the product added event
 * This function emits the productAdded event to the parent component
 */
const handleProductAdded = () => {
  emit('productAdded');
};
</script>

<style scoped></style>
