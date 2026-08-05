import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Create Branch
export const createBranch = createAsyncThunk(
  'branch/create',
  async (dto, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/branches', dto);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Create branch failed');
    }
  }
);

// Get Branch by ID
export const getBranchById = createAsyncThunk(
  'branch/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/branches/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Branch not found');
    }
  }
);

// Get All Branches by Store
export const getAllBranchesByStore = createAsyncThunk(
  'branch/getAllByStore',
  async (storeId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/branches/store/${storeId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch branches');
    }
  }
);

// Update Branch
export const updateBranch = createAsyncThunk(
  'branch/update',
  async ({ id, dto }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/branches/${id}`, dto);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

// Delete Branch
export const deleteBranch = createAsyncThunk(
  'branch/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/branches/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);
