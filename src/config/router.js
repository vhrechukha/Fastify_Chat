const UserRouter = require('../components/Chat/router');

module.exports = {
    /**
     * @function
     * @param {fastify.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        /**
         * Forwards any requests to the /v1/ URI to UserRouter.
         * @name /v1/
         * @function
         * @inner
         * @param {string} prefix - Fastify path
         */
        app.register(UserRouter, { prefix: '/v1/chat' });
    },
};
