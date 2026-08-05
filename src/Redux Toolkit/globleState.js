import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import storeReducer from "./features/store/storeSlice.js";
import branchReducer from "./features/branch/branchSlice.js";
import userReducer from "./features/user/userSlice.js";
import productReducer from "./features/product/productSlice.js";
import categoryReducer from "./features/category/categorySlice.js";
import inventoryReducer from "./features/inventory/inventorySlice.js";
import orderReducer from "./features/order/orderSlice.js";
import customerReducer from "./features/customer/customerSlice.js";
import employeeReducer from "./features/employee/employeeSlice.js";
import shiftReportReducer from "./features/shiftReport/shiftReportSlice.js";
import branchAnalysisReducer from "./features/branchAnalytics/branchAnalyticsSlice.js";
import storeAnalyticsReducer from "./features/storeAnalytics/storeAnalyticsSlice.js";
import cartReducer from "./features/cart/cartSlice.js";
import adminDashboardReducer from "./features/adminDashboard/adminDashboardSlice.js";

const globleState = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer,
    branch: branchReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    employee: employeeReducer,
    inventory: inventoryReducer,
    order: orderReducer,
    customer: customerReducer,
    cart: cartReducer,
    shiftReport: shiftReportReducer,
    branchAnalytics: branchAnalysisReducer,
    storeAnalytics: storeAnalyticsReducer,
    adminDashboard: adminDashboardReducer,
  },
});

export default globleState;
