const MessageModel = require('./model');

/**
 * @exports
 * @method getAllMessage
 * @param {}
 * @summary get list of all messages
 * @returns Promise<MessageModel[]>
 */
function getAllMessage() {
    return MessageModel.find({}).then((chat) => chat);
}

/**
 * @exports
 * @method saveMessageToDb
 * @param { message, sender }
 * @summary save message
 * @returns Promise<MessageModel[]>
 */
function saveMessageToDb(message, sender) {
    return MessageModel.create({ sender, message });
}

module.exports = {
    saveMessageToDb,
    getAllMessage,
};
