const fs = require('fs');
const UserService = require('./service');

function chat(req, reply) {
    try {
        req.io.on('connection', async (socket) => {
            socket.on('disconnect', () => {
                socket.broadcast.emit('user left', { message: ' left.', nick: socket.nickname });
            });

            const allMessages = await UserService.getAllMessage();
            socket.emit('chatHistory', allMessages);

            // when someone send nickname
            socket.on('send-nickname', (nickname) => {
                // eslint-disable-next-line no-param-reassign
                socket.nickname = nickname;
                socket.broadcast.emit('user added', { message: ' added.', nick: socket.nickname });
            });

            // Someone is typing
            socket.on('typing', (data) => {
                console.log('typing');
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
                UserService.saveMessageToDb(msg, socket.nickname);

                socket.emit('chat message', { message: msg, nick: socket.nickname });
                socket.broadcast.emit('received', { message: msg, nick: socket.nickname });
            });
        });

        const stream = fs.createReadStream(`${__dirname}\\..\\..\\..\\public\\index.html`);
        reply.type('text/html').send(stream);
    } catch (error) {
        reply.code(500).type('json').send(error);
    }
}

module.exports = {
    chat,
};
