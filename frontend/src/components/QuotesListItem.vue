<template>
  <li
    class="bg-grey1 text-grey2 px-2 py-4 rounded-2xl gap-6 flex flex-col min-h-full justify-between relative overflow-hidden group hover:text-white"
  >
    <div
      class="absolute -top-3 -right-2 bg-purple1 w-10 h-10 rounded-full group-hover:w-80 group-hover:h-40 group-hover:-right-5 group-hover:-top-5 z-0 transition-transform"
    ></div>
    <p class="justify-self-start font-bold pr-4 z-20">
      {{ props.quote.title }}
    </p>
    <div class="flex justify-between text-sm z-20">
      <p
        class="justify-self-start text-purple4 font-bold group-hover:text-yellow1"
      >
        <span class="text-grey2 font-normal group-hover:text-white"
          >Created:</span
        >
        {{ formattedDate }}
      </p>
      <p
        class="justify-self-start text-purple4 font-bold group-hover:text-yellow1"
      >
        <span class="text-grey2 font-normal group-hover:text-white"
          >Amount:</span
        >
        {{ props.quote.amount }}€
      </p>
    </div>
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

<style scoped>
.transition-transform {
  transition: all 1s;
}
</style>
