import { createSlice } from '@reduxjs/toolkit';

const TAX_RATE = 0.18; // 18% GST

const initialState = {
  items: [],           // [{ id, name, price, quantity, ... }]
  heldOrders: [],      // [{ id, items, customer, note, ... }]
  selectedCustomer: null,
  paymentMethod: 'CASH',
  discount: 0,         // percentage (0-100)
  note: '',
  currentOrder: null,  // last completed order (for receipt)
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const price = Number(product.price ?? product.sellingPrice ?? product.mrp ?? 0);
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...product,
          price,
          sellingPrice: product.sellingPrice ?? price,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.selectedCustomer = null;
      state.paymentMethod = 'CASH';
      state.discount = 0;
      state.note = '';
    },
    holdOrder: (state) => {
      if (state.items.length === 0) return;
      const heldOrder = {
        id: Date.now(),
        items: [...state.items],
        customer: state.selectedCustomer,
        note: state.note,
        discount: state.discount,
      };
      state.heldOrders.push(heldOrder);
      state.items = [];
      state.selectedCustomer = null;
      state.note = '';
      state.discount = 0;
    },
    resumeOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.heldOrders.find((o) => o.id === orderId);
      if (order) {
        state.items = order.items;
        state.selectedCustomer = order.customer;
        state.note = order.note;
        state.discount = order.discount;
        state.heldOrders = state.heldOrders.filter((o) => o.id !== orderId);
      }
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    resetOrder: (state) => {
      state.items = [];
      state.selectedCustomer = null;
      state.paymentMethod = 'CASH';
      state.discount = 0;
      state.note = '';
      state.currentOrder = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  holdOrder,
  resumeOrder,
  setSelectedCustomer,
  setPaymentMethod,
  setDiscount,
  setNote,
  setCurrentOrder,
  resetOrder,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectHeldOrders = (state) => state.cart.heldOrders;
export const selectSelectedCustomer = (state) => state.cart.selectedCustomer;
export const selectPaymentMethod = (state) => state.cart.paymentMethod;
export const selectDiscount = (state) => state.cart.discount;
export const selectNote = (state) => state.cart.note;
export const selectCurrentOrder = (state) => state.cart.currentOrder;

const getItemPrice = (item) => Number(item.price ?? item.sellingPrice ?? item.mrp ?? 0);

export const selectSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);

export const selectTax = (state) => {
  const subtotal = selectSubtotal(state);
  return subtotal * TAX_RATE;
};

export const selectDiscountAmount = (state) => {
  const subtotal = selectSubtotal(state);
  const discount = state.cart.discount;
  if (!discount) return 0;

  if (typeof discount === 'number') {
    return Math.max(0, subtotal * (discount / 100));
  }

  if (typeof discount === 'object') {
    const val = Number(discount.value || 0);
    if (discount.type === 'fixed') {
      return Math.max(0, Math.min(val, subtotal));
    }
    return Math.max(0, subtotal * (val / 100));
  }

  return 0;
};

export const selectTotal = (state) => {
  const subtotal = selectSubtotal(state);
  const tax = selectTax(state);
  const discountAmount = selectDiscountAmount(state);
  return Math.max(0, subtotal + tax - discountAmount);
};

export default cartSlice.reducer;
