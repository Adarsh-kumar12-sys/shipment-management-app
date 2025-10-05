const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Shipment = require('../models/Shipment');

// @route   POST api/shipments
// @desc    Create a shipment
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newShipment = new Shipment({
      ...req.body,
      user: req.user.id
    });

    const shipment = await newShipment.save();
    res.json(shipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/shipments
// @desc    Get all shipments for a user with pagination, filtering, and search
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const statusFilter = req.query.status; // Get status from query parameter
        const keyword = req.query.keyword; // Get keyword from query parameter

        let query = { user: req.user.id };

        if (statusFilter) {
            query.status = statusFilter;
        }

        if (keyword) {
            query.description = { $regex: keyword, $options: 'i' }; // Case-insensitive search
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalShipments = await Shipment.countDocuments(query);
        const shipments = await Shipment.find(query)
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .limit(limit)
            .skip(startIndex);

        const results = {};

        if (endIndex < totalShipments) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        results.totalShipments = totalShipments;
        results.totalPages = Math.ceil(totalShipments / limit);
        results.currentPage = page;
        results.shipments = shipments;

        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/shipments/:id
// @desc    Update a shipment
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let shipment = await Shipment.findById(req.params.id);

        if (!shipment) return res.status(404).json({ msg: 'Shipment not found' });

        // Make sure user owns shipment
        if (shipment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        shipment = await Shipment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.json(shipment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/shipments/:id
// @desc    Delete a shipment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let shipment = await Shipment.findById(req.params.id);

        if (!shipment) return res.status(404).json({ msg: 'Shipment not found' });

        // Make sure user owns shipment
        if (shipment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Shipment.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Shipment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;