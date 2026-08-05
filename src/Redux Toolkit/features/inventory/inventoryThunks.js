import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Create inventory
export const createInventory = createAsyncThunk(
  'inventory/create',
  async (dto, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/inventories', dto);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create inventory');
    }
  }
);

// Update inventory
export const updateInventory = createAsyncThunk(
  'inventory/update',
  async ({ id, dto }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/inventories/${id}`, dto);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update inventory');
    }
  }
);

// Delete inventory
export const deleteInventory = createAsyncThunk(
  'inventory/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/inventories/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete inventory');
    }
  }
);

// Get inventory by ID
export const getInventoryById = createAsyncThunk(
  'inventory/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/inventories/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Inventory not found');
    }
  }
);

// Get inventory by branch ID
export const getInventoryByBranch = createAsyncThunk(
  'inventory/getByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/inventories/branch/${branchId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch branch inventory');
    }
  }
);

// Get inventory by product ID
export const getInventoryByProduct = createAsyncThunk(
  'inventory/getByProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/inventories/product/${productId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch product inventory');
    }
  }
);
