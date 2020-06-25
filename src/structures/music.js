const x = require("discord.js");
const { lavalink } = require("../handles/music");
let config = require("../configs/x").configs;

async function play(message, musica) {
  if (!message.author || !musica) return;
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
}
async function pausar(message) {
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
}
async function continuar(message) {
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
}
async function pular(message) {
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
}

async function getTracks(message) {
  const lavalink = require("../handles/lava.js");
  if (!message) return console.error("message Is not Informed");
  const player = lavalink.music.players.get(message.guild.id);
  if (!player || !player.queue[0]) {
    return console.error("Não ha musicas na fila!");
  }
  const { queue } = lavalink.music.players.get(message.guild.id);
  return queue;
}

async function volume(message, vol) {
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
}

async function fim(message) {
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
}

async function repeticao(message, modo) {
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


function getIndexSong ({ actual, length }) {
  return actual === 1 ? (actual - 1) * length + 1 : (actual - 1) * length
}

function mapSongs (paginator, song, index) {
  return `**${getIndexSong(paginator.pages) + index}). **\`${song.title}\` - \`[${Utils.formatTime(song.duration, true)}]\``
}