const UserComponent = require('.');

function UserRoutes(fastify, opts, next) {
    fastify.route({
        url: '/',
        method: 'GET',
        handler: UserComponent.chat,
    });

    next();
}

module.exports = UserRoutes;
