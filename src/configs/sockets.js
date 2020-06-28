let cs = ""
let configs = require("../configs/x.js").configs
const cpu = require('pidusage');

const io = require("socket.io-client")
("https://easycode-server.glitch.me")

io.on('disconnect', async() => {
const xes = require("../configs/x.js")
//console.log(`[ SERVIDOR ] Socket Desconectado`)
xes.reconnect = 2;//desconectou
})
io.on('connect', async() => {
   // console.log(`[ SERVIDOR ] Socket Conectado`)    
    setTimeout(async()=>{
    const xes = require("../configs/x.js")
    if(xes.reconnect == 2){
    const login = require("../main")
    await new login.oauth2(xes.token,xes.cs)
    xes.reconnect = 3;
    console.log("[ API ] Reconectado na Aplicação")
    }
    },4000)
})
io.on("atualizar",dados =>{
configs[0].erro_music = dados.input1
configs[0].msg_pause = dados.input2
console.log(configs)
})

io.on("musicas",dados =>{
  const client = require("../main").bot
  const lavalink = require("../handles/lava.js");
  const array = []
  if(client.guilds.cache.get(dados.id)){
    const player = lavalink.music.players.get(dados.id);
    if (!player || !player.queue[0]) {
    }else{
      io.emit("sounds",{m:player.queue,x:dados.k})
    }
  }
})

io.on("servs",x =>{
const client = require("../main").lavalink
//io.emit("servers",array)
})

io.on("teste",x =>{
    console.log(x)
    const op = require("../configs/x.js")
    setInterval(async ()=>{
    const client = require("../handles/lava.js")   
   // console.log(client)             
    cpu(process.pid, async (err, stats) => {   
     let cv = await [{
        servidores: client.guilds.cache.size,
        usuarios: client.users.cache.size,
        canais: client.channels.cache.size,
        ram: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        cpu: `${Math.round(stats.cpu)} %`
    }]
    io.emit("dados",{client:cv,keysv:op.cs})
    })
    },10000)
})

module.exports = {
    io,
    configs,
    cs
};