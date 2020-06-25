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

io.on("servs",x =>{
const client = require("../main").lavalink
io.emit("servers",array)
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
/*
let arquivos = []
const fs = require("fs")
fs.readdir("./", async (err, files) => {
    if (err) console.error(err); 
    files.forEach((f, i) => {
        if(f == "node_modules" || f == ".git") return ;
        fs.readdir(`./${f}`, async (erro, file) => {   
            if(!file) return;
            for(let b = 0; b < file.length;b++){
                console.log(f,file[b])
              //  let pasta = file.filter(x => !x.endsWith('.js'))
                //console.log(pasta)
            }
            /*
            let pasta = files.filter(file => 
            !file.endsWith('.js') || !file.endsWith('.json') || 
            !file.endsWith('.py') || !file.endsWith('.env') 
            || !file.endsWith('.css')  || !file.endsWith('.html') || !file.endsWith('.rar'))
            pasta.forEach((y, i) => {
                console.log("PASTA",y)
            })
            
        })  
    })
  })

      //let arquivojs = files.filter(file => !file.endsWith('.js'))
    //console.log(arquivojs)
  arquivojs.forEach((f, i) => {
    if(f === "data" || f === "function" || f === "music") return ;
      fs.readdir(`./comandos/${f}`, async (erro, file) => {     
        for(let b = 0; b < file.length;b++){
        let props = require(`./comandos/${f}/${file[b]}`);
        if(!props.help) return console.log(`\x1b[31m[ERRO] Está faltando exports.help{  } no Comando ${file[b]}`)
        console.log(`COMANDO ${file[b]} CARREGADO!`)
        if(!props.help.name) return console.log(`\x1b[31m[ERRO]  Está faltando o Nome do Comando! no comando ${file[b]} ] \x1b[0m`)
        client.commands.set(props.help.name,props);
      }
    })
  */