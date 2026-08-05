import React from "react";
import { Routes, Route } from "react-router";

// Import Branch Manager Dashboard Layout
import BranchManagerDashboard from "../pages/Branch Manager/Dashboard/BranchManagerDashboard";

// Import Branch Manager pages
import {
  Dashboard,
  Orders,
  Transactions,
  Inventory,
  Customers
} from "../pages/Branch Manager";
import { BranchEmployees } from "../pages/Branch Manager/Employees";


const BranchManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BranchManagerDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
   
        <Route path="transactions" element={<Transactions />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="employees" element={<BranchEmployees />} />
        <Route path="customers" element={<Customers />} />
       
      </Route>
    </Routes>
  );
};

export default BranchManagerRoutes;