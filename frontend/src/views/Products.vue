<template>
  <!-- Button to add a new product, triggers loadProducts when a product is added -->
  <AddProductBtn @productAdded="handleFetchProducts" />
  <!-- List of products, with handlers for deleting and editing products -->
  <ProductList
    :products="products"
    @deleteProduct="handleDeleteProduct"
    @productEdited="handleFetchProducts"
  />
</template>

<script setup lang="ts">
import AddProductBtn from '../components/AddProductBtn.vue';
import ProductList from '../components/ProductList.vue';
import { ref, onMounted } from 'vue';
import { fetchProducts, deleteProductById } from '../utils/api';
import { Product } from '../types/index';

// Reactive reference to store the list of products
const products = ref<Product[]>([]);

/**
 * Function to load products from the API
 * This function fetches the products and updates the products array
 */
const handleFetchProducts = async () => {
  try {
    const data = await fetchProducts();
    products.value = data;
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
    handleFetchProducts();
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};

// Load products when the component is mounted
onMounted(handleFetchProducts);
</script>

<style scoped></style>
