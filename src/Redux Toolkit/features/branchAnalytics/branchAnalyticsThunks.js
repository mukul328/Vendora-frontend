import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Get daily sales chart data (last n days)
export const getDailySalesChart = createAsyncThunk(
  'branchAnalytics/getDailySalesChart',
  async ({ branchId, days = 7 }, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/branch-analytics/daily-sales', {
        params: { branchId, days },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch daily sales chart');
    }
  }
);

// Get top 5 products by quantity
export const getTopProductsByQuantity = createAsyncThunk(
  'branchAnalytics/getTopProductsByQuantity',
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/branch-analytics/top-products', {
        params: { branchId },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch top products');
    }
  }
);

// Get top 5 cashiers by revenue
export const getTopCashiersByRevenue = createAsyncThunk(
  'branchAnalytics/getTopCashiersByRevenue',
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/branch-analytics/top-cashiers', {
        params: { branchId },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch top cashiers');
    }
  }
);

// Get category-wise sales breakdown
export const getCategoryWiseSalesBreakdown = createAsyncThunk(
  'branchAnalytics/getCategoryWiseSalesBreakdown',
  async ({ branchId, date }, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/branch-analytics/category-sales', {
        params: { branchId, date },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch category-wise sales breakdown');
    }
  }
);

// Get today's branch overview
export const getTodayOverview = createAsyncThunk(
  'branchAnalytics/getTodayOverview',
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/branch-analytics/today-overview', {
        params: { branchId },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch today overview');
    }
  }
);