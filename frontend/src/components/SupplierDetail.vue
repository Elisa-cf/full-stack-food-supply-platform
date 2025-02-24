<template>
  <div class="flex justify-center items-center h-screen">
    <!-- Display when isLoading is true -->
    <LoadingSpinner :isLoading="isLoading" v-if="isLoading" />
    <div v-if="!isLoading">
      <!-- Display images based on supplier name -->
      <img
        v-if="supplier?.name.includes('Potatoes')"
        src="../assets/images/patata.jpg"
        alt="Potatoes"
        class="w-auto max-w-sm"
      />
      <img
        v-else-if="supplier?.name.includes('Chocolate')"
        src="../assets/images/chocolate.jpg"
        alt="Chocolate"
        class="w-auto max-w-sm"
      />
      <img
        v-else-if="supplier?.name.includes('Pineapples')"
        src="../assets/images/piña.jpg"
        alt="Pineapples"
        class="w-auto max-w-sm"
      />
      <img
        v-else-if="supplier?.name.includes('Oranges')"
        src="../assets/images/naranja.jpg"
        alt="Oranges"
        class="w-auto max-w-sm"
      />
      <img
        v-else-if="supplier?.name.includes('Apples')"
        src="../assets/images/manzana.webp"
        alt="Apples"
        class="w-auto max-w-sm"
      />
      <img
        v-else
        src="../assets/images/monkey.jpg"
        alt="happy monkey"
        class="w-auto max-w-sm"
      />
      <div>
        <div class="bg-yellow1 text-purple2 m-4 p-2 rounded-xl">
          <p><strong>Name:</strong> {{ supplier?.name }}<br /></p>
          <p><strong>Description:</strong> {{ supplier?.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchSupplierDetail } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { Supplier } from '../types/index';

// Check if an authentication token exists in session storage
const authToken: string | null = sessionStorage.getItem('authToken');
if (!authToken) {
  console.error('No authentication token found in sessionStorage.');
}

// Reactive reference to store the supplier details
const supplier = ref<Supplier | null>(null);

// Reactive reference to store the loading state
const isLoading = ref(true);

// Reactive reference to store error messages
const errMsg = ref<string | null>(null);

// Get the route instance to access route parameters
const route = useRoute();

// Extract the supplier ID from the route parameters
const supplierId = route.params.id as string;

/**
 * Use the onMounted hook to initiate data retrieval when the component is mounted
 */
onMounted(async () => {
  if (!authToken) return;
  try {
    // Fetch supplier details from the API using the auth token and supplier ID
    const response = await fetchSupplierDetail(authToken, supplierId);
    // Update the supplier reactive reference with the fetched data
    supplier.value = response;
    // Set loading state to false
    isLoading.value = false;
  } catch (err) {
    // Set loading state to false and update the error message
    isLoading.value = false;
    errMsg.value = 'Error fetching supplier details';
    console.error('Error fetching supplier details:', err);
  }
});
</script>

<style scoped></style>
