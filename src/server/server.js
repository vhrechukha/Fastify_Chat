const middie = require('middie');
const fastify = require('fastify');
const routes = require('../config/router');
const middleware = require('../config/middleware');

/**
 * @type {fastify}
 * @constant {fastify.Application}
 */
const app = fastify({ logger: true });

(async () => {
    await app.register(middie);

    /**
     * @description fastify.Application Middleware
     */
    middleware.init(app);

    /**
     * @description fastify.Application Routes
     */
    routes.init(app);
})();

module.exports = app;
