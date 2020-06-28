const x = require("discord.js");
const { lavalink } = require("../handles/music");
let config = require("../configs/x").configs;
let ms = require("../configs/x")

async function play(message, musica) {  
  const music = require("../structures/dispatcher")
  if (!message.author || !musica) return;
  if(ms.musica == "1"){
  const lavalink = require("../handles/lava.js");
  //if (message.guild.me.voice.channel.id != message.member.voice.channel.id)
  // return message.channel.send("**Voce nao está no mesmo canal que eu**");
  const memberChannel = message.member.voice.channel.id;

  const player = await lavalink.music.join(
    {
      guild: message.guild.id,
      voiceChannel: memberChannel,
      textChannel: message.channel,
      dj: message.author
    },
    { selfDeaf: true }
  );

  let { tracks, loadType, playlistInfo } = await lavalink.music.fetchTracks(
    musica
  );

  switch (loadType) {
    case "NO_MATCHES": {
      message.channel
        .send(" | Não encontrei a música.")
        .then(x => x.delete({ timeout: 15000 }));
      break;
    }
    case "PLAYLIST_LOADED": {
      for (const track of tracks) {
        if (tracks.length >= 250)
          return channel.send("Não posso adicionar mais que 250 músicas.");
        if (player.queue.length >= 250)
          return channel.send("A fila está cheia.");
        player.queue.add(track);
      }

      message.channel
        .send(
          " | Foram adicionadas `" +
            tracks.length +
            "` músicas da playlist `" +
            playlistInfo.name +
            "`. Requisitado por: `" +
            message.author.tag +
            "`."
        )
        .then(x => x.delete({ timeout: 20000 }));

      if (!player.playing) returnplayer.play();

      break;
    }
    case "SEARCH_RESULT":
    case "TRACK_LOADED": {
      if (player.queue.length >= 250) return channel.send("A fila está cheia.");

      player.queue.add(tracks[0]);

      if (player.queue.length === 1) {
        if (!player.playing) return player.play();
      }

      message.channel
        .send(
          " | Adicionado na fila: `" +
            tracks[0].info.title +
            "`. Requisitado por: `" +
            message.author.tag +
            "`"
        )
        .then(x => x.delete({ timeout: 20000 }));

      if (!player.playing) return player.play();

      break;
    }
  }
  }else{
  const yts = require( 'yt-search' )

  const client = require("../handles/events")
  let dispatcher = require("../structures/dispatcher")
  let servers = dispatcher.servers

        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }
        let plax = servers[message.guild.id]
        let channel = message.member.voice.channel;
        if(!channel) return message.channel.send("Voce nao está em um canal de voz"); 
        if(!musica) return message.channel.send("Coloque a Musica");    
        message.channel.send("Buscando Musica").then(msg =>{      
        yts(musica,async function (err,r) {
        const videos = r.videos    
        if(videos[0]) 
        {        
        msg.edit("Musica Encontrada! Carregando")  
        plax.queue.push(videos[0])      

        if(!message.guild.members.cache.get(client.user.id).voice.channel) message.member.voice.channel.join().then(function (connection) {
            music.play(connection, message)     
            msg.delete().catch(()=>{})  
        });         

        if(!servers[message.guild.id].queue[0]){
          message.channel.send(`Musica Adicionada na fila: **${videos[0].title}**`);    
        }
        }else{
          msg.edit("Musica nao encontrada")
        }
        })
      })
  }
}
async function pausar(message) {
  const client = require("../handles/events")
  let dispatcher = require("../structures/dispatcher")
  let servers = dispatcher.servers
  const music = require("../structures/dispatcher")
  if(ms.musica == "1"){
  const lavalink = require("../handles/lava.js");
  if (!message) return console.error("message Is not Informed");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return message.channel
      .send("**Não tem nenhuma musica Tocando!**")
      .then(x => x.delete({ timeout: 20000 }));
  }
  if (message.guild.me.voice.channel.id != message.member.voice.channel.id)
    return message.channel.send("**Voce nao está no mesmo canal que eu**");

  if (player.paused == true)
    return message.channel.send("**A Musica ja está pausada**");
  player.pause(true);
  return message.channel.send(config[0].msg_pause);
}else{

  let x = servers[message.guild.id]
  if(!x.queue[0]) return message.channel.send("Não estou tocando em nenhum canal!")
  music.pause(message, x);
  return message.channel.send(config[0].msg_pause);

}
}
async function continuar(message) {
  const music = require("../structures/dispatcher")
  if(ms.musica == "1"){
  const lavalink = require("../handles/lava.js");
  if (!message) return console.error("message Is not Informed");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return message.channel
      .send("**Não tem nenhuma musica Tocando!**")
      .then(x => x.delete({ timeout: 20000 }));
  }
  if (message.guild.me.voice.channel.id != message.member.voice.channel.id)
    return message.channel.send("**Voce nao está no mesmo canal que eu**");

  if (player.paused == false)
    return message.channel.send("**A Musica já está tocando!**");
  player.pause(false);
  return message.channel.send("**Música Continuada com sucesso.**");
}else{
  let dispatcher = require("../structures/dispatcher")
  let servers = dispatcher.servers

  let x = servers[message.guild.id]
  if(!x.queue[0]) return message.channel.send("Não estou tocando em nenhum canal")
  music.resume(message, x);
  return message.channel.send(config[0].msg_pause);
}
}
async function pular(message) {
  const music = require("../structures/dispatcher")
  if(ms.musica == "1"){
  const lavalink = require("../handles/lava.js");
  if (!message) return console.error("message Is not Informed");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return message.channel
      .send("**Não tem nenhuma musica Tocando!**")
      .then(x => x.delete({ timeout: 20000 }));
  }
  // if(message.guild.me.voice.channel)
  if (message.guild.me.voice.channel.id != message.member.voice.channel.id)
    return message.channel.send("**Voce nao está no mesmo canal que eu**");
  player.stop();
  return message.channel.send("**Música Pulada com sucesso.**");
}else{
  let dispatcher = require("../structures/dispatcher")
  let servers = dispatcher.servers

  let x = servers[message.guild.id]
  if(!x.queue[0]) return message.channel.send("Não tem Musica para Pular")
  music.stop(message, x);
}
}

