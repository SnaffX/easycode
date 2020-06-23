const { GorilinkManager } = require('gorilink')
const Discord = require('discord.js')
const EventEmitter = require('events');

const yts = require( 'yt-search' )
const lavalink = require("../main.js")
const client = lavalink.client
let config = require("../main.js")
let socket = config.configs
client.once("ready", async bot =>{
const nodes = [
    {
      tag: 'easycode-lavalink', 
      host: 'easycode-lavalink.herokuapp.com',
      port: 80,
      password: 'youshallnotpass'
    },        
  ]  
  if(client){
  client.music = new GorilinkManager(client, nodes)
  .on('nodeConnect', node => {
    if(!socket.msg_lavalink) return;
    console.log(`${node.tag || node.host} - Lavalink Conectado.`)
  })
  client.music.on("trackStart",async music => {
    await yts(music.player.track.info.uri,async function (err,r) {
    if(err) console.log("Ocorreu um Erro! Tente Novamente")
    const videos = await r.videos
  
    const embed = new Discord.MessageEmbed()
    embed.setColor("BLUE")
    .setTitle(`**${music.player.track.info.author}**`)
    embed.setDescription(`Tocando [${music.player.track.info.title}](${music.player.track.info.uri})`)  
    if(videos[0]){
    embed.setThumbnail(videos[0].image)
    }
    client.channels.cache.get(music.player.textChannel.id).send(embed)
    })
  });
  client.music.on("queueEnd", async ({ player })=> {  
    player.textChannel.send("**A Fila de musicas Chegou ao fim!**")
    await client.music.leave(player.guild)     
})
}
module.exports = client;
})