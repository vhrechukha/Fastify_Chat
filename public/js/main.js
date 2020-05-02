/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
const socket = io();
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message');
const typing = document.getElementById('typing');

const scroll = () => {
    const element = document.getElementById('messages');
    element.scrollTop = element.scrollHeight;
};

const addMessage = (data) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const messages = document.getElementById('messages');
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append(`by ${data.nick}: ${new Date(Date.UTC(96, 1, 2, 3, 4, 5))}`);
    scroll();
};

(function () {
    $('#username-form').submit((e) => {
        if ($('#username').val()) {
            socket.emit('send-nickname', $('#username').val());
            e.preventDefault(); // prevents page reloading
            $('.bottom_wrapper').css('display', 'block');
            $('#chat-form').css('display', 'block');
            $('#messages').css('display', 'block');
            $('#username-form').css('display', 'none');
            scroll();
        }
    });

    // eslint-disable-next-line consistent-return
    $('#chat-form').submit((e) => {
        if ($('#message').val()) {
            e.preventDefault(); // prevents page reloading
            socket.emit('chat message', $('#message').val());
            $('#message').val('');
            return false;
        }
    });
    socket.on('chat message', (data) => {
        addMessage(data);
    });

    socket.on('received', (data) => {
        addMessage(data);
    });

    socket.on('user added', (data) => {
        const p = document.createElement('p');
        p.className = 'alert-message';
        const messages = document.getElementById('messages');
        messages.appendChild(p).append(data.nick, data.message);
        scroll();
    });

    socket.on('user left', (data) => {
        const p = document.createElement('p');
        p.className = 'alert-message';
        const messages = document.getElementById('messages');
        messages.appendChild(p).append(data.nick, data.message);
        scroll();
    });
    // isTyping event
    messageInput.addEventListener('keypress', () => {
        socket.emit('typing', { user: 'Someone', message: 'is typing...' });
    });

    socket.on('notifyTyping', (data) => {
        typing.innerText = `${data.user} ${data.message}`;
    });

    // stop typing
    messageInput.addEventListener('keyup', () => {
        socket.emit('stopTyping', '');
    });

    socket.on('notifyStopTyping', () => {
        typing.innerText = '';
    });

    socket.on('chatHistory', (data) => {
        data.map((data) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            messages.appendChild(li).append(data.message);
            messages
                .appendChild(span)
                .append(`by ${data.sender} at ${data.createdAt}`);
        });
        scroll();
    });
}());
