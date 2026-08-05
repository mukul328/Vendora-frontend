import { createSlice } from '@reduxjs/toolkit';
import {
  getStoreOverview,
  getSalesTrends,
  getMonthlySales,
  getDailySales,
  getSalesByCategory,
  getSalesByBranch,
  getBranchPerformance,
  getStoreAlerts
} from './storeAnalyticsThunks';

const initialState = {
  storeOverview: null,
  salesTrends: null,
  monthlySales: [],
  dailySales: [],
  salesByCategory: [],
  salesByBranch: [],
  branchPerformance: null,
  storeAlerts: null,
  loading: false,
  error: null,
};

const storeAnalyticsSlice = createSlice({
  name: 'storeAnalytics',
  initialState,
  reducers: {
    clearStoreAnalyticsState: (state) => {
      state.storeOverview = null;
      state.salesTrends = null;
      state.monthlySales = [];
      state.dailySales = [];
      state.salesByCategory = [];
      state.salesByBranch = [];
      state.branchPerformance = null;
      state.storeAlerts = null;
      state.error = null;
    },
    clearSalesData: (state) => {
      state.salesTrends = null;
      state.monthlySales = [];
      state.dailySales = [];
      state.salesByCategory = [];
      state.salesByBranch = [];
    },
    clearBranchData: (state) => {
      state.salesByBranch = [];
      state.branchPerformance = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreOverview.pending, (state) => { state.loading = true; })
      .addCase(getStoreOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.storeOverview = action.payload;
      })
      .addCase(getStoreOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSalesTrends.pending, (state) => { state.loading = true; })
      .addCase(getSalesTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.salesTrends = action.payload;
      })
      .addCase(getSalesTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMonthlySales.pending, (state) => { state.loading = true; })
      .addCase(getMonthlySales.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlySales = action.payload;
      })
      .addCase(getMonthlySales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getDailySales.pending, (state) => { state.loading = true; })
      .addCase(getDailySales.fulfilled, (state, action) => {
        state.loading = false;
        state.dailySales = action.payload;
      })
      .addCase(getDailySales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSalesByCategory.pending, (state) => { state.loading = true; })
      .addCase(getSalesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.salesByCategory = action.payload;
      })
      .addCase(getSalesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSalesByBranch.pending, (state) => { state.loading = true; })
      .addCase(getSalesByBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.salesByBranch = action.payload;
      })
      .addCase(getSalesByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getBranchPerformance.pending, (state) => { state.loading = true; })
      .addCase(getBranchPerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.branchPerformance = action.payload;
      })
      .addCase(getBranchPerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getStoreAlerts.pending, (state) => { state.loading = true; })
      .addCase(getStoreAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.storeAlerts = action.payload;
      })
      .addCase(getStoreAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addMatcher(
        (action) => action.type.startsWith('storeAnalytics/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearStoreAnalyticsState,
  clearSalesData,
  clearBranchData
} = storeAnalyticsSlice.actions;

export default storeAnalyticsSlice.reducer;