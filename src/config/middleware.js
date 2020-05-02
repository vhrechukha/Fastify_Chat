const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');

module.exports = {
    /**
     * @function
     * @description fastify middleware
     * @param {fastify.Application} app
     * @returns void
     */
    init(app) {
        // connect socket.io
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        app.use(bodyParser.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        app.use(helmet());
        // providing a Connect/Express middleware that
        // can be used to enable CORS with various options
        app.use(cors());
        // cors
        app.use('/css', serveStatic(path.join(`${__dirname}\\..\\..\\public\\css`)));
        app.use('/js', serveStatic(path.join(`${__dirname}\\..\\..\\public\\js`)));
        // serve static files
    },
};
