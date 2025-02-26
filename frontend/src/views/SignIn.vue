<template>
  <div
    class="bg-purple2 z-50 fixed h-screen w-screen flex flex-col justify-center items-center"
  >
    <section
      class="bg-blue1 flex flex-col justify-center items-center w-11/12 py-10 gap-4 rounded-md sm:w-[500px]"
    >
      <h1 class="font-bold text-xl text-white">Log in to Opply</h1>

      <!-- Username input field -->
      <input
        class="bg-grey1 w-10/12 p-2 rounded-md focus:outline-none focus:ring-grey3 focus:ring-2 caret-grey3"
        type="text"
        placeholder="Username"
        v-model="username"
      />
      <!-- Password input field -->
      <input
        class="bg-grey1 w-10/12 p-2 rounded-md focus:outline-none focus:ring-grey3 focus:ring-2 caret-grey3"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <!-- Error message display -->
      <p
        class="bg-red border border-red2 rounded-md text-red1 w-10/12 p-1.5"
        v-if="errMsg"
      >
        {{ errMsg }}
      </p>
      <!-- Submit button -->
      <div class="bg-purple1 text-blue1 w-10/12 p-2 rounded text-center">
        <button @click="logIn">LOGIN</button>
      </div>

      <!-- Link to sign-up page -->
      <p>
        <span class="text-white font-bold">No account? </span>
        <RouterLink to="/register" class="text-white font-bold"
          >Sign up</RouterLink
        >
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInUser } from '../utils/api';

// Reactive references for form inputs and error message
const username = ref('');
const password = ref('');
const errMsg = ref<string | null>(null);

// Get the router instance to navigate programmatically
const router = useRouter();

// Flag to prevent triggering multiple login attempts
let isUserLogged = false;

/**
 * Function to handle user login
 * This function signs in the user, retrieves an authentication token,
 * and navigates to the home page upon successful login.
 */
const logIn = async () => {
  if (isUserLogged) return; // If login attempt already made, don't proceed

  try {
    // Call the function from api.ts to sign in passing username and password as arguments
    const token = await signInUser(username.value, password.value);
    // Store the token in sessionStorage
    sessionStorage.setItem('authToken', token);

    isUserLogged = true;
    // Navigate to the home page
    router.push('/');
  } catch (error: any) {
    console.error('Sign-in failed:', error);
    // Display an error message
    errMsg.value = 'Username or password wrong';
  }
};
</script>

<style scoped></style>
