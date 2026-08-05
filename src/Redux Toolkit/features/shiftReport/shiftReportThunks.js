import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Start Shift
export const startShift = createAsyncThunk(
  'shiftReport/start',
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/shift-reports/start', {}, {
        params: { branchId },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to start shift');
    }
  }
);

// End Shift
export const endShift = createAsyncThunk(
  'shiftReport/end',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.patch('/api/shift-reports/end', {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to end shift');
    }
  }
);

// Get Current Shift Progress
export const getCurrentShiftProgress = createAsyncThunk(
  'shiftReport/getCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/shift-reports/current');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch current shift progress');
    }
  }
);

// Get Shift Report by Date
export const getShiftReportByDate = createAsyncThunk(
  'shiftReport/getByDate',
  async ({ cashierId, date }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/shift-reports/cashier/${cashierId}/by-date`, {
        params: { date },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shift report by date');
    }
  }
);

// Get Shifts by Cashier
export const getShiftsByCashier = createAsyncThunk(
  'shiftReport/getByCashier',
  async (cashierId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/shift-reports/cashier/${cashierId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shifts by cashier');
    }
  }
);

// Get Shifts by Branch
export const getShiftsByBranch = createAsyncThunk(
  'shiftReport/getByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/shift-reports/branch/${branchId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shifts by branch');
    }
  }
);

// Get All Shifts
export const getAllShifts = createAsyncThunk(
  'shiftReport/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/shift-reports');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all shifts');
    }
  }
);

// Get Shift by ID
export const getShiftById = createAsyncThunk(
  'shiftReport/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/shift-reports/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Shift not found');
    }
  }
);

// Delete Shift
export const deleteShift = createAsyncThunk(
  'shiftReport/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/shift-reports/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete shift');
    }
  }
);