async function getTracks(message) {
  if(ms.musica == "1"){
  const lavalink = require("../handles/lava.js");
  if (!message) return console.error("message Is not Informed");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return console.error("Não ha musicas na fila!");
  }
  const { queue } = lavalink.music.players.get(message.guild.id);
  return queue;
}else{

}
}

async function volume(message, vol) {
  const music = require("../structures/dispatcher")
  if(ms.musica == "1"){
  const lavalink = require("../handles/lava.js");
  if (!vol) {
    vol = 100;
  }
  if (!message) return console.error("message Is not Informed");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return message.channel
      .send("**Não tem nenhuma musica Tocando!**")
      .then(x => x.delete({ timeout: 20000 }));
  }
  if (message.guild.me.voice.channel.id != message.member.voice.channel.id)
    return message.channel.send("**Voce nao está no mesmo canal que eu**");
  player.volume(vol);
  return message.channel.send(`**Volume auterado para ${vol}**`);
}else{
  let dispatcher = require("../structures/dispatcher")
  let servers = dispatcher.servers
  let x = servers[message.guild.id]
  if(!x.queue[0]) return message.channel.send("**Não estou tocando Musica!**")

  music.volume(message, x,vol);
}
}

async function fim(message) {
  const music = require("../structures/dispatcher")
  if(ms.musica == "1"){
  const lavalink = require("../handles/lava.js");
  if (!message) return console.error("message Is not Informed");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return message.channel
      .send("**Não tem nenhuma musica Tocando!**")
      .then(x => x.delete({ timeout: 20000 }));
  }
  if (message.guild.me.voice.channel.id != message.member.voice.channel.id)
    return message.channel.send("**Voce nao está no mesmo canal que eu**");
  lavalink.music.leave(message.guild.id);
  message.channel.send("**Todas as musicas foram finalizadas!**");
}else{

  let dispatcher = require("../structures/dispatcher")
  let servers = dispatcher.servers  
  let x = servers[message.guild.id]
  if(!x.queue[0]) return message.channel.send("Não estou tocando em nenhum canal para parar!")

  music.stop(message, x);
}
}

async function repeticao(message, modo) {
  if(ms.musica == "1"){
  const lavalink = require("../handles/lava.js");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return message.channel
      .send("❌ | Não há músicas tocando.")
      .then(x => x.delete({ timeout: 10000 }));
  }
  const track = player.track;
  switch (modo) {
    case "atual": {
      player.loopSingle(!player.loopedSingle);
      message.channel
        .send(
          `<:690183563609636915:703688715167334481> | Loop na música \`${
            track.info.title
          }\` foi \`${
            player.loopedSingle ? "ativado" : "desativado"
          }\` com sucesso.`
        )
        .then(msg => msg.delete({ timeout: 60000 }));
      break;
    }
    case "todas": {
      player.loopAll(!player.loopedAll);
      message.channel
        .send(
          `Loop na fila foi \`${
            player.loopedAll ? "ativado" : "desativado"
          }\` com sucesso.`
        )
        .then(msg => msg.delete({ timeout: 60000 }));
      break;
    }
    default: {
      message.channel.send("Você não informou o tipo de loop. `<atual/todas>`");
    }
  }
}else{

}
}

async function fila(message) {
  let array = []

  const lavalink = require("../handles/lava.js");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return message.channel
      .send("❌ | Não há músicas tocando.")
      .then(x => x.delete({ timeout: 10000 }));
  }
  const { queue } = await lavalink.music.players.get(message.guild.id);
  for(let i = 0;i <= 10; i++){
    if(queue[i]){
    array.push(`**${queue[i].info.title}**`)
    }
  }
  /*
  setTimeout(()=>{
  let embed = new x.MessageEmbed()
  .setTitle(`Fila de Musicas - *${queue.length}*`)
  .setDescription(`${array.join("\n")}`)
  .setColor("RED")
   message.channel.send(embed)
   },1500)
   */
}
module.exports = {
  play,
  pausar,
  continuar,
  pular,
  getTracks,
  volume,
  fim,
  repeticao,
  fila
};
