const ChatService = require('./service');

module.exports = {
    /**
     * @function
     * @description socket.io
     * @param {fastify.Application} io
     * @returns void
     */
    init(io) {
        io.on('connection', async (socket) => {
            socket.on('disconnect', () => {
                socket.broadcast.emit('user left', { message: ' left.', nick: socket.nickname });
            });

            const allMessages = await ChatService.getAllMessage();
            socket.emit('chatHistory', allMessages);

            // when someone send nickname
            socket.on('send-nickname', (nickname) => {
                // eslint-disable-next-line no-param-reassign
                socket.nickname = nickname;
                socket.broadcast.emit('user added', { message: ' added.', nick: socket.nickname });
            });

            // Someone is typing
            socket.on('typing', (data) => {
                socket.broadcast.emit('notifyTyping', {
                    user: data.user,
                    message: data.message,
                });
            });

            // when someone stops typing
            socket.on('stopTyping', () => {
                socket.broadcast.emit('notifyStopTyping');
            });

            // when send new chat message
            socket.on('chat message', (msg) => {
                ChatService.saveMessageToDb(msg, socket.nickname);

                socket.emit('chat message', { message: msg, nick: socket.nickname });
                socket.broadcast.emit('received', { message: msg, nick: socket.nickname });
            });
        });
    },
};
