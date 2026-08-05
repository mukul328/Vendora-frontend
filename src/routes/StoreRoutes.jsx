import React from "react";
import { Routes, Route } from "react-router";

import StoreDashboard from "../pages/store/Dashboard/StoreDashboard";
import Branches from "../pages/store/Branch/Branches";
import Categories from "../pages/store/Category/Categories";
import Products from "../pages/store/Product/Products";
import { Dashboard } from "../pages/store/Dashboard";
import StoreEmployees from "../pages/store/Employee/StoreEmployees";
import Stores from "../pages/store/storeInformation/Stores";
import Alerts from "../pages/store/Alerts/Alerts";

const StoreRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StoreDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="branches" element={<Branches />} />
        <Route path="categories" element={<Categories />} />
        <Route path="employees" element={<StoreEmployees />} />
        <Route path="products" element={<Products />} />
        <Route path="stores" element={<Stores />} />
        <Route path="alerts" element={<Alerts />} />
      </Route>
    </Routes>
  );
};

export default StoreRoutes;
