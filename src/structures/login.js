

const x = require("discord.js");
const discord = new x.Client();
class oauth2 {  
     constructor(client,web_token) {
      this.client = client;
      this.web_token = web_token; 
      const socket = require("../configs/sockets.js")
      const io = socket.io;let connect = 0;
      let bvx = require("../configs/x.js");      
      io.emit("login",{key:this.web_token,status: connect})
      let bv = require("../configs/x.js");
      bv.reconnect = 1; //primeira vez
      discord.login(this.client) 
      io.on("result",data => {
      let aproved = require("../configs/x.js")
      if(aproved.reconnect == 1){
      console.log(data)
      }
      let opam = require("../configs/x.js")
      opam.cs = web_token
      opam.token = this.client
    })
    }
    test(){
        console.log("testado")
    } 
}

function Musica(params){
    const mus = require("../configs/x")
    mus.musica = params; 
    console.log(`[ API ] Sistema Escolhido: ${mus.musica == 1 ? "Lavalink": "Dispatcher"}`)
}
module.exports = {
    oauth2,
    discord,
    Musica
}