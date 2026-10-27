
const crypto = require('crypto');
const mongoose = require('mongoose');

const Device = require('../models/device.model');

const ENROLLMENT_TOKEN_TTL_MINUTES = 10;

function createServiceError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function hashToken(token) {
    return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
}

async function createEnrollmentToken(deviceId) {
    if (!mongoose.isValidObjectId(deviceId)) {
        throw createServiceError('Invalid device ID', 400);
    }

    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(token);
    const expiresAt = new Date(
        Date.now() + ENROLLMENT_TOKEN_TTL_MINUTES * 60 * 1000
    );

    const device = await Device.findOneAndUpdate(
        {
            _id: deviceId,
            status: 'pending',
            enrolledAt: null
        },

        {
            $set: {
                enrollmentTokenHash: tokenHash,
                enrollmentTokenExpiresAt: expiresAt
            }
        },

        {
            new: true,
            runValidators: true
        }
    ).select('_id deviceName status enrollmentTokenExpiresAt');

    if (!device) {
        throw createServiceError(
            'Device not found, disabled, or already enrolled',
            409
        );
    }

    return {
        device: {
            id: device._id.toString(),
            deviceName: device.deviceName,
            status: device.status
        },
        enrollmentToken: token,
        expiresAt
    };
}

module.exports = {
    createEnrollmentToken
};
