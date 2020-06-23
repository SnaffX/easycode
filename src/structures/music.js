const x = require("discord.js");
const discord = new x.Client();

async function play(message,musica,options){
    if(!message.author || !musica) return;
    const lavalink = require("../handles/lava.js")
    const memberChannel = message.member.voice.channel.id  

    const player = await lavalink.music.join({
        guild: message.guild.id,
        voiceChannel: memberChannel,
        textChannel: message.channel
      })  
      
      const { tracks, loadType, playlistInfo } = await lavalink.music.fetchTracks(musica)
      if(message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send("**Voce nao está no mesmo canal que eu**")

      if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
      tracks[0].info.requester = message.author
      tracks[0].info.thumbnail = `https://img.youtube.com/vi/${tracks[0].info.identifier}/hqdefault.jpg`
      if(player.queue.length >= 200) return message.channel.send('A fila está cheia.')
      player.queue.add(tracks[0])
      if(!player.playing) {
        message.channel.send(` Iniciando a Musica: **${tracks[0].info.title}**`);    
      }else{
        message.channel.send(`Musica Adicionada a Fila: **${tracks[0].info.title}**`);    
      }      
      }
      if (!player.playing) return player.play()
}
async function pausar(message){
  const lavalink = require("../handles/lava.js")
  if(!message) return console.error("message Is not Informed")
  const player = lavalink.music.players.get(message.guild.id)
  if (!player || !player.queue[0]) {
    return message
    .channel.send('**Não tem nenhuma musica Tocando!**').then(x => x.delete({ timeout: 20000 }))
  }
  if(message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send("**Voce nao está no mesmo canal que eu**")

  if(player.paused == true) return message.channel.send("**A Musica ja está pausada**")
  player.pause(true)
  return message.channel.send('**Música pausada com sucesso.**')
}
async function continuar(message){
  const lavalink = require("../handles/lava.js")
  if(!message) return console.error("message Is not Informed")
  const player = lavalink.music.players.get(message.guild.id)
  if (!player || !player.queue[0]) {
    return message.channel.send('**Não tem nenhuma musica Tocando!**').then(x => x.delete({ timeout: 20000 }))
  }
  if(message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send("**Voce nao está no mesmo canal que eu**")

  if(player.paused == false) return message.channel.send("**A Musica já está tocando!**")
  player.pause(false)
  return message.channel.send('**Música Continuada com sucesso.**')
}
async function pular(message){
  const lavalink = require("../handles/lava.js")
  if(!message) return console.error("message Is not Informed")
  const player = lavalink.music.players.get(message.guild.id)
  if (!player || !player.queue[0]) {
    return message.channel.send('**Não tem nenhuma musica Tocando!**').then(x => x.delete({ timeout: 20000 }))
  }
 // if(message.guild.me.voice.channel)
  if(message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send("**Voce nao está no mesmo canal que eu**")
  player.stop()
  return message.channel.send('**Música Pulada com sucesso.**')
}


async function getTracks(message){
  const lavalink = require("../handles/lava.js")
  if(!message) return console.error("message Is not Informed")
  const player = lavalink.music.players.get(message.guild.id)
  if (!player || !player.queue[0]) {
    return console.error("Não ha musicas na fila!")
  }
  const { queue } = lavalink.music.players.get(message.guild.id)
  return queue;
}

async function volume(message,vol){
  const lavalink = require("../handles/lava.js")
  if(!message) return console.error("message Is not Informed")
  const player = lavalink.music.players.get(message.guild.id)
  if (!player || !player.queue[0]) {
    return message.channel.send('**Não tem nenhuma musica Tocando!**').then(x => x.delete({ timeout: 20000 }))
  }
  if(message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send("**Voce nao está no mesmo canal que eu**")
  player.volume(vol)
  return message.channel.send(`**Volume auterado para ${vol}**`)
}

async function fim(message){
  const lavalink = require("../handles/lava.js")
  if(!message) return console.error("message Is not Informed")
  const player = lavalink.music.players.get(message.guild.id)
  if (!player || !player.queue[0]) {
    return message.channel.send('**Não tem nenhuma musica Tocando!**').then(x => x.delete({ timeout: 20000 }))
  }
  if(message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send("**Voce nao está no mesmo canal que eu**")
  lavalink.music.leave(message.guild.id)  
  message.channel.send('**Todas as musicas foram finalizadas!**')
}
module.exports = {
    play,
    pausar,
    continuar,
    pular,
    getTracks,
    volume,
    fim
};