
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../api';
import { loginSuccess, logoutSuccess, userLoaded } from './authSlice';
import { greenToast, redToast } from '../../utils/toastStyles';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { dispatch }) => {
    try {
      const res = await api.post('/users', userData);
      dispatch(loginSuccess(res.data));
      dispatch(loadUser());
      toast.success('Registration successful!', greenToast);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => toast.error(error.msg, redToast));
      } else {
        toast.error(err.response.data.msg, redToast);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { dispatch }) => {
    try {
      const res = await api.post('/auth', userData);
      dispatch(loginSuccess(res.data));
      dispatch(loadUser());
      toast.success('Login successful!', greenToast);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => toast.error(error.msg, redToast));
      } else {
        toast.error(err.response.data.msg, redToast);
      }
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { dispatch, getState }) => {
    const token = getState().auth.token;
    if (token) {
      api.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete api.defaults.headers.common['x-auth-token'];
      return;
    }

    try {
      const res = await api.get('/auth');
      dispatch(userLoaded(res.data));
    } catch (err) {
      dispatch(logoutSuccess());
    }
  }
);
