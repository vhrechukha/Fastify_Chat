const fs = require('fs');

function chat(req, reply) {
    try {
        const stream = fs.createReadStream(`${__dirname}\\..\\..\\..\\public\\index.html`);
        reply.type('text/html').send(stream);
    } catch (error) {
        reply.code(500).type('json').send(error);
    }
}

module.exports = {
    chat,
};
