import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

// Get Store Overview (KPI Summary)
export const getStoreOverview = createAsyncThunk(
  "storeAnalytics/getStoreOverview",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/store/analytics/${storeAdminId}/overview`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch store overview");
    }
  }
);

// Get Sales Trends by Time (daily/weekly/monthly)
export const getSalesTrends = createAsyncThunk(
  "storeAnalytics/getSalesTrends",
  async ({ storeAdminId, period }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales-trends`, {
        params: { period },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch sales trends");
    }
  }
);

// Get Monthly Sales Chart
export const getMonthlySales = createAsyncThunk(
  "storeAnalytics/getMonthlySales",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/monthly`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch monthly sales");
    }
  }
);

// Get Daily Sales Chart
export const getDailySales = createAsyncThunk(
  "storeAnalytics/getDailySales",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/daily`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch daily sales");
    }
  }
);

// Get Sales by Product Category
export const getSalesByCategory = createAsyncThunk(
  "storeAnalytics/getSalesByCategory",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/category`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch sales by category");
    }
  }
);

// Get Sales by Branch
export const getSalesByBranch = createAsyncThunk(
  "storeAnalytics/getSalesByBranch",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/store/analytics/${storeAdminId}/sales/branch`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch sales by branch");
    }
  }
);

// Get Branch Performance
export const getBranchPerformance = createAsyncThunk(
  "storeAnalytics/getBranchPerformance",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/store/analytics/${storeAdminId}/branch-performance`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch branch performance");
    }
  }
);

// Get Store Alerts and Health Monitoring
export const getStoreAlerts = createAsyncThunk(
  "storeAnalytics/getStoreAlerts",
  async (storeAdminId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/store/analytics/${storeAdminId}/alerts`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch store alerts");
    }
  }
);