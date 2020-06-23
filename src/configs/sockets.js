let cs = ""

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
let configs = [{
    msg_lavalink: true
}]
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




