import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Create Customer
export const createCustomer = createAsyncThunk(
  'customer/create',
  async (customer, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/customers', customer);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create customer');
    }
  }
);

// Update Customer
export const updateCustomer = createAsyncThunk(
  'customer/update',
  async ({ id, customer }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/customers/${id}`, customer);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update customer');
    }
  }
);

// Delete Customer
export const deleteCustomer = createAsyncThunk(
  'customer/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/customers/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete customer');
    }
  }
);

// Get Customer by ID
export const getCustomerById = createAsyncThunk(
  'customer/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/customers/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Customer not found');
    }
  }
);

// Get All Customers
export const getAllCustomers = createAsyncThunk(
  'customer/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/customers');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch customers');
    }
  }
);