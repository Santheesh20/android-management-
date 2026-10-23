
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: 50
        },

        type: {
            type: String,
            required: true,
            enum: [
                'distributor',
                'reseller',
                'partner',
                'customer'
            ],
            index: true
        },

        parentOrganizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            default: null,
            index: true
        },

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

        contact: {
            name: {
                type: String,
                trim: true,
                default: ''
            },

            email: {
                type: String,
                trim: true,
                lowercase: true,
                default: ''
            },

            phone: {
                type: String,
                trim: true,
                default: ''
            }
        },

        address: {
            addressLine1: {
                type: String,
                trim: true,
                default: ''
            },

            addressLine2: {
                type: String,
                trim: true,
                default: ''
            },

            city: {
                type: String,
                trim: true,
                default: ''
            },

            state: {
                type: String,
                trim: true,
                default: ''
            },

            country: {
                type: String,
                trim: true,
                default: ''
            },

            postalCode: {
                type: String,
                trim: true,
                default: ''
            }
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        }
    },
    {
        timestamps: true,
        collection: 'organizations'
    }
);

organizationSchema.index({
    parentOrganizationId: 1,
    type: 1,
    status: 1
});

const Organization = mongoose.model(
    'Organization',
    organizationSchema
);

module.exports = Organization;
