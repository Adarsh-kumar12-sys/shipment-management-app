
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShipments, createShipment, updateShipmentById, deleteShipmentById } from '../store/slices/shipmentActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography, Pagination, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import ShipmentForm from '../components/ShipmentForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ShipmentsPage = () => {
  const dispatch = useDispatch();
  const { shipments, loading, currentPage, totalPages } = useSelector((state) => state.shipments);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [currentShipment, setCurrentShipment] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(4); // You can make this configurable
  const [statusFilter, setStatusFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const handler = setTimeout(() => {
        dispatch(getShipments({ page, limit, status: statusFilter, keyword: searchKeyword }));
      }, 500); // Debounce for 500ms

      return () => {
        clearTimeout(handler);
      };
    }
  }, [dispatch, isAuthenticated, page, limit, statusFilter, searchKeyword]);

  const handleOpen = (shipment = null) => {
    setCurrentShipment(shipment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentShipment(null);
  };

  const handleSubmit = (formData) => {
    if (currentShipment) {
      dispatch(updateShipmentById({ id: currentShipment._id, shipmentData: formData }));
    } else {
      dispatch(createShipment(formData));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteShipmentById(id));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button variant="contained" onClick={() => handleOpen()}>Add Shipment</Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Search Description"
            variant="outlined"
            value={searchKeyword}
            onChange={handleSearchChange}
            size="small"
          />
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Transit">In Transit</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {currentShipment ? 'Edit Shipment' : 'Add Shipment'}
          </Typography>
          <ShipmentForm onSubmit={handleSubmit} initialData={currentShipment} />
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Shipping Cost</TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment._id}>
                <TableCell>{shipment.description}</TableCell>
                <TableCell>{shipment.status}</TableCell>
                <TableCell>{shipment.weight}</TableCell>
                <TableCell>{shipment.shippingCost}</TableCell>
                <TableCell>{shipment.totalCost}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(shipment)}>Edit</Button>
                  <Button onClick={() => handleDelete(shipment._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default ShipmentsPage;
