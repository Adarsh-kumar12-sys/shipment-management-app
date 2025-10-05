
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shipmentReducer from './slices/shipmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    shipments: shipmentReducer,
  },
});

export default store;
