import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

// Create product
export const createProduct = createAsyncThunk(
  "product/create",
  async (dto, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/products", dto);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create product");
    }
  }
);

// Get product by ID
export const getProductById = createAsyncThunk(
  "product/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Product not found");
    }
  }
);

// Update product (PATCH)
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, dto }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/api/products/${id}`, dto);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update product");
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete product");
    }
  }
);

// Get products by store
export const getProductsByStore = createAsyncThunk(
  "product/getByStore",
  async (storeId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/products/store/${storeId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

// Search products by keyword
export const searchProducts = createAsyncThunk(
  "product/search",
  async ({ query, storeId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/products/store/${storeId}/search`, {
        params: { q: query },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  }
);
