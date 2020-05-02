const middie = require('middie');
const fastify = require('fastify');
const socket = require('socket.io');
const routes = require('../config/router');
const middleware = require('../config/middleware');
const socketConnection = require('../components/Chat/socket.io');
/**
 * @type {fastify}
 * @constant {fastify.Application}
 */
const app = fastify({ logger: true });

(async () => {
    const io = socket(app.server);
    await app.register(middie);

    /**
     * @description fastify.Application Middleware
     */
    middleware.init(app);

    /**
     * @description fastify.Application Routes
     */
    routes.init(app);

    /**
     * @description fastify.Application Sockets for Chat component
     */
    socketConnection.init(io);
})();

module.exports = app;
