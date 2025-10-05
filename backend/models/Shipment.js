
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
    this.totalCost = Math.round((this.shippingCost * 1.1) * 100) / 100;
  } else {
    this.totalCost = this.shippingCost;
  }
  next();
});


// Middleware to calculate totalCost before updating
ShipmentSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.$set.shippingCost || update.$set.isFragile !== undefined) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    const newShippingCost = update.$set.shippingCost || docToUpdate.shippingCost;
    const newIsFragile = update.$set.isFragile !== undefined ? update.$set.isFragile : docToUpdate.isFragile;

    if (newIsFragile) {
      this.set({ totalCost: Math.round((newShippingCost * 1.1) * 100) / 100 });
    } else {
      this.set({ totalCost: newShippingCost });
    }
  }
  next();
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
