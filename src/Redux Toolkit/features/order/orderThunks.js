import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Create Order
export const createOrder = createAsyncThunk(
  'order/create',
  async (dto, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/orders', dto);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create order');
    }
  }
);

// Get Order by ID
export const getOrderById = createAsyncThunk(
  'order/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/orders/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Order not found');
    }
  }
);

// Get Orders by Branch (with optional filters)
export const getOrdersByBranch = createAsyncThunk(
  'order/getByBranch',
  async ({ branchId, customerId, cashierId, status }, { rejectWithValue }) => {
    try {
      const params = {};
      if (customerId) params.customerId = customerId;
      if (cashierId) params.cashierId = cashierId;
      if (status) params.status = status;
      const res = await api.get(`/api/orders/branch/${branchId}`, { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// Get Orders by Cashier
export const getOrdersByCashier = createAsyncThunk(
  'order/getByCashier',
  async (cashierId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/orders/cashier/${cashierId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// Get Today's Orders by Branch
export const getTodayOrdersByBranch = createAsyncThunk(
  'order/getTodayByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/orders/today/branch/${branchId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch today's orders");
    }
  }
);

// Get Orders by Customer
export const getOrdersByCustomer = createAsyncThunk(
  'order/getByCustomer',
  async (customerId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/orders/customer/${customerId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch customer orders');
    }
  }
);

// Get Top 5 Recent Orders by Branch
export const getRecentOrdersByBranch = createAsyncThunk(
  'order/getRecentByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/orders/recent/${branchId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch recent orders');
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  'order/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/orders/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete order');
    }
  }
);
