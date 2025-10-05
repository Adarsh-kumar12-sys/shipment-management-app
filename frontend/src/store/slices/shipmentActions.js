
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../api';
import { setLoading, setShipments, addShipment, updateShipment, deleteShipment, setError } from './shipmentSlice';
import { greenToast, redToast } from '../../utils/toastStyles';

export const getShipments = createAsyncThunk(
  'shipments/getShipments',
  async ({ page = 1, limit = 10, status = '', keyword = '' }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      let url = `/shipments?page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      const res = await api.get(url);
      dispatch(setShipments(res.data));
    } catch (err) {
      dispatch(setError(err.response.data));
      toast.error('Failed to fetch shipments', redToast);
    }
    dispatch(setLoading(false));
  }
);

export const createShipment = createAsyncThunk(
  'shipments/createShipment',
  async (shipmentData, { dispatch }) => {
    try {
      const res = await api.post('/shipments', shipmentData);
      dispatch(addShipment(res.data));
      toast.success('Shipment created successfully!', greenToast);
    } catch (err) {
      dispatch(setError(err.response.data));
      toast.error('Failed to create shipment', redToast);
    }
  }
);

export const updateShipmentById = createAsyncThunk(
  'shipments/updateShipmentById',
  async ({ id, shipmentData }, { dispatch }) => {
    try {
      const res = await api.put(`/shipments/${id}`, shipmentData);
      dispatch(updateShipment(res.data));
      toast.success('Shipment updated successfully!', greenToast);
    } catch (err) {
      dispatch(setError(err.response.data));
      toast.error('Failed to update shipment', redToast);
    }
  }
);

export const deleteShipmentById = createAsyncThunk(
  'shipments/deleteShipmentById',
  async (id, { dispatch }) => {
    try {
      await api.delete(`/shipments/${id}`);
      dispatch(deleteShipment(id));
      toast.success('Shipment deleted successfully!', greenToast);
    } catch (err) {
      dispatch(setError(err.response.data));
      toast.error('Failed to delete shipment', redToast);
    }
  }
);
