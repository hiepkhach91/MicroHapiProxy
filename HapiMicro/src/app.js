const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    //Route
    server.route({
        method: 'GET',
        path: '/api',
        options: {
            description: 'Return hello world',
            notes: 'Return hello world',
            tags: ['api'],
            handler: (request, h) => {
                return 'Hello World!';
            }
        }
    });

    //Swagger config
    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: '0.0.1',
        }
    };
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    console.log('Server running on %s', server.info.uri);

    await server.start();
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();