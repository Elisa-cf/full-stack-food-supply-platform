<template>
  <div class="flex justify-center pt-28 bg-grey1">
    <!-- Loading spinner to indicate loading state -->
    <LoadingSpinner :isLoading="isLoading" v-if="isLoading" />

    <div
      v-if="!isLoading"
      class="flex flex-col gap-3 w-11/12 mx-auto max-w-4xl justify-center text-purple2"
    >
      <ul
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 items-center lg:grid-cols-3"
      >
        <!-- Loop through the suppliers and and render the SupplierLIstItem component for each supplier -->
        <SuppliersListItem
          v-for="supplier in suppliers"
          :key="supplier.id"
          :supplier="supplier"
          :viewSupplierDetail="viewSupplierDetail"
          :randomData="getRandomData()"
        />
      </ul>
      <!-- Load more button to fetch more suppliers -->
      <button @click="loadMoreSuppliers" v-if="hasMore">Load More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuthToken, fetchSuppliers } from '../utils/api';
import SuppliersListItem from '../components/SuppliersListItem.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { Supplier, PaginatedResponse } from '../types/index';
import SupplierRandomData from '../assets/SupplierRandomData';
// Reactive reference to store the list of suppliers
const suppliers = ref<Supplier[]>([]);

// Reactive references for loading state and pagination
const isLoading = ref<boolean>(true);
const hasMore = ref<boolean>(true);
let authToken: string | null = null;
let nextPage: number = 1;

const router = useRouter();

// Function to get 1 or 2 random values from SupplierRandomData
const getRandomData = () => {
  // Shuffle the SupplierRandomData by randomly sorting the elements
  const shuffled = SupplierRandomData.sort(() => 0.5 - Math.random());
  // Return the first 1 or 2 elements from the shuffled array
  return shuffled.slice(0, 2);
};

// Define a function to load more suppliers from the API
const loadMoreSuppliers = async () => {
  // Check if the auth token is available to authenticate the request to fetch more suppliers
  if (!authToken) return;

  // Set loading state to true
  isLoading.value = true;
  try {
    // Fetch suppliers from the API using the auth token and current page number
    const response: PaginatedResponse<Supplier> = await fetchSuppliers(
      authToken,
      nextPage
    );

    // Check if the response contains results
    if (response && response.results) {
      // Update the suppliers array with the new results
      suppliers.value = [...suppliers.value, ...response.results];
      console.log(suppliers.value);

      // Increment the page number for the next request
      nextPage++;

      // Update the hasMore state based on the presence of a next page
      // hasMore.value is set to true if response.next is truthy

      hasMore.value = !!response.next;
    }
    // Set loading state to false
    isLoading.value = false;
  } catch (error) {
    // Log any errors that occur during the API request
    console.error('Failed to fetch suppliers:', error);

    // Set loading state to false
    isLoading.value = false;
  }
};

/**
 * Function to navigate to the supplier detail page using the id parameter
 * This function uses the router to navigate to the supplier detail page
 */ const viewSupplierDetail = (id: string) => {
  router.push(`/supplier/${id}`);
};

/**
 * Use the onMounted hook to authenticate the user and load initial suppliers
 */
onMounted(async () => {
  // Authenticate the user and get the auth token
  authToken = await getAuthToken('username', 'password');
  // Store the auth token in session storage
  sessionStorage.setItem('authToken', authToken);
  // Load the initial set of quotes
  await loadMoreSuppliers();
});
</script>
