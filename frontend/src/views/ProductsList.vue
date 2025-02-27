<template>
  <div class="flex justify-center py-6">
    <!-- Loading spinner to indicate loading state -->
    <LoadingSpinner :isLoading="isLoading" v-if="isLoading" />
    <!-- Button to add a new product, triggers loadProducts when a product is added -->

    <div
      v-if="!isLoading"
      class="flex flex-col gap-3 w-11/12 mx-auto max-w-4xl justify-center text-purple1"
    >
      <AddProductBtn @productAdded="handleFetchProducts" />
      <ul
        class="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 items-center"
      >
        <!-- List of products, with handlers for deleting and editing products -->
        <ProductListItem
          :products="products"
          @deleteProduct="handleDeleteProduct"
          @productEdited="handleFetchProducts"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddProductBtn from '../components/AddProductBtn.vue';
import ProductListItem from '../components/ProductListItem.vue';
import { ref, onMounted } from 'vue';
import { fetchProducts, deleteProductById } from '../utils/api';
import { Product } from '../types/index';
import LoadingSpinner from '../components/LoadingSpinner.vue';

// Reactive reference to store the list of products
const products = ref<Product[]>([]);

const isLoading = ref<boolean>(true);

/**
 * Function to load products from the API
 * This function fetches the products and updates the products array
 */
const handleFetchProducts = async () => {
  try {
    const data = await fetchProducts();
    products.value = data;
    isLoading.value = false;
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

/**
 * Function to delete a product by ID
 * This function deletes the product and reloads the products list
 * @param {number} id - The ID of the product to delete
 */
const handleDeleteProduct = async (id: number) => {
  try {
    await deleteProductById(id);
    products.value = products.value.filter(
      product => product.product_id !== id
    );
    //After deleting a product, we reload the products list
    handleFetchProducts();
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};

// Load products when the component is mounted
onMounted(handleFetchProducts);
</script>

<style scoped></style>
