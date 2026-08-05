import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Get Dashboard Summary
export const getDashboardSummary = createAsyncThunk(
  'adminDashboard/getSummary',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/super-admin/dashboard/summary');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch dashboard summary');
    }
  }
);

// Get Store Registration Stats (Last 7 Days)
export const getStoreRegistrationStats = createAsyncThunk(
  'adminDashboard/getRegistrationStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/super-admin/dashboard/store-registrations');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch store registration stats');
    }
  }
);

// Get Store Status Distribution
export const getStoreStatusDistribution = createAsyncThunk(
  'adminDashboard/getStatusDistribution',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/super-admin/dashboard/store-status-distribution');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch store status distribution');
    }
  }
);