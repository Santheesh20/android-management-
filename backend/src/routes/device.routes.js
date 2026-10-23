
const express = require('express');

const deviceController = require('../controllers/device.controller');

const { authenticate } = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

const router = express.Router();

// Register a device — requires devices.create
router.post(
    '/',
    authenticate,
    authorize('devices.create'),
    deviceController.registerDevice
);

// List and search devices — requires devices.view
router.get(
    '/',
    authenticate,
    authorize('devices.view'),
    deviceController.listDevices
);

// Get one device's details — requires devices.view
router.get(
    '/:deviceId',
    authenticate,
    authorize('devices.view'),
    deviceController.getDeviceById
);

module.exports = router;
