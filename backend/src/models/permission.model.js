const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        module: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        description: {
            type: String,
            trim: true,
            default: ''
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: 'permissions'
    }
);

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
