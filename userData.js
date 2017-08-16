var restify =  require('restify');
var builder = require('botbuilder');

var server =  restify.createServer();
server.listen(process.env.port || 3978, function(){
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog("/",[
    function(session, results, next){
        if(!session.userData.nombre){
            builder.Prompts.text(session, '¿Cómo te llamas?');
        }else{
            next();
        }
    },
    function(session, results){
        if(results.response){
            let msj = results.response;
            session.userData.nombre = msj;
        }

        session.send('Hola '+session.userData.nombre);
    }
]);