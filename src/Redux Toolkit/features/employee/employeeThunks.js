import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

// Create Store Employee
export const createStoreEmployee = createAsyncThunk(
  "employee/createStoreEmployee",
  async ({ employee, storeId }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/employees/store/${storeId}`, employee);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create store employee");
    }
  }
);

// Create Branch Employee
export const createBranchEmployee = createAsyncThunk(
  "employee/createBranchEmployee",
  async ({ employee, branchId }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/employees/branch/${branchId}`, employee);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create branch employee");
    }
  }
);

// Update Employee
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async ({ employeeId, employeeDetails }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/employees/${employeeId}`, employeeDetails);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update employee");
    }
  }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/employees/${employeeId}`);
      return employeeId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete employee");
    }
  }
);

// Find Employee by ID
export const findEmployeeById = createAsyncThunk(
  "employee/findEmployeeById",
  async (employeeId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/employees/${employeeId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Employee not found");
    }
  }
);

// Find Store Employees
export const findStoreEmployees = createAsyncThunk(
  "employee/findStoreEmployees",
  async (storeId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/employees/store/${storeId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch store employees");
    }
  }
);

// Find Branch Employees
export const findBranchEmployees = createAsyncThunk(
  "employee/findBranchEmployees",
  async ({ branchId, role }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/employees/branch/${branchId}`, {
        params: role ? { role } : undefined,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch branch employees");
    }
  }
);