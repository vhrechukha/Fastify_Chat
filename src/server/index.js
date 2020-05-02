const server = require('./server');

server.listen(3000)
    .then((address) => console.log(`server listening on ${address}`))
    .catch((err) => console.log(err));
