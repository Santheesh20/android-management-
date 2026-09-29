const mongoose = require('mongoose');

const refreshSessionSchema = new mongoose.Schema(
    {
      userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
},

familyId: {
    type: String,
    required: true,
    index: true,
    trim: true
},

tokenId: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true
        },

        revokedAt: {
            type: Date,
            default: null
        },

        replacedByTokenId: {
            type: String,
            default: null,
            trim: true
        },

        lastUsedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: 'refresh_sessions'
    }
);

const RefreshSession = mongoose.model(
    'RefreshSession',
    refreshSessionSchema
);

module.exports = RefreshSession;