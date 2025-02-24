<template>
  <div>
    <div
      class="bg-blue1 h-screen w-screen z-50 fixed flex justify-center items-center"
    >
      <section
        class="bg-purple2 flex flex-col justify-center items-center w-11/12 py-10 gap-4 rounded-md sm:w-[500px]"
      >
        <h1 class="font-bold text-xl text-white">Create your Opply account</h1>

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
        <div
          class="bg-blue3 w-10/12 p-2 rounded text-center text-purple1 bg-blue1"
        >
          <button @click="handleRegistration">SUBMIT</button>
        </div>

        <!-- Link to sign-in page -->
        <p>
          <span class="text-white font-bold">Already have an account? </span>
          <RouterLink to="/signin" class="text-white font-bold"
            >Log in</RouterLink
          >
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerNewUser, getAuthToken } from '../utils/api';

// Reactive references for form inputs and error message
const username = ref('');
const password = ref('');
const errMsg = ref<string | null>(null);

// Get the router instance to navigate programmatically
const router = useRouter();

/**
 * Function to handle user registration and token retrieval
 * This function registers a new user, retrieves an authentication token,
 * and navigates to the sign-in page upon successful registration.
 */
const handleRegistration = async () => {
  try {
    // Register the new user with the provided username and password
    await registerNewUser(username.value, password.value);
    // Retrieve the authentication token for the new user
    const token = await getAuthToken(username.value, password.value);
    // Store the token in local storage
    localStorage.setItem('jwtToken', token);
    // Navigate to the sign-in page
    router.push('/signin');
  } catch (error) {
    // Log the error and display an error message
    console.error('Registration failed:', error);
    errMsg.value = 'This user already exists. Please log in';
  }
};
</script>

<style scoped></style>
