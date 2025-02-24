<template>
  <li
    class="bg-blue1 mt-2 px-2 py-4 rounded-md gap-2 sm:px-4 lg:flex lg:p-8 lg:gap-3"
  >
    <p class="justify-self-start">
      <strong>Amount:</strong> {{ props.quote.amount }}
    </p>
    <p class="justify-self-start">
      <strong>Created:</strong> {{ formattedDate }}
    </p>
    <p class="justify-self-start">
      <strong>Title:</strong> {{ props.quote.title }}
    </p>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { formatDate } from '../utils/dateUtils';
import { Quote } from '../types/index';

// Define the prop with the Quote type for type safety
const props = defineProps<{ quote: Quote }>();

// Use the utility function to format the date
const formattedDate = formatDate(props.quote.created);
</script>
