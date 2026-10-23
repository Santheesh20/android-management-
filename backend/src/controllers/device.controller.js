
const deviceService = require('../services/device.service');

async function registerDevice(req, res, next) {
    try {
        const device = await deviceService.registerDevice(
            req.body,
            req.auth.userId
        );

        return res.status(201).json({
            success: true,
            message: 'Device registered successfully',
            data: { device }
        });
    } catch (error) {
        return next(error);
    }
}

async function listDevices(req, res, next) {
    try {
        const result = await deviceService.listDevices({
            page: req.query.page,
            limit: req.query.limit,
            status: req.query.status,
            search: req.query.search
        });

        return res.status(200).json({
            success: true,
            message: 'Devices retrieved successfully',
            data: result
        });
    } catch (error) {
        return next(error);
    }
}

async function getDeviceById(req, res, next) {
    try {
        const device = await deviceService.getDeviceById(
            req.params.deviceId
        );

        return res.status(200).json({
            success: true,
            message: 'Device retrieved successfully',
            data: { device }
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    registerDevice,
    listDevices,
    getDeviceById
};

