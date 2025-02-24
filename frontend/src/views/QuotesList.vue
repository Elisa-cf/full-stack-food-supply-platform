<template>
  <div class="flex justify-center py-20">
    <!-- Loading spinner to indicate loading state -->
    <LoadingSpinner :isLoading="isLoading" v-if="isLoading" />

    <div
      v-if="!isLoading"
      class="flex flex-col gap-3 w-11/12 mx-auto max-w-4xl justify-center text-purple1"
    >
      <ul
        class="grid grid-cols-1 gap-2 xs:grid-cols-2 xs:gap-2 xs:gap-x-4 lg:gap-x-8 items-center"
      >
        <!-- Loop through the quotes and display each quote -->
        <QuotesListItem
          v-for="quote in quotes"
          :key="quote.id"
          :quote="quote"
        />
      </ul>
      <!-- Load more button to fetch more quotes -->
      <button @click="loadMoreQuotes" v-if="hasMore">Load More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAuthToken, fetchQuotes } from '../utils/api';

import LoadingSpinner from '../utils/LoadingSpinner.vue';
import QuotesListItem from '../components/QuotesListItem.vue';
import { Quote, PaginatedResponse } from '../types/index';

// Reactive reference to store the list of quotes
const quotes = ref<Quote[]>([]);

// Reactive references for loading state and pagination
const isLoading = ref<boolean>(true);
const hasMore = ref<boolean>(true);
let authToken: string | null = null;
let nextPage: number = 1;

/**
 * Function to load more quotes from the API
 * This function fetches the quotes and updates the quotes array
 */
const loadMoreQuotes = async () => {
  // Check if the auth token is available
  if (!authToken) return;

  // Set loading state to true
  isLoading.value = true;

  try {
    // Fetch quotes from the API using the auth token and current page number
    const response: PaginatedResponse<Quote> = await fetchQuotes(
      authToken,
      nextPage
    );

    // Check if the response contains results
    if (response && response.results) {
      // Update the quotes array with the new results
      quotes.value = [...quotes.value, ...response.results];

      // Increment the page number for the next request
      nextPage++;

      // Update the hasMore state based on the presence of a next page
      hasMore.value = !!response.next;
    }

    // Set loading state to false
    isLoading.value = false;
  } catch (error) {
    // Log any errors that occur during the API request
    console.error('Failed to fetch quotes:', error);

    // Set loading state to false
    isLoading.value = false;
  }
};

/**
 * Use the onMounted hook to authenticate the user and load initial quotes
 */
onMounted(async () => {
  // Authenticate the user and get the auth token
  authToken = await getAuthToken('username', 'password');

  // Store the auth token in session storage
  sessionStorage.setItem('authToken', authToken);

  // Load the initial set of quotes
  await loadMoreQuotes();
});
</script>
