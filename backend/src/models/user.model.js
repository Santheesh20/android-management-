const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        passwordHash: {
            type: String,
            required: true,
            select: false
        },

        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
            index: true
        },
        permissionIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Permission'
            }
        ],

        status: {
            type: String,
            required: true,
            enum: [
                'active',
                'inactive',
                'suspended'
            ],
            default: 'active',
            index: true
        },

        mustChangePassword: {
            type: Boolean,
            required: true,
            default: false
        },

        passwordChangedAt: {
            type: Date,
            default: null
        },

        tokenVersion: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },

        temporaryPasswordExpiresAt: {
            type: Date,
            default: null
        },

        lastLoginAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
