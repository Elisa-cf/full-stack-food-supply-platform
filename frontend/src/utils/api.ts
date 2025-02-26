import axios from 'axios';
import { Supplier, PaginatedResponse, Quote } from '../types/index';

// Create an instance of Axios with a base URL pointing to the external API server
const axiosInstance = axios.create({
  baseURL: 'https://february-21.herokuapp.com',
});

/**
 * Register a new user with the provided username and password.
 * @param username - The username of the new user.
 * @param password - The password of the new user.
 */
export async function registerNewUser(username: string, password: string) {
  try {
    const response = await axiosInstance.post('/api/v1/users/', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('User registration failed:', error);
    throw new Error('User registration failed');
  }
}

/**
 * Send a request to retrieve an authentication token for the user with the provided username and password.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns The authentication token.
 */
export async function getAuthToken(
  username: string,
  password: string
): Promise<string> {
  try {
    const response = await axiosInstance.post('/api-token-auth/', {
      username,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error('Token retrieval failed:', error);
    throw new Error('Token retrieval failed');
  }
}

/**
 * Sign in a user using username and password and retrieve the authentication token.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns The authentication token.
 */
export async function signInUser(
  username: string,
  password: string
): Promise<string> {
  try {
    // calls the getAuthToken function to retrieve the authentication token.
    // Each time the user logs in, the backend generates a new token.
    const authToken = await getAuthToken(username, password);
    return authToken;
  } catch (error) {
    console.error('Sign-in failed:', error);
    throw new Error('Sign-in failed');
  }
}

/**
 * Fetch the list of suppliers from the API.
 * @param authToken - The authentication token.
 * @param page - The page number to fetch.
 * @returns A paginated response containing the list of suppliers.
 */
export async function fetchSuppliers(
  authToken: string,
  page: number = 1
): Promise<PaginatedResponse<Supplier>> {
  try {
    const headers = {
      Authorization: `Token ${authToken}`,
    };

    const response = await axiosInstance.get<PaginatedResponse<Supplier>>(
      '/api/v1/suppliers/',
      {
        headers,
        params: { page },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    throw new Error('Failed to fetch suppliers');
  }
}

/**
 * Fetch the list of quotes from the API.
 * @param authToken - The authentication token.
 * @param page - The page number to fetch.
 * @returns A paginated response containing the list of quotes.
 */
export async function fetchQuotes(
  authToken: string,
  page: number = 1
): Promise<PaginatedResponse<Quote>> {
  try {
    const headers = {
      Authorization: `Token ${authToken}`,
    };

    const response = await axiosInstance.get<PaginatedResponse<Quote>>(
      '/api/v1/quotes/',
      {
        headers,
        params: { page },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    throw new Error('Failed to fetch quotes');
  }
}

/**
 * Fetch details of a specific supplier by ID.
 * @param authToken - The authentication token.
 * @param supplierId - The ID of the supplier.
 * @returns The details of the supplier.
 */
export async function fetchSupplierDetail(
  authToken: string,
  supplierId: string
) {
  try {
    const headers = {
      Authorization: `Token ${authToken}`,
    };

    const response = await axiosInstance.get(
      `/api/v1/suppliers/${supplierId}/`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch supplier detail:', error);
    throw new Error('Failed to fetch supplier detail');
  }
}

// Create an instance of Axios with a base URL pointing to the API server for products
const axiosProductInstance = axios.create({
  baseURL: 'http://localhost:5000', // Update this to your backend URL
});

/**
 * Fetch the list of products from the API.
 * @returns The list of products.
 */
export async function fetchProducts() {
  try {
    const response = await axiosProductInstance.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products');
  }
}

/**
 * Fetch a single product by ID from the API.
 * @param id - The ID of the product.
 * @returns The details of the product.
 */
export async function fetchProductById(id: number) {
  try {
    const response = await axiosProductInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product');
  }
}

/**
 * Insert a new product into the database via the API.
 * @param data - The data of the new product.
 * @returns The inserted product.
 */
export async function insertProduct(data: {
  product_name: string;
  product_price: number;
}) {
  try {
    const response = await axiosProductInstance.post('/api/products', data);
    return response.data;
  } catch (error) {
    console.error('Failed to insert product:', error);
    throw new Error('Failed to insert product');
  }
}

/**
 * Update a product in the database via the API.
 * @param id - The ID of the product.
 * @param data - The updated data of the product.
 * @returns The updated product.
 */
export async function updateProductById(
  id: number,
  data: { product_name: string; product_price: number }
) {
  try {
    const response = await axiosProductInstance.put(
      `/api/products/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update product:', error);
    throw new Error('Failed to update product');
  }
}

/**
 * Delete a product from the database via the API.
 * @param id - The ID of the product.
 * @returns The deleted product.
 */
export async function deleteProductById(id: number) {
  try {
    const response = await axiosProductInstance.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw new Error('Failed to delete product');
  }
}
