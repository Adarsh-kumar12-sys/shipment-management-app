import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShipments, createShipment, updateShipmentById, deleteShipmentById } from '../store/slices/shipmentActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography } from '@mui/material';
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
  const { shipments, loading } = useSelector((state) => state.shipments);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [currentShipment, setCurrentShipment] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getShipments());
    }
  }, [dispatch, isAuthenticated]);

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

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpen()}>Add Shipment</Button>
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
    </div>
  );
};

export default ShipmentsPage;