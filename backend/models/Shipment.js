
const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  isFragile: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to calculate totalCost before saving
ShipmentSchema.pre('save', function (next) {
  // Example calculation: add a 10% fragile fee
  if (this.isFragile) {
    this.totalCost = this.shippingCost * 1.1;
  } else {
    this.totalCost = this.shippingCost;
  }
  next();
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
