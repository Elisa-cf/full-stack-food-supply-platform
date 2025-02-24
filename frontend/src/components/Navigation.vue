<template>
  <header>
    <nav
      class="bg-purple1 fixed flex w-full items-center justify-between px-2 py-2 border-b-10"
    >
      <!-- Logo linking to the home page -->
      <RouterLink to="/">
        <div class="w-24 md:w-32 lg:w-40">
          <img src="../assets/images/opply-logo.webp" alt="opply logo" />
        </div>
      </RouterLink>

      <!-- Navigation links for different sections -->
      <div class="items-center sm:flex hidden gap-2">
        <RouterLink to="/suppliers">
          <button class="p-2 rounded text-center text-blue1 text-lg font-bold">
            All Suppliers
          </button>
        </RouterLink>

        <RouterLink to="/quotes">
          <button class="p-2 rounded text-center text-blue1 text-lg font-bold">
            My Quotes
          </button>
        </RouterLink>

        <RouterLink to="/products">
          <button class="p-2 rounded text-center text-blue1 text-lg font-bold">
            Products
          </button>
        </RouterLink>
      </div>
      <!-- Log out button -->
      <button
        class="flex items-center z-50 gap-1 sm:gap-2 font-bold"
        @click="handleSignOut"
      >
        <p class="text-blue1 md:text-lg">Log out</p>
        <div class="w-4">
          <img
            src="../assets/images/log-out.svg"
            alt="log out logo"
            class="text-yellow1"
          />
        </div>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * Function to handle sign out
 * This function removes the auth token from session storage and redirects to the sign-in page
 */
const handleSignOut = () => {
  sessionStorage.removeItem('authToken');
  router.push('/signin');
};
</script>

<style scoped></style>
