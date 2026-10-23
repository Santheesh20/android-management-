
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
    {
        deviceName: {
            type: String,
            required: true,
            trim: true
        },

        macAddress: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
            index: true
        },

        serialNumber: {
            type: String,
            trim: true,
            default: null
        },

        manufacturer: {
            type: String,
            trim: true,
            default: null
        },

        model: {
            type: String,
            trim: true,
            default: null
        },

        androidVersion: {
            type: String,
            default: null
        },

        agentVersion: {
            type: String,
            default: null
        },

        enrollmentTokenHash: {
            type: String,
            default: null,
            select: false
        },

        enrollmentTokenExpiresAt: {
            type: Date,
            default: null,
            select: false
        },

        enrolledAt: {
            type: Date,
            default: null
        },

        agentTokenHash: {
            type: String,
            default: null,
            select: false
        },

        agentTokenCreatedAt: {
            type: Date,
            default: null
        },


        ipAddress: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: ['pending', 'active', 'disabled'],
            default: 'pending',
            required: true,
            index: true
        },

        lastHeartbeatAt: {
            type: Date,
            default: null,
            index: true
        },

        registeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'devices'
    }
);

deviceSchema.index({ status: 1, lastHeartbeatAt: -1 });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
