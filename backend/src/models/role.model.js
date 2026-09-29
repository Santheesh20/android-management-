const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
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

        description: {
            type: String,
            trim: true,
            default: ''
        },

        permissionIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Permission'
            }
        ],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: 'roles'
    }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
