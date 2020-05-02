const { Schema } = require('mongoose');
const { mongoDBConnections } = require('../../config/connection');

const messageSchema = new Schema(
    {
        message: {
            type: String,
        },
        sender: {
            type: String,
        },
    },
    {
        collection: 'messages',
        versionKey: false,
        timestamps: new Date(Date.UTC(96, 1, 2, 3, 4, 5)),
    },
);

module.exports = mongoDBConnections.model('messages', messageSchema);
