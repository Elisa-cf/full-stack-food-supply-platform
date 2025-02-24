<template>
  <div>
    <!-- Button to open the modal for updating a product -->
    <button class="bg-yellow1 text-white px-4 py-2 rounded" @click="openModal">
      Update Product
    </button>
    <!-- Modal component for editing a product -->
    <EditProductModal
      :isEditModalOpen="isModalOpen"
      @close="closeModal"
      @productEdited="handleproductEdited"
      :product="props.product"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditProductModal from './EditProductModal.vue';
import { Product } from '../types/index';

// Define props for the component
const props = defineProps<{ product: Product }>();

// Reactive reference to control the modal state
const isModalOpen = ref(false);

// Define emits for the component
const emit = defineEmits(['productEdited']);

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
 * Function to handle the product edited event
 * This function emits the productEdited event to the parent component
 */
const handleproductEdited = () => {
  emit('productEdited');
};
</script>

<style scoped></style>
