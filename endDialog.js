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
    function(session){
        builder.Prompts.text(session,'¿Cómo te llamas?');
    },
    function(session, results){
        let msj = results.response;
        session.send('Hola ' + msj);

        session.beginDialog('/preguntarLugar');
    },
    function(session, results){
        session.send('Saludos por ' + results.response);
    }
]);

bot.dialog('/preguntarLugar',[
    function(session){
        builder.Prompts.text(session, '¿Dónde estás?');
    },
    function(session, results){
        session.endDialogWithResult(results);
    }
]);