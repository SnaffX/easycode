let lavalink = null;
async function Sound(client){
const ms = require("../configs/x")
if(ms.musica == "1"){
lavalink = client;
require("../handles/lava.js")
}
}

module.exports = {
    Sound,
    lavalink
};