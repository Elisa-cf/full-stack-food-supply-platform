<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const { isLoading } = defineProps(['isLoading']);
</script>
