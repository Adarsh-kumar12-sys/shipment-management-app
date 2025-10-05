
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shipments: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalShipments: 0,
};

const shipmentSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShipments: (state, action) => {
      state.shipments = action.payload.shipments;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalShipments = action.payload.totalShipments;
    },
    addShipment: (state, action) => {
      state.shipments.push(action.payload);
    },
    updateShipment: (state, action) => {
      const index = state.shipments.findIndex((shipment) => shipment._id === action.payload._id);
      if (index !== -1) {
        state.shipments[index] = action.payload;
      }
    },
    deleteShipment: (state, action) => {
      state.shipments = state.shipments.filter((shipment) => shipment._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setShipments,
  addShipment,
  updateShipment,
  deleteShipment,
  setError,
} = shipmentSlice.actions;

export default shipmentSlice.reducer;
