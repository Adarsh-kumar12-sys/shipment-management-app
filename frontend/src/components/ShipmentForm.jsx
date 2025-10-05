
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ShipmentForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    description: '',
    status: 'Pending',
    isFragile: false,
    weight: '',
    shippingCost: '',
    ...initialData,
  });

  useEffect(() => {
    setFormData({ ...initialData });
  }, [initialData]);

  const { description, status, isFragile, weight, shippingCost } = formData;

  const onChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={onChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={status}
          label="Status"
          onChange={onChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Transit">In Transit</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Weight"
        name="weight"
        type="number"
        value={weight}
        onChange={onChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Shipping Cost"
        name="shippingCost"
        type="number"
        value={shippingCost}
        onChange={onChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Is Fragile?</InputLabel>
        <Select
          name="isFragile"
          value={isFragile}
          label="Is Fragile?"
          onChange={onChange}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default ShipmentForm;
