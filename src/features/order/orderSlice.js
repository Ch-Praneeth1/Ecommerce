import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrderByUserId, fetchAllOrders, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentPlacedOrder: null
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrderByUserIdAsync = createAsyncThunk(
  'order/fetchAllOrderByUserId',
  async (userId) => {
    const response = await fetchAllOrderByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async () => {
    const response = await fetchAllOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentPlacedOrder = action.payload;
      })
      .addCase(fetchAllOrderByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrderByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id===action.payload.id);
        state.orders[index] = action.payload;
      });
  },
});

export const { increment } = orderSlice.actions;
export const selectCurrentPlacedOrder = (state) => state.order.currentPlacedOrder;
export const selectAllOrdersByUserId = (state) =>  state.order.orders;
export const selectAllOrders = (state) => state.order.orders;
export default orderSlice.reducer;