const Hapi = require('@hapi/hapi');
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/api',
        handler: (request, h) => {
            console.log(h.getDate());
            return 'Hello World hihi!';
        }
    });

  
    await server.start();

    server.register({
        plugin: getDate
    })

    console.log('Server running on %s', server.info.uri);
};

const getDate = {
    name: 'getDate',
    version: '1.0.0',
    register: async function (server, options) {

        const currentDate = function() {

            const date = new Date();
            return date
        }

        server.decorate('toolkit', 'getDate', currentDate);
    }
}


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();