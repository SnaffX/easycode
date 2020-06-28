const ytdl = require('ytdl-core');
const yts = require( 'yt-search' )
let servers  = {}

function play(connection,message) {    
    if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    }    
    let server = servers[message.guild.id];         
    server.dispatcher = connection.play(ytdl(server.queue[0].url, { filter: 
    "audioonly" }));
    message.channel.send(`Tocando: **${server.queue[0].title}**`);    
    server.queue.shift();    
    server.dispatcher.on("finish", function () {
    if(server.queue[0]) play(connection, message);
    else {connection.disconnect();
    message.channel.send("**A Fila de musicas Chegou ao fim!**")  
    }
    })
}

function pause(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Voce nao está em um Canal de Musica"
    );
    message.channel.send('Musica pausada com Sucesso');
    serverQueue.dispatcher.pause();
}
function resume(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Voce nao está em um Canal de Musica"
    );
    message.channel.send('Musica Continuada com Sucesso');
    serverQueue.dispatcher.resume();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Não tem musica para Parar"
      );
    serverQueue.queue = [];
    serverQueue.dispatcher.end();
  }

  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Voce nao esta em um Canal de Musica"
      );
    if (!serverQueue)
      return message.channel.send("Não há música para pular");
    serverQueue.dispatcher.end();
  }

  function volume(message, serverQueue,volume) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Voce nao está em um Canal de Musica"
      );
      serverQueue.dispatcher.setVolumeLogarithmic(volume);
  }
module.exports = {    
    play,
    servers,
    pause,
    resume,
    stop,
    skip,
    volume
};