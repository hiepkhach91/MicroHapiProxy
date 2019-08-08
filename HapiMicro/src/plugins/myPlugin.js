var myPlugin = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply('Hello world!');
            }
        });
        next();
    }
}

myPlugin.register.attributes = {
    name: 'myPlugin',
    version: '1.0.0'
  };
  
  module.exports = myPlugin;