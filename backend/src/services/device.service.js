
const mongoose = require('mongoose');
const Device = require('../models/device.model');

function createServiceError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeMacAddress(value) {
    return String(value || '').trim().toUpperCase();
}

function validateMacAddress(value) {
    // Accept standard colon or hyphen separated MAC addresses.
    return /^(?:[0-9A-F]{2}[:-]){5}[0-9A-F]{2}$/.test(value);
}

async function registerDevice(data, registeredBy) {
    if (!mongoose.isValidObjectId(registeredBy)) {
        throw createServiceError('Valid registering user is required', 400);
    }

    const deviceName = String(data.deviceName || '').trim();
    const macAddress = normalizeMacAddress(data.macAddress);

    if (!deviceName) {
        throw createServiceError('Device name is required', 400);
    }

    if (!validateMacAddress(macAddress)) {
        throw createServiceError(
            'A valid MAC address is required',
            400
        );
    }

    const existingDevice = await Device.findOne({ macAddress })
        .select('_id')
        .lean();

    if (existingDevice) {
        throw createServiceError(
            'A device with this MAC address is already registered',
            409
        );
    }

    try {
        return await Device.create({
            deviceName,
            macAddress,
            serialNumber: data.serialNumber || null,
            manufacturer: data.manufacturer || null,
            model: data.model || null,
            registeredBy,
            status: 'pending'
        });
    } catch (error) {
        // Handle duplicate MAC addresses even if two requests
        // arrive at nearly the same time.
        if (error.code === 11000) {
            throw createServiceError(
                'A device with this MAC address is already registered',
                409
            );
        }

        throw error;
    }
}

async function listDevices(options = {}) {
    const page = Math.max(1, Number.parseInt(options.page, 10) || 1);
    const limit = Math.min(
        20,
        Math.max(1, Number.parseInt(options.limit, 10) || 10)
    );

    const filter = {};

    if (options.status) {
        const allowedStatuses = ['pending', 'active', 'disabled'];

        if (!allowedStatuses.includes(options.status)) {
            throw createServiceError('Invalid device status filter', 400);
        }

        filter.status = options.status;
    }

    if (options.search) {
        const search = String(options.search).trim().slice(0, 100);

        if (search) {
            const safeSearch = new RegExp(escapeRegex(search), 'i');

            filter.$or = [
                { deviceName: safeSearch },
                { macAddress: safeSearch },
                { serialNumber: safeSearch },
                { manufacturer: safeSearch },
                { model: safeSearch }
            ];
        }
    }

    const skip = (page - 1) * limit;

    const [devices, total] = await Promise.all([
        Device.find(filter)
            .select('-__v')
            .sort({ createdAt: -1, _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        Device.countDocuments(filter)
    ]);

    return {
        devices,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}

async function getDeviceById(deviceId) {
    if (!mongoose.isValidObjectId(deviceId)) {
        throw createServiceError('Invalid device ID', 400);
    }

    const device = await Device.findById(deviceId)
        .select('-__v')
        .lean();

    if (!device) {
        throw createServiceError('Device not found', 404);
    }

    return device;
}

module.exports = {
    registerDevice,
    listDevices,
    getDeviceById
};
